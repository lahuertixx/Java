
import java.util.Scanner

public class Untilted-1 {
	public static void main(String[] args) {
		Scanner teclado = new Scanner(System.in);
		
		String nombre;
		String ciudad;
		int edad;
		
		System.out.println("Introduce tu nombre: ");
		nombre = teclado.nextLine();
		System.out.println("Introduce tu ciudad: ");
		ciudad = teclado.nextLine();
		System.out.println("Introduce tu edad: ");
		edad = teclado.nextInt();

		System.out.println("DATOS PERSONALES");
		System.out.println("________________");
		System.out.println("Nombre: " + nombre);
		System.out.println("Edad: " + edad);
		System.out.println("Ciudad: " + ciudad);

	}
}