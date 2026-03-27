---
{"dg-publish":true,"dg-path":"Articulos/2025-05-coleccion-promptly/Promptly 06 - Búsqueda de prompts.md","permalink":"/articulos/2025-05-coleccion-promptly/promptly-06-busqueda-de-prompts/","title":"Promptly 06 - Búsqueda de prompts","tags":["nextjs","supabase","postgresql"],"dg-note-properties":{"title":"Promptly 06 - Búsqueda de prompts","date":"2025-05-19","categories":["programacion"],"tags":["nextjs","supabase","postgresql"],"review":false,"starred":null,"descripcion":"Promptly 06 -  Búsqueda de prompts"}}
---


<div class="transclusion internal-embed is-loaded"><div class="markdown-embed">



[[Blog/Articulos/2025-05-coleccion-promptly/Promptly 01 - El arranque del proyecto\|Promptly 01 - El arranque del proyecto]]
[[Blog/Articulos/2025-05-coleccion-promptly/Promptly 02 - Listar prompts\|Promptly 02 - Listar prompts]]
[[Blog/Articulos/2025-05-coleccion-promptly/Promptly 03 - Ejecutar un prompt\|Promptly 03 - Ejecutar un prompt]]
[[Blog/Articulos/2025-05-coleccion-promptly/Promptly 04 - Publicar un prompt\|Promptly 04 - Publicar un prompt]]
[[Blog/Articulos/2025-05-coleccion-promptly/Promptly 05 - Importación de prompts\|Promptly 05 - Importación de prompts]]
[[Blog/Articulos/2025-05-coleccion-promptly/Promptly 06 - Búsqueda de prompts\|Promptly 06 - Búsqueda de prompts]]
[[Blog/Articulos/2025-05-coleccion-promptly/Promptly 07 - Perfil y licencia\|Promptly 07 - Perfil y licencia]]


</div></div>


---

```table-of-contents
```


# Sesión 6

## Punto de partida
### Objetivos
- Sin cambios
### Tareas
Como ya señalamos en sesiones previas, el manejo de tags parece un elemento importante, lo trabajaremos en esta sesión. Sin embargo, vista la experiencia actual del listado de prompts, no parece que  tenga sentido mostrar toda la info y las acciones en el listado de prompts (por claridad, por rapidez en las consultas...). Sería mejor mostrar esa info desde el detalle del prompt individual; así que voy a hacer primero algunos ajustes, simplificando la lista de prompts.

- [x] Registrarse para crear una cuenta
- [x] Logarse después
- [x] Persistir y recuperar prompts
- [x] Ejecutar un prompt 
- [x] Copiar un prompt al portapapeles
- [x] Catálogo de prompts públicos
- [x] Importación de prompts
- [x] Configuración de dominio
- [ ] Lista mejorada de prompts + username
- [ ] Colecciones de prompts con tags
- [ ] Compartir un prompt 
- [ ] Ajustes de prompt (idioma de salida, tono, etc.)

## Acciones

### Lista mejorada de prompts + username!
Solo *nombre, autor y fecha del prompt* en la lista sería lo ideal; solo hay un pequeño problema 😄: con el registro actual (email y clave), no hay nombre de usuario, solo email. 

En este punto, creo que es razonable que se pida como input y se guarde al registrar al usuario, como el típico *username* único de toda red social. No creo que sea adecuado mostrar, por privacidad, el email de las personas que se registran; este solo es requerido para validar el signup / sign-in y si lo compartes, puede acabar en spam o correos no deseados. 

Tiro un poco de ChatGPT, lo suficiente para averiguar que Supabase no da la feature tal cual, hay que currárselo un poco y saber lo que se quiere (precisamente porque exponer email u otros datos de los users es delicado). Me tropiezo con esta [referencia](https://stackoverflow.com/questions/78550922/how-do-i-authorise-users-with-username-in-supabase), que a su vez apunta a la guia recomendada de **Supabase**  para [user-data](https://supabase.com/docs/guides/auth/managing-user-data) y sigo su enfoque: básicamente un trigger y una nueva tabla para mantener users y sus nombres separados pero sincronizados.

> [!info] 
> Por cierto, me he dado cuenta, al ir a mirar unos cambios WIP, que no tengo debugger para el lado server-side (sí para cliente, con chrome). Siguiendo la guía de NextJS se pueden poner ambos en VS Code: https://nextjs.org/docs/pages/guides/debugging#debugging-with-vs-code, y con esto en el proyecto es más fácil trabajar.


Esta es la vista simplificada:
![promptly_07_simple_public_list.png](/img/user/Blog/Articulos/2025-05-coleccion-promptly/media/promptly_07_simple_public_list.png)

### Colecciones de prompts con tags / buscar
Las tags son un elemento central, pero en compañía de estas y para tener un buen catálogo, hay ciertos elementos que sí o sí deberían estar en el producto, así que con algo de ayuda de ChatGPT y GPT-4.1 en VSCode, implemento las siguientes features:
- **1. paginación**
- **2. búsqueda por título**
- **3. búsqueda por tag**
- **4. ordenación** (asc / desc, por título y fecha)

#### UX de la búsqueda
Como el objetivo al final es poder compartir fácilmente prompts, es interesante *persistir el estado en la url*, lo cual permite compartir búsquedas fácilmente...  

Durante un rato le he estado dando vueltas también a la experiencia de uso de los tags. Por ejemplo:
- he considerado que la búsqueda por tag no sea exacta, sino case insensitive
- distintas formas de seleccionar las tags por UI
- ...

Después de revisar experiencias de otros productos, he decidido adoptar un enfoque que me gusta mucho y es sencillo, que son las *labels en github*: básicamente en la caja de búsqueda se permite escribir una sintaxis muy sencilla (label:nombreLabel) y esto permite de forma cómoda agregarlas a la búsqueda; en mi caso lo implemento, con tag:miTag. Este mismo sistema es extrapolable a otras propiedades en el futuro (por ejemplo, búsqueda por usuario, con user:username).

Por otro lado, para aplicarlas, basta con hacer clic en la tag, cuando aparecen asignadas (permitiendo algo como "buscar similares"): caja de búsqueda - url irán siempre acompasadas. Para el filtro, juego un rato con la UI y me decido por un dropdown sencillo, a la derecha de la caja de búsqueda.

La experiencia de este bloque se ve algo como:
![promptly_08_tags_search.gif](/img/user/Blog/Articulos/2025-05-coleccion-promptly/media/promptly_08_tags_search.gif)

### Compartir prompt
Una vez la búsqueda está resuelta bien, la página clave es la *vista pública del prompt*. Una página sencilla, de solo lectura, para mostrar el prompt en sí, que implemento de forma rápida. La url será /prompts/[id_prompt] 

Como está pensada como página pública, para compartir un prompt por ejemplo en una red social, es interesante dotarla de los metadatos en el servidor, basados en un estándar como *OpenGraph*. NextJS permite fácilmente usar su función *generateMetadata* para que se generen las previsualizaciones adecuadas al compartir.

## Resumen
El producto va teniendo forma... Se incluye:

- [x] Registrarse para crear una cuenta
- [x] Logarse después
- [x] Persistir y recuperar prompts
- [x] Ejecutar un prompt 
- [x] Copiar un prompt al portapapeles
- [x] Catálogo de prompts públicos
- [x] Importación de prompts
- [x] Configuración de dominio
- [x] Lista mejorada de prompts + username
- [x] Colecciones de prompts con tags / buscar
- [x] Compartir un prompt 
- [ ] Ajustes de prompt (idioma de salida, tono, etc.)
