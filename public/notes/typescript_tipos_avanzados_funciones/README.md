[//]: # @param group $$ TypeScript
[//]: # @param title $$ 02 - Curso de TypeScript: Tipos Avanzados y Funciones
[//]: # @param author $$ Iván D. Sánchez

# Curso de TypeScript: Tipos Avanzados y Funciones

Para este proyecto se va a trabajar con ts-node que permite desarrollar sin necesidad de ir transpilando los archivos.

## Alistando el proyecto

crear /.gitignore y /.editorconfig

npm init -y

npm i -D typescript
npx tsc --init

Modificamos del tsconfig.json, el parametro

        "outDir": "./dist",

Podemos podemos probar la transpilación a la carpeta de destino

    npx tsc

o también podemos dejas escuchando la transpilación

    npx tsc --watch

Ahora vamos a instlar la libreria ts-node para ahorrarnos el paso de estar transpilando la aplicación. Corre la apicación desde un backend con NodeJS

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

### enum vs literal types

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

## Otras características de enum

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

## Enum - Caso de uso con Capacitor

Capacitor es una librería para hacer aplicaciones multiplataforma, vamos a instalar el plugin para uso de la camara

        npm install @capacitor/camera

Probando src/camera.ts

import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
const image = await Camera.getPhoto({
quality: 90,
allowEditing: true,
resultType: CameraResultType.Base64
});

};

En el plugin de camera está un enum que nos permite configurar el resultado de tomar una captura con la camara, para hacer es necesario importar el typo desde la librería, el cual provee el set de opcioes del resultType (url, uri, base64) de la captura

Nota: puedo pararme sobre el tipo importado CameraResultType y click derecho, go to definition y ver la estructura del enum.

Ahora podemos explorar la estructura de getPhoto(options: ImageOptions) que recibe un parámetro options de tipo ImageOptions y vemos que en su interface está el atributo direction que recibe un enum CameraDirection que debemos importar del plugin.

                import { Camera, CameraResultType, CameraDirection } from '@capacitor/camera';

                const takePicture = async () => {
                const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Base64,
                direction: CameraDirection.Front
                });
                };

## Tuples

Correponden a Arrays fuertemente tipados

En un array podemos indicar los tipos de datos que puede contener pero no podemos parametrizar el tipo de dato esperado según la posición del valor dentro del array y tampoco condicionar la longitud del mismo.

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

## Unknown type

unknown es un typo any mejorado, forza a hacer una verificación de tipo antes de poder ejecutar los métodos de la variable segun el tipo de dato o una asignación de valor.

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


## Never type


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
