[//]: # @param group $$ NodeJS
[//]: # @param title $$ Nodejs REST API con JWT y Roles (Autorización y Autenticación) & Mongodb
[//]: # @param author $$ Iván D. Sánchez

# Nodejs REST API con JWT y Roles (Autorización y Autenticación) & Mongodb

[`Fuente`](https://www.youtube.com/watch?v=lV7mxivGX_I)

## Iniciando el proyecto

Inicializar el proyecto

    npm init -y

Instalar los módulos requeridos

npm i express bcryptjs cors dotenv jsonwebtoken mongoose morgan helmet

- express -> framework de NodeJs

- bcryptjs -> Para encriptar datos como la contraseña  

- cors -> para comunicar el backend con otros servidores

- dotenv-> para crear un modulo de variables de entorno

- jsonwebtoken -> basado en JSON para la creacion de tokens para la propagación de identidad y privilegios (claims)

- mongoose -> para conenctarnos a la bd y manipular los datos

- morgan -> para ver las peticiones por consola que llegan al servidor

- helmet -> Añade caracteristicas de seguridad al servidor

Ahora creamos el archivo *src/index.js*  y para probar su ejecución configuramos un script en el *package.json* para poder arrancar el servidor usando `npm start`

**package.json**

    "scripts": {
        "start": "node src/index.js"
    },


Ahora vamos a instalar *Babel* para poder utilizar las ultimas caracteristicas de *EcmaScript* en ambiente de desarrollo

- @babel/core -> es el modulo principal de babel
- @babel/cli -> para user babel desde línea de comandos
- @babel/node -> para utiliza Babel a través de node
- @babel/preset-env -> para utilizar las ultimas caracteristicas de transpilacion de Babel
- nodemon -> para ejecutar el servidor cada vez que se haga un cambio

    
        npm i -D @babel/core @babel/cli @babel/node @babel/preset-env nodemon

Ahora para poder escribir JavaScript moderno debemos modificar el script del package.json

    "scripts": {
        "start": "babel-node src/index.js"
    },

Tambien debemos crear un archivo *.babelrc*  en la raiz del proyecto y creamos un archivo JSON para configuración de los presets que vamos a usar.

    {
        "presets":[
        "@babel/preset-env" 
        ]
    }

Probando la transpilación de Babel usando las nuevas características de EcmaScript


**src/index.js**


    import express from "express"

    const app = express()
    app.listen(5000)

    console.log("Server listen on port ", 5000)


Ahora para usar nodemon debemos volver a cambiar el script del package.json


    "scripts": {
        "start": "nodemon src/index.js --exec babel-node"
    },

Ahora vamos a crear un script para cuando vayamos a compilar el código del  ambiente de desarrollo a producción, en este caso le indicamos que el código sea transpilado en la carpeta /build de la raíz del proyecto


    "scripts": {
        "build": "babel src --out-dir build",
        "start": "nodemon src/index.js --exec babel-node"
    },

cambiamos el script llamado start por dev, y creamos un nuevo script para start donde ejecutemos en producción el código compilado


    "scripts": {
        "build": "babel src --out-dir build",
        "dev": "nodemon src/index.js --exec babel-node",
        "start": "node build/index.js"
    },


Ahora vamos a crear las carpetas del proyecto

- controllers -> contiene las funciones que se van a ejecutar cada que un usuario ejecute una url

- libs -> Código reutilizable

- middlewares -> middlewares de express que se ejecutan cada que un usuario visita una ruta

- models -> modelos de datos en mongodb

- routes -> Contiene la rutas o endpoints disponibles en nuestro servido

    
        cd src
        mkdir controllers libs middlewares models routes


Ahora vamos a crear algunos archivos requeridos en la carpeta src/ del proyecto

- app.js -> Configuración de la aplicación

- config.js -> Propiedades de configuracion como por ejemplo la dirección y usuario de la base de datos, puerto de la aplicacion

- database.js -> para tener la conexión a la base de datos


Ahora vamos reorganizar el código teniendo en cuenta que el archivo index.js es solo para el arranque la aplicación mientras que app.js va a servir para configurar la aplicación de express. 

En app.js importamos morgan para para ver las peticiones por consola que llegan al servidor y lo implementamos como un middleware de express

**app.js**


    import express from "express"
    import morgan from "morgan"

    const app = express()
    app.use(morgan('dev'))

    export default app


**index.js**

    import app from "./app"
    app.listen(5000)
    console.log("Server listen on port", 5000)


 Ahora vamos a configurar nuestra primer ruta en el archivo src/app.js la cual retorna  un JSON  

 **src/app.js**

    import express from "express"
    import morgan from "morgan"

    const app = express()
    app.use(morgan('dev'))

    app.get("/", (req, res)=>{
        res.json("welcome!!")
    })

    export default app

Ahora vamos a devolver un objeto con la información del proyecto, para ello vamos a usar la data de nuestro archivo package.json.

Express nos permite crear variables que pueden estar disponibles en cualquier parte de la aplicación y que permiten mayor mantenibilidad del proyecto en caso de mover u organizar el código.

Para inicializar las variables de express usamos

    app.set('name', value)

y para accederlas usamos 

    app.get('name')

Para acceder a la información del package.json lo vamos a importar con un nombre diferente a package ya que es una palabra reservada e instanciamos una variable de express para luego poder ser consultada desde la ruta donde deseamos retornar la información.

**src/app.js**


    import express from "express"
    import morgan from "morgan"
    import pkg from "../package.json"

    const app = express()

    app.set('pkg', pkg)

    app.use(morgan('dev'))

    app.get("/", (req, res)=>{
        res.json({
            name:  app.get("pkg").name,
            description:  app.get("pkg").description,
            version:  app.get("pkg").version,
            author:  app.get("pkg").author
        })
    })

    export default app

## Creación de rutas

Para este proyecto vamos a utlizar los siguientes archivos para el enrutamiento:

- routes/auth.routes.js -> Rutas para autenticación
- routes/products.routes.js -> Gestion de productos
- routes/user.js -> Gestión de usuarios

Cada archivo de rutas debe importar de express el objeto *Router* y crear una instancia a partir de él para crear las rutas