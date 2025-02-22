---
{"dg-publish":true,"dg-path":"Articulos/2015-01-07-3-lenguajes-de-programacion-para-sig/3 lenguajes de programación para SIG.md","permalink":"/articulos/2015-01-07-3-lenguajes-de-programacion-para-sig/3-lenguajes-de-programacion-para-sig/","title":"3 lenguajes de programación para SIG","tags":["formacion"]}
---


A lo largo de los años dentro del mundo SIG es habitual, para un analista o usuario avanzado, encontrarse en la posición de tener que decidir: _¿en qué tecnología/s formarme?_ O dicho de otra forma ¿a qué dedico mi valioso (y probablemente escaso) tiempo-presupuesto? ¿aprendo a manejar un nuevo SIG de escritorio, a gestionar un servidor SIG... o a qué?

Esta primera pregunta hoy día tiene una sólida y clara respuesta: primero **aprende a programar** (y si ya sabes, aprende a programar mejor). Tomando las palabras de James Fee (al que recomiendo seguir en su [blog](http://jamesfee.us)): _"GIS analysis has become programming and development"_, así que la cuestión es más bien... **¿en qué lenguaje/s de programación invierto?**

Aunque la lista de lenguajes candidatos es potencialmente extensa, para obtener el máximo retorno del esfuerzo lo más adecuado hoy día es centrare en **SQL, Python y JavaScript**.

¿Por qué estos lenguajes y no otros? 

## Structured Query Language (SQL)
![sql.png](/img/user/Me/Articulos/2015-01-07-3-lenguajes-de-programacion-para-sig/media/sql.png)
**SQL** (1974): lleva cuarenta años con nosotros y sigue vigente. Aunque estrictamente no es un lenguaje de programación, sino un 'lenguaje de consultas estructurado', lo importante es que todo SIG lleva un motor de consultas interno que permite, en mayor o menor medida, aplicar SQL. Si sabes bien los fundamentos, te será mucho más fácil aplicar luego los operadores espaciales disponibles para enriquecerlo con la componente "geo". Acabarás teniendo un SHP, una plataforma en la nube como CartoDB, un PostGIS o un miserable Access, pero lo que es seguro es que si trabajas con SIG tendrás que manejar con soltura SQL.

## Python
![python.png](/img/user/Me/Articulos/2015-01-07-3-lenguajes-de-programacion-para-sig/media/python.png)
**Python** (1991): el lenguaje para muchos más adecuado para iniciarse en la programación, con librerías que facilitan el trabajo en prácticamente todo tipo de ámbitos (interfaces, multimedia, bioinformática...). En el mundo SIG la decisión ya está tomada hace un tiempo, desde el momento en que potentes librerías como _GDAL/OGR_ crearon sus envoltorios para Python y ESRI & QGIS lo adoptaron como lenguaje de geoprocesamiento. Python es hoy el lenguaje por excelencia para trabajar con SIG, especialmente a nivel de geoprocesamiento y en equipos de escritorio (otro tema es la construcción de soluciones web en servidor, donde el entorno Java con ejemplos como Geoserver-GeoTools aún sigue vigente).

## JavaScript
![javascript.png](/img/user/Me/Articulos/2015-01-07-3-lenguajes-de-programacion-para-sig/media/javascript.png)
**JavaScript** (1995): Tiene la capacidad de dotar de interacción a las páginas web e incorporar mapas y otras funciones SIG en ellas mediante bibliotecas (como OpenLayers, Leaflet, etc.), hasta conseguir aplicaciones SIG completas en el navegador web. Prácticamente toda la revolución de la "neogeografía", que tanto ha beneficiado a los SIG estos últimos años, ha venido de su mano (primero con GoogleMaps, y más recientemente con bibliotecas como las de CartoDB, Mapbox...). De hecho, ahora comienzan a aparecer librerías JavaScript como [Turf](http://turfjs.org/) para algo impensable hace unos años: realizar cálculos SIG en el navegador web (buffer, intersección, isolíneas...), sin tener que recurrir a un servidor dedicado de respaldo como ArcGIS Server o Geoserver.

> JavaScript no "viaja solo": en la práctica hay que considerar un lote de 3 lenguajes, puesto que lleva aparejado lidiar con sus dos lenguajes 'hermanos': **HTML y CSS**, que lo apoyan para construir aplicaciones web.

## Haz tu mix
Si cada uno de estos lenguajes ya es útil por si sólo, lo son más en combinación. Aprovechar las sinergias que surgen entre ellos permite explotar y construir sistemas SIG más potentes (p.ej. usar Python en ArcGIS o QGIS y realizar filtros SQL contra una base de datos PostGIS, usar JavaScript y realizar consultas SQL a través de un API contra una tabla remota en CartoDB, etc.).

Así que mi consejo es: 1. aprende los fundamentos básicos de los 3 **lenguajes** 2. dedica el tiempo a profundizar en ellos y en nuevas **bibliotecas** de funciones que los enriquezcan. 3. mejora durante el proceso tus **habilidades generales** de programación (algoritmos, diseño, herramientas y prácticas ágiles...).
