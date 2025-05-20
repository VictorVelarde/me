---
{"dg-publish":true,"dg-path":"Articulos/2025-05-coleccion-promptly/Promptly 04 - Publicar un prompt.md","permalink":"/articulos/2025-05-coleccion-promptly/promptly-04-publicar-un-prompt/","title":"Promptly 04 - Publicar un prompt","tags":["nextjs","supabase","postgresql"]}
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


# Sesión 4

## Punto de partida
### Objetivos
Los mismos, principalmente de aprendizaje mientras se crea una herramienta sencilla pero útil.

### Tareas
- [x] Registrarse para crear una cuenta
- [x] Logarse después
- [x] Persistir y recuperar prompts
- [x] Ejecutar un prompt 
- [x] Copiar un prompt al portapapeles
- [ ] Compartir un prompt
- [ ] Catálogo de prompts públicos
- [ ] Colecciones de prompts con tags
- [ ] Ajustes de prompt (idioma de salida, tono, etc.)

## Acciones

### Compartir un prompt
Todos los prompts son *privados* por defecto, es decir que la app puede funcionar como un simple repositorio personal de prompts si se desea. Pero es innegable que compartir los prompts hará la experiencia mucho más valiosa, así que explotemos esto y desarrollemos la/s features necesarias para compartir un prompt públicamente.

Tener un **prompt público** se descompone en varios pasos o subtareas. Será necesario:
1. *Indicador de privacidad*: mostrar claramente en la lista de prompts si un un prompt es público o privado
2. *Cambio de privacidad*: permitir cambiar su privacidad fácilmente
3. *Vista pública de prompt*: preparar una página sencilla, que no requiera usuario, y permita ver el detalle del prompt, incluyendo al autor
	- Si es público se muestra
	- Si es privado, no funciona (404)


- [x] (1) Indicador de privacidad

Aprovecho la necesidad de editar la lista de prompts para refactorizar un foco y limpiar el componente. Con ayuda de Copilot y algunos toques manuales (+ pruebas, por ejemplo con el movil conectado)... avanzo hasta tener algo como:

![promptly_05_public_or_private_prompt.png](/img/user/Blog/Articulos/2025-05-coleccion-promptly/media/promptly_05_public_or_private_prompt.png)


- [x] (2) Cambio de privacidad

A golpe de prompt voy desarrollando la acción para Editar todo el prompt. Creo que es un buen primer paso: dejar editar todo en una nueva página (y no solo la privacidad en el listado, eso puede venir más adelante si es útil).

Un ejemplo del tipo de prompt que uso:
```prompt
Que los botones ChatGPT y Copy no floten, sino que vayan dentro de un espacio común, llamado actions o similar, dentro de cada list-item. Que a ese espacio se le agregue una nueva acción, en forma de enlace llamado Edit. Que ese Edit abra una nueva página dashboard/edit-prompt (que se agregue como const en routes.ts). Que la pagina de Edit sea una versión que tome como base la página actual para 'create-prompt', dejando en no editable lo que corresponda (eg. created_at).
```

Previamente había ajustado un poco el formulario de create-prompt, para tener más espacio y una acción de Cancel. Para la edición, el modo Agente de Copilot en VS Code funciona perfectamente, y tras algunos ajustes visuales, queda una experiencia bastante completa. 

Para simplificar, elimino de momento del modelo el campo 'description', pues diría que un buen title es suficiente, y ya era opcional. Aplicaré el cambio manualmente también en la DB.

### Prompts

- [ ] (3) Vista pública de un prompt

En realidad, el orden lógico diría que es programar primero el listado de prompts públicos (página /prompts) y luego el detalle (página /prompts/id). Para que funcione lo primero, el deberemos agregar otra Policy en la DB, donde cualquier usuario pueda leer aquellos prompts que sean is_public
```sql
CREATE POLICY "Enable read access for all users on public prompts"
ON public.prompts
AS PERMISSIVE
FOR SELECT
TO PUBLIC
USING (
  is_public
);
```

Y así conseguimos avances, especialmente en el primer bloque: La home muestra ya un enlace al catalogo, se puede usar leyendo los últimos 20 elementos (de momento sin búsquedas, filtros por tag, etc.)

![promptly_06_app_with_public_catalog.gif](/img/user/Blog/Articulos/2025-05-coleccion-promptly/media/promptly_06_app_with_public_catalog.gif)


## Resumen
- [x] Registrarse para crear una cuenta
- [x] Logarse después
- [x] Persistir el prompt
- [x] Ejecutar un prompt 
- [x] Copiar un prompt al portapapeles
- [x] Catálogo de prompts públicos
- [ ] Compartir un prompt 
- [ ] Colecciones de prompts con tags
- [ ] Ajustes de prompt (idioma de salida, tono, etc.)

