import java.util.Scanner;

public class Problema_09 {
    public static void main(String[] args) {

        Scanner teclado = new Scanner(System.in);

        int A;
        int B;
        int resto;
        int mcd;
        int mcm;

        System.out.println("Introduce dos enteros positivos:");

        A = teclado.nextInt();
        B = teclado.nextInt();

        // Algoritmo de Euclides para calcular el MCD
        int a = A;
        int b = B;

        while (b != 0) {
            resto = a % b;
            a = b;
            b = resto;
        }

        mcd = a;

        // Cálculo del MCM
        mcm = (A * B) / mcd;

        System.out.println("El MCD es: " + mcd);
        System.out.println("El MCM es: " + mcm);

        teclado.close();
    }
}