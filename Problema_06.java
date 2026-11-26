/*Escribe un programa que lea un entero positivo N y muestre sus divisores propios, excluyendo al propio N. Si no hay divisores propios positivos distintos de 1, el programa deberá indicarlo claramente.
 Además de mostrar los divisores, calculará su suma. */

import java.util.Scanner;

public class Problema_06 {
    public static void main(String[] args) {
        Scanner teclado = new Scanner(System.in);

//Insertamos variables
        int numero;
        int suma = 0;

//Insertamos datos y combrobamos que sea lo que se pide
        System.out.print("Introduce un número positivo: ");
        numero = teclado.nextInt();

        if (numero < 0) {
            System.out.println("Error en el numero");
            return;
        }

//Creamos el bucle que comprueba los divisores de nuestro numero
        for (int i = 2; i < numero; i++) {

            if (numero % i == 0) {
                System.out.println("Divisor: " + i);
                suma = suma + i;
            }
        }

//Finalmente comprobamos si es primo y la suma de sus divisores
        if (suma == 0) {
            System.out.println("El numero es primo.");
        }
        else{
            System.out.println("Suma de los divisores: " + suma);    
        }
    }
}