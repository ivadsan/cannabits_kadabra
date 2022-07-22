[//]: # @param group $$ JavaScript
[//]: # @param title $$ use strict
[//]: # @param author $$ Iván D. Sánchez


# use strict

Es una instrucción dirigida el interpreta de Javascript. Le indica que el código que sigue a continuación está en modo estricto , cambiando q la manera en que se ejecutan algunas instrucciones.

En modo estricto estamos mas restringidos, convierte malas prácticas de codificación en errores, lo que obliga a corregir antes de salir a producción.


Lo constrario 'strict mode' es el 'sloppy mode' o modo descuidado.

use strict nace de la versión de ES5 (2009)

Fue creada para evitar errores de codificación fáciles de cometer de versiones anteriores

Se habilita el modo estricto escribiendo como string en la primer línea de código 'use strict'

Se puede colocar al inicio de un programa o como primera instrucción de una  función, para indicar que solo esa función corre en modo estricto.

1- Corrige la CREACIÓN ACCIDENTAL DE VARIABLES GLOBALES

    'use strict'

    var name = 'Ivan'
    nme= 'dario' // error in strict mode

    console.log(nme)

2- Control de ATRIBUTOS DE SOLO LECTURA

    'use strict'

    const user = {}
    Object.defineProperty(user, 'name', {value: 'ivan', writable: false})
    user.name = 'dario' // error in strict mode

    console.log(user.name)

3- OBJETOS NO EXTENSIBLES (tampoco podemos agregar atributos a un valor primitivo)

    'use strict'

    const user = {name: 'ivan'}
    Object.preventExtensions(user)
    user.age = 38 // error in strict mode
    console.log(user)


    const name = 'ivan'
    name.lastname = 'sanchez' // error in strict mode
    console.log(name)

4- Control a PARAMETROS DUPLICADOS en una función


    'use strict'

    function greetings(name, lastname, name){ // error in strict mode
        console.log('hello ' + name + ' ' + lastname )
    }

    greetings('ivan', 'sanchez') // output: hello undefined sanchez

5- SISTEMA OCTAL

En versiones antiguas de JS estaba permitido escribir en sistema octal iniciando con un 0 en versiones modernas la forma correcta es 0o

    'use strict'
    console.log(011) // error strict mode
    console.log(0o011)

6- Errores con el operador DELETE, que sirve para eliminar propiedades de un objeto o elementos de un array retornando true o false si se eliminó o no.

No se puede usar para eliminar una variable, tampoco una función, tampoco el objeto global window. Usando 'use strict' convertimos en error el intento de eliminación de los antes mencionados       

    'use strict'

    const user = {name: 'ivan', age: 38}
    delete user.age

    console.log(user)


    const foo =  1
    delete foo // error strict mode
    console.log(foo)

7- arguments y eval son keywords en modo estricto

    'use strict'

    const eval = true // error strict mode
    const arguments = true // error strict mode

8- No se permite la instrucción 'with', que sirve para extender la cadena de scopes temporalmente

    'use strict'

    with(document.forms[0]){
        email.value = 'test email',
        pass.value = 'test pass'
    } // error strict mode

9- Palabras reservadas de nuevas o futuras caracteristicas de JS 

- class
- enum
- extends
- super
- const 
- export
- import

use strict

- implements
- package
- public
- interface 
- static
- private
- protected
- yield
- let


    'use strict'

    let package = 'test' // error strict mode
    let static  = 'test' // error strict mode

10-  FUNCIONES LIBRES (Sin dueños)

    const user = {
        name: 'ivan',
        greetings: function(){
            console.log('hello ' + this.name)
        }
    }

    user.greetings()

user es el dueño de la función greetings. En el caso de que copiemos la referencia de la función a una variable y la invoquemos, esta función se ejecuta como si fuera parte de window y no del objeto que la copiamos, ahora en window el this apunta a un name que no existem, esto en modo descuidado pero usando use strict, la funcion no tiene dueño y es libre, pero es como si quedara asignada a undefined.greetings() dando como error: que no podemos acceder a greetings de undefined


    'use strict'

    const user = {
        name: 'ivan',
        greetings: function(){
            console.log('hello ' + this.name)
        }
    }

    //user.greetings()

    const greetings = user.greetings
    greetings()


Notas:

- Cuando programas con módulos de EcmaScript 2015 estos ya vienen por defecto en modo estricto
- Las librerías y frameworks modernos como react, angular o vue ya vienen por defecto en modo estricto
- En el backend Deno ya viene en modo estricto por defecto
- En nodeJS no viene en modo estricto por defecto.



