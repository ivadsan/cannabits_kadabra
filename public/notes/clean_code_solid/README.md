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

La deuda técnica siempre la termina pagando alguien, ya sea el cliente, un proveedor o el desarrollador, mal gastando tiempo en un sistema frágil

### Clean Code

- Código limpio es aquel que se ha escrito con la intención de que otra persona o tu mismo en el futuro lo entienda

- Tiene que ser simple y directo

- El código limpio está orientado a que sea facil de leer.

### Nombres pronunciables y expresivos

- Las variables deben ser en inglés y deben ser pronunciables

- Se recomienda continuar con las convenciones de los lenguajes, python usan snake case y js camel case, las interfaces son pascal case

- Intenta no ahorrar caracteres en nombres, estos deben ser expresivos

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
    console.log({ isRedFruit: isRedFruit('piña'), fruit: 'piña' }); // false

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

### Herencia problemática

El no aplicar el principio de responsabilidad única en clases y el uso de herencias complejiza el instancimiento de una clase hijo ya que acumula la cantidad de atributos requeridos para la creación de una instancia

```
(() => {

    // No aplicando el principio de responsabilidad única

    type Gender = 'M'|'F';

    class Person {
        constructor(
            public name: string,
            public gender: Gender,
            public birthdate: Date
        ){}
    }


    class User extends Person {

        public lastAccess: Date;

        constructor(
            public email: string,
            public role: string,
            name: string,
            gender: Gender,
            birthdate: Date,
        ) {
            super( name, gender, birthdate );
            this.lastAccess = new Date();
        }

        checkCredentials() {
            return true;
        }
    }


    class UserSettings extends User {
        constructor(
            public workingDirectory: string,
            public lastOpenFolder  : string,
            email                  : string,
            role                   : string,
            name                   : string,
            gender                 : Gender,
            birthdate              : Date
        ) {
            super(email, role, name, gender, birthdate );
        }
    }


    const userSettings = new UserSettings(
        '/usr/home',
        '/home',
        'fernando@google.com',
        'Admin',
        'Fernando',
        'M',
        new Date('1985-10-21')
    );

    console.log({ userSettings });


})();
```

### Objetos como propiedades

Evitar enviar las propiedades de la clase de manera posicional al constructor

```
(() => {

    // No aplicando el principio de responsabilidad única

    type Gender = 'M'|'F';

    interface PersonProps {
        birthdate : Date;
        gender    : Gender;
        name      : string;
    }

    class Person {
        public birthdate: Date;
        public gender   : Gender;
        public name     : string;

        constructor({ name, gender, birthdate }: PersonProps ){
            this.name      = name;
            this.gender    = gender;
            this.birthdate = birthdate;
        }
    }


    interface UserProps {
        birthdate : Date;
        email     : string;
        gender    : Gender;
        name      : string;
        role      : string;
    }

    class User extends Person {

        public email: string;
        public role : string;
        public lastAccess: Date;

        constructor({
            birthdate,
            email,
            gender,
            name,
            role,
        }: UserProps ) {
            super({ name, gender, birthdate });
            this.lastAccess = new Date();
            this.email = email;
            this.role  = role;
        }

        checkCredentials() {
            return true;
        }
    }


    interface UserSettingsProps {
        birthdate        : Date;
        email            : string;
        gender           : Gender;
        lastOpenFolder   : string;
        name             : string;
        role             : string;
        workingDirectory : string;
    }

    class UserSettings extends User {

        public workingDirectory: string;
        public lastOpenFolder  : string;

        constructor({
            workingDirectory,
            lastOpenFolder,
            email,
            role,
            name,
            gender,
            birthdate,
        }: UserSettingsProps ) {
            super({ email, role, name, gender, birthdate });
            this.workingDirectory = workingDirectory;
            this.lastOpenFolder   = lastOpenFolder;
        }
    }


    const userSettings = new UserSettings({
        birthdate: new Date('1985-10-21'),
        email: 'fernando@google.com',
        gender: 'M',
        lastOpenFolder: '/home',
        name: 'Fernando',
        role: 'Admin',
        workingDirectory: '/usr/home',
    });

    console.log({ userSettings });


})();
```

### Principio de responsabilidad única

Tratar de evitar los extends
Priorizar la composición frente a la herencia

