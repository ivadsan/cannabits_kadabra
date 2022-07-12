[//]: # @param group $$ TypeScript
[//]: # @param title $$ Fundamentos de TypeScript
[//]: # @param author $$ Iván D. Sánchez

# Fundamentos de TypeScript

Mientras mas rápido encontremos un error más rápido será solucionarlo


**Capas de desarrollo**

* Static analysis (Análisis de código estático) 
    
    - No es necesario correr pruebas 
    - Corre directamente desde nuestro editor de código
    - Localiza rápidamente typos
    - Llamadas incorrectas a funciones o funciones no definidas
    - Autocompleta código

* Unit Test (Pruebas unitarias)

    - Verifica si el código hace lo que pensamos que deba hacer

* Integration Test

    - Hace pruebas conjuntas para saber si todo el sistema funciona

* Code review

    - Valida si el código cumple con las reglas y prácticas de el equipo de desarrollo


## Configuración del proyecto

Aunque TypeScript se puede instalar como un dependencia global, vamos a crear una carpeta e inicializar el proyecto instalando TypeScript como una dependencia de desarrollo


- Crear carpeta ts-project
- Crear .gitignore
- Crear .editorconfig (estandarizar la configuración básica del editor), para que la configuración tenga efecto, es necesario instalar la extensión de VsCode "EditorConfig for VS Code". Es una buena práctica para equipos de desarrollo


            # Editor configuration, see https://editorconfig.org
            root = true

            [*]
            charset = utf-8
            indent_style = space
            indent_size = 2
            insert_final_newline = true
            trim_trailing_whitespace = true

            [*.ts]
            quote_type = single

            [*.md]
            max_line_length = off
            trim_trailing_whitespace = false

    - Crear package.json

        
            npm init -Y

    - Instalación de TypeScript  como dependencia de desarrollo


        
            npm install typescript --save-dev

    - Podemos ejecutar TS desde el proyecto con npx

    
        
            npx tsc --version

## Atrapando errores

A través de analizador de código estático, obtienes feedback del script en tiempo de desarrollo, antes de que este pase por un interpretador de JS o sea desplegado en producción.

Podemos activar el analizador de código estático de TypeScript en archivos de JavaScript, para ello escribimos en la primer línea del archivo:


        //@ts-check



## El compilador de TypeScript

Ni NodeJS, ni el navegador nativamente corren TypeScript.

Los archivos .ts son transpilados a .js (Los traduce a JavaScript, inclusive se puede indicar la versión)

![](/notes/typescript_fundamentos/assets/tsc-01.jpeg) 


### Compilación de archivos TypeScript desde Node.js

Para realizar el proceso de transpilación en Node.js, ejecutemos lo siguiente en la terminal:


        npx tsc archivo_typescript.ts


Tras esto, se creará un archivo JavaScript dentro de la misma carpeta donde está el archivo TypeScript y con el mismo nombre.




**Nota:** Por defecto TypeScript intentará transpilar el código a una versión vieja de JavaScript (ECMAScript 3)



La version soportada actualmente por todos los navegadores es ECMAScript 5 y próximamente la 6.


Para indicar una version especifica de JavaScript lo podemos hacer usando la bandera --target


      npx tsc src/01-hello.ts --target es6



**Nota:** A pesar de que un archivo tenga advertencias de TypeScript, este sin embargo será compilado


### Enviando compilación a una carpeta

Para que los archivos transpilados no se generen en la misma carpeta que el archivo de TS, podemos indicarle la carpeta de destino

      
      
      npx tsc archivo_typescript.ts --target es6 --outDir carpeta_destino
      npx tsc src/demo.ts --target es6 --outDir dist


También podemos hacerlo para todos los archivos de extensión .ts

      
      npx tsc *.ts --target es6 --outDir carpeta_destino
      npx tsc src/*.ts --target es6 --outDir dist


Ahora los archivos traspilados ya pueden ser ejecutados con NodeJS


## Veamos el TSConfig.json

Vamos a crear nuestro archivo de configuración de TypeScript

    npx tsc --init


esto crea en la raíz del proyecto, el archivo tsconfig.json

En este archivo podemos habilitar y editar outDir

    
    "outDir": "./dist", 


Tambien podemos indicarle nuestro rootDir en src


    "rootDir": "./src",    


Ahora al ejecutar ''npx tsc'' traspilará nuestros archivos según la configuración del archivo tsconfig.json

Ahora tambien podemos agregar un watcher a nuestra linea de comandos para que se vaya transpilando el código cada vez que guardamos un cambio.


    npx tsc --watch


**Nota:** Cuando usamos un Framework de JS ya sea para backend o frontend e integramos TypeScript, este viene con su propio tsconfig.json según sus requerimientos.


## Tipos de datos primitivos

### Qué es el tipado en TypeScript

TypeScript es un superset de JS

JS si tiene tipos, lo que no tiene es un sistema fuertemente tipado que haga control de ellos.

TS es mas verbose, amplia la definición en la declaración de variables.


La sintaxis utilizada en TypeScript para indicar el tipo de dato de una variable es:

        
        const foo: number = 13

A esta característica en la sintaxis se le conoce como  type annotation


TS puede inferir un tipo o hacerlo de forma explicita


### Tipos inferidos

Los tipos de datos inferidos son aquellos donde TS supone o deduce a partir del valor con que se inicializa una variable, ejemplo


        let productName = 'Beer' // string
        let productPrice = 123 // number


Para este caso se asume que el tipo de dato inferido controla los valores que se le re-asignan a la variable

Esto se hace a partir de un motor de inferencia de datos.


Cuando el tipo de dato está definido, El editor de código mostrará la colección de métodos a los que puede acceder la variable según su tipo de dato

En el caso de la constantes TS muestra el valor directamente como su tipo de dato y es porque el valor de una constante no puede ser reasignado 

**Nota:** En el caso de declarar variables con el mismo nombre en archivos diferentes del mismo proyecto, TS nos advierte un error, esto sucede porque no se usa una arquitectura modular donde se limite el scope de las variables, para ello tambien podemos usar IIFE (inmediatily invoked function expression)


        (()=>{
        let productName = 'Beer' // string
        let productPrice = 123 // number
        })()


### Numbers

El tipo de dato number se usa para variables que contendrán números positivos, negativos o decimales.

#### Operaciones
En JavaScript, una variable de tipo number puede fácilmente ser concatenado con otra de tipo string:

        //JavaScript
        let myNumber = 30;
        myNumber = myNumber + "5"; //El resultado sería '305'


Sin embargo, esto podría llevar confusiones y errores durante la ejecución del programa, además de estar cambiando el tipo de dato de la variable. Por ello, en TypeScript solo se pueden hacer operaciones numéricas entre números:

        //TypeScript
        let myNumber: number = 30;

        myNumber = myNumber + 10; //CORRECTO
        myNumber = myNumber + "10"; //INCORRECTO


#### Uso de variables sin inicializar


Serán señalados como errores aquellas variables que queramos usar sin haberles dado un valor inicial, a menos que indiquemos el tipo de dato de manera explicita ya que TS no tienen como inferir el tipo

Aunque podamos declarar variables sin asignar, nos va a marcar una alerta si intentamos usarlas mientras no estén definidas, ya sea en una estructuras de control o imprimirlas por consola.


        //TypeScript
        let productInStock: number;
        console.log("Product in stock: " + productInStock);


#### Conversión de números de tipo string a tipo number


Para esto usaremos el método parseInt:

        let discount: number = parseInt("123");

        let numeroString: string = "100";
        let nuevoNumero: number;
        nuevoNumero = parseInt(numeroString);

Esto funciona si el string tiene solo y exclusivamente números que no empiecen con 0. De lo contrario, el resultado será de tipo NaN (Not a Number):

        //TypeScript
        let numeroPrueba: number = parseInt("palabra");
        console.log(numeroPrueba); //NaN


Los NaN se dan en runtime y por eso no pueden ser identificados por el motor de inferencia como una alerta, NaN pertenece al objeto Number y no es tomado como un error.


#### Binarios y Hexadecimales

TypeScript nos puede indicar error si intentamos definir números binarios que tengan números que no sean parte del sistema numérico:

        //**********TypeScript**********
        //Binarios: se definen colocando "0b" al inicio del valor
        let primerBinario = 0b1010; //CORRECTO
        let segundobinario = 0b1210; //INCORRECTO. El 2 es inválido

        //Hexadecimales: se definen colocando "0x" al inicio del valor
        let primerHexa = 0xfff; //CORRECTO
        let segundoHexa = 0xffz; //INCORRECTO. El "z" es inválido


En consola, si están correctamente asignados, se hará una conversión a decimal de dichos números:

        let primerHexa = 0xfff;
        console.log(primerHexa); // 4095

        let primerBinario = 0b1010;
        console.log(primerBinario); // 10

Nota: al indicar de manera explicita el tipo, debemos anotarlo en minúscula en este caso "number", ya que "Number" se refiere al object wrapper propio de JS.

        let myNumber: number = 20; // Buena practica.
        let otherNumber: Number = 20; // Mala practica.


### Booleans


        (()=>{
        let isNew = true
        isNew = false // ok
        //isNew = 'true' // error
        //isNew = 1 // error
        //isNew = null // error
        //isNew = undefined // error

        const random = Math.random()
        //isNew = random > 0.5 ? 'true' : 'false'
        isNew = random > 0.5 ? true : false
        let explicitBoolean: boolean = true

        })()


### Strings 


        (()=>{
        let productTitle = 'product'
        productTitle = '' // ok
        // productTitle = null // error
        // productTitle = undefined // error
        // productTitle = 123 // error


        let name = "I'm ivan" // ok
        let template = `this is a ${productTitle}` //ok
        let explicitString: string = 'test'
        })()


### Arrays

Utilizando el motor de inferencia de TS, el array se crea con un tipado segun los valores como lo inicializamos, si el array solo tiene valores numéricos, solo podremos hacer push del mismo tipo de datos o reasignarle un array vacio

        //implicit mode
        let foo =[1,2,3,4]
  
        foo.push(5) // ok
        foo = [] // ok
        foo.push('test') // error


        //explicit mode
        let foo: number[]


Si inicializamos el array con valores de diferentes tipos de datos, el motor de inferencia tomará estos tipos y excluira aquellos que no estén. Por ejemplo el array

        const foo = ['test', true]

Solo recibirá valores de tipo string y booleanos.

En caso que necesitemos mas tipos de datos que inicialmente no se encuentra en la inicializción, debemos definir el array con el tipado de manera explicita.


          let multi:(number | string | boolean)[] = ['test', true]


Otra de las ventajas de TS es que nos permite controlar las operaciones posibles de los valores del array en función del tipo de dato, por ejemplo si queremos recorrer un array para para hacer una operación matemática, todos los valores deberían ser de tipo number


         let numbers = [1,2,3]
        numbers.map((item) => item * 2) //ok

        let strings = ['test']
        numbers.map((item) => item * 2) //error

En caso de requerir objetos podemos indicarle el tipo object, que a su vez habilitará también los arrays

        let multi:(number | string | boolean | object)[] = [1,2,3, 'ivan', true, {}, []]


## Tipos de datos especiales

### any

any recibe cualquier tipo de dato

Retira el sistema de análisis de tipos a una variable en particular

Se aconseja no utilizar any, se considera una mala práctica

        let myDynamicVar: any;

        myDynamicVar = 100; // number
        myDynamicVar = null;
        myDynamicVar = {}; // Object
        myDynamicVar = ""; // string
        myDynamicVar = 123



**Nota:** La utilidad de any radica cuando se quiere migrar de a pocos a TypeScript desde JavaScript, ya que incrementalmente definiríamos el tipo de dato donde sea necesario sin romper nuestro programa de golpe.


También es posible hacer cast a las variables para acceder a los métodos específicos según el tipo de dato


        let toStringVar = (myDynamicVar as string).toLocaleLowerCase()
        console.log(typeof toStringVar)

        let toNumberVar = (<number>myDynamicVar).toFixed(1)
        console.log(typeof toNumberVar)

  ### union types

  La forma correcta de manejar la flexibilidad de manejo de tipos en TS es usando union types que permite definir más de un tipo de dato a una variable, argumento de una función, etc.

  No se usa la inferencia, sino que la definicion de los tipos debe hacerse de manera explicita


        (()=>{

        let dinamycVar: number | string = 'Ivan'

        function greeting (myText: number | string){
            if(typeof myText === 'string'){
                console.log('string', myText.toUpperCase())
            }
            else{
                console.log('number', myText.toFixed(1))
            }
        }

        greeting('ivan')
        greeting(434.3424)

        })()

### Alias y tipos literales

Los Alias nos permiten darle un nombre a uno o varios tipos de datos en conjunto. Un ejemplo de como se definen sería así:

    type UserID = string | boolean | number;
    let dynamicVar: UserID = "300";

    dynamicVar = true;
    dynamicVar = 200;

type es una palabra reservada de uso en TS, la utlizamos para crear nuestros propios tipos (type aliases)

Usamos PascalCase para definir el nombre de nuestros types



Ahora podemos re-utilizar nuestros tipos personalizados por medio de los alias

    type UserID = string | boolean | number;

    let dynamicVar: UserID = "300";

    function helloUser( userId: UserID ) {
        console.log(`Un saludo al usuario con el número de id ${userId}`);
    }


**Tipos Literales (Literal Types)**

Podemos definir de manera explícita y literal los posibles valores que puede tomar una variable. Por ejemplo:

    let shirtSize: "S" | "M" | "L" | "XL";

    shirtSize = "M"; //CORRECTO
    shirtSize = "S"; //CORRECTO
    shirtSize = "qwrty"; //ERROR. No está en las opciones.
    shirtSize = "SS"; //ERROR. Letra de más.
    shirtSize = "m"; //ERROR. Está en minúscula.


**Alias + Tipos Literales**

También podemos combinar el uso de literal types con aliases

    type Sizes = 'S' | 'M' | 'L' | 'XL';

    let shirtSize: Sizes;
    shirtSize = "M";

    function yourSize( userSize: Sizes ){
        console.log(`Tu medida es ${userSize}`);
    }

 