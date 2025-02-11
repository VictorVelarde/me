---
{"dg-publish":true,"dg-path":"Blog/2010-05-10-convertir-rasters-de-un-directorio-a-otro-formato-con-gdal/Convertir rasters de un directorio a otro formato con gdal.md","permalink":"/blog/2010-05-10-convertir-rasters-de-un-directorio-a-otro-formato-con-gdal/convertir-rasters-de-un-directorio-a-otro-formato-con-gdal/","title":"Convertir rasters de un directorio a otro formato con gdal","tags":["gdal","python","raster"]}
---


[![](http://victorvelarde.wordpress.com/wp-content/uploads/2010/05/gdal.png?w=135 "gdal")](http://victorvelarde.wordpress.com/wp-content/uploads/2010/05/gdal.png)Script sencillito pero práctico, para convertir todos los ficheros raster de un directorio a otro formato raster (dentro de los soportados por [gdal](http://www.gdal.org/))

Teniendo acceso desde línea de comandos a la utilidad **gdal\_translate** (distribuida p.ej. en FWTools), podemos convertir todos los ficheros .ecw de una carpeta a formato .tif, mediante el siguiente código en Python:

\[sourcecode language="python" wraplines="false"\] import os, sys directorioActual = os.getcwd() directorioSalida = os.path.join(directorioActual, "resultados")

for root, dirs, files in os.walk(directorioActual): for fichero in files: (nombreFichero, extension) = os.path.splitext(fichero) if(extension == ".ecw"): comando = "gdal\_translate %s %s\\\\%s" %(fichero, directorioSalida, nombreFichero + ".tif") print comando os.system(comando) \[/sourcecode\]

Copiamos el código a un fichero llamado p.ej. 'ejecutar.py' dentro de la carpeta que nos interese, creamos una carpeta dentro para los ficheros transformados ('resultados') y ejecutamos... Más fácil imposible.

Se pueden introducir fácilmente otras variantes, p.ej. con otros formatos de raster, viendo las opciones disponibles en la herramienta [gdal\_translate](http://www.gdal.org/gdal_translate.html)

EDIT: Editado para añadir mejoras de Wordpress al código fuente
