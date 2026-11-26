import java.util.Scanner;
//Este programa muestra como usar escaner

public class MiEscaner {
    public static void main (String[] args) {
        Scanner teclado = new Scanner(System.in);
        String cadena;
        int numero;
        
        //Leemos una cadena de texto
        System.out.print("Escribe un texto: ");
        cadena = teclado.nextLine();

        //idem con un entero
        System.out.print("Escribe un numero entero: ");
        numero = teclado.nextInt();
    
    }
}