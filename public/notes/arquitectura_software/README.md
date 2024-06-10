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
