# 🔧 GIAV: Investigar manejo de reembolsos en expedientes cerrados

## Contexto

Se detectó un mensaje en la Dead Letter Queue (DLQ) de `integrations-dlq-reader` relacionado con un evento `PaymentLinkStatusChanged` para un reembolso.

**Datos del caso:**
- **Evento:** `PaymentLinkStatusChanged` (status: `refunded`)
- **PaymentLinkId:** 95318
- **BookingId:** 20730
- **Fecha pago:** 2026-02-05T01:03:14.240Z

## Error de GIAV

El servidor GIAV devuelve un error 500 con el siguiente mensaje SOAP:

```xml
<soap:Fault>
  <faultcode>soap:Server</faultcode>
  <faultstring>Server was unable to process request. ---> No puede crear cobros por encontrarse cerrado el expediente</faultstring>
</soap:Fault>
```

## Flujo del problema

1. ✅ Se procesó un reembolso vía `POST /payment_links/95318/refund` en payments-api (Redsys refund exitoso)
2. ✅ payments-api publicó el evento `PaymentLinkStatusChanged` con status: `refunded`
3. ✅ bookings-sub procesó correctamente — envió email de reembolso al comprador
4. ❌ integrations-sub falló 5 veces al intentar registrar en GIAV → mensaje a DLQ

## Causa raíz

El handler `paymentLinkStatusChangedHandler` llama a `GiavService > createPaymentCollection`, que hace un POST a la API de GIAV. GIAV rechaza la operación porque **el expediente ya está cerrado** y no permite crear cobros en expedientes cerrados.

## Preguntas a resolver

1. **¿Se puede reabrir el expediente para el reembolso?**
   - Investigar si la API de GIAV tiene un endpoint para reabrir expedientes
   - Determinar si es viable/correcto reabrirlo automáticamente

2. **¿Hay algo mal en la petición de reembolso que hacemos a nivel SOAP/params?**
   - Revisar si hay un método diferente para registrar reembolsos en expedientes cerrados
   - Verificar documentación de la API GIAV

3. **¿Debemos trazarlo e ignorarlo?**
   - Evaluar si este caso es esperado/válido y simplemente debemos loggearlo sin fallo
   - Considerar agregar manejo específico para este error de "expediente cerrado"

## Posibles soluciones

1. **Detectar el error específico y manejarlo gracefully** - Si es un caso esperado, marcar como procesado sin error
2. **Implementar lógica de reapertura** - Si GIAV lo permite, reabrir el expediente antes de crear el cobro
3. **Notificar al usuario/agencia** - Alertar que el reembolso no se pudo registrar en GIAV para acción manual
4. **Revisar el orden de operaciones** - ¿Debería el reembolso en GIAV procesarse antes de cerrar el expediente?

## Referencias

- Traza Honeycomb: https://ui.honeycomb.io/mogu/environments/prod/trace?trace_id=5cd146cd2797aa9a3187c6959320ff0a&trace_start_ts=1770193186&trace_end_ts=1770797986
- Thread Slack: https://moguespacio.slack.com/archives/C09LNT2BPC0/p1770798412842519?thread_ts=1770771300.549179&cid=C09LNT2BPC0

## Archivos a revisar

- `paymentLinkStatusChangedHandler` en integrations-sub
- `GiavService.createPaymentCollection`
- Documentación API GIAV (api_2_05.asmx)

---
*Issue creado desde análisis de DLQ - Febrero 2026*
