[//]: # @param group $$ React
[//]: # @param title $$ Curso Profesional de React Hooks
[//]: # @param author $$ Iván D. Sánchez

# Curso Profesional de React Hooks

Disponibles desde la version 16.8 de React

Que es un Hook: Es una funcion especial que nos permite conectarnos a caracteristicas de React sin usar una clase.


## Introducción a React Hooks

### useState: estado en componentes creados como funciones

Te permite poder usar variables de estado dentro de componentes funcionales.

El Hook useState siempre nos retorna un array de dos posiciones. En la primera posición [0] vamos a tener el estado y él la segunda posición [1] vamos a tener la funciona para manipular el estado.


	const [state, setState] = useState(0);


En este caso hacemos uso de la desestructuración del array una característica de ES6


### useEffect: olvida el ciclo de vida, ahora piensa en efectos

Se ejecuta primero el render y luegos el useEffect []

### useContext: la fusión de React Hooks y React Context

- context permite poder pasar valores entre componentes sin tener que hacerlo por props	
- Al usar createContext el valor por defecto que le pasamos solo es usado únicamente si no hay un Provider. 

**Nota:** pasar undefined como valor al Provider no hace que los componentes que lo consumen utilicen defaultValue

- Creamos nuestro contexto en una carpeta src/context/ThemeContext.js


	import React from 'react'

	const ThemeContext = React.createContext(null)

	export default ThemeContext
	
	
	
y lo importamos desde el entrypoint de la aplicación index.js

	
	import React from 'react';
	import ReactDOM from 'react-dom';
	import './index.css';
	import App from './App';
	import ThemeContext from './context/ThemeContext'

	ReactDOM.render(
	  <React.StrictMode>
	    <ThemeContext.Provider value='gray'>
	      <App />
	    </ThemeContext.Provider> 
	  </React.StrictMode>,
	  document.getElementById('root')
	);

y usamos useContext para acceder al contexto header.js

	import React, {useState, useContext} from 'react'
	import ThemeContext from '../context/ThemeContext'

	export default function Header() {
	  const [darkmode, setDarkmode] = useState(false)
	  const color = useContext(ThemeContext)

	  const handleClick = () => {
	    setDarkmode(!darkmode)
	  }

	  return (
	    <div className='Header'>     
	      <h1 style={{color}}>ReactHooks</h1>
	      <button type="button" onClick={handleClick}>{darkmode ? 'Dark mode' : 'Light mode'}</button>      
	    </div>
	  )
	}


### useReducer: como useState, pero más escalable


Vamos a crear un boton para agregar favoritos de los characteres que seleccionemos

1. Importamos useReducer
2. Creamos un initialState fuera del componente (Evitar re-renders)
3. creamos el reducer fuera del componente, el cual recibe dos parametros el state y el action. Para este reducer hacemos un switch similar a los usados en Redux

4. para inicializar nuestro estado que usa reducer debemos usar useReducer el cual recibe dos parametros, el reducer y el initialState
5. luego vamos crear un handleClick que contendrá el dispatch de nuestro reducer. Este dispatch recibe un objeto que tiene como atributos el type, que es el que vamos a usar del reducer, y el payload del reducer.


	**Characters.jsx**
	
	import React, {useState, useEffect, useReducer} from 'react'

	const initialState = {
	  favorites: []
	}

	const favoriteReducer = (state, action) =>{
	  switch(action.type){
	    case 'ADD_TO_FAVORITE':
	      return {
		...state,
		favorites:[...state.favorites, action.payload]
	      }
	    default:
	      return state
	  }
	}

	export default function Characters() {

	  const [characters, setCharacters] = useState([])
	  const [favorites, dispatch] = useReducer(favoriteReducer, initialState)

	  useEffect(()=>{
	    fetch('https://rickandmortyapi.com/api/character/')
	    .then(response => response.json())
	    .then(data => setCharacters(data.results))
	  },[])
	  
	  const handleClick = (favorite) => {
	    dispatch({type: 'ADD_TO_FAVORITE', payload: favorite})
	  }

	  return (
	    <div className='Characters'>
	      
	      {favorites.favorites.map((favorite) =>(
		<li key={favorite.id}>{favorite.name}</li>
	      ))}

	    
	      {
		characters.map(character => (
		  <div className="item" key={character.id}>
		    <h2>{character.name}</h2>
		    <button type='button' onClick={()=>handleClick(character)}>Add to favorites</button>
		  </div>
		))
	      }
	      
	    </div>
	  )
	}

### useMemo: evita cálculos innecesarios en componentes

- Vamos a crear un campo controlado pra hacer un input search
- importamos useMemo
- creamos una funcion filter que renderiza los characters

	import React, {useState, useEffect, useReducer, useMemo} from 'react'
	import Item from './Item'
	const initialState = {
	  favorites: []
	}

	const favoriteReducer = (state, action) =>{
	  switch(action.type){
	    case 'ADD_TO_FAVORITE':
	      const validation = state.favorites.filter((favorite)=> action.payload.id === favorite.id)

	      if(validation.length === 0){
		return {
		  ...state,
		  favorites:[...state.favorites, action.payload]
		}
	      }
	      else{
		return {...state}
	      }
	    default:
	      return state
	  }
	}

	export default function Characters() {

	  const [characters, setCharacters] = useState([])
	  const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
	  const [search, setSearch] = useState('')

	  useEffect(()=>{
	    fetch('https://rickandmortyapi.com/api/character/')
	    .then(response => response.json())
	    .then(data => setCharacters(data.results))
	  },[])
	  
	  const handleClick = (favorite) => {
	    dispatch({type: 'ADD_TO_FAVORITE', payload: favorite})
	  }

	  const handleSearch = (ev)=>{
	    setSearch(ev.target.value)
	  }

	  const filteredUsers = characters.filter((user)=>{
	    return user.name.toLowerCase().includes(search.toLowerCase())
	  })
	  return (
	    <>
	      <div className="Search">
		<input type="text" value={search}  onChange={handleSearch}/>
	      </div>
	      <h2>All characters</h2>  
	      <div className='Characters'>
		{
		  filteredUsers.map(character => (
		  <Item key={character.id} character={character} handleClick={handleClick}/>
		  ))
		}
		
	      </div>
	      <h2>My favorites</h2>  
	      <div className='Characters'>
		{favorites.favorites.map((favorite) =>(
		  <Item key={favorite.id} character={favorite} />
		  ))}
	      </div>
	    </>
	  )
	}

Hasta este punto ya es funcional el buscador, ahora vamos a agregar useMemo para memoizar las busquedas

	const filteredUsers = useMemo(()=>
	    characters.filter((user)=>{
	      return user.name.toLowerCase().includes(search.toLowerCase())
	    }) ,[characters, search])

useMemo se encarga de memoizar valores de cálculos que puede ser costosos, recibe una funcion de calculo y array de dependencias que cuando una de ellas cambia volverá a calcular.


### useRef: manejo profesional de inputs y formularios

useRef retorna un objeto mutable que inicializa una propiedad "current" por la cual podemos acceder a los cambios sobre este objeto.

useRef devuelve el mismo objeto en cada render

ten en cuenta que useRef no notifica cuando su contenido cambia. Mutar la propiedad .current no causa otro renderizado. Si quieres correr algún código cuando React agregue o quite una referencia de un nodo del DOM, puede que quieras utilizar en su lugar una referencia mediante callback

vamos a cambiar el input search en Characters.jsx agregandole una referencia al objeto
- Agregamos la referencia creado con useRef al input a través del atributo ref
- El valor de value del input se va a modificar con el current.value de la referencia
- el handleSearch se modifica para ya no recibir el evento del input sino la referencia


	import React, {useState, useEffect, useReducer, useMemo, useRef} from 'react'
	import Item from './Item'
	const initialState = {
	  favorites: []
	}

	const favoriteReducer = (state, action) =>{
	  switch(action.type){
	    case 'ADD_TO_FAVORITE':
	      const validation = state.favorites.filter((favorite)=> action.payload.id === favorite.id)

	      if(validation.length === 0){
		return {
		  ...state,
		  favorites:[...state.favorites, action.payload]
		}
	      }
	      else{
		return {...state}
	      }
	    default:
	      return state
	  }
	}

	export default function Characters() {

	  const [characters, setCharacters] = useState([])
	  const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
	  const [search, setSearch] = useState('')
	  const searchInput = useRef(null)

	  useEffect(()=>{
	    fetch('https://rickandmortyapi.com/api/character/')
	    .then(response => response.json())
	    .then(data => setCharacters(data.results))
	  },[])
	  
	  const handleClick = (favorite) => {
	    dispatch({type: 'ADD_TO_FAVORITE', payload: favorite})
	  }

	  const handleSearch = ()=>{
	    setSearch(searchInput.current.value)
	  }

	  const filteredUsers = useMemo(()=>
	    characters.filter((user)=>{
	      return user.name.toLowerCase().includes(search.toLowerCase())
	    }) ,[characters, search])
	    
	  return (
	    <>
	      <div className="Search">
		<input type="text" value={search} ref={searchInput} onChange={handleSearch}/>
	      </div>
	      <h2>All characters</h2>  
	      <div className='Characters'>
		{
		  filteredUsers.map(character => (
		  <Item key={character.id} character={character} handleClick={handleClick}/>
		  ))
		}
		
	      </div>
	      <h2>My favorites</h2>  
	      <div className='Characters'>
		{favorites.favorites.map((favorite) =>(
		  <Item key={favorite.id} character={favorite} />
		  ))}
	      </div>
	    </>
	  )
	}

### useCallback: evita cálculos innecesarios en funciones


useCallback recibe dos parametros: una funcion a  memoizar y un arreglo de dependencias qeu estará escuchando en caso de que cambie
useCallback memoiza una función y evita que se generen cálculos si el arrego de dependendencias que le pasamos cambia
useCallback(fn, deps) es igual a useMemo(() => fn, deps) la diferencia es useMemo puede memoizar funciones y valores mientras que useCallback solo funciones
La optimizacion ya sea con useCallback o useMemo trae un costo, por ejemplo se deshabilita el garbage collector lo que representa un aumento en el uso de la memoria, tambien es costoso en el sentido que al declararlos estamos creando una funcion y un array a la vez.
se recomienda que la optimizacion solo sea para calculo realmente costosos, no siempre la optimizacion de pequeñas funcionalidades trae una mejora de rendimiento a la aplicación.


Para el ejercicio componentisamos el input de search y usamos el useCallback en el handleSearch

	 const handleSearch = useCallback(()=>{
	    setSearch(searchInput.current.value)
	  },[]) 

### Optimización de componentes en React con React.memo

**Nota:** para identificar re-render indeseados podemos colocar un console log en el return de los componentes hijo y ver si todos los componentes se renderizan a un cambio de estado del componente padre, así este estado no sea pasado por props a algunos de sus hijos que se renderizan nuevamente.


¿Qué significa optimización en React?
No existe una sola forma de optimizar componentes. Hay muchísimas formas de crear componentes y aún así podemos mostrar el “mismo” resultado en pantalla. Pero la forma en que lo hacemos puede afectar notoriamente el rendimiento del proyecto para nuestros usuarios.

Optimizar no es una sola técnica o fórmula secreta. Optimizar significa analizar los componentes de nuestro proyecto para mejorar el tiempo que tardamos en ejecutar cierto proceso o identificar procesos que estamos ejecutando en momentos innecesarios y le cuestan trabajo a la aplicación.

En esta lectura vamos a utilizar 2 herramientas oficiales de React para optimizar nuestros componentes. Pero ¿para qué tipo de optimización podemos utilizarlas? Vamos a evitar que nuestros componentes se rendericen innecesariamente.

React.memo vs. React.PureComponent
Vamos a evitar renders innecesarios causados por un mal manejo de las props.

¿Cómo funciona PureComponent?
PureComponent es una clase de React muy similar a React.Component, pero por defecto el método shouldComponentUpdate compara las props nuevas y viejas, si no han cambiado, evita volver a llamar el método render del componente. Esta comparación se llama Shallow Comparison.

Esta lectura te ayudará si quieres profundizar en cómo funcionan los objetos en JavaScript y por qué es necesario implementar shallow comparison en vez de una comparación “normal”: Aprende a Copiar Objetos en JavaScript sin morir en el intento.

¿Cuándo debo usar React.PureComponent?
En este ejemplo práctico crearemos 3 componentes, un papá y dos hijos. El componente padre tiene un estado con dos elementos, count y canEdit. El padre tiene dos funciones que actualizan cada elemento del estado. Y cada elemento del estado se envía a un componente hijo diferente.

Componente padre (App):

class App extends React.Component {
  constructor(props) {
      super(props);

      this.state = { count: 1, canEdit: true };
    }
    
    render() {
        console.log("Render App");

        const toggleCanEdit = () => {
            console.log("Click al botón de toggleCanEdit");
            this.setState(({ canEdit: oldCanEdit }) => {
              return { canEdit: !oldCanEdit };
            });
        };

        const countPlusPlus = () => {
          console.log("Click al botón de counter");
          this.setState((prevState) => {
            return { count: prevState.count + 1 };
          });
        };

        return (
            <>
              <button onClick={countPlusPlus}>Counter +1</button>
              <Counter count={this.state.count} />

              <button onClick={toggleCanEdit}>Toggle Can Edit</button>
              <Permissions canEdit={this.state.canEdit} />
            </>
        );
    }
}
Componente hijo (counter):

class Counter extends React.Component {
    render() {
        console.log("Render Counter")
        const { count } = this.props;
 
        return (
            <form>
                <p>Counter: {count}</p>
            </form>
        );
    }
}
Componente hijo (permisos):

class Permissions extends React.Component {
    render() {
        console.log("Render Permissions")
        const { canEdit } = this.props;
 
        return (
            <form>
                <p>El usuario {canEdit ? "" : "no"} tiene permisos de editar...</p>
            </form>
        );
    }
}
Si pruebas este código en el navegador, podrás darte cuenta de que, sin importar en qué botón demos clic, todos los componentes se vuelven a renderizar.

React PureComponent
Este error puede ser muy grave. La prop canEdit no tiene ninguna conexión con el componente Counter ni la prop count con el componente Permissions, pero, aún así, si cualquiera de las dos cambia, los 3 componentes se vuelven a renderizar.

Afortunadamente podemos arreglarlo/optimizarlo cambiando React.Component por React.PureComponent.

class App extends React.PureComponent { /* … */ }
class Counter extends React.PureComponent { /* … */ }
class Permissions extends React.PureComponent { /* … */ }
React.PureComponent
¿Cómo funciona y cuándo debo usar React.memo?
Si useEffect es el “reemplazo” del ciclo de vida en componentes creados como funciones con React Hooks, React.memo es el “reemplazo” de PureComponent.

Convirtamos el ejemplo anterior a funciones con React Hooks:

const App = function() {
  console.log("Render App");

  const [count, setCount] = React.useState(1);
  const [canEdit, setCanEdit] = React.useState(true);

  const countPlusPlus = () => {
    console.log("Click al botón de counter");
    setCount(count + 1);
  };

  const toggleCanEdit = () => {
      console.log("Click al botón de toggleCanEdit");
      setCanEdit(!canEdit);
  };

  return (
    <>
      <button onClick={countPlusPlus}>Counter +1</button>
      <Counter count={count} />

      <button onClick={toggleCanEdit}>Toggle Can Edit</button>
      <Permissions canEdit={canEdit} />
    </>
  );
}

const Permissions = function({ canEdit }) {
  console.log("Render Permissions")

  return (
      <form>
          <p>Can Edit es {canEdit ? "verdadero" : "falso"}</p>
      </form>
  );
}

const Counter = function({ count }) {
  console.log("Render Counter")

  return (
      <form>
          <p>Counter: {count}</p>
      </form>
  );
}
El resultado va a ser exactamente igual que al usar React.Component.

React PureComponent
Ahora usemos React.memo para que nuestro componente no se renderice si las props que recibe siguen igual que en el render anterior.

const App = React.memo(function() {
    /* … */
});

const Permissions = React.memo(function({ canEdit }) {
    /* … */
});

const Counter = React.memo(function({ count }) {
    /* … */
});
React.PureComponent
¿Cómo crear una comparación personalizada con React.memo o shouldComponentUpdate?
En algunos casos puede que no necesitemos shallow comparison, sino una comparación o validación personalizada. En estos casos lo único que debemos hacer es reescribir el método shouldComponentUpdate o enviar un segundo argumento a React.memo (casi siempre incluimos los keywords are equal al nombre de esta función).

Esta nueva comparación la necesitaremos, por ejemplo, cuando nuestro componente recibe varias props, pero solo necesita su valor inicial, es decir, sin importar si cambian, a nuestro componente le da igual y solo utilizará la primera versión de las props.

// Con clases
class Permissions extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {
        /* … */
    }
}

// Con hooks
function memoStopIfPropsAreEqualOrNot(oldProps, newProps) {
  return true;
}

const Permissions = React.memo(function({ canEdit }) {
    /* … */
}, memoStopIfPropsAreEqualOrNot);
En este caso evitamos que nuestro componente se actualice sin importar si cambian nuestras props. Pero ¿qué tal si sí debemos volver a renderizar cuando cambia alguna de nuestras props?

// Con clases
class Permissions extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.input.value !== nextProps.input.value) {
            return true;
        } else {
            return false;
        }
    }
}

