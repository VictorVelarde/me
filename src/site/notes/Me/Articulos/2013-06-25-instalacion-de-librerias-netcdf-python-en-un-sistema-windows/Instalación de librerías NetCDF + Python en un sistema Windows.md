---
{"dg-publish":true,"dg-path":"Articulos/2013-06-25-instalacion-de-librerias-netcdf-python-en-un-sistema-windows/Instalación de librerías NetCDF + Python en un sistema Windows.md","permalink":"/articulos/2013-06-25-instalacion-de-librerias-netcdf-python-en-un-sistema-windows/instalacion-de-librerias-net-cdf-python-en-un-sistema-windows/","title":"Instalación de librerías NetCDF + Python en un sistema Windows","tags":["netcdf","python"]}
---


La instalación adecuada de Python + NetCDF es algo muy extendido y documentado en sistemas Linux, pero no tanto en sistemas Windows. En esta entrada el objetivo es recoger los pasos necesarios para conseguirlo, a modo de referencia rápida con las instrucciones y enlaces oportunos.

![Python + netCDF](/img/user/Me/Articulos/2013-06-25-instalacion-de-librerias-netcdf-python-en-un-sistema-windows/media/python_nc.png)

[NetCDF](http://www.unidata.ucar.edu/software/netcdf/docs/faq.html) es un formato binario de fichero (.nc) orientado a arrays, que facilita el manejo de varias dimensiones (x, y, z, tiempo...) de forma eficiente y flexible. Por esta razón está muy extendido en la comunidad científica, por ejemplo para guardar datos del medio como temperaturas, corrientes, viento, salinidad, etc. obtenidos mediante sensores o modelado. 

De forma indisoluble con el formato, existe un conjunto de librerías para NetCDF que facilitan el acceso a sus datos desde varios lenguajes (C, Fortran, Java, etc.) y que son la pasarela con la que trabaja el programador. Python es por su parte el lenguaje de scripting más potente y posee multitud de librerías para ampliar su campo de acción (para el manejo de datos SIG, cálculo intensivo, gráficos, etc.), por lo que juntos forman una buena combinación en el ámbito científico.

Los pasos para configurarlos de forma integrada en una plataforma Windows de 32 bits son:

- **(A) Python 2.7.** Si aún no lo tenemos, la última versión disponible para la rama 2.x (la más extendida) es actualmente la 2.7.5, [descargable aquí](http://www.python.org/ftp/python/2.7.5/python-2.7.5.msi)

- **(B) NetCDF4.** Las librerías base están escritas en C y para usarlas es necesario descargarlas y compilarlas o, algo más práctico, obtener directamente los binarios. Siguiendo la segunda vía, [aquí está](http://www.unidata.ucar.edu/netcdf/win_netcdf/netCDF4.3.0-NC4-32.exe) el instalador con la última versión para netCDF4. Para una descripción más detallada del procedimiento con estos binarios, ver [este enlace](http://www.unidata.ucar.edu/software/netcdf/docs/winbin.html)

- **(C) Acceso a las librerías NetCDF.** Para un enlace posterior a las librerías, es necesario agregar al PATH los siguientes directorios, generados por el instalador: _C:\\Program Files\\netCDF 4.3.0\\bin_ y _c:\\Program Files\\netCDF 4.3.0\\deps\\shared\\bin_

- **(D) Numpy.** El acceso a los datos de los ficheros NetCDF se realizará de forma efectiva con esta librería para Python, especializada en el manejo de arrays.  La última versión disponible hoy, la 1.7.1, para Python 2.7 está [disponible aquí](https://pypi.python.org/packages/2.7/n/numpy/numpy-1.7.1.win32-py2.7.exe) 

- **(E) Interfaz de Python para netcdf4.** Ésta es la librería Python que permite leer y escribir en los netcdf desde scripts .py, actuando de pasarela hacia las librerías base previamente configuradas (C). El instalador para la 2.X está en [este enlace](https://netcdf4-python.googlecode.com/files/netCDF4-1.0.4.win32-py2.7.exe)

- **(F) Validación.** Finalmente, para probar que todo está correcto, ejecutaremos un pequeño script de Python, leyendo un netcdf cualquiera (fichero testNC.py). P.ej. estos [datos de la NASA](http://data.giss.nasa.gov/cgi-bin/gistemp/nmaps.cgi?year_last=2013&month_last=5&sat=4&sst=3&type=anoms&mean_gen=05&year1=2013&year2=2013&base1=1951&base2=1980&radius=1200&pol=reg) muestran las anomalías térmicas sobre la superficie terrestre y es posible descargarlos en formato netCDF [desde aquí](http://data.giss.nasa.gov/cgi-bin/gistemp/nmaps_netcdf.cgi?id=GHCN_GISS_ERSST_1200km_Anom05_2013_2013_1951_1980) en un fichero "nmaps.nc". Como nota útil, señalar que para visualizar de forma rápida el netcdf se puede usar un visor como [Panoply](http://www.giss.nasa.gov/tools/panoply/) o un software SIG como gvSIG, que en su versión más reciente incluye soporte a [este formato](http://blog.gvsig.org/2013/04/30/datos-en-netcdf-para-gvsig-v2-0/)

**testNC.py**
```python
# -*- coding: utf-8 -*-
import netCDF4 as nc
import numpy as np

'''
Prueba de acceso a netCDF en Python Win32.
Abre un fichero .nc y obtiene el valor mínimo de una variable conocida ('TEMPANOMALY')
'''

print('TEST netCDF en Python')

rutaFichero = "c:/users/admin/nmaps.nc"
fichero = nc.Dataset(rutaFichero)

print("* Variables disponibles en el fichero:")
for v in fichero.variables:
    print(v)

datos = fichero.variables["TEMPANOMALY"][0]
print("* Mayor anomalía de temperatura negativa: {0} K".format(min(datos)))
```

 > Nota: como los datos de la variable vienen en un array con "máscara" (para indicar dónde hay 'huecos' sin datos), es posible utilizar las clases de numpy específicas y hacer algo como:

```python
minimo = np.ma.MaskedArray.min(fichero.variables["TEMPANOMALY"][:])
maximo = np.ma.MaskedArray.max(fichero.variables["TEMPANOMALY"][:])
```

Algunos otros [ejemplos de uso de ficheros .nc en Python](http://netcdf4-python.googlecode.com/svn/trunk/docs/netCDF4-module.html)