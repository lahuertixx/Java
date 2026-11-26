import java.util.Scanner;

public class Problema_07 {
    public static void main(String[] args) {
        Scanner teclado = new Scanner(System.in);

        int numero;
        boolean primo = true;

        System.out.print("Introduce un número entero: ");
        numero = teclado.nextInt();

        if (numero < 2) {
            primo = false;
        } else {
            for (int i = 2; i < numero; i++) {

                if (numero % i == 0) {
                    primo = false;
                    break;
                }
            }
        }

        if (primo) {
            System.out.println("El número es primo");
        } else {
            System.out.println("El número no es primo");
        }
    }
}