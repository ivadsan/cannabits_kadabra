[//]: # @param group $$ Arquitectura de Software
[//]: # @param title $$ Introducción al curso de Fundamentos de Arquitectura de Software
[//]: # @param author $$ Iván D. Sánchez

# Introducción al curso de Fundamentos de Arquitectura de Software

En la arquitectura de software se habla de estructuras, modelos con diagramas, comunicación entre diferentes sistemas o incluso entre diferentes módulos del sistema.

## Etapas del proceso de desarrollo de software

El proceso de desarrollo tradicional tiene etapas muy marcadas, que tienen entradas, procesos y salidas que funcionan como entradas de la siguiente etapa.

**Análisis de requerimientos:** Todo nace de un disparador que nos crea la necesidad de crear un artefacto o un sistema. Necesitamos entender cuál es el problema que queremos resolver. Hay requerimientos de negocio, requerimientos funcionales, requerimientos no funcionales.

**Diseño de la solución:** Análisis profundo de los problemas para trabajar en conjunto y plantear posibles soluciones. El resultado de esto debe ser el detalle de la solución, a través de requerimientos, modelado, etc.

**Desarrollo y evolución:** Implementación de la solución, para garantizar que lo que se esta construyendo es lo que se espera. Al finalizar esta etapa tendremos un artefacto de software.

**Despliegue:** Aquí vamos a necesitar de infraestructura y de roles de operación para poder poner el artefacto a disponibilidad.

**Mantenimiento y evolución:** Desarrollo + despliegue + mantenimiento, en esta etapa estamos atentos a posible mejoras que se hacen al sistema. En esta etapa el software se mantiene hasta que el software ya deja de ser necesario

## Dificultades en el desarrollo de software

En la etapa de diseño y desarrollo estamos concentrados en encontrar cuáles son los problemas que queremos resolver. Estos problemas los podemos dividir en dos grandes tipos de problemas.

### Problemas Esenciales: Los podemos dividir en 4.

- **La complejidad:** El domino del problema es complejo.  cuándo lo que tenemos que resolver es complejo en si mismo, por ejemplo calcular la mejor ruta entre ciudades.

- **La conformidad:** En que contexto se va a usar y como tiene que adecuarse a ese contexto ejmplo: Calidad de la conexion de internet, calidad de la comunicación, 

- **tolerancia al cambio** -> que tan complicado es cambiarlo, que tanto cambia el problema que estamos solucionando y que tanto podemos adaptarnos al cambio. ejemplo: leyes tributarias.

- **Invisibilidad:** El software no es tangible y hace dificil entender su forma. su forma se expresa en código, infraestructura.

### Problemas Accidentales:

Está relacionado con la plataforma que vamos a implementar, tecnología, lenguajes, frameworks, integraciones, etc.

- **Lenguajes de alto nivel** -> Una de la dificultades mas grandes es la complejidad del lenguaje -> 
- **Multiprocesamiento** -> hilos de ejecución, el feedback de los problemas en el multiprocesamiento.
- **Entornos de programación** -> uso de librerarias, consumo de api, 

*Considero a la especificación, diseño y comprobación del concepto la parte dificil de hacer software.... si esto es cierto, hacer software será dificil. no existe la bala de plata. -> Frederick P Brooks*

**Como resolver las dificulates esenciales**

- **No desarrollar.** Si ya hay un programa existente mejor implementarlo, aprovechar el open source, 
- **Prototipado rápido** -> metodologia agiles, recibir feedback lo mas rapido posible, El feedback tarde es un peligro
- **El desarrollo evolutivo** > La creacion y acumulación de sistemas , resultados mas pequeños e irlos evolucionando.
- **Grandes diseñadores** -> saber abstraer un problema puntual y entender un problema mas general, que sepan diseñar una solucion elegante y simple, diseñar un sistema resuelva de la mejor forma el problema con software de calidad.

## Roles

Diferenciar el rol del puesto de trabajo, un funcionario puede tener mas de un rol

Es importante que diferenciemos el ROL del puesto de trabajo, hay roles que pueden ser desarrollados por la misma persona.

**Experto del dominio:** En una metodologia tradicional, es la persona a la que acudimos para entender las necesidades del negocio. En metodologias Agiles --> **stakeholders**(Partes interesadas).

**Analista: funcional/de negocio - Product Owner**, la persona responsable de definir los requerimientos que van a llevar al software a u buen puerto. En el caso de Agiles el dueño del producto es quien arma las historias y que nos acompaña en el proceso de construcción del software. En metodologías ágiles se pueden ir agregando historias a medida que se va desarrollando el proyecto.

**Administrador de sistemas / DevOps (Operaciones y desarrollos) / SRE Site Reliability engineer**: Es el rol de operaciones y desarrollo, son las personas responsables de la infraestructura que alojará nuestra aplicación. Las mejores empresas conectan la infraestructura al mundo del desarrollo

**QA / Testing - Equipo de desarrollo:** se encargan de la evaluación de nuestro software, comprobar que lo que se esta haciendo es lo que se espera que se haga. Desarrolladores involucrados en la construcción del software. Arquitecto, diseña la solución y analisis de los requerimientos, es un papel mas estrategico. La arquitectura emerja del trabajo de un equipo bien gestionado. Actualmente una empresa que implemente técnologias ágiles no tien específicamente un QA -Teste Desarrollador y arquitecto por aparte esto es de la metología tradicional, se espera que sea el equipo de desarrollo el desarrolle estos roles, que todo emerja de un equipo autogestionado.

**Gestor del proyecto / facilitador:** Llevan al equipo a través del proceso iterativo e incremental, entender lo que pasa con el equipo y motivar el avance en el desarrollo del producto. en scrum los facilitadores se les llama scrum masters


## ¿Qué es arquitectura de software?

La arquitectura de software es mas que modelos, plantea analisis fuertes sobre que hay que construir, cuales son los requerimiento y como el sistema los va a resolver.


- *La estructura del sistema, está compuesta por elementos de software, sus propiedades visibles y sus relaciones* 

Software Architecture in practice (Bass, Clemenst & Kazman 2003)

- *El conjunto de decisiones principales de diseño tomadas para el sistema* 
Software Architecture: Foundations, theory and practice (Taylor 2010)

- *La arquitectura se reduce a las cosas importantes, cualesquieran que sean*
Patterns of enterprise application architecture (Fowler 2002) -> concepto mas enfocado a las metodologias agiles y los equipos autogestionados. Es una actividad constante.

**Arquitectura de aplicación** -> es la modelación de alguna utilidad o pieza de software

## La importancia de la comunicación - Ley de Conway

En un primer momento  cuando tenemos claro lo que tenemos que hacer armamos un equipos de trabajo

- Se compone de un product owner, un arquitecto de software el cual va a armar un equipo de trabajo inicial
- Este grupo debe estar delimitado en función del desarrollo de un objetivo especifico
- A medida que el producto crece se debe conformar grupos de trabajo por separado segun objetivos, funciones distribuidas o con otra responsabilidad dentro del desarrollo, también pueden aparecer otros roles de liderazgo o gestores de proyecto.
- Estos otros roles de liderazgo va a generar nuevas necesidades de comunicación
- Ahora los equipos se pueden comunicar entre ellos y podemos crear una via formal de comunicacion 
- A medida que va creciendo el producto, vamos separando las responsabilidades por equipos y vamos construyendo una Estructura de comunicación distribuida

- Una empresa u organizacion va poder generar estructuras que imiten la via de comunicación de su propia organización


Los equpos monolíticos juntan todas la piezas de desarrollo en un mismo grupo lo que dificulta la comunicación 


## Objetivos del arquitecto

El arquitecto conecta los stakeholder con el sistema a construir. Cada uno de los roles que tienen los Stakeholders afectan de diferente forma el sistema.

Los stakeholders que podemos encontrar en un proyecto:

- Cliente
- Manager
- Dev
- Usuario
- QA (quality assurance)

Cada uno de estos roles pueden tener requerimientos, y estos requerimientos van a afectar de forma diferente al sistema.

**Cliente**
Quiere tener su sistema respetando el presupuesto establecido y entregado a tiempo. Debará preocuparse por encontrar cuáles son los mayores riesgos y evitarlos.

**Manager**
Querrá cumplir con los requerimientos del cliente y además tener la posibilidad de crear equipos que puedan autogestionarse y atacar diferentes partes del sistema de forma simultanea.

**Dev**
Que sea fácil de implementar y mantener.

**Usuario**
Que funcione, que haga lo que tiene que hacer cuando lo tenga que hacer.

**Tester QA**
Que sea fácil de probar

Con todo esto en mente el Arquitecto deberá tomar las mejores desiciones para que el impacto del diseño sea agradable para todas estas partes.

## Arquitectura y metodologías

- La arquitectura nace de metologías tradicionales.
- La arquitectura cambia  si es una metodolgía tradicional o agil
- En un principo los arquitectos diseñaban una solucion a gran escala que atacara los problemas esenciales
- Las metodologías agiles ven el diseño como algo evolutivo, equipos autogestionables.
- En la metodolgía tradicional no hay feedback en etapas tempranas de desarrolo
- Metodologias agiles el planear los momentos importantes o el ultimo momento responsable.
	- Prioridades del backlog
	- Retrospectivas
	- (re)evaluar la arquitectura
	- Planeamiento del sprint
	- Planear la arquitecura
	- Prioridades del Backlog 
	- implementa la arquitectura
	- Despliegue continuo
	- Metricas y alertas
	- Producto en uso
Básicamente, en cuanto a las metodologías ágiles, recibir feedback y crear una infraestructura en base a los Tracer bullets permite hacer una que sea **sólida **siempre que ese feedback sea evaluado y tenido en cuenta para las decisiones de cambios de la arquitectura.


## Entender el problema

Separar la comprensión del problema de la propuesta de solución. Podemos mezclar las cuestiones tecnologicas como parte del problema cuando son detalles de la implementación


Separar el espacio del problema del espacion de la solución:

**Espacio del problema**

* Idea -> que es lo que vamos hacer, que es lo que queremos resolver.
* Criterios de éxito -> Como es que soy exitoso, cuales son los criterios de evaluacion del éxito
* Historias de usuario -> Narrar historias de como un usario a ravés de la solucion al problema puede llegar una experiencia con el sistema.

**Espacio de la solución**

- Diseño
- Desarrollo
- Evaluación
- Criterios de aceptación del software
- Despliegue

El espacio del problema detalla que es lo que voy a resolver y el espacio de la solucion entra en el detalle del cómo, siempre reflejandose en el problema que detectamos.

## Requerimientos


Una vez que entendemos el espacio del problema y el espacio de la solución, vamos a entrar a analizar los requerimientos de nuestro sistema.

**Requerimientos de producto:** 

Los podemos dividir en 3.

- Capa de requerimientos de negocio, son reglas del negocio que alimentan los requerimientos del negocio.
- Capa de usuario, tienen que ver en cómo el usuario se desenvuelve usando el sistema, qué atributos del sistema se deben poner por encima de otros.
- Capa Funcional, se ven alimentados por requerimientos del sistema, ¿qué cosas tienen que pasar operativamente?

*Esta capa se ve afectada por las restricciones que pueden afectar operativamente a lo funcional*


![](/notes/arquitectura_fundamentos/assets/requerimientos_producto.png) 

**Requerimientos de proyecto:** 

Tienen que ver más con el rol de gestor de proyectos, se usan para dar prioridad a los requerimientos del producto. (Fechas de entrega, hitos)

Estos dos mundos de requerimientos hablan de las prioridades del equipo de trabajo del proyecto.

![](/notes/arquitectura_fundamentos/assets/requerimientos_proyecto.png) 

**Requerimientos de producto:**

Requerimientos funcionales: Tienen que ver con las historias de usuarios, que hablan sobre específicamente lo que hace el sistema, por ejemplo que usuario ingrese al sistema. Detallan como el sistema se va a comportar bajo un estimulo, como va a implementar una historia.

Requerimientos no funcionales: son aquellos que agregan cualidades al sistema, por ejemplo que el ingreso de ese usuario sea de manera segura. 

**Requerimientos significativos para la arquitectura.** Agrupan cualquier tipo de requerimiento que afecte a la hora de diseñar la arquitectura correcta.


## Riesgos

Los riesgos son importantes para priorizarlos y atacarlos en orden y asegurar que las soluciones arquitectónicas que propongamos resuelvan los problemas más importantes.

Intenta tratar los riesgos con posibles escenarios de fracaso y que pasaría en caso de que ese riesgo se haga real.

Veamos como identificar los riesgos:

- En la toma de requerimientos --> dificultad / complejidad
- En los atributos de calidad --> incertidumbre, cuanto mas incertidumbra hay, mas alto es el riesgo.
- Conocimiento del dominio --> Riesgo prototípico, son aquellos que podemos atacar de forma estándar. si lo que estamos implementando ya ha sido implementado.


Una vez que tenemos los riesgos identificados, debemos priorizarlos, recuerda que no es necesario mitigarlos todos, debemos siempre tener en cuenta y dar prioridad a aquellos riesgos que ponen en peligro la solución que se esta construyendo.

**Trabajando orientados a riesgos**

- Describir los riesgos que pensamos que el tema va a tener -> detallar y relatar los escenarios de riesgo
- Enteder de que consta el riesgo -> es de ingenieria (Relacionados con el analisis, diseño e implementacion) - o es de gestión de proyecto (Planificacion, secuenciacion del trabajo, recursos, equipo, entregas ...)
- identificar los riesgos
- priorizar los riesgos

## Restricciones

Las restricciones en el contexto de un proceso de desarrollo de software se refiere a las restricciones que limitan las opciones de diseño o implementaciones disponibles al desarrollar.

Los stakeholders nos pueden poner limitaciones relacionadas con su contexto de negocio, limitaciones legales.

También hay limitaciones técnicas relacionadas con integraciones con otros sistemas.

El ciclo de vida del producto va a agregar limitaciones al producto, por ejemplo a medida que avanza el proceso de implementación el modelo de datos va a ser más difícil de modificar.

El arquitecto debe balancear entre los requerimientos y las restricciones.

## Estilos de arquitectura

## Arquitectura, panorama y definición

Ningún patron tiene solo beneficios. Siempre hay beneficios y consecuencias de las decisiones que tomamos.

Los estilos de arquitectura permite reutilizar el conocimiento y aprender de soluciones anteriores que tuvieron exito en su implementación

Un estilo de arquitectura es una colección de decisiones de diseño, aplicables en un contexto determinado, que restringen las decisiones arquitectónicas específicas en ese contexto y obtienen beneficios en cada sistema resultante.


Nos dan un set decisiones tomadas anteriormente en un contexto similar  y que tuvieron éxito, y nos restringe el resto de las decisiones, para esperar obtener unos resultados estimados a partir de otras experiencias exitosas en ese contexto.

## Estilos: Llamado y retorno

Cada uno de los componentes hacen invocaciones a los componentes externos y estos retornan información.

Cada componente hace un llamado y espera una respuesta

**Programa y subrutinas** --> Instrucciones secuenciales que el programa ejecuta una por una. Luego se hacian instrucciones de salto, de aqui surgieron las funciones que son bloques de codigo que podemos invocar en cualquier momento.

**Orientado a objetos** --> la abstracción es mayor en comparación con el paradigma anterior, se usa para aplicaciones que ya sabemos que vamos a usar durante mucho tiempo. La abstracción ya no es la subrutina, ahora tenemos objetos que se hacen llamados entre si y esperan respuestas.

En POO instanciamos objeto a partir de la clases y estas instancias se comunican entre sí.

**Arquitectura multinivel:** ejemplo un cliente en un movil puede desplegar unas funcionalidades sin acceder a un servidor, sin embargo habrá momentos en los cuales necesitará comunicarse con el server para consumir algunos recursos.

## Estilos: Flujo de datos

**Lote secuencial**: ejecuta una pieza de código de alto costo de procesamiento para el resultado final pase a una siguiente etapa.

**Tubos y filtros**:  Son en tiempo real, no se necesita interacción del usurio para decidir cuando comienza y cuando termina.Un patrón tubería y filtro tiene un grupo de componentes llamados filtros, conectados por tuberías que transmiten datos de un componente al siguiente continuamente.


## Estilos: Centradas en datos

La aplicación va a tener multiples componentes, alguno de ellos concentrados en que los datos esten integros, disponibles y seguros.

**pizarron** 

Tenemos diferentes componentes que interactuan con un componente central que va a ser el pizarron. Este pizarron es el centralizador de los datos que le dan cada uno de los componentes y eventualmente cuando los tenga todos genera una salida. ejemplo: seria algun checklist que espera a que todos los procesos se cumplan para dejar continuar con el proceso.

**Arquitectura centrado en datos**

Tiene componentes que no se comunican entre si, y tiene como intermediario una base de datos: por Ejemplo una REST API y una aplicación web

**Sistemas expertos o estilo basado en reglas** 

No se ve muy seguido en aplicaciones modernas.  un componente de tipo cliente revisa si es una regla o una consulta, estas inferencias a medida que las vamos procesando se agregan en una base de conocimientos que luego podemos usar mediante consultas, por ejemplo los sistemas de inteligencia artificial que aprenden de datos de entrada y que luego consultan para ejecutar n-operación.


## Estilos: Componentes independientes

En la arquitectura de componentes independientes se busca el desarrollo de aplicaciones independientes que no tengan acomplamiento fuerte entre cada uno de los componentes.

Hay dos grandes familias en componentes independientes y tienen que ver con la forma en la cual se van a comunicar lops componentes

**invocacion implicita** -> basada en eventos, para que las aplicaciones puede enviar mensajes entre si, sin que una aplicacion sepan a quien le esta hablando

- Cuando tenemos eventos tenemos varios componentes y tenemos un bus de eventos.
- En el bus de eventos los componentes va a publicar eventos, que el bus va a notificar a componentes que esten suscritos a estos eventos.
- Publicar / suscribir : un componente escribe y el otro escucha del bus de eventos


- Orientación a servicios: un bus inteligente, el bus decide a quien le dice que va a hacer. 

ESB- >enterprise service bus, los buses se pueden programar internamente, los componentes no se conocen entre si. Delega tareas a otros componentes. Los componentes se dedican a resolver su problema. el bus es el inteligente quien conoce el proceso.


**Invocación explicita** ->  Los componentes que si se conocen entre si pero pueden ser desarrollados independientemente.


- Vamos  a tener componentes que vamos a desarrollar separados, sin embargo  cada uno debe publicar la via de programacion de como se van a comunicar entre si.
- Los componentes publican la via de comunicación en un registro de servicios y luego conocen como comunicarse entre si
- Los componentes se encuentran en la ejecución.
- Da la capacidad de hacer despliegue independiente


## Comparando estilos: ¿Cómo elijo?

**Criterios de evaluación**

- Eficiencia de ejecución
- Testing
- Curva de aprendizaje
- Tolerancia al cambio
- Modularidad
- Disponibilidad
- Adaptabilidad


**Estilos monoliticos donde vamos a desplegar un solo artefacto de software**

- Es mucho más facil darle prioridad a la eficiencia  la ejecucion
- Al tener un solo artefacto de software  puede ser optimizado para funcionar mas eficiente internamente (usando memoria interna, llamados a procedimiento) .
- Son mas fáciles para hacer una prueba de principio a fin
- La curva de aprendizaje puede ser mas suave. Tiene toda la información integrada en él 
- La capacidad de modificación es mas facil, un cambio  pueden afectar varios componentes, pero si estan todos juntos podemos garantizar que no hay estados intermedios. Por ejemplo no hay problemas de versionamiento ya que todo el conjunto co-existe bajo una misma versión y son desplegados en conjunto.
- Tiene todos sus modulos internamente, es muchos mas facil romper la modularidad ante un cambio
- La disponibilidad puede ser menor y mas costosa ya que en caso de requerir una copia en otro despliegue, se requiere el conjunto completo de la aplicación para poder funcionar.
- La adaptabilidad del monololito depende del entorno y su contexto. por ejemplo el sistema operativo.

**Estilos distribuidos cada despliegue es independiente y luego se interconectan.**

- Es mas dificil darle prioridad a la eficiencia, ya que la comunicacion entre dos componente pueden ir por la red o protocolo de comunicación.
- Para hacer una prueba de principio a fin debemos tener todos los componentes disponibles y en el caso de eventos debemos tener un bus.
- Es mas complicada la curva de aprendizaje. Para poder entender toda la aplicación en su conjunto se debe poder comprender cada uno de sus componentes
- La capacidad de modifcación es mas compleja, los componentes pueden ser versionados independientemente y hay que mantener compatibilidad en el esquema de despliegue.
- Se dá mejor la modularidad, es la naturaleza de los sistemas distribuidos. Los componentes se despliegan independientemente
- La disponibilidad de un esquema distribuido es mucho mayor, podemos tener multiple copias de cada servicio, y a su vez cada componente es mas pequeño asi como el uso de recursos.
- La adaptibilidad es mucho mas simple para ser adaptado en contextos diferentes.

Podemos ver los componentes de un sistema distribuido como monolíticos, en el caso de microservicios es mas facil la comprension de un servicio que permanece aislado del conjunto que compone.

**Ahora como elijo?**

- Se debe tener encuenta los requerimientos funcionales y no funcionales, reglas de negocio y atributos de calidad, restricciones, riesgos asociados al desarrollo y los  no riesgos.

Cuando tengamos todo claro, la unión de las partes perimitirá  considerar decisiones y  estrategias de arquitectura  para una solución que permita satisfacer cada una de las partes.

![](/notes/arquitectura_fundamentos/assets/esquema_decision_arquitectura.png) 

## Desarrollo del proyecto

### Platzi Servicios


#### Disparador

![](/notes/arquitectura_fundamentos/assets/01-disparador.png) 


#### Análisis de requerimientos

![](/notes/arquitectura_fundamentos/assets/02-criterios_exito.png) 


#### Historias de usuario

![](/notes/arquitectura_fundamentos/assets/03-historias.png) 


Definir bien claro el problema, evitando entrar en la solución.

#### Requerimientos

![](/notes/arquitectura_fundamentos/assets/04-requerimientos.png) 

#### Riesgos

![](/notes/arquitectura_fundamentos/assets/05-riesgos.png) 

#### Restricciones


![](/notes/arquitectura_fundamentos/assets/06-restricciones.png) 

#### Estilo arquitectónico

![](/notes/arquitectura_fundamentos/assets/07_estilo.png) 

### Desarrollo del proyecto: PlatziServicios Fase Producto en crecimiento

#### Análisis de requerimientos

Si re-evaluamos los criterios de exitos para hacer llegar servicios de empresas a empresas (B2B).

![](/notes/arquitectura_fundamentos/assets/08_criterios.png) 

#### Historias de usuario

Estas historias nos darán nuevos requerimientos.

![](/notes/arquitectura_fundamentos/assets/09_historias.png) 

#### Requerimientos

se pueden definir nuevas necesidades y roles. (Aquí se Incluyen los Reportes)

![](/notes/arquitectura_fundamentos/assets/10_requerimientos.png) 


#### Riesgos

![](/notes/arquitectura_fundamentos/assets/11_riesgos.png) 


#### Restricciones

![](/notes/arquitectura_fundamentos/assets/12_riesgos.png) 


#### Estilo arquitectónico

![](/notes/arquitectura_fundamentos/assets/13_estilo.png) 


En el caso de los reporte se recomienda no hacer calculo con la misma base de datos que soporta la operación porque puede generar indisponibilidad del servicio, se debe separar la parte de reportes ya sea con un lote secuencial  o si se puede reevaluar a una estructura de eventos, así los reportes se leen ya calculados y evitamo el costo de lectura.

### Desarrollo del proyecto: PlatziServicios Fase Escala global

Empresa de gran escala

#### Análisis de requerimientos

![](/notes/arquitectura_fundamentos/assets/14_criterios_exito.png) 

#### Historias de usuario

![](/notes/arquitectura_fundamentos/assets/15_historias.png) 


#### Requerimientos

![](/notes/arquitectura_fundamentos/assets/16_requerimientos.png) 


#### Riesgos

![](/notes/arquitectura_fundamentos/assets/17_riesgos.png) 


#### Restricciones

Ya no basta con el huso horario para correr procesos donde creemo no se interrumpe la operación del sistema.


![](/notes/arquitectura_fundamentos/assets/18_restricciones.png) 



#### Estilo arquitectónico

![](/notes/arquitectura_fundamentos/assets/19_estilo.png) 



## Cuestionario

- En el contexto de metodologías tradicionales, ¿en qué etapa del proceso de desarrollo de software se toman las decisiones de arquitectura?

Diseño de la solucion


- Y en el contexto de metodologías ágiles, ¿cuándo se toman las decisiones de arquitectura?

En cada iteración


- ¿Por qué no existe la bala de plata que resuelva las dificultades del desarrollo de software?




- De las formas en las que podemos trabajar con las dificultades esenciales, ¿cuál es la que más involucra a los arquitectos de software?

Ser un gran diseñador


- En el contexto de metodologías ágiles, ¿dónde encontraremos el rol del arquitecto?

En el equipo de desarrollo



- ¿Cuál de estas definiciones mejor describe la arquitectura de software?

ESTRUCTURA DE UN SISTEMA SUS INTERCONEXCIONES Y LAS DECISIONESDE DIESÑOE QUE LLEVARON A ESTAS 



- La ley de Conway nos dice que:

El sistema copia el modelo de comunicacion de la organizacion

- La empresa GitJam es una organización multinacional con desarrolladores distribuidos en todo el mundo. Su metodología de trabajo es principalmente remoto: No tienen oficina más allá de un pequeño headquarters en San Francisco, donde se reúnen los directivos. Los desarrolladores se comunican por email y disponen de una plataforma de chat. ¿cómo es el diseño de su sistema?

distribuida asincrona

- ¿Cuál de los siguientes mejor describe el objetivo de un arquitecto?
COMPRENDER LAS NECESIDADES DE SUS STAKEHOLDERS AL DISEÑAR EL SISTEMA



- ¿Cuál de estas prácticas es esencial para un arquitecto en contexto de metodologías ágiles? 

REEVALUAR EN CADA ITERACION A TRAVES METRICAS Y ALERTAS

-  En la toma de requerimientos, trabajamos para entender y definir:

EL PROBLEMA A RESOLVER

- El usuario podrá comprar con tarjeta de crédito a través del sistema, ¿qué tipo de requerimiento es?

Funcional

- “El sistema incrementará nuestra capacidad de venta a clientes extranjeros en un 25%.” ¿Qué tipo de requerimiento es?
de negocio

- “Los precios podrán ser actualizados desde un panel de administración.” ¿Qué tipo de requerimiento es?
Funcional

- “El sistema deberá estar disponible para ser presentado en la conferencia de la empresa en abril de este año.” ¿Qué tipo de requerimiento es?
de proyecto

- “Toda interacción con el sistema debe ser compatible con usuarios con discapacidad visual.” ¿Qué tipo de requerimiento es?
No funcional


- Cuál de los siguientes requerimientos funcionales incluye explícitamente un requerimiento no funcional?


- “El sistema podría ser atacado a través de una denegación distribuida de servicio.” ¿Qué describe esto?
Riesgo

- Luego de identificar los riesgos, ¿qué hace el arquitecto con esta información?
Priorizar y atacar los mas importantes

- ¿Por qué no podemos resolver todos los riesgos detectados?
PORQUE DEDICAREMOS ESFUERZO QUE NO ESTAREMOS USANDO PARA DESARROLLA LAS FUNCIONALIDADES DEL SISTEMA

- En la compañía ACME-Products quieren comenzar un nuevo producto, capaz de analizar datos de compras y comportamiento de compradores en tiempo real. En una conversación sobre requerimientos, el dueño del producto le comunica al arquitecto que deben usar la base de datos GuayabaDB, ya que tienen un acuerdo previo con la compañía que la desarrolla. ¿Qué es esto?

Restricción


- ¿Cuáles de estas puede ser considerada una restricción de diseño?
- hAY LEYES SOBRE PRIVACIDAD DE DATOS QUE NUESTRO SISTEMA ALMACENA



Un sistema contable permite a sus usuarios el mantener el estado actual de las finanzas de la organización. Además, el departamento de finanzas encargó el desarrollo de un nuevo sistema para tener reportes trimestrales, semestrales y anuales y filtrarlos por tipo de transacción. ¿Qué estilo de arquitectura es más pertinente?

NO ES MICROSERVICIOS
CENTRADO EN BASE DE DATOS

Se desarrolló un pequeño script en Python para sincronizar los logs de varios servidores. Pasó el tiempo y la cantidad de logs a sincronizar creció, y con ellos las responsabilidades del pequeño script. ¿Qué estilo de arquitectura podemos usar para mejorar esta situación?

NO ES PIZARRON
PROGRAMAS Y SUBRUTINAS

- Un ecommerce en crecimiento quiere hacer mejor uso de sus recursos para que pueda crecer de forma más eficiente. Luego de un proceso de análisis y medición, encontraron que calcular las promociones para cada producto bloquea la mayor parte del uso de memoria del sistema. ¿Cuál de estas propuestas mejor ataca la situación?

Sistema distribuido, SEPARAR EL CÁLCULO

- En los frameworks web modernos existe el concepto de middleware, que describe una forma de interceptar el pedido o la respuesta del sistema con componentes desarrollados independientes uno del otro. ¿Qué estilo de arquitectura están implementando?

Tuberia

- En un centro de investigación, científicos de diferentes áreas utilizan un sistema para, a través de un modelo común de física, química y biología, simular hipótesis de procesos que se podrían haber dado durante la historia de nuestro planeta. Para esto, le deben describir al sistema los hechos que forman parte de su hipótesis y luego consultar el resultado simulado. ¿Qué estilo de arquitectura usará el sistema?

sistema experto

- De los siguientes estilos, ¿cuál es que más se usa al desarrollar aplicaciones web?
cliente -servidor

- Una librería desarrolló un sistema para administrar su venta y existencia de libros. Diez años más tarde, la empresa cuenta con más de 800 librerías distribuidas en 30 países de américa y europa. El sistema de administración de ventas y existencia se sigue usando para cada librería, mientras que muchos otros sistemas se encargan de la gestión global de la compañía, sus métricas por región y su expansión. ¿Qué estilo de arquitectura estamos describiendo?

- ¿Cuántos estilos de arquitectura puede haber en un sistema?

Multiples



