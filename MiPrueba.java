//Importamos biblioteca Scanner
import java.util.Scanner;

public class MiPrueba {
    public static void main (String[] args) {

        //Declaramos las variables con Scanner
        Scanner teclado = new Scanner(System.in);        
        String nombre;
        String apellido;
        int edad;

        //Creamos el Scanner para definir el valor de las variables
        System.out.print("Escribe tu nombre: ");
        nombre = teclado.nextLine();

        System.out.print("Escribe tu apellido: ");
        apellido = teclado.nextLine();
        
        System.out.print("Escribe tu edad: ");
        edad = teclado.nextInt();


        //Proyecta todo tipo de opciones
        System.out.println("Nombre: " + nombre + " " + apellido);
        System.out.println("Y tu edad es: " + edad);


        //Eres mayor o menor de edad
        if (edad >= 18){
            System.out.print("Eres mayor de edad");
        } else {
            System.out.println("Eres menor de edad");
        }
    }
}