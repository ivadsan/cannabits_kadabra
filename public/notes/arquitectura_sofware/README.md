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

- Al inicio teniamos arquitecturas donde la capa de presentación, logica de negocio y datos estaban todas mezcladas.
- Luego viene un ordenamiento donde se separan estas tres capas para organizar mejor la aplicación.
- Ahora en DDD es una evolución de la arquitectura de tres capas donde la capa de lógica de negocio se ha separado en aplicación y dominio.
- Donde aplicación es donde residen los casos de uso independientes de la capa de dominio.
- En esta arquitectura la capa de datos ahora es de infraestructura.

Presentación

- La capa de dominio debe ser lo mas estable del sistema, se debe evitar modificar el dominio para adaptarlo al exterior, debe estar desarrollado bajo el principio SOLID open / close, debe estar abierto para agregar mas funcionalidad pero cerrado para modificar las funcionalidad existente
- Antes de pensar en modificar la capa de dominio, se debe modificar las capas exteriores tales como infraestructura, presentación o aplicación
