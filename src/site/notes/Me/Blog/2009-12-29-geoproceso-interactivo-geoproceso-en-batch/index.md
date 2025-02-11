---
{"dg-publish":true,"dg-path":"Blog/2009-12-29-geoproceso-interactivo-geoproceso-en-batch/index.md","permalink":"/blog/2009-12-29-geoproceso-interactivo-geoproceso-en-batch/index/","title":"Geoproceso interactivo / geoproceso en batch","tags":["geoprocesos","python"]}
---


[![Geoprocesos ESRI](http://victorvelarde.wordpress.com/wp-content/uploads/2009/12/esrigp.gif?w=250 "Geoprocesos ESRI")](http://victorvelarde.wordpress.com/wp-content/uploads/2009/12/esrigp.gif)En ocasiones, con geoprocesos que tienen como parámetro de entrada entidades vectoriales, es interesante que podamos ejecutarlos de dos modos:

(1) de manera interactiva (dibujando nosotros las geometrías) o (2) suministrando una capa ya existente que tenga las entidades  (p.ej. un shapefile).

Dentro del entorno de geoprocesos de ESRI, esto se corresponde con la definición de un parámetro de tipo **FeatureSet** (1) y un parámetro como **FeatureLayer** (2), respectivamente.

\[Esto en la versión 9.3 de ArcGIS Desktop viene incorporado 'de serie', así que no hay problema. Lo que se comenta a continuación en este post es aplicable solo para la versión **9.2**\]

Una manera sencilla de que el mismo script pueda trabajar con los dos modos es como se muestra a continuación:

```
gp = arcgisscripting.create()
gp.overwriteoutput = 1
if gp.ScratchWorkspace is None:
    gp.ScratchWorkspace = gp.GetSystemEnvironment("TEMP")
# Parametros de entrada.........
fs = gp.GetParameter(0)   # (1) FeatureSet [opcional]
fLayer = gp.GetParameter(1)   #(2) FeatureLayer [opcional]
# Detección del MODO DE USO
if (str(fLayer).strip() != ""):
    gp.AddMessage("Trabajando con modo batch...")
else:
    gp.AddMessage("Trabajando con modo interactivo...")
    #Adaptación del FeatureSet a Feature Layer
    tmp = str(int(math.ceil(random.random()*1000000)))
    fLayer = "%s\\%s.shp" %(gp.ScratchWorkspace, tmp)
    fs.Save(fLayer)
# A partir de aquí, el tratamiento puede ser igual
registros = gp.SearchCursor(fLayer)
registro = registros.Next()
while registro:
    # tratamiento del registro [...]
    registro = registros.Next()

```

En la línea tmp = ... también puede usarse gp.CreateScratchName. Que sea útil.
