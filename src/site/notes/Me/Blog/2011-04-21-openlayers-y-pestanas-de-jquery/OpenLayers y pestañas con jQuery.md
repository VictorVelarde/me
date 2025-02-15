---
{"dg-publish":true,"dg-path":"Blog/2011-04-21-openlayers-y-pestanas-de-jquery/OpenLayers y pestañas con jQuery.md","permalink":"/blog/2011-04-21-openlayers-y-pestanas-de-jquery/open-layers-y-pestanas-con-j-query/","title":"OpenLayers y pestañas con jQuery","tags":["jquery","jqueryui","openlayers","popup","tabs"]}
---


En este artículo vamos a ver cómo incluir pestañas de jquery (_jqueryui tabs_) dentro de un popup de OpenLayers.

![jquerytabsenopenlayers.png](/img/user/Me/Blog/2011-04-21-openlayers-y-pestanas-de-jquery/media/jquerytabsenopenlayers.png)

## jQuery

 [jQuery](http://jquery.com/)  se ha convertido en la librería por antonomasia para extender el javascript estándar en las páginas web modernas. Si desarrollas para la web, tienes que conocerla. Pero... _¿cómo trabajar con jQuery + OpenLayers?_

1. Hay algunos intentos de desarrollar un plugin para jQuery que permita trabajar con OpenLayers, como [MapQuery](http://blog.spaziogis.it/static/jquerymap/), que antes se denominaba GeoJQuery. El proyecto lleva poco tiempo, pero habrá que seguir sus pasos; quizá pronto sea una alternativa a [GeoExt](http://www.geoext.org/).
2. Mientras tanto es más frecuente que tengamos en marcha un proyecto con OpenLayers y queramos utilizar puntualmente jQuery, especialmente algún componente visual o widget de **jqueryui**, como las pestañas (_tabs_) o un acordeón ([accordion](http://jqueryui.com/demos/tabs/))

Vamos a ver cómo hacer en el caso 2, con un ejemplo sencillo.

## Código completo

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pestañas de jQuery en OpenLayers</title>
    
    <!-- Estilos de jQuery UI -->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    
    <!-- Librerías necesarias -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://openlayers.org/api/OpenLayers.js"></script>
    
    <style>
        #mapa {
            width: 512px;
            height: 512px;
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>
    <div id="mapa"></div>
    <script>
        // Función para preparar el contenido del popup con pestañas
        function prepararFicha(ciudad) {
            var div = $("<div>");
            var contenido = $("<div id='popupConTabs' style='font-size: 9px;'>");

            var titulos = $("<ul>")
                .append("<li><a href='#tab-1'>Atributos</a></li>")
                .append("<li><a href='#tab-2'>Wikipedia</a></li>");

            contenido.append(titulos);

            // Pestaña 1 - Información de la ciudad
            var p1 = $("<div id='tab-1'>").append(
                $("<p>").html(
                    "<b>Nombre:</b> " + ciudad.attributes.Nombre + "<br/>" +
                    "<b>Habs.:</b> " + ciudad.attributes.Habitantes
                )
            );
            contenido.append(p1);

            // Pestaña 2 - Enlace a Wikipedia
            var p2 = $("<div id='tab-2'>").append(
                $("<p>").html("<a href='" + ciudad.attributes.Wikipedia + "' target='_blank'>Wikipedia</a>")
            );
            contenido.append(p2);

            div.append(contenido);
            return div.html();
        }

        // Definiciones de proyecciones
        var WGS84 = new OpenLayers.Projection("EPSG:4326");
        var MERCATOR = new OpenLayers.Projection("EPSG:900913");

        // Definir el encuadre inicial del mapa
        var peninsula = new OpenLayers.Bounds(-18.0, 26.0, 6.0, 44.0).transform(WGS84, MERCATOR);
        var mapa = new OpenLayers.Map("mapa");
        mapa.addLayer(new OpenLayers.Layer.OSM());
        mapa.zoomToExtent(peninsula);

        // Crear una capa vectorial y añadir una ciudad
        var ciudades = new OpenLayers.Layer.Vector("Ciudades");
        mapa.addLayer(ciudades);

        var geometria = new OpenLayers.Geometry.Point(-3.8, 43.46).transform(WGS84, MERCATOR);
        var atributos = {
            Nombre: "Santander",
            Habitantes: 181589,
            Wikipedia: "http://es.wikipedia.org/wiki/Santander_(Espa%C3%B1a)"
        };

        var santander = new OpenLayers.Feature.Vector(geometria, atributos);
        ciudades.addFeatures([santander]);

        // Control de selección de elementos en el mapa
        var controlSeleccion = new OpenLayers.Control.SelectFeature(ciudades);
        mapa.addControl(controlSeleccion);
        controlSeleccion.activate();

        // Variables para los popups
        var popup;

        // Evento cuando se selecciona una ciudad
        ciudades.events.on({
            featureselected: function (e) {
                var ciudad = e.feature;
                var html = prepararFicha(ciudad);

                popup = new OpenLayers.Popup.FramedCloud(
                    "Info ciudad",
                    ciudad.geometry.getBounds().getCenterLonLat(),
                    null,
                    html,
                    null,
                    true,
                    function () {
                        controlSeleccion.unselect(ciudad);
                    }
                );

                popup.minSize = new OpenLayers.Size(300, 100);
                ciudad.popup = popup;
                mapa.addPopup(popup);

                // Activación de las pestañas de jQuery UI
                $("#popupConTabs").tabs();
            },
            featureunselected: function (e) {
                var ciudad = e.feature;
                if (ciudad.popup) {
                    mapa.removePopup(ciudad.popup);
                    ciudad.popup.destroy();
                    ciudad.popup = null;
                }
            }
        });
    </script>
</body>
</html>
```

http://jsfiddle.net/VictorVelarde/DbCgt/
