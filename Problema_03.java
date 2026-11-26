import java.util.Scanner;

public class Problema_03 {
    public static void main(String[] args) {
        
        Scanner teclado = new Scanner(System.in);

        int mediciones;

        System.out.println("Introduzca el numero de mediciones que quiere calcular. Seguido introduzca las mediciones 1 por 1. Y finalmente le dara la suma de todas, la media, el valor maximo y minimo.");
        System.out.println("-----------------------------------------------------------------------------------------------");

        do {
            System.out.print("Mediciones que vas a introducir: ");
            mediciones = teclado.nextInt();

            if (mediciones < 0) {
                System.out.println("El numero ingresado no es valido, intente nuevamente.");
            } else if (mediciones == 0) {
                System.out.println("No se pueden calcular las mediciones si son 0, tontopan.");
            }
        } while (mediciones <= 0);

        double suma = 0;
        double media = 0;
        double maximo = Double.NEGATIVE_INFINITY;
        double minimo = Double.POSITIVE_INFINITY;

        for (int i = 0; i < mediciones; i++) {
            double valor;
            System.out.print("Ingrese la medicion: ");
            valor = teclado.nextDouble();

            suma = suma + valor;
            if (valor > maximo) {
                maximo = valor;
            }
            if (valor < minimo) {
                minimo = valor; 
        }
    }
        media = suma / mediciones;

        System.out.println("La suma es: " + suma);
        System.out.println("La media es: " + media);
        System.out.println("El valor maximo es: " + maximo);
        System.out.println("El valor minimo es: " + minimo);

        teclado.close();

    }
}
