[//]: # @param group $$ Front-end
[//]: # @param title $$ Curso de Frontend Developer
[//]: # @param author $$ Iván D. Sánchez

# Curso de Frontend Developer

## ¿Qué es HTML y CSS? ¿Para qué sirven?

¿Qué es HTML?
El Lenguaje de Marcado de Hipertexto o HTML por sus siglas en inglés (HyperText Markup Language) es el código para construir la estructura de una página web.

¿Qué es CSS?
El lenguaje de Hojas de Estilos en Cascada o CSS por sus siglas en inglés (Cascade Style Sheets) es el código para describir la presentación de los elementos de la página web, los que definimos con HTML.

## Motores de render: de archivos a píxeles

Los motores de renderizado son programas que traducen nuestro código en un lenguaje que entienda el navegador, de esta manera el programa sabrá que es lo que tiene que mostrar por pantalla al usuario.

### ¿Cuáles son los motores del navegador?

Los navegadores tienen sus propios motores: Chrome - Blink, Edge - Edge HTML, Safari - Webkit y Firefox - Gecko. Todos realizan esta compilación de manera diferente, pero con el mismo resultado, es decir, convierten los archivos a píxeles.

### Proceso de renderizado del motor del navegador

El motor del navegador realiza 5 pasos o procesos para compilar nuestro código hasta el renderizado por pantalla. Estos pasos son los siguientes:

1. Transforma los archivos a un árbol de objetos HTML o CSS, estos se denominan DOM (Document Object Model) y CSSDOM (Cascade Style Sheet Object Model), respectivamente. Cada nodo en el árbol es una representación de los elementos que contiene el archivo HTML o CSS.
2. Calcula el estilo correspondiente a cada nodo del DOM relacionado al CSSDOM.
3. Calcula las dimensiones de cada nodo y dónde va en la pantalla.
4. Pinta o renderiza los diferentes elementos como cajas o contenedores.
5. Agrupa todas las cajas en diferentes capas para convertirlas en una imagen que se renderiza en pantalla.

## Maquetación con HTML

### Etiquetas de HTML más usadas

https://htmlreference.io/

## Maquetación con CSS

### Selectores básicos

- Selector universal
- Selector de etiqueta
- Selector de clase
- Selector de Id

### Combinadores

```
<style>
    /*

    Descendente:  Todos los hijos del padre sin importar la profundidad

    */

    div p {
    color: blue;
    }

    /*

    Hijo directo: Todos los hijos directos del padre.

    */

    div > p {
    background-color: red;
    }

    /*

    Hermano adycente: solo el hermano inmediatanmente al lado en la misma jerarquía
    */


    div + p {
    font-weight: 700;
    }

    /*

    Hermanos generales:  Todos los hermanos en la misma jerarquia sin importar si son adyacentes

    */

    div ~ p {
    color: green;
    }
</style>

```

### Tipos de selectores: pseudoclases y pseudoelementos

Las pseudoclases nos permite llegar a aquellas acciones que hace el usuario.

:active
:focus
:hover
:nth-child(n)
Los pseudoelementos nos permiten acceder a elementos de HTML que no son accesibles con los selectores ya vistos.

::after
::before
::first-letter
::placeholder
La pseudoclase se escribe con : y los pseudoelementos se escriben con ::



### Cascada y especificidad en CSS

#### Cascada

A un nivel muy simple, esto significa que el orden de las reglas CSS importa; cuando se aplican dos reglas que tienen igual especificidad, la que viene en último lugar en el CSS es la que se utilizará.


#### Especificidad

La especificidad es el medio por el que los navegadores deciden qué valores de propiedades CSS son los más relevantes para un elemento y, por tanto, se aplicarán. La especificidad se basa en las reglas de concordancia que se componen de diferentes tipos de selectores CSS.
La cantidad de especificidad que tiene un selector se mide utilizando cuatro valores diferentes (o componentes), que se pueden considerar como miles, cientos, decenas y unos

Miles
Puntúa uno en esta columna si la declaración está dentro de un atributo style, también conocido como estilos en línea. Estas declaraciones no tienen selectores, por lo que su especificidad es siempre 1000.

Cientos

Puntúa uno en esta columna por cada selector de ID contenido dentro del selector general.

Decenas

Puntúa uno en esta columna por cada selector de clase, selector de atributos o pseudoclase que contenga el selector general.

Unos

Puntúa uno en esta columna por cada selector de elemento o pseudo-elemento contenido dentro del selector general.

!important cambia la forma en que la cascada funciona normalmente, por lo que puede hacer que la depuración de los problemas de CSS sea realmente difícil de resolver, especialmente en una hoja de estilos grande.

No lo uses si puedes evitarlo.

La única manera de anular esta declaración !important sería incluir otra declaración !important en una declaración con la misma especificidad más adelante en el orden de las fuentes, o una con mayor especificidad.


La especificidad de !importan es 10000 y del selector universal es 0


### Tipos de display más usados: block, inline e inline-block

#### display: block

El display block **establece que un elemento ocupará todo el espacio disponible por defecto y el siguiente elemento a este se situará por debajo.

Es posible añadir medidas de anchura width y altura height a estos a elementos.

También es posible agregar todas las propiedades del modelo de caja

#### display: inline

El display inline establece que un elemento ocupará el espacio del contenido del mismo y el siguiente elemento se situará a la derecha.

No es posible añadir medidas de anchura width y altura height a estos a elementos.

También, no es posible agregar todas las propiedades del modelo de caja, únicamente funcionará la propiedad margin en el eje horizontal


#### display: inline-block

El display inline-block combina las ventajas de bloque de colocar medidas al elemento y propiedades del modelo de caja correctamente; con las ventajas de inline de colocar un elemento seguido de otro en el mismo espacio.

Si elemento excede el contenido total, se coloca en la siguiente línea por debajo.


#### display: null

El display none desactiva la visualización de un elemento, como si el elemento no existiera.
