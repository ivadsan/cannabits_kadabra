[//]: # @param group $$ React Native
[//]: # @param title $$ Deprecado WebView a Custom Tabs
[//]: # @param author $$ Iván D. Sánchez

# Deprecado WebView a Custom Tabs

Si la versión de react native es > 0.60 no requiere del siguiente comando

        react-native link react-native-inappbrowser-reborn

Registrar las librerias nativamente para android, configurar los archivos MainApplication.java y settings.gradle para usar react-native-inappbrowser-reborn, sigue estos pasos:

**MainApplication.java:**

- Abre el archivo MainApplication.java, que se encuentra en la ruta android/app/src/main/java/.../MainApplication.java.

- Importa la clase InAppBrowserPackage agregando la siguiente línea al bloque de importaciones:

        import com.keyee.inappbrowser.RNInAppBrowserPackage;

- Agrega la instancia de InAppBrowserPackage al método getPackages():

        protected List<ReactPackage> getPackages() {
            List<ReactPackage> packages = new PackageList(this).getPackages();
            // Agrega la instancia de InAppBrowserPackage
            packages.add(new RNInAppBrowserPackage());
            return packages;
        }

**settings.gradle:**

Abre el archivo settings.gradle, que se encuentra en la raíz de tu proyecto android/settings.gradle.

Agrega la siguiente línea al final del archivo:

        include ':@react-native-community/async-storage'
        project(':@react-native-community/async-storage').projectDir = new File(rootProject.projectDir, '../node_modules/@react-native-community/async-storage/android')

Esta línea agrega la dependencia de @react-native-community/async-storage que es requerida por react-native-inappbrowser-reborn.

Una vez que hayas realizado estos cambios, asegúrate de reconstruir tu proyecto de Android ejecutando react-native run-android para aplicar los cambios.

https://docs.expo.dev/develop/development-builds/create-a-build/?redirected

To link the native module automatically, it is recommended that you use the rnpm.

Anotar las versiones del framework java node y dependencias el proyecto

## AndroidX

implementation 'androidx.browser:browser:1.3.0'

## Implementación con Expo

Ya teniendo preparado el ambiente de desarrollo, crear un proyecto de expo.

    npx create-expo-app TestExpo

Instalación enrutador

    yarn add react-router-native

Instalación webview, segun la version del expo varia la version de react-native-webview
react-native-webview@12.1.0 - expected version: 11.26.0

    yarn add react-native-webview
    npx expo install react-native-webview@11.26.0

Instalación de la libreria react-native-inappbrowser-reborn --save

    yarn add react-native-inappbrowser-reborn --save

Para el caso de expo es necesario corres expo eject para crear el scafolding de android e ios

    npx expo prebuild

Instalacion iOS platform

    cd ios && pod install && cd ..

Android

Open up android/app/src/main/java/[...]/MainApplication.java

        Add import com.proyecto26.inappbrowser.RNInAppBrowserPackage; to the imports at the top of the file
        Add new RNInAppBrowserPackage() to the list returned by the getPackages() method

Append the following lines to android/settings.gradle

        include ':react-native-inappbrowser-reborn'
        project(':react-native-inappbrowser-reborn').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-inappbrowser-reborn/android')

Insert the following lines inside the dependencies block in android/app/build.gradle:

        implementation project(':react-native-inappbrowser-reborn')

## Tools

Para solucionar el recrawler

    watchman watch-del '/Users/cosmosoftroot/devs/migration_v2/TestExpo'
    watchman watch-project '/Users/cosmosoftroot/devs/migration_v2/TestExpo'

# Implementación Custom tabs y Safari View Controller en React Native

## Expo Go

### Especificaciones técnicas POC

- Node 14.17.0
- expo ~48.0.15
- expo-web-browser ^12.1.1
- react 18.2.0
- react-dom 18.2.0
- react-native 0.71.8

### expo-web-browser

Esta dependencia provee el acceso al navegador en este caso Custom tabs para Android y Safari View Controller para iOS y realiza el manejo de redireccionamientos.

#### Instalación

Instalación de expo-web-browser

```
yarn add expo-web-browser

```

#### Implementación

Implementación de expo-web-browser

```
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View } from "react-native";
import { openBrowserAsync } from "expo-web-browser";

export default function ExpoWebBrowserExample(url) {
  return (
    <View style={styles.container}>
      <Button title="Open Browser" onPress={() => openBrowserAsync(<here url to open with custom tabs / sfvc>)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

```

### expo-router

Instalación de expo-router para pruebas de deep links

Se require NodeJS >16

```
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-gesture-handler
npx expo install react-native-web@~0.18.10 react-dom@18.2.0

```

Then delete the entry point in your package.json, or replace it with index.js to be explicit:

```
{
  "main": "index.js"
}
```

Create a new file index.js in the root of your project. If it exists already, replace it with the following:

```
import "expo-router/entry";

```

Add a deep linking scheme and enable metro web in your app.json (or app.config.js):

```
{
  "expo": {
    "scheme": "myapp",

    "web": {
      "bundler": "metro"
    }
  }
}
```

If you use Yarn:

_package.json_

```
{
  "resolutions": {
    "metro": "0.76.0",
    "metro-resolver": "0.76.0"
  }
}
```

If you use npm, this requires npm 8.3.0 or higher. You can install this with npm i -g npm@^8.3.0. After that, configure overrides in package.json:

_package.json_

```
{
    "overrides": {
    "metro": "0.76.0",
    "metro-resolver": "0.76.0"
    }
}
```

_babel.config.js_

```
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [require.resolve("expo-router/babel")],
  };
};
```

Ejecutar

```
npx expo --clear
```

### deeplinks

#### Android

En App.json

```
{
  "expo": {
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [
            {
              "scheme": "https",
              "host": "*.myapp.io",
              "pathPrefix": "/records"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}

```

## react-native-cli

### Especificaciones técnicas POC

Luego de instalar el ambiente de desarrollo retiramos react-native-cli @react-native-community/cli para evitar conflictos

npm uninstall -g react-native-cli @react-native-community/cli

y creamos un proyecto Using React Native >= 0.60

npx react-native@latest init TestCLI

### react-native-inappbrowser-reborn

Using React Native < 0.60
$ react-native link react-native-inappbrowser-reborn

Instalación de la librería

npm install react-native-inappbrowser-reborn --save

yarn add react-native-inappbrowser-reborn

instalacion de dependencias en ios

cd ios && pod install && cd ..

[Pending] realizar prebuild de expo y luego compilar nativamente en Android Studio para construir el producto nativo para pruebas.
[Pending] realizar prebuild de react-native-cli expo y luego compilar nativamente en Android Studio para construir el producto nativo para pruebas.

### Notas

Android support proporcionada por Google para admitir versiones antiguas de Android y dispositivos que no tienen las últimas API de Android

AndroidX, que es un reemplazo para la biblioteca de soporte. AndroidX es una biblioteca de componentes refactorizada y reempaquetada, diseñada para ofrecer una estructura de paquetes más consistente y una mejor administración de dependencia

#### To do

[pending] Ampliar info de configuración version menores a 0-60
[Pending] realizar prebuild de react-native-cli expo y luego compilar nativamente en Android Studio para construir el producto nativo para pruebas.

<!-- **Para las React Native < 0.60**

```
react-native link react-native-inappbrowser-reborn
``` -->