// Con hooks
function memoIsInputEqual(oldProps, newProps) {
    if (oldProps.input.value !== newProps.input.value) {
        return false;
    } else {
        return true;
    }
}

const Permissions = React.memo(function({ canEdit }) {
    /* … */
}, memoIsInputEqual);
Recuerda que la función shouldComponentUpdate debe devolver true si queremos que nuestro componente se vuelva a renderizar. En cambio, la función de evaluación de React.memo debe devolver false si nuestras props son diferentes y, por ende, queremos permitir un nuevo render.

Ahora que conoces los casos de uso para React.memo y React.PureComponent para evitar renders innecesarios de tus componentes en React… ¿En qué piensas cuando debes “optimizar un componente” en tu aplicación con React.js?

### Custom hooks: abstracción en la lógica de tus componentes

Los custom hooks es la separacion de la logica en hooks personalizados
Los custom hook debe iniciar por la palabra use seguido del nombre del hook. ejemplo useCharacters

en el proyecto vamos a convertir el useEffect que realiza el request que trae los personajes en un custom hook

creamos la carpeta src/hooks/useCharacters.js

el hook recibe por parametro la url para la petición del request

**useCharacters**

	import { useState, useEffect } from "react";

	const useCharacters = (url) => {
	  const [characters, setCharacters] = useState([])

	  useEffect(()=>{
	    fetch(url)
	    .then(response => response.json())
	    .then(data => setCharacters(data.results))
	  },[url])

	  return characters
	}


	export default useCharacters

