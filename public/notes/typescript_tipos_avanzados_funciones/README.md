[//]: # @param group $$ TypeScript
[//]: # @param title $$ 02 - Curso de TypeScript: Tipos Avanzados y Funciones
[//]: # @param author $$ Iván D. Sánchez

# Curso de TypeScript: Tipos Avanzados y Funciones

Para este proyecto se va a trabajar con ts-node que permite desarrollar sin necesidad de ir transpilando los archivos.

## Alistando el proyecto

crear /.gitignore y /.editorconfig

```
npm init -y
npm i -D typescript
npx tsc --init
```

Modificamos del tsconfig.json, el parámetro

    "outDir": "./dist",

Probar la transpilación a la carpeta de destino

    npx tsc

También podemos dejar escuchando la transpilación

    npx tsc --watch

Ahora vamos a instalar la libreria ts-node para ahorrarnos el paso de estar transpilando la aplicación. Corre la apicación desde un backend con NodeJS

    npm i -D ts-node

Ahora podemos ejecutar localmente archivos sin transpilar

    npx ts-node path/nombreArchivo

Nota: se debe tener precaución al trabajar con ts-node ya que este solo está corriendo el código sin transpilar y ya para un frontend desplegado aunque hay soluciones que podrian ejecutar en el backend archivos de .ts, se recomienda por performance transpilar los archivos a .js

## New Types

### Enums

Funcionan de manera similar a los literal types

Los enums funcionan como listas en las que podemos agregar llaves y valores. Esto lo que nos permite es tener un set de opciones predefinidas, evitando pasar un argumento invalido, ya que solo vamos a tener las opciones dentro del enum. Estos se usan de la siguiente manera

        enum ROLES {
        ADMIN = "admin",
        USER = "user",
        OWNER = "owner"
        }

Se aconseja crear el nombre del enum en mayusculas.

Las listas son accedidas a través del enum

       enum ROLES  {
        ADMIN = 'admin',
        USER = 'user',
        OWNER = 'owner'
        }

        type User = {
        username:  string,
        role: ROLES
        }

        const cosmosUser: User = {
        username: 'cosmos',
        role: ROLES.ADMIN
        }

        console.log(cosmosUser)

#### enum vs literal types

Al usar enum podemos indicarle a una función los valores posibles que recibe un parámetro, esto aumenta la precisión de los valores que recibe una función por parámetros.

Usando enum se debe ser mas especifico al pasarle los parámetros

        enum Estaciones {
        primavera = "Primavera",
        verano = "Verano",
        otonio = "Otoño",
        invierno = "Invierno",
        }

        const favEstacion = (est: Estaciones): string => {
        return `Mi estación fav es: ${est}`;
        };
        console.log(favEstacion("verano")); //❌ no se puede mandar un string suelto
        console.log(favEstacion(Estaciones.verano)); //✅tenemos que ser mas especificos

Con literal types es mas sencillo

        type Estaciones = "Primavera" | "Verano" | "Otoño" | "Invierno";

        const favEstacion = (est: Estaciones): string => {
        return `Mi estación fav es: ${est}`;
        };
        console.log(favEstacion("Primavera")); // ✅ Podemos usar los argumentos como si fuera js nativo

El código transpilado es mas extenso para enum que para literal types

#### Otras características de enum

Si en un enum las keys solo se declaran y no se inicializan con valores, estas se inician automáticamente por defecto en orden númerico, empezando por el 0 y auto incrementandose.

```

enum ENUM_NUMBER {
  X,Y,Z
}

console.log(ENUM_NUMBER.X) // 0
console.log(ENUM_NUMBER.Y) // 1
console.log(ENUM_NUMBER.Z) // 2


```

También es posible inicializar manualmente una key y sus atributos se incrementaran a partir de este valor

```
enum ENUM_NUMBER {
  X = 1,
  Y,
  Z
}

console.log(ENUM_NUMBER.X) // 1
console.log(ENUM_NUMBER.Y) // 2
console.log(ENUM_NUMBER.Z) // 3


```

#### Enum - Caso de uso con Capacitor

Capacitor es una librería para hacer aplicaciones multiplataforma, vamos a instalar el plugin para uso de la camara

        npm install @capacitor/camera

Probando src/camera.ts

```
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Base64
  });
};
```

En el plugin de camera está un enum que nos permite configurar el resultado de tomar una captura con la camara, para hacer es necesario importar el typo desde la librería, el cual provee el set de opcioes del resultType (url, uri, base64) de la captura

Nota: puedo pararme sobre el tipo importado CameraResultType y click derecho, go to definition y ver la estructura del enum.

Ahora podemos explorar la estructura de getPhoto(options: ImageOptions) que recibe un parámetro options de tipo ImageOptions y vemos que en su interface está el atributo direction que recibe un enum CameraDirection que debemos importar del plugin.

```
import { Camera, CameraResultType, CameraDirection } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Base64,
    direction: CameraDirection.Front
  });
};
```

### Tuples

Correponden a Arrays fuertemente tipados

En un array podemos indicar los tipos de datos que puede contener pero no podemos parametrizar el tipo de dato esperado según la posición del valor dentro del array y tampoco condicionar la longitud del mismo.

```
// Array

const prices: (string | number)[] = []
prices.push(1)
prices.push('muchos')
prices.push(0)
//prices.push(true) // Error

console.log(prices)


// tuple
let user: [string, number, boolean?]
user = ['ivan', 38]
user = ['Mati', 7, true]
//user = ['Nata', 35, 1] //error


// destructuring
const [username, age] = user
console.log(username) // Mati
console.log(age) // 7
```

### Unknown type

unknown es un typo any mejorado, que obliga a hacer una verificación de tipo antes de poder ejecutar los métodos o asignar el valor de una variable segun el tipo de dato .

```
    let anyVar: any
    anyVar = true
    anyVar = 1
    anyVar = 'true'
    anyVar = []
    anyVar = {}

    anyVar.doSomething() // this is not a error


    let unknownVar: unknown
    unknownVar = true
    unknownVar = 1
    unknownVar = 'true'
    unknownVar = []
    unknownVar = {}

    // unknowVar.doSomething() // Require verification type
```

Tambien se puede usar para aquellas funciones donde desconocemos el tipo de dato que retorna

      const parse = (str: string): unknown => {
        return JSON.parse(str)
      }

Tambien solicita verificacion de tipo si vamos a asignar un valor

    let unknownVar: unknown;
    unknownVar = true;
    unknownVar = 1;
    unknownVar = 'true';
    unknownVar = [];
    unknownVar = {};

    if (typeof unknownVar === 'boolean') {
      let newVar: boolean = unknownVar;
    }

### Never type

El tipo never es recurso para advertir que una función no va a llegar a ejecutarse por completo porque tiene un comportamiento infinito

    const withoutEnd = () => {
      while (true) {
        console.log('nunca para de aprender');
      }
    }

    const fail = (message: string) => {
      throw new Error(message);
    }

    const example = (input: unknown) => {
      if (typeof input === 'string') {
        return 'es un string';
      } else if (Array.isArray(input)) {
        return 'es un array';
      }
      return fail('not match');
    }


    console.log(example('Hola'));
    console.log(example([1,1,1,1]));
    console.log(example(1212)); // detiene
    console.log(example('Hola despues del fail'));
    console.log(example('Hola despues del fail'));
    console.log(example('Hola despues del fail'));

Si bien esta bueno en caso de funciones donde este tipo de finalización de programas es clara (Como en un while true o el throw), no siempre detecta las funciones que son never.

Estos casos los infiere de tipo void aunque su ejecución sea infinita y detengan la ejecución del resto del programa.

Infiere void:

    const badFor = () => {
      for(let i = 1; i < 10; i){
        console.log(i)
      }
    }

Infiere void:

    const badRecursion = () => {
      if(true){
        console.log(‘Oh sh*t here we go again’)
        badRecursion()
      }
    }

Si bien TS puede inferir algunas funciones infinitas y que detengan la ejecución no lo hará siempre, por lo que tenemos que seguir haciendo testing

## Functions

### Parámetros opcionales y nullish-coalescing

**Without Logical OR operation**

```
const createProduct = (
  id: string | number,
  stock?: number,
  isNew?: boolean
) => {
  console.log({ id, stock, isNew });
};

createProduct(1, 1, true); // { id: 1, stock: 1, isNew: true }
createProduct(2, 5); // { id: 2, stock: 5, isNew: undefined }
createProduct(3); // { id: 3, stock: undefined, isNew: undefined }
createProduct(4, 0, false); // { id: 4, stock: 0, isNew: false }
```

**With Logical OR operation**

```
const createProduct = (
  id: string | number,
  stock?: number,
  isNew?: boolean
) => {
  console.log({
    id,
    stock: stock  || 10,
    isNew : isNew || true
  });
};

createProduct(1, 1, true); // { id: 1, stock: 1, isNew: true }
createProduct(2, 5); // { id: 2, stock: 5, isNew: true }
createProduct(3); // { id: 3, stock: 10, isNew: true }
createProduct(4, 0, false); // { id: 4, stock: 10, isNew: true } ?????????????????????

```

**with nullish-coalescing**

```
const createProduct = (
  id: string | number,
  stock?: number,
  isNew?: boolean
) => {
  console.log({
    id,
    stock: stock  ?? 10,
    isNew : isNew ?? true
  });
};

createProduct(1, 1, true); // { id: 1, stock: 1, isNew: true }
createProduct(2, 5); // { id: 2, stock: 5, isNew: true }
createProduct(3); // { id: 3, stock: 10, isNew: true }
createProduct(4, 0, false); // { id: 4, stock: 0, isNew: false } Ok!!
```

### Parámetros por defecto

```
const createProduct = (
    id: string | number,
    stock: number = 10,
    isNew: boolean = true
  ) => {
    console.log({
      id,
      stock,
      isNew,
    });
  };

  createProduct(1, 1, true); // { id: 1, stock: 1, isNew: true }
  createProduct(2, 5); // { id: 2, stock: 5, isNew: true }
  createProduct(3); // { id: 3, stock: 10, isNew: true }
  createProduct(4, 0, false); // { id: 4, stock: 0, isNew: false } Ok!!
```

### Parámetros rest

Parámetros rest
Los parámetros rest nos permiten enviar la cantidad que queramos de parámetros a una función, casi sin limite.

Funciona de la siguiente manera

```
// en JS
function sum(...args){
  const addition = args.reduce((static, arg) => static + arg, 0)
  return addition
}
```

La función de arriba esta hecha en JS y esta, toma todos los parámetros que hayamos pasado a la función y los convierte en un array. En TS se vería de una manera muy similar

```
// en TS
function sum(...args: number[]){
  const addition = args.reduce((static, arg) => static + arg, 0)
  return addition
}

```

Lo único que cambia es el tipado en los argumentos.

Ya por ultimo, el nombre que le damos a los “rest params” es costumizable, puede ser args, params, props, etc.
Y siempre es recomendable dar estos parámetros al final. Ósea, después de parámetros obligatorios.

```
function sum(num1, num2, ...args){
  @code
}
```


### Sobrecarga de funciones: el problema

La sobrecarga  sucede en aquellas funciones que pueden retornar mas de un tipo de dato, luego al intentar trabajar con el valor retornado no es posible acceder a sus métodos ya que TypeScript no puede inferir el tipo de dato retornado.

La sobrecarga de funciones solo es posible en funciones del tipo function fnName(){}

```
// Nico => [N,i,c,o] => string => string[]
// [N,i,c,o] => Nico => string[] => string


function parseStr(input: string | string[]): string | string[] {
  if (Array.isArray(input)) {
    return input.join(''); // string
  } else {
    return input.split(''); // string[]
  }
}

const rtaArray = parseStr('Nico');
// rtaArray.reverse();
if (Array.isArray(rtaArray)) {
  rtaArray.reverse();
}
console.log('rtaArray', 'Nico =>' ,rtaArray);

const rtaStr = parseStr(['N','i','c','o']);
// rtaStr.toLowerCase();
if (typeof rtaStr === 'string') {
  rtaStr.toLowerCase();
}
console.log('rtaStr', "['N','i','c','o'] =>",rtaStr);
```

### Sobrecarga de funciones: la solución

Para poder sobrecargar una función debemos declarar antes de la función que contiene la lógica implementada, la misma función en cada una de las posibilidades de input y output de la sobrecarga

También podemos refactorizar la función que lleva la lógica e indicar que recibe un parametro de tipo unknow y retorna un valor de tipo unknow

```

// Nico => [N,i,c,o] => string => string[]
// [N,i,c,o] => Nico => string[] => string

export function parseStr(input: string): string[];
export function parseStr(input: string[]): string;
export function parseStr(input: number): boolean;


// export function parseStr(input: string | string[]): string | string[] {
//   if (Array.isArray(input)) {
//     return input.join(''); // string
//   } else {
//     return input.split(''); // string[]
//   }
// }

export function parseStr(input: unknown): unknown {
  if (Array.isArray(input)) {
    return input.join(''); // string
  } else if (typeof input === 'string'){
    return input.split(''); // string[]
  } else if (typeof input === 'number'){
    return true; // boolean
  }
}

const rtaArray = parseStr('Nico');
rtaArray.reverse();
// if (Array.isArray(rtaArray)) {
//   rtaArray.reverse();
// }
console.log('rtaArray', 'Nico =>' ,rtaArray);

const rtaStr = parseStr(['N','i','c','o']);
rtaStr.toLowerCase();
// if (typeof rtaStr === 'string') {
//   rtaStr.toLowerCase();
// }
console.log('rtaStr', "['N','i','c','o'] =>",rtaStr);

const rtaBoolean = parseStr(12);

```

#### Buenas prácticas de la sobrecarga de funciones

Si entre las opciones de la sobrecarga una es de tipo unknow,  está debe ir al final de las demás opciones para que funcione correctamente la aserción de tipos 


```
//First Case: uknnown is not at the end

/* wrong */
declare function fn(x: unknown): unknown;
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
var myElement: HTMLDivElement;
var x = fn( myElement ); // x: string


//Sol: keep the unknown at the end
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
declare function fn(x: unknown): unknown;
var myElement: HTMLDivElement;
var x = fn( myElement ); // x: string

```


Verificar si es necesario realizar una sobrecarga o si es posible utilizar valores opcionales

```
//Second case: create unnesesary overloads

interface Example {
  diff(one: string): number;
  diff(one: string, two: string): number;
  diff(one: string,  two: string, three:boolean): number;
}

// Sol: Create one with option parameters
interface Example {
  diff(one: string, two?: string, three?: string): number;
}
```

Verificar si es necesario realizar una sobrecarga o si es posible utilizar union types

```
//Third case: create multiple lines, but at the end just return the same type (Moment in this case)
interface Moment {
  utcOffset(): number;
  utcOffset(b: number): Moment;
  utcOffset(b: string): Moment;
}

// solution: just use 1 union type 
interface Moment {
  utcOffset(): number;
  utcOffset(b: number | string): Moment;
}
```


## interfaces

### interfaces

* Una interfaz, es un “blueprint” ó plano que describe que propiedades debe tener el objeto.

* La interfaces las podemos usar de la misma manera que los types.

* Con los types es posible definir tipos primitivos o directos (declaraciones cortas y puntuales), mientras que las interfaces requieren de todo un cuerpo

* Las interfaces se componen de un gurpo de atributos y valores

* Las interfaces a diferencia de los types se pueden extender


```
interface interfaceName {
	statements
}

```

```
type Sizes = 'S' | 'M' | 'L' | 'XL';
type UserId = string | number;

interface Product {
    id: string | number;
    title: string;
    createdAt: Date;
    stock: number;
    size?: Sizes;
}

const products: Product[] = [];
products.push({
    id: '1',
    title: 'p1',
    createdAt: new Date(),
    stock: 90,
});

const addProduct = (data: Product) => {
    products.push(data);
}

```


### Estructuras complejas

Las interfaces pueden ser muy útiles para tener un código mas fácil de mantener y ordenado, teniendo en cuenta el principio de responsabilidad única, podemos crear nuestras entidades de manera que tengamos el modelo (conjunto de atributos de la entidad)  y por otra parte los servicios (métodos que permiten interactuar con la entidad) por separado.

Los modelos pueden requerir a otros modelos como parte de su estructura, para este caso importamos las interfaces que necesitamos integrar como valor anidado de alguno de los atributos del modelo. 

```
src
- app
- - categories
- - - categoy.model.ts
- - orders 
- - - order.model.ts
- - products
- - - product.model.ts
- - - product.service.ts
- - users
- - - user.model.ts
- - main.ts

```
Ejemplo

```
//src/app/orders/order.model.ts

import { Product } from './../products/product.model';
import { User } from './../users/user.model';

export interface Order {
  id: string | number;
  createdAt: Date;
  products: Product[];
  user: User;
}
```

### Extender interfaces

Es posible extender interfaces de la misma forma en la que hereda una clase.

Para este caso vamos a crear un modelo base que extiende a los demas modelos los atributos comunes para todos los modelos

En caso que necesitemos redefenir el tipado o agregar un campo de esta interface padre, se heredará a todas las interfaces hijo,  esto tiene como ventaja identificar oportunamente si hay afectación o si las interfaces hijo requieren pasar o quitar nuevos atributos


```
// src/app/base.model.ts

export interface BaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

```

Ejemplo 

```
//src/app/products/product.model.ts

import { Category } from './../categories/category.model';
import { BaseModel } from '../base.model';

export type Sizes = 'S' | 'M' | 'L' | 'XL';

export interface Product extends BaseModel {
  title: string;
  stock: number;
  size?: Sizes;
  category: Category;
}


```

Efectos de crear el campo updateAt


```
import { addProduct } from "./products/product.service";

addProduct({
  id: '1',
  title: 'p1',
  createdAt: new Date(),
  updatedAt: new Date(),
  stock: 90,
  category: {
    id: '12',
    name: 'c1',
    createdAt: new Date(),
    updatedAt: new Date ()
  }
})
```
### Propiedades de solo lectura

Hay situaciones en las que debemos proteger la modificación de algunos atributos de una interfaz como lo puede ser el id y la fecha de creación, para este caso podemos agregar la propiedad readonly al atributo, el cual indicará un error en casa de intentar asignar un valor al atributo

```
export interface BaseModel {
  readonly id: string;
  readonly createdAt: Date;
  updatedAt: Date;
}
```
