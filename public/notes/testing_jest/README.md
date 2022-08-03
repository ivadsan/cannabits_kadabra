[//]: # @param group $$ Testing
[//]: # @param title $$ Curso Unit Testing con Jest en React
[//]: # @param author $$ Iván D. Sánchez


# Curso Unit Testing con Jest en React

## ¿Qué es un Test?

Un test es una serie de estrategias que al emplearlas y ejecutarlas correctamente, debe dar confiabilidad al proyecto realizado para que garantice su pleno funcionamiento en producción, y minimizar los errores que se puedan encontrar.

### Pruebas funcionales

Es una prueba basada en la ejecución, revisión y retroalimentación de las funcionalidades previamente diseñadas para el software.
Es decir, son pruebas específicas, concretas y exhaustivas para probar y validar que el software hace lo que debe y sobre todo, lo que se ha especificado.

### Pruebas no funcionales

Con estas testeamos todo lo que no influye a la funcionalidad del producto, como por ejemplo, la accesibilidad, configuración, de rendimiento, entre otras.


### Coverage

Esta herramienta nos permite conocer que tanto estamos probando de nuestro proyecto y generar un reporte para analizar a detalle y ver que falta por probar.

## Preparación del entorno con Jest


    mkdir jest_jsbase
    cd jest_jsbase
    git init
    npm init -y


Instalación de Jest como dependencia de desarrollo

    npm install jest -D


Crear la carpeta src y el archivo index.js
Crear la carpeta `src/__test__` para almacenar nuestras pruebas (Este nombre es un standard de la industria para identificar el folder que contiene las pruebas)
En este folder vamos a crear el archivo ***global.test.js***, la particula test indica que no es un archivo del proyecto sino que corresponde a pruebas

En Jest vamos a trabajar con una funcion llamada **test()** la cual recibe dos parámetros, el primero es un string que describe lo que va a pasar y el segundo es una función anónima donde viene lo que vamos a probar.

Dentro de la función anónima utilizamos **expect** que recibe una variable de entrada a evaluar y luego realiza un match si esa variable cumple con el test


## Basic tests using test
### Implementando pruebas para verificar el contenido de un String

En este caso vamos a verificar que la variable contega la palabra 'Hola'

Nota: puede que en la version 27 la expresion /Hola/ no funcione en su caso el texto debería ser parametrizado de la forma "Hola"


    const text = "Hola Mundo"

    test('Debe contener un texto con la palabra Hola', () => {
      expect(text).toMatch(/Hola/)
    })



### Configuración y ejecución de las pruebas


Ahora debemos configurar en el package.json el script para correr los test

    "scripts": {
      "test": "jest"
    },


Y corremos desde la terminal las pruebas

    npm run test


### Implementando pruebas para Boolean y Array


Verificar si un valor se encuentra en un array

    const fruits = ['apple', 'banana', 'orange']

    test('Do we have a apple?', () => {
      expect(fruits).toContain('apple')
    })


Verificar si un número es mayor que 10

    test('Greater than 10', () => {
      expect(14).toBeGreaterThan(10)
    })


Verificar si un valor es truthy

    test('Verdadero',() => {
      expect(true).toBeTruthy()
    })


Verificar si un valor es de tipo booleano y true

    test('Verdadero',() => {
      expect(true).toBe(true)
    })


### Implementando pruebas para un callback

Verificando un callback

    //Verificando un callback
    const reverseString = (str, callback) => {
      callback(str.split("").reverse().join(""))
    }

    test('probando un callback', () => {
      reverseString('hola', (str)=>{
        expect(str).toBe('aloh')
      })
    })



### Implementando pruebas a promesas


    test('Promise Test', () => {
      return reverseString2('hola')
      .then(string =>  expect(string).toBe('aloh'))
    })

    // Verificando async/await
    test('async await test', async () => {
      const string = await reverseString2('hola')
      expect(string).toBe("aloh")
    })


**Nota:** Es importante el return dentro de test para evaluar el correcto funcionamiento del resolve de la promesa.

## Ejecutando funciones antes y despues de cada prueba

### afterEach()

Ejecutar código despues de cada prueba

### afterAll()

Se ejecuta después de todas las pruebas.

### beforeEach()

Se ejecuta antes de cada prueba


### beforeAll()

Antes de todas las pruebas


    afterEach(() => console.log('After each test'))
    afterAll(() => console.log('After all the tests'))
    beforeEach(() => console.log('Before each test'))
    beforeAll(() => console.log('Before all the tests'))



## describe: Empaquetado de pruebas 

**describe()** es una funcion que recibe dos parametros, el primero es una descripción de lo que hace el paquete de test y el segundo es una función anónima con los test que agrupa


*src/index.js*

    const cities = ["Bogotá", "CDMX", "Sao Paulo", "Monterrey"]

    const randomString = () => {
      return string = cities[Math.floor(Math.random() * cities.length )]
    }

    module.exports = randomString


*src/_test_/index.test.js*

    const randomString = require("../index")

    describe('testing randomString functionalities', ()=>{
      
      test('Random string', () => expect(typeof randomString()).toBe('string'));

      test('Not contain Cordoba', () => expect(randomString()).not.toMatch(/Cordoba/))
    })

## Ejecutando un script de test específico


Para correr un script específico de pruebas tenemos varias opciones:


### instalando jest globalmente


    npm install -g jest


Luego de tener las dependencia instalada globalmente podriamos correr una prueba específica desde la terminal de la forma


    jest src/__test__/index.test.js

Otra opción que tenemos es no instalar jest de manera global, y ejecutarlo de manera local con npx

    npx jest src/__test__/index.test.js


Otra opción local es pasando la ruta del archivo al script que ya tenemos de npm y ejecutarlos desde la terminal o configurandolo en el package.json

    npm run test src/__test__/index.test.js 


*package.json*

    "scripts": {
        "test": "jest",
        "test:index": "jest src/__test__/index.test.js"
      },
## Watch

Podemos crear un script para que dejar escuchando los cambios sobre las pruebas

*package.json*


      "scripts": {
        "test": "jest",
        "test:index": "jest src/__test__/index.test.js",
        "test:watch": "jest --watch"
      },

## Coverage

El coverage nos permite conocer a través de un informe, la cobertura de las pruebas sobre el total de funcionalidades a probar en nuestra aplicación. Lo podemos llamar desde la terminal con el comando

    jest  --coverage


Luego de ejecutar este comando podemos ver en nuestra terminal nuestro coverage, también se crea en nuestro proyecto una carpeta *coverage*  en la cual tenemos disponible este informe, en un archivo de html


## Preparación del proyecto

Vamos a tener dos casos de estudio para la preparación de Jest en un proyecto; cuando la aplicación es creada usando create-react-app y el otro caso es cuando la aplicación es una instalación custom de react


### create-react-app

Cuando un proyecto es creado usando create-react-app se deben respetar las siguientes reglas:

- No modificar los script por defecto  de test del package.json (“test”: “react-scripts test”)
- El archivo de configuración debe estar en la ruta **/src** y debe tener el nombre **setupTests.js** (src/setupTests.js)
- Los archivos de test pueden estar ubicados en cualquier ubicación del arbol de directorios a partir de "/src"


En caso que los test no corran tener presente la siguiente advertencia:


react-scripts (5.0.0) has a dependency on jest-watch (1.0.0) (reference https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/package.json#L55)
jest-watch (1.0.0) requires a Node version of ^12.22.0 || ^14.17.0 || >=16.0.0 (reference https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/package.json#L55)

If you run the app using Node 14.17.0 It worked fine.

The react-scripts test command works with the following Node versions:

Major version 14 and minimum minor version 17 (^14.17.0)
Major version 16 (>=16.0.0)

### react custom installation

Instalacion de Jest y Enzime (dependencia creada por AirBnB para testear componentes de React)

    npm install jest enzyme enzyme-adapter-react-16 --save

Nota: el adaptador corresponde a la versión de React, es necesario verificar el soporte para las versiones 17 y 18 de React


- Crear los scripts en el package.json para correr las pruebas



        "test": "jest",
        "test:watch": "jest --watch"


- Crear la carpeta para almacenar las pruebas `src/__test__` 
- Crear el archivo de configuración de Jest `src/__test__/setupTest.js`


**Nota** usando CRA este archivo está en la raíz de src y se llama setupTests.js

    #src/__test__/setupTest.js

    import { configure } from 'enzyme';
    import Adapter from 'enzyme-adapter-react-16';

    configure({ adapter: new Adapter() });



Configurar el archivo de configuración en el package.json

    "jest": {
        "setupFilesAfterEnv": [
          "<rootDir>/src/__test__/setupTest.js"
        ]
      }


Ahora vamos a crear la primer prueba de un componente, para ello creamos la caperta y el archivo `src/__test__/components/Footer.test.js`



    import React from 'react';
    import { mount } from 'enzyme';
    import Footer from '../../components/Footer';

    describe('<Footer />', () => {
      test('is Render Footer', () => {
        const footer = mount(<Footer />);
        expect(footer.length).toEqual(1);
      });
    });


mount permite montar un componente y simular el ciclo de vida (montar y desmontar)

Para este proyecto debemos usar mocks para tratar los archivos de estilos .styl y evitar conflictos


Este primer test permite verificar si un componente renderiza correctamente


## Crear mocks

Jest no puede parsear archivos estaticos (stylesheets, fuentes, imagenes, iconos) por lo que se tienen que mockear (reemplazar) por javascript plano.

se debe añadir en la configuración de Jest en el package.json el parámetro “moduleNameMapper” para que jest use una configuración diferente para el tipo de archivos especificado, en este caso por medio de la regex \.(styl|css)$

creamos la carpeta y archivo `src/__mocks__/styleMock.js` el cual exporta un módulo vacio


    module.exports = {};


*package.json*

    "jest": {
        "setupFilesAfterEnv": [
          "<rootDir>/src/__test__/setupTest.js"
        ],
        "moduleNameMapper": {
          "\\.(styl|css)$": "<rootDir>/src/__mocks__/styleMock.js"
        }
      }

A partir de la version >28 de Jest, ya no incluye jest-environment-jsdom y debe ser instalado por separado. Y luego se debe agregar 
"testEnvironment": "jsdom" en la configuración de Jest en el package.json:


    npm install --save-dev jest-environment-jsdom


*package.json*

    "jest": {
      "setupFilesAfterEnv": [
        "<rootDir>/src/__test__/setupTest.js"
      ],
      "moduleNameMapper": {
        "\\.(styl|css)$": "<rootDir>/src/__mocks__/styleMock.js"
      },
      "testEnvironment": "jsdom"
    }



Como los test ahora corren correctamente con los mocks de estilos, vamos a crear otra prueba sobre Footer para ir armando un set de pruebas sobre este componente. Vamos a identificar si un titulo del footer aparece con el string correcto. 

Podemos crear una sola instancia del montaje y utlizarla en todo nuesto set de pruebas encapsulando en `describe()`


*src/__mocks__/styleMock.js*


    import React from 'react';
    import { mount } from 'enzyme';
    import Footer from '../../components/Footer';

    describe('<Footer />', () => {
      const footer = mount(<Footer />);

      test('is Render Footer', () => {
        expect(footer.length).toEqual(1);
      });

      test('Render title', () => {
        expect(footer.find('.Footer-title').text()).toEqual('Platzi Store');
      });
    });


Como este proyecto utliza Redux, para poder testearlo debemos crear un mock del provider para recibir a los children components que usen el manejador de estado.

Este mock tambien debe incluir el enrutamiento para que funcionen las pruebas.

Creamos el archivo `src/__mocks__/ProviderMock.js`



    import React from 'react';
    import { createStore } from 'redux';
    import { Router } from 'react-router-dom';
    import { Provider } from 'react-redux';
    import { createBrowserHistory } from 'history';
    import initialState from '../initialState';
    import reducer from '../reducers';

    const store = createStore(reducer, initialState);
    const history = createBrowserHistory();

    const ProviderMock = props => (
      <Provider store={store}>
        <Router history={history}>
          {props.children}
        </Router>
      </Provider>
    );

    export default ProviderMock;


## Implementar provider mock

Ya que tenemos el ProviderMock.js vamos a usarlo para hacer una prueba del componente Header.

Algo que debemos tener claro es que podemos montar el componente tanto con mount como con shallow, a continuación una explicación de sus diferencias:

## Shallow

Real unit test (isolation, no children render)

### Simple shallow

Calls:

- constructor
- render

### Shallow + setProps

Calls:

- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- render

### Shallow + unmount

Calls:

- componentWillUnmount

### Mount

The only way to test componentDidMount and componentDidUpdate.
Full rendering including child components.
Requires a DOM (jsdom, domino).
More constly in execution time.
If react is included before JSDOM, it can require some tricks:

`require('fbjs/lib/ExecutionEnvironment').canUseDOM = true;` 

### Simple mount

Calls:

- constructor
- render
- componentDidMount

### Mount + setProps

Calls:

- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

### Mount + unmount

Calls:

- componentWillUnmount

### Render

only calls render but renders all children.

So my rule of thumbs is:

- Always begin with shallow
- If componentDidMount or componentDidUpdate should be tested, use mount
- If you want to test component lifecycle and children behavior, use mount
- If you want to test children rendering with less overhead than mount and you are not interested in lifecycle methods, use render

There seems to be a very tiny use case for render. I like it because it seems snappier than requiring jsdom but as @ljharb said, we cannot really test React internals with this.

I wonder if it would be possible to emulate lifecycle methods with the render method just like shallow ?
I would really appreciate if you could give me the use cases you have for render internally or what use cases you have seen in the wild.

I'm also curious to know why shallow does not call componentDidUpdate.

Kudos goes to https://github.com/airbnb/enzyme/issues/465#issuecomment-227697726 this gist is basically a copy of the comment but I wanted to separate it from there as it includes a lot of general Enzyme information which is missing in the docs.

https://gist.github.com/fokusferit/e4558d384e4e9cab95d04e5f35d4f913



***Continuando con el test a header***

    # src/__test__/Header.test.js

    import React from 'react';
    import { mount, shallow } from 'enzyme';
    import ProviderMock from '../../__mocks__/ProviderMock';
    import Header from '../../components/Header';

    describe('<Header />', () => {
      test('Render del componente Header', () => {
        const header = shallow(
          <ProviderMock>
            <Header />
          </ProviderMock>,
        );
        expect(header.length).toEqual(1);
      });
      test('Render del Titulo', () => {
        const header = mount(
          <ProviderMock>
            <Header />
          </ProviderMock>,
        );
        expect(header.find('.Header-title').text()).toEqual('Platzi Store');
      });
    });


Pruebas sobre el component Product donde se vá a verificar que renderice y luego simular que un evento click funcione

Como el componente Product está anidado en Products es necesario al usar shallow meterlos entre el provedor que usa el componente padre en este caso Redux o pasarle las props que requiere.

Para pasarle valores por props es necesario crear un Mock que contega una estructura de datos igual a la que recibe el componente, importar el mock desde el script de los tests y pasarle los props.


`src/__test__/components/Product.test.js`

    import React from 'react';
    import { shallow, mount } from 'enzyme';
    import ProviderMock from '../../__mocks__/ProviderMock';
    import ProductMock from '../../__mocks__/ProductMock';
    import Product from '../../components/Product';

    describe('<Product />', () => {
      test('Render component', () => {
        const product = shallow(
          <ProviderMock>
            <Product />
          </ProviderMock>,
          // <Product product={ProductMock} handleAddToCart={handleAddToCart} />
        );
        expect(product.length).toEqual(1);
      });
    });

`src/__mocks__/components/ProductMock.js`


    const ProductMock = {
      id: '1',
      image: 'https://arepa.s3.amazonaws.com/camiseta.png',
      title: 'Camiseta',
      price: 25,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    };

    export default ProductMock;


Para probar un click podemos crear una función usando jest para simular la acción, esto lo hacemos con jest.fn()


    import React from 'react';
    import { shallow, mount } from 'enzyme';
    import ProviderMock from '../../__mocks__/ProviderMock';
    import ProductMock from '../../__mocks__/ProductMock';
    import Product from '../../components/Product';

    describe('<Product />', () => {
      test('Render component', () => {
        const product = shallow(
          <ProviderMock>
            <Product />
          </ProviderMock>,
          // <Product product={ProductMock} handleAddToCart={handleAddToCart} />
        );
        expect(product.length).toEqual(1);
      });

      test('Test button Add to cart', () => {
        const handleAddToCart = jest.fn();
        const wrapper = mount(
          <ProviderMock>
            <Product product={ProductMock} handleAddToCart={handleAddToCart} />
          </ProviderMock>,
        );
        wrapper.find('button').simulate('click');
        expect(handleAddToCart).toHaveBeenCalledTimes(1);
      });
    });

## Snapshot

Los snapshot nos permiten capturar la UI de un componente y la podemos comparar para verificar que su estructura se mantiene igual, en caso que haya un cambio, la comparación entre el snapshot y la versión actual de componente no haran match entonces no pasará el test

Si el snapshot no existe se crea al correr test, pero en caso que ya exista se procede a comparar con el snapshot existente

Al crear snapshot el componente se convierte en un JSON

Para poder crear un snapshot debemos instalar la depedencia de desarrollo react-test-renderer



    npm i -D react-test-renderer

    # vesion para react 16
    npm i react-test-renderer@16.12.0 --save-dev

Vamos a crear un snapshot del footer, para ello importamos create de la dependencia react-test-renderer


Como Footer no esta conectado con Redux entonces no requiere el ProviderMock

Creamos el snapshot con create

Para el expect convertimos a JSON el snapshot y verificamos si hace match con el componente actual

NOTA: verficar como usar create en la version 18 de React, el curso está en la version 16 y sale un error si usa la ultima version de react-test-renderer



`src/__test__/components/Footer.test.js`

    import { create } from 'react-test-renderer';

    ...

    describe('Footer snapshot', () => {
      test('Comprobar la UI del componente', () => {
        const footer = create(<Footer />);

        expect(footer.toJSON()).toMatchSnapshot();
      });
    });


`src/__test__/components/Header.test.js`


    describe('Header snapshot', () => {
      test('Test UI Header', () => {
        const footer = create(
          <ProviderMock>
            <Header />
          </ProviderMock>,
        );
        expect(footer.toJSON()).toMatchSnapshot();
      });
    });



En caso que necesitemos actualizar la UI de algun componente, debemos actualizar tambien su snapshot, pdemos hacerlo de manera general 


    npx jest --udpateSnapshot

o un archivo en particular

    npx jest --updateSnapshot src/__test__/components/Footer.test.js


o podemos crear un script en el package.json para actualizar todos los snapshots


    "test:update": "jest --updateSnapshot"


## Probar Actions

Para probar los actions de Redux vamos a crear un objeto con el payload y type esperado y verificar si estos corresponden a la misma estructura que recibe el action

El payload estará compuesto por el mock de la estructura de datos que recibe el action 


    `src/__test__/actions/actions.test.js`

    import actions from '../../actions';
    import ProductMock from '../../__mocks__/ProductMock';

    describe('Actions', () => {
      test('addToCart Action', () => {
        const payload = ProductMock;
        const expected = {
          type: 'ADD_TO_CART',
          payload,
        };
        expect(actions.addToCart(payload)).toEqual(expected);
      });
    });


Para que en el output de las pruebas veamos las descripciones de cada uno de los test ejecutados, debemos configurarlo en modo verbose, esto lo hacemos en la configuracion de JEST en el package.json


    "jest": {
        "verbose": true,
        "setupFilesAfterEnv": [
          "<rootDir>/src/__test__/setupTest.js"
        ],
        "moduleNameMapper": {
          "\\.(styl|css)$": "<rootDir>/src/__mocks__/styleMock.js"
        },
        "testEnvironment": "jsdom"
      }


## Probar Reducers


Para probar los reducer es necesario comparar el estado inicial contra el estado final luego de ejecutar la acción. 


En este caso ademas de comparar los reducers tambien se va a comparar el retorno del estado inicial cuando no se le pasa un action

`src/__test__/reducers/reducers.test.js`

    import reducer from '../../reducers';
    import ProductMock from '../../__mocks__/ProductMock';

    describe('Reducers TEST', () => {
      test('initial state', () => {
        expect(reducer({}, '')).toEqual({});
      });
      test('ADD_TO_CART', () => {
        const initialState = { cart: [] };
        const action = { type: 'ADD_TO_CART', payload: ProductMock };
        expect(reducer(initialState, action)).toEqual({ cart: [ProductMock] });
      });
      test('REMOVE_FROM_CART', () => {
        const initialState = { cart: [ProductMock] };
        const action = { type: 'REMOVE_FROM_CART', payload: ProductMock };
        expect(reducer(initialState, action)).toEqual({ cart: [] });
      });
    });


## Probar peticiones fetch

Para este caso vamos a testear una utilidad para hacer peticiones fetch


    src/utils/getData.js

    const getData = (api) => {
      return fetch(api)
        .then(response => response.json())
        .then(response => response)
        .catch(error => error);
    };

    export default getData;


Para poder simular un fetch debemos instalar como dependencia de desarrollo


    npm i -D jest-fetch-mock


Antes de generar las pruebas debemos sobre escribir la función fetch con jest-fetch-mock  en el archivo de configuración setupTest.js para efecto de hacer las pruebas.


`src/__test__/setupTest.js`


    import { configure } from 'enzyme';
    import Adapter from 'enzyme-adapter-react-16';

    configure({ adapter: new Adapter() });
    global.fetch = require('jest-fetch-mock');


Nota: En caso de tener problema al importar dependencias de desarrollo, debemos configurar una nueva regla en el .eslintrc


    "rules": {
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        "react/jsx-filename-extension": 0,
    ...
    }

Nota: Si se desea no sobre escribir el fetch debemos configurar de la siguiente manera:

    // setupTest.js
    require('jest-fetch-mock').enableFetchMocks();

Ahora fetch sigue como nativo y para las pruebas podemos acceder globalmente a fetchMock

**Verificando la respueta de la api**


Antes de cada ejecución del test debemos usar el método fetch.resetMocks() 

Configuramos la respuesta esperada y ejecutamos el test con fetchMock

Nota: se debe tener precaución al trabajar con promesas, es necesario que retorne el resultado ya que la prueba puede estar mal escrita y sin embargo parecierar ser exitosa

 # src/__test__/utils/getData.test.js


    import getData from '../../utils/getData';

    describe('Fetch API', () => {
      beforeEach(() => {
        fetch.resetMocks();
      });

      test('call API and return data', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: '123' }));
        return getData('cualquiera.com').then((response) => {
          expect(response.data).toEqual('123');
        });
      });
    });


Ahora vamos a verificar que la url se recibe y se envía bien


    import getData from '../../utils/getData';

    describe('Fetch API', () => {
      beforeEach(() => {
        fetch.resetMocks();
      });

      test('call API and return data', () => {
        fetch.mockResponseOnce(JSON.stringify({ data: '123' }));
        return getData('https://cualquiera.com').then((response) => {
          expect(response.data).toEqual('123');

          expect(fetch.mock.calls[0][0]).toEqual('https://cualquiera.com');
        });
      });
    });


**mockFn.mock.calls**


Una mock function nos permite saber cuántas veces se llamó la función y con qué argumentos fue llamada.
Es por eso que mock.calls retorna un ‘array de arrays’ donde cada array es un llamado de la función y cada item es un argumento con el que fue llamado.
Por ejemplo: una función que se llamó dos veces y en cada vez se le pasaron 2 argumentos.

    [
      [‘arg1’, ‘arg2’], // 1a vez
      [‘arg3’, ‘arg4’], // 2a vez
    ];


## Jest + CI (Travis)

Crear una cuenta en Travis, el repo debe ser publico y el proyecto open source para que sus servicios puedan ser utilizados sin costo

Usar la cuenta de GitHub para loguear la cuenta y otorgar permisos a travis


Crear el archivo .travis.yml en la raíz del proyecto


travis trabaja con Yarn pero no hay necesidad de cambiarlo a NPM



    language: node_js
    cache:
      directories:
        - ~/.npm
    node_js:
      - '12'
    git:
      depth: 3
    script:
      - yarn test
      - yarn build
    deploy:
      provider: pages
      edge: true
      skip-cleanup: true
      keep-history: true
      github-token: $GITHUB_TOKEN
      local-dir: dist/
      target-branch: gh-pages
      commit_message: "Deploy release ${TRAVIS_TAG}"
      on:
        branch: main



**Creación del GITHUB_TOKEN**


**En GitHub**

account -> settings -> developer settings -> Personal access token -> Generate new token


habilitar los siguientes permisos

Repo - full control

read:repo_hook


GENERAR TOKEN

**En Travis**


Primero que todo debemos tener elegido un plan para poder configurar otras opciones, en este plan free  (Requiere metodo de pago)

Tambien debemos tener activado desde travis la app de Github y elegir si todos los directorios o solo los seleccionados tienen permiso de ser accedidos por Travis 


Ahora en account -> settings -> <nombre repositorio> -> more options settings -> y creamos la variable de entorno GITHUB_TOKEN 


## Probando el proyecto antes de hacer deploy


Enviamos a la rama main los ultimos cambios del proyecto que incluyen la configuracion de Travis

Ahora desde travis vamos a Account -> settings -> nombre del proyecto -> y lo habilitamos. Esto ejecuta el proceso de construccion