```
(() => {
  // Aplicando el principio de responsabilidad única

  type Gender = "M" | "F";

  interface PersonProps {
    birthdate: Date;
    gender: Gender;
    name: string;
  }

  class Person {
    public birthdate: Date;
    public gender: Gender;
    public name: string;

    constructor({ name, gender, birthdate }: PersonProps) {
      this.name = name;
      this.gender = gender;
      this.birthdate = birthdate;
    }
  }

  interface UserProps {
    email: string;
    role: string;
  }

  class User {
    public email: string;
    public role: string;
    public lastAccess: Date;

    constructor({ email, role }: UserProps) {
      this.lastAccess = new Date();
      this.email = email;
      this.role = role;
    }

    checkCredentials() {
      return true;
    }
  }

  interface SettingsProps {
    lastOpenFolder: string;
    workingDirectory: string;
  }

  class Settings {
    public workingDirectory: string;
    public lastOpenFolder: string;

    constructor({ workingDirectory, lastOpenFolder }: SettingsProps) {
      this.workingDirectory = workingDirectory;
      this.lastOpenFolder = lastOpenFolder;
    }
  }

  interface UserSettingsProps {
    birthdate: Date;
    email: string;
    gender: Gender;
    lastOpenFolder: string;
    name: string;
    role: string;
    workingDirectory: string;
  }

  class UserSettings {
    public person: Person;
    public user: User;
    public settings: Settings;

    constructor({
      birthdate,
      email,
      gender,
      lastOpenFolder,
      name,
      role,
      workingDirectory,
    }: UserSettingsProps) {
      this.person = new Person({ birthdate, name, gender });
      this.user = new User({ email, role });
      this.settings = new Settings({ lastOpenFolder, workingDirectory });
    }
  }

  const userSettings = new UserSettings({
    birthdate: new Date("1985-10-21"),
    email: "fernando@google.com",
    gender: "M",
    lastOpenFolder: "/home",
    name: "Fernando",
    role: "Admin",
    workingDirectory: "/usr/home",
  });

  console.log({ userSettings });
})();
```

```(() => {
  //* Aplicar el principio de responsabilidad única
  //* Priorizar la composición frente a la herencia

  type HtmlType = "input" | "select" | "textarea" | "radio";

  class HtmlElement {
    constructor(public id: string, public type: HtmlType) {}
  }

  class InputAttributes {
    constructor(public value: string, public placeholder: string) {}
  }

  class InputEvents {
    constructor() {}

    setFocus() {}
    getValue() {}
    isActive() {}
    removeValue() {}
  }

  //? Idea para la nueva clase InputElement

  class InputElement {
    public html: HtmlElement;
    public attributes: InputAttributes;
    public events: InputEvents;
    constructor(value: string, placeholder: string, id: string) {
      this.html = new HtmlElement(id, "input");
      this.attributes = new InputAttributes(value, placeholder);
      this.events = new InputEvents();
    }
  }

  const nameField = new InputElement("Fernando", "Enter first name", "txtName");

  console.log({ nameField });
})();
```

### Estructura recomendada de una clase

![](/notes/clean_code_solid/assets/classes.png)

1.  Comenzar lista de propiedades

- Propiedades estáticas
- Propiedades públicas de últimas

2. Métodos

- Empezando por los constructores estáticos
- Luego el constructor
- Métodos estáticos
- Seguido métodos privados
- Demas métodos ordenados en orden de mayor a menor importancia
- Getters y Setters al final

### Comentario en el código

Si hay comentarios en el código es porque no suficientemente auto-explicativo

Se deben evitar los comentarios, sin embargo al usar librerias de terceros , APIs o Frameworks los comentarios pueden ser utiles.

Para evitar comentarios es necesario refactorizar, hacer uso de nombres de variables, funciones y clases que describan lo que hacen.

"no comentes el código mal escrito, reescribelo"

Los comentarios deberían indicar: el porqué en lugar del qué o del cómo, estos dos ultimos deberian explicarse automáticamente con el código

### Uniformidad en el proyecto

problemas similares, soluciones similares

- Conservar la sintaxis y estructura de las funciones controladoras o métodos de una clase
- Mantener la uniformidad del scafolding a lo largo del proyecto
- Identación

## Acrónimo STUPID

Es todo lo que no se debería hacer, hay antipatrones y CodeSmells

### CodeSmells - STUPID

S -> Singleton: patrón singleton

T -> Tight Coupling: Alto acomplamiento

U -> Untestability: Código no probable (Unit Test)

P -> Premature Optimization: Optimizaciones prematuras

I -> Indescriptive Naming: Nombres pocos descriptivos

D -> Duplication: Duplicidad de código, no aplicación del principio DRY

#### Singleton

