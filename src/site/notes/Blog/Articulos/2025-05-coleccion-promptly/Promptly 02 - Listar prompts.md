---
{"dg-publish":true,"dg-path":"Articulos/2025-05-coleccion-promptly/Promptly 02 - Listar prompts.md","permalink":"/articulos/2025-05-coleccion-promptly/promptly-02-listar-prompts/","title":"Promptly 02 - Listar prompts","tags":["nextjs","supabase","postgresql"],"dg-note-properties":{"title":"Promptly 02 - Listar prompts","date":"2025-05-15","categories":["programacion"],"tags":["nextjs","supabase","postgresql"],"review":true,"starred":null,"descripcion":"Promptly 02 - Listar prompts"}}
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



# Sesión 2

## Punto de partida

### Objetivos
Se mantienen tal cual.
### Tareas
- [x] Registrarse para crear una cuenta
- [x] Logarse después (gestión de la identidad)
- [ ] Persistir y recuperar prompts

Los 3 elementos previos apuntan a que la app debe persistir los datos y hacerlo de forma **segura** (que los prompts sean de cada usuario y privados por defecto). Lo que es lo mismo, que un usuario liste y vea solo sus prompts y otro usuario los suyos. Esto se consigue de 2 formas tradicionalmente: una **base de datos propia** (cuando el usuario está por ejemplo en un entorno dedicado, o bien la plataforma crea una para cada cuenta) o la misma base de datos / tablas pero un **sistema robusto de RLS** (Row Level Security) que aisle los datos de cada cliente. Habitualmente lo 2º es más sencillo y eficiente en términos de costes, así que iremos por ese camino.

🔝Es claro que los requisitos funcionales (gestionar los prompts), van acompañados necesariamente de requisitos de otro tipo. En un enfoque de mínimos, comenzaremos por una seguridad / usabilidad básica... pero más adelante, si la cosa crece, habría que revisar otros como el rendimiento del sistema o su mantenibilidad.

## Acciones

### Persistencia

- [x] Crear tabla de prompts

Seguramente la estructura evolucionará, pero en una primera versión, y con ayuda de ChatGPT, esta es la estructura propuesta, con una sola tabla
```sql
CREATE TABLE prompts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    description TEXT,
    tags TEXT[],
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

En **Supabase** no hay una tabla `public.users`, para hacer la FK. En la sección Authentication > Users muestra que existe sin embargo, con los campos UID, Display name, Email, Provider type, etc. Esta tabla se encuentra en realidad bajo *auth.users*, así que omitiremos el FK explícito, pero habrá que tenerlo en cuenta para manejar la integridad de los datos (con algún tipo de borrado manual en cascada). Reemplazamos pues: `user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE` con un simple `user_id UUID NOT NULL`

- [x] Privacidad de datos

Usaremos RLS. Inicialmente Supabase (mediante un asistente con AI por cierto para los SQL muy útil), sugiere unas reglas que tienen bastante sentido, para limitar, via CREATE POLICY las operaciones a nivel de SELECT, INSERT, UPDATE, DELETE. Si más adelante incluimos el is_public, crearemos otra policy para ver los prompts compartidos

```sql
-- RLS basica
CREATE POLICY "Authenticated users can view their own prompts" 
ON public.prompts 
FOR SELECT 
TO authenticated 
USING ((select auth.uid()) = user_id);

CREATE POLICY "Authenticated users can insert prompts" 
ON public.prompts 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update their own prompts" 
ON public.prompts 
FOR UPDATE 
TO authenticated 
USING ((select auth.uid()) = user_id) 
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete their own prompts" 
ON public.prompts 
FOR DELETE 
TO authenticated 
USING ((select auth.uid()) = user_id);
```
🔝Supabase tiene una UI para definirlo, pero el SQL Editor es más flexible para crearlos.

- [x] Realizar unas inserciones de prueba / datos seed y pruebas

Hay librerías custom para generar datos 'semilla' de prueba, y muchas formas de hacerlo, pero lo más sencillo es pasarle el create table a un LLM cualquiera y pedirle N filas, con las restricciones que apliquen, por ejemplo:
```prompt
sql
CREATE TABLE prompts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    description TEXT,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


Generame 10 ejemplos de prompt para la tabla previa, para el usuario con id='18e3e69f-9723-462f-8e5f-edfca2e1232b', teniendo en cuenta que estoy utilizando Supabase, sobre un PostgreSQL 15.8
```

🔝Por cierto, este sería un buen ejemplo de un prompt a almacenar en la plataforma, como un ejemplo de generador de mocks de postgres. ChatGPT genera un snippet compacto, con *generate_series*,  algo como:
```sql
-- Enable pgcrypto if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert 10 random prompts
INSERT INTO prompts (user_id, title, content, description, tags)
SELECT
  'el-id-del-usuario-que-toque'::uuid,
  'Prompt #' || gs AS title,
  'Escribe un texto creativo sobre ' || 
    (ARRAY[
      'el futuro de la inteligencia artificial',
      'una conversación entre dos árboles',
      'una ciudad sumergida',
      'el último pensamiento de un robot',
      'un experimento fallido de viaje en el tiempo'
    ])[floor(random() * 5 + 1)] || '.' AS content,
  'Prompt auto-generado para hacer pruebas. Ref: ' || md5(random()::text) AS description,
  ARRAY[
    (ARRAY['creatividad', 'tecnologia', 'ficcion', 'historia', 'misterio'])[floor(random() * 5 + 1)],
    (ARRAY['filosofia', 'futuro', 'ia', 'naturaleza', 'distopia'])[floor(random() * 5 + 1)]
  ] AS tags
