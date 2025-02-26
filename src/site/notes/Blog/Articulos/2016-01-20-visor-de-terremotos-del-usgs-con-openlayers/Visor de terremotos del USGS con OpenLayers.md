---
{"dg-publish":true,"permalink":"/blog/articulos/2016-01-20-visor-de-terremotos-del-usgs-con-openlayers/visor-de-terremotos-del-usgs-con-open-layers/","title":"Visor de terremotos del USGS con OpenLayers","tags":["geojson","openlayers"]}
---


En este post se presenta un pequeño ejemplo de visor, en el que se muestran los terremotos más recientes en el mundo, usando la biblioteca _OpenLayers 3_.

![](/img/user/Blog/Articulos/2016-01-20-visor-de-terremotos-del-usgs-con-openlayers/media/thumbnail.png)

Los terremotos se leen de un origen remoto, en formato _Geojson_, y se actualizan automáticamente, gracias a un estupendo servicio _feed_ del [USGS](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)

- El visor puede verse funcionando, gracias a _bl.ocks.org_ aquí: http://bl.ocks.org/VictorVelarde/raw/5021e3679dad1305d570/
- Y en cuanto al codigo HTML y JavaScript, es sencillo y puede verse en este _gist_: https://gist.github.com/VictorVelarde/5021e3679dad1305d570

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Ejemplo sencillo con OL3</title>
    <link href="http://fonts.googleapis.com/css?family=Open+Sans|Dosis:400,800" rel="stylesheet" type="text/css" />

    <!-- Versión específica vs. master | min vs. debug -->
    <link rel="stylesheet" href="http://openlayers.org/en/v3.12.1/css/ol.css" type="text/css">
    <script src="http://openlayers.org/en/v3.12.1/build/ol-debug.js"></script>

    <style>
        /* General */
        
        h1 {
            font-family: 'Dosis', sans-serif;
            font-weight: 400;
            font-size: 40px;
            line-height: 46px;
            margin-bottom: 10px;
            color: #E50275;
        }
        
        body {
            font-family: 'Open Sans', sans-serif;
            background-color: #F7FBFF;
        }
        
        .ficha {
            color: #03A1C4;
        }
    </style>
</head>

<body>
    <h1>Mapa de terremotos significativos el último mes (USGS)</h1>

    <div id="mapa" style="height: 400px; border: 2px gray solid;"></div>
    <div id="seleccion" style="margin-top:10px"></div>

    <!-- JavaScript -->
    <script>
        var mapa = new ol.Map({
            layers: [new ol.layer.Tile({
                source: new ol.source.OSM()
            })],
            target: 'mapa',
            view: new ol.View({
                center: [0, 0],
                zoom: 2
            })
        });

        mapa.addControl(new ol.control.OverviewMap());

        // carga de datos
        var urlTerremotos = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';
        var capaTerremotos = new ol.layer.Vector({
            source: new ol.source.Vector({
                url: urlTerremotos,
                format: new ol.format.GeoJSON()
            })
        });
        mapa.addLayer(capaTerremotos);

        // interacción capa vectorial
        var seleccion = new ol.interaction.Select();
        mapa.addInteraction(seleccion);
        seleccion.on('select', function (e) {
            // ol.interaction.SelectEvent
            var div = document.getElementById('seleccion');
            var seleccionados = e.target.getFeatures();
            var html = '';
            seleccionados.forEach(function (t) {
                html += '<div class="ficha"><ul>';
                html += '<li><strong>Lugar</strong>: ' + t.get('place') + '</li>';
                html += '<li><strong>Magnitud</strong>: ' + t.get('mag') + '</li>';
                html += '<li><strong>Fecha</strong>: ' + new Date(t.get('time')).toLocaleDateString() + '</li>';
                html += '</ul></div>';
            });
            div.innerHTML = html;
        });
    </script>

</body>
</html>
```

---

> **Sobre gist & bl.ocks**: \* _[gist](https://gist.github.com/)_. Se trata de un servicio gratuito de github, para alojar pequeños codigos de ejemplo, que se persisten sobre un repositorio _git_. Gracias a ello son accesibles para su modificación desde cualquier equipo con un cliente git. \* _[bl.ocks.org](http://bl.ocks.org/)_. Un servicio, del creador de D3, que siguiendo unos pocos convenios en el gist, permite el acceso a su código en vivo, junto a su fuente, permitiendo mini-proyectos autodocumentados.

_Nota_: Este ejemplo se presenta en el último video de la serie de seminarios sobre JavaScript, elaborada para geospatialtraining.com (ver [Videos de introducción a JavaScript](https://victorvelarde.wordpress.com/2016/01/12/videos-introduccion-a-javascript/))

[Video explicativo](https://youtu.be/ik6F38PPBYw)
