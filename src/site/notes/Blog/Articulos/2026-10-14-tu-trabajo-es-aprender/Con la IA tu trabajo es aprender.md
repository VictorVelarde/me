---
{"dg-publish":true,"dg-path":"Articulos/2026-10-14-tu-trabajo-es-aprender/Con la IA tu trabajo es aprender.md","permalink":"/articulos/2026-10-14-tu-trabajo-es-aprender/con-la-ia-tu-trabajo-es-aprender/","title":"Tu trabajo es aprender","tags":["ia","aprendizaje","blog","claude-code"],"dg-note-properties":{"estado":"borrador","categoria":"blog-post","tags":["ia","aprendizaje","blog","claude-code"],"title":"Tu trabajo es aprender","date":"2026-10-14","categories":["ia"],"review":false}}
---


Con la IA tu trabajo desarrollando software es más que nunca aprender. Aprender lo que necesita tu usuario y aprender de tu propio sistema.

Tradicionalmente, mientras escribías los ficheros fuente o resolvías un bug complicado, construías en tu cabeza un conjunto de modelos mentales. El resultado era siempre doble: uno tangible (los fuentes y sobre todo el sistema en ejecución) y otro más intangible, interno, en forma de aprendizaje y heurísticos, del que seguramente no te dabas cuenta.

Ahora el proceso de escritura del código (y de resolver bugs, y de cada vez más cosas) lo delegas en la IA, un cambio que ha sucedido muy rápidamente (recuerdo ser un poco escéptico al principio, cuando leía que Boris Cherny de Anthropic desinstaló su IDE, pero desde luego no lo soy, en 2026 es realidad al 100%). Y un problema derivado es que esos modelos mentales dejan de formarse naturalmente en tu cabeza. O ya los tenías o te toca currártelo. Esto es importante para todos, pero especialmente para desarrolladores más junior, que no han tenido experiencia durante la era pre-IA.

Vamos a partir de la premisa que este aprendizaje será siempre gradual, y también que quieres ser lo más productivo lo antes posible. Así que hablemos de los pasos mínimos para poner una feature en producción y algunos consejos en cada paso.

## Aprender a navegar
- **Créate un esquema visual del sistema**
	- Si empiezas con un sistema nuevo (o en una nueva empresa) y el sistema no es trivial (spoiler, casi nunca lo será), quieres tener un mapa mental para poder navegarlo. Pídeselo a tu LLM de referencia y que produzca un resultado visual, pero luego no lo dejes ahí, revísalo un buen rato (tómate un café y analízalo bien): pregunta sobre la arquitectura, los componentes más complejos, los puntos que no te convenza su diseño...
	- Debes tener claras al menos 2 vistas: la vista lógica del sistema + la vista real de los componentes que se despliegan en tu cloud. 
	- Que el trabajo de exploración sea iterativo: ve realizando preguntas al LLM y mejorando poco a poco los diagramas / notas que tomes. Si no tienes nada claro qué preguntar… háztelo mirar :). Y si tienes algún sistema organizado para tomar tus notas, en algo como Obsidian / un cerebro digital, +100 puntos.
	- Lógicamente, si alguien ha escrito algo previo al respecto o puede darte un paseo en una reunión, pues te va a venir muy bien, aprovéchalo. Pero idealmente haz el trabajo antes y ve ya con preguntas a esa persona: ¿por qué se ha hecho esto así? ¿Cuáles son las partes más complejas, que funciona mal y queremos cambiar pronto?
	- Esto aplica a menor escala también, claro, lo puedes aplicar con distinto nivel de zoom a piezas más pequeñas como un subsistema.
- **Aprende del Producto**
	- La feature que te toque: entiéndela. Para qué sirve y por qué es importante para el usuario. No, de verdad, ¡entiéndela!. Muchas veces los desarrolladores han programado soluciones sin entender realmente lo que hacían. Y si ya la entiendes, intenta crecer ese conocimiento en temas relacionados (¿qué viene después?¿cómo encaja esto en el flujo general?¿se puede mejorar algo?)
	- Conforme avances en tu conocimiento, crecerá la calidad de lo que haces y tu impacto.

## Crear la feature con IA
- **No tengas skill-itis** 
	- Tener una subscripción a Claude o ChatGPT debería bastar. Hay un montón de ruido en línea sobre mejoras, skills, prompts… pero mi consejo es que no tengas “skillitis”, y te vuelvas loco con mil historias (que lo más probable es que contaminen el contexto si no están claras y ordenadas). La tendencia parece ser que conforme los modelos crecen más en potencia, las skills son menos necesarias, pero al menos siempre habrá un mínimo sobre “cómo os gusta hacer las cosas en tu equipo”, ósea que algo podrás afinar.
