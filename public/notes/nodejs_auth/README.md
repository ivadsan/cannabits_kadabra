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

Cada archivo de rutas debe importar de express  *Router* y crear una instancia a partir de él. Exportar.

**src/routes/products.routes.js**

    import {Router} from "express"
    const router = Router()

    export default router

~Está información se repite en cada archivo de rutas~


Ahora empezamos por agregar una primer ruta en products


**src/routes/products.routes.js**

    import {Router} from "express"
    const router = Router()

    router.get("/products",  (req, res) => res.json("get products"))

    export default router


Importar las rutas desde *src/app.js* y con un middleware de express usarlas en el enrutamiento


**src/app.js**


    import express from "express"
    import morgan from "morgan"
    import pkg from "../package.json"
    import productRoutes from "./routes/product.routes"

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

    app.use(productRoutes)

    export default app


Podemos mejorar el enrutamiento pasando por el middleware la ruta que agrupa el conjunto de rutas del archivo importado.


**src/app.js**

    ...

    app.use("/products",productRoutes)

    ...


**src/routes/products.routes.js**

    import {Router} from "express"
    const router = Router()

    router.get("/",  (req, res) => res.json("get products"))

    export default router


Podemos crear el enrutamiento para los diferentes tipos de métodos POST, PUT, DELETE

### controllers

Ahora vamos a crear las funciones que se ejecutaran desde los endpoint que estamos configurando

*src/controllers/products.controllers.js*

    export const createProduct = (req, res) =>{

    }

    export const getProducts = (req, res) =>{
        res.json("get products")
    }

    export const getProductById = (req, res) =>{

    }

    export const udpateProductById = (req, res) =>{

    }

    export const deleteProductById = (req, res) =>{

    }


y las importamos desde nuestras rutas. Podemos importar todas las funciones en un solo controlador


**src/routes/products.routes.js**

    import {Router} from "express"
    const router = Router()
    import * as productsController from "../controllers/products.controller"

    router.get("/",  productsController.getProducts)

    export default router



Creando el resto de rutas

**src/routes/products.routes.js**

    import {Router} from "express"
    const router = Router()
    import * as productsController from "../controllers/products.controller"

    router.post("/",  productsController.createProduct)

    router.get("/",  productsController.getProducts)

    router.get("/:productId",  productsController.getProductById)

    router.put("/:productId",  productsController.udpateProductById)

    router.delete("/:productId",  productsController.deleteProductById)

    export default router


### Conexión a la base de datos

Ahora en *src/database.js* vamos a importar el modulo de conexión a la base de datos *mongoose*

Usamos la función connect de mongoose para conectarnos a la base de datos

importamos el archivo de conexión desde src/index.js


*src/database.js*

    import mongoose from "mongoose";

    mongoose.connect("mongodb://localhost/companydb")
    .then((db) => console.log("DB is connected") )
    .catch((err) => console.log(err))



*src/index.js*

    import app from "./app"
    import "./database"

    app.listen(5000)
    console.log("Server listen on port", 5000)

Agregamos informacion extra requerida en la conexión a mongodb



*src/database.js*

    import mongoose from "mongoose";

    mongoose.connect("mongodb://localhost/companydb",{
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then((db) => console.log("DB is connected") )
    .catch((err) => console.log(err))

## Modelos de datos

Vamos a crear los modelos de datos en *src/models/nombre.js*

En el archivo del modelo a crear importar de moongose la clase *Schema* y la función *model*

crear una instancia de Schema que recibe por parametro un objeto con el modelo de datos que consta de la key value y el tipo de dato. El segundo parametro que recibe Schema son opciones extras para el modelo en este caso agrega un timestamps y retirar el versionamiento.

exportamos el schema usando la función *model* que recibe dos parámetros: un nombre y el schema


*src/models/Product.js*

    import {Schema, model} from "mongoose"

    const productSchema = new Schema({
        name: String,
        category: String,
        price: Number,
        imgUrl: String
    },{
        timestamps: true,
        versionKey: false
    })

    export default model("Product", productSchema)


Ahora vamos a importar el modelo desde el controlador

vamos a usar el modelo para guardar datos por el medio del método post de la ruta que ejecute el controlador.

Por medio de req.body podemos acceder al objeto JSON que recibimos por la ruta. 


*src/controllers/products.controller.js*


    import Product from "../models/Product"

    export const createProduct = (req, res) =>{
        console.log(req.body)
        res.json("creating products")
    }

    ...


Para poder recibir objetos JSON debemos usar en *App.js* el método json de express.

*src/App.js*

    ...

    import productRoutes from "./routes/product.routes"

    ...

    app.set('pkg', pkg)

    app.use(morgan('dev'))
    app.use(express.json())

    ...

Usamos POSTMAN para probar la api rest.

Seleccionamos el método post con el cual enviaremos un objeto de typo json, para ello vamos a especificar en el header 

    // Key
    Content-Type

    //Value
    application/json

![](/notes/nodejs_auth/assets/postman-headers.png) 

y enviamos un JSON de prueba por raw

![](/notes/nodejs_auth/assets/postman1.png) 

Ahora vamos a guardar el *request body* en la base de datos. Para esto necesitamos crear una instancia de nuestro modelo que recibe como parametro el request body y usamos el metodo asincrono *save()*

Cuando se crea un objeto nuevo en la bd esta lo retorna y nosotros podemos devolverlo en la respuesta del request así como un código de status de la operación

*src/controllers/products.controller.js*

    import Product from "../models/Product"

    export const createProduct = async (req, res) =>{
        const {name, category, price, imgUrl} = req.body
        
        const newProduct = new Product({name, category, price, imgUrl})
        
        const productSaved = await newProduct.save()
        
        res.status(201).json(productSaved)
    }

Respuesta

![](/notes/nodejs_auth/assets/response1.png) 