FROM generate_series(1, 10) AS gs;
```

🔝Y esto se ejecuta sin problema en Supabase. Bien Supabase, bien 💌

Se puede tal vez agregar un tag extra, para borrarlos más adelante. Prompt en el propio Supabase, que tiene un interfaz en modo texto llamada "Assistant": `Actualiza todo registro en "prompts" y agrega un tag "random_mock", respetando las tags actuales`... mmm parece que ahora mismo no funciona bien (dicen que está en Alpha), vamos a ChatGPT y genera un SQL que funciona bien:
```sql
UPDATE prompts
SET tags = array_append(tags, 'random_mock')
WHERE NOT ('random_mock' = ANY(tags));
```

### UI  básica para prompts

- [x] Listar prompts
Ya tenemos datos de prueba, con 10 prompts para un usuario, así que podemos empezar por listarlos y ver el detalle de 1 de ellos.

Es muy sencillo con el cliente server-side para Supabase, las instrucciones en la template y un poco de ayuda de Copilot en VSCode para las clases de TailwindCSS, el resultado:

![promptly_02_prompts_list.png](/img/user/Blog/Articulos/2025-05-coleccion-promptly/media/promptly_02_prompts_list.png)

- [x] General: Modificar la UI para eliminar las referencias a la plantilla

Lo mínimo es eliminar algunos botones y referencias a la template. Aun quedará dead-code y cosas a limpiar en el futuro, pero sirve para avanzar. Vamos a usar como "nombre del proyecto": Promptly

- [x] Formulario para registrar el prompt

Se necesita un usuario logado, y otra página, por lo que es un buen momento para considerar por primer vez las "rutas" de forma más general, y los caminos que seguirán los usuarios. 

### Rutas
Hasta ahora tenemos estas rutas (cada una correspondiendo con un page.tsx de NextJS):
**Actual**
1. **/**: la "home", de momento con el contenido de la plantilla y solo para usuarios no logados. Seguramente modificaremos la lógica, pues idealmente los usuarios podrán obtener valor de la app, aun sin registrarse (pero también tras hacerlo: ejemplo últimos prompts subidos, búsqueda por tags, votos, etc.). 
2. **/sign-up**: para crear la cuenta. Inicialmente activo solo el modo usuario & clave. Más adelante consideraremos social-login con Auth.
3. **/sign-in**: para logarse
4. **/forgot-password**: para recuperar el pwd via email
5. **/protected**:  información privada del usuario. En este punto solo el listado de prompts del usuario
6. **/protected/reset-password**: para rellenar ese flujo relacionado con la clave.

Y considerando lo que queremos hacer, esta podría ser una buena estructura. Por simplicidad, dejemos fuera cuestiones en el diseño de las urls como paginación, filtros, etc. (que veremos más adelante).


**(a) Rutas públicas**

| Ruta          | Descripción                                                                |
| ------------- | -------------------------------------------------------------------------- |
| /             | Home pública                                                               |
| /prompts      | Catálogo público de prompts. Navegable, con filtros por tags, nombre, etc. |
| /prompts/[id] | Detalle de un prompt específico. Accesible sin login.                      |
| /sign-up      | Registro de usuario.                                                       |
| /sign-in      | Login de usuario.                                                          |

**(b) Rutas privadas**

| Ruta                   | Descripción                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| /dashboard             | Página principal del usuario logado. Puede listar sus prompts, perfil, etc. |
| /dashboard/prompts     | Listado de prompts del usuario logado (tipo /protected actual).             |
| /dashboard/prompts/new | Crear nuevo prompt.                                                         |


### Home con logo
- [x] Limpieza básica de Home y su componente "Hero" (+ permitir que no fuerce la redirección a dashboard)
Cambiamos el texto y creamos un logo con ayuda de ChatGPT

```prompt
Hazme un logo sencillo, en SVG que diga "Promptly", con la P más destacada, tomando como referencia algo similar a este de NextJS:

--y-le-pego-el-SVG-tal-cual-de-NextJS (omitido)
```

Y nos genera algo para empezar...
![promptly_03_home_with_hero.png](/img/user/Blog/Articulos/2025-05-coleccion-promptly/media/promptly_03_home_with_hero.png)

Vale sí, es bastante feo, pero sirve para empezar. Además, como es un SVG con el fill="currentColor", se adapta también a la feature de theme de la template (tema oscuro), por lo que de momento👌.

### Crear y listar prompts
- [x] Nueva estructura para la zona privada (componentes y esbozo de interfaz)

Las rutas son algo importante y en lo que es fácil cometer errores. En la plantilla actualmente las rutas están hardcodeadas, y repetidas en varios lugares. Vamos a crear un fichero "*routes.ts*" para tenerlas controladas y poder cambiarlas después sin romper. 

Tras varios refactor, con algo de ayuda de ChatGPT / Copilot se puede avanzar y tener una app funcional para el flujo básico: guardar y listar prompts de un usuario en modo privado.


## Resumen
En este punto, ya tenemos:
- Una home básica, con una hero section + logo, adaptada al proyecto, bautizado con Promptly
- Una estructura básica de UI para las distintas páginas
- La capacidad de hacer los flujos básicos de un usuario: sign-in / sign-up / forgot-password, con tipo usuario-password
- La feature de crear un Prompt con sus campos básicos y que se persista
- La feature de listar los Prompt de un usuario, gracias a Row Level Security.

Si revisamos la lista de tareas tenemos:
- [x] Registrarse para crear una cuenta
- [x] Logarse después (gestión de la identidad)
- [x] Persistir y recuperar prompts
