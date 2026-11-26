import java.util.Scanner;

public class MiAsignatura {
    public static void main (String[] args) {

        //Creamos las variables
        Scanner teclado = new Scanner(System.in);
        String nombre;
        String curso;
        String ciclo;
        String profe;
        String aula;

        //Recogemos los datos
        System.out.print("Nombre de la asignatura: ");
        nombre = teclado.nextLine();
        System.out.print("Escribe tu numero de curso: ");
        curso = teclado.nextLine();
        System.out.print("El nombre de tu ciclo: ");
        ciclo = teclado.nextLine();
        System.out.print("Nombre de tu profesor: ");
        profe = teclado.nextLine();
        System.out.print("Escribe tu aula: ");
        aula = teclado.nextLine();

        //Mostramos los datos en un orden
        System.out.println(" ");
        System.out.println("NOMBRE DE LA ASIGNATURA________");
        System.out.println("1. " + nombre);
        System.out.println("NOMBRE DEL CURSO_______________");
        System.out.println("2. " + curso);
        System.out.println("NOMBRE DE LA CICLO_____________");
        System.out.println("3. " + nombre);
        System.out.println("NOMBRE DEL PROFESOR____________");
        System.out.println("4. " + profe);
        System.out.println("NOMBRE DE LA ASIGNATURA________");
        System.out.println("5. " + aula);

    }
}