Son dificiles de probar, es dificil rastrear de donde vienen los cambios estando en un ambito global puede ser afectado desde diferentes partes de la aplicación

```
const Singleton = (function () {
  let instance;

  function createInstance() {
    return new Object("I am the instance");
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

function main() {
  const instance1 = Singleton.getInstance();
  const instance2 = Singleton.getInstance();

  console.log("Misma instancia? ", instance1 === instance2);
}

main();

```

#### Acoplamiento y cohesión

Lo ideal es tener bajo acoplamiento y alta cohesión

**Acoplamiento**

El acomplamiento se refiere a cuán relacionadas estas dos clases o módulos entre sí

Bajo acomplamiento significa que cambiar algo importante en una clase no debería afectar a la otra

Alto acomplamiento significa que es dificil cambiar algo, el mantenimiento es complejo dado a que estas muy unidas las clases.

**Cohesión**

La cohesion se refiere a lo que una clase o módulo debe hacer

una baja cohesion significa que la clase no se enfoca en lo que debe hacer y hace mas acciones de lo que debería

una alta cohesión significa que la clase se enfoca en lo que debe hacer y sus métodos estan relacionados con la intención de la clase

**Ejemplo de alto acoplamiento**

```
(() => {
  // No aplicando el principio de responsabilidad única
  type Gender = "M" | "F";

  // Alto Acoplamiento

  class Person {
    constructor(
      public firstName: string,
      public lastName: string,
      public gender: Gender,
      public birthdate: Date
    ) {}
  }

  class User extends Person {
    constructor(
      public email: string,
      public role: string,
      private lastAccess: Date,
      firstName: string,
      lastName: string,
      gender: Gender,
      birthdate: Date
    ) {
      super(firstName, lastName, gender, birthdate);
      this.lastAccess = new Date();
    }

    checkCredentials() {
      return true;
    }
  }

  class UserSettings extends User {
    constructor(
      public workingDirectory: string,
      public lastFolderOpen: string,
      email: string,
      role: string,
      firstName: string,
      lastName: string,
      gender: Gender,
      birthdate: Date
    ) {
      super(email, role, new Date(), firstName, lastName, gender, birthdate);
    }
  }

  const userSettings = new UserSettings(
    "/urs/home",
    "/development",
    "fernando@google.com",
    "F",
    "Fernando",
    "Herrera",
    "M",
    new Date("1985-10-21")
  );

  console.log({ userSettings, credentials: userSettings.checkCredentials() });
})();

```

**Ejemplo bajo acomplamiento**

```
(() => {
  // Aplicando el principio de responsabilidad única
  // Prioriza la composición frente a la herencia

  type Gender = "M" | "F";

  interface PersonProps {
    firstName: string;
    lastName: string;
    gender: Gender;
    birthdate: Date;
  }

  class Person {
    public firstName: string;
    public lastName: string;
    public gender: Gender;
    public birthdate: Date;

    constructor({ firstName, lastName, gender, birthdate }: PersonProps) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.gender = gender;
      this.birthdate = birthdate;
    }
  }

  interface UserProps {
    email: string;
    role: string;
  }
  class User {
    public email: string;
    public role: string;
    private lastAccess: Date;

    constructor({ email, role }: UserProps) {
      this.lastAccess = new Date();
      this.email = email;
      this.role = role;
    }

    checkCredentials() {
      return true;
    }
  }

  interface SettingsProps {
    lastFolderOpen: string;
    workingDirectory: string;
  }

  class Settings {
    public workingDirectory: string;
    public lastFolderOpen: string;

    constructor({ workingDirectory, lastFolderOpen }: SettingsProps) {
      this.workingDirectory = workingDirectory;
      this.lastFolderOpen = lastFolderOpen;
    }
  }

  // Nuevo User Settings
  interface UserSettingsProps {
    birthdate: Date;
    email: string;
    gender: Gender;
    lastFolderOpen: string;
    firstName: string;
    lastName: string;
    role: string;
    workingDirectory: string;
  }

  class UserSettings {
    // constructor(
    //     public person: Person,
    //     public user  : User,
    //     public settings: Settings,
    // ){}
    public person: Person;
    public user: User;
    public settings: Settings;

    constructor({
      firstName,
      lastName,
      gender,
      birthdate,
      email,
      role,
      workingDirectory,
      lastFolderOpen,
    }: UserSettingsProps) {
      this.person = new Person({ firstName, lastName, gender, birthdate });
      this.user = new User({ email, role });
      this.settings = new Settings({ workingDirectory, lastFolderOpen });
    }
  }

  const userSettings = new UserSettings({
    birthdate: new Date("1985-10-21"),
    email: "fernando@google.com",
    gender: "M",
    lastFolderOpen: "/home",
    firstName: "Fernando",
    lastName: "Herrera",
    role: "Admin",
    workingDirectory: "/usr/home",
  });

  console.log({
    userSettings,
    credentials: userSettings.user.checkCredentials(),
  });
})();

```

