import java.util.Scanner;

public class MiEquipo {
    public static void main (String[] args) {
        
        //Declaramos las variables
        Scanner teclado = new Scanner(System.in);
        String fabricante;
        String modelo;
        String sistema;
        String nombre;
        String usuario;

        //Almacenar datos escaneados
        System.out.print("Nombre del fabricante: ");
        fabricante = teclado.nextLine();
        System.out.print("Modelo: ");
        modelo = teclado.nextLine();
        System.out.print("Sistema operativo: ");
        sistema = teclado.nextLine();
        System.out.print("Nombre del equipo: ");
        nombre = teclado.nextLine();
        System.out.print("Usuario principal: ");
        usuario = teclado.nextLine();


        //Mostrar datos del equipo
        System.out.println(" ");
        System.out.println("FABRICANTE: " + fabricante);
        System.out.println("MODELO: " + modelo);
        System.out.println("SISTEMA OPERATIVO: " + sistema);
        System.out.println("NOMBRE DEL EQUIPO: " + nombre);
        System.out.println("USUARIO PRINCIPAL: " + usuario);


    }
}