**Characters.jsx**

	import useCharacters  from '../hooks/useCharacters';
	
	***
	
	 const characters = useCharacters(API)
	 


## Third Party Custom Hooks de Redux y React Router


Los React Hooks cambiaron tanto la forma de hacer nuestro código para crear aplicaciones que otras herramientas también han creado sus propios custom hooks, de forma que podemos usarlos para que nuestro código sea más legible y fácil de mantener.

React Redux
Seguramente conoces react-redux, aquí podrás encontrar dos custom hooks que son muy útiles al momento de usar esta biblioteca: useSelector y useDispatcher. Estos los encontrarás a partir de la versión 7.1.0 de la biblioteca y a continuación te explicaré para qué sirven:

useSelector: nos permite elegir de qué contenido en nuestro estado queremos leer información para usarla en nuestro componente.
// Primero debemos importar el hook desde react-redux
import { useSelector } from 'react-redux';

// El hook recibe una función y aquí indicamos qué parte del estado queremos
const myProperty= useSelector(state => state.myProperty);
useDispatcher: nos permite ejecutar las acciones hacia nuestro estado.
// Importamos el hook
import { useDispatcher} from 'react-redux';

// Creamos una variable donde vivirá nuestro dispatcher
const dispatcher = useDispatcher();

// Ahora solo debemos pasarle la información de la acción que se ejecutará en nuestro reducer
dispatcher({ type: actionType, payload });
Si quieres aprender a crear un sencillo contador de clics, pero usando esta configuración de hooks y toda la configuración de Redux en React, te recomiendo seguir este tutorial: Redux es fácil si usas React Hooks.

