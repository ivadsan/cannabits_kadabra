[//]: # @param group $$ React Native
[//]: # @param title $$ Curso de Introducción a React Native
[//]: # @param author $$ Iván D. Sánchez

# Curso de Introducción a React Native

## Extensiones de VS Code para React Native

- Bracket pair colorizer
- ES7+ React/Redux/React-Native snippets
- Material Icon Theme
- Prettier - Code formatter

## Requerimientos técnicos primer proyecto

- NodeJS > 16 LTS
- Yarn

  npm i -g yarn

- Creación de proyecto react-native con expo
- Instalación global de expo-cli (Deprecado ahora se usa expo go)

  yarn global add expo-cli

- Tener instalado create-react-app globalmente

  yarn global add create-react-app

- Crear una aplicación de react-native con expo

  yarn create expo-app react-native-course-1

- Para instalar librerias de expo para web

  npx expo install react-native-web@~0.18.10 react-dom@18.2.0 @expo/webpack-config@^18.0.1

Para poder probar en iOS y Android se debe tener instalada ruby en una version mayor a >2-7

Se puede instalar un gestor de versiones de rubi como rbenv

- descargar xcode

npm uninstall -g react-native-cli @react-native-community/cli

Se requiere cocoapods para ios, se recomienda instalar conruby

### Iniciar un proyecto con expo

- expo-cli está deprecado

  yarn create expo-app myApp
  cd myApp
  yarn expo start

### Instalación y pruebas con el emulador de iOS (solo para macOS)

Trabajando con el simulador de xcode podemos abrir mas de un sistema operativo para nuestras pruebas.

### Instalación y pruebas con el emulador de android

Los emuladores de Android se encuentran en Configure -> AVD Android Virtual Devices

Podemos crear diferentes AVD eligiendo el dispositivo y el SO

### Analizando la estructura del proyecto

En el scafolding las carpetas expo y expo son autogeneradas por el sdk y no se deben manipular

En la estructura del package.json encontramos:

- main: el primer fichero que se va ejecutar
- Los scripts de ejecucion de expo

en App.json encontramos la configuración general de la aplicación y configuraciones específicas para los diferentes SO. (Nombre de la app, cambio del icono de instalación, el formato de la app en su background y otros)

con la configuración básica en expo del babel.config.js permite ser multiplataforma para ambos SO, agregarle mas plugins solo le aumenta el valor

App.js es el archivo inicial de la app, siempre se va a cargar

En React Native agregar un texto requiere del componente

```
<Text />
```

porque al compilar react native debe convertirlo a codigo de ios y codigo de android

#### View y ScrollView

Todo screen es una vista

El primer componente que tiene que renderizar debe ser una vista

No se puede tener un screen sin una vista

Pueden existir componentes sin vistas siempre y cuando se rendericen dentro de una vista

Dentro de una vista va todo el Screen

```
<View>

</View>

---

<ScrollView>

</ScrollView>


```

Una app con AI que funciene de compañero o consejero (riesgo de malos consejos) y refinable a partir de encuestas feedback para recalibrar al HumanAI

### Creación de componentes
