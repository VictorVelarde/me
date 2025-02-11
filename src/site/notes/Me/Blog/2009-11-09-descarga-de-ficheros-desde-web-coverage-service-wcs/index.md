---
{"dg-publish":true,"dg-path":"Blog/2009-11-09-descarga-de-ficheros-desde-web-coverage-service-wcs/index.md","permalink":"/blog/2009-11-09-descarga-de-ficheros-desde-web-coverage-service-wcs/index/","title":"Descarga de ficheros desde Web Coverage Service (WCS)","tags":["ogc","python","wcs"]}
---


Este script sirve para realizar peticiones a un servicio OGC-WCS para, dado un encuadre y una 'coverage' conocida, descargar su información a local en ficheros. Está realizado con python y utiliza la librería urllib2. Los ficheros raster generados, en Geotiff o AsciiGrid, pueden luego cargarse en cualquier programa GIS o manipularse con librerías estándar como gdal.

**UtilidadesWCS.py**

\[sourcecode language="python" wraplines="false"\] import os import time import urllib2

''' Utilidad de extraccion de servicio WCS @author: VictorVelarde (victor.velarde@gmail.com) ''' class ServicioWCS(object): """ Utilidad para generar peticiones a un servicio OGC-WCS y guardar los resultados en disco """

ANCHURA\_PETICION = 10000 #mismas unidades que el sistema de proyeccion SEGUNDOS\_ESPERA\_ENTRE\_PETICIONES = 5

def \_\_init\_\_(self, url): ''' Constructor con url del servicio, p.ej: http://www.idee.es/wcs/IDEE-WCS-UTM30N/wcsServlet? ''' self.url = url

def ExtraerFicheros(self, xmin, ymin, xmax, ymax, directorioSalida, formatoWCS): if(os.path.isdir(directorioSalida) == False): os.mkdir(directorioSalida)

print 'Inicio de la extraccion' i = 1

for x in range(xmin, xmax, ServicioWCS.ANCHURA\_PETICION): for y in range(ymin, ymax, ServicioWCS.ANCHURA\_PETICION): url = ('%s?REQUEST=GetCoverage&amp;SERVICE=WCS&amp;VERSION=1.0.0&amp;FORMAT=%s&amp;COVERAGE=MDT25\_peninsula\_zip&amp;BBOX=%f,%f,%f,%f&amp;CRS=EPSG:23030&amp;RESX=25&amp;RESY=25' %(self.url, formatoWCS, x, y, x + ServicioWCS.ANCHURA\_PETICION, y + ServicioWCS.ANCHURA\_PETICION)) print url peticion = urllib2.Request(url) respuesta = urllib2.urlopen(peticion) extension = {FormatoWCS.ASCII\_GRID : '.asc', FormatoWCS.GEOTIFF: '.tif'} fileHandle = open('%s/%03d%s' %(directorioSalida, i, extension\[formatoWCS\]), 'wb') fileHandle.write(respuesta.read()) fileHandle.close()

time.sleep(ServicioWCS.SEGUNDOS\_ESPERA\_ENTRE\_PETICIONES) i = i + 1

print 'Fin de la extraccion'

class FormatoWCS: ASCII\_GRID = 'AsciiGrid' GEOTIFF = 'Geotiff'

\[/sourcecode\]

Y para ejecutarlo:

\[sourcecode language="python" wraplines="false"\] from UtilidadesWCS import ServicioWCS, FormatoWCS servicio = ServicioWCS("http://www.idee.es/wcs/IDEE-WCS-UTM30N/wcsServlet") servicio.ExtraerFicheros(333850.0, 4728100.0, 503850.0, 4888100.0, "extraccion", FormatoWCS.ASCII\_GRID) servicio.ExtraerFicheros(333850.0, 4728100.0, 503850.0, 4888100.0, "extraccion", FormatoWCS.GEOTIFF) \[/sourcecode\]

Como alguno me los habéis pedido, aquí subo los ficheros por si alguien quiere probarlos: [Megaupload](http://www.megaupload.com/?d=BZ1FCPRO)

EDIT: Editado para añadir mejoras de Wordpress al código fuente.
