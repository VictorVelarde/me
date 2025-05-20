---
{"dg-publish":true,"dg-path":"Articulos/2025-05-coleccion-promptly/Promptly 03 - Ejecutar un prompt.md","permalink":"/articulos/2025-05-coleccion-promptly/promptly-03-ejecutar-un-prompt/","title":"Promptly 03 - Ejecutar un prompt","tags":["nextjs","supabase","postgresql"]}
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



# Sesión 3

## Punto de partida
### Objetivos
Los mismos, principalmente de aprendizaje. Pero hoy decido investigar un poco más y pensar más en detalle en los usuarios del producto, antes de avanzar más en la construcción.
#### ¿Que existe similar?
Si esta iniciativa fuera un negocio, hubiera comenzado por aquí claro 😄... Viendo cosas similares en el mercado, parece que existen algunos "marketplace", para la compra-venta de prompts (como **Promptbase** o **FlowGPT**...), y también un listado gratuito e interesante de prompts en inglés, llamado [awesome-prompts](https://github.com/f/awesome-chatgpt-prompts). Se ve interesante, pero contribuir prompts a golpe de commit no parece un flujo sencillo para usuarios no técnicos.

Sobre este último repo y listado existe http://prompts.chat, una app gratuita que los lista y también permite ejecutarlos, pasándoselos como parámetro a varios LLM y abriendo pestañas a los modelos online (eg: https://github.com/copilot). 

Esto último, la forma de **ejecutar rápidamente un prompt desde la app**, abriendo una ventana nueva sí me parece una *feature clave*, así que la voy a desarrollar. Era evidente, pero no le había prestado interés inicialmente porque pensaba que me iba a requerir ejecución en línea, o lo que es lo mismo, tener api keys para los modelos (= añadir costes), pero como pasarela me encaja perfectamente.

#### Algunas ideas sobre el producto
**Compartir**
La gente crea prompts y los comparte ya... y esa tendencia irá a más. ¿Cómo lo hace ahora mismo? Pues con un modo manual, de hecho 100% manual, el creador le pasa el texto a alguien por mensaje, en red social, etc...
- (+) Ventajas
	- es sencillo y funciona
- (-) Inconvenientes
	- En el "Modo manual" se pierde la "autoría original"
	- No hay un lugar para el feedback
	- la catalogación queda del lado del receptor (si quiere volver al prompt más adelante, y volverlo a ejecutar, tendrá que gestionarlos por su cuenta). En el mejor de los casos, el historial de la herramienta le permitirá recuperarlo, pero a día de hoy (por ejemplo en ChatGPT), esto es un lio, más si la persona (como yo) le gusta probar varios prompt, y va saltando de uno a otro (muchas veces porque agota los niveles free tier de cada plataforma).
	- Si se usa el 'share chat' nativo de la app, el prompt queda ligado a la herramienta. En general, y como norma para todo: *mantén el control de tu información*, y que pueda circular por varias herramientas (en este caso, varios LLM, fácilmente), evita el vendor lock-in...
	-  En general, la experiencia puede ser mejor

**Colecciones y aprendizaje**
Algunos pensamientos en alto:
- (a) *series de prompts:* un prompt es muy útil, pero generalmente es solo el punto de partida, lo interesante suele ser una serie más elaborada, con preguntas enlazadas. ¿Tendría sentido relacionar unos prompts con otros linealmente en colecciones pensadas para ejecutarse en orden?
- (b) *aprendizaje*: los prompts pueden servir para trabajo, para ocio... pero sin duda una de los usos principales que yo le veo es el aprendizaje (autónomo o guiado). ¿Tendría sentido hacer colecciones de prompts de aprendizajes sobre un tema?

El modelo de datos podría hacerse más grande y contemplar cosas como 'colecciones ordenadas de prompts', por ejemplo. Pero de nuevo... *¿que es lo más sencillo que puede funcionar?*. Pues diría que los **tags**; ya hemos incorporado el campo al prompt en la DB y pueden servir como la formula más sencilla de agrupación de prompts, así que será el siguiente elemento en el que trabajaremos (después de la ejecución del prompt) . Además, si se quiere orden, pues puede ser tan fácil como usar un tag, por ejemplo "curso-programación" y luego usar nombres tal que "01 - Primer tema", "02 - Segundo tema", etc.

Tras esta parte de brainstorming / investigación, las tareas y su orden quedarían en algo como este **mini-roadmap**:

### Tareas
- [x] Registrarse para crear una cuenta
- [x] Logarse después
- [x] Persistir y recuperar prompts
- [ ] Ejecutar un prompt 
- [ ] Copiar un prompt al portapapeles
- [ ] Compartir un prompt
- [ ] Catálogo de prompts públicos
- [ ] Colecciones de prompts con tags


## Acciones

### Ejecutar / copiar un prompt
Desde la app y fácilmente. Seguro se puede usar el API (pidiendo primero las credenciales al usuario y guardando su API-KEY en supabase, ofuscado), pero...*¿cuál es la opción más sencilla?*  pues abriendo una nueva ventana externa con ChatGPT con el texto del prompt. Esto es trivial, usando la url que permite pasárselo como queryParam: https://chatgpt.com/?prompt=elPrompt. Más fácil imposible 😋.

En algunos casos, al usuario le vendrá  mejor copiarlo para ejecutar de otra forma (ej. en una app local), así que programemos también un *Copiar al portapapeles*, que es trivial.

## Resumen

En este punto, la app es funcional y se ve así:
![promptly_04_run_in_chatgpt.gif](/img/user/Blog/Articulos/2025-05-coleccion-promptly/media/promptly_04_run_in_chatgpt.gif)


Sobre la lista de tareas, este es el estado al terminar la sesión:
- [x] Registrarse para crear una cuenta
- [x] Logarse después
- [x] Persistir y recuperar prompts
- [x] Ejecutar un prompt 
- [x] Copiar un prompt al portapapeles
- [ ] Compartir un prompt
- [ ] Catálogo de prompts públicos
- [ ] Colecciones de prompts con tags