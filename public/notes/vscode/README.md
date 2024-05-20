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

> Si pasamos el cursor sobre un método o función podemos ver la definición pero si lo hacemos oprimiendo cmd podemos ver su declaración y si hacemos click vamos al archivo donde esta definido.

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

## Definiciones y snippets

### Definiciones en un archivo

cmd + p y luego agregar @ arroba para acceder a los atributos, metodos y demás.

### Ir a una línea

cmd + P -> y luego agregar : seguido del número de la línea

### Replace symbol

- En el caso de querer renombrar una clase y los lugares donde ha sido instanciada basta con pararse sobre el nombre de la clase y f2 -> renombrar, esto cambiara el nombre de la clase, los imports nombrados y donde se instancia.

- En caso de solo requerir un cambio en un archivo donde se usa la clase con un alias realizar la misma acción, esta solo tendrá efecto sobre el archivo que importa la clase.

### Snippets

- clg -> consol.log

### Snippets personalizados

Paleta de comandos -> Configure user snippets -> Elegir lenguaje

```
// Example output

class Hero {

    constructor() {
        console.log('Hero initialized');
    }

    showHero() {
        return this;
    }
}

// Snippet using multiple cursors and placeholders

"Create Hero Key": {
		"prefix": "hero",
		"body": [
			"class ${1:Hero} {",
			"constructor() {",
			"console.log('${1:Hero} initialized');",
			"}",
			"",
			"show${1:Hero}() {",
			"return this;",
			"}",
			"}"
		],
		"description": "Create Hero Desc"
	}
```

## Extensiones

### Paste JSON as Code

Convierte un JSON en una interface.

- Se debe tener el JSON el clipboard
- Paleta de comandos y seleccionar Paste JSON as Code
- Ingresa el type mas alto, enter

**Output**

```
export interface Pokemon {
    abilities:                Ability[];
    base_experience:          number;
    cries:                    Cries;
    forms:                    Species[];
    game_indices:             GameIndex[];
    height:                   number;
    held_items:               HeldItem[];
    id:                       number;
    is_default:               boolean;
    location_area_encounters: string;
    moves:                    Move[];
    name:                     string;
    order:                    number;
    past_abilities:           any[];
    past_types:               any[];
    species:                  Species;
    sprites:                  Sprites;
    stats:                    Stat[];
    types:                    Type[];
    weight:                   number;
}

export interface Ability {
    ability:   Species;
    is_hidden: boolean;
    slot:      number;
}

export interface Species {
    name: string;
    url:  string;
}

export interface Cries {
    latest: string;
    legacy: string;
}

export interface GameIndex {
    game_index: number;
    version:    Species;
}

export interface HeldItem {
    item:            Species;
    version_details: VersionDetail[];
}

export interface VersionDetail {
    rarity:  number;
    version: Species;
}

export interface Move {
    move:                  Species;
    version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
    level_learned_at:  number;
    move_learn_method: Species;
    version_group:     Species;
}

export interface GenerationV {
    "black-white": Sprites;
}

export interface GenerationIv {
    "diamond-pearl":        Sprites;
    "heartgold-soulsilver": Sprites;
    platinum:               Sprites;
}

export interface Versions {
    "generation-i":    GenerationI;
    "generation-ii":   GenerationIi;
    "generation-iii":  GenerationIii;
    "generation-iv":   GenerationIv;
    "generation-v":    GenerationV;
    "generation-vi":   { [key: string]: Home };
    "generation-vii":  GenerationVii;
    "generation-viii": GenerationViii;
}

export interface Other {
    dream_world:        DreamWorld;
    home:               Home;
    "official-artwork": OfficialArtwork;
    showdown:           Sprites;
}

export interface Sprites {
    back_default:       string;
    back_female:        null;
    back_shiny:         string;
    back_shiny_female:  null;
    front_default:      string;
    front_female:       null;
    front_shiny:        string;
    front_shiny_female: null;
    other?:             Other;
    versions?:          Versions;
    animated?:          Sprites;
}

export interface GenerationI {
    "red-blue": RedBlue;
    yellow:     RedBlue;
}

export interface RedBlue {
    back_default:      string;
    back_gray:         string;
    back_transparent:  string;
    front_default:     string;
    front_gray:        string;
    front_transparent: string;
}

export interface GenerationIi {
    crystal: Crystal;
    gold:    Gold;
    silver:  Gold;
}

export interface Crystal {
    back_default:            string;
    back_shiny:              string;
    back_shiny_transparent:  string;
    back_transparent:        string;
    front_default:           string;
    front_shiny:             string;
    front_shiny_transparent: string;
    front_transparent:       string;
}

export interface Gold {
    back_default:       string;
    back_shiny:         string;
    front_default:      string;
    front_shiny:        string;
    front_transparent?: string;
}

export interface GenerationIii {
    emerald:             OfficialArtwork;
    "firered-leafgreen": Gold;
    "ruby-sapphire":     Gold;
}

export interface OfficialArtwork {
    front_default: string;
    front_shiny:   string;
}

export interface Home {
    front_default:      string;
    front_female:       null;
    front_shiny:        string;
    front_shiny_female: null;
}

export interface GenerationVii {
    icons:                  DreamWorld;
    "ultra-sun-ultra-moon": Home;
}

export interface DreamWorld {
    front_default: string;
    front_female:  null;
}

export interface GenerationViii {
    icons: DreamWorld;
}

export interface Stat {
    base_stat: number;
    effort:    number;
    stat:      Species;
}

export interface Type {
    slot: number;
    type: Species;
}
```

### TODO Highlight

Además de resaltar los comentarios de tipo TODO: y FIXME: (se pueden agregar otros keywords), permite listar en la termina todos los archivos que contienen estos comentarios.

Ingresar por lo paleta de comandos - TODO list highlighted annotations y seleccionar cualquiera de las opciones ALL, TODO, FIXME

### CodeSnap

Sirve para crear imágenes de código para compartir.

- Abri CodeSnap por medio de la paleta de comandos
- Se abre una ventana donde mostrará la imagen
- Seleccionar el código que vamos a llevar a la imagen y listo.

### LiveServer

Monta un servidor para visualizar archivos HTML

### Color Highlight

Sirve para previsualizar los colores en hexadecimal, rgb.

### settings.json

Todas las configuraciones que son del usuario y no por defecto.

Paleta de comandos -> Open user settings (JSON)