#### Código no probable

Código dificilmente testeable

- Código con alto acoplamiento
- Código con muchas dependencias no inyectadas:

_La inyección de dependencias deriva del principio de inversión de dependencias en donde la entidad depende de una abstracción y no de una implementación concreta_

- Dependencias en el contexto global (tipo singleton)

Debemos tener en mente las pruebas desde la creación del código

#### Optimizaciones prematuras

Mantener abiertas las opciones retrasando la toma de decisiones, nos permite darle mayor relevancia a lo que es mas importante a una aplicación.

No debemos anticiparnos a los requisitos y desarrollar abstracciones innecesarias que puedan añadir complejidad accidental.

Complejidad Accidental: Cuando implementamos una solución compleja a la mínima indispensable.

Complejidad esencial: la complejidad es inherente al problema

Tiene que haber un balance entre los dos tipos de complejidad

#### Nombres pocos descriptivos

- Nombres de variables mal nombradas
- Nombres de clases genéricas
- Nombres de funciones mal nombradas
- Ser muy específico (puede resultar en nombres muy largos) o ser muy genérico (la clase o función puede terminar haciendo muchas cosas)

#### Duplicidad de código

Duplicidad Real:

- Código es identico y cumple la misma función
- Un cambio implicaría cambiar todo el código idéntico en varios lugares
- Incrementa las posibilidades de error humano al olvidar una parte para actualizar.
- Mayor cantidad de pruebas innecesarias.

Duplicidad Accidental:

- Código luce similar pero cumple funciones distintas
- Cuando hay un cambio, solo hay que modificar en un solo lugar
- Este tipo de duplicidad se puede trabajar con parámetros u optimizaciones

### Otros code smells

#### Inflación

**Métodos muy extensos**

Se refiera a cuando un método crece mucho (mas de 10 lineas), esto se puede solucionar fragmentando el método en varios submétodos y luego llamándolos desde uno solo. En consecuencia esto puede traer algunos problemas de rendimiento pero el impacto es insignificante

**Clases super grandes**

A lo largo del tiempo se le van sumando acciones a la clase lo que hace que crezca

Cuando una clase hace muchas cosas se recomienda separarla en pequeñas subclases o módulos los cuales separen las tareas de la clases grandes, esto nos ayuda a mejorar su mantenimiento, reutilizacion y son mas faciles de probar.

**Obseción primitiva**

La obseción primitiva radica en el uso de tipos de datos primitivos para representar entidades mas complejas.

Por ejemplo:

- Usar una cadena para representar una fecha o hora.

```
const date = "2023-08-23T12:00:00";
```

Este código usa una cadena para representar una fecha y hora. Esto es problemático porque las cadenas no tienen ningún significado semántico. Por ejemplo, no es posible realizar operaciones matemáticas con una cadena.

Una forma de resolver este problema es usar una clase o estructura para representar una fecha y hora. Por ejemplo, la siguiente clase representa una fecha y hora en formato ISO 8601:

```
class Date {
  constructor(year, month, day, hour, minute, second) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }

  toString() {
    return `${this.year}-${this.month}-${this.day}T${this.hour}:${this.minute}:${this.second}`;
  }
}
```

Podemos usar esta clase para representar la fecha y hora anterior de la siguiente manera:

```
const date = new Date(2023, 8, 23, 12, 0, 0);

```

Esta versión del código es más clara y eficiente que la versión original. También es más fácil de entender y mantener, ya que la clase Date proporciona una estructura clara para representar la fecha y hora.

- Usar un número de coma flotante para representar una moneda.

```
const price = 100.00;
```

Una forma de resolver este problema es usar un objeto para representar una moneda. Por ejemplo, el siguiente objeto representa una moneda:

```
const price = {
  amount: 100,
  currency: "USD",
};
```

Algunos consejos para evitar la obsesión primitiva:

- Piense en los datos que está tratando de representar. ¿Son datos simples o complejos?
- Si los datos son complejos, considere crear una clase o estructura para representarlos.
- Separar estos modelos de datos agrupados en clases, objetos o módulos y permitir una reutilizacion de los mismos.

