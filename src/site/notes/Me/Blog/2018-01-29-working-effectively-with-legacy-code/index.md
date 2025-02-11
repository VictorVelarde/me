---
{"dg-publish":true,"dg-path":"Blog/2018-01-29-working-effectively-with-legacy-code/index.md","permalink":"/blog/2018-01-29-working-effectively-with-legacy-code/index/","title":"Working effectively with legacy code","tags":["refactoring","tests"]}
---


Hace poco he terminado de leer _Working effectively with legacy code,_ de _Michael Feathers_, un libro clásico de programación y, como me ha gustado mucho, me he decidido a compartir unas notas sobre él, por si a alguien le pica el gusanillo de leerlo. Forma parte de la colección "Robert C. Martin Series", en el que existen otros libros muy interesantes.

![LegacyCode](/img/user/Me/Blog/2018-01-29-working-effectively-with-legacy-code/images/legacycode1.jpg)

Es un libro muy práctico, especialmente si programas con orientación a objetos, pero su título quizá es poco afortunado. En realidad, se trata de un libro que habla sobre todo de **Tests y Refactoring**, y de cómo usar ambas técnicas para trabajar con _Legacy Code ("código legado")_, algo que muchos programadores tratan de evitar siempre que pueden.

El libro está organizado en tres bloques:

1. _Las mecánicas del cambio_: en el que presenta unos conceptos generales y herramientas de trabajo.
2. _Cambiando el software_: un "catálogo de recetas" ante problemas concretos
3. _Técnicas para romper dependencias_

* * *

**LAS MECÁNICAS DEL CAMBIO**

El libro comienza hablando de las causas principales que motivan los cambios en un software: añadir una funcionalidad, corregir un error, mejorar el diseño u optimizar el uso de un recurso.

De aquí me quedo con una reflexión que hace el autor, que me parece muy valiosa, y es que da igual la causa final, probablemente el mayor reto para el programador será **mantener el comportamiento existente,** algo que ilustra con esta imagen

![ExistingBehaviour](/img/user/Me/Blog/2018-01-29-working-effectively-with-legacy-code/images/existingbehaviour.png)

Sobre la forma en la que habitualmente hacemos los cambios, el autor critica lo que ya conocemos: muchas veces se usa el arriesgado _"Edit and Pray"_ (editar el código y rezar porque nuestro esfuerzo sea acertado), cuando lo más adecuado sería aplicar _"Cover and Modify"_, es decir cubrir primero el código con tests y, solo después, comenzar a modificarlo.

Los test cumplen aquí una doble misión: actuar como red de seguridad y proporcionar un feedback rápido sobre nuestro conocimiento del sistema, el cual crecerá con ellos.

De hecho, la definición de "Legacy Code" por parte del autor es "**un código Legacy es aquel que no tiene tests**" (y por tanto es difícil de modificar), algo que si nos paramos a pensar tiene todo el sentido del mundo. Tener buenos tests en un proyecto es una señal de su salud, pero la realidad es que muchas veces no existen y que añadirlos no es fácil. Entonces ¿cómo comenzar a trabajar con un código sin tests e incorporarlos?

El libro sugiere seguir estos pasos:

- **1\. Identificar los puntos de cambio**: busquemos primero donde debemos cambiar el código para cumplir nuestros objetivos.
- **2\. Encontrar puntos donde crear tests**: hay que valorar los más adecuados para probar los cambios en marcha (no podemos empezar probando todo indiscriminadamente).
- **3\. Romper las dependencias**: éstas suelen ser el principal obstáculo para crear los tests. Para eliminarlas, los objetos de tipo _fake_ / _mock_ pueden sernos muy útiles. Nos servirán no solo para _separar_ las clases que queremos probar sino también para _sentir_ a través de ellos que el comportamiento del objeto bajo test es el adecuado.
- **4\. Escribir los tests**: si se trata de cubrir primero código existente, con un comportamiento no evidente, podemos crear _tests de caracterizacion_, que simplemente describen lo que hace actualmente ante unos inputs y nos permitirán detectar si cambiamos involuntariamente su comportamiento más adelante. Otro concepto interesante para los tests es el de "costura" o _s__eam:_ un lugar en el que se puede "modificar" el comportamiento de un método sin tocar su código. Por ejemplo si el método recibe como parámetro un objeto e invoca un método suyo, podríamos en un test pasar una instancia de ese objeto en el que el método haya sido reescrito, a conveniencia del test.
- **5\. Hacer cambios  y refactorizar**, apoyados en herramientas de refactoring automático.

* * *

**CAMBIANDO EL SOFTWARE**

Este bloque del texto sigue un modelo de "recetas", planteando consejos y técnicas de refactoring a una lista extensa de problemas. Por citar algunos de los ejemplos:

- ¿Cómo añado una funcionalidad?
- Necesito hacer un cambio, pero no se qué tests escribir
- Mi aplicación es todo llamadas a un API
- ¿Cómo sé que no estoy rompiendo nada?
- ...

* * *

**TÉCNICAS PARA ROMPER DEPENDENCIAS**

Presenta varias técnicas de forma detallada y con código de ejemplo, algunas adaptadas del libro _Refactoring_, de _Martin Fowler_. Técnicas que, una vez aplicadas, rompen dependencias y favorecen la creación de tests.

Algunas de ellas son por ejemplo:

- _Extraer interfaz:_ si una clase existente es conflictiva para un test, podemos derivar de ella un interfaz y acoger selectivamente algunos de sus métodos. De esta forma, luego podremos sustituirla por otra clase que implemente ese mismo interfaz, pero que incluya las modificaciones del comportamiento que nos interesen.
- _Parametrizar un constructor_: si una dependencia se crea dentro de un constructor, una solución sencilla es exponer ese objeto como parámetro. Esta misma técnica puede generalizarse también a métodos comunes.
- _Crear una subclase y sobreescribir un método_: es una técnica potente, basada en usar herencia dentro de un test, para anular o modificar con una subclase la porción de comportamiento que nos interese. Personalmente me parece una técnica muy útil y que no conocía.

* * *

En resumen, creo que el libro merece la pena por el mensaje que trasmite: Legacy no es "un código que otro ha hecho mal hace mucho tiempo", puede ser un módulo que acabamos de escribir nosotros mismos sin crear unos tests asociados. Y es valioso también por el catálogo de recetas del segundo bloque, algo a lo que personalmente seguro que volveré buscando consejo en el futuro.

Si te enfrentas a actualizar un sistema antiguo, sin duda éste es un libro muy útil para ti.

Saludos
