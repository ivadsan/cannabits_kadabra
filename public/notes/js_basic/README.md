# Introducción Js

## Variables

Let y Const son palabras reservadas utilizadas para declarar variables

let -> Inicializar y reasignar
let -> Se puede declarar sin inicializar
const -> no se puede reasignar y debe tener un valor inicial

## tipos de datos

undefined es un tipo de dato
string
number no discrimina entre enteros, negativo o flotantes, todos son numbers
bigint es un nuevo tipo de dato de JS, se debe declarar de la forma BigInt(here_number)
boolean
null es un tipo de dato pero js lo tipa como objeto por un error de implementación inicial del lenguaje, los tipos de datos son representados por tags y null es igual a 000 lo mismo que el tag utilizado para identificar objetos a nivel binario.
symbol cada symbol es unico no hay dos iguales -> Ejm const symbolEjm = Symbol(7)

## Operadores

- Los operadores como typeof, delete, y void tienen una sintaxis especial que permite que trabajen sin los paréntesis de función

## Objetos

Es una colección de propiedades y una propiedad es una asociacion llave-valor

Una de las formas de ver un objeto por consola es console.table(objeto)

para eliminar una propiedad delete objeto.propiedad

para que un objeto no pueda agregar nuevas propiedad ni modificar los valores de las existentes
