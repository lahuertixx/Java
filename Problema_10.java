import java.util.Scanner;

public class Problema_10 {
    public static void main(String[] args) {

        Scanner teclado = new Scanner(System.in);

        int N;
        int cantidad = 0;

        System.out.print("Introduce el límite superior N: ");
        N = teclado.nextInt();

        for (int numero = 2; numero <= N; numero++) {

            int suma = 0;

            for (int divisor = 1; divisor < numero; divisor++) {

                if (numero % divisor == 0) {
                    suma += divisor;
                }
            }

            if (suma == numero) {
                System.out.println(numero);
                cantidad++;
            }
        }

        System.out.println("Cantidad de números perfectos encontrados: " + cantidad);

        teclado.close();
    }
}