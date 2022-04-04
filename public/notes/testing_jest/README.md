[//]: # @param group $$ Testing
[//]: # @param title $$ Curso Unit Testing con Jest en React
[//]: # @param author $$ Iván D. Sánchez


# Curso Unit Testing con Jest en React

## ¿Qué es un Test?

Un test es una serie de estrategias que al emplearlas y ejecutarlas correctamente, debe dar confiabilidad al proyecto realizado para que garantice su pleno funcionamiento en producción, y minimizar los errores que se puedan encontrar.

### Pruebas funcionales

Es una prueba basada en la ejecución, revisión y retroalimentación de las funcionalidades previamente diseñadas para el software.
Es decir, son pruebas específicas, concretas y exhaustivas para probar y validar que el software hace lo que debe y sobre todo, lo que se ha especificado.

### Pruebas no funcionales

Con estas testeamos todo lo que no influye a la funcionalidad del producto, como por ejemplo, la accesibilidad, configuración, de rendimiento, entre otras.


### Coverage

Esta herramienta nos permite que tanto estamos probando de nuestro proyecto y generar un reporte que nosotros podamos analizar a detalle y ver que nos falta por probar en nuestros proyectos

## Preparación del entorno con Jest


    mkdir jest_jsbase
    cd jest_jsbase
    git init
    npm init -y


Instalación de Jest como dependencia de desarrollo

    npm install jest -D


Crear la carpeta src y el archivo index.js
Crear la carpeta `__test__` para almacenar nuestras pruebas (Este nombre es un standard de la industria para identificar el folder que contiene las pruebas)
En este folder vamos a crear el archivo ***global.test.js***, la particula test indica que no es un archivo del proyecto sino que corresponde a pruebas

En Jest vamos a trabajar con una funcion llamada **test()** la cual recibe dos parámetros, el primero es un string que describe lo que va a pasar y el segundo es una función anónima donde viene lo que vamos a probar.

Dentro de la función anónima utilizamos expect que recibe una variable de entrada a evaluar y luego realiza un match si esa variable cumple con el test


## Basic tests using test
### Implementando pruebas para verificar el contenido de un String

En este caso vamos a verificar que la variable contega la palabra 'Hola'

Nota: puede que en la version 27 la expresion /Hola/ no funcione en su caso el texto debería ser parametrizado de la forma "Hola"


    const text = "Hola Mundo"

    test('Debe contener un texto con la palabra mundo', () => {
      expect(text).toMatch(/Hola/)
    })



### Configuración y ejecución de las pruebas


Ahora debemos configurar en el package.json el script para correr los test

    "scripts": {
      "test": "jest"
    },


Y corremos desde la terminal las pruebas

    npm run test


### Implementando pruebas para Boolean y Array


Verificar si un valor se encuentra en un array

    const fruits = ['apple', 'banana', 'orange']

    test('Do we have a apple?', () => {
      expect(fruits).toContain('apple')
    })


Verificar si un número es mayor que 10

    test('Greater than 10', () => {
      expect(14).toBeGreaterThan(10)
    })


Verificar si un valor es truthy

    test('Verdadero',() => {
      expect(true).toBeTruthy()
    })


Verificar si un valor es de tipo booleano y true

    test('Verdadero',() => {
      expect(true).toBe(true)
    })


### Implementando pruebas para un callback

Verificando un callback

    //Verificando un callback
    const reverseString = (str, callback) => {
      callback(str.split("").reverse().join(""))
    }

    test('probando un callback', () => {
      reverseString('hola', (str)=>{
        expect(str).toBe('aloh')
      })
    })



### Implementando pruebas a promesas


    test('Promise Test', () => {
      return reverseString2('hola')
      .then(string =>  expect(string).toBe('aloh'))
    })

    // Verificando async/await
    test('async await test', async () => {
      const string = await reverseString2('hola')
      expect(string).toBe("aloh")
    })


**Nota:** Es importante el return dentro de test para evaluar el correcto funcionamiento del resolve de la promesa.

## Ejecutando funciones antes y despues de cada prueba

### afterEach()

Ejecutar código despues de cada prueba

### afterAll()

Se ejecuta después de todas las pruebas.

### beforeEach()

Se ejecuta antes de cada prueba


### beforeAll()

Antes de todas las pruebas


    afterEach(() => console.log('After each test'))
    afterAll(() => console.log('After all the tests'))
    beforeEach(() => console.log('Before each test'))
    beforeAll(() => console.log('Before all the tests'))



## describe: Empaquetado de pruebas 

**describe()** es una funcion que recibe dos parametros, el primero es una descripción de lo que hace el paquete de test y el segundo es una función anónimoa con los test que agrupa


*src/index.js*

    const cities = ["Bogotá", "CDMX", "Sao Paulo", "Monterrey"]

    const randomString = () => {
      return string = cities[Math.floor(Math.random() * cities.length )]
    }

    module.exports = randomString


*src/_test_/index.test.js*

    const randomString = require("../index")

    describe('testing randomString functionalities', ()=>{
      
      test('Random string', () => expect(typeof randomString()).toBe('string'));

      test('Not contain Cordoba', () => expect(randomString()).not.toMatch(/Cordoba/))
    })

## Ejecutando un script de test específico


Para correr un script específico de pruebas tenemos varias opciones:


### instalando jest globalmente


    npm install -g jest


Luego de tener las dependencia instalada globalmente podriamos correr una prueba específica desde la terminal de la forma


    jest src/__test__/index.test.js

Otra opción que tenemos es no instalar jest de manera global, y ejecutarlo de manera local con npx

    npx jest src/__test__/index.test.js


Otra opción local es pasando la ruta del archivo al script que ya tenemos de npm y ejecutarlos desde la terminal o configurandolo en el package.json

    npm run test src/__test__/index.test.js 


*package.json*

    "scripts": {
        "test": "jest",
        "test:index": "jest src/__test__/index.test.js"
      },
## Watch

Podemos crear un script para que dejar escuchando los cambios sobre las pruebas

*package.json*


      "scripts": {
        "test": "jest",
        "test:index": "jest src/__test__/index.test.js",
        "test:watch": "jest --watch"
      },

## Coverage

El coverage nos permite conocer a través de un informe, la cobertura de las pruebas sobre el total de funcionalidades a probar en nuestra aplicación. Lo podemos llamar desde la terminal con el comando

    jest  --coverage


Luego de ejecutar este comando podemos ver en nuestra terminal nuestro coverage, también se crea en nuestro proyecto una carpeta *coverage*  en la cual tenemos disponible este informe, en un archivo de html


## Preparación del proyecto

Vamos a tener dos casos de estudio para la preparación de Jest en un proyecto; cuando la aplicación es creada usando create-react-app y el otro caso es cuando la aplicación es una instalación custom de react


### create-react-app

Cuando un proyecto es creado usando create-react-app se deben respetar las siguientes reglas:

- No modificar los script por defecto  de test del package.json (“test”: “react-scripts test”)
- El archivo de configuración debe estar en la ruta **/src** y debe tener el nombre **setupTests.js** (src/setupTests.js)
- Los archivos de test pueden estar ubicados en cualquier ubicación del arbol de directorios a partir de "/src"


En caso que los test no corran tener presente la siguiente advertencia:


react-scripts (5.0.0) has a dependency on jest-watch (1.0.0) (reference https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/package.json#L55)
jest-watch (1.0.0) requires a Node version of ^12.22.0 || ^14.17.0 || >=16.0.0 (reference https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/package.json#L55)

If you run the app using Node 14.17.0 It worked fine.

The react-scripts test command works with the following Node versions:

Major version 14 and minimum minor version 17 (^14.17.0)
Major version 16 (>=16.0.0)