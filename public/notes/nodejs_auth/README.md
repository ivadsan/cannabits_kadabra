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


*src/App.js* 

    import express from "express"
    import morgan from "morgan"
    import pkg from "../package.json"
    import productRoutes from "./routes/product.routes"
    import authRoutes from "./routes/auth.routes"

    const app = express()

    app.set('pkg', pkg)

    app.use(morgan('dev'))
    app.use(express.json())

    app.get("/", (req, res)=>{
        res.json({
            name:  app.get("pkg").name,
            description:  app.get("pkg").description,
            version:  app.get("pkg").version,
            author:  app.get("pkg").author
        })
    })

    app.use("/api/products", productRoutes)
    app.use("/api/auth", authRoutes)

    export default app

También para evitar un warning por utilizar     findOneAndDelete y findOneAndUpdate debemos  configurar en *database.js* useFindAndModify en true. SOLO SI HAY WARNING


*database.js*

    import mongoose from "mongoose";

    mongoose.connect("mongodb://localhost/companydb",{
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useFindAndModify: true
    })
    .then((db) => console.log("DB is connected") )
    .catch((err) => console.log(err))


Para el caso del signup vamos a consultar primero la base de datos si existe el usuario y sino lo creamos.

Los datos del usuario los recibiremos por medio del request body

Para los roles recibiremos un array, porque el usuario puede tener asingado mas de uno

Para crear un usuario vamos a utilizar el modelo User. El password no lo podemos crear en texto plano para ello vamos a utilizar bcrypt que permite encryptar el password.

La idea de encriptar un password no es solo codificarlo sino mantenerlo así y solo poder comparar si en el momento de autenticacion el valor ingresado coincide con el password encriptado sin tener que desencriptar.

bcrypt es basado el blowfish y utliza un fragmento llamado Salt que que se incorpora al hash y al generado, este  permite controlar el costo de procesado de datos haciendo mas complicado desencriptar el password por fuerza bruta o por rainbow tables ( tablas calculadas de cadenas de caracteres y su hash)

Volviendo a la creacion del usuario vamos a encriptar el password antes de guardarlo y para ello vamos a importar bcrypt desde el modelo User.

Podemos crear desde el modelo métodos, en este caso para cifrar y comparar la contraseñas.

Podedmos hacerlos de la forma:

    nombreSchema.methods.nombreMetodo

o podemos crear un  método estático, que son aquellos que no requieren crear una instancia del objeto para ser ejecutados
    
    nombreSchema.statics.nombreMetodo

Importamos el módulo *bcrypt* y a través de método genSalt vamos a indicarle las veces que va a recorrer el algoritmo de encrypción. Luego el método hash y el salt generado encryptan la contraseña recibida para el caso del signUp

Para el sigIn vamos a usar el métoco *compare* para cotejar si la contraseña encriptada enviada por el usuario coincide con la contraseña encriptada guardada en la bd, no se requiere desencriptar para la comparación. Si las contraseñas coinciden returna un booleano


*src/models/User.js*


    import {Schema, model} from "mongoose"
    import bcrypt from "bcryptjs"

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

    userSchema.statics.encryptPassword = async (password)=>{
        const salt =  await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    }
    userSchema.statics.comparePassword = async (password, receivedPassword)=>{
        return await bcrypt.compare(password, receivedPassword)
    }

    export default model("User", userSchema)


Ahora vamos a usar estos metodos desde el controllador. En caso que el usuario no exista vamos a crearlo en la bd para esto debemos crear una nueva instancia del Modelo User y para el password que envia el usuario vamos acceder al método estático para su encripción.


y grabamos con save()


*src/controllers/auth.controllers.js*

    import User from "../models/User"

    export const signUp = async (req, res)=>{

        const {username, email, password} = req.body
        const newUser =  new User({
            username,
            email,
            password: await User.encryptPassword(password)
        })
        await newUser.save()
        res.json("signup")
    }
    export const signIn = (req, res)=>{
        res.json("sigin")
        
    }

El método que valida si un usuario ya existe en la bd lo vamos a crear mas adelante como una librería ya que lo vamos a usar tanto en la suscripción como en la autenticación.

