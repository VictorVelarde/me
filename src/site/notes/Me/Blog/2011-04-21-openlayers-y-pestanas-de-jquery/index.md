---
{"dg-publish":true,"dg-path":"Blog/2011-04-21-openlayers-y-pestanas-de-jquery/index.md","permalink":"/blog/2011-04-21-openlayers-y-pestanas-de-jquery/index/","title":"OpenLayers y pestañas con jQuery","tags":["jquery","jqueryui","openlayers","popup","tabs"]}
---


En este artículo vamos a ver cómo incluir pestañas de jquery (_jqueryui tabs_) dentro de un popup de OpenLayers. Si queréis ver el resultado podéis ir directamente al enlace de **jsfiddle** \[1\].[![](Me/Blog/2011-04-21-openlayers-y-pestanas-de-jquery/images/jquerytabsenopenlayers.png "jqueryTabs en OpenLayers")](http://jsfiddle.net/VictorVelarde/DbCgt/)

 **jQuery** \[2\]  se ha convertido en la librería por antonomasia para extender el javascript estándar en las páginas web modernas. Si desarrollas para la web, tienes que conocerla. Pero... _¿cómo trabajar con jQuery + OpenLayers?_

1. Hay algunos intentos de desarrollar un plugin para jQuery que permita trabajar con OpenLayers, como **MapQuery** \[3\], que antes se denominaba GeoJQuery. El proyecto lleva poco tiempo, pero habrá que seguir sus pasos; quizá pronto sea una alternativa a GeoExt \[4\].
2. Mientras tanto es más frecuente que tengamos en marcha un proyecto con OpenLayers y queramos utilizar puntualmente jQuery, especialmente algún componente visual o widget de **jqueryui**, como las pestañas (_tabs_) o un acordeón (_accordion_) \[5\].

Vamos a ver cómo hacer en el caso 2, con un ejemplo sencillo.

a) Creamos el html básico para soportar el mapa, con las importaciones de librerías javacript y css necesarias. Hemos dejado un script vacío, que es donde iremos introduciendo el código.

\[sourcecode language="html" wraplines="false"\] <html> <head> <script src="http://www.openlayers.org/api/OpenLayers.js" type="text/javascript"></script> <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js" type="text/javascript"></script> <script src="http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.9/jquery-ui.min.js" type="text/javascript"></script> <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/> <title>Pestañas de jQuery en OpenLayers</title> </head> <body> <div id="mapa" style="width:512px; height:512px"></div> <script type="text/javascript"></script> </body> </html> \[/sourcecode\]

b) Primero añadimos la función que generará el contenido html del popup. Éste debe seguir los convenios de estructura establecidos por jqueryui. Lo más importante son los 'li' y que los enlaces apunten al mismo id que tengan los 'div' posteriores.

\[sourcecode language="javascript" wraplines="false"\] // Html del popup con pestañas de jquery function prepararFicha(ciudad) { var div = $("<div>"); var contenido = $("<div id='popupConTabs' style='font-size:9px;'>"); var titulos = $("<ul>" + "<li><a href='#tab-1'>Atributos</a></li>" + "<li><a href='#tab-2'>Wikipedia</a></li>" + "</ul>"); contenido.append(titulos);

// Pestaña 1 var p1 = $("<div id='tab-1'>"); p1.append($("<p>" + "<b>Nombre</b>: " + ciudad.attributes.Nombre + "<br/>" + "<b>Habs.</b>: " + ciudad.attributes.Habitantes + "</p>")); contenido.append(p1);

// Pestaña 2 var p2 = $("<div id='tab-2'>"); p2.append($("<p><a href='" + ciudad.attributes.Wikipedia + "'>Wikipedia</b></p>")); contenido.append(p2);

div.append(contenido); return div.html(); } \[/sourcecode\]

c) Lo siguiente  es la creación usual de un mapa, una capa vectorial con un solo registro y el control de selección. Nada particular.

\[sourcecode language="javascript" wraplines="false"\] // Creación del mapa y encuadre inicial var WGS84 = new OpenLayers.Projection('EPSG:4326'); var MERCATOR = new OpenLayers.Projection('EPSG:900913'); var peninsula = new OpenLayers.Bounds(-18.0, 26.0, 6.0, 44.0).transform(WGS84, MERCATOR); var mapa = new OpenLayers.Map("mapa"); mapa.addLayer(new OpenLayers.Layer.OSM()); mapa.zoomToExtent(peninsula);

// Creación de una capa vectorial con 1 registro puntual var ciudades = new OpenLayers.Layer.Vector("Ciudades"); mapa.addLayer(ciudades); var geometria = new OpenLayers.Geometry.Point(-3.8, 43.46).transform(WGS84, MERCATOR); var atributos = { Nombre: 'Santander', Habitantes: 181589, Wikipedia: 'http://es.wikipedia.org/wiki/Santander\_(Espa%C3%B1a)' }; var santander = new OpenLayers.Feature.Vector(geometria, atributos); ciudades.addFeatures(\[santander\]);

// Creación del control de selección var controlSeleccion = new OpenLayers.Control.SelectFeature(ciudades); mapa.addControl(controlSeleccion); controlSeleccion.activate(); \[/sourcecode\]

d) Finalmente, la siguiente porción de código es la que establece las funciones manejadoras de eventos para crear el popup. En la función se produce la llamada clave al constructor 'tabs', para dotar del aspecto y funcionalidad deseados al html del popup.

\[sourcecode language="javascript" wraplines="false"\] // Mostrar el popup al seleccionar la ciudad var popup; ciudades.events.on({ "featureselected": function(e) { var ciudad = e.feature; var html = prepararFicha(ciudad); popup = new OpenLayers.Popup.FramedCloud( "Info ciudad", ciudad.geometry.getBounds().getCenterLonLat(), null, html, null, true, function() { controlSeleccion.unselect(ciudad); }); popup.minSize = new OpenLayers.Size(300, 100); ciudad.popup = popup; mapa.addPopup(popup); $("#popupConTabs").tabs(); /\* << Creacion de Tabs \*/ }, "featureunselected": function(e) { var ciudad = e.feature; mapa.removePopup(ciudad.popup); ciudad.popup.destroy(); ciudad.popup = null; } });

\[/sourcecode\]

Referencias:

\[1\] El código de este post en funcionamiento: [http://jsfiddle.net/VictorVelarde/DbCgt/](http://jsfiddle.net/VictorVelarde/DbCgt/)

\[2\] Librería jquery: [http://jquery.com/](http://jquery.com/)

\[3\] Ejemplo de uso de MapQuery: [http://blog.spaziogis.it/static/jquerymap/](http://blog.spaziogis.it/static/jquerymap/)

\[4\] Proyecto GeoExt (OpenLayers + ExtJS): [http://www.geoext.org/](http://www.geoext.org/)

\[5\] El control de pestañas de jqueryui: [http://jqueryui.com/demos/tabs/](http://jqueryui.com/demos/tabs/)

\[6\] Uso de jqueryui slider con OpenLayers: [http://workshops.opengeo.org/openlayers-intro/integration/jqui-slider.html](http://workshops.opengeo.org/openlayers-intro/integration/jqui-slider.html)
