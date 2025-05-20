---
{"dg-publish":true,"dg-path":"Articulos/2025-05-coleccion-promptly/Promptly 01 - El arranque del proyecto.md","permalink":"/articulos/2025-05-coleccion-promptly/promptly-01-el-arranque-del-proyecto/","title":"Promptly 01 - El arranque del proyecto","tags":["nextjs","supabase","postgresql","tailwindcss"]}
---

Con este post inicio una serie sobre la construcción de un side-project que he llamado Promptly, para la gestión de prompts de IA. Iré enlazando aquí los posts conforme los vaya publicando, para que sea más fácil navegar entre ellos. 

Si simplemente prefieres probarlo, ve a https://promptly.es. Si tienes curiosidad cómo lo he creado, sigue leyendo.


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

# Objetivos

## Problema / Oportunidad
- Realizar buenas preguntas a los modelos de IA (generalmente a través de interfaces como ChatGPT, Claude, etc.) es a veces complejo. 
- Los LLMs que los soportan son muy potentes, pero también muy abiertos y aún existe poca experiencia colectiva sobre cómo usarlos.
- Partir de una pregunta / prompt puede ayudar mucho y servir de inspiración para explorar / profundizar siguiendo ese modelo.
- La gente comparte, cada vez más, sus prompts (por ejemplo en Twitter, LinkedIn, etc.)
- Existen varias alternativas online para almacenar prompts, pero la mayoría siguen un modelo de marketplace (y además son en Inglés, lo que supone una barrera para algunas personas).

## Reto
- Crear un lugar donde gestionar los prompts y poder compartir, descubrir y probar de forma sencilla otros nuevos puede ser muy útil.
- Construir algo así, pero también describir el proceso y las decisiones, me parece una experiencia enriquecedora profesionalmente, así que voy a hacerlo a través de varios post sucesivos, describiendo lo realizado, sesión a sesión.
- De forma orientativa, una sesión puede ser un bloque aproximado de tiempo, de 1 a 2 horas aprox.

## Proceso
En cada post iré recogiendo el proceso de construcción y seguiré un esquema parecido:
- 1. Punto de partida: los requisitos en ese punto (que irán inevitablemente creciendo / modificándose)
- 2. Acciones: cosas concretas hechas esa sesión para avanzar en la construcción del proyecto
- 3. Balance: un cierre de sesión, revisando los resultados

Sin más dilación, vamos a ello, con la primera sesión de trabajo.

# Sesión 1

## Punto de partida

### Objetivos
A alto nivel estos serían los **objetivos actuales del proyecto**:
- Quiero permitir guardar prompts para poder gestionarlos / usarlos mejor. Pienso que esto puede ser útil para muchos usuarios.
- Quiero a la vez hacer involucrarme en un proyecto que me permita aprender más sobre algunas tecnologías (NextJS, TailwindCSS y otras)
- Quiero usar lo que sea más sencillo y rápido / barato.

### Tareas
Vamos a sacar una lista primera de **tareas** (o requisitos si se quiere), para construir el proyecto. Lo que quiero es dejar al usuario guardar sus prompts, pero para conseguir esto, se necesita un mínimo de elementos previos (infraestructura):
- [ ] Registrarse para crear una cuenta
- [ ] Logarse después
- [ ] Persistir un prompt

Y todo esto debe ser seguro, claro: que los prompts sean de cada usuario y privados por defecto.
Venga, pues con este punto de partida, vamos a ponernos manos a la obra.

