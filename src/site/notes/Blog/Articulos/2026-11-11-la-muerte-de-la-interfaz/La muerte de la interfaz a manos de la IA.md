---
{"dg-publish":true,"dg-path":"Articulos/2026-11-11-la-muerte-de-la-interfaz/La muerte de la interfaz a manos de la IA.md","permalink":"/articulos/2026-11-11-la-muerte-de-la-interfaz/la-muerte-de-la-interfaz-a-manos-de-la-ia/","title":"La muerte de la interfaz a manos de la IA","tags":["ia","diseño","interfaces","ui-generativa","blog"],"dg-note-properties":{"estado":"borrador","categoria":"blog-post","tags":["ia","diseño","interfaces","ui-generativa","blog"],"title":"La muerte de la interfaz a manos de la IA","categories":["ia"],"coverImage":"Blog/Articulos/2026-11-11-la-muerte-de-la-interfaz/media/portada-la-muerte-de-la-interfaz.png","description":"Un chat no basta para sostener una aplicación. Por qué la interfaz no muere con la IA y cinco niveles entre el chat y la pantalla de siempre.","starred":true}}
---

![portada-la-muerte-de-la-interfaz.png\|Ilustración de portada: un chat de IA en una aplicación web en el que se pueden observar piezas de interfaz embebidas, una gráfica de barras, una botonera y una tarjeta con foto](/img/user/Blog/Articulos/2026-11-11-la-muerte-de-la-interfaz/media/portada-la-muerte-de-la-interfaz.png)

Con la IA ya no te hace falta una interfaz. Total, es cara de construir, te obliga a pensar de antemano qué operaciones vas a permitir al usuario... y, seamos sinceros, en tu startup tampoco sabes del todo lo que quiere. Un chat, en cambio, no limita ningún caso de uso. Así que el chat es la forma mejor y más barata de resolverlo todo. ¿Verdad? 

Es lo que mucha gente proclama: la muerte del «caso de uso», la muerte de la interfaz. ¿Pero basta solo un chat para sostener una aplicación de verdad? 

Como en casi todo lo importante, depende del contexto, y no hay una respuesta universal. Pero creo que sí tengo una respuesta corta: el chat es un buen punto de partida y un mal punto de llegada. En muchos casos se quedará corto. 

En este artículo explico cuáles son para mí las claves y hablo de los cinco niveles o tipos de interfaz que observo en el contexto de aplicaciones IA.


## Lo que tiene de cierto

Conviene empezar por ahí, porque la tesis tiene parte de razón:

