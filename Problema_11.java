import java.util.Scanner;

public class Problema_11 {
    public static void main(String[] args){
        Scanner teclado = new Scanner(System.in);

    int eleccion;
        
        System.out.println("Bienvenido, elige la que desees.");

    while(true){
        System.out.println();
        System.out.println("1. Sumar dos números.");
        System.out.println("2. Restar dos números.");
        System.out.println("3. Multiplicar dos números.");
        System.out.println("4. Dividir dos números.");
        System.out.println("5. Terminar.");
        System.out.println();

        System.out.print("Escoge una opcion (1-5): ");
        eleccion = teclado.nextInt();
        System.out.println();
        if (eleccion == 1){
            System.out.print("Escribe un numero: ");
            int A = teclado.nextInt();
            System.out.print("Escribe otro numero: ");
            int B = teclado.nextInt();
            System.out.println("La suma es: " + (A + B));
        }
        else if (eleccion == 2){
            System.out.print("Escribe un numero: ");
            int C = teclado.nextInt();
            System.out.print("Escribe otro numero: ");
            int D = teclado.nextInt();
            System.out.println("La resta es: " + (C - D));
        }
        else if (eleccion == 3){
            System.out.print("Escribe un numero: ");
            int E = teclado.nextInt();
            System.out.print("Escribe otro numero: ");
            int F = teclado.nextInt();
            System.out.println("La multiplicación es: " + (E * F));
        }
        else if (eleccion == 4){
            System.out.print("Escribe un numero: ");
            int G = teclado.nextInt();
            System.out.print("Escribe otro numero: ");
            int H = teclado.nextInt();
            float resultado = G/H;
            System.out.println("La multiplicación es: " + resultado);
        }
        else if (eleccion == 5){
            
            System.out.print("Saliendo..........");
            System.out.println();           
            break;
        }

        else {
            System.out.println("Fuera de rango.........");
            System.out.println();
        }

    }
    }
}