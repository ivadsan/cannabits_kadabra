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
- routes/user.routes.js -> Gestión de usuarios

Cada archivo de rutas debe importar de express  *Router* y crear una instancia a partir de él. Exportar.

**src/routes/products.routes.js**

    import {Router} from "express"
    const router = Router()

    export default router


Está información se repite en cada archivo de rutas

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


## Crear un objeto

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


## Listar objetos

Ahora en el método get vamos a utilizar el modelo y su método find para consultar todos los documentos de la collection, los cuales son devueltos en un arreglo. Podemos agregar un status en la respuesta del endpoint pero si no la ponemos esta por defecto contesta 200


*src/controllers/products.controller.js*

    ...

    export const getProducts = async (req, res) => {
        const products = await Product.find()
        res.json(products)
    }

    ...


### Postman Tips

Es posible organizar los request por collections que a su vez contengan carpetas para agrupar los endpoints como por ejemplo por el conjunto de servicios que afectan un modelo

Estas collectiones de postman se pueden exportar a nuestro proyecto y almacenarse en la ruta recomendada "/postman" para efectos de documentación y backup (Importar)

 

 ## request parameters

 (req.params) Checks route params, ex: /user/:id

(req.query) Checks query string params, ex: ?id=12 Checks urlencoded body params

(req.body), ex: id=12 To utilize urlencoded request bodies, req.body should be an object. This can be done by using the _express.bodyParser middleware.

### req.params

Permite acceder a los parámetros pasados por url utilizando posiciones que previamente fueron configuradas en las rutas

/products/:productId

*src/controllers/products.controller.js*

    export const getProductById = async (req, res) =>{
        const product = await Product.findById(req.params.productId)
        res.status(200).json(product)
    }


*get request*

    http://localhost:5000/products/61ef768dccf030f6d3e1a807

## Update
Para realiza una actualización buscaremos el producto por su id  enviado por query params y utilizando el método put.

para buscar y actualizar el documento usamos el método findByIdAndUpdate  el cual recibe tres parámetros, el id, un obj con los campos a actualizar y las opciones, en esta caso cada vez que actualizamos un documento se retorna su estado anterior, por ello indicaremos por medio de las opciones que retorne el nuevo documento actualizado.


*src/controllers/products.controller.js*

    export const udpateProductById = async (req, res) =>{
        const {productId} = req.params
        const product = await Product.findByIdAndUpdate(
            productId, 
            req.body,
            {
                new: true
            })
        res.status(200).json(product)
    }



*request*

![](/notes/nodejs_auth/assets/find-by-id-update.png) 


## delete


*src/controllers/products.controller.js*

    export const deleteProductById = async(req, res) =>{

        const {productId} = req.params
        await Product.findByIdAndDelete(productId)
        res.status(204).json()

    }


## Autenticación

Mecanismo para el control de acceso a los servicios del servidor

Vamos a crear rutas  en *auth.routes.js* para que el usuario puede registrarse y loguearse


*auth.routes.js*

    import {Router} from "express"
    const router = Router()

    router.post("/signup")
    router.post("/signin")

    export default router


ahora vamos a crear los controladores *auth.controller.js* y el modelo *User* 

El modelo *User* va a estar relacionado con el modelo *Role* por medio de los ids de los documentos de esta collection,  

Para crear una relación de una collection con otra indicamos por medio de un objeto cual es el nombre de referencia del modelo y en el typo de datos le indicamos que es de tipo ObjectId

*src/models/User.js*

    import {Schema, model} from "mongoose"

    const userSchema = new Schema({
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        roles: [{
            ref: "Role",
            type: Schema.Types.ObjectId
        }]

    },{
        timestamps: true,
        versionKey: false
    })

    export default model("User", userSchema)



*src/models/Role.js*


    import {Schema, model} from "mongoose"

    const roleSchema = new Schema({
        name: String
    },
    {
        versionKey: false
    })

    export default model("Role", roleSchema)


Ahora vamos a crear los controladores del usuario, para ello debemos importar el modelo de usuario que acabamos de crear.

Creamos la estructura básica de dos request handlers en este controlador uno para el signup (dar de alta o inscribir el usuario en la aplicacion) y signin para autenticar a un usuario ya creado. 

Luego importamos este controlador a nuestras rutas de autenticación y aplicamos los handle request a los endpoint, por ultimo para probar si todo funciona importamos nuestro auth router desde 'App.js'

### Nota

Por lo general las rutas a la api rest son del tipo http://localhost:5000/api/  por lo que vamos a actualizar en App.js esta parte de la URL y tambien debemos hacerlo en nuestras colecciones de Postman.