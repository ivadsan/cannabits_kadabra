
[//]: # @param group $$ MongoDB
[//]: # @param title $$ 1- Instalación de MongoDB
[//]: # @param author $$ Iván D. Sánchez

Fuente : https://platzi.com/blog/como-instalar-mongodb-en-window-linux-y-mac/?utm_source=google&utm_medium=cpc&utm_campaign=12915366154&utm_adgroup=&utm_content=&gclid=CjwKCAiA55mPBhBOEiwANmzoQmgyHWQu1MJ2zJBR7Cx6w5i6nrqtBG3o7tWS7TEqK-EZnf1LOSD8QRoCCzwQAvD_BwE&gclsrc=aw.ds


# Instalación de MongoDB en MacOS
En MacOS es recomendable hacer la instalación de MongoDB a través de Homebrew.

Para comenzar se debe abrir la consola del sistema y actualizar Homebrew.

$ brew update

Con Homebrew actualizado hay que proceder a instalar MongoDB con el comando:

$ brew install mongodb

Este comando instala los binarios necesarios para ejecutar un servidor de MongoDB en tu Mac.

Una vez ya tienes MongoDB en tu MacOS, lo siguiente es crear el directorio donde el servidor de MongoDB guardará la información de cada base de datos. Desde la consola del sistema ejecuta:

$ mkdir -p /data/db

Luego deberás asignar los permisos necesarios para que el servidor pueda escribir en ese directorio.

$ sudo chown -R `id -un` /data/db

Puede que te solicite la contraseña, eso es normal ya que estás ejecutando el comando para asignar permisos con el comando sudo.

Ya en este paso tienes MongoDB instalado.

Ejecutando MongoDB en MacOS
Puedes abrir dos consolas y en una ejecutar el servidor llamado mongod.

$ mongod

Y en la otra consola ejecutar la shell de Mongo, importante ejecutar el servidor primero.

$ mongo

Con MongoDB instalado y configurado en tu MacOS puedes continuar con este curso.

No olvides que el servidor de MongoDB -mongod- se apaga con ctrl + c y se cierra la shell de Mongo -mongo- con quit(),



# Por BREW

https://github.com/mongodb/homebrew-brew



Setup
You can add the custom tap in a MacOS terminal session using:

$ brew tap mongodb/brew
Installing Formulae
Once the tap has been added, use the instructions below to install the software packages you need. You can choose to install either the latest version of the MongoDB Server (recommended), or a specific version if desired.

Installing the Latest mongodb-community Server, Shell, and the Database Tools Together
Install the latest available production release of the MongoDB Community Server. This includes the MongoDB Server processes mongod and mongos, the mongo shell, the MongoDB Database Tools, and the install_compass script to separately install MongoDB Compass. Currently, this will install MongoDB Server 5.0.x.

$ brew install mongodb-community
Installing only the Shell or the Database Tools
Install only the latest mongo shell for connecting to remote MongoDB instances. If you installed the MongoDB Server in the step above, the shell was included in that installation. Use this command only if you need to install the mongo shell separately.

$ brew install mongodb-community-shell
Install only the latest MongoDB Database Tools, a suite of command-line tools (mongoimport, mongoexport, mongodump, etc) for working with a MongoDB Server instance. If you installed the MongoDB Server in the step above, the Database Tools were included in that installation. Use this command only if you need to install the Database Tools separately.

$ brew install mongodb-database-tools
Installing a Specific Version of the mongodb-community Server
Alternatively, you can install a specific version of the MongoDB Server if desired.

Install the latest 5.0.x production release of MongoDB Community Server:

$ brew install mongodb-community@5.0
Install the latest 4.4.x production release of MongoDB Community Server:

$ brew install mongodb-community@4.4
Install the latest 4.2.x production release of MongoDB Community Server:

$ brew install mongodb-community@4.2
Install the latest 4.0.x production release of MongoDB Community Server:

$ brew install mongodb-community@4.0
Install the latest 3.6.x production release of MongoDB Community Server:

$ brew install mongodb-community@3.6
Default Paths for the mongodb-community Formula
In addition to installing the MongoDB server and tool binaries, the mongodb-community formula creates:

a configuration file: /usr/local/etc/mongod.conf
a log directory path: /usr/local/var/log/mongodb
a data directory path: /usr/local/var/mongodb
Starting the mongodb-community Server
Run mongod as a service
To have launchd start mongod immediately and also restart at login, use:

$ brew services start mongodb-community
If you manage mongod as a service it will use the default paths listed above. To stop the server instance use:

$ brew services stop mongodb-community
Start mongod manually
If you don't want or need a background MongoDB service you can run:

$ mongod --config /usr/local/etc/mongod.conf
Note: if you do not include the --config option with a path to a configuration file, the MongoDB server does not have a default configuration file or log directory path and will use a data directory path of /data/db.

To shutdown mongod started manually, use the admin database and run db.shutdownServer():

$ mongo admin --eval "db.shutdownServer()"
Uninstalling the mongodb-community Server
If you need to uninstall the MongoDB Server, use:

$ brew uninstall mongodb-community
Note that this does not uninstall the bundled Database Tools. To uninstall the Database Tools, additionally run the folowing:

$ brew uninstall mongodb-database-tools