**Lista larga de parámetros**

Sintomas: Mas de 3 o 4 argumentos en un método.

Las listas largas de argumentos suelen aparecer por tratar de hacer que métodos con multiples algoritmos se ejecuten segun los parámetros.

Se recomienda

- Un objeto como único argumento
- Verificar si los argumentos son realmente requeridos

### Acopladores

Acomplamiento excesivo o si el acomplamiento se reemplaza por una delegación excesiva

**Feature Envy**

Un objeto accede a los datos de otro objeto mas que a sus propios datos

Puede suceder luego de una refactorizacion no exitosa donde se mueven los atributos o métodos de una clase a otra.

**Intimidad inapropiada**

Una clase usa campos y metodos internos de otra clase.

Las buenas clases deben saber lo menos posible de otras clases

**Cadena de mensajes**

Radica cuando una función, clase o módulo requiere algo de otra a travéz de una cadena de comunicación sucesiva entre funciones, clases o módulos.

Tratar de romper la cadena y buscar una alternativa para comunicarse directamente entre funciones,clases o módulos

**The middle man**

Sucede cuando una clase intermedia solo tiene como funcion delegar el trabajo a otra clase, esto puede suceder como producto de una refactorizacion para evitar las cadenas de mensaje.

## Principios SOLID

Los principios de SOLID indican como organizar nuestras funciones y estructuras de datos en componentes y como dichos componentes deben estar interconectados.

Son principios y no reglas: son recomendaciones para escribir mejor código

Los 5 principios S.O.L.I.D. de diseño de software son:

S – Single Responsibility Principle (SRP)

O – Open/Closed Principle (OCP)

L – Liskov Substitution Principle (LSP)

I – Interface Segregation Principle (ISP)

D – Dependency Inversion Principle (DIP)

### Single Responsibility Principle (SRP)

Una clase o módulo debe tener una única responsabilidad, mas de una responsabilidad hace que el código sea menos flexible, mas dificil de mantener, mas rigido y menos tolerante al cambio.

#### Detectar incumplimiento de SRP

- Nombres de clases y módulos demasiados genéricos. (Clase llamada Repository, Service)
- Cambios en el código que suelen afectar a la clase o módulo
- La clase involucra múltiples capas (Hace muchas interacciones con diferentes capas de la aplicación desde la misma clase o módulo)
- Número elevado de importaciones
- Cantidad elevada de métodos públicos (Relativo)
- Excesivo número de líneas de código (Relativo)

**Before**

```
(() => {

    interface Product {
        id:   number;
        name: string;
    }

    // Usualmente, esto es una clase para controlar la vista que es desplegada al usuario
    // Recuerden que podemos tener muchas vistas que realicen este mismo trabajo.
    class ProductBloc {

        loadProduct( id: number ) {
            // Realiza un proceso para obtener el producto y retornarlo
            console.log('Producto: ',{ id, name: 'OLED Tv' });
        }

        saveProduct( product: Product ) {
            // Realiza una petición para salvar en base de datos
            console.log('Guardando en base de datos', product );
        }

        notifyClients() {
            console.log('Enviando correo a los clientes');
        }

        onAddToCart( productId: number ) {
            // Agregar al carrito de compras
            console.log('Agregando al carrito ', productId );
        }

    }



    const productBloc = new ProductBloc();

    productBloc.loadProduct(10);
    productBloc.saveProduct({ id: 10, name: 'OLED TV' });
    productBloc.notifyClients();
    productBloc.onAddToCart(10);


})();
```

**After**

```
(() => {
  interface Product {
    id: number;
    name: string;
  }

  class ProductService {
    getProduct(id: number) {
      console.log("Producto: ", { id, name: "OLED Tv" });
    }
    saveProduct(product: Product) {
      console.log("Guardando en base de datos", product);
    }
  }

  class Mailer {
    sendEmail(emailList: string[], template: "to-clients" | "to-admins") {
      console.log("Enviando correo a los clientes", template);
    }
  }

  // Usualmente, esto es una clase para controlar la vista que es desplegada al usuario
  // Recuerden que podemos tener muchas vistas que realicen este mismo trabajo.
  class ProductBloc {
    private productService: ProductService;
    private mailer: Mailer;

    constructor(productService: ProductService, mailer: Mailer) {
      this.productService = productService;
      this.mailer = mailer;
    }

    loadProduct(id: number) {
      // Realiza un proceso para obtener el producto y retornarlo
      productService.getProduct(id);
    }

    saveProduct(product: Product) {
      // Realiza una petición para salvar en base de datos
      productService.saveProduct(product);
    }

    notifyClients() {
      mailer.sendEmail(["ivan@google.com"], "to-clients");
    }
  }

  class CartBloc {
    addToCart(productId: number) {
      console.log("Agregando al carrito ", productId);
    }
  }

  const productService = new ProductService();
  const mailer = new Mailer();

  const productBloc = new ProductBloc(productService, mailer);
  const cartBloc = new CartBloc();

  productBloc.loadProduct(10);
  productBloc.saveProduct({ id: 10, name: "OLED TV" });
  productBloc.notifyClients();
  cartBloc.addToCart(10);
})();

```

