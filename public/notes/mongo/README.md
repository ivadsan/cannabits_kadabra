[//]: # @param group $$ MongoDB
[//]: # @param title $$ MongoDB
[//]: # @param author $$ Iván D. Sánchez

# MongoDB
Las bases de datos NoSQL tienen 4 grandes familias: Key Value Stores, basadas en grafos, columnares y basadas en documentos.

**Key Value Stores**
 
Guardan la información en formato de llaves y valores. Las usamos para guardar cache, información de sesión de los usuarios o cosas muy sencillas. Son muy rápidas de consultar pero no podemos usarlas en casos más complejos donde necesitamos estructuras más especiales. El mejor ejemplo de estas bases de datos es Redis.

**Graph Databases**

Bases de datos basadas en Grafos. Nos permiten establecer conexiones entre nuestras entidades para realizar consultas de una forma más eficiente que en bases de datos relacionales (así como Twitter o Medium donde cada publicación tiene diferentes relaciones entre sus usuarios, likes, etc). Por ejemplo: Neo4j o JanusGraph.

**Wide-column Stores**

Bases de datos columnares. Tienen una llave de fila y otra de columnas para hacer consultas muy rápidas y guardar grandes cantidades de información pero modelar los datos se puede volver un poco complicado. Las usamos en Big Data, IoT, sistemas de recomendaciones, entre otras. Por ejemplo: Cassandra o HBase.

**Document Databases**

Bases de datos basadas en documentos. Nos permiten guardar documentos dentro de colecciones, tiene muy buena performance y flexibilidad que nos permite modelar casos de la vida real de forma sencilla y efectiva. Por ejemplo: MongoDB o CouchBase.


![](/notes/mongo/assets/mongo_01.png)


## Carácteríticas de MongoDB

MongoDB es una base de datos gratis y de código abierto No Relacional basada en documentos que nos permite guardar una gran cantidad de documentos de forma distribuida. Mongo también es el nombre de la compañía que desarrolla el código de esta base de datos.

Una de sus principales características es que nos permite guardar nuestras estructuras o documentos en formato JSON (no exactamente JSON, pero si algo muy parecido, lo veremos más adelante) para tener una gran flexibilidad a la hora de modelar situaciones de la vida real.

Por ser una base de datos distribuida podemos hablar no de uno sino de varios servidores, lo que conocemos como el Cluster de MongoDB. Gracias a esto obtenemos una gran escalabilidad de forma horizontal (escalabilidad en cantidad de servidores).

MongoDB es “Schema Less” lo que permite que nuestros documentos tengan estructuras diferentes sin afectar su funcionamiento, algo que no podemos hacer con las tablas de las bases de datos relacionales. Su lenguaje para realizar queries, índices y agregaciones es muy expresivo.


##  MongoDB Atlas
Tenemos varios proveedores que nos permiten utilizar o alquilar MongoDB como servicio y en este caso vamos a usar MongoDB Atlas por ser desarrollado por las mismas personas que desarrollan MongoDB.

MongoDB Atlas tiene las siguientes características:

Aprovisionamiento automático de clusters con MongoDB
Alta disponibilidad
Altamente escalable
Seguro
Disponible en AWS, GCP y Microsoft Azure
Fácil monitoreo y optimización

**Creación de una base de datos**
1. Buid cluster
2. Seleccionar proveedor cloud (Virginia es la mas cercana con capa grautita)
3. Maquina m0 (gratuita)
4. Clustar name
5. Esperar mientras se crea la bd
6. Cluster -> security -> add new user
7. crear username y contraseña 
8. seleccionar el privilegio del usuario que acabamos de crear
	Atral admin -> eliminar bd, sin contemplación
	read an write to any database
9. Para propositos del curso atlas admin}
10. agrega la ip de la que nos conectamos
11. Clusters -> security-> IP Whitelist -> add ip address
12. add current ip address
13. otra opcion es elegir -> allow access from anywhere -> es inseguro


## Instalación de MongoDB Community en Linux

### Instalación 4.2

	wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
	
	echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
	
	cat etc/apt/sources.list.d/mongodb-org-4.2.list
	
	sudo apt-get update
	
	sudo apt install mongodb-org
	
	sudo systemctl start mongod
	
If you receive an error similar to the following when starting mongod:

	Failed to start mongod.service: Unit mongod.service not found.
	
Run the following command first:

	sudo systemctl daemon-reload
	
Then run the start command above again

	sudo systemctl start mongod
	
Verify that MongoDB has started successfully


**fix issues**

	sudo chown -R mongodb:mongodb /var/lib/mongodb
	sudo chown mongodb:mongodb /tmp/mongodb-27017.sock 

Si no funciona entonces 

	sudo mv /var/lib/mongodb /var/lib/mongodb_backup
	sudo mkdir /var/lib/mongodb
	sudo chmod 700 /var/lib/mongodb
	sudo chown mongodb:daemon /var/lib/mongodb
	sudo systemctl restart mongod

### iniciar, reiniciar, parar

	sudo systemctl start mongod

	sudo systemctl status mongod

You can optionally ensure that MongoDB will start following a system reboot by issuing the following command:

	sudo systemctl enable mongod

Detener

	sudo systemctl stop mongod

Restart mongo DB

	sudo systemctl restart mongod

## Conexion desde mongodb shell version 4.2.3.

mongo "mongodb+srv://cluster0-dtsa1.mongodb.net"  --username platzi-admin
	

# Creacion de bases de datos en mongodb

Ingresar a la consola de Mongodb

	mongo

Ver las collections de un cluster. Mientras no contenga una collection no podra ser visible con el comando 

	show dbs

Crear la base de datos

	// Syntaxis
	use db_name_test

	// Example
	use platzi

Ver que base estamos en use

	db

Crear el nombre de una collection, para esto insertamos un documento

	// Syntaxis
	db.collection_name.insertOne({json Object})
	
	// Example
	db.inventory.insertOne({item:"canvas", qty:100, tags:["cotton"]})

Si todo sale bien retorna un json con la propiedad "acknowledged" : true y objectId del documento insertado

## show collections

desde la base de datos que estamos usando podemos consultar las colecciones que tenemos

	show collections

Consultar un documento de  una colección

	db.name_collection.findOne()
	db.inventory.findOne()
	
	
## MongoDB Compass

https://www.mongodb.com/products/compass

https://www.mongodb.com/download-center/compass

Seleccionar version por OS  ubuntu 64-bit(14.04+)



## MongoDB + Drivers

MongoDB es una base de datos open source, NoSQL y basada en documentos que nos permite guardar una gran cantidad información de forma distribuida. Mongo también es el nombre de la compañía que desarrolla el código de esta base de datos. Los drivers de MongoDB son librerías oficiales o desarrolladas por la comunidad que podemos usar para comunicar nuestras aplicaciones con las bases de datos. Una de las más populares es Mongoid, un ORM que convierte nuestros código Ruby en queries que entiende nuestra base de datos.


Para instalar los drivers en nodeJS

	npm install mongodb --save
	
Verificar si los drivers fueron instalados con éxito en el package.json


## Bases de datos, Colecciones y Documentos en MongoDB

### Bases de Datos
Son los contenedores físicos para nuestras colecciones. Cada base de datos tiene un archivo propio en el sistema de archivos de nuestra computadora o servidor y un Cluster puede tener múltiples bases de datos.

### Las Colecciones
Son agrupaciones de documentos. Son equivalentes a las tablas en bases de datos relacionales pero NO nos imponen un esquema o estructura rígida para guardar información.

### Los Documentos
Son registros dentro de las colecciones. Son la unidad básica de MongoDB y son análogos a los objetos JSON pero en realidad son BSON.

### BSON 
* Es una transformación binaria de un JSON
* Soporta fechas y valores binarios


## Operaciones CRUD desde la consola de MongoDB

Instrucciones y comandos de la clase:

### conexión a mongodb Atlas
Conexión con el cluster de MongoDB Atlas: mongo "URL DE NUESTRO CLUSTER", (recuerda añadir tu IP a la lista de IPs permitidas para no tener problemas en esta parte).


### show dbs
Listar las bases de datos de nuestro cluster: show dbs.

###  use
Seleccionar una base de datos: use NOMBRE_BD. Debemos crear por lo menos un documento si la base de datos es nueva porque MongoDB no crea bases de datos vacías.

### db
Recordar qué base de datos estamos usando: db.

### show collections
Listar las colecciones de nuestra base de datos: show collections.

### insertOne({ ... }
Crear una colección (opcional) y añadir un elemento en formato JSON: db.NOMBRE_COLECCIÓN.insertOne({ ... }). La base de datos responde true si la operación fue exitosa y crea el campo irrepetible de _id si nosotros no lo especificamos. _id es un campo obligatorio de la base de datos.

### insertMany([{ ... }, { ... }])
Crear una colección (opcional) y añadir algunos elementos en formato JSON: db.NOMBRE_COLECCIÓN.insertMany([{ ... }, { ... }]). Recibe un array de elementos en JSON y devuelve todos los IDs de los elementos que se crearon correctamente.

###  find() 
Encontrar elementos en una colección: db.NOMBRE_COLECCIÓN.find() Podemos aplicar filtros a las busqueda

Los filtros funcionan con una condición de igualdad

si aplicamo el método pretty al final de la busqueda obtenemos una retorno con una presentación mas legible

**ejemplo filtros**

	db.inventory.find({item: "canvas"}).pretty()
	
Podemos agregar un count para saber cuantos documentos retorna la operación 

 	db.inventory.find({item: "canvas"}).count()	


### findOne()
si queremos o encontrar solo el primer resultado con el método findOne().
este método nos devulve un documento por orden natural, es como mongo guarda los documentos, este orden lo podemos definir de acuerdo a los indices. también podemos aplicar filtros.

Si queremos buscar por un _id debemos utilizar el método ObjectId()

	db.inventory.findOne({_id: ObjectId('5e49e507761c179154a95c33')})

### help()
Listar todos los posibles comandos que podemos ejecutar: db.NOMBRE_COLECCIÓN.help().

### updateOne() updateMany()

Lo primero que recibe es el filtro seguido de (,) y el operador $set para indicar los valores que quermos actualizar.

	db.inventory.updateOne({_id: ObjectId('5e49e507761c179154a95c33')}, {$set: {item: "Update name!!!"}})

Cuando hacemos un update de un documento o varios nos envía una bandera indicando si se actualizó, el número de documentos actualizados

### deleteOne() deleteMany()
Enviamos un filtro y el método elimina los documentos que cumplan con esa condición
Nos retorna una bandera si la operación se completó y los documentos afectados.

deleteOne()solo borra el primer elemento que cumpla la condición, si se desea eliminar todos los que cumplan usar deleteMany()

	db.inventory.deleteOne({qty:100}) 

Tener cuidado con los filtros de deleteMany() por ejemplo:

	db.inventory.deleteMany({}) -> eliminaría todos los documentos
	
	
## Operaciones CRUD desde Compass

Guardar la conexión como un favorito para no repetir la configuración


## Tipos de datos

Strings: Nos sirven para guardar textos.

Boolean: Información cierta o falsa (true y false).

ObjectId: Utilizan el tiempo exacto en el que generamos la consulta para siempre generan IDs únicos. Existen en BSON pero no en JSON.

Date: Nos sirven para guardar fechas y hacer operaciones de rangos entre ellas. Guardar siempre en este tipo de dato para poder hacer operaciones

Números: Doubles (. decimal de 64bist), Integers 32bits, Integers 64 bits y Decimals(128bits).

Documentos Embebidos: Documentos dentro de otros documentos ({}).

Arrays: Arreglos o listas de cualquier otro tipo de datos, incluso, de otras listas.

Los documentos no deben superar los 16MB

## ¿Qué son los esquemas y las relaciones?

Los esquemas son la forma en que organizamos nuestros documentos en nuestras colecciones. MongoDB no impone ningún esquema pero podemos seguir buenas prácticas y estructurar nuestros documentos de forma parecida (no igual) para aprovechar la flexibilidad y escalabilidad de la base de datos sin aumentar la complejidad de nuestras aplicaciones.

Las relaciones son la forma en que nuestras entidades o documentos sen encuentran enlazados unos con otros. Por ejemplo: Una carrera tiene multiples cursos y cada curso tiene multiples clases.


## Relaciones entre documentos
Las documentos embebidos nos ayudan a guardar la información en un solo documento y nos ahorra el tiempo que tardamos en consultar diferentes documentos a partir de referencias. Sin embargo, las referencias siguen siendo muy importantes cuando debemos actualizar información en diferentes lugares de forma continua.

One to one: Documentos embebidos
One to many: Documentos embebidos cuando la información no va a cambiar muy frecuentemente y referencias cuando si.

carreras.json

	{
	    "_id": "5c7605235f627d4ee1c77e81",
	    "nombre": "Carrera de AWS",
	    "descripcion": "En es carrera aprenderas AWS",
	    "cursos": [
		{
		    "_id": "",
		    "nombre": "Nombre del curso"
		},
		{
		    "_id": "",
		    "nombre": "Nombre del curso"
		}
	    ]
	}

cursos.json

	{
	    "_id": "",
	    "nombre": "",
	    "descripcion": "",
	    "clases": [
		{
		    "_id": "",
		    "orden": 1,
		    "nombre": "",
		    "video": ["url1"]
		},
		{
		    "_id": "",
		    "orden": 1,
		    "nombre": "",
		    "video": ["url1"]
		}
	    ]
	}
	
## Operadores para realizar queries y proyecciones

Agregando operadores a los filtros

	{<field>: {<operator1>: <value1>},... }
	
	db.inventory.find( {status: { $in: ["A", "D"]}} )

### Proyecciones	

Para traer solos los campos que requerimos. con 1 le indicamos los valores que queremos o 0 para no traerlos como _id: 0

	db.inventory.findOne( {status: "A" }, {item: 1, status: 1}} )
	
### Operadores de comparación

![ ](/notes/mongo/assets/operadores01.png  "Operadores de comparación")

### Operadores lógicos 

![ ](/notes/mongo/assets/operadores02.png  "Operadores lógicos")		
	
	
AND es equivalente en un filtro cuando `{item1: "value1", item2:"value2"}`	

### Operadores por elemento

Como mongo es schema less entonces podemos preguntar si un campo existe o no

type cuando queremos saber de que tipos son los valores de la base de datos

![ ](/notes/mongo/assets/operadores03.png  "Operadores por elemento")	

### Operadores para arreglos

![ ](/notes/mongo/assets/operadores04.png  "Operadores para arreglos")	

## Usando operadores para realizar Updates en arreglos

### $addToSet y $pull

En este enlace se encuentran la referencia a todos los operadores que se encuentran en MongoDb, antes de emplear lógica adicional para realizar una operación vale la pena echar una ojeada a la lista de operadores que en algunos casos pueden facilitar mucho las cosas.

Para realizar las relaciones entre carreras y cursos empleamos los operadores $addToSet y $pull estos operadores sirven para agregar $addToSet o retirar $pulldocumentos de un arreglo dependiendo del filtro que aplicamos.

Así cuando ejecutamos db.carreras.update_one({'_id': ObjectId(json['id_carrera'])}, {'$addToSet': {'cursos': curso}}) $addToSet lo que hace es agregar el objeto curso al arreglo cursos, si el arreglo cursos no existe lo crea.

Para retirar un curso de una carrera usamos $pull de la siguiente manera db.carreras.update_one({'_id': ObjectId(json['id_carrera'])}, {'$pull': {'cursos': {'_id': ObjectId(json['id_curso'])}}}) aquí $pull recibe un filtro y todos los elementos del arreglo cursos que cumplan con ese filtro serán borrados.

### skip() y limit()

Si tenemos una consulta que retorna 100 documentos pero solamente necesitamos los documentos del número 20 al 30, la manera de hacerlo es usando skip() y limit().

Si tenemos 100 carreras y solamente queremos las primeras 10 podemos ejecutar db.carreras.find({}).limit(10) esta nos traerá las primeras 10 carreras.

Ahora si queremos las carreras ubicadas en los puestos 40 y 50 lo que debemos hacer es db.carreras.find({}).skip(40).limit(10)

Como vemos skip() y limit() son muy útiles para realizar paginaciones, cuando tenemos consultas que retornan muchos documentos y que en algunos casos la totalidad de los documentos no es utilizada es buena práctica limitar el número de documentos que hacemos viajar entre nuestro cluster de base de datos y el código de nuestra aplicación. Esto puede ayudar a mejorar la velocidad con que las consultas son procesadas por la aplicación.

### Ejercicios de práctica usando operadores

```
// Arreglo de ejemplo
use test
db.inventory.insertMany(

[{ _id: 1, item: { name: "ab", code: "123" }, qty: 15, tags: [ "A", "B", "C" ] },
{ _id: 2, item: { name: "cd", code: "123" }, qty: 20, tags: [ "B" ] },
{ _id: 3, item: { name: "ij", code: "456" }, qty: 25, tags: [ "A", "B" ] },
{ _id: 4, item: { name: "xy", code: "456" }, qty: 30, tags: [ "B", "A" ] },
{ _id: 5, item: { name: "mn", code: "000" }, qty: 20, tags: [ [ "A", "B" ], "C" ] }]

)

// $or
db.inventory.find({$or: [{qty: {$gt: 25}}, {qty: {$lte: 15}}]})

// $gte
db.inventory.find({qty: {$gte: 25}})

// $size
db.inventory.find({tags: {$size: 2}})

// Insertemos estos documentos de ejemplo en la colección survey
db.survey.insertMany([
{ _id: 1, results: [ { product: "abc", score: 10 }, { product: "xyz", score: 5 } ] }
{ _id: 2, results: [ { product: "abc", score: 8 }, { product: "xyz", score: 7 } ] }
{ _id: 3, results: [ { product: "abc", score: 7 }, { product: "xyz", score: 8 } ] }
])

// $elemMatch
db.survey.find(
   { results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } }
)

db.survey.find(
   { results: { $elemMatch: { product: "xyz" } } }
   ```


## Operaciones avanzadas con Agregaciones

Las agregaciones son operaciones avanzadas que podemos realizar sobre nuestra base de datos con un poco más de flexibilidad en nuestros documentos.

### Pipeline de Agregaciones
Es un grupo de multiples etapas que ejecutan agregaciones en diferentes momentos. Debemos tener muy en cuenta el performance de nuestras agregaciones porque las agregaciones corren en todo el cluster.

![ ](/notes/mongo/assets/agregaciones01.png  "Pipeline de Agregaciones")

### Map-Reduce

Nos permite definir funciones de JavaScript para ejecutar operaciones avanzadas. La función de map nos permite definir o “mappear” los campos que queremos usar y la función reduce nos permite ejecutar operaciones y devolver resultados especiales. Por ejemplo: podemos mappear algunos campos y calcular la cantidad de elementos que cumplen ciertas condiciones.

![ ](/notes/mongo/assets/agregaciones02.png  "Map-Reduce")

### Agregaciones de propósito único
Funciones ya definidas que nos ayudan a calcular un resultado especial pero debemos tener cuidado porque pueden mejorar o afectar el performance de la base de datos. Por ejemplo: count(), estimatedDocumentCount y distinct.

![ ](/notes/mongo/assets/agregaciones03.png  "Agregaciones de propósito único")

## Consultas más rápidas con Índices

Los índices nos ayudan a que nuestras consultas sean más rápidas porque, sin ellos, MongoDB debería escanear toda la colección en busca de los resultados.

Tipos de índices:

De un solo campo
Compuestos
Multi-llave
Geoespaciales
De texto
Hashed


**Ejemplos**

Obtener indices de una colección

	db.cursos.getIndexes()


Crear un inidice de texto

	db.cursos.createIndex({nombre: "text"})	
	
Buscar por indice

	db.cursos.find({$text: {$search: "palabra"}}, {nombre: 1})	
	
## Recomendaciones de Arquitectura y Paso a Producción
- Usar proveedores cloud con alta disponibilidad: AWS, Google Cloud o Azure son muy buenas opciones
- No te compliques pensando en administración de servidores con MongoDB, servicios como MongoDB Atlas o mlab son muy buenas opciones
- Guardar las credenciales en variables de entorno o archivos de configuración fuera del proyecto
- Asegura que tu cluster se encuentra en la mis región del proveedor que tu aplicación
- Has VPC peering entre la VPC de tu aplicación y la VPC de tu cluster
- Cuida la lista de IPs blancas
- Puedes habilitar la autenticación en dos pasos
- Actualiza constantemente tu versión de MongoDB
- Separa los ambientes de desarrollo, test y producción
- Habilita la opción de almacenamiento encriptado	

