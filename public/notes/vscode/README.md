[//]: # @param group $$ DevTools
[//]: # @param title $$ VsCode
[//]: # @param author $$ Iván D. Sánchez

# VsCode

## Introducción

### Configurando el espacio de trabajo

- Es posible ocultar el Minimap y volverlo a traer con CMD + Shift + P -> view: Toggle Minimap
- Es posible ocultar el Activity Bar (Explorer, Search, Source control .... ) y volverlo a traer con CMD + Shift + P -> view: Focus Activity Bar

### Extensiones recomendadas

- Error lens -> Ayuda a marcar errores de sintaxis
- Material Icon Theme -> Para formatear los iconos del scafolding según extensión o tipo de archivo.
- Activitus Bar -> Puede reemplazar de manera minificada la Activity Bar
- Auto Rename Tag -> Para renombrar etiquetas HTML tanto el tag de inicio como el final al mismo tiempo
- TODO Highlight -> Para resaltar en el código los comentarios que tienen TODO o FIXME (Se pueden agregar mas keywords)
- Better Comments -> Resaltar y darle formato a los comentarios del codigo
- Terminal -> aunque está deprecada es util para crear un atajo para abrir rapidamente la terminal

### Sincronización de las configuraciones en otros equipos

Para sincronizar basta con activar en Account de la Acitivity Bar, la opción **Backup and Sync settings** e iniciar sesión ya sea con una cuenta Microsoft o de Github

### Configurar el comando 'code'

cmd + shift + p -> Shell command: install 'code' command in PATH

## Ediciones y tips básicos

### shortcuts

- Toggle Activity Bar -> cmd + b
- Toggle Panel (terminal, outputs) -> cmd + j

[Tips and tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)

[Shortcuts MAC](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)

### Mover lineas

⌥ ↓ / ⌥ ↑ (Option + up/down arrow)

### Ordenar Líneas

Si las líneas tiene un patron es posible seleccionarlas todas + paleta de comandos (cmd + shift + p) -> sort line ascending

### Comentar código

- cmd + / -> comenta una línea completa o bloque de código o seleccionar -> paleta de comandos -> toggle line comment

- option + shift + A -> comenta un trozo de código

### Crear Archivo

cmd + click en una ruta si esta no existe crear el scafolding y el archivo.

### Definiciones

Si pasamos el cursor sobre un método o función podemos ver la definición pero si lo hacemos oprimiendo cmd podemos ver su declaración y si hacemos click vamos al archivo donde esta definido.

### Borrar línea con multicursor

Pararse sobre palabra común en líneas a borrar cmd + shift + L para seleccionar

Borrar cmd + shift + k

### open terminal

ctrl + ` backtick

### Emmet wrap

No tiene un shortcut por default, se puede acceder mediante la paleta de comandos -> seleccionar Emmet wrap abbreviation y se puede agregar selectores de css para construir un wrap.

### Manejo de tabs

- ⌘ W Cerrar tab / Cerrar aplicación
- ⌘ K ⌘ W Cerrar todas
- ⇧ ⌘ T Reabrir anterior

### Tabulaciones

- Tab
- Tab + Shift

## Múltiples cursores y edición rápida

### Clonar líneas

- Copy line up / down (en paleta de comandos)

- option + shift + (up / down)

### Multicursor básico

- cmd + option (up / down) Genera múltiples cursores

### Multicurso copiar, formato y uppercase a lowercase

- ⌥ ⌘ ↑ / ↓ -> option + shift + right para seleccionar hasta el final

- Las opciones de transformar uppercase y lowercase están en la paleta de comandos si no tienen un shortcut configurado.

- Para posiciones espeficas podemos generar multiples cursores manteniendo oprimido option + doble click en caso de que algo se salga del patron se puede seleccionar sin soltar option y click sostenido para seleccionar.

- Se pueden crear multiples cursores buscando el próximo match (find next match) cmd + d

## Definiciones y snipets
