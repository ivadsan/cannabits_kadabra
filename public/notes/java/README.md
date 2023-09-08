[//]: # @param group $$ Java
[//]: # @param title $$ Curso de Frontend Developer
[//]: # @param author $$ 01. Java SE - Básico

# Java

## Introducción

_Write Once Run Anywhere - WORA_

_Escribelo una vez y ejecutalo donde quieras_

### Instalación del JDK

JDK kit de desarrollo de Java, contiene todas las librerías necesarias para empezar

- Desde la version 10 en adelante solo se pueden ejecutar en máquinas de 64 bits

Si instalamos Java desde la página de Oracle, OpenJDK u otras se muestra dos versiones macOS / AArch64 y macOS / x64 la primera es para procesadores M1 y la otra para intel

Tanto la version de oracle como open jdk son gratis no requiere licencia pero al pasar a produccion la version de Oracle requiere licencia mientras que la open no, pero esta última no recibe los parches de seguridad que desarrolla Oracle.

Antes Java JRE ( Java Runtime Enviroment - la máquina virtual para correr java) venia por separado hasta la version 8, las versiones posteriores lo incluyen en el JDK

### IntelliJ IDEA

Para IntelliJ IDEA instalamos la version community, es una versión libre para desarrolladores.

### Instalación de SDKMAN

SDKMAN como gestor de versiones de JDK y otras dependencias.

para instalar

```
curl -s "https://get.sdkman.io" | bash

```

Para obtener todos los programas que podemos instalar con sdkman

```
sdk list

```

para ver todas las versiones candidatas de los programas por ejemplo

```
sdk list java

```

Para instalar una versión en concreto nos guiamos del identifier que aparece en el listado por ejemplo

```
sdk install java 17.0.8-tem

```

ahora para seleccionar temporalmente mientras está la sesión de sheel una version de las instaladas usamos

```
sdk use java 17.0.8-tem

```

si queremos que sea la version permanentemente por defecto

```
sdk default java 17.0.8-tem

```

Si quisieramos instalar spring y lo hicieramos de la siguiente manera sin indicar la version, instalaria la ultima version que haya

```
sdk install springboot

```

Nuevamente si quiero ver las versiones

```
sdk list springboot

```

### Iniciando con Java

El método main es el punto de entrada a la aplicación