- Una interfaz de usuario es cara de diseñar, construir y mantener.
- Obliga a decidir de antemano qué se puede hacer, y no siempre sabes lo que el usuario quiere hacer.
- Conectar un modelo a tu backend (por ejemplo, a un [servidor MCP](https://modelcontextprotocol.io), el estándar para conectar modelos con herramientas y datos) te da mucha potencia en muy poco tiempo. La mayoría empezamos por ahí, y es lo lógico.

Además, ¿hay que pensar todas las aplicaciones del futuro para que las manejen personas, e invertir en ello?

No. Parece claro que muchas podrán ser «simplemente» almacenes de datos + tus procesos de negocio + una capa de servicios para consumirlos, accesibles en remoto para agentes. Si el agente puede cumplir así su objetivo, y tu organización consigue los suyos, perfecto: no necesitas más. 

¿Significa esto que tu aplicación ya no necesita diseño? 

## La interfaz no es solo una pantalla

Aquí quiero hacer una pausa, porque siempre me ha parecido muy interesante la distinta carga semántica de dos términos, **diseño** e **interfaz**, según el contexto. 

Para mucha gente en la industria, la Interfaz es únicamente la que existe entre la aplicación y la Persona, y el Diseño se hace solo ahí. Pero hay diseño en la ingeniería, la arquitectura y por supuesto en el software. Por ejemplo, el diseño de la interfaz de una API o de un servidor MCP es uno de los procesos más importantes al construir un sistema, tenga o no una interfaz de usuario encima: funciones coherentes en nombre, tamaño y descripción, en formatos de respuesta, en códigos y descripciones de error... Diseño en estado puro.

Decidir qué acciones puede realizar un agente según su rol, cuáles son los pasos exactos de tus procesos de negocio y qué reglas o excepciones hay que cumplir para avanzar también es diseño de producto.

Y con «la persona» pasa lo mismo: tu usuario ya no es siempre alguien sentado delante del ordenador o con el móvil en la mano; también puede ser un agente. Sí, este puede ser disparado por la intención, más o menos directa, de un usuario, pero también por otro agente o tal vez por una simple rutina diaria programada. Las premisas de interfaz y usuario de los últimos veinte años han cambiado.


## Por qué el chat solo no basta

Me gusta mucho leer. Y aun así, cuando uso una aplicación, no espero tener que leerme un «**muro de texto**» infernal, generado por un LLM. Y no es solo cuestión de gustos: cuando al otro lado hay una persona, el chat solo se queda corto, por varias razones.

**Eficacia.** Es la vieja guerra entre terminal y pantalla. Si sabes exactamente lo que quieres y cómo pedirlo, un comando preciso en una terminal es lo más eficiente que existe (p. ej., `rm -rf` para borrar ficheros y a otra cosa).

Pero si estás viendo las fotos de tu familia en una app y quieres borrar unas cuantas, no creo que quieras solo un comando. Querrás un medio controlado para explorar, abrir y ver detalles, confirmar, y seguramente deshacer borrados. Un comando es eficiente, sí, pero una interfaz interactiva es mucho más eficaz en este caso porque te ofrece un abanico de opciones, retroalimentación y, en definitiva, una experiencia más completa.

**Percepción.** Buena parte de nuestro cerebro se dedica a procesar lo que vemos, y durante años los principios del diseño visual y de interfaces se han construido sobre este sustrato: el funcionamiento de la propia percepción humana. En la misma línea, ¿por qué nos gusta usar gráficas, tablas, diagramas, esquemas, mapas... para interpretar datos complejos? Sencillo: la visualización de datos permite entenderlos más rápido y tomar mejores decisiones.

**Confianza y marca.** Lo mismo podríamos decir de todo el trabajo digital de diseño alrededor de las «marcas» (logotipos, fuentes, colores corporativos, imágenes propias y estilos de lenguaje...), como un medio para diferenciarse y generar confianza en el producto o servicio. Esa confianza seguirá siendo muy necesaria y, si todos repetimos el mismo chat básico en todas las aplicaciones, con los mismos estilos por defecto y sin personalidad, no conseguiremos generarla. 

**Negocio.** En B2C está claro: un muro de texto por sí solo no vende y las apps de este tipo no han abandonado los elementos de interfaz «clásicos» (imágenes, botones, listas, formularios, tarjetas...). Y luego está la «venta»: no sé, Rick, pero si me quieres vender algo espero que te lo curres un poco más que mandándome al chat una descripción fea del producto, en forma de texto, sacada de tu base de datos - campo «descripción».

Y también hablo de software B2B, de herramientas que con tu SaaS pones en manos de usuarios para su negocio. Si tu sistema se apoya solo en un chat, ganarás velocidad de desarrollo, eso está claro. Pero pagarás más al operar, porque cada interacción consume modelo, y no ganarás en experiencia de usuario. Y un usuario que no está contento, con cada vez más opciones de software disponibles a su alcance, no va a repetir.

Así que tiene sentido aprovechar lo bueno de este bagaje que existe sobre el diseño y las interfaces, no simplemente descartarlo. Más bien revisitarlo con las nuevas herramientas.

## Entonces, ¿qué hay entre el chat y la pantalla de siempre?

Entre el chat pelado y la aplicación de toda la vida hay un espectro de interfaces muy variado, con distinto nivel de madurez. Yo lo ordeno en cinco niveles, del más sencillo y controlado al más abierto

1. Chat básico
2. Chat con componentes
3. Catálogo declarativo 
4. MCP App
5. Interfaz generada

![tipologias-ui-en-ia.png\|La escalera de la interfaz en IA: cinco niveles, de «chat básico» a «interfaz generada», según quién decide la interfaz](/img/user/Blog/Articulos/2026-11-11-la-muerte-de-la-interfaz/media/tipologias-ui-en-ia.png)

> [!info] Otras clasificaciones
> CopilotKit, por ejemplo, distingue tres tipos de interfaz generativa (estática, declarativa y abierta) que encajan casi uno a uno con los niveles 2, 3 y 4-5 ([The Developer's Guide to Generative UI in 2026](https://www.copilotkit.ai/blog/the-developer-s-guide-to-generative-ui-in-2026)). Yo añado el chat básico, porque al fin y al cabo todos empezamos por ahí, y separo el HTML que escribe el desarrollador del que escribe el modelo, porque me parece muy relevante el distinto contexto en distribución y seguridad.


### (1) Chat básico
Solo texto y una conversación por turnos. Por aquí se empieza y está bien. 

Lo que uses dependerá de tu stack, pero algo muy recomendable es el AI SDK de Vercel con Next.js, más un buen conjunto de patrones y componentes para interfaces de IA, sean propios o de alguna biblioteca como [AI Elements](https://ui.shadcn.com/docs/ai-elements).

En cuanto empieces a trabajar un poco más, el «muro de texto» te va a pedir negritas, enlaces, tablas, alguna imagen... La ventaja es que los LLM trabajan con soltura con Markdown, «el hermano pobre pero resultón» del HTML, así que pintar en tu aplicación algo enriquecido (voy a asumir una app web, por simplicidad) será sencillo. 

La limitación: sigue siendo texto. Mejor presentado, pero texto.

### (2) Chat con componentes registrados
Tu chat funciona, pero tu producto, servicio o flujo te pide más interfaz: resolverlo todo a golpe de teclado no es lo más eficiente ni lo más agradable. Así que te planteas incorporar **islas de interfaz** embebidas en el chat.

Normalmente podrás extender el nivel 1 sin problema, creando esas piezas como *componentes de frontend* autónomos, por ejemplo con React. El modelo no inventa la interfaz (por eso en mi opinión no es «interfaz generativa» propiamente dicha): elige qué componente enseñar y con qué datos. Es el patrón que documenta Vercel en su AI SDK: una herramienta devuelve datos y un componente de React los pinta según el estado de esa herramienta ([Generative User Interfaces](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces)). Es seguro, tipado y encaja con tu sistema de diseño.

La limitación: el modelo solo puede mostrar lo que tú has registrado. Pero oye, en muchos de los casos es justo lo que necesitas.

### (3) Catálogo declarativo
Un paso más allá: en lugar de elegir un componente, el modelo compone *una pantalla entera*, pero solo con las piezas que tú has aprobado. Tú defines un catálogo (tarjetas, listas, formularios...) y el modelo devuelve una descripción estructurada de cómo combinarlas. Tu frontend la interpreta y la pinta con tus propios componentes. El concepto es IA → JSON → UI.

La clave es que el modelo no envía código, sino datos. No puede inventarse un botón que no exista en tu catálogo, y la interfaz sigue llevando tu marca y tu sistema de diseño. Ya hay propuestas serias en este nivel, como [A2UI](https://www.developer-tech.com/news/google-releases-a2ui-v0-9-standardise-generative-ui/) de Google, con renderizadores para React, Flutter y Angular. O el proyecto [json-render](https://github.com/vercel-labs/json-render), de Vercel Labs.

Ganas flexibilidad sin perder el control. El precio es diseñar bien ese catálogo, que vuelve a ser, sí, trabajo de diseño.

### (4) MCP App
Mucha gente ha hablado tradicionalmente de los iframes como si fueran la peste. Pero la idea de incrustar contenido, de forma segura, en un medio tan dinámico como la Web, me parece muy potente, y aquí puede volver con fuerza.

Una [MCP App](https://modelcontextprotocol.io/extensions/apps/overview) es una extensión de MCP: tu servidor, además de herramientas, puede devolver una pequeña aplicación HTML interactiva que el asistente pinta dentro de la conversación, en un iframe aislado, y que puede seguir hablando con tu servidor. Ojo con un detalle: ese HTML lo escribes tú, no el modelo.

Lo que te da este nivel es llevar tu interfaz allí donde ya está el usuario, dentro de su asistente, sin que tenga que venir a tu aplicación. En enero, MCP Apps pasó a ser una extensión oficial del protocolo, y ese mismo día Claude estrenó apps interactivas de Slack, Asana, Figma o Canva, entre otras; ChatGPT lo adoptó esa misma semana ([WorkOS](https://workos.com/blog/2026-01-27-mcp-apps)). Para un SaaS, eso es casi un nuevo canal de distribución.

### (5) Interfaz generada al vuelo
Aquí ya no hay catálogo ni HTML preparado: el modelo escribe la interfaz para esa petición concreta, en ese momento. Es lo único que de verdad merece el nombre de interfaz generativa pura.

Hace poco sonaba a demo de laboratorio IA, pero durante 2026 ha llegado a los tres grandes asistentes. Claude genera desde marzo gráficas, diagramas y visualizaciones interactivas dentro de la conversación ([Claude](https://claude.com/resources/articles/claude-builds-visuals)). Google llevó en agosto la interfaz generativa a AI Mode y empezó a mostrarla en los resúmenes de la búsqueda ([Relevant Audience](https://www.relevantaudience.com/geo/google-generative-ui-ai-overviews/)). Y en octubre ChatGPT estrenó lo que OpenAI llama Intelligent UI, en la que el modelo decide si responde con texto, con visuales o con componentes interactivos. Lo resumió un responsable de producto de OpenAI en el lanzamiento: ChatGPT «ha sido predominantemente una interfaz basada en texto», pero «las respuestas más útiles no son solo texto» ([TechCrunch](https://techcrunch.com/2026/10/07/chatgpt-is-getting-a-lot-more-visual-with-the-launch-of-a-new-interface/)). Son sus palabras, no las mías.

Es también el nivel con más libertad y con más riesgos: el resultado es menos predecible, cuesta mantener la coherencia con tu marca, gasta más tokens, abre una vía nueva a las alucinaciones y estás ejecutando código que nadie ha revisado, así que necesitas un buen aislamiento. 

Además, como advierte [Nielsen Norman Group](https://www.nngroup.com/articles/generative-ui/), una interfaz que cambia todo el rato pierde consistencia y se aprende peor, así que habrá que encontrar como industria la forma de meter criterio experto. Guiar al modelo en qué debe aparecer, que puede aparecer y qué no debe aparecer nunca.

Por todo ello, para una aplicación de negocio, pienso que hoy en día los otros niveles cubren mejor la mayor parte de los casos.


## ¿Hacia interfaces adaptables?

Si la respuesta no es universal, ¿cómo se elige? Yo lo pensaría con dos preguntas.

La primera, quién es el usuario. Si es un agente, lo que necesita es una buena interfaz de programación: herramientas claras, bien descritas y con errores comprensibles. Si es una persona, entra en juego todo lo demás: eficacia, percepción y confianza.

> [!info] El agente como usuario 
> Y ojo que un agente puede ser perfectamente un proceso controlando un navegador, haciendo clics como si fuera una persona. En ese caso, lo que mejor le funcionará es también una interfaz clara y accesible.

La segunda, qué tipo de trabajo hace. No es lo mismo una tarea que el usuario domina y repite a diario, donde lo mejor es una pantalla rápida o directamente un comando, que una tarea nueva o puntual, donde una conversación le ayuda a llegar a lo que quiere sin tener que aprender la herramienta.

Para hacer más y más rápido necesitamos abstracciones, y una buena interfaz es justo eso. Por eso creo que el futuro no pasa por elegir una tipología de interfaz para toda la aplicación, sino por interfaces que se adaptan a la intención del usuario en cada momento. Conversación para expresar lo que quiere, componentes para revisar y decidir, pantallas completas para el trabajo que se repite, islas de interfaz allí donde hacen falta esporádicamente. Y quien averigua esa intención es el propio modelo, y por eso diseñar sigue importando.

## La interfaz no muere: cambia la forma

Diseñar interfaces nunca ha ido de pintar cosas bonitas en pantalla, sino de crear un medio para que el usuario resuelva sus problemas. La IA no cambia eso: lo amplía.

La IA dentro de las aplicaciones es, en gran medida, una interfaz. Si se me permite, un *averiguador de intenciones* y por eso es tan efectiva. Y como además conecta la interfaz con los procesos de la empresa, permite hacer más y mejor. Puede que aún no hayamos adoptado del todo las nuevas herramientas, pero ya no tiene sentido construir aplicaciones como antes de los LLM.

Sin embargo, un chat de IA pelado no puede sostener una aplicación de cierta entidad. Para construir una buena experiencia, generar confianza y diferenciarte, vas a tener que seguir diseñando: tu marca, tus procesos y esas pantallas e islas de interfaz que los unen, sea cual sea el modelo que elijas.

La interfaz no muere. Cambia de forma.

¿En qué nivel está hoy tu producto?
