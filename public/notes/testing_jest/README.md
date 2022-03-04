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
Crear la carpeta __test__ para almacenar nuestras pruebas (Este nombre es un standard de la industria para identificar el folder que contiene las pruebas)
en __test__ vamos a crear el archivo global.test.js, la particula test indica que no es un archivo del proyecto sino que corresponde a pruebas


En Jest vamos a trabajar con una funcion llamada `test` la cual recibe dos parámetros, el primero es un string que describe lo que va a pasar y el segundo es una función anónima donde viene los que vamos a probar.

Dentro de la función anónima utilizamos expect que re recibe una variable de entrada a evaluar y luego realiza un match si esa variable cumple con el test

En este caso vamos a verificar que la variable contega la palabra 'Hola'


Nota: puede que en la version 27 la expresion /Hola/ no funcione en su caso el texto debería ser parametrizado de la forma "Hola"


  const text = "Hola Mundo"

  test('Debe contener un texto con la palabra mundo', () => {
    expect(text).toMatch(/Hola/)
  })

Ahora debemos configurar en el package.json el script para correr los test

  "scripts": {
    "test": "jest"
  },

Y corremos desde la terminal las pruebas

  npm run test