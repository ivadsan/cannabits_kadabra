[//]: # @param group $$ Desarrollo de software
[//]: # @param title $$ Control de versiones - Git
[//]: # @param author $$ Iván D. Sánchez

# Git

## Instalación

### En Windows

[Descargar Git ](https://git-scm.com/)

En Linux

    sudo apt-get install git

## Testear la aplicación

    $ git --version

## Configuración

Configuración de las variables globales

    $ git config --global user.name "username"
    $ git config --global user.email "name@mail.com"

Ver los parámetros de configuración

    git config --list

Ubicación de los archivos que almacenan los parámetros de configuración

    git config --list --show-origin

## Introducción a Git

- Git es un sistema de Control de versiones
- Se utiliza tanto en el frontend como en el backend
- Se agrega un commit por cada cambio significativo
- Se recomienda no subir varios lotes de cambios en un solo commit

## Inicializar Git

### Inicializar un repositorio Git en un proyecto existente

- Ubicarse dentro del directorio raíz de proyecto

```
git init
```

- Se crea un subdirectorio .git que contiene los archivo requeridos para el repositorio
- .git almacena todos los cambios atómicos del proyecto

### Estado de los archivos en Git (Ciclo de vida)

Estado de los archivos trabajando con repositorio local

![Ciclo de vida](/notes/git/assets/git_areas.png)

#### Archivos Tracked

- Archivos que ya estan bajo seguimiento de Git
- Son archivos actualizado en su ultima version y no tienen cambios pendientes
- Ya pasaron por los comando git add y git commit

#### Archivos Staged

- Archivos en el staging area
- Son archivos que ya estan bajo seguimiento de Git
- Son archivos con modificaciones y que ya fueron afectados por el comando git add
- Los archivos estan pendientes de commit

#### Archivos Unstaged

- Son archivos que ya estan bajo seguimiento de Git
- Son archivos con modificaciones y no han sido afectados por el comando git add
- La version del repositorio Git esta desactualizada, la ultima versión se ubica solo en la carpeta de trabajo

#### Archivos Untracked

- Git no tiene conocimiento de estos archivos
- Los archivos solo existen en la carpeta de trabajo
- Los archivos nunca han sido afectados por el comando git add

#### Archivos staged y untracked a la vez

- Git no tiene conocimiento de estos archivos
- Los archivos han sido afectados por el comando git add y se encuentran en el staging area
- No se ha ejecutado el comando git commit
- Los archivos han sido modificados en el directorio de trabajo y tiene diferencias con los archivos del staging area

### Guardando archivos en el repositorio

Verificar el estado de los archivos y sus modificaciones si las hay

    git status

Agregar un archivo al staging area

    git add historia.txt

Agregar varios archivos al staging area

    git add .

Enviar los archivos del staging area al repositorio de git

    git commit -m "Version 1.0"

Agregar archivos al staging area y al repositorio git a la vez. Solo funciona con archivos que hayan pasado por el staging area previamente

    git commit -am "Otra forma de cargar la Version 1.0"

Ver los commits de un archivo

    git log historia.txt

### Comandos para mover archivos

#### git status

Muestra el estado de los archivos en el directorio de trabajo y el staging area

    git status

#### git add

Mover archivos untracked y unstaged al staging area
![git add](/notes/git/assets/git-add.jpg)

Agregar un archivo al staging area

    git add nombre_archivo

Agregar todos los archivos de la carpeta en la que se esta ubicado

    git add .

#### git commit

Mover los archivos del staging area al repositorio de git, se envia con un mensaje del usuario indicando las novedades del commit

Mover un solo archivo del staging area

    git commit blogpost.html -m "prueba commit individual"

Mover todos los archivos del staging área al repositorio de git

    git commit -m "Aquí va una descripción de los cambios adjuntos en el commit"

Se puede realizar un add y commit al tiempo, siempre y cuando los archivos hayan pasado por el stanging area

    git commit -am "add + commit"

#### git reset

**git reset --hard**

- Se reestablece todo el indice y el arbol de trabajo
- Se elimina todo lo posterior al commit seleccionado

  git reset --hard 526a255927e38d179a0cc90f1ee337b926583056

**git reset HEAD**

Eliminar archivos del staging area

- Staged -> Unstaged
- Staged -> Untracked
- Tracked -> Tracked

```
git reset HEAD nombre_archivo
git reset HEAD .
```

#### git rm

Eliminar archivos que ya han sido trackeados en el repositorio y mantener una copia en el directorio de trabajo

```
git rm --cached css/style.css
```

Eliminar archivos del repositorio y del directorio de trabajo.

- Git conserva un registro de los archivos
- Advertencia: al ejecutar el comando elimino la carpeta que lo contenia

```
git rm --force css/estilos.css
```

## Comandos de inspección y comparación

### git log

Ver los mensajes de los commit y hash-object de un proyecto o un archivo

Ver todos los commit de un proyecto

    git log

Ver los commit resumidos en una linea

    git log --oneline

Ver todos los commit de un archivo

    git log blogpost.html

Ver los commit más los archivos modificado y un estadístico de lineas insertadas o eliminadas.

    git log --stat

Ver todos los commits

    git log --all

Ver gráficamente las ramas

    git log --all --graph --decorate --oneline

Usando los alias de linux

    alias arbol="git log --all --graph --decorate --oneline"

**Nota** Donde (HEAD -> master) indica que es la última versión de la rama master

### git show

Ver los cambios realizados en un commit o tag.

Es utilizado para ver las anotaciones en caso de re-fusión manual de archivos por conflicto de fusión

Ver los cambios del ultimo commmit

    git show

Ver los cambios de un commit

    git show 5a05ff6a930d4afdcd41697be25663a3c681da28

Ver los cambios de un tag

    git show v0.1

### git diff

Ver los cambios entre commits, o un commit y el arbol de trabajo

Ver los cambios entre un commit y otro

    //git diff old_version recent_version
    git diff 9dca2c702a2d9868c5630e76b517594c5c683f12 47d1b073232debafa992746580321061966be4aa

Ver los cambios entre un commit y el working directory

    //git diff old_version
    git diff 475b734291c9046cb63d51419e055cdac9f48d15

**Nota:** Se puede tener archivos en el staging área que estén siendo modificados en el directorio de desarrollo. Al hacer un git status podemos ver que aunque el archivo este en staging también nos dice que hay una versión modificada en el directorio de desarrollo. Los cambios se pueden detectar usando git diff (Sin id de commit)

## branch (Rama)

- Por defecto los commit se crean en una rama master
- Un proyecto puede contener mas de una rama para crear flujos de trabajo independientes
- Al crear una rama esta lo que hace es replicar un commit según la rama que hayamos escogido como punto de partida, y desde ahí comenzar a trabajar aparte sin afectar el flujo de trabajo principal
- En equipos de desarrollo es recomendado utilizar el siguiente estandar para el manejo de ramas:
  - **master:** Lo que va a producción
  - **development:** Nuevas caracteristicas, prototipos
  - **hotfix:** Solución de bugs. La solucion se une con la rama master

![Branches](/notes/git/assets/branches.png)

Crear una rama

    git branch nombre_rama

o también se puede crear y posicionar en la rama

    git checkout -b nombre_rama

Explorar las ramas

    git branch

Moverse entre ramas

    git checkout nombre_rama

volver a la rama master

    git checkout master

Enviar rama a repositorio remoto

    git push origin nombre_rama

Eliminar una rama local

    git branch -d nombre_rama

Ver todas las ramas y su historial

    git show-branch
    git show-branch --all

### Intefaz gráfica para ramas - gitk

**Instalación Linux**

    sudo apt-get update
    sudo apt-get install gitk

Ver en una interfaz gráfica el historial de las ramas

    gitk

### Intefaz gráfica git gui

**Instalción en Mac**

    brew update
    bret install git-gui

- Se debe tener instalado previamente git

Para abrir la interfaz gráfica

    git gui

## checkout

Permite moverse entre ramas o restaurar el directorio de trabajo a una versión anterior
Moverse entre ramas

    git checkout nombre_rama

volver a la rama master

    git checkout master

Volver a un commmit

    git checkout id_commit

Volver a la última versión

    git checkout master

- **Al moverse a una rama y realizar cambios, siempre se debe hacer commit antes de volver a otra rama o se perderan las modificaciones**

- Git conserva todos los commit, es posible volver a la ultima version.

- En caso de volver una versión anterior para empezar a trabajar desde este punto, se puede hacer un **reset --hard**

## merge

Para fusionar dos ramas debemos ubicarnos desde donde queremos fusionar y luego realizar un merge de la rama que vamos a integrar

Ir a rama master

    git checkout master

Fusionar rama con otra rama

    git merge nombre_rama

Al realizar un merge se fusionan también el historial de commits de la rama que se integra

## Solución de conflictos

Luego de realizar un merge pueden surgir conflictos en las líneas de código compartidas en ambas ramas. Estos conflictos deben ser solucionados manualmente y los archivos quedan en un estado de unmerge mientras son depurados.

Ver los archivos y sus conflictos

    git diff

![git-diff](/notes/git/assets/git-diff.png)

Al solucionar el conflicto realizar add y commit para terminar el merge.

    git commit -a

### git pull

![git-pull](/notes/git/assets/git-pull.png)
