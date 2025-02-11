---
{"dg-publish":true,"dg-path":"Blog/2017-06-05-jornadas-sig-libre-girona-2017/Jornadas SIG Libre Girona 2017.md","permalink":"/blog/2017-06-05-jornadas-sig-libre-girona-2017/jornadas-sig-libre-girona-2017/","title":"Jornadas SIG Libre Girona 2017"}
---


La semana pasada tuve la suerte de poder acudir de nuevo a las Jornadas de SIG Libre de Girona, en su edición nº 11, esta vez presentando un desarrollo técnico. Aquí está el programa completo de las Jornada, como referencia: http://www.sigte.udg.edu/jornadassiglibre/programa/ (colgarán más adelante los vídeos de las ponencias). Estaba revisando mis notas, para hacer balance y compartirlo con mis compañeros, pero he pensado que quizá sería más interesante hacerlo públicamente, así que aquí están.

![jsl11-Girona2017](/img/user/Me/Blog/2017-06-05-jornadas-sig-libre-girona-2017/images/jsl11-girona2017.jpg)

# Ponencias plenarias

Tras la apertura oficial por parte de la Universidad, comenzaron las Jornadas con la presencia de _Rosa M. Badia_ (Barcelona Supercomputing Center - BSC). Dejando de lado las cifras brutales de cálculo previstas para el Mare Nostrum 4, lo que me llamó la atención fue la importancia que le prestaba no al hardware, sino a los _modelos de programación_ y cómo indicaba la mezcla progresiva, en enfoques y herramientas, entre Supercomputación y BigData. Aunque no hubo referencia alguna a temas geoespaciales, Rosa citó [PyCOMPSs](https://pypi.python.org/pypi/pycompss) un framework libre en Python para favorecer el desarrollo de modelos en paralelo en estos entornos, el cual parece interesante.

A continuación _Lluís Sanz_ (Instituto Municipal de Informática del Ayuntamiento de Barcelona) hizo un repaso general de la estrategia [Barcelona Ciudad Digital](http://ajuntament.barcelona.cat/estrategiadigital/es). En el ámbito SIG, ya en la parte final, comentó que están en un proceso de migración de bases de datos y herramientas diversas a QGIS, en un proyecto que se llama _QVista_ y que será liberado este año, lo cual es una gran noticia. Si esto se cumple, podríamos disponer de un código aplicable también a otros ayuntamientos.

Terminó el bloque de plenarias _David Comas_, de Nexus Geographics, todo un referente en los SIG. Con una visión muy clara, lanzó algunas ideas-clave: (1) lo generalista en los SIG ya está solucionado, hay que especializarse y (2) los SIG, con interfaces de alto valor, deben responder preguntas concretas y sencillas y así brindar tiempo al usuario experto para resolver él los temas complejos.

# Comunicaciones

Frederic Bartumeus (CREAF) presentó [Mosquito Alert](http://www.mosquitoalert.com/), una plataforma de ciencia ciudadana para la lucha contra el mosquito tigre y las enfermedades que transmite. Muy interesante caso de cómo ligar ciudadanos, científicos y gestores públicos gracias a una aplicación de base geoespacial. Creo que en el futuro se desarrollarán muchas más iniciativas de este tipo y ojalá que parte de su código sea reutilizable para ello ([github](https://github.com/MoveLab))

Tras él, _María Arias de Reyna_ habló sobre las pocas mujeres, y en general poca diversidad, que existe en el ámbito tecnológico y cómo esto supone una clara pérdida de riqueza y variedad de enfoques. Presentó como luchar contra esta situación gracias a iniciativas como [@pingmujeres](https://twitter.com/pingmujeres?lang=es) y llamó la atención sobre los aspectos educativos, señalando la necesidad de despertar más vocaciones [STEM](https://es.wikipedia.org/wiki/Educaci%C3%B3n_STEM) en niñas y adolescentes.

_Ramiro Aznar_ (Carto), mostró después 3 casos tipo en los que la representación con mapas es habitualmente difícil y los resultados obtenidos generalmente malos, junto con propuestas para mejorarlas: \* muchos puntos, de distintas categorías, generando "empaste" por estar próximos y/o superpuestos. Cuando esto sucede, aconseja reducir las categorías y jugar con la ordenación visual (categorías menos abundantes arriba) y la transparencia (los registros más escasos, arriba, más transparentes). \* puntos en el mismo lugar. Para hacer visible lo oculto se pueden usar varias alternativas, como mapas de calor, clusters, [stacking chips](https://carto.com/blog/stacking-chips-a-map-hack) o agregación de puntos. \* muchos campos para un solo registro. Aquí es conveniente pensar no en un mapa estático, sino en visualizaciones interactivas, en las que con controles como los de _Builder_ se pueda aplicar de forma rápida y sencilla filtrado y estilos dinámicos. La verdad es que en esto Carto brilla especialmente.

_Santiago Higuera_ presentó después el estado de OpenStreetMap España y cómo el proyecto sigue con impulso, con unos 100-110 usuarios activos al día y aprox. 30.000 nodos/día modificados en España.

Tras la pausa para la comida, continuaron las sesiones. A partir de aquí había doble 'track' así que sólo recogeré el bloque al que acudí (llamado "Investigación"):

_Víctor Olaya_ (Boundless) presentó algunos consejos interesantes para los profesionales del SIG, tanto desarrolladores como usuarios / analistas. Básicamente, se centraban en la construcción por parte de cada uno de un "portfolio" público, perdiendo el miedo a la vergüenza, en el que se demuestren las capacidades e intereses, sea a través de foros, listas de correo, blogs o repositorios github.

_Iván Sánchez_ mostró después las posibilidades que se abren al aplicar [WebGL](https://gitlab.com/IvanSanchez/Leaflet.TileLayer.GL) a mapas teselados en Leaflet. Un trabajo innovador y que muestra una gran velocidad de pintado pixel a pixel, abriendo la puerta a visualizaciones y análisis raster en el navegador. Creo que el futuro del pintado de mapas en web pasa claramente por trabajos con WebGL como este.

_Eduard Suñé_ (IDESCAT) explicó con detalle cómo crear grids de población útiles, mediante quadtrees, a la vez que se protege el necesario secreto estadístico. Un ámbito que profesionalmente no conozco, pero que me hizo reflexionar sobre el esfuerzo necesario para encontrar un equilibrio entre dato geográfico de máxima calidad y el derecho a la privacidad de las personas.

_Santiago Higuera_ dió luego un repaso a las opciones de referenciación lineal, ejemplificando en la red de carreteras españolas; se repasaron algunos aspectos de la ISO19148 y las opciones presentes en SIG de escritorio libres y PostGIS.

_Jose Gómez Castaño_ (INSPIDE), autor de la app [Comobity](https://play.google.com/store/apps/details?id=com.inspide.comobity&hl=es), describió la arquitectura de su plataforma _Singularity_ para la DGT, donde tecnologías de Big Data como Spark, Hadoop, Flume o Kafka sirven para explotar datos en tiempo real y contribuir a una mayor seguridad en las vías públicas. Creo que ésta es una línea muy clara de futuro del sector geo: aplicaciones geográficas en un mercado vertical muy claro, con grandes volúmenes de datos y productos geográficos (no solo mapas) en tiempo real.

_César Díaz_ (Tracasa Instrumental) mostró por su parte cómo utilizan unas tecnologías SIG muy contrastadas para crear mapas temáticos, en el Ayuntamiento de Pamplona (OpenLayers + Geoserver + PostGIS, con vistas parametrizadas, WMS & SLD); sin duda un 'stack clásico', pero muy efectivo.

Por la tarde, continué en las charlas del track "Desarrollos técnicos":

_Roger Veciana_ (Meteocat), presentó algo novedoso: cómo aplicar D3js como herramienta de render de datos raster meteorológicos, permitiendo eliminar el proceso de generación automática de tiles en el servidor cada día. Con esto el cliente web gana en flexibilidad y capacidad de cambiar estilos al vuelo. Una desarrollo muy interesante, como lo es blog de su autor [geoexamples](http://geoexamples.com).

Después de Roger, nosotros presentamos el trabajo que hemos hecho en el IHCantabria: [Leaflet.CanvasLayer.Field](https://github.com/IHCantabria/Leaflet.CanvasLayer.Field/), un plugin para crear animaciones de viento / corrientes y que también renderiza raster, esta vez sobre Leaflet.

Aquí la [presentación completa](https://victorvelarde.github.io/presentacion-jsl11/).

[![pluginLeaflet](/img/user/Me/Blog/2017-06-05-jornadas-sig-libre-girona-2017/images/pluginleaflet1.png)](http://victorvelarde.github.io/presentacion-jsl11)

Y tras nosotros, el mismo Roger, esta vez a título personal, presentó una extensión llamada [d3-composite-projections](https://github.com/rveciana/d3-composite-projections), la cual permite visualizar áreas disjuntas en un solo mapa (p.ej. Canarias 'cerca' de la Península). Muy práctica, p.ej. para mapas electorales.

_Ernesto Martínez_ (Carto) dió por su parte un repaso a las novedades de esta plataforma en 2017, siendo la principal la migración a Builder para todos los usuarios _free_. Otro aspecto que personalmente me llamó la atención fue la creciente importancia de los datos pre-cargados en la plataforma para enriquecer los análisis (_Data Observatory_).

_Josep Lluís Sala_ (Giswater Association) contó el estado de la aplicación y de la red de asociados a este proyecto. Es un mercado en el que parece que la solución, basada en QGIS, PostGIS y modelos hidráulicos libres, parece estar convirtiéndose en estándar, lo cual es una gran noticia.

_Ivan Sánchez_ presentó después una llamativa charla, llamada "Índices Miriahédricos Fractales Cuaternarios Para Fenómenos Geográficos", que escondía un curioso uso de palabras como índices geográficos (básicamente un _what3words_, pero con tacos).

Y finalmente _María Arias de Reyna_ mostró el estado de GeoNetwork, un CMS 'geográfico' con mucha solera para trabajar con metadatados, al que claramente le han dado un buen empujón en lo visual.

# Talleres

Además de las comunicaciones, tuve la oportunidad de acudir a dos talleres:

- El primero sobre Docker, impartido por _Joana Simoes_ y _Jorge de Jesús_. _Docker_ parece una herramienta muy interesante para facilitar la gestión de servicios en producción, no solo para gente "de sistemas", sino también para desarrolladores. Me gustó la iniciativa que presentaron, [geocontainers](https://hub.docker.com/u/geocontainers/), con algunos servicios SIG empaquetados y preparados para usar, y una herramienta visual para el control de contenedores llamada [portainer](http://portainer.io/).
- El segundo taller, sobre desarrollo de plugins para QGIS, fue impartido por _Luigi Pirelli_. Estuvo centrado en las herramientas necesarias para iniciar este camino: la consola básica, [IPyConsole](https://github.com/elpaso/qgis-ipythonconsole), [Plugin Builder](https://github.com/g-sherman/Qgis-Plugin-Builder), [Remote Debug](https://github.com/sourcepole/qgis-remote-debug) y [Plugin Reloader](https://github.com/borysiasty/plugin_reloader). Existen documentos que ayudan en el cambio de la v2 a la v3, para ayudar en el proceso de [migración de plugins](http://slides.com/luigipirelli/desdarrolloplugindeqgis-xi-girona#/18). Como consejo interesante: está previsto liberar QGIS 3 para finales de 2017 y parece bueno dejar aún madurar un poco las APIs.
    

# Resumen

A modo de resumen, diría que tengo la sensación que el mercado SIG Libre, y con él las Jornadas, ha madurado, con empresas, tecnologías y usuarios consolidados. Quizá eché en falta alguna presentación más sobre JavaScript o nuevas tendencias como BigData, drones... pero creo que los contenidos en general han sido buenos, la organización y el ambiente inmejorables, y espero poder repetir el próximo año.

¡Saludos!
