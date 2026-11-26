/*
@author Martin Lahuerta
fecha 20261116
*/

import java.util.Scanner;

 public class Problema_01 {
    public static void main(String[] args) {

        Scanner teclado = new Scanner(System.in);

        int A;
        int B;
        int suma = 0;

        do {
            System.out.print("Ingrese el valor de A: ");
            A = teclado.nextInt();

            System.out.print("Ingrese el valor de B: ");
            B = teclado.nextInt();

            if (A > B) {
                System.out.println("Error: A debe ser menor o igual que B");
            }
 
        } while (A > B);

        for (int i = A + 1; i < B; i++) {
            if (i % 3 == 0) {
                suma = suma + i;
            }
        }

        System.out.println("La suma de los múltiplos de 3 es: " + suma);

        teclado.close();
    }
}
