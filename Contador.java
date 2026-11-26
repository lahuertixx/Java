import java.util.Scanner;

public class Contador {

    int valor;

    // Constructor con valor inicial 0
    public Contador() {
        valor = 0;
    }

    // Constructor con valor inicial indicado
    public Contador(int valorInicial) {
        valor = valorInicial;
    }

    // Incrementar
    public void incrementar() {
        valor++;
    }

    // Decrementar
    public void decrementar() {
        valor--;
    }

    // Consultar el valor
    public int consultarValor() {
        return valor;
    }

    public static void main(String[] args) {

        Scanner teclado = new Scanner(System.in);

        System.out.print("Introduce el valor inicial: ");
        int valorInicial = teclado.nextInt();

        Contador contador = new Contador(valorInicial);

        boolean cerrar = false;

        while (!cerrar) {

            System.out.println("\n1. Incrementar");
            System.out.println("2. Decrementar");
            System.out.println("3. Consultar valor");
            System.out.println("4. Salir");

            System.out.print("Elige una opción: ");
            int opcion = teclado.nextInt();

            if (opcion == 1) {
                contador.incrementar();

            } else if (opcion == 2) {
                contador.decrementar();

            } else if (opcion == 3) {
                System.out.println("Valor actual: " + contador.consultarValor());

            } else if (opcion == 4) {
                cerrar = true;
            }
        }

        teclado.close();
    }
}