### Open/Closed Principle (OCP)

Es un principio que depende del contexto (Manera en las que estemos corriendo nuestra aplicación, diferentes frameworks, ambientes)

Establece que las entidades de software (clases, módulos, métodos, etc) deben estar abiertas para la extensión y cerradas para la modificación.

Las clases, métodos y funciones debe desarrollarse para poder escalar sobre su misma responsabilidad sin tener que hacerle cambios a su estructura.

Cuando se tenga una alta dependencia de terceros se recomienda crear una dependencia apdatadora (patrón adpatador), que permita mas facilmente modificar, mejorar o mantener esta dependencia.

**Ejemplo**

**a**

```
import { PhotosService, PostService, TodoService } from "./02-open-close-b";

(async () => {
  const todoService = new TodoService();
  const postService = new PostService();
  const photosService = new PhotosService();

  const todos = await todoService.getTodoItems();
  const posts = await postService.getPosts();
  const photos = await photosService.getPhotos();

  console.log({ todos, posts, photos });
})();

```

**b**

````
// Hay que agregar la dependencia de axios ```yarn add axios```
import axios from "axios";

export class TodoService {
  async getTodoItems() {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/"
    );
    return data;
  }
}

export class PostService {
  async getPosts() {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return data;
  }
}

export class PhotosService {
  async getPhotos() {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos"
    );
    return data;
  }
}

````

El anterior ejemplo muesta que hay una alta dependendecia con axios, Empezamos por dasacoplar el llamadaro directo a Axios por parte de las clases

**c**

```
import axios from "axios";

export class HttpClient {
  async get(url: string) {
    const { data, status } = await axios.get(url);
    console.log(status);
    return { data, status };
  }
}

```

**b**

````
// Hay que agregar la dependencia de axios ```yarn add axios```
// import axios from "axios";
import { HttpClient } from "./02-open-close-c";

export class TodoService {
  constructor(private http: HttpClient) {}

  async getTodoItems() {
    const { data } = await this.http.get(
      "https://jsonplaceholder.typicode.com/todos/"
    );
    return data;
  }
}

export class PostService {
  constructor(private http: HttpClient) {}

  async getPosts() {
    const { data } = await this.http.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return data;
  }
}

export class PhotosService {
  constructor(private http: HttpClient) {}

  async getPhotos() {
    const { data } = await this.http.get(
      "https://jsonplaceholder.typicode.com/photos"
    );
    return data;
  }
}

````

**a**

```
import { PhotosService, PostService, TodoService } from "./02-open-close-b";
import { HttpClient } from "./02-open-close-c";

(async () => {
  const httpClient = new HttpClient();
  const todoService = new TodoService(httpClient);
  const postService = new PostService(httpClient);
  const photosService = new PhotosService(httpClient);

  const todos = await todoService.getTodoItems();
  const posts = await postService.getPosts();
  const photos = await photosService.getPhotos();

  console.log({ todos, posts, photos });
})();

```

Ahora siguiendo el OCP y el patrón adaptador vamos a reemplazar el uso de axios por fecth y esto lo haríamos solo desde la clase adaptadora sin afectar el acoplamiento que teniamos para hacer call apis

```
// import axios from "axios";

export class HttpClient {
  //   async get(url: string) {
  //     const { data, status } = await axios.get(url);
  //     console.log(status);
  //     return { data, status };
  //   }

  async get(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(response.status);
    return { data, status: response.status };
  }
}

```

#### Detectar violaciones de OPC

- Los cambios normalmente afectan la clase o módulo constantemente

- Cuando una clase o módulo afecta muchas capas (presentación, almacenamiento, etc)

### Liskov Substitution Principle (LSP)

Las funciones que utilicen punteros o referencias a clases base deben ser capaces de usar objetos de clases derivadas sin saberlo