Cuando se guarda un usuario, mongo  retorna el objeto del usuario guardado, junto con él generamos y retornamos un token el cual será guardado en el Front-end con el id de este y será utilizado en las peticiones al backend. 

Si el token es valido al hacer una petición se autoriza al usuario para el consumo del servicio

El token se genera con el módulo de jsonwebtoken y lo retornamos en la respuesta del servicio de singup

jwt utiliza el método *sign()* para generar el token, este método recibe tres parámetros.

- Primero lo que vamos a guardar en el token, por lo general el id
- Segundo una palabra secreta
- tercero la configuracion del token, en este caso la expiración del token que durará 24 hours === 86400 seconds


Para el secreto vamos a exportar un objeto por default desde nuestro archivo *src/config.js*  con las constantes de nuestra configuracion

*src/config.js*

    export default {
        SECRET: "products-api"
    }

*src/controllers/auth.controller.js*

    import User from "../models/User"
    import jwt from "jsonwebtoken"
    import config from "../config"

    export const signUp = async (req, res)=>{

        const {username, email, password} = req.body
        const newUser =  new User({
            username,
            email,
            password: await User.encryptPassword(password)
        })
        const savedUser = await newUser.save()
        const token = jwt.sign({id: savedUser._id}, config.SECRET, {
            expiresIn: 86400
        })
        res.status(200).json({token})
    }

    export const signIn = (req, res)=>{
        res.json("sigin")
        
    }

Ahora vamos a crear una libreria que nos permita verifcar si existen roles en nuestra aplicación, sino existen se van a crear al iniciar la aplicación

Con el metodo estimatedDocumentCount() identificamos si ya hay documentos en la collection

en caso que no hayan documentos en la collection vamos a crear  los roles que necesitamos, para ello vamos a usar un Promise.all para ejecutar un array de promesas encargadas de la creación de cada Rol.

Vamos a anidar esta estructura en un try catch para poder manejar la excepción en caso que la haya 

*src/libs/initialSetup.js*

    import Role from "../models/Role"

    export const createRoles = async () => {

        try{
            const count = await Role.estimatedDocumentCount()
            
            if (count > 0) return 
            
            const values =  await Promise.all([
                new Role({name: "user"}).save(),
                new Role({name: "moderator"}).save(),
                new Role({name: "admin"}).save()
            ])
            
            console.log(values)
        }
        catch(error){
            console.error(error)
        }
    }

Vamos a ejecutar esta función desde App.js al iniciar la aplicación (después de instanciar nuestro servidor de express)

*src/app.js*

    import express from "express"
    import morgan from "morgan"
    import pkg from "../package.json"
    import productRoutes from "./routes/product.routes"
    import authRoutes from "./routes/auth.routes"
    import { createRoles } from "./libs/initialSetup"

    const app = express()
    createRoles()

    app.set('pkg', pkg)

    app.use(morgan('dev'))
    app.use(express.json())

    app.get("/", (req, res)=>{
        res.json({
            name:  app.get("pkg").name,
            description:  app.get("pkg").description,
            version:  app.get("pkg").version,
            author:  app.get("pkg").author
        })
    })

    app.use("/api/products", productRoutes)
    app.use("/api/auth", authRoutes)

    export default app

Cuando todavía no existen  los roles en BD, es la única oportunidad de ver por console la ejecución de este script que los crea

![](/notes/nodejs_auth/assets/createRoles.png) 

Ya tenemos roles en nuestra BD ahora cada vez que creemos un usuario vamos a relacionarlo con un rol por medio de su id

En auth.controller.js antes de guardar el usuario vamos a confirmar si estan enviando por body request la propiedad roles

Si un usuario no envia el arreglo de roles, por defecto le vamos a agregar el role user

Importamos el modelo Role y con el método find() enviamos una consulta a la bd para que busque los roles enviados en un array de nombres de rol y retorne el documento de los objetos que encuentre. Si no envian la propiedad roles se busca el primer documento que coincida con el role name: "user"


