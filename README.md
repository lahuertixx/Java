# LAHU PAGE

Mi página web personal (por Lahuertix). Un solo sitio con apartados separados:

- **Inicio**: portada y mapa de la web.
- **Java**: ejercicios reales del repositorio con explicación y botón **Ejecutar código**.
- **Práctica**: ejercicios interactivos de Java y HTML (tú escribes, la web corrige).
- **Apuntes**: temas vistos en clase con ejemplos de código.
- **Proyectos**: escaparate de trabajos.
- **Contacto**: correo y GitHub.

## Apuntes

La pestaña **Apuntes** reúne 18 temas repartidos en 5 temarios: Programación Java, Bases de datos, Sistemas y digitalización, Entornos de desarrollo y Lenguajes de marcado. Cada tema tiene explicación, un ejemplo de código y el resultado esperado, con notas sobre qué ocurre en cada caso. El contenido está resumido de los PDF del curso guardados en `Descargas`.

## Ejecutar ejercicios

Al pulsar **Ejecutar código**, el código se envía a [Wandbox](https://wandbox.org/) (compilador Java online, sin clave ni registro). Si un programa pide datos por teclado, escríbelos en la caja **Entrada**, uno por línea. Si no hay conexión, la consola muestra el comando para hacerlo en local:

```bash
javac Nombre.java
java Nombre
```

## Cambiar el correo

Edita `js/config.js` y cambia `EMAIL`. Se actualizará solo en toda la web.

## Añadir un ejercicio

1. Añade el archivo `.java` en la raíz.
2. Añade su nombre exacto a `window.JAVA_EXERCISES` en `js/exercises.js`.
3. Si quieres que tenga explicación, añade una entrada en `js/explanations.js` con `que` y `para`.

## Futuro

- HTML será el próximo lenguaje añadido (de momento solo está la pestaña de práctica y el apunte). Ni Python ni otros.
- El asistente de IA en modo tutor (pistas, nunca soluciones) queda guardado para más adelante: GitHub Pages es estático y no puede guardar claves de API privadas.

## Publicar

Es una web estática: funciona en GitHub Pages desde la rama `main` sin build ni dependencias.