Siendo U un subtipo de T, cualquier instancia de T debería poder ser sustituida por cualquier instancia de U sin alterar las propiedades del sistema

**a**

```
import { Tesla, Audi, Toyota, Honda } from "./03-liskov-b";

(() => {
  const printCarSeats = (cars: (Tesla | Audi | Toyota | Honda)[]) => {
    for (const car of cars) {
      if (car instanceof Tesla) {
        console.log("Tesla", car.getNumberOfTeslaSeats());
        continue;
      }
      if (car instanceof Audi) {
        console.log("Audi", car.getNumberOfAudiSeats());
        continue;
      }
      if (car instanceof Toyota) {
        console.log("Toyota", car.getNumberOfToyotaSeats());
        continue;
      }
      if (car instanceof Honda) {
        console.log("Honda", car.getNumberOfHondaSeats());
        continue;
      }
    }
  };

  const cars = [new Tesla(7), new Audi(2), new Toyota(5), new Honda(5)];

  printCarSeats(cars);
})();

```

**b**

```
export class Tesla {
  constructor(private numberOfSeats: number) {}

  getNumberOfTeslaSeats() {
    return this.numberOfSeats;
  }
}

export class Audi {
  constructor(private numberOfSeats: number) {}

  getNumberOfAudiSeats() {
    return this.numberOfSeats;
  }
}

export class Toyota {
  constructor(private numberOfSeats: number) {}

  getNumberOfToyotaSeats() {
    return this.numberOfSeats;
  }
}

export class Honda {
  constructor(private numberOfSeats: number) {}

  getNumberOfHondaSeats() {
    return this.numberOfSeats;
  }
}

```

Violenta el principio de sustitución de liskov porque no podemos agregar una nueva clase sin alterar la interfaz que recibe la función.

Se viola el princio de open and close porque cada vez que tengamos un nuevo tipo de vehiculo debemos entrar y modificar la función para agregar la nueva clase.

Aplicando los principios...

**a**

```
import { Tesla, Audi, Toyota, Honda, Vehicle, Volvo } from "./03-liskov-b";

(() => {
  const printCarSeats = (cars: Vehicle[]) => {
    cars.forEach((car) => {
      console.log(car.constructor.name, car.getNumberOfSeats());
    });
  };

  const cars = [
    new Tesla(7),
    new Audi(2),
    new Toyota(5),
    new Honda(5),
    new Volvo(2),
  ];

  printCarSeats(cars);
})();

```

**b**

```
export abstract class Vehicle {
  abstract getNumberOfSeats(): number;
}

export class Tesla extends Vehicle {
  constructor(private numberOfSeats: number) {
    super();
  }

  getNumberOfSeats() {
    return this.numberOfSeats;
  }
}

export class Audi extends Vehicle {
  constructor(private numberOfSeats: number) {
    super();
  }

  getNumberOfSeats() {
    return this.numberOfSeats;
  }
}

export class Toyota extends Vehicle {
  constructor(private numberOfSeats: number) {
    super();
  }

  getNumberOfSeats() {
    return this.numberOfSeats;
  }
}

export class Honda extends Vehicle {
  constructor(private numberOfSeats: number) {
    super();
  }

  getNumberOfSeats() {
    return this.numberOfSeats;
  }
}

export class Volvo extends Vehicle {
  constructor(private numberOfSeats: number) {
    super();
  }

  getNumberOfSeats() {
    return this.numberOfSeats;
  }
}

```

Aplica el principio de sustitución de Liskov porque ahora la función tolera cualquier clase que sea subclase de la clase abstracta y aplica el princio de Open / Close porque no es necesario modificar el interior de la función para acceder a los métodos de las diferentes subclases que reciba.

### Interface Segregation Principle (ISP)

Este principio establece que los clientes no deberían verse forzados a depender de interfaces que no usan.

El principio de segregación de interfaz se viola cuando se tiene que implementar métodos que la clase no usa solo para cumplir el contrato.

Por ejemplo:

```
interface Bird {
  fly(): void;
  eat(): void;
  swim(): void;
  run(): void;
}

class Tucan implements Bird {
  public fly() {}
  public eat() {}
  public swim() {}
  public run() {}
}

class Hummingbird implements Bird {
  public fly() {}
  public eat() {}
  public swim() {}
  public run() {}
}

class Ostrich implements Bird {
  public fly() {throw new Error("this bird can't fly");}
  public eat() {}
  public swim() {
    throw new Error("this bird can't swim");
  }
  public run() {}
}

class Penguin implements Bird {
  public fly() {throw new Error("this bird can't fly");}
  public eat() {}
  public swim() {}
  public run() {}
}

```