- **Ten un proceso básico de desarrollo**
	- En mi experiencia, la clave no son las skills sino tener claro el proceso de desarrollo que quieres seguir y cuáles son los puntos clave donde encajas tú como humano vs lo que hace la IA. Esto puede cambiar en función de tu equipo, experiencia, hábitos… no hay una bala de plata, pero es bueno que al menos haya un consenso básico en el equipo. 
	- Dicho esto, y si aun no tienes un proceso claro, te animo a probar cosas como las de [Addy Osmani Agent Skills](https://skills.addy.ie/), un tipo listo que ahora además se ha ido a trabajar de Google a Antrophic, algo sabrá. 
	- Los dos puntos más importantes: que la especificación inicial esté clara y que esté claro cómo vas a probar que lo desarrollado lo cumple.
- **Estilo de desarrollo flexible**
	- Aprende a leer el contexto de tu empresa para saber el estilo de desarrollo que te toca en cada caso. A veces toca ir lo más rápido posible, cuando se trata de validar una idea. No tiene sentido invertir en alta calidad (aún) si es un sólo un prototipo para 1 o 2 clientes, bajo feature flag. La inversa aplica también, si por ejemplo trabajas en un proyecto con una pasarela de pagos para cobros automatizados, invierte en calidad o te morderá en producción, y no querrás estar ahí.

## Revisar la feature en equipo
- **Hazte CR** 
	- Con LLM, a mano, como quieras, pero por respeto: no le lances algo a un compañero un PR sin haberlo mirado tú antes con ojos críticos. Antes los PRs los ‘esculpías’ paso a paso, tenías 100% claro lo que incluían, cada línea, cada IF... Ahora si vas deprisa y no te das cuenta, lo mismo metes en el PR un tema secundario que toca 10 ficheros (porque lo discutiste con el agente y no quedó claro si iba en scope). 
	- Si tenéis alguna acción de revisión automática con IA en el CI, mírala antes de que te diga lo mismo un compañero, no? 
- **Cuida la descripción de tus PR** 
	- Ya sabemos que los modelos abren y cierran PRs como locos, pero también que luego a veces es imposible entender eso de forma clara desde el otro lado. La comunicación clara es un punto esencial.
	- Yo trabajo bastante con interfaces así que +100 a usar imágenes o un pequeño video explicativo de los cambios, siempre ayuda mucho. Si son APIs, pues mete unos curl de prueba / descripción de payload: todo lo que facilite el trabajo al revisor. Ojo, que puedes pedirle pantallazos, videos, planes de pruebas… a tu LLM. No digo que hagas todo a mano, pero sí que te leas / entiendas / modifiques a tu criterio todo antes de que llegue a una persona.
	- Del otro lado, como revisor, siempre espero algo como una explicación clara en 2 líneas de lo que hace el PR y un soporte gráfico de lo que hace (pantallas, diagrama de arquitectura…) / listado áreas que toca. Si el creador no te lo da, pues ya sabes, se lo puedes pedir al LLM cuando empieces lo primero.
- **Prueba bien la feature**
	- Ya, ya, que pruebas a cada paso, en tu local, que tienes tests unitarios, de integración, de e2e… pero hombre prueba bien lo que has hecho al final (generalmente en el entorno dedicado asociado al PR). 
	- Bonus, si te grabaste un mini-video (tipo Loom) y/o si le pediste a tu LLM unas pruebas de aceptación contra el dedicado.

## Llevar la feature a producción

- **Decide para qué clientes / entornos se activa**
	- Aquí los feature flags y las estrategias de despliegue son la pieza clave. Si no has trabajado con estos sistemas, pruébalos, ya!, merecen cada hora invertida.
- **Vigila las migraciones**
	- Una buena gestión del modelo de datos, y en especial de las migraciones, es una de las claves de cualquier puesta en producción. Revísalas, pruébalas a fondo. Durante la CR dedica especial tiempo a ese bloque. 
	- La IA podrá ayudarte más adelante a cambiar el código, pero no inventarse datos críticos de negocio que no generaste o perdiste por un bug.
- **Piensa la observabilidad desde el principio**
	- La observabilidad es una cualidad clave del sistema, no algo que se añade al final. Diseña desde el principio cómo se va a ver la feature en producción y cómo la vas a poder observar (tú o un agente, claro).
	- Eso implica desarrollar teniendo especialmente en cuenta las trazas. Algunas cosas que puedes hacer:
		- Antes de escribir código, pregúntate (o pregúntale a tu LLM): ¿cómo voy a saber en producción que esta feature funciona y que la usan?. Apunta 2 o 3 señales: un evento al completar el flujo, un contador de errores, el tiempo de la operación nueva...
		- Mételo en la especificación: pide trazas en los puntos clave, con el identificador del cliente, para que nazcan con el código y no se añadan después.
		- Antes de mergear, con las métricas ya activas en desarrollo o integración, pídele a tu herramienta (por ejemplo Honeycomb) el dashboard de la feature y comprueba que cuenta lo que esperabas.



La IA es una gran revolución, sin duda, y las técnicas van a seguir cambiando: lo que hoy es una skill mañana será una capacidad más del modelo. Pero muchos principios se mantienen, y a mí me parecen especialmente importantes tres:

- **Comunicación:** que cualquiera (tu compañero, el revisor, tú mismo dentro de seis meses, el agente…) entienda qué hace el sistema y por qué.
- **Vigilancia de los pasos clave:** delegar la escritura en la IA no es delegar la responsabilidad. Hay puntos donde sigues tú: la especificación, tu propia CR, la prueba final y sobre todo lo que pasa en producción. 
- **Valor al cliente:** el código siempre es un medio. Lo que cuenta es que lo que has construido le sirva a alguien.

Y por debajo de los tres, la premisa de todo el post: tu trabajo es aprender. La IA puede escribir el código, pero no puede aprender por ti. Úsala para aprender más y mejor, no para dejar de hacerlo.