React Router
React Router también contiene diferentes custom hooks para acceder a varias funcionalidades e información de la navegación del usuario en nuestra aplicación.

useHistory: nos permite acceder a los métodos de navegación para movernos a través de ella de la forma que lo veamos más conveniente. Por ejemplo:
import { useHistory } from 'react-router-dom';
let history = useHistory();
history.push('/home');
useLocation: nos permite acceder a la información de la URL actual en la que se encuentran nuestros usuarios.
import { useLocation } from 'react-router-dom';
let location = useLocation();
console.log(location.pathname);
useParams: nos permite acceder a un objeto con la información de los parámetros que tendremos en la ruta que estamos navegando, por ejemplo, el slug de un blogpost.
import { useParams } from 'react-router-dom';
let { slug } = useParams();
console.log(slug);
useRouteMatch: funciona al igual que los componentes <Route>, pero este hook también nos permitirá saber si existe algún match adicional que podremos usar para mostrar o no otra información en la misma vista.
import { useRouteMatch } from 'react-router-dom';
let match = useRouteMatch('/blog/:slug');

return (
	<div>
		<h1>Hello World</h1>
		{match && <p>Route matches</p>}
	</div>
)
## Configura un entorno de desarrollo profesional

Creacion del proyecto plazti conf merch

* vamos crear la carpeta platzi-conf-merch
* inicializamos dentro de la carpeta el git init
* inicializamos dentro de la carpeta el npm init -y

