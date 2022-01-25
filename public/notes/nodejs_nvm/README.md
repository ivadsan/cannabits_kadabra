[//]: # @param group $$ NodeJS
[//]: # @param title $$ NVM
[//]: # @param author $$ Iván D. Sánchez


# NVM

En algunas ocasiones es necesario trabajar con diferentes versiones de NodeJS en un mismo equipo, para este tipo de situaciones usamos #NVM el cual es un gestor de versiones que permite seleccionar a demanda la versión instalada que necesitamos.

Antes de instalar NVM se recomienda no tener instalada ninguna versión de NodeJS, si tu SO es #Linux es un poco mas complicado su desinstalación para ello te recomiendo ver esta guía: 

https://www.it-swarm-es.com/es/linux/desinstalar-node.js-usando-la-linea-de-comandos-de-linux/971284085/

Para el caso de Mac puede basta con tan solo un:

    
    brew uninstall node

Si este comando no funciona entonces puede servir la siguiente guía
https://stackoverflow.com/questions/11177954/how-do-i-completely-uninstall-node-js-and-reinstall-from-beginning-mac-os-x

O también 
https://stackabuse.com/how-to-uninstall-node-js-from-mac-osx/

Ahora a instalar la versión 0.39.0 usando curl, en caso de no tenerlo instalado simplemente con sudo apt-get curl (Linux) o brew install curl (Mac)


    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.39.0/install.sh | bash 

Reiniciar la terminal luego de instalar NVM. Podemos verificar que NVM esta instalado escribiendo nvm --version en la terminal y listo

Los comandos mas usados en NVM son

    #Ver el listado de versiones de Node instaladas
    nvm list  

    #Ver listado de versiones LTS (Long Term Support) disponible para instalar
    nvm ls-remote --lts

    #Instalar una version
    nvm install 14.16.1

    #Usar una version de Node
    nvm use 14.16.1

    #Desinstalar una versión
    nvm uninstall 14.16.1

En algún momento en tu carrera profesional con JavaScript vas a necesitar usar NVM espero que este hilo sea de tu ayuda, no olvides darle like y compartir, gracias. 
  





