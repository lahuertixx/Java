//FichaAlumno

import java.util.Scanner;

public class FichaAlumno {
    public static void main (String[] args ) {
        
        //Declaramos variables y scanner
        Scanner teclado = new Scanner (System.in);
        String nombre;
        String apellido;
        String curso;

        //Declaramos los datos 
        System.out.print("Escribe tu nombre: ");
        nombre = teclado.nextLine();
        System.out.print("Escribe tu apellido: ");
        apellido = teclado.nextLine();
        System.out.print("Escribe tu curso: ");
        curso = teclado.nextLine();

        //Printeamos todos los datos en la pantalla
        System.out.println("Tu nombre es: " + nombre + " " + apellido);
        System.out.println("Tu curso es: " + curso);
    }
}