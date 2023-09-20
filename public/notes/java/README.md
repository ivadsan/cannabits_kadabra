[//]: # @param group $$ Java
[//]: # @param title $$ Curso de Frontend Developer
[//]: # @param author $$ 01. Java SE - Básico

# Java

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

Por lo tanto Java es compila e interpretado

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
  Upper camel case para nombres de clase
  Lower camel case para nombre de variables, métodos.
  El nombre de la clase deberia ser identico al nombre del archivo

Las constantes las escribimos en mayúscula y snake case

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

Byte: (1 byte de memoria Ram) rango -128 a 127.
Short: (2 bytes de memoria Ram) rango -32,768 a 32,767.
Int: (4 bytes de memoria Ram) rango -2,147,483,648 a 2,147,483,647
long: (8 bytes de memoria Ram) rango -9,223,372,036,854,775,808 a -9,223,372,036,854,775,807

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

char -> 2 bytes (unicode, un solo valor) -> usa comillas simples, mientras que string comillas dobles

boolean -> 2 bytes true or false

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
