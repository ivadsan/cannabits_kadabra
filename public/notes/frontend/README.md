[//]: # @param group $$ Front-end
[//]: # @param title $$ Curso de Frontend Developer
[//]: # @param author $$ Iván D. Sánchez

# Curso de Frontend Developer

## ¿Qué es HTML y CSS? ¿Para qué sirven?

### ¿Qué es HTML?

El Lenguaje de Marcado de Hipertexto o HTML por sus siglas en inglés (HyperText Markup Language) es el código para construir la estructura de una página web.

### ¿Qué es CSS?

El lenguaje de Hojas de Estilos en Cascada o CSS por sus siglas en inglés (Cascade Style Sheets) es el código para describir la presentación de los elementos de la página web, los que definimos con HTML.

## Motores de render: de archivos a píxeles

Los motores de renderizado son programas que traducen nuestro código en un lenguaje que entienda el navegador, de esta manera el programa sabrá que es lo que tiene que mostrar por pantalla al usuario.

### ¿Cuáles son los motores del navegador?

Los navegadores tienen sus propios motores: 
* Chrome - Blink 
* Edge - Edge HTML 
* Safari - Webkit 
* Firefox - Gecko 

Todos realizan esta compilación de manera diferente, pero con el mismo resultado, es decir, convierten los archivos a píxeles.

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

Las **pseudoclases** nos permite llegar a aquellas acciones que hace el usuario.

- :active
- :focus
- :hover
- :nth-child(n)

Los **pseudoelementos** nos permiten acceder a elementos de HTML que no son accesibles con los selectores ya vistos.

- ::after
- ::before
- ::first-letter
- ::placeholder

*La pseudoclase se escribe con : y los pseudoelementos se escriben con ::*


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


### Tipos de display más usados: flexbox y CSS grid


### Modelo de caja

### Colapso de márgenes

Si posicionamos un elemento de bloque sobre otro elemento de bloque las márgenes verticales se solapan, esto no ocurre si los elementos se encuentran dentro de un contenedor con displey flex o grid.

### Posicionamiento en CSS

stikcy: El elemento se mantiene sticky hasta que el ultimo de sus hermanos lo haya alcanzado o si no hay scroll vertical

### Z-index y el contexto de apilamiento

### Unidades de medida


Las unidades de medida establecen una longitud para un determinado elemento o tipografía. Existen dos tipos de medidas: absolutas y relativas.

Medidas absolutas y relativas
Qué son las medidas absolutas
Las medidas absolutas son valores fijos, por lo que la medida no cambiará. La unidad absoluta más utilizada son los píxeles px, las demás son muy poco utilizadas, pero es bueno que las conozcas.

Unidad	Nombre	Equivalencia
px	píxeles	1 px = 1/96 in
cm	centímetros	1 cm = 96/2.54 px
mm	milímetros	1 mm = 1/10 cm
Q	cuartos de milímetros	1 Q = 1/4 mm
in	pulgadas	1 in = 2.54 cm = 96 px
pc	picas	1 pc = 1/6 in
pt	puntos	1 pt = 1/72 in
Qué son las medidas relativas
Las medidas relativas son valores variables, por lo que la medida depende de un valor externo. Se debe tener en cuidado con estas porque un pequeño cambio puede desencadenar tamaños muy elevados.

Unidad	Depende de
em	el elemento que lo contiene
rem	el elemento raíz
vw	1% del ancho de la pantalla (view width)
vh	1% de la altura de la pantalla (view height)
vmin	1% de la dimensión más pequeña de la pantalla
vman	1% de la dimensión más grande de la pantalla
ch	anchura del caracter “0” del elemento que lo contiene
lh	altura de la línea del elemento que lo contiene
Diferencia entre rem y em
La medida em depende del elemento que lo contiene, es decir, si un elemento tiene font-size de 20px, el valor de em es igual a 20px, el valor de 2em será de 40px y así sucesivamente.

La medida rem depende del elemento raíz, el valor del font-size del elemento raíz es de 16px, por lo tanto, el valor de 2rem es igual a 32px, y así sucesivamente.

Ejemplo de medida em
En las herramientas del desarrollador, te muestra el tamaño de la fuente (font) en píxeles.

Medida absoluta en las herramientas de desarrollador
Ejemplo de medida rem
Diferencia entre porcentajes y la anchura y altura de la pantalla
Los porcentajes representan el tamaño con respecto al total del elemento padre. Si el elemento padre tiene 20px, entonces el 100% será de 20px.

Por otra parte, las medidas de anchura vw y altura vh representan el tamaño con respecto al total de la pantalla. Si el elemento tiene un tamaño de 100vw será el 100 por ciento de la pantalla.

Si un elemento tiene todo el tamaño de la pantalla, entonces solamente en ese punto la medida 100% será igual a 100vw o 100vh.

Problema con las medidas de texto
Los navegadores tienen una opción para cambiar el tamaño del texto. Con medidas absolutas, el tamaño de la letra no cambiará, por lo que será un problema para el usuario.

Con medidas relativas, el tamaño cambiará con respecto a la fuente del elemento raíz. Por lo que estas son una buena opción para solucionar este problema de accesibilidad, en específico la medida rem.

Sin embargo, la medida rem equivale a 16px y puede ser confuso mientras utilices valores altos. Por lo que vamos a cambiar el valor del elemento de la raíz para que la medida rem sea igual a 10px.

En la etiqueta <html> cambia el valor de la propiedad font-size a 62.5%, resultado de una regla de tres: si 16px es igual al 100% entonces cuál será el porcentaje para 10px.

html {
    font-size: 62.5%;
}
Con este cambio, la medida rem será igual a 10px, ahora los puedes utilizar sin problema y tus textos cambiarán según las preferencias de usuario.


### ¿Qué son las arquitecturas CSS? ¿Para qué sirven?

Objetivos de las arquitecturas de CSS
Los objetivos de las arquitecturas de CSS son:

Ser predecible: el código debe ser lo menos complejo posible.
Reutilizable: el código debe ser lo menos redundante, para evitar problemas con la especificidad.
Mantenible: el código debe ser lo más fácil de manejar para añadir o quitar estilos.
Escalable: el código debe ser capaz de crecer.
Buenas prácticas de las arquitecturas de CSS
Las buenas prácticas de las arquitecturas de CSS son:

Lineamientos y estándares: definir normas en tu grupo de trabajo de cómo estará escrito el código.
Documentación: establecer una breve explicación del código y de los lineamientos, esto sirve especialmente para nuevas personas se familiaricen con lo que deben hacer.
Componentes: establecer de manera componetizada cada uno de los elementos de tu página, es decir, manejarlos por partes para después unirlos en un todo.

### Variables en CSS

En CSS, llamamos variables a las propiedades personalizadas.
Contienen valores específicos que se pueden reutilizar muchas veces en un documento.

Se establecen mediante la notación de dos guiones

--nombre-variable: valor;
Se acceden mediante la función var()

propiedad: var(--nombre-variable);
Normalmente las declaramos dentro del selector :root para que su alcance (scope) sea global.

Nuestro proyecto quedaría así:

:root {
            --black:#000000;
            --white: #FFFFFF;
            --very-light-pink: #C7C7C7;
            --text-input-field: #F7F7F7;
            --dark: #232830;
            --hospital-green: #ACD9B2;
        }


### Atributo place-items (grid - flexbox)


El atributo place-items resume los atributos align-items y justify-items en uno solo. Cuando recibe un solo valor entonces lo repite para instanciar las dos propiedades. Ejemplo

```
place-items: center;

# Equivale a

align-items: center;
justify-items: center;
```

```
place-items center end;

# Equivale a

align-items: center;
justify-items: end;

```

En contenedores grid toma el valor de ambos atributos, en contenedores flexbox solo tiene efecto sobre align-items, si se pasa un segundo valor a la propiedad este se ignora


### object-fit (img)

contain
El contenido reemplazado está dimensionado para mantener su relación de aspecto mientras se ajusta dentro del cuadro de contenido del elemento: su tamaño de objeto concreto se resuelve como una restricción de contenido contra el ancho y la altura utilizados del elemento.
cover
El contenido reemplazado se dimensiona para mantener su relación de aspecto mientras llena el cuadro de contenido completo del elemento. Si la relación de aspecto del objeto no coincide con la relación de aspecto de su caja, entonces el objeto se recortará para que se ajuste.
fill
Modifica el tamaño del elemento remplazado para llenar el cuadro de contenido. El objeto completo ocupará todo el espacio de la caja. Si el tamaño del elemento no concuerda con el de su caja, se estirará para llenarlo.
none
El contenido reemplazado no se redimensiona.
scale-down
El contenido se dimensiona como si none o contain estuvieran especificados, lo que resultaría en un tamaño de objeto concreto más pequeño.