*src/controllers/auth.controller.js*

    import User from "../models/User"
    import jwt from "jsonwebtoken"
    import config from "../config"
    import Role from "../models/Role"

    export const signUp = async (req, res)=>{

        const {username, email, password, roles} = req.body
        const newUser =  new User({
            username,
            email,
            password: await User.encryptPassword(password)
        })

        if(roles){
            const foundRoles = await Role.find({name: {$in: roles}})
            newUser.roles = foundRoles.map((role)=> role._id)
        }
        else{
            const role = await Role.findOne({name: "user"})
            newUser.roles=[role._id]
        }

        const savedUser = await newUser.save()
        const token = jwt.sign({id: savedUser._id}, config.SECRET, {
            expiresIn: 86400
        })
        res.status(200).json({token})
    }
    export const signIn = (req, res)=>{
        res.json("sigin")
        
    }

![](/notes/nodejs_auth/assets/singup_roles.png) ![](/notes/nodejs_auth/assets/userSaved.png) 


### signIn

Par el signIn vamos a verificar el email recibido en request body y buscarlo en la bd.

El atributo roles del modelo User corresponde a un array de id's que hacen referencia a documentos  en la collection roles y para obtener estos objetos debemos usar el método *populate(nameCollection)*

luego validamos el resultado de la busqueda, en caso de no encontrar el email entonces devolvemos un status 400 con un mensaje de no encontrado.


*src/controllers/auth.controller.js*

    export const signIn = async (req, res)=>{
        
        const userFound = await User.findOne({email: req.body.email}).populate("roles")
        if(!userFound) return res.status(400).json({message: "User not found"}) 
        console.log(userFound)
        
        res.json({token: ""})
        
    }

Ahora si el email es encontrado procedemos a comparar el password del request body con el almacenado en la bd, retorna true si coinciden o false en su debido caso.

En caso que no coincidan retornamos un estatus 401, tambien podriamos devolver un token: null y  un mensaje

Si los password coinciden entonces retornamos un token con el id del usuario 



*src/controllers/auth.controller.js*

    export const signIn = async (req, res)=>{
        
        const userFound = await User.findOne({email: req.body.email}).populate("roles")
        
        if(!userFound) return res.status(400).json({message: "User not found"}) 
        
        const matchPassword = await User.comparePassword(req.body.password, userFound.password)

        if(!matchPassword) return res.status(401).json({token: null, message: "Invalid password"})
        
        const token = jwt.sign({id: userFound._id}, config.SECRET, {
            expiresIn: 86400
        })
        console.log(userFound)
        
        res.json({token})
        
    }


## Control de rutas

Para proteger las rutas vamos a crear una seria de middleware para el control de acceso

- middlewares/verifySingup.js -> para validar si el email ya existe, o el usuario, o si el rol que esta enviando ya fue creado. 
- middlewares/authJwt -> para autenticar y validar el token y sus claims
- index.js para centralizar los middleware en un solo import

src/middleware/authJWT -> verifyToken() va a ser un middleware de express. 

Vamos a verificar si en los headers viene el atributo "x-access-token"

Si no viene retornamos un 403 e indicamos que no fue enviado el token

Si este viene entonces del modulo de jsonwebtoken usamos el método verify(token, secret) para validarlo
en caso que este bien entonces lo dejamos continuar al next() si no deberiamos tener una estructura try/ catch para atrapar el error.

si el token es valido extraemos de su payload el id del usuario y lo buscamos en la BD para validarlo si existe entonces como segundo parámetro de la busqueda podemos indicarle que oculte el password en la respuesta.

Si no existe el usuario retornamos un 404

next() permite que el hilo de ejecución continue



*Nota:* 

Para importar los middlewares desde middlewares/index.js

Importamos el middleware authJWT desde las rutas de productos y lo implementamos para proteger la creacion, actualizacion y eliminacion d productos. Estas rutas requieren token para su uso


*src/middleware/index.js*

    import {verifyToken} from "./authJwt"

    export {verifyToken}



