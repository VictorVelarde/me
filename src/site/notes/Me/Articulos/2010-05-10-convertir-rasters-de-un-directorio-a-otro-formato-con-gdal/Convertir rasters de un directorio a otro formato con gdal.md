---
{"dg-publish":true,"dg-path":"Articulos/2010-05-10-convertir-rasters-de-un-directorio-a-otro-formato-con-gdal/Convertir rasters de un directorio a otro formato con gdal.md","permalink":"/articulos/2010-05-10-convertir-rasters-de-un-directorio-a-otro-formato-con-gdal/convertir-rasters-de-un-directorio-a-otro-formato-con-gdal/","title":"Convertir rasters de un directorio a otro formato con gdal","tags":["gdal","python","raster"]}
---


![gdal.png](/img/user/Me/Articulos/2010-05-10-convertir-rasters-de-un-directorio-a-otro-formato-con-gdal/media/gdal.png)

Teniendo acceso desde línea de comandos a la utilidad **gdal\_translate** (distribuida p.ej. en FWTools), podemos convertir todos los ficheros .ecw de una carpeta a formato .tif, mediante el siguiente código en Python:

```python
import os

directorio_actual = os.getcwd()
directorio_salida = os.path.join(directorio_actual, "resultados")

os.makedirs(directorio_salida, exist_ok=True)

for root, dirs, files in os.walk(directorio_actual):
    for fichero in files:
        nombre_fichero, extension = os.path.splitext(fichero)
        if extension == ".ecw":
            comando = f"gdal_translate {fichero} {os.path.join(directorio_salida, nombre_fichero + '.tif')}"
            print(comando)
            os.system(comando)
```

Copiamos el código a un fichero llamado p.ej. `ejecutar.py`dentro de la carpeta que nos interese, creamos una carpeta dentro para los ficheros transformados ('resultados') y ejecutamos... Más fácil imposible.

Se pueden introducir fácilmente otras variantes, p.ej. con otros formatos de raster, viendo las opciones disponibles en la herramienta [gdal\_translate](http://www.gdal.org/gdal_translate.html)
