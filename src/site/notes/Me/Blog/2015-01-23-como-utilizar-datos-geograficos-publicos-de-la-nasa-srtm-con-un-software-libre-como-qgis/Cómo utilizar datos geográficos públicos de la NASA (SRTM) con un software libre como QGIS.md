---
{"dg-publish":true,"dg-path":"Blog/2015-01-23-como-utilizar-datos-geograficos-publicos-de-la-nasa-srtm-con-un-software-libre-como-qgis/Cómo utilizar datos geográficos públicos de la NASA (SRTM) con un software libre como QGIS.md","permalink":"/blog/2015-01-23-como-utilizar-datos-geograficos-publicos-de-la-nasa-srtm-con-un-software-libre-como-qgis/como-utilizar-datos-geograficos-publicos-de-la-nasa-srtm-con-un-software-libre-como-qgis/","title":"Cómo utilizar datos geográficos públicos de la NASA (SRTM) con un software libre como QGIS","tags":["qgis"]}
---


Si en una [entrada previa](https://victorvelarde.wordpress.com/2014/12/18/como-utilizar-datos-geograficos-publicos-de-openstreetmap-con-un-software-libre-como-qgis/) mostrábamos algunos ejemplos de uso de datos vectoriales libres, procedentes de OpenStreetMap, en este caso vamos a revisar una valiosa fuente de datos cuasi-mundial con la altitud del terreno denominada _Shuttle Radar Topography Mission_ (SRTM).

Dentro del mundo SIG, a estas fuentes de datos se las denomina _Modelos Digitales del Terreno (MDT)_ y recogen, generalmente en forma de fichero, una estructura numérica de datos que representa la distribución espacial de una variable, sea en forma vectorial (contornos o TIN) o más frecuentemente raster (matrices regulares o _quadtrees_). Si esta variable es la altitud, entonces hablamos de _Modelos Digitales de Elevaciones_ (MDE).

> Para profundizar en las bases conceptuales de los MDT, recomiendo los estupendos materiales de A.M. Felicísimo en [http://www6.uniovi.es/~feli/CursoMDT/](http://www6.uniovi.es/~feli/CursoMDT/)

La SRTM que nos ocupa es una misión comandada por la NASA desarrollada en el año 2000, que mediante su transbordador espacial Endeavour y un radar aerotransportado tomó datos en detalle sobre la elevación terrestre, entre los 60º de latitud norte y los 56º de latitud sur (más detalles técnicos de la misión en la [página oficial SRTM](http://www2.jpl.nasa.gov/srtm/mission.htm)). Si bien algunos de sus datos son públicos desde hace varios años, desde septiembre de 2014 han comenzado a liberarse por primera vez los lotes más detallados, con la resolución original de aproximadamente 30 metros (1 arco-segundo), antes solo disponibles en USA.

En esta entrada veremos algunas posibilidades del uso combinado de un software SIG libre como [QGIS](http://www.qgis.org/) y los datos de esta fuente.

 
## ¿Cómo empezar a trabajar con QGIS y SRTM?
Asumiendo que ya tenemos QGIS correctamente instalado (instrucciones [aquí](http://www.qgis.org/es/site/forusers/download.html)), procederemos primero a la descarga de datos [SRTM Basic](https://lta.cr.usgs.gov/SRTMBasic).

Para la descarga usaremos una herramienta interactiva proporcionada por el USGS (Servicio Geológico de Estados Unidos) llamada **EarthExplorer** (http://earthexplorer.usgs.gov/). Desde ella se puede descargar no solo la SRTM, sino una gran variedad de fuentes. Antes deberemos registrarnos como usuarios [aquí](https://earthexplorer.usgs.gov/register/) (un proceso gratuito, aunque nos llevará un par de minutos).

Luego seguiremos los sencillos pasos marcados por el asistente:

- `1. Enter Search Criteria`: en nuestro caso navegaremos en el mapa hasta encuadrar el ámbito de la Bahía de Santander, en Cantabria.

![srtm_01.png](/img/user/Me/Blog/2015-01-23-como-utilizar-datos-geograficos-publicos-de-la-nasa-srtm-con-un-software-libre-como-qgis/media/srtm_01.png)
Fig.1: Selección del ámbito de interés en EarthExplorer\

- `2. Select Your Data Set(s)`, donde indicaremos la palabra clave 'SRTM' para filtrar los datos y poder llegar al producto _'SRTM 1 Arc-Second Global'_

![srtm_02.png](/img/user/Me/Blog/2015-01-23-como-utilizar-datos-geograficos-publicos-de-la-nasa-srtm-con-un-software-libre-como-qgis/media/srtm_02.png)
Fig.2: Filtro de dataset SRTM


- Al pulsar en la búsqueda aparecerán las hojas disponibles en el apartado `4. Search Results`. En nuestro caso son dos hojas y procederemos a la descarga de la identificada como _SRTM1N43W004V3_, en formato [_GeoTIFF_](http://es.wikipedia.org/wiki/GeoTIFF).

![srtm_03.png](/img/user/Me/Blog/2015-01-23-como-utilizar-datos-geograficos-publicos-de-la-nasa-srtm-con-un-software-libre-como-qgis/media/srtm_03.png)
Fig.3: Descarga de hoja SRTM 1 Arc-Second Global

El fichero descargado _n43\_w004\_1arc\_v3.tif_ podremos ya cargarlo en **QGIS**.

Para ello bastará con utilizar la opción del menú `Capa - Añadir capa raster` y se visualizará con la escala de colores por defecto, en tonos grises. Podremos también consultar la altitud del terreno registrada en cada punto, haciendo clic con la herramienta `Identificar`.

![srtm_04.png](/img/user/Me/Blog/2015-01-23-como-utilizar-datos-geograficos-publicos-de-la-nasa-srtm-con-un-software-libre-como-qgis/media/srtm_04.png)
Fig.4: MDE de SRTM en QGIS, con paleta gris unibanda

Una vez cargados los datos, podemos comenzar a explotarlos utilizando distintas herramientas de QGIS. A continuación mostraremos brevemente 3 ejemplos.


## Ejemplo 1. Usar SRTM como mapa base
El MDE de la SRTM constituye una gran base para la visualización topográfica, y puede servir como mapa de fondo sobre el que representar después nuestra información geográfica particular (p.ej. una ruta tomada con el GPS). Una forma rápida de dar un estilo mejorado a la capa raster, es mediante `Raster - Análisis del terreno - Relieve`, que genera una capa con visualización de sombreado y tintas hipsométricas simultáneas.

![srtm_05.png](/img/user/Me/Blog/2015-01-23-como-utilizar-datos-geograficos-publicos-de-la-nasa-srtm-con-un-software-libre-como-qgis/media/srtm_05.png)
Fig.5: MDE SRTM sombreado en QGIS
 

## Ejemplo 2. Usar SRTM para una visualización 3D
QGIS dispone de un plugin muy interesante para la visualización en 3D de un MDE en un simple navegador web. El plugin se llama _Qgis2threejs_, que utiliza internamente la librería de JavaScript _threejs_. Con multitud de opciones para explorar, es una herramienta de visualización / publicación web de resultados muy interesante.

![srtm_06.png](/img/user/Me/Blog/2015-01-23-como-utilizar-datos-geograficos-publicos-de-la-nasa-srtm-con-un-software-libre-como-qgis/media/srtm_06.png)
Fig.6: MDE SRTM en vista 3D con Qgis2threejs

## Ejemplo 3. Usar SRTM para un análisis de ubicación óptima
El hecho de conocer la altitud en cada celda (cada 30 metros), unido a las capacidades analíticas de QGIS para datos raster, permite usar SRTM en potentes análisis geográficos. Por ejemplo, es posible modelizar el flujo del agua y estudiar cómo se configuran las cuencas hidrográficas o calcular las horas potenciales de insolación anuales en un punto...

En el siguiente vídeo mostraremos otro ejemplo aplicado a un problema SIG clásico: la búsqueda de la mejor ubicación, apoyados en la _calculadora raster_ de QGIS:
http://vimeo.com/112688478

---

> Esta entrada es una colaboración en el blog iNFoRMáTICa++, perteneciente a los Estudios de Informática, Multimedia y Telecomunicación (EIMT) de la Universitat Oberta de Catalunya (UOC). Publicada originalmente en: [http://informatica.blogs.uoc.edu/2015/01/15/como-utilizar-datos-geograficos-publicos-de-la-nasa-srtm-con-un-software-libre-como-qgis/](http://informatica.blogs.uoc.edu/2015/01/15/como-utilizar-datos-geograficos-publicos-de-la-nasa-srtm-con-un-software-libre-como-qgis/)