*src/middleware/authJwt.js*

    import jwt from "jsonwebtoken"
    import config from "../config"
    import User from "../models/User"

    export const verifyToken = async (req, res, next) => {
        try{
            const token = req.headers["x-access-token"]
            
            if(!token) return res.status(403).json({message: "Not token provided"})
        
            const decoded  = jwt.verify(token, config.SECRET)
            req.userId = decoded.id
            
            const user = await User.findById(req.userId, {password: 0})
            if(!user) return res.status(404).json({message: "User not found"})
            
            console.log('user', user)
            next()

        }
        catch(error){
            res.status(401).json({message: "Unauthorized"})
        }

    }



*src/routes/product.routes.js*

    import {Router} from "express"
    const router = Router()

    import * as productsController from "../controllers/products.controller"
    import {verifyToken} from "../middlewares"

    router.post("/", verifyToken, productsController.createProduct)

    router.get("/",  productsController.getProducts)

    router.get("/:productId",  productsController.getProductById)

    router.put("/:productId",  verifyToken, productsController.udpateProductById)

    router.delete("/:productId",  verifyToken, productsController.deleteProductById)

    export default router

## Verificación de roles

Ahora en  authJwt vamos crear otro middleware, esta vez para  validar si el role corresponde a un moderador a un administrador.

Para evitar importar por cada middleware que haya en el archivo lo que hacemos es importarlo todo (*) desde el index.js que agrupa los middlewares.


*src/middlewares/index.js*


    import * as authJwt from "./authJwt"

    export {authJwt}


Para usar varios middlewares podemos pasarlos agrupados en un array y se ejecutaran en orden segun el indice


*src/routes/product.routes.js*

    import {Router} from "express"
    const router = Router()

    import * as productsController from "../controllers/products.controller"
    import { authJwt } from "../middlewares"

    router.post("/", [authJwt.verifyToken, authJwt.isModerator], productsController.createProduct)

    router.get("/",  productsController.getProducts)

    router.get("/:productId",  productsController.getProductById)

    router.put("/:productId",  authJwt.verifyToken, productsController.udpateProductById)

    router.delete("/:productId",  authJwt.verifyToken, productsController.deleteProductById)

    export default router

Estos middlewares tienen acceso a req (request), por ello podemos usar los atributos que esten inicializados en este objeto a través de los middlewares.



*src/middlewares/authJwt.js*

    import jwt from "jsonwebtoken"
    import config from "../config"
    import User from "../models/User"

    export const verifyToken = async (req, res, next) => {
        try{
            const token = req.headers["x-access-token"]
            
            if(!token) return res.status(403).json({message: "Not token provided"})
        
            const decoded  = jwt.verify(token, config.SECRET)
            req.userId = decoded.id
            
            const user = await User.findById(req.userId, {password: 0})
            if(!user) return res.status(404).json({message: "User not found"})
            
            next()

        }
        catch(error){
            res.status(401).json({message: "Unauthorized"})
        }
    }

    export const isModerator = async (req, res, next) => {
        const user = await User.findById(req.userId).populate("roles")
        console.log('user', user)
    }

Ahora vamos a importar el modelo Role y vamos a buscar todos los roles correspondientes a los del atributo roles del user

Recorremos todos los roles y en caso de hacer match con el role que estamos validando ejecutamos el next para continuar con el middleware, en caso que no, retornamos un mensaje de no autorizado al usuario.

*src/middlewares/authJwt.js*

    import jwt from "jsonwebtoken"
    import config from "../config"
    import User from "../models/User"
    import Role from "../models/Role"

    export const verifyToken = async (req, res, next) => {
        try{
            const token = req.headers["x-access-token"]
            
            if(!token) return res.status(403).json({message: "Not token provided"})
        
            const decoded  = jwt.verify(token, config.SECRET)
            req.userId = decoded.id
            
            const user = await User.findById(req.userId, {password: 0})
            if(!user) return res.status(404).json({message: "User not found"})
            
            next()

        }
        catch(error){
            res.status(401).json({message: "Unauthorized"})
        }
    }

    export const isModerator = async (req, res, next) => {
        const user = await User.findById(req.userId)
        const roles = await Role.find({_id: { $in: user.roles }})

        for (let index = 0; index < roles.length; index++) {
            if(roles[index].name === "moderator"){
                next()
                return
            }
        }
        return res.status(403).json({message: "Require moderator role"})
    }

    export const isAdmin = async (req, res, next) => {
        const user = await User.findById(req.userId)
        const roles = await Role.find({_id: { $in: user.roles }})

        for (let index = 0; index < roles.length; index++) {
            if(roles[index].name === "admin"){
                next()
                return
            }
        }
        return res.status(403).json({message: "Require admin role"})
        
    }


