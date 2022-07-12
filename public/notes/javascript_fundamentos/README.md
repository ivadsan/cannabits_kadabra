[//]: # @param group $$ JavaScript
[//]: # @param title $$ Fundamentos de JavaScript
[//]: # @param author $$ Iván D. Sánchez


# Fundamentos de JavaScript

## Tipos de datos primitivos

Es un tipo de dato básico

No poseén métodos ni propiedades

Son datos que no son un objeto

Son inmutables

- Strings
- number
- null
- boolean
- undefined
- Symbol



Strings, number y boolean funcionan con Object Wrapper para acceder temporalmente a sus métodos y atributos

Aunque null tiene un typeof  object este es un bug de JavaScript ya que no es un objeto

Los Symbol permiten instanciar valores únicos

bigint es un nuevo tipo de dato primitivo, son solo operables entre ellos mismos, se debe indicar al final de un valor numérico con una n para indicar que es de tipo bigint

Lo que no sea un tipo de dato primitivo es un objeto

- Arrays
- Funciones (typeof function)
- Fechas
- Expresiones regulares
