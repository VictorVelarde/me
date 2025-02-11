---
{"dg-publish":true,"dg-path":"Blog/2009-11-09-descarga-de-ficheros-desde-web-coverage-service-wcs/Descarga de ficheros desde Web Coverage Service (WCS).md","permalink":"/blog/2009-11-09-descarga-de-ficheros-desde-web-coverage-service-wcs/descarga-de-ficheros-desde-web-coverage-service-wcs/","title":"Descarga de ficheros desde Web Coverage Service (WCS)","tags":["ogc","python","wcs"]}
---


Este script sirve para realizar peticiones a un servicio OGC-WCS para, dado un encuadre y una 'coverage' conocida, descargar su información a local en ficheros. Está realizado con python y utiliza la librería urllib2. Los ficheros raster generados, en Geotiff o AsciiGrid, pueden luego cargarse en cualquier programa GIS o manipularse con librerías estándar como gdal.

El resultado en este caso es un modelo digital del terreno como éste:
![Me/Blog/2009-11-09-descarga-de-ficheros-desde-web-coverage-service-wcs/images/dem2d.jpg](/img/user/Me/Blog/2009-11-09-descarga-de-ficheros-desde-web-coverage-service-wcs/images/dem2d.jpg)




**UtilidadesWCS.py**
```python
import os
import time
import urllib2

class ServicioWCS:
    """
    Utilidad para generar peticiones a un servicio OGC-WCS y guardar los resultados en disco.
    
    @author: VictorVelarde (victor.velarde@gmail.com)
    """
    
    # Class constants (in same units as projection system)
    ANCHURA_PETICION = 10000
    SEGUNDOS_ESPERA_ENTRE_PETICIONES = 5
    
    def __init__(self, url):
        """
        Constructor with service URL.
        
        Args:
            url (str): Base URL for the WCS service, 
                      e.g.: http://www.idee.es/wcs/IDEE-WCS-UTM30N/wcsServlet?
        """
        self.url = url
    
    def ExtraerFicheros(self, xmin, ymin, xmax, ymax, directorioSalida, formatoWCS):
        """
        Extract files from WCS service based on given coordinates.
        
        Args:
            xmin (float): Minimum X coordinate
            ymin (float): Minimum Y coordinate
            xmax (float): Maximum X coordinate
            ymax (float): Maximum Y coordinate
            directorioSalida (str): Output directory path
            formatoWCS (str): WCS format type
        """
        if not os.path.isdir(directorioSalida):
            os.mkdir(directorioSalida)
            
        print('Inicio de la extraccion')
        i = 1
        
        for x in range(xmin, xmax, ServicioWCS.ANCHURA_PETICION):
            for y in range(ymin, ymax, ServicioWCS.ANCHURA_PETICION):
                url = (
                    f'{self.url}?REQUEST=GetCoverage&SERVICE=WCS&VERSION=1.0.0'
                    f'&FORMAT={formatoWCS}&COVERAGE=MDT25_peninsula_zip'
                    f'&BBOX={x},{y},{x + ServicioWCS.ANCHURA_PETICION},'
                    f'{y + ServicioWCS.ANCHURA_PETICION}&CRS=EPSG:23030'
                    f'&RESX=25&RESY=25'
                )
                
                print(url)
                peticion = urllib2.Request(url)
                respuesta = urllib2.urlopen(peticion)
                
                extension = {
                    FormatoWCS.ASCII_GRID: '.asc',
                    FormatoWCS.GEOTIFF: '.tif'
                }
                
                with open(f'{directorioSalida}/{i:03d}{extension[formatoWCS]}', 'wb') as fileHandle:
                    fileHandle.write(respuesta.read())
                
                time.sleep(ServicioWCS.SEGUNDOS_ESPERA_ENTRE_PETICIONES)
                i += 1
                
        print('Fin de la extraccion')


class FormatoWCS:
    """Available WCS format types."""
    ASCII_GRID = 'AsciiGrid'
    GEOTIFF = 'Geotiff'
```

Y para ejecutarlo:

```python
from UtilidadesWCS import ServicioWCS, FormatoWCS

# Initialize WCS service with IDEE's URL
servicio = ServicioWCS("http://www.idee.es/wcs/IDEE-WCS-UTM30N/wcsServlet")

# Extract data in ASCII Grid format
servicio.ExtraerFicheros(
    xmin=333850.0,
    ymin=4728100.0,
    xmax=503850.0,
    ymax=4888100.0,
    directorioSalida="extraccion",
    formatoWCS=FormatoWCS.ASCII_GRID
)

# Extract same area in GeoTIFF format
servicio.ExtraerFicheros(
    xmin=333850.0,
    ymin=4728100.0,
    xmax=503850.0,
    ymax=4888100.0,
    directorioSalida="extraccion",
    formatoWCS=FormatoWCS.GEOTIFF
)
```