Ahora aplicando el principio de segregación de interfaz

```
interface Bird {
  eat(): void;
}

interface FlyingBird {
  fly(): number;
}

interface RunningBird {
  run(): void;
}
interface SwimmerBird {
  swim(): void;
}

class Tucan implements Bird, FlyingBird {
  public fly() {
    return 200;
  }
  public eat() {}
}

class Hummingbird implements Bird, FlyingBird {
  public fly() {
    return 500;
  }
  public eat() {}
}

class Ostrich implements Bird, RunningBird {
  public eat() {}
  public run() {}
}

class Penguin implements Bird, SwimmerBird {
  public eat() {}
  public swim() {}
}

```

Ahora el código es mas tolerante al cambio

Para detectar violaciones del ISP:

- Si las interfaces que diseñamos nos obligan a violentar el principio de responsabilidad unica y el de substitución de Liskov, muchas veces las solución corresponde a segregar mucho y pueden llegar a ser refactorizaciones muy grandes pero con un código resultante con mayor tolerancia al cambio.

### Principio de inversión de dependencias

Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones.

Las abstracciones no deben depender de los detalles. Los detalles deben depender de las abstracciones.

En resumen, esto significa que en lugar de que los componentes de alto nivel dependan directamente de los componentes de bajo nivel, ambos deben depender de interfaces o abstracciones comunes. Esto permite una mayor flexibilidad y extensibilidad en el diseño del software, ya que los detalles de implementación pueden cambiar sin afectar a los componentes de alto nivel.

**05-dependency-a**

```
import { PostService } from './05-dependency-b';


// Main
(async () => {

    const postService = new PostService();

    const posts = await postService.getPosts();

    console.log({ posts })


})();
```

**05-dependency-b**

```
import { LocalDataBaseService } from "./05-dependency-c";

interface Post {
    body:   string;
    id:     number;
    title:  string;
    userId: number;
}


export class PostService {

    private posts: Post[] = [];

    constructor() {}

    async getPosts() {
        const jsonDB = new LocalDataBaseService();
        this.posts = await jsonDB.getFakePosts();

        return this.posts;
    }
}

```

**05-dependency-c**

```

export class LocalDataBaseService {

    constructor() {}

    async getFakePosts() {
        return [
            {
                'userId': 1,
                'id': 1,
                'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                'body': 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto'
            },
            {
                'userId': 1,
                'id': 2,
                'title': 'qui est esse',
                'body': 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla'
            }]
    }

}


```

El problema del ejercicio anterior es que 05-dependency-b tiene una alta dependencia con 05-dependency-c ya que no permite al código cambiar el origen de los datos sin necesidad de alterar el código tanto en la instancia de la base de datos como en la obtención de los datos (Tendriamos que violentar el principio Open & Close)

Nuestro código se debe basar en abstracciones y no en implementaciones

Para mejorar el código vamos aplicar el patrón de inyección de dependencias, inversión de dependencias y sustitución de Liskov

**05-dependency-a**

```
import { PostService } from "./05-dependency-b";
import {
  LocalDataBaseService,
  JsonDataBaseService,
  WebApiPostService,
} from "./05-dependency-c";

// Main
(async () => {
  const provider = new WebApiPostService();
  const postService = new PostService(provider);

  const posts = await postService.getPosts();

  console.log({ posts });
})();

```

**05-dependency-b**

```
import { PostProvider } from "./05-dependency-c";

export interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export class PostService {
  private posts: Post[] = [];

  constructor(private postProvider: PostProvider) {}

  async getPosts() {
    this.posts = await this.postProvider.getPosts();

    return this.posts;
  }
}

```

**05-dependency-c**

```
import LocalPosts from "../data/local-database.json";
import { Post } from "./05-dependency-b";

export abstract class PostProvider {
  abstract getPosts(): Promise<Post[]>;
}

export class LocalDataBaseService extends PostProvider {
  async getPosts() {
    return [
      {
        userId: 1,
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
      },
      {
        userId: 1,
        id: 2,
        title: "qui est esse",
        body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
      },
    ];
  }
}

export class JsonDataBaseService extends PostProvider {
  async getPosts() {
    return LocalPosts;
  }
}

export class WebApiPostService extends PostProvider {
  async getPosts(): Promise<Post[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  }
}

```
