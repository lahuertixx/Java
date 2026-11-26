//DatosDeProducto

import java.util.Scanner;

public class MisDatos {
    public static void main (String[] args) {
        
        //Declaramos las variables
        Scanner teclado = new Scanner(System.in);
        String nombre;
        String categoria;
        String codigo;
        String descripcion;

        //Almacenar datos escaneados
        System.out.print("Nombre del producto: ");
        nombre = teclado.nextLine();
        System.out.print("Categoría: ");
        categoria = teclado.nextLine();
        System.out.print("Codigo: ");
        codigo = teclado.nextLine();
        System.out.print("Descripción del producto: ");
        descripcion = teclado.nextLine();

        //Mostrar tabla del producto

        System.out.println("__TABLA DE PRODUCTO__");
        System.out.println("____________________________");
        System.out.println("___Nombre: " + nombre + "_____");
        System.out.println("___Categoria: " + categoria + "_____");
        System.out.println("___Codigo: " + codigo + "_____");
        System.out.println("___Descripcion: " + descripcion + "_____");
        System.out.println("____________BYE___");


    }
}