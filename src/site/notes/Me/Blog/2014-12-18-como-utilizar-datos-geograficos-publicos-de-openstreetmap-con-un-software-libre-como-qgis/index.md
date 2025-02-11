---
{"dg-publish":true,"dg-path":"Blog/2014-12-18-como-utilizar-datos-geograficos-publicos-de-openstreetmap-con-un-software-libre-como-qgis/index.md","permalink":"/blog/2014-12-18-como-utilizar-datos-geograficos-publicos-de-openstreetmap-con-un-software-libre-como-qgis/index/","title":"Cómo utilizar datos geográficos públicos de OpenStreetMap con un software libre como QGIS","tags":["osm","qgis"]}
---


Analizar datos espaciales y generar con ellos mapas atractivos para el usuario es la gran fortaleza de los Sistemas de Información Geográfica (SIG). Y si hace unos pocos años el software SIG y los datos de calidad estaban sólo al alcance de unos pocos (grandes corporaciones, militares, universidades...), hoy cualquier profesional bien formado tiene en su mano la posibilidad de usarlos de forma rápida y gratuita. En esta entrada veremos algunas posibilidades del uso combinado de un software SIG libre como [QGIS](http://www.qgis.org/) y los datos, también libres, de [OpenStreetMap](http://www.openstreetmap.org/).

**¿Cómo empezar a trabajar con QGIS y OSM?**

Instalando en nuestros equipos la última versión de QGIS Desktop dispondremos de un software SIG de escritorio completo, gratuito y extensible mediante plugins (instrucciones de instalación detalladas de la v2.6, para Linux, Windows y Mac, en [http://www.qgis.org/es/site/forusers/download.html](http://www.qgis.org/es/site/forusers/download.html)).

OpenStreetMap (OSM) no es sólo un mapa: es una base de datos mundial con más de 30 GB de datos geográficos vectoriales de información muy diversa y detallada (carreteras, caminos, edificios, restaurantes, parques naturales...). En las últimas versiones QGIS integra de forma nativa la opción de descarga de datos OSM, desde su menú `Vectorial - OpenStreetMap (OSM) - Descargar Datos`. Esto simplifica y agiliza la descarga de una porción de datos OSM, en forma de fichero vectorial `.osm` (XML).

En este ejemplo, utilizaremos datos de la ciudad de Santander, dentro del área geográfica definida manualmente por las siguientes coordenadas: `xmin:-3.8313931 ymin: 43.4449263 | xmax:-3.7658341 ymax: 43.4784917`

> QGIS también permite descargar datos OSM dentro del encuadre de una capa preexistente o a partir del zoom actual por pantalla. En cualquier caso, es importante que el sistema de referencia sea WGS84 Longitud / Latitud (EPSG: 4326) o el proceso no funcionará correctamente. Esto es debido a que internamente el complemento hace uso del [API Overpass](http://wiki.openstreetmap.org/wiki/Overpass_API), que recibe como parámetros las coordenadas del encuadre en este sistema.

Una vez descargados los datos OSM (en un fichero _santander.osm_, de aprox. 5 MB), se pueden cargar directamente en QGIS, mediante la opción de menú `Capa - Añadir capa - Añadir capa vectorial` (y luego seleccionando _points / lines / multipolygons_).

\[caption id="attachment\_408" align="alignnone" width="510"\][![OSM_Base](/img/user/Me/Blog/2014-12-18-como-utilizar-datos-geograficos-publicos-de-openstreetmap-con-un-software-libre-como-qgis/images/osm_base.png)](https://victorvelarde.wordpress.com/wp-content/uploads/2014/12/osm_base.png) Fig.1: Datos OSM con los estilos por defecto en QGIS\[/caption\]

Una vez obtenidos los datos podemos comenzar el proceso de explotación y análisis, utilizando distintas herramientas de QGIS. A continuación mostraremos brevemente 3 ejemplos ilustrativos:

 

**Ejemplo 1. Usar OSM para generar un mapa**

Es posible tomar los datos OSM y generar con QGIS un mapa 100% personalizado, seleccionando cada entidad a mostrar, su etiquetado, su estilo... hasta obtener un mapa base o mapa temático a nuestra medida.

QGIS proporciona un mecanismo para persistir reglas de visualización mediante ficheros de estilos reutilizables (_.qml_). Por ejemplo, existen algunos .qml públicos que permiten dar una apariencia 'googlemaps' a un lote de datos .OSM y si los aplicamos a nuestras capas OSM (menú de capa `Propiedades - Cargar estilo`) el resultado es un mapa base como el siguiente:

\[caption id="attachment\_409" align="alignnone" width="510"\][![Fig.2: Mismos datos OSM, con los estilos osm_spatialite_googlemaps_.qml, tomados de https://github.com/anitagraser/QGIS-resources/tree/master/qgis2/osm_spatialite](/img/user/Me/Blog/2014-12-18-como-utilizar-datos-geograficos-publicos-de-openstreetmap-con-un-software-libre-como-qgis/images/osm_estilos.png)](https://victorvelarde.wordpress.com/wp-content/uploads/2014/12/osm_estilos.png) Fig.2: Mismos datos OSM, con los estilos osm\_spatialite\_googlemaps\_.qml, tomados de https://github.com/anitagraser/QGIS-resources/tree/master/qgis2/osm\_spatialite\[/caption\]

> Los .qml usados son ficheros para la versión 2.4 de QGIS y no se contemplan todos los tipos de objetos OSM, como p.ej. 'playas' (categoría _natural:beach_), con lo cual para un resultado óptimo deben trabajarse más los estilos.

 

**Ejemplo 2. Usar OSM para un análisis de redes**

OSM incluye un subconjunto especialmente relevante de datos que es la red viaria. OSM recoge el grafo conectado de autopistas, carreteras, caminos, calles... y permite por tanto aplicar los algoritmos propios del análisis de redes: camino más corto, estimación de tiempos para recorridos, etc.

Aunque existen herramientas más sofisticadas, QGIS proporciona una práctica utilidad para calcular la ruta más corta en una red, mediante su complemento `Grafo de rutas`.

> Antes de usar el complemento hay que cargar la capa de líneas y luego configurar el plugin, mediante `Vectorial - Configuración del complemento Grafos de rutas`. En ese apartado de configuración se puede fijar p.ej. la velocidad media de los tramos. Para ver los datos de tiempo y velocidad correctamente, será necesario usar una proyección que utilice metros como unidad, así que aplicaremos antes una reproyección al vuelo (en este caso, a la zona le corresponde ETRS89-UTM30N: EPSG:25830).

Si fijamos una velocidad media de 50 km/h a toda la red, podemos calcular por ejemplo la distancia y tiempo estimado del camino más corto entre la estación de tren de RENFE y los Jardines de Piquío en el Sardinero.

\[caption id="attachment\_410" align="alignnone" width="510"\][![Fig.3: Los datos de la red de transporte OSM utilizados para un cálculo de camino más corto](/img/user/Me/Blog/2014-12-18-como-utilizar-datos-geograficos-publicos-de-openstreetmap-con-un-software-libre-como-qgis/images/osm_redes.png)](https://victorvelarde.wordpress.com/wp-content/uploads/2014/12/osm_redes.png) Fig.3: Los datos de la red de transporte OSM utilizados para un cálculo de camino más corto\[/caption\]

 

**Ejemplo 3. Usar OSM para la búsqueda de vivienda**

Los datos OSM pueden usarse también para análisis de otra índole, encadenando sobre ellos operaciones espaciales sucesivas (área de influencia, intersección, etc.). P.ej. para la búsqueda de la mejor ubicación para alquilar una vivienda, en base a una serie de requisitos previos tales como p.ej. la proximidad a una escuela, cercanía a vías de comunicación rápidas, etc.

En el siguiente vídeo puede verse un análisis vectorial sobre datos OSM en esta línea:

https://vimeo.com/112687753  

* * *

Esta entrada es una colaboración en el blog iNFoRMáTICa++, perteneciente a los Estudios de Informática, Multimedia y Telecomunicación (EIMT) de la Universitat Oberta de Catalunya (UOC). Publicada originalmente en: [http://informatica.blogs.uoc.edu/2014/12/15/como-utilizar-datos-geograficos-publicos-de-openstreetmap-con-un-software-libre-como-qgis/](http://informatica.blogs.uoc.edu/2014/12/15/como-utilizar-datos-geograficos-publicos-de-openstreetmap-con-un-software-libre-como-qgis/ "http://informatica.blogs.uoc.edu/2014/12/15/como-utilizar-datos-geograficos-publicos-de-openstreetmap-con-un-software-libre-como-qgis/")
