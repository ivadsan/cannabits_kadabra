[//]: # @param group $$ DevTools
[//]: # @param title $$ Chrome - DevTools
[//]: # @param author $$ Iván D. Sánchez

# DevTools

## Elementos y estilos

### Editando HTML

- Podemos mover los nodos desde el DOM
- Podemos buscar clases y o palabras especificas desde el DOM con cmd + f desde la sección de elementos

### Editando CSS

- Podemos acceder a la paleta de colores, el gotero para obtener un color específico del documento, también podemos acceder a la paleta de colores sugerida de Materialize y tambien guardar los colores usados en el sitio para tener rápido acceso.

- Podemos generar sombrar desde los estilos, en caso que no aparezcan los tres puntos en la seccion de estilos podemos hacer un hack agregando la siguiente propiedad y valor: box-shadow o text shadow y 0 0 0 black, para luego acceder al asistente de sombrar que apareceran en el valor del atributo.

### Animaciones

- En la parte de menú de tu devtools, tengo que ir a más herramientas “More Tools”, y ahí buscar por Animaciones.
- Podemos modificar y ver el timeline en vivo de como se comporta nuestra animación

### Como medir código que no ocupamos

- Desde la sección de “Coverage” yo puedo tener visibilidad del código que está en mi proyecto, pero no es necesario porque no lo utilizo.
- Coverage lo encontramos en more tools, este identifica el código de la página en la que estemos posicionados

### JavaScript y el DOM

- Si seleccionamos un nodo desde el DOM, podemos ir a la consola y llamarlo con 0$, luego podemos hacer click derecho sobre el nodo y copiar el JS path para que nos genere el query selector para inicializar el nodo en una variable.

### DevTools como editor IDE

- Directamente desde la sección de sources seleccionamos “Filesystem” y “agregar un folder a mi espacio de trabajo

## Mobile Simulation

### Simular una ventana móvil

Desde acá podemos

- Simular diferenctes tipos de viewport segun dispositivo
- Crear viewport custom
- En caso de estar desarrollando con services workers podemos trabajar offline para ver como funcionan
- Podemos simular conexiones a diferentes tipos de velocidades
- Determinar si trabajamos con pantallas touch o no touch
- Definir densidad del pixel
- Agregar reglas para medir tamaño de componentes en el viewport
- Algunos dispositivos cuentas con una mascara para simular en pantalla la forma del celular (show device frame)

### Manejo de sensores

- Se habilita desde more tools -> sensors
- Se puede simular geolocalizacion y posición del celular
- Simulacion de estados del dipositivo: blockeado, inactivo, activo

## JavaScript

- Desde source es posible debuggear un evento, desde event listener breackpoints podemos capturar un evento y comenzar a avanzar paso a paso para ver como se desarrolla la ejecución del script
- Desde watch podemos haver validaciones de la ejecución del código, al igual que en local podemos ir viendo las inicializaciones de la variables

## Network

- Verificamos la descarga de assets, scripts, envio y respuesta de request, trae tiempo del request, tamaño minificado y sin minificar, code status de la petición
- En network podemos obtener los screenshots de como se esta pintando en el tiempo la app
- Podemos agregar la columna dominio para conocer el origen de la petición
- Podemos agregar en los settings ver request largo para ver toda la url del request
- Cmd + shift + p -> Show network request blocking podemos bloquear archivos previamente al request para debuggear

## Performance

- Desde aca podemos parametrizar el tipo de conexión a la red, comportamiento del CPU, deshabilitar JS,
- Grabar comportamiento de la pagina para detectar areas de oportunidad

## Audits

- Desde lighthouse podemos hacer pruebas de buenas prácticas, SEO, performances, PWA, simulando un dipositivo movil o de escritorio
- El informe que resulta viene con areas de oportunidad de mejorar, para optimizar la experiencia de la aplicación.

## Test

1. ¿Cómo podría visualizar la paleta de colores que mi proyecto está utilizando?

_Desde la sección de estilos, al tener un elemento que tenga aplicado algún color, dándole clic al cuadro de color que aparece ahí, tendremos la opción de Page colors que hace referencia a la paleta de colores del proyecto._

2. ¿Donde puedo ver si mis elementos de HTML tienen algún estado de CSS?

_Desde la sección de estilos, en el icono de :hov_

3. ¿De qué forma puedo buscar palabras específicas en mi documento html, desde el inspector de elementos?

_Presionando “comand/ctrl + F” desde la casilla de Elements_

4. ¿Qué tipo de interacción podemos tener en la sección de Elements?

_Manipulación de nuestro HTML._

5. ¿Cuáles son los navegadores que tienen herramientas para desarrolladores?

_Todos los navegadores tienen herramientas para desarrolladores._

6. ¿Cuál es la forma más rápida de generar sombras a mis elementos de html?

_Desde la sección de estilos, al momento de estar modificando los estilos de algún elemento, tendremos un icono de 3 puntos que hace referencia a un menú, ahí encontraremos la opción para poder agregar sombras a elementos y texto._

7. Si yo NO tengo la sección de Animación en mi DevTools, ¿Cómo puedo visualizarla?

_En la parte de menú de tu devtools, tengo que ir a más herramientas “More Tools”, y ahí buscar por Animaciones._

8. ¿Cuál es la sección en la que puedo tener visibilidad del todo el código que no estoy utilizando en un proyecto?

_Desde la sección de “Coverage” yo puedo tener visibilidad del código que está en mi proyecto, pero no es necesario porque no lo utilizo._

9. ¿Para qué puedo utilizar el $0 en la consola de DevTools?

_Me sirve para ver cual es el elemento de HTML que estoy seleccionando._

10. ¿Qué es el JS Path que obtenemos de cada elementos de HTML?

_Es la selección que hacemos a un nodo o elemento del DOM específico con JS_

11. ¿Cómo podría cargar mi proyecto desde local, para comenzar a guardar los cambios desde DevTools?

_Directamente desde la sección de sources seleccionamos “Filesystem” y “agregar un folder a mi espacio de trabajo”_

12. ¿Si en mi proyecto estoy utilizando un preprocesador de css como “Stylus”, y utilizo DevTools como IDE, puedo seguir trabajando desde ahí con Stylus?

_No, de momento Chrome DevTools, solo entiende Sass._

13. ¿Cuáles son las estrategias que existen para poder trabajar proyectos responsive?

_Por viewport de dispositivo, o por diseño._

14. Si tengo un error en mi código que se dispara al momento de mandar llamar una función que está ligada a un botón, ¿cómo podría llegar a esa función para comenzar a debuggear el código?

_Tendríamos que comenzar con el evento de click en ese botón._

15. ¿Para qué utilizamos “Network” en DevTools?

_Esto nos sirve para poder ver ¿qué archivos y assets se están descargando, el estatus, el peso y tiempo de descarga de los mismos?_
