import java.util.Scanner;

public class MiPresentacion {
    public static void main (String[] args) {

        //Declaramos las variables
        Scanner teclado = new Scanner(System.in);
        String nombre;
        String localidad;
        String ocupacion;

        //Recogemos los datos
        System.out.print("Escribe tu nombre: ");
        nombre = teclado.nextLine();
        System.out.print("Escribe tu localidad: ");
        localidad = teclado.nextLine();
        System.out.print("Tu trabajo o estudios: ");
        ocupacion = teclado.nextLine();

        //Mostramos el final concatenado
        System.out.println(" ");
        System.out.println("Hola, soy " + nombre + ", vivo en " + localidad + " y estudio "+ ocupacion);
    }
}