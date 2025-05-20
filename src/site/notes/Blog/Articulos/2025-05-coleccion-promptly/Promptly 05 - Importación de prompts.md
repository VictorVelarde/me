---
{"dg-publish":true,"dg-path":"Articulos/2025-05-coleccion-promptly/Promptly 05 - Importación de prompts.md","permalink":"/articulos/2025-05-coleccion-promptly/promptly-05-importacion-de-prompts/","title":"Promptly 05 - Importación de prompts","tags":["nextjs","supabase","postgresql","tailwindcss"]}
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



# Sesión 5

## Punto de partida
### Objetivos
- No cambian.
- Sin embargo, conforme trabajo en el proyecto, más claro tengo que si quiero que sea realmente útil, tiene que tener buenos contenidos de origen, es decir, un catálogo de prompts base, aunque luego la gente vaya agregando los suyos. Por esto mismo, he decidido buscar e importar prompts al sistema, antes de avanzar más en nuevas features, y agrego esto a la lista de tareas.
- Hasta ahora he utilizado las urls 'autogeneradas' / aka feas pero gratuitas de Vercel. Pero está claro que un dominio propio es preferible. Agrego la tarea de configuración de dominio

### Tareas
- [x] Registrarse para crear una cuenta
- [x] Logarse después
- [x] Persistir el prompt
- [x] Ejecutar un prompt 
- [x] Copiar un prompt al portapapeles
- [x] Catálogo de prompts públicos
- [ ] Importación de prompts
- [ ] Configuración de dominio
- [ ] Compartir un prompt 
- [ ] Colecciones de prompts con tags
- [ ] Ajustes de prompt (idioma de salida, tono, etc.)


## Acciones

### Importación de prompts
La licencia Creative Commons CC0 en awesome-chatgpt-prompts permite una importación libre, y ChatGPT nos ayuda a generar un script para ello, en base a nuestras indicaciones de mapeo de campos. Me siento cómodo con el scripting en python, así que voy a ello (en este punto, aprovecho también para configurar el entorno con pyenv en local, requirements.txt y un fichero .env para las credenciales).

```python
import pandas as pd
import psycopg2
import os

# Parámetros de conexión
conn = psycopg2.connect(
    host="TU_SUPABASE_HOST",
    dbname="TU_BD",
    user="TU_USER",
    password="TU_PASSWORD",
    port=5432,
    sslmode='require'
)

cur = conn.cursor()

# Cargar CSV desde URL
df = pd.read_csv('https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/refs/heads/main/vibeprompts.csv')

# Función de transformación de cada fila
def transform_row(row, user_id):
    tags = []

    # Añadir contributor como tag si existe
    if pd.notna(row.get('contributor')):
        tags.append(row['contributor'].strip())

    # Añadir techstack separados por coma
    if pd.notna(row.get('techstack')):
        tech_tags = [tech.strip() for tech in row['techstack'].split(',') if tech.strip()]
        tags.extend(tech_tags)

    # Añadir el extra tag 'vibeprompt'
    tags.append('vibeprompt')

    return (
        row['app'],             # title
        row['prompt'],          # content
        tags,                   # tags (Postgres ARRAY)
        user_id                 # user_id
    )

# USER_ID: debes establecer tu UUID de usuario
USER_ID = "el-id-usuario-del-usuario-creado"

# Insertar cada fila transformada
for idx, row in df.iterrows():
    title, content, tags, user_id = transform_row(row, USER_ID)
    cur.execute("""
        INSERT INTO public.prompts (
            title, content, tags, user_id
        ) VALUES (%s, %s, %s, %s)
    """, (title, content, tags, user_id))

conn.commit()
cur.close()
conn.close()

print("Importación completada correctamente 🚀")
```

Por cierto, el hecho de que Supabase sea realmente un postgres accesible, que permita una conexión directa desde mi equipo local, es sin duda una gran ventaja. Normalmente los proveedores SaaS que montan sobre una DB no conceden acceso directo, por protección / seguridad o voluntad explícita, pero no es así en este caso, y es muy de agradecer,


### Configuración de dominio
La compra la realizo en godaddy.com, donde tengo otros dominios. Encuentro promptly.es, dado que lo encuentro en buenas condiciones de precio. Es sencillo y rápido de configurar con Vercel (básicamente es factible hacer una autoconfiguración desde su panel)

## Resumen
Empieza a haber contenidos interesantes (yo mismo exploro la colección y veo algunas cosas curiosas).

Estado:
- [x] Registrarse para crear una cuenta
- [x] Logarse después
- [x] Persistir el prompt
- [x] Ejecutar un prompt 
- [x] Copiar un prompt al portapapeles
- [x] Catálogo de prompts públicos
- [x] Importación de prompts
- [x] Configuración de dominio
- [ ] Compartir un prompt 
- [ ] Colecciones de prompts con tags
- [ ] Ajustes de prompt (idioma de salida, tono, etc.)