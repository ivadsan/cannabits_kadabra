[//]: # @param group $$ Desarrollo de software
[//]: # @param title $$ Principios SOLID y Clean Code
[//]: # @param author $$ Iván D. Sánchez

# Principios SOLID y Clean Code

## Clean code y deuda técnica

Esta sección procura que empecemos a escribir código que sea fácil de leer por nosotros y otros desarrolladores.

### ¿Qué es la deuda técnica?

Deuda técnica es la falta de calidad del código ya sea intencional o no intencional. No necesariamente debe ser código, también puede ser falta de documentación, pruebas o refactorización, al ser de una deuda esta debe pagarse después ya que repercutirá en costos futuros.

**Costos económicos**

- Tiempo en realizar mantenimientos
- Tiempo en refactorizar código
- Tiempo en comprender el código
- Tiempo adicional en la transferencia del código

**Esquema de deuda técnica de Martin Fowler**

- **Imprudente y deliberada:** El desarrollador actua consiente e imprudentemente, como resultado se crea un proyecto de mala calidad y poco tolerante al cambio . No hay tiempo, solo copia y pega eso de nuevo.

- **Inadvertido e imprudente:** Es las mas peligrosa, se genera por desconocimiento o falta de experiencia ( puede ser por un Junior o un falso Senior). ¿Que son patrones de diseño?

- **Prudente:** Somos consientes de ella, el peligro es no pagarla a tiempo. Tenemos que entregar rápido, ya refactorizaremos

- **Prudente e inadvertida:** Es común no tener el conocimiento total del proyecto al inicio, esta deuda se detecta cuando el proyecto comienza a madurar _"Ahora sabemos como lo deberíamos haber hecho"_

_"Caer en deuda técnica es normal y a menudo es inevitable"_

**¿Cómo se paga una deuda técnica"**

**Refactorización**

Es un proceso que tiene como objetivo mejorar el código sin alterar su comportamiento para ser mas entendible y tolerante a cambios.

Una refactorización fuerte requiere que el código tenga prueba automáticas, sin pruebas automáticas se cae en el _"si funciona, no lo toques"_

La deuda técnica siempre la termina pagando alguien, ya sea el cliente, un proveedor o el desarrolllador, mal gastando tiempo en un sistema frágil

### Clean Code

- Código limpio es aquel que se ha escrito con la intención de que otra persona o tu mismo en el futuro lo entienda

- Tiene que ser simple y directo

- El código limpio está orientadp a que sea facil de leer.

### Nombres pronuncialbles y expresivos

- Las variables deben ser en inglés y deben ser pronunciables

- Se recomienda continuar con las convenciones de los lenguajes, python usan snake case y js camel case, las interfaces son pascal case

- Intenta no ahorrar caracteres en nombres y estos deben ser expresivos

- Ausencia de información técnica en los nombres: no se recomienda algo como UserInterface, AbstractUser

- Algunas veces los comentarios para explicar variables indica que el código no es facil de leer

**Ejercicio**

```
    // Ejemplo
    // Archivos a evaluar - files to evaluate
    const filesToEvaluate = [
        { id: 1, flagged: false },
        { id: 2, flagged: false },
        { id: 3, flagged: true },
        { id: 4, flagged: false },
        { id: 5, flagged: false },
        { id: 7, flagged: true },
    ];

    // Archivos marcados para borrar - files to delete
    const filesToDelete = filesToEvaluate.map( file => file.flagged );

    // Mal
    class AbstractUser { };
    class UserMixin { };
    class UserImplementation { };
    interface IUser { };

    // Mejor
    class User { };
    interface User { };


    // Todo: Tarea

    // día de hoy - today
    const today = new Date();

    // días transcurridos - elapsed time in days
    const elapsedTimeInDays: number = 23;

    // número de archivos en un directorio - number of files in directory
    const numberOfFilesInDirectory = 33;

    // primer nombre - first name
    const firstName = 'Fernando';

    // primer apellido - last name
    const lastName = 'Herrera';

    // días desde la última modificación - days since modification
    const daysSinceModification = 12;

    // cantidad máxima de clases por estudiante - max classes per student
    const maxClassesPerStudent = 6;

```

### Nombres según el tipo de dato

**Arrays**

Al ser una colección de datos hay varias consideraciones

- el nombre no debería ser singular ejm: `const fruit = ['manzana', 'pera']`
- Aunque es una lista podriamos reducirlos a su nombre en plural

```
 const fruitList = ['manzana', 'pera']

 // Mejor

 const fruits = ['manzana', 'pera']

```

- Siempre será mejor informar sobre el contenido de los datos en este caso es mejor **_fruitNames_**, y **_fruits_** seria mejor para instancias de objetos

**Booleans**

Usualmente son dos posibles valores pero hay que considerar los valores **_undefined_** y **_null_**

Los prefijos **_is_**, **_can_**, **_has_**, **in** da mas sentido semántico a la variable

Siempre deber ser positivo y se debe evitar las negaciones en el nombre

![](/notes/clean_code_solid/assets/booleans.png)

**Numbers**

Se recomienda el uso de los prefijos **_min_**, **_max_**, **_total_** para especificar la función o caracteristica del valor numérico

**Functions**

El nombre de las funciones deben representar acciones, se componen del verbo de la acción seguido de un sustantivo

Los nombres deben ser descriptivos y concisos (debe expresar lo que hace) pero debe abstenerse de toda la implementación de la función

![](/notes/clean_code_solid/assets/functions.png)

```
(() => {

    // arreglo de temperaturas celsius
    const temperaturesCelsius = [33.6, 12.34];

    // Dirección ip del servidor
    const serverIp = '123.123.123.123';

    // Listado de usuarios
    const users = [{id: 1, email: 'fernando@google.com'},{ id: 2, email: 'juan@google.com' }, { id: 3, email: 'melissa@google.com' }];

    // Listado de emails de los usuarios
    const userEmails = users.map( user => user.email );

    // Variables booleanas de un video juego
    const canJump = false;
    const canRun = true;
    const hasItems = true;
    const isLoading = false;

    // Otros ejercicios
    // tiempo inicial
    const startTime = new Date().getTime();
    //....
    // 3 doritos después
    //...
    // Tiempo al final
    const endTime = new Date().getTime() - startTime;


    // Funciones
    // Obtiene los libros
    function getBooks() {
        throw new Error('Function not implemented.');
    }

    // obtiene libros desde un URL
    function getBooksByUrl( url: string) {
        throw new Error('Function not implemented.');
    }

    // obtiene el área de un cuadrado basado en sus lados
    function getSquareArea( side: number ) {
        throw new Error('Function not implemented.');
    }

    // imprime el trabajo
    function printJob() {
        throw new Error('Function not implemented.');
    }

})();

```

**_Poner un comentario para que una variable tenga sentido no debería ser la norma sino la excepción._**

### Clases

- Las clases deben tener nombres de sustantivo o frases de sustantivo
- Evitar nombres genéricos
- El nombre de la clase es lo mas importante de la misma
- Deben ser PascalCase

**Recomendaciones para elegir el nombre de una clase**

¿Que hace exactamente la clase?

¿Cómo exactamente esta clase realiza cierta tarea?

¿Hay algo específico sobre su ubicación?

**_Si algo no tiene sentido remuevelo o refactoriza_**

### Interfaces

- Las interfaces se nombran usando pascal case
- Se recomienda que los atributos de la interfaz esten ordenados ascendentemente

### Funciones

- Sabemos que hacemos clean code cuando las funciones hacen exactamente lo que su nombre indica

- Se recomienda limitar los parámetros posicionales de una función a 3

**Parámetros:** cuando estamos declarando la función

**Argumentos:** Cuando estamos usando la función

```
(() => {
// interface Email {
// subject: string,
// name?: string,
// date: Date,
// priority: number
// }

// const sendEmail = ({subject, date, priority}:Email)=>{
// console.log(subject, date, priority)
// }
// sendEmail({subject: 'test', date: new Date(), priority: 3})

// función para obtener información de una película por Id
function getMovieById(movieId: string) {
console.log({ movieId });
}

// función para obtener información de los actores de una película - Actors o Cast // id = movieId getMovieCast
function getAllMovieActors(movieId: string) {
console.log({ movieId });
}

// funcion para obtener el bio del actor por el id
function getActorBioById(actorId: string) {
console.log({ actorId });
}

// Crear una película

interface Movie {
cast: string[];
description: string;
rating: number;
title: string;
}

function createMovie({ title, description, rating, cast }: Movie) {
console.log({ title, description, rating, cast });
}

// Crea un nuevo actor
interface Actor {
fullName: string,
birthdate?: Date
}

function createActor({fullName, birthdate}: Actor): boolean {
// tarea asincrona para verificar nombre
// ..
// ..
if (fullName === "fernando") return false;

    console.log("Crear actor", birthdate);
    return true;

}

// por principio de responsabilidad unica la anterior funcion debería separa la tarea asincrona para la verificacion del nombre
// También se podría validar desde el backend y evitarnos la función

})();
```

- Se prioriza que la simplicidad de la función es lo fundamental
- Funciones de tamaño reducido, cuando una funcion tiene muchas lineas de codigo probablemente hace mas de lo que debería de hacer
- Funciones de una sola línea sin causar una complejidad innecesaria
- Funciones de menos de 20 líneas de código, es posible delegar responsabilidades a otras funciones para reducir la cantidad de lineas
- Evita el uso del else
- Priorizar el uso de la condicional ternaria
- Evitar muchas identaciones

```
// Before
const getPayAmount = ({ isDead = false, isSeparated = true, isRetired = false }) => {
  let result;
  if ( isDead ) {
    result = 1500;
  } else {
    if ( isSeparated ) {
      result = 2500;
    } else {
      if ( isRetired ) {
        result = 3000;
      } else {
        result = 4000;
      }
    }
  }
  return result;
}

// After

const getPayAmount = ({ isDead = false, isSeparated = true, isRetired = false }) => {
  if (isDead) return 1500;
  if (isSeparated) return 2500;
  return isRetired ? 3000 : 4000;
};

```

### Homework

**Before**

```
(() => {


    // Resolver sin la triple condicional dentro del if
    // includes? arrays?
    function isRedFruit( fruit: string ): boolean {

        if ( fruit === 'manzana' || fruit === 'cereza' || fruit === 'ciruela' ) {
            return true;
        } else {
            return false;
        }
    }

    // Simplificar esta función
    // switch? Object literal? validar posibles colores
    function getFruitsByColor( color: string ): string[] {

        if ( color === 'red' ) {
            return ['manzana','fresa'];
        } else if ( color === 'yellow') {
            return ['piña','banana'];
        } else if ( color === 'purple') {
            return ['moras','uvas']
        } else {
            throw Error('the color must be: red, yellow, purple');
        }
    }

    // Simplificar esta función
    let isFirstStepWorking  = true;
    let isSecondStepWorking = true;
    let isThirdStepWorking  = true;
    let isFourthStepWorking = true;

    function workingSteps() {
        if( isFirstStepWorking === true ) {
            if( isSecondStepWorking === true ) {
                if( isThirdStepWorking === true ) {
                    if( isFourthStepWorking === true ) {
                        return 'Working properly!';
                    }
                    else {
                        return 'Fourth step broken.';
                    }
                }
                else {
                    return 'Third step broken.';
                }
            }
            else {
                return 'Second step broken.';
            }
        }
        else {
            return 'First step broken.';
        }
    }


    // isRedFruit
    console.log({ isRedFruit: isRedFruit('cereza'), fruit: 'cereza' }); // true
    console.log({ isRedFruit: isRedFruit('piña'), fruit: 'piña' }); // true

    //getFruitsByColor
    console.log({ redFruits: getFruitsByColor('red') }); // ['manzana', 'fresa']
    console.log({ yellowFruits: getFruitsByColor('yellow') }); // ['piña', 'banana']
    console.log({ purpleFruits: getFruitsByColor('purple') }); // ['moras', 'uvas']
    // console.log({ pinkFruits: getFruitsByColor('pink') }); // Error: the color must be: red, yellow, purple

    // workingSteps
    console.log({ workingSteps: workingSteps() }); // Cambiar los valores de la línea 31 y esperar los resultados


})();

```

**After**

```
(() => {
  // Resolver sin la triple condicional dentro del if
  // includes? arrays?
  function isRedFruit(fruit: string): boolean {
    return ["manzana", "cereza", "ciruela"].includes(fruit);
  }

  // Simplificar esta función
  // switch? Object literal? validar posibles colores

  type FruitColor = "red" | "yellow" | "purple";

  function getFruitsByColor(color: FruitColor): string[] {
    /**
     * Solución 1
     * Aunque es un refactor mas reducido del código anterior
     * no es muy óptimo ya que en el caso de "purple" debe entrar a
     * todas las validaciones anteriores
     */

    // if (color === "red") return ["manzana", "fresa"];
    // if (color === "yellow") return ["piña", "banana"];
    // if (color === "purple") return ["moras", "uvas"];
    // throw Error("the color must be: red, yellow, purple");

    /**
     * Solución 2
     * Mejora la optimización ya que al usar case el argumento va directo al caso
     * Puede ser un poco complicado su lectura
     */

    // switch (color) {
    //   case "red":
    //     return ["manzana", "fresa"];
    //   case "yellow":
    //     return ["piña", "banana"];
    //   case "purple":
    //     return ["moras", "uvas"];
    //   default:
    //     throw Error("the color must be: red, yellow, purple");
    // }

    /**
     * Solución 3
     * Aplicando string literal types de TS podemos reducir el error desde el código estático
     * Mejor lectura del código
     * Aunque el uso de una constante hace que haya una reserva de espacio en memoria diferente al uso de switch
     * Una línea de código no debería pasar de los 80 caracteres, en ese caso se agrega un espacio
     */

    const fruitsByColor = {
      red: ["manzana", "fresa"],
      yellow: ["piña", "banana"],
      purple: ["moras", "uvas"],
    };

    if (!Object.keys(fruitsByColor).includes(color)) {
      throw Error("the color must be: red, yellow, purple");
    }

    return fruitsByColor[color];
  }

  // Simplificar esta función
  let isFirstStepWorking = true;
  let isSecondStepWorking = true;
  let isThirdStepWorking = true;
  let isFourthStepWorking = true;

  function workingSteps() {
    if (!isFirstStepWorking) return "First step broken.";
    if (!isSecondStepWorking) return "Second step broken.";
    if (!isThirdStepWorking) return "Third step broken.";
    if (!isFourthStepWorking) return "Fourth step broken.";
    return "Working properly!";
  }

  // isRedFruit
  console.log({ isRedFruit: isRedFruit("cereza"), fruit: "cereza" }); // true
  console.log({ isRedFruit: isRedFruit("piña"), fruit: "piña" }); // true

  //getFruitsByColor
  console.log({ redFruits: getFruitsByColor("red") }); // ['manzana', 'fresa']
  console.log({ yellowFruits: getFruitsByColor("yellow") }); // ['piña', 'banana']
  console.log({ purpleFruits: getFruitsByColor("purple") }); // ['moras', 'uvas']
  // console.log({ pinkFruits: getFruitsByColor("pink") }); // Error: the color must be: red, yellow, purple

  // workingSteps
  console.log({ workingSteps: workingSteps() }); // Cambiar los valores de la línea 31 y esperar los resultados
})();

```

### Principio DRY (Don't Repeat Yourself)

- Evitar tener duplicidad en nuestro código
- Simplifica las pruebas
- Mas facil es el mantenimiento
- Ayuda a centralizar procesos
- Aplicar el principio DRY, lleva a refactorizar
- La acción de copiar y pegar código en el mismo proyecto indica que debemos aplicar el principio DRY

**Sin DRY**
Por cada nuevo atributo de la clase el método to string repite código en cada validación

```
type Size = "" | "S" | "M" | "XL";
class Product {
  constructor(
    public name: string = "",
    public price: number = 0,
    public size: Size = ""
  ) {}

  toString() {
    if (this.name.length <= 0) throw new Error("name is empty");
    if (this.price <= 0) throw new Error("price is empty");
    if (this.size.length <= 0) throw new Error("size is empty");
    return `${this.name} ($${this.price}), ${this.size}`;
  }
}

(() => {
  const bluePants = new Product("Blue pants", 10, "XL");
  console.log(bluePants.toString());
})();

```

**Con Dry**

```
type Size = "" | "S" | "M" | "XL";
class Product {
  constructor(
    public name: string = "",
    public price: number = 0,
    public size: Size = ""
  ) {}

  isProductReady(): boolean {
    for (const key in this) {
      switch (typeof this[key]) {
        case "string":
          if ((<string>(<unknown>this[key])).length <= 0)
            throw new Error(`${key} is empty`);
          break;
        case "number":
          if (<number>(<unknown>this[key]) <= 0)
            throw new Error(`${key} is zero`);
          break;
        default:
          throw new Error("Type not support");
      }
    }
    return true;
  }

  toString() {
    if (!this.isProductReady()) return;
    return `${this.name} ($${this.price}), ${this.size}`;
  }
}

(() => {
  const bluePants = new Product("Blue pants", 1, "S");
  console.log(bluePants.toString());
})();

```

## Clases y comentarios

Las clases deben tener una responsabilidad especifica y no deben tener nombres genéricos ya que van a heredar bastante carga de manera involuntaria, demasiadas responsabilidades, por ende va a acumular deuda técnica ya que se vuelve dificil de mantener, de testear, de expandir etc.

Priorizar la composición frente a la herencia
