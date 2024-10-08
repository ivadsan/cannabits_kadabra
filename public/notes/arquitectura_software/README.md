[//]: # @param group $$ Arquitectura de software
[//]: # @param title $$ Arquitectura de software moderna
[//]: # @param author $$ Iván D. Sánchez

# Arquitectura de software moderna

## Arquitectura convencional

La aplicación esta desplegada en un único servidor

### Arquitectura convencional de tres capas

- Lógica de presentación
- Lógica de negocio
- Datos

### Modelo anémico

- Solo almacena datos, no hay lógica en las entidades.
- La lógica necesaria se crea como servicios
- Muy común en CRUDs
- Es un antipatrón
- Genera un alto acoplamiento entre componentes haciendo dificil mantener el código en el tiempo

### Pros y contras

**Pros**

- Utíl para proyectos pequeños que no van a escalar en el tiempo
- Mas fácil de compilar y desplegar
- Mas fácil de testear
- Mayor velocidad de desarrollo al inicio del proyecto
- Arquitectura de menor complejidad

**Contras**

- Arquitectura rígida difícil de mantener en el futuro
- Difícil de repartir el trabajo
- Alto acoplamiento entre los componentes

Nota: No significa que no se deba usar y que su código sea de mala calidad, es relativo al tamaño y objeto del proyecto y a las buenas prácticas de desarrollo.

## Arquitectura centrada en los datos

- Se planifica a partir de los datos a recolectar
- Se recopilan los requisitos para satisfacer las reglas de negocio.
- Se inicia por el diseño del modelo de datos
- Se construye alrededor del modelo de datos
- Se obtiene una arquitectura altamente dependiente del modelo de datos

## Domain Driver Design (DDD)

### Intro: Domain Driver Design

Es un enfoque de diseño y desarrollo de software que pone énfasis en la complejidad del dominio del negocio y en el lenguaje común entre los desarrolladores y los expertos del dominio. Su objetivo principal es crear software que refleje con precisión las realidades del dominio empresarial y permita una colaboración efectiva entre los desarrolladores y los expertos del negocio.

- Se piensa primero en el dominio del problema
- El objetivo es ser experto en el dominio del problema
- Se modelan las entidades, procesos y reglas especificas del dominio
- Se implementan los casos de uso que se requieren resolver.
- Por una parte esta el dominio (Se mantiene en el tiempo) y por otra los casos de uso (Varian en el tiempo)

### Tiempo de desarrollo

- El dominio es invariable
- Los casos de usos son muchos mas inestables, tienden a cambiar en el tiempo

### Lenguaje Ubicuo

Toda la comunicación entre los diferentes roles del proyecto (PMs, desarrolladores, POs, clientes) debe ser en un lenguaje común y preciso, conocido como lenguaje ubicuo. Este lenguaje evita ambigüedades y establece claramente los conceptos y términos con los cuales se deben referir a las entidades y acciones del dominio. Su objetivo es garantizar una comprensión compartida y coherente del dominio, facilitando la colaboración y minimizando errores de interpretación.

### Bounded context (Contextos acotados)

- Áreas específicas del dominio donde ciertos términos y conceptos tienen significados precisos y coherentes.

- Es una forma de organizar el modelo y la lógica de negocio de la aplicación guiado por el dominio.

- Los contextos acotados tiene un sentido especial dentro del dominio

- Es un subdominio del dominio del problema

- Pueden tener su propio lenguaje ubicuo

- Las entidades fuera del dominio puede tener características ligeremente diferentes

- Pueden tener entidades compartidas y dependientes entre los contextos, las cuales deben ser separadas para evitar poner en riesgo la integridad del modelo.

- Tener una entidad compartida entre contextos no significa una duplicidad del código sino una aclaración del mismo.

- Al compartir entre contextos se puede llegar a la acumulación de detalles por eso es necesaria esta aclaración de las entidades dependientes.

#### Características de los Contextos Acotados

- **Independencia:** Cada contexto acotado es independiente de los demás y puede tener sus propias reglas de negocio, entidades y modelos.

- **Claridad de Límites:** Los límites del contexto están claramente definidos, lo que evita confusiones y ambigüedades en el uso de términos y conceptos.

- **Consistencia Interna:** Dentro de un contexto acotado, los términos y conceptos son coherentes y se usan de manera consistente.

- **Interacciones Controladas:** La comunicación entre contextos acotados debe ser bien definida y controlada para evitar dependencias innecesarias y para mantener la integridad de cada contexto.

### Mapeo de contextos (Context Mapping)

- Definir los contextos acotados que componen el dominio del problema

- Los contextos no son totalmente independientes y tienen interacciones con otros contextos

- Es necesario identificar el tipo de dependencia e interacción entre los contextos

- El mapeo de contextos es un diagrama para representar todas las relaciones y dependencias entre los distintos contextos

- Cada relación entre contextos tiene una dirección de dependencia

- Upstream: Un contexto acotado que influye en otros contextos. Los cambios en un contexto upstream pueden afectar a los contextos downstream que dependen de él. En otras palabras, el contexto upstream es la fuente de la dependencia.

- Downstream: Un contexto acotado que depende de uno o más contextos upstream. Este contexto recibe la influencia de los contextos upstream, y los cambios en estos contextos pueden impactarlo.

- Hay relaciones entre contextos donde puede suceder que ninguno mande sobre el otro

#### Tipos de relaciones

- Conformista: el contexto downstream no tiene ninguna capacidad de negociación sobre cambios en el contexto upstream

- Cliente / proveedor (Customer / Supplier): Existe una leve capacidad de negociación entre las partes, requisitos en el cliente (downstream) pueden inferir en cambios en el proveedor (upstream)

- Socio (Partnership) Ambos contextos colaboran por una meta en común, por lo que ambos lados de la relación de poder de influenciar cambios uno sobre el otro.

- Nucleo compartido (Shared Kernel) todas las partes deben estar de acuerdo para un cambio, dificil de mantener

- Anti-Corruption Layer (ACL) proteger el modelo de dominio de un contexto acotado (bounded context) de la influencia de modelos externos no deseados o inconsistentes. Este patrón se utiliza especialmente cuando un contexto acotado depende de otro contexto o de un sistema legado, evitando que el dominio quede "corrompido" por conceptos y estructuras ajenas.

  - Protección del Modelo de Dominio: Evita que los conceptos y estructuras de sistemas externos o legados corrompan el modelo de dominio.

  - Desacoplamiento: Aísla las dependencias externas, facilitando cambios y migraciones futuras.

  - Adaptación y Traducción: Permite adaptar y traducir datos y comportamientos entre diferentes sistemas sin exponer los detalles internos de uno al otro.

  - Mantenibilidad: Mejora la mantenibilidad del código al centralizar la lógica de traducción y adaptación en un único lugar.

- Open host service / Published language: Es una relación conformista donde el cliente tiene mayor información del upstream context tales como versiones y compatibilidades.

### Capas del DDD

![](/notes/arquitectura_software/assets/layers.png)

- Al inicio teniamos arquitecturas donde la capa de presentación, logica de negocio y datos estaban todas mezcladas.
- Luego viene un ordenamiento donde se separan estas tres capas para organizar mejor la aplicación.
- Ahora en DDD es una evolución de la arquitectura de tres capas donde la capa de lógica de negocio se ha separado en aplicación y dominio.
- Donde aplicación es donde residen los casos de uso independientes de la capa de dominio.
- En esta arquitectura la capa de datos ahora es de infraestructura.

#### Definición de cada capa

- Presentación: Ahora no se limita a la construcción de vistas, ahora maneja frameworks o apis que interactuan con el usuario. Entonces la capa de presentación es la API de entrada al sistema que da soporte a la interfaz de usuario. Es la fachada que interactua con los servicios de la aplicación para iniciar los casos de uso. (Equivalente a @Controller en spring)

- Aplicación: Encargada de orquestar todos los casos de uso. (Equivalente a @Service en spring)

  - Interactua con el dominio para ejecutar su lógica específica
  - Interactura con la capa de infraestructura para el manejo de la persistencia, loggin, etc.
  - Responde a la capa de presentación con los datos formateados.

- Dominio: Contiene lo datos y lógica central del sistema diseñada bajo DDD

  - No tiene conocimiento de los detalles de implementación (Framework, Base de datos)
  - No le debe afectar ningún cambio en los detalles de implementación
  - Aislada del mundo exterior, si interactua con la infraestructura es para temas de logging por ejemplo
  - Se compone de entidades de dominio y servicios de dominio
    - Entidades de dominio: Se diseña orientada a objetos datos y lógica, No son entidades de persistencia (@Entity en spring)
    - Servicios de dominio: Lógica de dominio de una entidad de dominio (@Service en spring)
  - La capa de dominio debe ser lo mas estable del sistema, se debe evitar modificar el dominio para adaptarlo al exterior, debe estar desarrollado bajo el principio SOLID open / close, debe estar abierto para agregar mas funcionalidad pero cerrado para modificar las funcionalidad existente
  - Antes de pensar en modificar la capa de dominio, se debe modificar las capas exteriores tales como infraestructura, presentación o aplicación

- Infraestructura: Persistencia (ORM, repositorios @Entity), Detalles del framework (configuración, arranque de la aplicación), Logging

#### Modelo de dominio

- Lo primero es identificar las entidades del dominio, que son los objetos con datos y comportamiento (Ejemplo: Equipo, miembro, proyecto)

- Existen atributos relacionados con las entidades (value objects - Objetos de valor) (Proyecto: estado, categoría) Son clases con simplemente datos, deben ser inmutables y sirven para representar de manera clara los atributos de las entidades

- El siguiente paso es establecer las relaciones del modelo

- Cada entidad está relacionada con sus objetos de valor a esta relación (concepto), se le llama agregación Aggregate,

- Cada aggregate tiene una entidad raíz (Ejemplo: Equipo, miembro, proyecto), tambien pueden existir en cada aggregate entidades secundarias con sus propios datos y lógica

- No confundir Aggregate con bounded context, cada contexto puede estar conformado por varios aggregates

- Como norma la comunicación entre distintos aggregates las hacemos a través de las entidades raiz, y una raiz no puede interactuar directamente con una entidad no raiz de otro aggregate. Cada aggregate tendrá una API que es por donde pasaran todas las interacciones de otros aggregates.

![](/notes/arquitectura_software/assets/domain_model.png)

### Modelo orientado a BBDD vs dominio

#### Modelo de persistencia

- Basado totalmente en modelado de datos
- Orientados a facilitar las operaciones de inserción, modificación, eliminación y consulta
- Solo contiene información y no comportamiento
- Se puede implementar un ORM

#### Modelos de dominio

- Orientado a modelar el dominio del problema: sus datos y comportamientos
- El modelo se puede persistir: es en la capa de aplicación (La cual se comunica con la capa de infraestructura y de dominio ) donde se mapea el modelo del dominio y el modelo de persistencia
- No tiene ningún conocimiento de la bbdd

- Podemos crear las entidades a través de constructores establecidos, no podemos hacer uso de setters para inicializar las variables sino que se hace de manera controlada a través de los comportamientos de la entidad

### Servicios de dominio

- Ejecutan lógica que no tiene cabida en ninguna de las entidades
- Suelen ser para coordinar la comunicación de dos o mas tipos de aggregates pero no tienen porqué
- Son diferentes a los servicios de aplicación que ejecutan casos de uso
- Son parte del dominio, no se crean de manera arbitraria, son parte del lenguaje ubicuo y se identifican en sesiones de brainstorming
- No tienen cabida acciones como save, delete, upsert

El concepto de servicios de dominio en Domain-Driven Design (DDD) se refiere a las operaciones y funciones que representan comportamientos dentro del dominio del negocio. A continuación, se presenta un resumen de los servicios de dominio en DDD:

1. **Definición y Propósito**:

   - **Servicios de Dominio**: Son componentes que encapsulan lógica de negocio que no pertenece a ninguna entidad o valor específico, pero es crucial para el dominio.
   - **Propósito**: Mantener la lógica de negocio separada de las entidades y valores, promoviendo un diseño limpio y mantenible.

2. **Características**:

   - **Pureza**: No tienen estado, lo que significa que no mantienen información entre invocaciones.
   - **Coherencia**: Se encargan de operaciones que implican múltiples entidades o valores y no encajan naturalmente dentro de una sola entidad.
   - **Reutilizables**: Pueden ser llamados por diferentes partes del sistema, promoviendo la reutilización de lógica de negocio.

3. **Tipos de Servicios en DDD**:

   - **Servicios de Aplicación**: Coordina las tareas de alto nivel, orquestando las operaciones entre múltiples servicios de dominio y otros componentes.
   - **Servicios de Dominio**: Contienen lógica de negocio pura, relevante y específica al dominio, que no pertenece a una única entidad.
   - **Servicios de Infraestructura**: Gestionan las interacciones con sistemas externos y detalles técnicos, como persistencia y comunicación.

4. **Implementación**:

   - **Interfaz Clara**: Definen interfaces claras y explícitas que detallan las operaciones disponibles.
   - **Ubicación en el Modelo de Dominio**: Normalmente se ubican en el modelo de dominio y forman parte integral del mismo.
   - **Nombre Significativo**: Nombres que reflejan la operación de negocio que realizan, facilitando su comprensión y uso.

5. **Ejemplos**:
   - **Servicio de Facturación**: Calcula el total de una factura aplicando descuentos, impuestos y otras reglas de negocio.
   - **Servicio de Envío**: Determina la mejor opción de envío basándose en las reglas del negocio y las preferencias del cliente.
   - **Servicio de Autorización**: Verifica si un usuario tiene permiso para realizar una determinada operación en el sistema.

Los servicios de dominio en DDD son esenciales para encapsular y gestionar la lógica de negocio compleja, promoviendo un diseño más limpio, modular y mantenible.

### Resumen

- El DDD se centra en la importancia de entender bien el dominio de nuestro problema para crear buen software.
- En contraste al enfoque tradicional, centrado en los datos que tratamos.
- Para identificar los elementos del dominio se utiliza
  - Lenguaje ubicuo, brainstorming.
  - Identificación de los contextos acotados.
  - Mapeo de contextos.
- Todo esto se hace con el fin de separar la lógica de aplicación (casos de uso) de la lógica de dominio.
- Los casos de uso varían mucho más frecuentemente.

**Modelar el dominio**

1. Entidades.

   - Elementos del dominio con entidad propia.
   - Comportamiento + datos.

2. Value Objects.

   - Elementos que almacenan sólo datos.
   - Creados para representar de forma más clara los atributos de las entidades.

3. Aggregates.

   - Conjunto de entidades y value objects con un sentido común.

4. Domain Services.

   - Elementos del dominio con lógica que no tiene cabida en ninguna de las entidades.

### Pros y contras DDD

**ASPECTOS POSITIVOS**

- Lenguaje común compartido por todos los integrantes del proyecto. Perfiles técnicos y no técnicos.
- Al tener lógica de aplicación y dominio separadas, el coste de realizar modificaciones suele ser menor, ya que el dominio cambia con poca frecuencia.
- El código del dominio es autoexplicativo.
- Mayor velocidad de desarrollo a medio y largo plazo. Mucho más mantenible.

**ASPECTOS NEGATIVOS**

- Mucho más lento al principio de un proyecto.
- Requiere tener expertos en el dominio del problema.
- Cambio de mentalidad de los desarrolladores para enfocarse en la funcionalidad más que en los datos.
- Los frameworks actuales nos "empujan" a un modelo anémico y a pensar centrándonos en los datos.

**CUÁNDO USAR**

- Proyectos complejos con un largo tiempo de vida esperado.
- Incertidumbre en los casos de uso. Previsión de cambios en el futuro.
- Problemas con una lógica de dominio presente.
- Si lo único que necesitas es un CRUD, no tiene sentido.
- Disponibilidad de un equipo comprometido en analizar detalladamente el dominio.

## Command Query Responsibility Segregation (CQRS)

### Introducción

Este principio se basa en la seperación de los comandos y las consultas en el sistema.

- **Comandos** es toda acción que modifica el estado del sistema y que no retorna información (Ejm: Encender el motor)

- **Consultas** acciones que no alteran el estado del sistema y que solo retornan datos (ejm: numero de kms recorridos)

En el modelo anémico (clases con solo atributos, getter y setters pero nada de lógica, permite el acceso a su información de manera libre con riesgo de estados incongruentes) es apropiado para las consultas

![](/notes/arquitectura_software/assets/modelo_anemico.png)

En el modelo de dominio, se ejerce un mayor control sobre el estado para evitar inconsistencias, ya que se regulan estrictamente las acciones que pueden modificar la información, impidiendo que quede expuesta abiertamente. Esto es especialmente adecuado para el manejo de comandos, aunque necesita modificaciones para su persistencia.

El CQRS permite organizar los comandos y consultas para que pueda co-existir en un sistema, tanto para operar la persistencia como para modificar el estado.

![](/notes/arquitectura_software/assets/cqrs.png)

### CQRS Avanzado

CQRS (Command Query Responsibility Segregation) es un patrón arquitectónico que separa las operaciones de lectura y escritura en un sistema, utilizando modelos diferentes para cada una. Este patrón es especialmente útil en sistemas con requisitos complejos o con una alta demanda tanto de operaciones de lectura como de escritura.

#### Componentes Clave de CQRS

1. Modelo de Escritura (Comandos):

- Comandos: Son las operaciones que cambian el estado del sistema. Cada comando representa una acción que altera los datos, como crear, actualizar o eliminar información.

- Consistencia Transaccional: Este modelo se encarga de validar y aplicar las reglas de negocio para asegurar que el estado del sistema se mantenga consistente.

2. Modelo de Lectura (Consultas):

- Consultas: Son las operaciones que recuperan datos sin modificarlos. Estas operaciones están optimizadas para ser rápidas y eficientes.
- Proyecciones: A menudo se utilizan vistas materializadas o índices que están optimizados para las necesidades específicas de las consultas.

#### Ventajas de CQRS

- Escalabilidad: Permite escalar de forma independiente las operaciones de lectura y escritura.
- Optimización: Cada modelo puede ser optimizado para su propósito específico, mejorando el rendimiento general del sistema.
- Separación de Responsabilidades: Claramente define las responsabilidades, simplificando el mantenimiento y la evolución del sistema.
- Flexibilidad en el Diseño: Facilita la implementación de arquitecturas de microservicios y la adopción de diferentes tecnologías para cada modelo.

#### Desventajas de CQRS

- Complejidad: Añade complejidad al diseño y desarrollo del sistema, especialmente en términos de sincronización y consistencia eventual.
- Curva de Aprendizaje: Requiere un conocimiento profundo del patrón y de las técnicas asociadas para su correcta implementación.
- Infraestructura: Puede necesitar una infraestructura adicional para manejar las proyecciones y la sincronización de datos.

#### Ejemplo de Uso de CQRS

- Contexto: Una aplicación de gestión de pedidos.

- Modelo de Escritura: Cuando un usuario crea o actualiza un pedido, el comando correspondiente valida la información y actualiza la base de datos relacional, garantizando la consistencia mediante transacciones ACID.

- Modelo de Lectura: Para visualizar los pedidos, se consulta una base de datos NoSQL donde los datos están preprocesados y optimizados para respuestas rápidas. Las vistas materializadas pueden actualizarse en tiempo real o en intervalos regulares a partir de los eventos generados por el modelo de escritura.

#### CQRS y Bases de Datos

1. Bases de Datos Relacionales:

- Ventajas:

  - Transacciones ACID garantizan la consistencia y durabilidad de los datos.
  - Soporte robusto para integridad referencial y consultas complejas.

- Desventajas:

  - Escalabilidad limitada para escrituras de alto volumen.
  - Consultas complejas pueden ser lentas y costosas.

2. Bases de Datos No Relacionales:

- Ventajas:

  - Escalabilidad horizontal facilita el manejo de grandes volúmenes de datos.
  - Flexibilidad para manejar datos semi-estructurados o no estructurados.
  - Altas velocidades de lectura gracias a la indexación optimizada.

- Desventajas:

  - Falta de transacciones ACID en algunos sistemas, lo que puede comprometer la consistencia.
  - Consultas complejas pueden ser limitadas o menos eficientes.

#### CQRS como Solución

Al separar los modelos de lectura y escritura, CQRS permite utilizar bases de datos relacionales para operaciones de escritura y bases de datos no relacionales para operaciones de lectura, maximizando las ventajas de cada tipo de base de datos y mitigando sus desventajas. De esta manera, se mejora tanto la escalabilidad como el rendimiento del sistema.

### MÉTODOS DE SINCRONIZACIÓN

- Consistencia inmediata: Método síncrono.
- Consistencia eventual: Sincronización asíncrona.
- Consistencia programada: Sincronización a ciertas horas del día.
- Consistencia bajo demanda: Se realiza la sincronización cuando se determine necesaria.

**Mejorando la escritura**

- El problema es su dependencia directa con el método de sincronización
- Complejidad para insertar el modelo de escritura en la base de datos de lectura
- Esto se puede mejorar con event sourcing (Representación de la información en forma de eventos)

### Pros y contras de CQRS

#### Pros

- Tratamiento independiente de las lecturas y las escrituras.
  - Posibilidad de tener dos modelos distintos.
  - Uso de bases de datos adecuadas para cada situación.
    - Escalado independiente en función de las necesidades de lectura / escritura.
    - Normalización y desnormalización independientes.
- Posibilidad de tener dos equipos independientes.
  - Un equipo para el stack de comandos.
  - Otro equipo para el stack de consultas.

#### Contras

- Gran complejidad
  - Mantenimiento de dos stacks distintos para escritura y lectura.
  - Mantenimiento de múltiples Bases de Datos.
- Sincronización
  - Mantener la consistencia de los datos es un problema añadido.
- Duplicidad / redundancia de código

#### CUÁNDO USAR

- Sistemas dónde la escalabilidad es muy importante o crítica.
- Volumen de datos y transacciones elevados.
- Proyectos con problemas de rendimiento.
- No es necesaria una consistencia inmediata de la información.
- Distinto tratamiento para las escrituras y lecturas.
- Equipos grandes.

## Eventos

### Introducción a los eventos

- Nos proporciona la trazabilidad completa de las acciones realizadas sobre el sistema
- Un evento es algo que ha sucedido en el pasado.
  - Por lo tanto, son entidades inmutables.
- Forma básica de interacción en el mundo real.
  - Menos usado en el software, dónde es más frecuente el estado.
- Es una forma de representar la información a más bajo nivel.
  - Ofrecen más información que el simple estado final de una entidad.
- No nos perdemos nada de lo que sucede en nuestro sistema.

### Donde aplicar eventos

**Event Sourcing**

- Persistencia de eventos, en lugar del estado actual.
- Se ejecutan los eventos para obtener el estado en cierto momento.
- Se puede combinar con CQRS.

**Event Driven Programming**

- Eventos de aplicación.
- Una entidad los produce y los lanza, otra los recibe y procesa.
- Procesamiento asíncrono

**Event Driven Architecture**

### Introducción al Event Sourcing

Es una técnica que se centra en guardar en un almacen de datos todas las acciones sobre un sistema o que modificaron el estado en lugar de guardar solo el estado actual.

#### Donde puede aplicar

**Problema muy común.**

- Login / logout, tiempo de sesión, acción específica realizada en tu sistema etc.

**Soluciones específicas**

- Herramientas de logging.
- New Relic.
- Google Analytics.

No es un concepto nuevo, las bases de datos relacionales lo implementan a modo de transacciones.

### Event sourcing a detalle

- Los eventos no deben ser eliminados o modificados, tan solo insertados
- En caso de requerir desechar un evento debemos generar un evento nuevo que revierta los cambios dejando trazabilidad de los cambios.
- Permiten conocer el estado de un sistema en el pasado, tan solo se necesitan recrear todos los eventos hasta un punto especifico

Los campos esenciales de un evento son: id del evento, timestamp y detalles del evento.

- Los timestamps suelen estar en formatos estándar como ISO 8601 (por ejemplo, 2024-06-23T15:45:00Z), que especifica tanto la fecha como la hora en un formato legible y uniforme.

- UTC (Tiempo Universal Coordinado): Se indica con una Z al final del timestamp, por ejemplo, 2024-06-23T15:45:00Z.

Delta del evento: se llama al campo o los campos que cambian en el ultimo evento registrado

![](/notes/arquitectura_software/assets/delta.png)

- El borrado es lógico y no físico

Los eventos no solo se limitan a un crud (create, update, delete), en DDD los eventos son expresiones del lenguaje ubicuo (start, finish, point, warn, etc)

Los eventos son personalizables, lo que define a un evento es el id de la acción y el timestamp, los detalles del evento depende de los datos que se requieran para recrear el evento.

### Proyección de datos a partir de los eventos

1. Consulta de datos filtrados por ID y ordenados por Timestamp de forma ascendente
2. Creación de una nueva instancia de la entidad
3. Aplicación de todos los eventos en orden
4. Retorno de la instancia con el estado actual

### Problemas de eficiencia

- Procesar entidades con muchos eventos puede ser algo lento y costoso.
- Para esto se pueden usar snapshots que son capturas del estado en un momento específico
- Se puede obtener el estado actual a partir de la ejecucion de los eventos desde el último snapshot
- Gestionar snapshots requiere espacio y procesamiento, se deben usar donde la ganancia sea sustancial y la eficiencia que se genera sea necesaria.

### Event sourcing y CQRS

- El command stack utilizaría event sourcing
- Al realizar un comando se guardaría un evento en la base de datos de escritura
- El sistema de sincronizacion puede ir leyendo los eventos de la base de escritura e irlos aplicando a la base de lectura

### Pros y contras del event sourcing

#### Pros

- Trazabilidad del estado del sistema en el tiempo.
  - Recuperación del estado en días pasados.
  - Estadísticas y análisis.
- Nos proporciona un log de las acciones de los usuarios.
  - No hay necesidad de usar librerías externas ni implementar logging propio.
- Es más eficiente espacialmente que guardar un log con la entidad completa.
- Con CQRS podemos aprovechar los beneficios de ambos, mitigando los puntos débiles.
- Al no tener UPDATES ni DELETES físicos, es más eficiente en las escrituras.

#### Contras

- Eficiencia en las consultas.
  - Se puede mitigar el problema con snapshots o eliminarlo usando CQRS.
- Eficiencia espacial.
  - Necesita mucho más espacio que para representar simplemente el estado.
- Dificultad para debuggear.
  - No hay forma sencilla de hacer consultas directas para conocer el estado actual.
- Técnica mucho menos usada.
  - Será menos intuitiva para los programadores.
  - Necesita un tiempo de adaptación.
- Tratamiento de dominios amplios.
  - Pocos eventos son fáciles de tratar, pero se puede complicar con dominios grandes.

#### Cuando usar

- Situaciones dónde consideremos usar CQRS.
- Cuando necesitemos conocer el estado del sistema en un instante del pasado.
- Necesidad de un log con todas las acciones realizadas por los usuarios.
- Cuando la eficiencia de las consultas no sea algo crítico.

### Event Driven Programming

En event sourcing utilizabamos los eventos para almacenar la trazabilidad del estado del sistema pero tambien es posible usar los eventos para la comunicación entre componentes de una apilcación.

EDP es un paradigma de programación donde el flujo de un programa de dá por eventos (Por ejemplo una página web y sus CTA)

- una entidad publica un evento
- otra entidad lo consume

Aunque es asíncrono tambien es posible hacerlo de manera sincrona.

Los eventos de aplicación pueden ser:

- inputs del usuario (entredas de teclado, clicks)
- Condión del sistema en un momento concreto (sensor de temperatura)
- Evento lanzado como resultado de un procesamiento (Finalización de un backup)
- Otros

Por ejemplo, podemos tener un controlador que en un momento dado deba comunicarse con dos servicios distintos. Esto lo puede hacer mediante dos llamadas directas, pero utilizando eventos de aplicación, ambos servicios podrían registrarse en un publicador de eventos. Luego, el controlador puede emitir un evento para que las entidades registradas lo ejecuten o procesen sin necesidad de interacción directa entre el controlador y las entidades registradas en el publicador de eventos.

- Se busca desacoplar al emisor de los consumidores del evento.

Con este modelo no debemos hacer mas cambios en el controlador en caso que necesitemos comunicarnos con mas servicios, ya que son estos los que deben registrarse al publicador de eventos y estarian escuchando cada vez que se emite un evento.

Un event publisher requiere de dos partes:

- un registro de las entidades interesadas en el evento
- un mecanismo de publicacion de eventos a las entidades interesadas.

Una de las ventajas de los eventos de aplicación es que cada servicio puede ejecutarse de manera asincrónica, evitando que el flujo se bloquee debido a los tiempos de procesamiento, como ocurre en el caso de las ejecuciones sincrónicas.

### Pros y contras Event Driven Programming

#### Pros

- Desacople entre las partes publicadoras y consumidoras del evento
- Flexibilidad, es muy sencillo añadir o eliminar consumidores sin modificar el productor.
- Proceso asíncrono sencillo, sin la necesidad de gestionar hilos.
- Al estar las partes más desacopladas, puede ser más sencillo de testear, solo se debe testar que el controlador emite el evento correctamente.

#### Contras

- Es más complicado seguir el flujo, se debe buscar que entidades estan resgitradas y que ejecutan al escuchar el evento
- Tarea de debug más difícil.
- Añade la complejidad del Event Publisher.(Mitigado usando frameworks como .NET o Spring.)

#### Cuando usar?

- Cuando en el futuro probablemente necesitemos más entidades que procesen el mismo evento.
- Necesidad de operaciones asíncronas.
- Cuando la parte productora no necesite el resultado de la parte que escucha y procesa el evento

### Event Driven Architecture

- Patrón de arquitectura software en el que el flujo de información entre los distintos subsistemas viene determinado por eventos.
  - Un componente o subsistema publica un evento.
  - Otro lo consume.
- Muy utilizado en microservicios.

Por ejemplo, un subsistema puede comunicarse con otro utilizando una API REST, donde el primero realiza una solicitud HTTP al segundo. Este último responde con un resultado, si es necesario. Este tipo de interacción implica que ambos subsistemas deben estar conscientes uno del otro, lo cual crea un acoplamiento y una dependencia directa. Además, es crucial gestionar la respuesta de manera asincrónica para mantener la eficiencia y la escalabilidad del sistema.

- Ahora usando el patrón de arquitectura basado en eventos, un servicio de subscribe a los eventos que quiere escuchar
- El otro servicio publica los eventos
- El event manager redirige los eventos a los consumers
  - Desacople total entre los subsistemas
  - Procesamiento asincrono

## Microservicios

### Introducción

- Los microservicios se utilizan para la creación de software complejo de manera eficiente, rápida y a mayor escala.
- Los microservicios son agnósticos de la tecnología
- El término 'micro' en microservicios no se refiere al tamaño del software, sino a la separación de contextos. Este enfoque permite que cada servicio esté claramente delimitado, lo cual facilita su organización y gestión por equipos específicos.
- A diferencia de las arquitecturas monolíticas, los microservicios y las metodologías ágiles permiten estar iterando el ciclo del vida del software por cada nuevo feature que añadimos al producto
- Permite despliegues solo de los contextos con nuevo código y no de todo el sistema. Es posible mantener disponible el producto sin tener que bajarlo para poder desplegar.
- Cada microservicio debe propender a gestionar su propio almacen de datos para evitar acoplar los microservicios a una única base de datos compartida. Aunque hay microservicios que comparten base de datos esto es un antipatron
- Tambíen deben contar con su propio equipo, repositorio.
- Cada microservicio puede implementar la tecnología mas apropiada al caso de uso
- Se pueden desplegar de manera independiente.
- Los microservicios se divide en contextos cerrados (bounded context) y se crea un microservio por cada contexto
- Un Microservicio debe hacer una sola cosa y hacerla bien, no debe acaparar mucha responsabilidad.

No puede haber dependencia entre los distintos microservicios, para deshacer las dependencias se requiere que cada microservicio cuente con su propio modelo de datos, las entidades comunes entre los contextos no genera duplicidad sino una clarificación de código.

![](/notes/arquitectura_software/assets/example_microservice.png)

- Es necesario una buena comunicación entre los equipos que administran cada servicio para dejar claras las necesidades y restricciones.
- Como métodos de comunicación entre los microservicios podemos usar API rest o event driven architecture.

### Elemento de los microservicios

#### Almacenenes de datos

- Compartir la base de datos es un antipatron
- Una base de datos compartida no se puede desarrollar, desplegar y escalar de manera independiente
- Hay riesgo que un microservicio modifique información que no le corresponde

Para la sincronización de los datos hay dos opciones:

- Bajo demanda -> se pierde independencia entre los microservicios
- Sistema de mensajes -> un microservicio publica un evento cuando sus datos han sido modificados, y los microservicios interesados lo consumen y actualizan su información

#### Comunicaciones entre microservicios

- Puedes ser por API Rest pero esto genera que los servicios esten acoplados, por lo general es sincrono y los servicios tienen que estar disponibles para que funcione.

- Sistema de mensajes como kafka, rabbitMQ, activeMQ, son asincronos, desacople total entre los servicios, si un sistema no esta disponible el mensaje puede permanecer en la cola hasta que vuelva a estar disponible.

Con API Rest puede haber multiples request para todos los servicios que necesitan comunicarse, con un sistema de mensajeria solo se requiere de un solo evento para todos los servicios que esten suscritos.

API rest se debe usar cuando es necesario una comunicación sincrona mientras que los eventos son preferibles para operaciones asincronas que lleven mucho procesamiento.

#### Interfaz de usuario

Hay tres opciones para manejar la interfaz de usuario:

- Un solo front: en este caso se requiere generar una API Layer que se encargue de enrutar los pedidos a cada microservicio, al ser un único front es mas facil garantizar consistencia visual pero puede llegar a convertirse en un monolito con múltiples responsabilidades

- Cada microservicio expone su front, esto hace que podamos navegar a través de diferentes fronts, puede que sea complicado garantizar consistencia visual

- Fragmentos: cada microservicio expone fragmentos para construir un front único lo que puede ser un modelo complicado y que no garantiza lograr la consistencia visual.

### Servicios distribuidos y despliegue

Los microservicios al ser independientes ofrecen un sistema escalable y altamente disponible.

#### Tipos de escalabilidad

**Escalabilidad vertical:** se añaden mas recursos a una misma máquina, mas potencia en un nodo. Puede ser para tareas costosas que requieren mucha memoria.

**Escalabilidad horizontal:** Múltiples instancias del proceso que queremos escalar, mayor capacidad de procesamiento en paralelo, procesamiento de mas peticiones en el mismo tiempo, se eliminan puntos únicos de fallos (Pieza que si falla el sistema deja de funcionar)

#### Servicios distribuidos

**Interacción HTTP:** Uno de los retos en las API REST es conocer la ubicación de cada microservicio. Para ello, se utiliza un registro de servicios que almacena las direcciones IP y puertos de los servicios, y redirige las solicitudes según corresponda (ejemplo: Eureka). Sin embargo, si el registro de servicios falla, el sistema deja de funcionar, convirtiéndose en un punto único de falla. Por esta razón, estos registros deben ser robustos para garantizar su disponibilidad. Además, se requiere un mecanismo de descubrimiento de servicios (service discovery) para que los microservicios puedan ser ubicados y registrados automáticamente.

En el caso de escalabilidad horizontal, al tener multiples instancias de un mismo servicio se debe conocer a cual de ellas se hace las peticiones, para eso se usan los balanceadores de carga, este tipo de sistema puede estar integrado en el registro de servicios.

**Interacción por mensajes**

Los microservicios no necesitan saber de la ubicación de los otros microservicios e intancias, se suscribe a los eventos que le interesan y publica los eventos necesarios.

En el caso de multiples instancias, utiliza la primera que encuentre libre.

El servicio de mensajes se convierte en el punto único de falla

### Seguridad y monitorización microservicios

#### Seguridad

La seguridad en microservicios es un punto crítico ya que existen mas punto de entrada al sistema.

Una primer opción podria ser que cada microservicio tuviera su propio sistema de autenticación pero esto sería ineficaz e ineficiente porque por cada interacción deberían autenticarse.

Existen servicios de autenticación centralizada, como Keycloak y Okta, que gestionan la autenticación en un único punto. En este modelo, cada microservicio solo comparte y verifica el token de autenticación, garantizando así una gestión eficiente y segura de las credenciales.

#### Monitorización

En la actualidad, es esencial tener un conocimiento exhaustivo de nuestro sistema. Para ello, debemos registrar la información relevante utilizando distintos niveles de log: debug, info, warn y error, lo que nos permitirá aplicar filtros efectivos.

Para evitar la segregación de la información debido a la presencia de múltiples microservicios e instancias, es recomendable centralizar los logs en un único repositorio, como Splunk, para facilitar su consulta.

Además, para la consulta de información en tiempo real, se pueden utilizar plataformas como New Relic.

### API Gateway

Una API Gateway actúa como un punto de entrada único para las solicitudes que van dirigidas a varios servicios en un sistema basado en microservicios. Aquí están algunas de sus funciones principales:

Enrutamiento de Solicitudes: La API Gateway recibe solicitudes de los clientes y las redirige al servicio correspondiente en el backend. Esto simplifica la comunicación cliente-servidor al proporcionar un único punto de acceso.

Autenticación y Autorización: Puede manejar la autenticación de las solicitudes entrantes y asegurarse de que solo los usuarios autorizados tengan acceso a los servicios específicos.

Agregación de Respuestas: Puede reunir datos de múltiples servicios y devolver una respuesta unificada al cliente, reduciendo la cantidad de llamadas necesarias desde el cliente.

Transformación de Protocolo: Puede convertir protocolos y formatos de mensajes, por ejemplo, transformando una solicitud REST en una llamada SOAP y viceversa.

Gestión de Seguridad: Implementa medidas de seguridad como la protección contra ataques DDoS, limitación de tasas (rate limiting) y políticas de autorización.

Registro y Monitoreo: Centraliza el registro y monitoreo de las solicitudes, proporcionando un lugar único para rastrear el tráfico y diagnosticar problemas.

Balanceo de Carga: Puede distribuir las solicitudes entre múltiples instancias de un servicio para equilibrar la carga y mejorar la disponibilidad.

Gestión de API: Facilita la gestión del ciclo de vida de las APIs, incluyendo el versionado y la documentación.

En resumen, una API Gateway simplifica y centraliza muchas funciones críticas para la gestión de microservicios, mejorando la eficiencia, la seguridad y la capacidad de administración del sistema.

### Pros y contras

### Pros

- División del sistema en subsistemas más manejables.
  - El código será más fácil de mantener.
- Independencia real entre equipos. Cada uno es dueño de su microservicio.
- Posibilidad de realizar escalado y optimización independiente.
  - Menor coste, empezamos con menos recursos y escalamos cuando sea necesario.
- Despliegue independiente. Si falla un microservicio, el resto podría seguir funcionando.
- Elección de la tecnología apropiada para cada microservicio.

#### Contras

- Cooperación entre distintos equipos para los puntos en común entre microservicios.
- Más complejo en general que una solución monolítica.
  - Necesidad de identificar correctamente los subdominios.
  - Test en las fronteras entre microservicios.
  - Despliegue del sistema completo.
  - Seguridad.
- Interfaz de usuario.
  - Si es única, se puede volver un monolito difícil de mantener, y el equipo que la
    desarrolla puede ser el cuello de botella.
- Si son varias puede haber problemas en la integración en una única UI.

#### Cuando usar

- Sistemas grandes y complejos con subdominios claramente identificables.
- Disponibilidad de personal para asignar al equipo de cada microservicio.
- Sistemas de alta disponibilidad en los que necesitemos escalar fácilmente cada pieza.
- Ahorro de costes.

## Otros patrones y estilos de arquitectura

### Arquitectura Hexagonal

La arquitectura hexagonal, también conocida como arquitectura de puertos y adaptadores, es un enfoque de diseño de software que tiene como objetivo hacer que un sistema sea más flexible y fácil de mantener al desacoplar su lógica de negocio de las interfaces externas.

#### Componentes Clave

**Dominio Central (Lógica de Negocio):**

- Representa el núcleo de la aplicación.
- Contiene la lógica de negocio y las reglas fundamentales.
- No tiene dependencias directas con el mundo exterior.

**Puertos (Interfaces):**

- Definen contratos que la lógica de negocio necesita para interactuar con el mundo exterior.
- Son abstracciones que representan lo que el sistema necesita (entradas) y proporciona (salidas).

**Adaptadores:**

- Implementan los puertos para conectar el núcleo de la aplicación con el mundo exterior.
- Pueden ser adaptadores primarios (para recibir datos) o secundarios (para enviar datos).
- Ejemplos incluyen controladores de API, repositorios de bases de datos, sistemas de mensajería, etc.

#### Beneficios

**Desacoplamiento:**

La lógica de negocio no depende directamente de detalles de implementación externos, facilitando los cambios y la evolución del sistema.

**Testabilidad:**

La separación clara entre la lógica de negocio y los detalles externos permite pruebas unitarias más simples y efectivas.

**Flexibilidad:**
Es fácil cambiar o añadir nuevas interfaces externas sin afectar el núcleo de la aplicación.

#### Ejemplo de Aplicación

Supongamos una aplicación de gestión de pedidos:

**Dominio Central:**

Clases que representan pedidos, clientes, productos y la lógica para manejar pedidos.

**Puertos:**

Interfaces como RepositorioDePedidos y NotificadorDeClientes.

**Adaptadores:**

Implementaciones concretas de los puertos, como RepositorioDePedidosSQL y NotificadorDeClientesEmail.

### Arquitectura Microkernel

La arquitectura de microkernel es una evolución del manejo de kernels monolíticos, que son robustos pero difíciles de mantener. Esta arquitectura implementa solo la funcionalidad mínima necesaria para que el sistema se ejecute y funcione, delegando la mayoría de las funcionalidades a componentes externos llamados plug-ins.

**Microkernel:**

- Se encarga de coordinar los plug-ins registrados en él.
- Proporciona canales de comunicación entre los plug-ins.

**Plug-ins:**

- Son componentes que aportan funcionalidades adicionales al sistema.
- No pueden operar de manera independiente y dependen del microkernel para funcionar.
- Aportan modularidad, facilitando el mantenimiento y la escalabilidad del sistema.

_Esta arquitectura también es conocida como "arquitectura de plug-ins" debido a su dependencia en estos componentes modulares para expandir las capacidades del sistema._

#### Aspectos positivos

- Más fácil de testear.
- Más fácil de mantener a largo plazo que una arquitectura monolítica.
- Flexibilidad para añadir o eliminar plug-ins, permitiendo así una personalización del sistema según las necesidades.

#### Aspectos Negativos

- Necesita un análisis previo.
  - ¿Qué funcionalidades introducimos al microkernel?
  - ¿Qué plug-ins tenemos? ¿Cuán grandes deben ser los plug-ins?
  - ¿Existe comunicación entre plug-ins? ¿Mecanismo de comunicación?
- No demasiado apto para arquitecturas web.
  - Los microservicios son una mejor opción.

#### Cuando usar

- Aplicaciones de escritorio que necesiten el concepto de plug-ins.
- Necesidad de un sistema escalable.
- Sistemas con un tiempo de vida largo.

## Arquitectura Testeable

Para implementar CI/CD y garantizar la calidad del código, es esencial realizar pruebas exhaustivas antes de la integración y despliegue.

Las diferentes arquitecturas buscan crear un código más modular y fácil de testear.

![](/notes/arquitectura_software/assets/test_pyramid.png)

### Pruebas Unitarias

Los tests unitarios son rápidos, fáciles de crear y mantener, pero tienen una integración limitada con otros módulos del software.

- Cobertura: Se recomienda tener una alta cobertura, superior al 90%.
- Mocking: Mockear dependencias para aislar la clase bajo prueba.
- Condiciones: Testear diferentes condiciones y casos límite.

### Pruebas de Integración

Las pruebas de integración prueban cómo interactúan varios componentes del sistema y suelen ser más costosas.

- Base de Datos: Para pruebas con bases de datos, se recomienda utilizar testcontainers de Docker para desplegar bases de datos reales y realizar pruebas de migración y acciones específicas.
- Ejecución: Son más lentas de ejecutar que las pruebas unitarias.

### Pruebas de Contrato

Las pruebas de contrato verifican las interfaces entre dos servicios, siendo útiles en arquitecturas de microservicios. Prueban ambos extremos de la comunicación: productores y consumidores.

- Ejecución: Son rápidas de ejecutar.

### Pruebas de UI

Las pruebas de UI, a diferencia de las pruebas E2E, mockean las respuestas del backend para verificar la interfaz.

- Utilidad: Pueden ser menos útiles si los componentes cambian constantemente.

### Pruebas E2E

Las pruebas E2E verifican el sistema completo en un entorno similar al de producción. Son costosas y lentas.

- Cobertura: Prueban el sistema desde un punto de entrada hasta el punto donde se reflejan los resultados.

### Pruebas de Aceptación

- Las pruebas de aceptación utilizan un lenguaje común, lo que permite integrar a los stakeholders.
- Sintaxis: Utilizan la sintaxis Given-When-Then.
- BDD: Siguen el enfoque de BDD (Behavior Driven Development).

### Pruebas de Exploración

Las pruebas de exploración son las más costosas ya que se realizan manualmente. Implican explorar el sistema y tratar de encontrar fallos.

### Estrategia de Pruebas

- Pruebas Unitarias: Deben ser numerosas y cubrir la mayoría de los casos.
- Pruebas de Integración: Limitarlas a componentes críticos, como bases de datos o dependencias de terceros.
- Pruebas de UI: Focalizar en los flujos más importantes o comunes.
- Pruebas E2E: Reservarlas para la validación completa del sistema en entornos de producción.

Una arquitectura testeable garantiza que el código sea robusto, fiable y apto para su integración y despliegue continuo.

## Evolving / Sacrificial Architectures

### Evolving Architecture

Una buena arquitectura debe ser flexible. No importa si se elige una arquitectura monolítica, DDD, CQRS, microservicios, etc. Una buena arquitectura debe permitir tomar decisiones en el mejor momento posible.

### Sacrificial Architectures

La mayoría del código que escribes ahora se desechará en dos o tres años. No se debe abandonar la calidad del diseño y del código, ya que esto traerá problemas mucho mayores rápidamente.

#### Principios:

- Arquitectura Modular: Diseñar de manera que permita desechar un módulo o componente afectando lo menos posible al sistema.
- Equilibrio: Mantener un equilibrio entre una buena arquitectura, la calidad del código y el hecho de que el código tiene una vida útil limitada a medio plazo.

## Conclusiones
