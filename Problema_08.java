import java.util.Scanner;

public class Problema_08 {
    public static void main(String[] args) {
        Scanner teclado = new Scanner(System.in);

        int numero;
        long factorial = 1;

        do {
            System.out.print("Introduce un número entre 1 y 20: ");
            numero = teclado.nextInt();

            if (numero < 1 || numero > 20) {
                System.out.println("Error: el número debe estar entre 1 y 20.");
            }

        } while (numero < 1 || numero > 20);

        for (int i = 1; i <= numero; i++) {
            factorial = factorial * i;
        }

        System.out.println("El factorial de " + numero + " es: " + factorial);
    }
}