## Acciones
### Elección de plataforma
#### Firebase
❗Una forma que conozco y seguramente funcionaría bien es *Firebase*; ya lo he usado para algunos proyectos en el pasado, incluyendo la gestión de la autenticación y la persistencia de JSON (su motor Firebase es NoSQL) y los updates en tiempo real, y funciona muy bien, sin duda.  Seguramente podría probar el nuevo [Firebase Studio](https://cloud.google.com/blog/products/application-development/firebase-studio-lets-you-build-full-stack-ai-apps-with-gemini)... pero me gustaría más usar un motor SQL estándar... así que voy a ver otras opciones en GCP.

#### PostgreSQL en GCP
He trabajado con muchos tipos de base de datos: SQL Server, Oracle,  Postgres, ClickHouse... pero como lei en alguna ocasión: "*en caso de duda, usa postgres*". Así que he echado un ojo a mi cuenta Google Cloud Platform (GCP), y veo que actualmente una instancia gestionada de Postgres 16, con 2 vCPU y 8 GB + 10 GB SSD cuesta (en Iowa) $0.14/hora, lo que vendría a ser aprox $102 dólares al mes (en Europa GCP es más caro, y sobre un coste unitario de $0.17 hora, se iría hasta casi $125 mes, pero para un prototipo / side-project la latencia no me preocupa demasiado).

A pesar de que tengo un descuento disponible en GCP,  la verdad, 0 € para arrancar me sonaría mejor, y me apetece probar algo menos enterprise que GCP.

#### Supabase
Y así he llegado hasta Supabase, que se vende como una alternativa open-source a Firebase e incluye Postgres y un plan inicial de $0 / mes. así que le voy a dar una oportunidad. 

- [x] Creación de proyecto "promptly" en region West Europe
> [!info]
   El plan en Supabase tampoco es para tirar cohetes, veremos después como se maneja: Nano: $0 / hour (up to 0.5 GB de memoria y una CPU Shared) + Disk size: 1 GB

### Creación de la app
Hoy en día existen muchas fórmulas, pero me apetece profundizar más en [NextJS]. Un proyecto [[NextJS]] "normal", puede ser creado en local fácilmente con
```shell
npx create-next-app@latest
```

Pero también se admiten 'templates' o plantillas pre-configuradas. Este es el caso de Supabase, ya que existe una **plantilla oficial** que facilita el arranque:

- [x] Creación del proyecto NextJS con plantilla
```shell
npx create-next-app@latest -e with-supabase
```

#### La plantilla
Parece que la template tiene buena pinta, con instrucciones claras en la página principal para tener el proyecto bien conectado al entorno e incluso un formulario de sign-up integrado + Sign in. 

El proyecto incluye:
- Una home que se loga y verifica que tiene acceso al proyecto
- Una cabecera con el típico Sig In / Sign out 
- Un formulario para Sign up
- Una pagina privada (/protected)

Técnicamente, la plantilla incluye este stack:
- dependencies:
	- next: latest (hoy 15.3.1)
	- react: 19.0.0
	- @supabase/ssr: latest (hoy 0.6.1) 
	- @supabase/supabase-js: latest (hoy 2.49.4)
	- @radix-ui/react-`\*`: varios paquetes paquetes de UI. [Ver aquí](https://www.radix-ui.com/primitives/docs/overview/introduction)
- dev
	- typescript: 5.7.2
	- tailwindcss: 3.4.17

Y existe un .env que puede fácilmente usarse de plantilla para conectar al proyecto supabase real desde local (`env.local`), simplemente rellenando estas variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-url-de-proyecto-en.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-para-conectar-ver-dashboard-en-supabase
```

- [x] Configuración del proyecto NextJS contra Supabase y creación del primer usuario
Para probar la plantilla y la parte privada, procedo a crearme un usuario. La aplicación se puede ver en local y jugar con ella fácilmente, como en cualquier otro proyecto NextJS
```shell
npm run dev
```

### Primer despliegue
Ok, arrancamos con la plantilla tal cual, sin modificaciones, pero siempre gusta ver el producto en funcionamiento en un entorno real. Se podrían usar varios entornos, pero el más natural para NextJS sigue siendo Vercel, tal y como aconseja la plantilla. Como ya tengo una cuenta gratuita de Vercel, procedo a enlazar mi proyecto git local con estos pasos:

- [x] Subir proyecto git a Github (enlazar y subir el repo local, inicializado por la template)
- [x] Configurar el proyecto en Vercel, importando ese proyecto de github (en este caso, llamo al proyecto de Vercel de la misma forma que el repo: "promptly").
- [x] Para que todo funcione ok en otros entornos (más allá de localhost:3000) es preciso configurar las redirecciones de URLs adecuadas a los dominos usados. 
 
La propia template detecta y propone las URLs, lo cual es un muy buen detalle de devX por parte de Supabase: 

```
This particular deployment is"production" onhttps://promptly-m15aqmuuq-velardev-projects.vercel.app.

You will need to [update your Supabase project](https://supabase.com/dashboard/project/_/auth/url-configuration) with redirect URLs based on your Vercel deployment URLs.

- http://localhost:3000/**
- https://promptly-gilt.vercel.app/**
- https://promptly-gilt-*-[vercel-team-url].vercel.app/** (Vercel Team URL can be found in [Vercel Team settings](https://vercel.com/docs/accounts/create-a-team#find-your-team-id))
```

## Resumen
En este punto, tenemos:
- Un proyecto "promptly" en Supabase, inicialmente vacío
- Un repo privado "promptly" en Github, con el proyecto NextJs de plantilla de supabase
- Un proyecto "promptly" en Vercel, vinculado a Github, para el hosting de la app.
- El proyecto desplegado en una url pública

![promptly_01_template_deployed_to_vercel.png](/img/user/Blog/Articulos/2025-05-coleccion-promptly/media/promptly_01_template_deployed_to_vercel.png)


Sobre la lista inicial de tareas, terminamos la sesión con algo como:
- [x] Registrarse para crear una cuenta
- [x] Logarse después
- [ ] Persistir y recuperar prompts