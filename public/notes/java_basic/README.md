[//]: # @param group $$ Java
[//]: # @param title $$ Curso de introducción a Java SE
[//]: # @param author $$ 01. Java SE - Básico

# Curso de introducción a Java SE

## Introducción

_Write Once Run Anywhere - WORA_

_Escribelo una vez y ejecutalo donde quieras_

### Instalación del JDK

JDK kit de desarrollo de Java, contiene todas las librerías necesarias para empezar

- Desde la version 10 en adelante solo se pueden ejecutar en máquinas de 64 bits

Si instalamos Java desde la página de Oracle, OpenJDK u otras se muestra dos versiones macOS / AArch64 y macOS / x64 la primera es para procesadores M1 y la otra para intel

Tanto la version de oracle como open jdk son gratis no requiere licencia pero al pasar a produccion la version de Oracle requiere licencia mientras que la open no, pero esta última no recibe los parches de seguridad que desarrolla Oracle.

Antes Java JRE ( Java Runtime Enviroment - la máquina virtual para correr java) venia por separado hasta la version 8, las versiones posteriores lo incluyen en el JDK

### IntelliJ IDEA

Para IntelliJ IDEA instalamos la version community, es una versión libre para desarrolladores.

### Instalación de SDKMAN

SDKMAN como gestor de versiones de JDK y otras dependencias.

para instalar

```
curl -s "https://get.sdkman.io" | bash

```

Para obtener todos los programas que podemos instalar con sdkman

```
sdk list

```

para ver todas las versiones candidatas de los programas por ejemplo

```
sdk list java

```

Para instalar una versión en concreto nos guiamos del identifier que aparece en el listado por ejemplo

```
sdk install java 17.0.8-tem

```

ahora para seleccionar temporalmente una versión mientras está la sesión de shell activa usamos

```
sdk use java 17.0.8-tem

```

si queremos que la version sea permanentemente por defecto

```
sdk default java 17.0.8-tem

```

Si quisieramos instalar spring, podriamos hacerlo de la siguiente manera (En caso de no indicar la version, se. instalaría la última versión disponible)

```
sdk install springboot

```

Nuevamente si quiero ver las versiones

```
sdk list springboot

```

### Iniciando con Java

El método main es el punto de entrada a la aplicación

```
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
        for (int i =0; i<5;i++){
            System.out.println(i);
        }
    }

}
```

Una aplicación de Java por lo general solo debería tener un solo punto inicio pero esto no impide tener mas de un main.

### Etapas de la programación en Java

1. Código fuente archivo .java
2. Compilador javac (Compilar, Cargar, Verificar)
3. Bytecode .class
4. JVM java virtual machine (Interpretar - Encargado del multiplataforma del lenguaje)

Cabe aclarar que JRE (Java Runtime Environment) contiene a la JVM (Java Virtual Machine). La JRE es un entorno de ejecución completo que incluye la JVM, junto con las bibliotecas y archivos necesarios para ejecutar aplicaciones Java. La JVM es la parte esencial de la JRE que se encarga de interpretar y ejecutar el bytecode de Java. Por lo tanto, cuando instala la JRE en su sistema, obtiene automáticamente la JVM, lo que le permite ejecutar aplicaciones Java sin necesidad de preocuparse por la JVM por separado.

Por lo tanto Java es compilado e interpretado

El bytecode agrega una capa de seguridad al código y no lo expone.

### La JShell de Java

jshell es una herramienta interactiva de línea de comandos que se introdujo en Java 9. Proporciona un entorno de desarrollo interactivo para Java, lo que significa que puedes escribir y ejecutar código Java de manera interactiva sin necesidad de crear archivos de código fuente ni compilarlos manualmente. jshell es una herramienta útil para probar ideas rápidamente, realizar experimentos y aprender Java de manera más interactiva.

Aquí hay algunas características clave de jshell:

Interacción en tiempo real: Con jshell, puedes escribir código Java y obtener resultados inmediatos. No es necesario escribir un programa completo y compilarlo para ver los resultados.

Historial de comandos: jshell almacena un historial de los comandos que has ejecutado durante una sesión. Puedes navegar por el historial, reutilizar comandos anteriores y realizar modificaciones en tiempo real.

Soporte de expresiones: Puedes escribir expresiones Java directamente en jshell y ver los resultados sin necesidad de declarar clases ni métodos.

Declaraciones de variables: Puedes declarar y asignar valores a variables en jshell, lo que facilita la experimentación con diferentes valores y cálculos.

Soporte para tabulaciones y autocompletado: jshell ofrece funciones de autocompletado y resaltado de sintaxis para ayudarte a escribir código más rápido y con menos errores.

Importación de paquetes y clases: Puedes importar paquetes y clases directamente en jshell para acceder a sus funcionalidades.

Recuperación de errores amigable: Si cometes un error al escribir código en jshell, la herramienta intentará proporcionar mensajes de error descriptivos para ayudarte a corregirlo.

Para iniciar jshell, simplemente abre una terminal y escribe jshell. A partir de ahí, puedes comenzar a escribir código Java de inmediato. Aquí hay un ejemplo simple:

```
jshell> int x = 5;
x ==> 5

jshell> int y = 10;
y ==> 10

jshell> int suma = x + y;
suma ==> 15

jshell> System.out.println("La suma es: " + suma);
La suma es: 15

```

## Variables en Java

Siempre antes de declarar una variable es requerido indicar el tipo (int, String)

### Convención de Nombres en Java

- Es case sensitive
- Deben comenzar con una letra o $ o \_
- Upper camel case para nombres de clase
- Lower camel case para nombre de variables, métodos.
- El nombre de la clase deberia ser identico al nombre del archivo
- Las constantes las escribimos en mayúscula y snake case

```
        // Declaration and initialization
        int salary = 1000;
        System.out.println(salary);
        salary += 200;
        System.out.println(salary);

        String name= "Dario";

        // reassignment
        name = name + " Sanchez";
        System.out.println(name);

        name = "Ivan " + name;
        System.out.println(name);
```

### Tipos de datos numéricos

- Byte: (1 byte de memoria Ram) rango -128 a 127.
- Short: (2 bytes de memoria Ram) rango -32,768 a 32,767.
- Int: (4 bytes de memoria Ram) rango -2,147,483,648 a 2,147,483,647
- long: (8 bytes de memoria Ram) rango -9,223,372,036,854,775,808 a -9,223,372,036,854,775,807

```
public class DataTypes {
    public static void main(String[] args) {

        // Number data types
        int n = 1234567890;
        long nL = 12345678901L;
        double nD = 3.1231231;
        float nF = 3.1231231F;

    }
}

```

### Tipos de datos char y boolean

- char -> 2 bytes (unicode, un solo valor) -> usa comillas simples, mientras que string comillas dobles

- boolean -> 2 bytes true or false

A partir de java 10 no es necesario ingresar el tipo de dato antes que el nombre de la variable, ahora es posible usando el keyword "var" esto lo hacer por inferencia

```
 // data type inference

        //var salary = 1000.0; // double
        var salary = 1000; // int
        var pension = salary * 0.03; //double
        var total = salary - pension; // int - double = double
        System.out.println(salary);
        System.out.println(pension);
        System.out.println(total);

        var firstName = "Ivan";
        System.out.printf("El salario de %s es $%.2f", firstName, total);
```

### Operadores de Asignación, Incremento y Decremento

**Operadores de asignación:**

```
+=: a += b es equivalente a a = a + b.
-=: a -= b es equivalente a a = a - b.
*=: a *= b es equivalente a a = a * b.
/=: a /= b es equivalente a a = a / b.
%=: a %= b es equivalente a a = a % b.

```

Operadores de incremento:

```
++: i++ es equivalente a i = i + 1.
--: i-- es equivalente a i = i - 1.
```

Podemos usar estos operadores de forma prefija (++i) o postfija (i++). La diferencia está en qué operación se ejecuta primero:

```
// Incremento postfijo:
int vidas = 5;
int regalo = 100 + vidas++;

System.out.println("Regalo: " + regalo + ", vidas: " + vidas);
// Regalo: 105, vidas: 6

// Incremento prefijo:
int vidas = 5;
int regalo = 100 + ++vidas;

System.out.println("Regalo: " + regalo + ", vidas: " + vidas);
// Regalo: 106, vidas: 6
```

### Cast en variables: Estimación y Exactitud

En la programación hay situaciones donde necesitamos cambiar el tipo de dato de nuestras variables, esto lo conocemos como Cast.

Estimación:

double monthlyDogs = dogsQuantity / 12.0;
// monthlyDogs: 2.5 (pero no es posible, ¡no rescatamos medio perrito!)

int estimatedMonthlyDogs = (int) monthlyDogs;
// estimatedMonthlyDogs: 2

// Recuerda que el casteo no redondea, solo quita los decimales:
Math.sqrt(3) // 1.7320508075688772
(int) Math.sqrt(3) // 1
Exactitud:

int a = 30;
int b = 12;

a / b // 2
(double) a / b // 2.5

### Casteo entre tipos de datos

No hay problema al castear de un tipo de dato pequeño a uno grande, pero de uno grande a uno pequeño lo que hace es truncar valores, por ejemplo de double a int lo que hace es quitar nada mas los decimales.

El casting automático solo hace el cast de resultado y no desde la raiz perdiendo exactitud en el resultado

![](/notes/java_basic/assets/cast.png)

```

public class Casting {
    public static void main(String[] args) {


        int a = 30;
        int b = 12;

        // Casteo implicito con truncamiento y perdida de datos
        double c = a / b;
        System.out.println(c); // 2.0

        // Casteo explicito para mayor exactitud, de un tipo de dato menor a uno mayor
        System.out.println((double) a/b); // 2.5

        // casteo implicito
        char x  = '1';
        int xI = x;
        System.out.println(xI); // 49 (ASCII)

        // Casteo explicito por pasar de un tipo de datos grande a uno pequeño
        short yI = (short) x;
        System.out.println(yI); // 49 (ASCII)

    }

}

```

### Archivos .JAR

Archivos executables de JAVA

Los archivos JAR estan comprimidos en ZIP

Contienen archivos compilados \*.class

1- File -> Project Structure Luego en la opción de Artifacts -> Adds (+) -> JAR -> From module with dependencies
2- Seleccionar un clase que contenga un método Main(), por lo general solo es una pero puede ocurrir que se muestren mas de una.
3- Luego de seleccionar la clase se debe crear en src/META-INF/MANIFEST.MF que son las instrucciones de como funciona el archivo .jar
4- Ya estamos habilitados para buildear el artefacto para ello vamos a Build -> Build artifacts esto generara el archivo .jar en out/artifacts/carpetanombredelarchivo.jar/nombredelarchivo.jar

5- Para ejecutar el archivo lo hacemos desde el terminal

- Verificar primero con `java --version` la versión del entorno de producción, si el proyecto esta una versión menor no soportada toca cambiar a una versión compatible

6- `java -jar HolaMundoJava.jar`

## Aplicar condicionales en Java

### Sentencia if

```
boolean isBluetoothEnabled = true; // también podría ser false
int filesSended = 3;

if (isBluetoothEnabled) {
  fileSended++;
  System.out.println("Archivo enviado");
}
```

### scope

En Java, el "scope" se refiere al ámbito o alcance de visibilidad de una variable. Hay varios niveles de alcance en Java, y la visibilidad de una variable está determinada por dónde se declara. Aquí hay un resumen de los principales aspectos del "scope" en Java:

**Bloque de código:** Las variables declaradas dentro de un bloque de código, como el cuerpo de un bucle o una estructura condicional, tienen un alcance limitado a ese bloque.

```
if (true) {
    int x = 10; // Alcance dentro del bloque if
    System.out.println(x);
}
// System.out.println(x); // Esto generaría un error, ya que x no está disponible aquí

```

**Método:** Las variables declaradas dentro de un método tienen un alcance limitado al cuerpo del método. No son accesibles fuera de ese método.

```
public void ejemplo() {
    int y = 20; // Alcance dentro del método ejemplo
    System.out.println(y);
}
// System.out.println(y); // Esto generaría un error, ya que y no está disponible aquí

```

**Clase:** Las variables de instancia (también conocidas como variables de clase) tienen un alcance que abarca toda la clase. Son accesibles desde cualquier método dentro de la clase.

java
Copy code
public class Ejemplo {
int z = 30; // Alcance en toda la clase Ejemplo

    public void otroMetodo() {
        System.out.println(z); // Puede acceder a z aquí
    }

}
Parámetros del método: Los parámetros de un método tienen un alcance limitado al cuerpo del método, similar a las variables locales.

java
Copy code
public void metodoConParametro(int parametro) {
System.out.println(parametro); // Puede acceder al parámetro aquí
}
// System.out.println(parametro); // Esto generaría un error, ya que el parámetro no está disponible aquí
Es importante entender y tener en cuenta el alcance de las variables para evitar errores y escribir un código más claro y mantenible en Java.
