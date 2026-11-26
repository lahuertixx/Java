import java.util.Scanner;

public class MiMatricula {
    public static void main (String[] args) {

        //VARIABLES
        Scanner teclado = new Scanner(System.in);
        String nombre;
        String apellidos;
        String ciclo;
        String curso;
        String grupo;

        //RECOGEMOS DATOS
        System.out.print("Escribe tu nombre: ");
        nombre = teclado.nextLine();
        System.out.print("Escribe tus apellidos: ");
        apellidos = teclado.nextLine();
        System.out.print("Escribe tu ciclo (Siglas): ");
        ciclo = teclado.nextLine();
        System.out.print("Escribe tu curso: ");
        curso = teclado.nextLine();
        System.out.print("Escribe tu grupo: ");
        grupo = teclado.nextLine();

        //MOSTRAMOS VALORES EN PANTALLA
        System.out.println(" ");
        System.out.println(" 🆗 MATRICULA REALIZADA 👌");
        System.out.println(" ");
        System.out.println("Nombre: " + nombre + " " + apellidos);
        System.out.println("Curso matriculado: " + curso + " de " + ciclo);
        System.out.println("Grupo del matriculado: Grupo " + grupo);
    }
}