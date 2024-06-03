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

## Domain Driver Design (DDD)

### Arquitectura centrada en los datos

- Se planifica a partir de los datos a recolectar
- Se recopilan los requisito para satisfacer las reglas de negocio.
- Se inicia por el diseño del modelo de datos
- Se construye alrededor del model de datos
- Se obtiene una arquitectura altamente dependiente del modelo de datos

### Intro: Domain Driver Design

Es un enfoque de diseño y desarrollo de software que pone énfasis en la complejidad del dominio del negocio y en el lenguaje común entre los desarrolladores y los expertos del dominio. Su objetivo principal es crear software que refleje con precisión las realidades del dominio empresarial y permita una colaboración efectiva entre los desarrolladores y los expertos del negocio.

- Se piensa primero en el dominio del problema
- El objetivo es ser experto en el dominio del problema
- Se modelan las entidades, proceso y reglas especificas del domino
- Se implementan los casos de uso que se requieren resolver.
- Por una parte esta el dominio (Se mantiene en el tiempo) y por otra los casos de uso (Varian en el tiempo)

### Tiempo de desarrollo

- El dominio es invariable
- Los casos de usos son muchos mas inestables, tienden a cambiar en el tiempo

### Lenguaje Ubicuo

Toda la comunicación entre los diferentes roles del proyecto (PMs, desarrolladores, POs, clientes) debe ser en un lenguaje común y preciso, conocido como lenguaje ubicuo. Este lenguaje evita ambigüedades y establece claramente los conceptos y términos con los cuales se deben referir a las entidades y acciones del dominio. Su objetivo es garantizar una comprensión compartida y coherente del dominio, facilitando la colaboración y minimizando errores de interpretación.

### Bounded context (Contextos acotados)

- Los contextos acotados son areas del dominio en la un modelo específico es aplicable.

- Es una forma de organizar el modelo y la lógica de negocio de la aplicación guiado por dominio.

- Los contextos acotados tiene un sentido especial dentro del dominio

- Es un subdominio del dominio del problema

- Pueden tener su propio lenguaje ubicuo

- Las entidades fuera del dominio puede tener características ligeremente diferentes

- Pueden tener entidades compartidas y dependientes entre los contexto, las cuales deben ser separadas para evitar poner en riesgo la integridad del model.

- Tener una entidad compartida entre contextos no significa una duplicidad del código sino una aclaración del mismo.

- Al compartir entre contextos se puede llegar a la acumulación de detalles por eso es necesaria esta aclaración de las entidades dependientes.

#### Características de los Contextos Acotados

- **Independencia:** Cada contexto acotado es independiente de los demás y puede tener sus propias reglas de negocio, entidades y modelos.

- **Claridad de Límites:** Los límites del contexto están claramente definidos, lo que evita confusiones y ambigüedades en el uso de términos y conceptos.

- **Consistencia Interna:** Dentro de un contexto acotado, los términos y conceptos son coherentes y se usan de manera consistente.

- **Interacciones Controladas:** La comunicación entre contextos acotados debe ser bien definida y controlada para evitar dependencias innecesarias y para mantener la integridad de cada contexto.

### Mapeo de contextos
