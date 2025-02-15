---
{"dg-publish":true,"dg-path":"Blog/2009-02-02-shp2geojson/Cómo convertir un shapefile a geojson.md","permalink":"/blog/2009-02-02-shp2geojson/como-convertir-un-shapefile-a-geojson/","title":"Cómo convertir un shapefile a geojson","tags":["geojson","ogr2ogr","openlayers","shapefile"]}
---


Recientemente necesitábamos publicar una capa geográfica dentro de una web con un sencillo visor de mapas hecho con [Openlayers](http://openlayers.org/). La capa estaba en el formato omnipresente ESRI Shapefile.

Openlayers acepta un elevado número de orígenes de datos (WMS, WFS, KML, GeoJSON...) pero no directamente ficheros .shp. Una opción hubiera sido utilizar [Geoserver](http://geoserver.org/) como servidor de los datos, pero buscábamos algo más rápido, para una capa estática, y no queríamos incrementar la infraestructura en el despliegue.

Solución rápida:  generar un fichero con el contenido del .shp en formato geojson y luego alojarlo directamente en el sitio web.  ¿Cómo convertirlo? Utilizando la herramienta gratuita y abierta para conversión entre formatos llamada [ogr2ogr](http://www.gdal.org/ogr2ogr.html).

1. Descargamos e instalamos [FWTools](http://fwtools.maptools.org/) que incluye la citada ogr2ogr y otras utilidades.
2. Desde línea de comandos, en la ruta donde hayamos instalado el software (o la incluimos en el PATH y tecleamos desde cualquier directorio): 
	```shell
	ogr2ogr c:\\ficheroSalida.geojson -f “GeoJSON” C:\\ficheroOriginal.shp
	```
3. Y con esto ya tenemos un fichero geojson apto para consumir desde OpenLayers.
