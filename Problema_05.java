import java.util.Scanner;

public class Problema_05 {
    public static void main(String[] args) {
        Scanner teclado = new Scanner(System.in);

        int nota_alumno;

        do {
            System.out.print("Introduce tu nota de examen (0-10): ");
            nota_alumno = teclado.nextInt();

            if (nota_alumno < 0 || nota_alumno > 10) {
                System.out.println("El número debe estar entre 0 y 10");
            }

        } while (nota_alumno < 0 || nota_alumno > 10);

        if (nota_alumno < 5) {
            System.out.println("Insuficiente");
        } else if (nota_alumno < 6) {
            System.out.println("Suficiente");
        } else if (nota_alumno < 7) {
            System.out.println("Bien");
        } else if (nota_alumno < 9) {
            System.out.println("Notable");
        } else {
            System.out.println("Sobresaliente");
        }

        teclado.close();
    }
}