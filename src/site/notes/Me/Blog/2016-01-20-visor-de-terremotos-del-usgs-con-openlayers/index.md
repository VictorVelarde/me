---
{"dg-publish":true,"dg-path":"Blog/2016-01-20-visor-de-terremotos-del-usgs-con-openlayers/index.md","permalink":"/blog/2016-01-20-visor-de-terremotos-del-usgs-con-openlayers/index/","title":"Visor de terremotos del USGS con OpenLayers","tags":["geojson","openlayers"]}
---


En este post se presenta un pequeño ejemplo de visor, en el que se muestran los terremotos más recientes en el mundo, usando la biblioteca _OpenLayers 3_.

![](/img/user/Me/Blog/2016-01-20-visor-de-terremotos-del-usgs-con-openlayers/images/thumbnail.png)

Los terremotos se leen de un origen remoto, en formato _Geojson_, y se actualizan automáticamente, gracias a un estupendo servicio _feed_ del [USGS](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)

- El visor puede verse funcionando, gracias a _bl.ocks.org_ aquí: http://bl.ocks.org/VictorVelarde/raw/5021e3679dad1305d570/
- Y en cuanto al codigo HTML y JavaScript, es sencillo y puede verse en este _gist_: https://gist.github.com/VictorVelarde/5021e3679dad1305d570
    

* * *

**Sobre gist & bl.ocks**: \* _[gist](https://gist.github.com/)_. Se trata de un servicio gratuito de github, para alojar pequeños codigos de ejemplo, que se persisten sobre un repositorio _git_. Gracias a ello son accesibles para su modificación desde cualquier equipo con un cliente git. \* _[bl.ocks.org](http://bl.ocks.org/)_. Un servicio, del creador de D3, que siguiendo unos pocos convenios en el gist, permite el acceso a su código en vivo, junto a su fuente, permitiendo mini-proyectos autodocumentados.

_Nota_: Este ejemplo se presenta en el último video de la serie de seminarios sobre JavaScript, elaborada para geospatialtraining.com (ver [Videos de introducción a JavaScript](https://victorvelarde.wordpress.com/2016/01/12/videos-introduccion-a-javascript/))

[Video explicativo](https://youtu.be/ik6F38PPBYw)
