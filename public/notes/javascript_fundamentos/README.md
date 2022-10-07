[//]: # @param group $$ JavaScript
[//]: # @param title $$ Fundamentos de JavaScript
[//]: # @param author $$ Iván D. Sánchez

# Fundamentos de JavaScript

## Introducción a JavaScript

### ¿Qué es JavaScript?

- Lenguaje interpretado
- Debilmente tipado
- Orientado a objetos
- Dinámico

Aunque se podría decir que JavaScript es un lenguaje interpretado, ya que pareciera que los scripts se ejecutan directamente durante el runtime no es así, previamente cada script es parseado en un AST (Abstrac Syntax Tree), que luego es transformado a Bytecode (compilación a lenguaje de máquina) para luego ser interpretado por el navegador.

Javascript es un lenguaje backward compatible, osea que cuando aparece un nuevo feature este no está disponible en la nueva versión sino que requiere ser transpilado a una versión standard anterior que es compatible con los navegadores.

### Tipos de datos primitivos

- Es un tipo de dato básico
- No poseén métodos ni propiedades
- Son datos que no son un objeto
- Son inmutables

**Datos primitivos**

- Strings
- number
- null
- boolean
- undefined
- Symbol

Strings, number y boolean funcionan con Object Wrapper para acceder temporalmente a sus métodos y atributos

Aunque null tiene un typeof object este es un bug de JavaScript ya que no es un objeto

Los Symbol permiten instanciar valores únicos

bigint es un nuevo tipo de dato primitivo, son solo operables entre ellos mismos, se debe indicar al final de un valor numérico con una n para indicar que es de tipo bigint

Lo que no sea un tipo de dato primitivo es un objeto

- Arrays
- Funciones (typeof function)
- Fechas
- Expresiones regulares

## Funciones

### Funciones declaradas VS Funciones expresadas en Javascript


```
// FunctionDeclaration
  function foo(){
  // Some code goes here...
}

// FunctionExpression
  var foo = function(){
    // Some code goes here...
  }

```

Otra forma de función expresada son las funciones autoejecutables:

```

(function foo(){})(); // FunctionExpression

```

E l primer par de paréntesis crea una expresión que luego se encarga de ejecutar el segundo par de paréntesis.


```
function foo(){} // declaration, since it's part of a Program

var bar = function foo(){}; // expression, since it's part of an AssignmentExpression

new function bar(){}; // expression, since it's part of a NewExpression
  
(function(){
  function bar(){} // declaration, since it's part of a FunctionBody
})();

```

### Parecidas, pero no iguales.

La duda vino en un primer momento cuando nos preguntamos si existían diferencias de rendimiento a la hora de crearlas de una u otra forma. Sin embargo, cuando investigamos un poco sobre el tema, encontramos que ambas se comportaban de una forma diferente dependiendo del patrón empleado.

La diferencia principal radica en que mientras la primera es una declaración que forma parte de un programa global, la segunda es una expresión que forma parte de un punto concreto (y de una closure). Esto determina, como veremos a continuación, en qué momento ambas instrucciones son evaluadas por Javascript y cuándo pasan a estar disponibles en tiempo de ejecución.

Dicho esto, tenemos que las funciones declaradas son evaluadas antes que cualquier otra expresión. Incluso si la declaración se encuentra al final de todo un código fuente, ésta tendrá preferencia sobre aquellas expresiones que la precedan. El siguiente ejemplo muestra como el alert devuelve el resultado de una función declarada aunque ésta se defina más adelante:

```
alert( add( 3, 5 ) ); // 8

function add( x, y ){
  return x + y;
}

```


Sin embargo, si tratamos con funciones expresadas, éstas solo son evaluadas cuando el flujo natural de ejecución las alcanza. El siguiente código mostrará error ya que en el momento de llamar a la función, el intérprete aún no ha llegado a ella para evaluarla:


```
alert( add( 3, 5 ) ); // ErrorType: add is not defined

var add = function( x, y ){
  return x + y;
}

```
No funcionaría tampoco nombrar a la función con el mismo nombre de su expresión; el resultado continúa siendo el mismo ya que no cambiamos con ello su tipología:

```
alert( add( 3, 5 ) ); // ErrorType: add is not defined

var add = function add( x, y ){
  return x + y;
}
```

**Declaraciones en diferentes entornos**

A raíz de lo anterior, un factor a tener en cuenta es que, en determinados entornos, las funciones declarativas no se comportan de un modo estándar. Por ejemplo, si necesitamos crear una función en base a un condicional, nunca debemos utilizar las funciones declarativas. Veámos el siguiente código:

```
if( myVar == true){
  function foo(){ return 'TRUE'; }
}else{
  function foo(){ return 'FALSE'; }
}
```

Como la función es creada antes que se evalúe el código, en algunos navegadores podemos encontrarnos con que nos saltamos los condicionales y se asigna a la función foo siempre el valor FALSE, que correspondería con la última llamada que se hace.

Para evitar esta incosistencia, debemos recurrir siempre a las funciones expresadas las cuales garantizan que su evaluación sigue el flujo lógico del programa:

```
if( myVar == true){
  var foo = function(){ return 'TRUE'; }
}else{
  var foo = function(){ return 'FALSE'; }
}
```

En este caso, el código anterior funcionaría como se espera independientemente del entorno en que se ejecute.

Conclusión
La forma correcta de definir una función varía según el comportamiento que esperemos de la misma: con las funciones declaradas, tenemos la seguridad de que siempre estarán disponibles en tiempo de ejecución. Con las funciones expresadas, tendremos que éstas no son evaluadas hasta que el intérprete no alcance su posición en el código, lo cual puede generar errores en arquitecturas muy anidadas.

Por otro lado, el hecho de que las funciones declarativas se evalúen antes que las expresiones, pueden producir comportamientos no deseados cuando forman parte de condicionales. Para estos casos, el uso de las expresiones garantiza que éstas formarán parte del flujo general del programa, lo cual puede evitarnos sorpresa en determinados entornos.

## Scope

### Qué es el Scope y cómo funciona el Global Scope

**Scope:** Es el alcance que va a tener una variable dentro del código. En otras palabras, el Scope se encargará de decidir a que bloques de código va a acceder una variable.

**Global Scope:**  No están dentro de funciones o bloques, por lo tanto se puede acceder a ellas de manera global.

- Con var podemos re-declarar una variable pero es una mala práctica.
- Con let y const no podemos, aparecerá un error.
- Es una mala práctica crear una variable sin las palabras reservadas: var, let y const. Si se asigna una variable dentro de una función sin las palabras reservadas será una variable global.
- La doble asignación de una variable también es una mala práctica.

**Declarar** una variable es cuando creamos la referencia de la variable en memoria y lo podemos hacer sin inicializar o asignar un valor, ejemplo:

```
let foo
```

Ahora asignar o inicializar una variable es cuando almacenamos un valor a esa reserva en memoria

```
foo = 1
```

Reasignar es reemplazar el valor de la variable en memoria.

```
// teniendo en cuenta qué antes valia 1  y que fue declarado con let
foo = 2
```

Ahora redeclarar sería usar let y el mismo nombre de la referencia en memoria

```
let foo
foo = 1
console.log(foo) // 1
foo = 2
console.log(foo)	// 2
let foo = 3 // SyntaxError: Identifier 'foo' has already been declared
```

El uso de **let** controla que no se pueda redeclarar una variable del mismo block scope pero si permite reasignar un valor.

Ejemplo : Se pueden usar dos variables con el mismo nombre usando let con block scope diferentes

```
let foo = 'test'

const anotherFunction = () => {
    let foo = 'other test'
    console.log(foo)
}
console.log(test) // test
anotherFunction() //other test
```

Hace poco dí una charla de inmutabilidad que les puede servir para conocer un poco mas del comportamiento de las variables en memoria [Inmutabilidad](https://youtu.be/-QU7JcwMkz8)

## Local Scope and lexical scope

- El Local Scope: se refiere a la variable o funcion que esta dentro de un bloque o funcion especifica. Solo se pueden acceder a ellas (ejecutar o llamar) dentro del entorno en donde conviven.

- El ambito lexico: se refiere a que una funcion puede acceder a una funcion o variable fuera de ella. Cada nivel interno puede acceder a sus niveles externos hasta poder alcanzarlas.


```
  //Retirar la declaracion de scope desde el nivel mas interno y observar el ambito léxico

  const scope = "I'm global";
  
  const func1 = () => {
    const scope = "I'm local 1";
    const func2 = () => {
      const scope = "I'm local 2";
      const func3 = () => {
        const scope = "I'm local 3";
        console.log(scope);
      }
      func3();
    }
    func2();
  }
  func1();
```



### function scope

```
// con este ejemplo estamos accediendo a una variable local dentro de una funcion

const fruits = () => {
  var fruit = 'Apple';
  console.log(fruit);
};

fruits();

//desde el entorno global no podemos acceder a una variable que fue definida en el entorno local de una funcion.

console.log(fruit); //Uncaught ReferenceError: fruit is not defined

const anotherFuncion = () => {
  var x = 1;
  var x = 2;
  let y = 1;
  
  // las variables declaradas con let o con const, no pueden ser declaradas nuevamente.
  //dentro del mismo ambito, como es el caso de la variabl y.

  //let y = 2; // Uncaught SyntaxError: Identifier 'y' has already been declared

  console.log(x);
  console.log(y);
}

anotherFuncion();

```

### block scope


```

const someFunction = () => {
  //function scope

  if(true){
    //Block scope
  }
}

```    

## Closures

### ¿Qué es un closure?

Una clausura o closure es una función que guarda referencias del estado adyacente (ámbito léxico). En otras palabras, una clausura permite acceder al ámbito de una función exterior desde una función interior. En JavaScript, las clausuras se crean cada vez que una función es llamada

    // Sin closure

    const moneyBox = (coins) => {
        var saveCoins = 0
        saveCoins += coins
        console.log(`MoneyBox: $${saveCoins}`)
    }

    moneyBox(5) //
    moneyBox(10) //10
    //El valor de savecoins no se acumula



    //Con closure

    const moneyBox = () => {
        let saveCoins = 0
        const countCoins = (coins) => {
    	    saveCoins += coins
    	    console.log(`$${saveCoins}`)
        }
        return countCoins
    }

    const saveMyMoney = moneyBox()
    saveMyMoney(5) // 5
    saveMyMoney(10) // 15

### Ámbito léxico en closures

El ámbito léxico es cuando las funciones se ejecutan utilizando la cadena del alcance donde estaban vigente en su momento. Esto significa que podemos acceder al valor “count” dentro de la función porque es el alcance donde está asignado.

    const increment = (i) => {
        let count = i

        const displayIncrement = () => {
    	    count++
    	    console.log(count)
        }
         return displayIncrement
    }

    const myCount = increment(1)
    myCount() // 2
    myCount() // 3
    myCount() // 4


    const myOtherCount = increment(10)
    myOtherCount() // 11
    myOtherCount() // 12
    myOtherCount() // 13

    myCount() // 5
    myOtherCount() // 14

### Cómo crear variables privadas con closures

Variables privadas con Closures: JS por su naturaleza no fomenta el uso de datos privados pero por medio de los Closures podemos crear valores que solo puedan ser accedidos por medio de métodos, que no van a estar disponibles fuera de esta función.

    const person = () => {
        let saveName = "Name";
        return {
          getName: () => saveName,
          setName: (name) => {
    	      saveName = name;
          },
        };
      };

      const newPerson = person();
      console.log(newPerson.getName()); // Name
      newPerson.setName('Cosmos');
      console.log(newPerson.getName()); // Cosmos

## hoisting

### ¿Qué es el hoisting?

El ‘levantamiento’ del que hablan es mas a fines didácticos y está bien, pero no es tan así, no es que FISICAMENTE levanta las declaraciones y las pone al principio como muchos explican. Lo que se hace en realidad es tomar ‘registros’ en memoria de donde está cada declaración(todo esto previo a que se ejecute el código en sí) y depende si es var, let, const o una función, JS va a asignarle referencias a cada una.
Si es:

var : asigna la referencia undefined (si de acá viene el famoso undefined)

let/const: asigna la referencia uninitialized(declarado pero no inicializado)

función: guarda un registro con la función entera(por eso la podemos llamar antes de que este creada)

    a = 2
    var a
    console.log(a) // 2 por hoisting la declaración se eleva a la parte superior


    console.log(a) //undefined
    var a = 2



    saludar() // Hello World!!!
    function saludar(){
        console.log('Hello World!!!')
    }


Las funciones se declaran antes que las variables en el hoisting


## Coerción

Coerción es la forma en la que podemos cambiar un tipo de valor a otro, existen dos tipos de coerción:

**Coerción implícita** = es cuando el lenguaje nos ayuda a cambiar el tipo de valor.

**Coerción explicita** = es cuando obligamos a que cambie el tipo de valor.
