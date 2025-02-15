---
{"dg-publish":true,"dg-path":"Blog/2011-02-08-menu-contextual-mapa-api-javascript-arcgis-server/Menu contextual sobre mapa - API Javascript ESRI.md","permalink":"/blog/2011-02-08-menu-contextual-mapa-api-javascript-arcgis-server/menu-contextual-sobre-mapa-api-javascript-esri/","title":"Menu contextual sobre mapa - API Javascript ESRI","tags":["arcgisserver","dojo","menu","popup"]}
---


Lo siguiente es una pequeña guía de algo que me parece muy útil: generar un menu contextual asociado al botón derecho cuando estás sobre el mapa. Al margen de tener la típica barra superior de herramientas, con este tipo de menú podremos tener más a mano cualquier acción invocable desde javascript que nos interese, como p.ej. hacer zoom más en un punto o recoger las coordenadas del clic y usarlas para otra acción como p.ej. un geocoding.

El resultado final sería algo como esto:
![menumapa.png](/img/user/Me/Blog/2011-02-08-menu-contextual-mapa-api-javascript-arcgis-server/media/menumapa.png)

Para el menu vamos a usar la librería de Javascript dojo y el mapa estará realizado con el [API ESRI de Javascript](http://help.arcgis.com/EN/webapi/javascript/arcgis/index.html).

Tomaremos como base un [ejemplo de ESRI para mostrar un mapa topográfico]((http://resources.esri.com/help/9.3/arcgisserver/apis/javascript/arcgis/demos/map/map_topo.html)). Y ahora a ese codigo vamos a añadirle la funcionalidad del menu emergente.

Para ello: 

## a) Importamos el control de dojo para el menu.

```javascript
dojo.require("dijit.Menu");
```

## b) Añadimos el marcado en el HTML
Añadimos al HTML de la pagina el código de marcado del diálogo (también se podría crear al vuelo con javascript). Los atributos son importantes para vincularlo correctamente al mapa y cada entrada del menu tiene asociada la función de javascript que queramos:

```html
<div dojotype="dijit.Menu" id="menu" contextmenuforwindow="false" 
     style="display: none;" targetnodeids="map">
    <div dojotype="dijit.MenuItem" onclick="Foo();">Foo</div>
    <div dojotype="dijit.MenuSeparator"></div>
    <div dojotype="dijit.MenuItem" onclick="Bar();">Bar</div>
</div>
```

## c) Captura del evento de clic derecho
Y finalmente la captura del evento 'clic botón derecho' y el guardado del punto del mapa. De manera automática y justo a continuación de la gestion del evento, dojo se encargará de mostrar el menu emergente y ya podremos usar en nuestras funciones el último valor de la variable _lastPoint_.

```js
dojo.connect(map, 'onMouseDown', this, function(evt) {
    if (evt.button !== 2) return; // solo botón derecho
    lastPoint = evt.mapPoint;
});
```

El código completo sería algo como: 

```html
 <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <title> Topographic Map</title> <link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/1.6/js/dojo/dijit/themes/tundra/tundra.css"> <style> html, body { height: 100%; width: 100%; margin: 0; padding: 0; } </style> <script type="text/javascript">var djConfig = {parseOnLoad: true};</script> <script type="text/javascript" src="http://serverapi.arcgisonline.com/jsapi/arcgis/?v=1.6"></script> <script type="text/javascript"> dojo.require("dijit.layout.BorderContainer"); dojo.require("dijit.layout.ContentPane"); dojo.require("esri.map"); dojo.require("dijit.Menu");

var map; var lastPoint;

function Foo(){ alert("x: " + lastPoint.x + " y: " + lastPoint.y); } function Bar(){ alert('Bar'); }

function init() { var initExtent = new esri.geometry.Extent({"xmin":-13635568,"ymin":4541606,"xmax":-13625430,"ymax":4547310,"spatialReference":{"wkid":102100}}); map = new esri.Map("map",{extent:initExtent}); var basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World\_Topo\_Map/MapServer"); map.addLayer(basemap); var resizeTimer; dojo.connect(map, 'onLoad', function(theMap) { dojo.connect(dijit.byId('map'), 'resize', function() { //resize the map if the div is resized clearTimeout(resizeTimer); resizeTimer = setTimeout( function() { map.resize(); map.reposition(); }, 500); }); });

dojo.connect(map, 'onMouseDown', this, function(evt){ if(evt.button !== 2) return; // only right button lastPoint = evt.mapPoint; }); }

dojo.addOnLoad(init); </script> </head> <body class="tundra"> <div dojotype="dijit.layout.BorderContainer" design="headline" gutters="false" style="width: 100%; height: 100%; margin: 0;"> <div id="map" dojotype="dijit.layout.ContentPane" region="center" style="overflow:hidden;"></div> </div> <!-- Right-button menu --> <div dojotype="dijit.Menu" id="menu" contextmenuforwindow="false" style="display: none;" targetnodeids="map"> <div dojotype="dijit.MenuItem" onclick="Foo();">Foo</div> <div dojotype="dijit.MenuSeparator"></div> <div dojotype="dijit.MenuItem" onclick="Bar();">Bar</div> </div> </body>

</html>
```


La última versión del API para JS disponible con la que lo hemos probado es la v2.1 pero no debería ser un problema usar el código en otras versiones.

