---
{"dg-publish":true,"dg-path":"Blog/2009-10-03-conferenciaesri2009/Conferencia de usuarios ESRI España 2009.md","permalink":"/blog/2009-10-03-conferenciaesri2009/conferencia-de-usuarios-esri-espana-2009/","title":"Conferencia de usuarios ESRI España 2009","tags":["conferencia"]}
---


El pasado día 30 de septiembre y 1 de octubre se celebró en el IFEMA de Madrid la conferencia de usuarios de ESRI ESpaña 2009. Aunque hubo ponencias temáticas sobre aspectos variados como utilities, administración local o defensa, acudí sobre todo a ponencias técnicas. Allí se presentaron algunas cuestiones interesantes, sobre la versión 9.3.1 y algunos avances de la próxima v9.4 (estimada para mayo de 2010). Algunas cosas que considero interesantes:

<b>ArcGIS Desktop.</b>

Lo más destacable desde la 9.3.1 es quizá el nuevo formato de mapa 'Map Service Definition' (MSD). Parece que viene a sustituir paulatinamente al MXD y se usa en un nuevo motor interno de dibujado que produce mapas bastante más rápidos, tanto en escritorio como en servidor. Otra novedad es la 'Map Service Publishing': una barra de herramientas que parece útil para asesorar (warnings, infos...) sobre cómo hacer documentos de mapa más rápidos de cara a publicación.

Por otro lado, de la 9.4 se vieron algunos detalles como la integración en Arcmap de una ventana con funciones de ArcCatalog (algo bastante práctico, la verdad), un modo más rápido de edición de features mediante 'plantillas' y un nuevo tipo de capa llamado 'Query Layer' que permite pintar directamente el resultado de consultas complejas de SQL contra bases de datos estándar (SQL Server y Oracle). Información más completa del futuro desktop 9.4 en los enlaces \[1\] y \[2\].

<b>ArcGIS Explorer (900).</b>

La nueva versión del visor gratuito \[3\] trae bastantes mejoras estéticas (p.ej. un toolbar tipo 'ribbon' como el de ms-office) y alguna funcional (lee .csv, tiene vista 2D/3D, enlaces a fotos/videos, generación de 'presentaciones')...

<b>ArcGIS Server.</b>

Hay una mejora muy importante de rendimiento en los servicios de mapa en la 9.3.1. y avances en el sistema de caché previstos para la v.9.4 (se pueden mezclar formatos de imagen en una misma cache, cuesta mucho menos moverla por la red...). Se avanza igualmente en los APIs para entornos RIA: Flex y Silverlight.

Mis impresiones personales:

a) El desktop está 'tocando techo' en cuanto a funcionalidad. Las mejoras que aparecen se centran en usabilidad (lo cual no me parece mal, la verdad, porque le hace bastante falta) y en ser una buena herramienta para el administrador de ArcGIS Server.

b) Hay una inversión importante de esri en el ArcGIS Explorer, enfocándolo como un Google Earth, para usuarios no expertos en GIS. Si bien hasta ahora apenas lo he usado, creo que puede ser una herramienta útil para un uso esporádico o para distribuir a ciertos usuarios como visor.

c) El interés fundamental del desarrollo en esri está en ArcGIS Server y el producto está madurando. El objetivo actual es ganar rendimiento en los servicios de mapa, e ir trasladando funcionalidades del desktop al web. Creo que el próximo objetivo estará en los geoprocesos: primero en que se ejecuten más rápido (ahora mismo no son muy rápidos y parece necesario acudir a desarrollo más complejos como las Server Object Extensions -SOE-).

d) El API de Javascript para server me sigue pareciendo el más interesante y el camino a seguir (especialmente para dejar de lado el 'infierno' del adf para .net. Además, por mucho que veo demos en Silverlight y Flex, no veo diseños ni "efectos" que no se puedan sacar con alguna librería js, y al menos se mantiene uno en los estándares web, sin plugins propietarios.

d) ESRI está estableciendo alianzas con Microsoft en varios frentes (uso de los servicios de Virtual Earth, el software MapIt, integración con SharePoint...) parece que para posicionarse ante fuertes competidores como Google o el creciente ecosistema de Software libre.

Enlaces:

\[1\] Página de esri con novedades de desktop 9.4:

http://www.esri.com/software/arcgis/whats-new/whats-coming.html

\[2\] Enlaces a varios videos del desktop 9.4 en: http://www.unmundoparatodos.com/2009/08/16/arcgis94\_novedades/

\[3\] ArcGIS Explorer v900:

http://www.esri.com/software/arcgis/explorer/download.html

\[4\] Póster presentado a la Conferencia de Usuarios:

http://www.slideshare.net/VictorVelarde/geolics

