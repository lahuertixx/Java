/*
 * LAHU PAGE · explicaciones de los ejercicios del repositorio.
 * Se escriben a partir del código real de cada archivo. Los archivos
 * incompletos o con errores se señalan como tal: también se aprende depurando.
 */
(function () {
    'use strict';

    const E = {
        'Contador.java': {
            que: 'Define una clase Contador con un atributo valor, dos constructores (uno empieza en 0 y otro en el valor que le pases) y métodos para incrementar, decrementar y consultar. El main de prueba se encarga de usarlos.',
            para: 'Sirve para entender constructores sobrecargados, estado de un objeto y encapsulation básico. Es el ejemplo perfecto de "molde" (clase) frente a "objeto" (instancia).'
        },
        'FichaAlumno.java': {
            que: 'Pide por teclado nombre, apellido y curso con Scanner y luego imprime una ficha con esos datos.',
            para: 'Sirve para practicar declaración de variables String, lectura con nextLine() y concatenación con + en System.out.println.'
        },
        'Fichadeprueba.java': {
            que: 'Intenta imprimir "Hola, Mundo!" y después usa una variable String llamada Integer. Ojo: la segunda línea pone system en minúsculas, así que no compila tal cual.',
            para: 'Sirve para aprender a leer errores del compilador: Java distingue mayúsculas de minúsculas, System va con S mayúscula. Un buen ejercicio de depuración.'
        },
        'incremento.java': {
            que: 'La clase está declarada pero vacía: todavía no tiene método main ni instrucciones.',
            para: 'Sirve como recordatorio de que una clase Java necesita un punto de entrada main para ejecutarse. Puedes usar este archivo para practicar escribir tu primer incremento.'
        },
        'Main.java': {
            que: 'Genera un número aleatorio entre 10 y 20 con Math.random(), lo convierte a int y lo imprime.',
            para: 'Sirve para aprender la fórmula de rango aleatorio (Math.random() * (max - min + 1)) + min y el cast a int. Muy útil para juegos de adivinar números.'
        },
        'MiAsignatura.java': {
            que: 'Pide nombre de asignatura, curso, ciclo, profesor y aula, y los muestra en un formato de lista ordenado por bloques.',
            para: 'Sirve para practicar salida formada con varias llamadas a println y para organizar la información que recoges del usuario.'
        },
        'MiEquipo.java': {
            que: 'Recoge fabricante, modelo, sistema operativo, nombre de equipo y usuario principal, y muestra una ficha del equipo.',
            para: 'Sirve para practicar variables String y presentación de datos en consola. Es el mismo patrón que FichaAlumno aplicado a otro contexto.'
        },
        'MiEscaner.java': {
            que: 'Explica cómo usar Scanner: lee una cadena con nextLine() y un entero con nextInt(). Tiene un comentario que lo describe.',
            para: 'Sirve como plantilla mínima de entrada de datos. Recuerda que después de nextInt() hay que tener cuidado si vuelves a llamar a nextLine().'
        },
        'MiMadre.java': {
            que: 'El archivo solo contiene un comentario de prueba, sin clase ni código ejecutable.',
            para: 'Sirve para reconocer que un comentario no se ejecuta y que un archivo .java necesita una clase con main para poder arrancar.'
        },
        'MiMatricula.java': {
            que: 'Pide nombre, apellidos, ciclo, curso y grupo, y muestra una matrícula confirmada con emojis.',
            para: 'Sirve para practicar entrada de datos, concatenación y mensajes de confirmación en consola.'
        },
        'MiPresentacion.java': {
            que: 'Pide nombre, localidad y ocupación, y construye una frase de presentación: "Hola, soy …, vivo en … y estudio …".',
            para: 'Sirve para dominar la concatenación de Strings con texto intermedio y espacios en blanco controlados con println(" ").'
        },
        'MiPrimerPrograma.java': {
            que: 'El clásico primer programa: imprime "Mi primer programa Java" por pantalla.',
            para: 'Sirve para ver la estructura mínima: public class, método main y System.out.println. Es por donde empieza todo.'
        },
        'MiPrueba.java': {
            que: 'Pide nombre, apellido y edad; muestra los datos y después comprueba con if (edad >= 18) si es mayor o menor de edad.',
            para: 'Sirve para combinar Scanner, nextInt() y una condición simple. Une entrada de datos con toma de decisiones.'
        },
        'MisDatos.java': {
            que: 'Pide nombre, categoría, código y descripción de un producto y lo muestra como una tabla hecha a base de guiones bajos.',
            para: 'Sirve para practicar la presentación de datos en consola y pensar cómo dar formato a una salida sin librerías externas.'
        },
        'MiSegundoPrograma.java': {
            que: 'Archivo vacío: aún no contiene clase ni código.',
            para: 'Sirve como espacio reservado para el siguiente ejercicio. Puedes aprovecharlo para reescribir MiPrimerPrograma desde cero.'
        },
        'Problema_01.java': {
            que: 'Pide dos enteros A y B con un do-while que exige A <= B y luego suma los números comprendidos entre ellos (excluyendo los extremos) con un for.',
            para: 'Sirve para practicar validación con do-while y bucles for con rangos. patrón típico de ejercicios de "suma entre dos límites".'
        },
        'Problema_02.java': {
            que: 'Pide un número del 1 al 10 repitiendo hasta que sea válido y muestra su tabla de multiplicar del 1 al 10.',
            para: 'Sirve para practicar validación de entrada y bucles for simples. Además cierra el Scanner con teclado.close(), buena costumbre.'
        },
        'Problema_03.java': {
            que: 'Pide cuántas mediciones se van a introducir (mayor que 0), las lee una a una y calcula suma, media, máximo y mínimo usando Double.NEGATIVE_INFINITY y POSITIVE_INFINITY como valores iniciales.',
            para: 'Sirve para aprender a calcular acumuladores y extremos en un bucle, y para ver un truco clásico: inicializar el máximo en -infinito y el mínimo en +infinito.'
        },
        'Problema_04.java': {
            que: 'Lee enteros hasta que se introduce 0. El 0 no se cuenta. Al final muestra cantidad, suma, cuántos positivos y cuántos negativos hubo y la media si hay datos.',
            para: 'Sirve para practicar bucle con centinela (valor que marca el final), contadores independientes y cálculo condicional de la media.'
        },
        'Problema_05.java': {
            que: 'Valida que la nota esté entre 0 y 10 con do-while y después la clasifica en Insuficiente, Suficiente, Bien, Notable o Sobresaliente con if/else if encadenados.',
            para: 'Sirve para entender por qué el orden de los else if importa: cada condición se evalúa solo si las anteriores fallaron.'
        },
        'Problema_06.java': {
            que: 'Pide un entero positivo y muestra sus divisores propios desde 2 hasta numero-1 usando el operador %, y suma esos divisores.',
            para: 'Sirve para practicar el operador módulo como prueba de divisibilidad y para detectar números perfectos (cuando la suma de divisores da el propio número).'
        },
        'Problema_07.java': {
            que: 'Comprueba si un número es primo: descarta los menores de 2 y busca divisores desde 2; si encuentra uno, pone primo = false y usa break para salir del bucle.',
            para: 'Sirve para aprender banderas booleanas (flag) y la instrucción break para dejar de buscar en cuanto ya tienes la respuesta.'
        },
        'Problema_08.java': {
            que: 'Pide un número entre 1 y 20 (validado con do-while) y calcula su factorial con un bucle for y una variable long como acumulador.',
            para: 'Sirve para ver por qué se usa long: factoriales crecen muy rápido y con int se desbordaría antes.'
        },
        'Problema_09.java': {
            que: 'Lee dos enteros positivos, calcula el MCD con el algoritmo de Euclides (bucle while con resto) y a partir de él obtiene el MCM.',
            para: 'Sirve para estudiar un algoritmo clásico y entender la relación mcd * mcm = a * b. Es matemática aplicada a programación.'
        },
        'Problema_10.java': {
            que: 'Pide un límite N y busca, para cada número desde 2 hasta N, la suma de sus divisores propios; si la suma coincide con el número, lo imprime (números perfectos).',
            para: 'Sirve para practicar bucles anidados y reutilizar la idea de divisores del Problema_06 dentro de otro algoritmo.'
        },
        'Problema_11.java': {
            que: 'Muestra un menú con 5 opciones y, en un while(true), suma, resta, multiplica o divide según lo que elijas. La opción 5 termina con break.',
            para: 'Sirve para entender menús interactivos, while(true) con break y la cadena if/else if para despachar opciones.'
        },
        'Problema_12.java': {
            que: 'Genera un número secreto entre 1 y 100 con Math.random() y pide intentos hasta acertar, indicando si el número es mayor, menor o está fuera de rango.',
            para: 'Sirve para combinar aleatoriedad, bucle while, contador de intentos y condicionales. Es un minijuego completo.'
        },
        'Pruebaaaaaaa.java': {
            que: 'Intenta leer un número con Scanner y usar un if. Tiene fallos: falta un punto y coma en println, la variable a no está declarada y faltan llaves.',
            para: 'Sirve para aprender a depurar: leer el error, ir a la línea señalada y corregirlo uno a uno. Los errores de compilación son parte del aprendizaje.'
        },
        'Untitled-1.java': {
            que: 'Pide nombre, ciudad y edad y muestra unos datos personales. No compila: falta un punto y coma en el import y el nombre de clase tiene un guion, que Java no permite.',
            para: 'Sirve para practicar las reglas de nombres de Java (no se admiten guiones) y la importancia del punto y coma en cada sentencia.'
        }
    };

    window.LAHU_EXPLANATIONS = Object.freeze(E);
})();