*src/routes/product.routes.js*


## Gestión  de usuarios

Ahora vamos a crear los controladores del usario, empezaremos por createUser el cual usará los middleware para validar si hay token y si es un administrador

Vamos a crear un middleware en verifySignup.js que permita identificar si un role es valido en la BD

Iniciamos por validar si en el request body viene el atributo roles y si es un arreglo vamos a recorrerlo

Por cada recorrido verificamos si existen los roles, tenemos dos opciones: o hacerlo de la manera compleja como consultar cada role en la BD o en este caso que son pocos roles los podemos instanciar en un arreglo en el modelo y exportarlo para su comparación.

Podriamos tambien utilizar el tipo de dato ENUM para limitar el número de opciones que tiene el usuario pero no es este el caso (Enum es un string el cual toma su valor de una lista previamente definida. Al nosotros asignar el tipo enum a un campo, este, no podrá almacenar otro valor que no se encuentre dentro de la lista.)

En caso de no encontrar un Role en el arreglo entonces retornamos al usuario un status 400 y lo sacamos del flujo.

*src/models/Role.js*

    import {Schema, model} from "mongoose"

    export const ROLES = ["user", "admin", "moderator"]

    const roleSchema = new Schema({
        name: String
    },
    {
        versionKey: false
    })

    export default model("Role", roleSchema)



*src/middlewares/verifySignup*

    import { ROLES } from "../models/Role"

    export const checkRolesExisted = (req, res, next) => {
        if(req.body.roles){
            for (let index = 0; index < req.body.roles.length; index++) {
                if(!ROLES.includes(req.body.roles[index])){
                    return res.status(400).json({message: `Role ${req.body.roles[index]} does not exist`})
                }
            }
            next()
        }
    }



Importamos el nuevo middleware para ser usado en user.routes.js

*src/middlewares/index.js*

    import * as authJwt from "./authJwt"
    import * as verifySignup from "./verifySignup"

    export {authJwt, verifySignup}


*src/routes/user.routes.js*

    import {Router} from "express"
    import * as userController from "../controllers/user.controller" 
    import {authJwt, verifySignup} from "../middlewares"
    const router = Router()

    router.post("/", [
        authJwt.verifyToken, 
        authJwt.isAdmin,
        verifySignup.checkRolesExisted
    ],userController.createUser)

    export default router


Ahora vamos a crear un nuevo middleware para el control de si un usuario o email ya existe en la BD y vamos a aplicar este middleare a la ruta de signup (pendiente agregarlo a createUser)


*src/routes/user.routes.js*

    import { ROLES } from "../models/Role"
    import User  from "../models/User"

    export const checkRolesExisted = (req, res, next) => {
        if(req.body.roles){
            for (let index = 0; index < req.body.roles.length; index++) {
                if(!ROLES.includes(req.body.roles[index])){
                    return res.status(400).json({message: `Role ${req.body.roles[index]} does not exist`})
                }
            }
            next()
        }
    }


    export const verifyDuplicatedUserEmail =  async (req, res, next) => {
        
        const user = await User.findOne({username: req.body.username})
        if(user) return res.status(400).json({message: "The user already exist"})
        
        const email = await User.findOne({email: req.body.email})
        if(email) return res.status(400).json({message: "The email already exist"})
    
        next()
    }


*src/routes/auth.routes.js*

    import {Router} from "express"
    import * as authController from "../controllers/auth.controller"
    import {verifySignup} from "../middlewares"

    const router = Router()

    router.post("/signup", [
        verifySignup.verifyDuplicatedUserEmail, 
        verifySignup.checkRolesExisted], authController.signUp)

    router.post("/signin", authController.signIn)

    export default router

