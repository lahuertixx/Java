import java.util.Scanner;

public class Problema_12 {
    public static void main(String[] args) {
        Scanner teclado = new Scanner(System.in);

        int numeroSecreto = (int) (Math.random() * (100 - 1 + 1)) + 1;
        int numero = 0;
        int intentos = 0;

        System.out.println("Intenta adivinar en los menos intentos posibles el numero secreto del 1 - 100 (incluidos).\n");
        while (numero != numeroSecreto){
            System.out.print("Introduce el número: ");
            numero = teclado.nextInt();

            if (numero > numeroSecreto && numero <= 100){
                System.out.println("Tu numero es MAYOR. Repite +1 intento\n");
            intentos++;
            }
            else if (numero < numeroSecreto && numero >= 1){
                System.out.println("Tu numero es MENOR. Repite +1 intento\n");
            intentos++;
            }
            else if (numero == numeroSecreto){
                System.out.println("Lo acertaste. En "+ intentos + " intentos. El numero secreto era " + numeroSecreto + "!!!");
            intentos++;
            }
        
            else {
               System.out.println("Numero fuera de rango (1-100)\n"); 
            }
        }
    }
}