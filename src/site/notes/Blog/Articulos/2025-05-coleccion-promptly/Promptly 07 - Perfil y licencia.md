---
{"dg-publish":true,"dg-path":"Articulos/2025-05-coleccion-promptly/Promptly 07 - Perfil y licencia.md","permalink":"/articulos/2025-05-coleccion-promptly/promptly-07-perfil-y-licencia/","title":"Promptly 07 - Perfil y licencia","tags":["nextjs","supabase","postgresql"],"dg-note-properties":{"title":"Promptly 07 - Perfil y licencia","date":"2025-05-20","categories":["programacion"],"tags":["nextjs","supabase","postgresql"],"review":true,"starred":null,"descripcion":"Promptly 07 -  Perfil y licencia"}}
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


# Sesión 7

## Punto de partida
### Objetivos
El producto ya tiene un valor, desde mi punto de vista. Le podríamos agregar muchas más features, claro, pero considero que ya puede ser una herramienta sencilla y util para gestionar prompts. En este punto, creo que lo interesante antes de invertir más esfuerzo es sacarlo y recibir feedback. 

Solo hay un aspecto último que me gustaría añadir antes a nivel funcional, y es una pequeña página de **perfil del usuario** + un selector de **licencia** al publicar los prompts.  Si los usuarios quieren usar la app, aun manteniendo en privado su email, parece que tiene sentido que mantengan su pequeño espacio, que les identifique claramente como autores, y permita reconocimiento / enlaces a otros lugares que ellos manejen (por ejemplo, un enlace a una web de un profesor que escriba prompts para su asignatura). 

Por otro lado, la propia licencia de los prompts me parece otro aspecto importante. Muchas veces los prompts son breves, y se comparten tal cual, sin esperar reconocimiento de ningún tipo. Otras veces, sin embargo los prompts son colecciones o razonamientos mucho más elaborados, a los que los autores quieren seguir vinculados... Ambas cosas se pueden resolver con el perfil de usuario + selector licencia prompt, así que las agrego a la lista y me pongo a implementarlas, como últimas features antes de lanzar la aplicación.

### Tareas
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
- [ ] Perfil de usuario
- [ ] Licencia de prompt

Dejamos para el futuro otras ideas de features, pendiente de ver con los usuarios si son interesantes:
- [ ] Ajustes de prompt (idioma de salida, tono, etc.)
- [ ] Likes de prompts
- [ ] Fork de prompt
- [ ] etc.

## Acciones

### Perfil de usuario
Actualmente los usuarios se registran con 3 elementos: nombre de usuario, email (privado) y contraseña. Lo más flexible para dar voz (espacio en la UI) a los autores, es dejarles un espacio. Como me encanta la simplicidad y potencia del markdown (texto, enlaces, imágenes...), voy a añadir un espacio al registro que permita una pequeña "**Bio**" con .md. Y de paso, voy a ofrecer la posibilidad de cambiar dicha Bio y el Username, desde un espacio para editar el perfil.

Para acceder al perfil de un usuario (url tipo */profiles/promptly*), se puede acceder desde la vista individual del prompt. He aprovechado para agregar también la búsqueda de prompts en el catalogo de un usuario y he linkado ambas vistas. La feature de forma conjunta se ve tal que así:

![promptly_09_profile.gif](/img/user/Blog/Articulos/2025-05-coleccion-promptly/media/promptly_09_profile.gif)
🔝para el render he usado la librería `react-markdown` , que siempre me ha dado buenos resultados.

### Licencia de prompts
De nuevo, nos podríamos complicar aquí, pero vamos a ir una lista cerrada de licencias: las Creative Commons (CC), que me parecen las más adecuadas para prompts. Y para cubrir casos especiales, simplemente agregaremos una opción cajon de sastre "Otra", donde el usuario pueda escribir lo que desee (por ejemplo "MIT", pero en modo texto abierto, para simplificar).

La selección de tipo de licencia, desde la edición de prompts (modo privado) se ve tal que así:

![promptly_10_license.gif](/img/user/Blog/Articulos/2025-05-coleccion-promptly/media/promptly_10_license.gif)

## Resumen

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
- [x] Perfil de usuario
- [x] Licencia de prompt

Vamos a sacar https://promptly.es y ver cómo se desarrolla 😄