La configuración del proyecto se hará desde cero sin usar create react app

- instalar react y react-dom

	npm install react react-dom
	
- construccion de la estructura de carpetas y archivos
- creacion de la carpeta /src
- creacion de la carpeta /public
- creacion de la carpeta /src/components
- creacion del archivo /src/index.js   (entry point)
- creacion del archivo /src/components/App.jsx
- creacion del archivo /public/index.html

**/public/index.html**

	<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="UTF-8">
	  <meta http-equiv="X-UA-Compatible" content="IE=edge">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Document</title>
	</head>
	<body>
	    <div id='app'></div>
	</body>
	</html>
	
	
**/src/components/app.js**
	
	import React from 'react'

	export default function App() {
	  return (
	    <h1>test</h1>
	  )
	}


**/src/index.js**

	import react from 'react'
	import  ReactDOM from 'react-dom'

	import App from './components/App'

	ReactDOM.render(App, document.getElementById('app'))



### Instalación de Webpack y Babel: presets, plugins y loaders


Instalación de webpack como dependencia de desarrollo

	npm install webpack webpack-cli  webpack-dev-server -D
	
Instalación de plugins y loaders requeridos por webpack

	npm install html-webpack-plugin html-loader -D

Instalacion de babel

	npm install babel-loader  @babel/preset-env @babel/preset-react @babel/core -D

