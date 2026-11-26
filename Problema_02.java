
import java.util.Scanner;

public class Problema_02 {
    public static void main(String[] args) {

        Scanner teclado = new Scanner(System.in);

        int numero;

        do { 
            System.out.print("Ingrese un numero del 1 al 10: ");
            numero = teclado.nextInt();

            if (numero < 1 || numero > 10) {
                System.out.println("El numero ingresado no es valido, intente nuevamente.");
            }
        } while (numero < 1 || numero > 10);

        for (int i = 1; i<= 10; i++) {
            System.out.println(numero + " * " + i + " = " + (numero * i));
        }
        teclado.close();
    }
}