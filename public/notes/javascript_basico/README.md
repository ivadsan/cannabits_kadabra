[//]: # @param group $$ JavaScript
[//]: # @param title $$ 01- Javascript Básico
[//]: # @param author $$ Iván D. Sánchez

# JavaScript básico


## Introducción a JavaScript

### ¿Qué es JavaScript?

- Lenguaje interpretado
- Debilmente tipado 
- Orientado a objetos
- Dinámico


Aunque se podría decir que JavaScript es un lenguaje interpretado, ya que pareciera que los scripts se ejecutan directamente durante el runtime no es así, previamente cada script es parseado en un AST (Abstrac Syntax Tree), que luego es transformado a Bytecode (compilación a lenguaje de máquina) para luego ser interpretado por el navegador.


Javascript es un lenguaje backward compatible, osea que cuando aparece un nuevo feature este no está disponible en la nueva versión sino que requiere ser transpilado a una versión standard anterior que es compatible con los navegadores.


### Funciones declaradas VS Funciones expresadas en Javascript

http://www.etnassoft.com/2011/09/02/funciones-declaradas-vs-funciones-expresadas-en-javascript/

Introducción
Durante la última reunión del Grupo MadridJS, ha surgido un tema muy interesante en el que no había reparado anteriormente: qué diferencias existen entre crear una función mediante la notación tradicional (declarativas) o a través de una expresión. Un ejemplo de cada una de estas formas sería:

// FunctionDeclaration
function foo(){
  // Some code goes here...
}
 
// FunctionExpression
var foo = function(){
  // Some code goes here...
}
Otra forma de función expresada menos obvia que las anteriores es el caso de las funciones autoejecutables:

(function foo(){})(); // FunctionExpression
Esto es así porque el primer par de paréntesis crean de nuevo una expresión que luego se encarga de ejecutar el segundo.

A modo de resumen, tendríamos el siguiente cuadro:

  function foo(){} // declaration, since it's part of a Program
  var bar = function foo(){}; // expression, since it's part of an AssignmentExpression
 
  new function bar(){}; // expression, since it's part of a NewExpression
 
  (function(){
    function bar(){} // declaration, since it's part of a FunctionBody
  })();

Parecidas, pero no iguales.
La duda vino en un primer momento cuando nos preguntamos si existían diferencias de rendimiento a la hora de crearlas de una u otra forma. Sin embargo, cuando investigamos un poco sobre el tema, encontramos que ambas se comportaban de una forma diferente dependiendo del patrón empleado.

La diferencia principal radica en que mientras la primera es una declaración que forma parte de un programa global, la segunda es una expresión que forma parte de un punto concreto (y de una closure). Esto determina, como veremos a continuación, en qué momento ambas instrucciones son evaluadas por Javascript y cuándo pasan a estar disponibles en tiempo de ejecución.

Dicho esto, tenemos que las funciones declaradas son evaluadas antes que cualquier otra expresión. Incluso si la declaración se encuentra al final de todo un código fuente, ésta tendrá preferencia sobre aquellas expresiones que la precedan. El siguiente ejemplo muestra como el alert devuelve el resultado de una función declarada aunque ésta se defina más adelante:

alert( add( 3, 5 ) ); // 8
 
function add( x, y ){
  return x + y;
}
NOTA: Por alguna razón, el código anterior no funciona si se introduce directamente en la consola de Firebug; al menos en mi versión da error. No es la primera vez que me encuentro con que la consola no acepta un código válido así que para estos casos, me paso temporalmente a Chrome o al servicio online JSFiddle.

Sin embargo, si tratamos con funciones expresadas, éstas solo son evaluadas cuando el flujo natural de ejecución las alcanza. El siguiente código mostrará error ya que en el momento de llamar a la función, el intérprete aún no ha llegado a ella para evaluarla:

alert( add( 3, 5 ) ); // ErrorType: add is not defined
 
var add = function( x, y ){
  return x + y;
}
No funcionaría tampoco nombrar a la función con el mismo nombre de su expresión; el resultado continúa siendo el mismo ya que no cambiamos con ello su tipología:

alert( add( 3, 5 ) ); // ErrorType: add is not defined
 
var add = function add( x, y ){
  return x + y;
}
Declaraciones en diferentes entornos
A raíz de lo anterior, un factor a tener en cuenta es que, en determinados entornos, las funciones declarativas no se comportan de un modo estándar. Por ejemplo, si necesitamos crear una función en base a un condicional, nunca debemos utilizar las funciones declarativas. Veámos el siguiente código:

if( myVar == true){
  function foo(){ return 'TRUE'; }
}else{
  function foo(){ return 'FALSE'; }
}
Como la función es creada antes que se evalúe el código, en algunos navegadores podemos encontrarnos con que nos saltamos los condicionales y se asigna a la función foo siempre el valor FALSE, que correspondería con la última llamada que se hace.

Para evitar esta incosistencia, debemos recurrir siempre a las funciones expresadas las cuales garantizan que su evaluación sigue el flujo lógico del programa:

if( myVar == true){
  var foo = function(){ return 'TRUE'; }
}else{
  var foo = function(){ return 'FALSE'; }
}
En este caso, el código anterior funcionaría como se espera independientemente del entorno en que se ejecute.

Conclusión
La forma correcta de definir una función varía según el comportamiento que esperemos de la misma: con las funciones declaradas, tenemos la seguridad de que siempre estarán disponibles en tiempo de ejecución. Con las funciones expresadas, tendremos que éstas no son evaluadas hasta que el intérprete no alcance su posición en el código, lo cual puede generar errores en arquitecturas muy anidadas.

Por otro lado, el hecho de que las funciones declarativas se evalúen antes que las expresiones, pueden producir comportamientos no deseados cuando forman parte de condicionales. Para estos casos, el uso de las expresiones garantiza que éstas formarán parte del flujo general del programa, lo cual puede evitarnos sorpresa en determinados entornos.