### Configuración de Webpack 5 y webpack-dev-server

- creación del archivo /webpack.config.js

- instanciamos una constante de path (viene de NodeJS - obtiene la ubicación en el sistema del proyecto)

	const path = require('path')

- importamos el plugin consthtml-webpack-plugin

	const HtmlWebpackPlugin = require("html-webpack-plugin")

- construimos el modulo que vamos a exportar al requerir webpack

	module.exports = {...}

- indicar el punto  de entrada a la aplicación

	entry: "./src/index.js"
	
- Indicar el output, hacia donde va nuestro proyecto cuando lo compilamos. usamos path.resolve(__dirname, "dist" ) el cual recibe el parámetro __dirname para obtener la carpeta actual donde esta el proyecto en nuestro SO y el nombre de la carpeta que se creará para compilar el proyecto. En el output tambien debemos configurar el atributo filename para indicar el nombre del archivo resultante


	output: {
	    path: path.resolve(__dirname,'dist'),
	    filename: "bundle.js"
	  }
	
	
## Reglas de los hooks

- No invocar hooks desde loops, condicionales o funciones anidadas.
- Todo custom hook debe iniciar por la palabra **use**
- 2 componentes compartiendo el mismo hook no comparten el mismo estado
- Un hook puede invocar a otro hook
- Los hook solo deben usarse en componentes funcionales
- Deben utilizarse en el nivel superior de los componentes

