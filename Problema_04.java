/*
Escribe un programa que lea números enteros hasta que se introduzca el cero. 
El cero indica el final de la secuencia y no debe formar parte de los datos procesados. 
El programa mostrará la cantidad de datos introducidos, su suma, cuántos son positivos y cuántos negativos. 
También calculará la media si se ha introducido al menos un dato.

@author Martin
fecha 20261116
*/

import java.util.Scanner;

public class Problema_04 {
    public static void main(String[] args) {
        Scanner teclado = new Scanner(System.in);

        int numero;
        int cantidad = 0;
        int suma = 0;
        int positivos = 0;
        int negativos = 0;

        do {
            System.out.print("Instroduce un numero (0 para terminar): ");
            numero = teclado.nextInt();

            if (numero != 0) {
                cantidad++;
                suma += numero;

                if (numero > 0) {
                    positivos++;
                } else {
                    negativos++;
                }
            }
        } while (numero != 0);

        System.out.println("Cantidad de datos: " + cantidad);
        System.out.println("Suma: " + suma);
        System.out.println("Positivos: " + positivos);
        System.out.println("Negativos: " + negativos);

        if (cantidad > 0) {
            double media = (double) suma / cantidad;
            System.out.println("Media: " + media);
        } else {
            System.out.println("No se puede calcular la media por que no se introdujo ningun numero.");
        }

        teclado.close();
    }
}