El pasado día 30 de septiembre y 1 de octubre se celebró en el IFEMA de Madrid la conferencia de usuarios de ESRI ESpaña 2009. Aunque hubo ponencias temáticas sobre aspectos variados como utilities, administración local o defensa, acudí sobre todo a ponencias técnicas. Allí se presentaron algunas cuestiones interesantes, sobre la versión 9.3.1 y algunos avances de la próxima v9.4 (estimada para mayo de 2010). Algunas cosas interesantes:

**ArcGIS Desktop**

Lo más destacable desde la 9.3.1 es quizá el nuevo formato de mapa 'Map Service Definition' (MSD). Parece que viene a sustituir paulatinamente al MXD y se usa en un nuevo motor interno de dibujado que produce mapas bastante más rápidos, tanto en escritorio como en servidor. Otra novedad es la 'Map Service Publishing': una barra de herramientas que parece útil para asesorar (warnings, infos...) sobre cómo hacer documentos de mapa más rápidos de cara a publicación.

Por otro lado, de la 9.4 se vieron algunos detalles como la integración en Arcmap de una ventana con funciones de ArcCatalog (algo bastante práctico, la verdad), un modo más rápido de edición de features mediante 'plantillas' y un nuevo tipo de capa llamado 'Query Layer' que permite pintar directamente el resultado de consultas complejas de SQL contra bases de datos estándar (SQL Server y Oracle). Información más completa del futuro desktop 9.4 en los enlaces \[1\] y \[2\].

**ArcGIS Explorer**

La nueva versión del visor gratuito v900 \[3\] trae bastantes mejoras estéticas (p.ej. un toolbar tipo 'ribbon' como el de ms-office) y alguna funcional (lee .csv, tiene vista 2D/3D, enlaces a fotos/videos, generación de 'presentaciones')...

**ArcGIS Server**

Hay una mejora muy importante de rendimiento en los servicios de mapa en la 9.3.1. y avances en el sistema de caché previstos para la v.9.4 (se pueden mezclar formatos de imagen en una misma cache, cuesta mucho menos moverla por la red...). Se avanza igualmente en los APIs para entornos RIA: Flex y Silverlight.

Mis impresiones personales:

- El desktop está 'tocando techo' en cuanto a funcionalidad. Las mejoras que aparecen se centran en usabilidad (lo cual no me parece mal, la verdad, porque le hace bastante falta) y en ser una buena herramienta para el administrador de ArcGIS Server.

- Hay una inversión importante de esri en el ArcGIS Explorer, enfocándolo a ser parecido a un Google Earth, para usuarios no expertos en GIS. Si bien hasta ahora apenas lo he usado, creo que puede ser una herramienta útil para un uso esporádico o para distribuir a ciertos usuarios como visor.

- El interés fundamental del desarrollo en esri está en ArcGIS Server y el producto está madurando. El objetivo actual es ganar rendimiento en los servicios de mapa, e ir trasladando funcionalidades del desktop al web. Creo que el próximo objetivo estará en los geoprocesos: primero en que se ejecuten más rápido (ahora mismo no son muy rápidos y parece necesario acudir a desarrollo más complejos como las Server Object Extensions -SOE-).

- El API de Javascript para Server me sigue pareciendo el más interesante y el camino a seguir (especialmente frente al 'infierno' del adf para .net). Además, por mucho que veo demos en Silverlight y Flex, no veo diseños ni "efectos" que no se puedan sacar con alguna librería js, y al menos se mantiene uno en los estándares web, sin plugins propietarios.

- ESRI está estableciendo alianzas con Microsoft en varios frentes (uso de los servicios de Virtual Earth, el software MapIt, integración con SharePoint...) parece que para posicionarse ante fuertes competidores como Google o el creciente ecosistema de Software libre.

Enlaces:

\[1\] Página de esri con novedades de desktop 9.4:

[http://www.esri.com/software/arcgis/whats-new/whats-coming.html](http://www.esri.com/software/arcgis/whats-new/whats-coming.html "http://www.esri.com/software/arcgis/whats-new/whats-coming.html")

\[2\] Enlaces a varios videos del desktop 9.4 en: [http://www.unmundoparatodos.com/2009/08/16/arcgis94\_novedades/](http://www.unmundoparatodos.com/2009/08/16/arcgis94_novedades/ "http://www.unmundoparatodos.com/2009/08/16/arcgis94_novedades/")

\[3\] ArcGIS Explorer v900:

[http://www.esri.com/software/arcgis/explorer/download.html](http://www.esri.com/software/arcgis/explorer/download.html "http://www.esri.com/software/arcgis/explorer/download.html")

\[4\] Póster presentado a la Conferencia de Usuarios:

[http://www.slideshare.net/VictorVelarde/geolics](http://www.slideshare.net/VictorVelarde/geolics " http://www.slideshare.net/VictorVelarde/geolics")
