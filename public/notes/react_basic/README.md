[//]: # @param group $$ React
[//]: # @param title $$ React Básico
[//]: # @param author $$ Iván D. Sánchez

# Platzi Badges

- Clonar repositorio

```
git clone git@github.com:cosmosoftroot/platzi-badges.git
```

- Instalar dependencias

```
npm install
```

Correr app

```
npm run start
```

## ReactDOM.render

- React y ReactDOM trabajarán en conjunto.
  - React como análogo a createElement
  - ReactDOM a appendChild
- ReactDOM.render() toma dos argumentos: Qué queremos renderizar y dónde lo queremos renderizar.

- Siempre que escribas JSX es requisito importar React.

** Vanilla.JS - createElement, appendChild**

```
const element = document.createElement('h1');
element.innerText = 'Hello World!!!';
const container = document.getElementById('root');

container.appendChild(element);
```

** React **

```
import React from 'react';
import ReactDOM from 'react-dom';

const element = <h1>Hello World !!!</h1>;
const container = document.getElementById('root');

//ReactDOM.render('__what__', '__where__');
ReactDOM.render(element, container);
```

## JSX vs React.createElement

Elemento con React.createElement

```
import React from "react";
import ReactDOM from "react-dom";
const container = document.getElementById("root");

//const element = React.createElement(component,{props}, children)
const element = React.createElement(
  "a",
  { href: "https://www.google.com/", target: "_blank" },
  "Visit to Google"
);

ReactDOM.render(element, container);

```

Elemento con JSX

```
import React from "react";
import ReactDOM from "react-dom";
const container = document.getElementById("root");

const element = <a href='https://www.google.com/' target='_blank'>Visit to google!!!</a>

ReactDOM.render(element, container);
```

Componente con React.createElement

```
import React from "react";
import ReactDOM from "react-dom";
const container = document.getElementById("root");

//const element = React.createElement(component,{props}, children)
const component = React.createElement(
  "div",
  {},
  React.createElement("h1", {}, "Title Example"),
  React.createElement("p", {}, "lorem ipsum")
);

ReactDOM.render(component, container);
```

Componente en JSX

```
import React from "react";
import ReactDOM from "react-dom";
const container = document.getElementById("root");

const component = (<div>
    <h1>Title Example</h1>
    <p>lorem ipsum JSX</p>
</div>);

ReactDOM.render(component, containe
```

## Componentes

Los elemementos son a los objetos como los componentes son a las clases. Los elementos salen de los componentes.

Para identificar componentes se recomienda:

- Elementos que se repiten: elementos de una lista o con aspecto visual y funcional compartido.
- Elementos con una función muy específica
- Los componentes como buena práctica deben habitar en una carpeta que los agrupe y en un archivo por componente
- Todos los componente requieren como mínimo un método, este es render(){} Se define como a ser el resultado que vamos a ver en pantalla
- Si no tiene <> es un componente `Badge != <Badge />`
- El elemento siempre debe estar cerrado Ejm: `<Badge />`

**_src/components/Badge.js _**

```
import React from "react";
import confLogo from "../images/badge-header.svg";

class Badge extends React.Component {
  render() {
    return (
      <div>
        <div>
          <img src={confLogo} alt="Logo de la conferencia" />
        </div>
        <div>
          <img src="https://www.gravatar.com/avatar?d=identicon" alt="Avatar" />
          <h1>
            Cosmosoft
            <br />
            Soluciones
            <br />
            Informáticas
          </h1>
        </div>
        <div>
          <p>Fullstack JavaScript Developer</p>
          <p>@cosmosoftroot</p>
        </div>
        <div>#PlatziConf</div>
      </div>
    );
  }
}

export default Badge;
```

**_ src/index.js _**

```
import React from "react";
import ReactDOM from "react-dom";
import Badge from './components/Badge';

const container = document.getElementById('app');

ReactDOM.render(<Badge />,container);

```

### Insertar estilos

- Crear la carpeta src/components/styles
- Crear un archivo de estilos por componente y un archivo para estilos generales
- Importar archivo de estilos

```
import './styles/Badge.css';
```

Para agreagar clases a los componentes debemos usar la palabra className ya que class es una palabra reservada de JavaScript

```
<div className='Badge__header'>
          <img src={confLogo} alt="Logo de la conferencia" />
        </div>
        <div className='Badge__section-name'>
          <img className='Badge__avatar' src="https://2.gravatar.com/avatar/b9c674ca7541ea962e68107fbc6cb335?s=400&d=mm" alt="Avatar" />
          <h1>
            Cosmosoft
            <br />
            Soluciones
            <br />
            Informáticas
          </h1>
        </div>
```

### Trabajando con bootstrap

Instalar bootstrap

```
npm install bootstrap
```

npm guardar los archivos de bootstrap en la carpeta node_modules.
importar el archivo de estilos de bootstrap desde src/index.js

```
import 'bootstrap/dist/css/bootstrap.css';
```

### Estilos globales

- Crear el archivo src/global.css
- Importar desde src/index.js

```
import './global.css';
```

Desde el archivo **_global.css_** se puede importar estilos externos como **_gooogle fonts_**

```
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
@import url('https://fonts.googleapis.com/css?family=Anton');
```

## Props

Los props que es la forma corta de properties son argumentos de una función y en este caso serán los atributos de nuestro componente como class, src, etc.

Estos props salen de una variable de la clase que se llama this.props y los valores son asignados directamente en el ReactDOM.render().

**_src/index.js_**

```
ReactDOM.render(
  <Badge
    firstName="Iván"
    lastName="Sánchez"
    jobTitle="Fullstack JavaScript Developer"
    twitter="cosmosoftroot"
    avatarUrl='https://2.gravatar.com/avatar/b9c674ca7541ea962e68107fbc6cb335?s=400&d=mm'
  />,
  container
);

```

**_src/components/Badge.js_**

```
class Badge extends React.Component {
  render() {
    return (
      <div className="Badge">
        <div className="Badge__header">
          <img src={confLogo} alt="Logo de la conferencia" />
        </div>
        <div className="Badge__section-name">
          <img
            className="Badge__avatar"
            src={this.props.avatarUrl}
            alt="Avatar"
          />
          <h1>
            {this.props.firstName}
            <br />
            {this.props.lastName}
          </h1>
        </div>
        <div className="Badge__section-info">
          <h3>{this.props.jobTitle}</h3>
          <div>@{this.props.twitter}</div>
        </div>
        <div className="Badge__footer">#PlatziConf</div>
      </div>
    );
  }
}
```

## Página == Componente

- Las páginas en React son componentes y conseguir distinguirlas nos servirá para saber que es un componente que adentro lleva otros componentes.

- Al escribir los props no importa el orden en el que lo hagas, únicamente importa el nombre.

- Crear la carpeta src/pages
- Dentro de ella vamos a crear un nuevo componente llamado BadgeNew.js
- Los estilos de las páginas se guardan en src/pages/styles

**_src/index.js_**

```
import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./global.css";

import BadgeNew from "./pages/BadgeNew";

const container = document.getElementById("app");

ReactDOM.render(<BadgeNew />, container);
```

**_src/pages/BadgeNew.js_**

```
import React from "react";
import "./styles/BadgeNew.css";
import header from "../images/badge-header.svg";
import Navbar from "../components/Navbar";
import Badge from "../components/Badge";

class BadgeNew extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="BadgeNew__hero">
          <img className="img-fluid" src={header} alt="logo" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <Badge
                firstName="Iván"
                lastName="Sánchez"
                jobTitle="Fullstack JavaScript Developer"
                twitter="cosmosoftroot"
                avatarUrl="https://2.gravatar.com/avatar/b9c674ca7541ea962e68107fbc6cb335?s=400&d=mm"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default BadgeNew;

```

## Enlazando eventos

- React dispone de eventos. Cada vez que se recibe información en un input se obtiene un evento onChange y se maneja con un método de la clase this.handleChange

- Los elementos button también tienen un evento que es onClick.

- Cuando hay un botón dentro de un formulario, este automáticamente será de tipo submit. Si no queremos que pase así hay dos maneras de evitarlo: especificando que su valor es de tipo button o manejándolo desde el formulario cuando ocurre el evento onSubmit.

**_onChange_**

- Cuando suceda el evente onChange vamos a llamar al método this.handleChange de la clase

- handle es una referencia sugerida para el método a ejecutar según el evento.

**_src/components/BadgeForm.js_**

```
import React from "react";

class BadgeForm extends React.Component {
  handleChange = e => {
    console.log({
      name: e.target.name,
      value: e.target.value
    });
  };

  handleClick = e => {
    console.log("Button was clicked!!");
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('Form was submitted!!');
  };

  render() {
    return (
      <div>
        <h1>New Attendant</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="text"
              name="firstName"
            />
          </div>
          <button
            onClick={this.handleClick}
            className="btn btn-primary"
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default BadgeForm;

```

## Manejo de estado

- Hasta esta clase todos los componentes han obtenido su información a través de props que vienen desde afuera (otros componentes) pero hay otra manera en la que los componentes pueden producir su propia información y guardarla para ser consumida o pasada a otros componentes a través de sus props. La clave está en que la información del state a otros componentes pasará en una sola dirección y podrá ser consumida pero no modificada.

- Para guardar la información en el estado se usa una función de la clase component llamada setState a la cual se le debe pasar un objeto con la información que se quiere guardar.

- En el siguiente ejemplo a cada evento onChange de los input tipo texto este setea el estado con el método setState

```
import React from "react";

class BadgeForm extends React.Component {
  handleChange = e => {
    // console.log({
    //   name: e.target.name,
    //   value: e.target.value
    // });
    this.setState({
        [e.target.name] : e.target.value,
    })
  };

  handleClick = e => {
    console.log("Button was clicked!!");
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('Form was submitted!!');
  };

  render() {
    return (
      <div>
        <h1>New Attendant</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="text"
              name="firstName"
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="text"
              name="lastName"
            />
          </div>

          <div className="form-group">
            <label>Job Title</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="text"
              name="jobTitle"
            />
          </div>

          <div className="form-group">
            <label>Twitter</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="text"
              name="twitter"
            />
          </div>

          <button
            onClick={this.handleClick}
            className="btn btn-primary"
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default BadgeForm;

```

- Aunque no se ve, la información está siendo guardada en dos sitios. Cada input guarda su propio valor y al tiempo la está guardando en setState, lo cual no es ideal. Para solucionarlo hay que modificar los inputs de un estado de no controlados a controlados.

- Inicializar el estado para evitar conflictos al cargar el formulario.
- Para este caso se inicializó con un objeto vacio `  state = {};`sin embargo es posible inicializar el estado con algun valor por ejemplo `state={jobTitle : 'Designer'}`

```
import React from "react";

class BadgeForm extends React.Component {
  state = {};

  handleChange = e => {
    // console.log({
    //   name: e.target.name,
    //   value: e.target.value
    // });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    console.log("Button was clicked!!");
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Form was submitted!!");
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <h1>New Attendant</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="text"
              name="firstName"
              value={this.state.firstName}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="text"
              name="lastName"
              value={this.state.lastName}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="email"
              name="email"
              value={this.state.email}
            />
          </div>

          <div className="form-group">
            <label>Job Title</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="text"
              name="jobTitle"
              value={this.state.jobTitle}
            />
          </div>

          <div className="form-group">
            <label>Twitter</label>
            <input
              onChange={this.handleChange}
              className="form-control"
              type="text"
              name="twitter"
              value={this.state.twitter}
            />
          </div>

          <button onClick={this.handleClick} className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default BadgeForm;


```

### Levantamiento del estado

Levantar el estado es una técnica de React que pone el estado en una localización donde se le pueda pasar como props a los componentes. Lo ideal es poner el estado en el lugar más cercano a todos los componentes que quieren compartir esa información.

Algo interesante que le da el nombre a React es su parte de “reactivo” ya que cada vez que hay un cambio en el estado o en los props que recibe un componente se vuelve a renderizar todo el componente y todos sus descendientes.

#### src/pages/BadgeNew.js

```
import React from "react";
import "./styles/BadgeNew.css";
import header from "../images/badge-header.svg";
import Navbar from "../components/Navbar";
import Badge from "../components/Badge";
import BadgeForm from "../components/BadgeForm";

class BadgeNew extends React.Component {
  state = { form: {} };

  handleChange = e => {
    this.setState({
      form: {
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="BadgeNew__hero">
          <img className="img-fluid" src={header} alt="logo" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge
                firstName="Iván"
                lastName="Sánchez"
                jobTitle="Fullstack JavaScript Developer"
                twitter="cosmosoftroot"
                avatarUrl="https://2.gravatar.com/avatar/b9c674ca7541ea962e68107fbc6cb335?s=400&d=mm"
              />
            </div>
            <div className="col-6">
              <BadgeForm onChange={this.handleChange} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default BadgeNew;

```

#### src/components/BadgeForm.jsx

Enviamos desde BadgeNew.js a través de los props en handle del evento onChange a BadgeForm.jsx

```
import React from "react";

class BadgeForm extends React.Component {
  state = {};

  handleClick = e => {
    console.log("Button was clicked!!");
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Form was submitted!!");
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <h1>New Attendant</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="firstName"
              value={this.state.firstName}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="lastName"
              value={this.state.lastName}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="email"
              name="email"
              value={this.state.email}
            />
          </div>

          <div className="form-group">
            <label>Job Title</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="jobTitle"
              value={this.state.jobTitle}
            />
          </div>

          <div className="form-group">
            <label>Twitter</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="twitter"
              value={this.state.twitter}
            />
          </div>

          <button onClick={this.handleClick} className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default BadgeForm;

```

- En el anterior script el state se sobreescribe en cada cambio de BadgeForm.

- Existen dos tipos de solución para no sobreescribir el state.

#### Solución 1

Inicializamos una variable que almacene el estado actual del form (**_nextForm_**)y a partir de ahí adjujuntamos los cambios del form y el estado

```
class BadgeNew extends React.Component {

  state = { form: {} };


  handleChange = e => {

    const nextForm = this.state.form;
    nextForm[e.target.name] = e.target.value;

    this.setState({
      form: nextForm
    });
  };
```

#### Solución 2

Se desestructuran los datos actuales del formulario en el estado y se crea o sobreescribe un nueva propiedad del state

```
class BadgeNew extends React.Component {
  state = { form: {} };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };
```

### Componentes controlados

- Enviar los valores del estado del formulario desde BadgeNew.js a BadgeForm.js.

- En este ejemplo se enviaron a través del prop **_FormValues_**

**_BadgeNew.js_**

```
render() {
    return (
      <div>
        <Navbar />
        <div className="BadgeNew__hero">
          <img className="img-fluid" src={header} alt="logo" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge
                firstName="Iván"
                lastName="Sánchez"
                jobTitle="Fullstack JavaScript Developer"
                twitter="cosmosoftroot"
                avatarUrl="https://2.gravatar.com/avatar/b9c674ca7541ea962e68107fbc6cb335?s=400&d=mm"
              />
            </div>
            <div className="col-6">
              <BadgeForm onChange={this.handleChange} formValues={this.state.form}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
```

**_BadgeForm.js_**

- Recibir en BadgeForm.js los valores del state por props.
- Retirar la inicialización de **state={}**

```
import React from "react";

class BadgeForm extends React.Component {
    handleClick = e => {
    console.log("Button was clicked!!");
    console.log(this.state)

  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Form was submitted!!");

  };

  render() {
    return (
      <div>
        <h1>New Attendant</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="firstName"
              value={this.props.formValues.firstName}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="lastName"
              value={this.props.formValues.lastName}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="email"
              name="email"
              value={this.props.formValues.email}
            />
          </div>

          <div className="form-group">
            <label>Job Title</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="jobTitle"
              value={this.props.formValues.jobTitle}
            />
          </div>

          <div className="form-group">
            <label>Twitter</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="twitter"
              value={this.props.formValues.twitter}
            />
          </div>

          <button onClick={this.handleClick} className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default BadgeForm;

```

Para evitar el warning que se genera al pasar de un componente no controlado a un controlado, entonces inicializamos los campos del formulario en BadgeNew.js

```
  state = { form: {
    firstName:'',
    lastName:'',
    jobTitle:'',
    email:'',
    twitter:'',

  } };
```

Cada vez que hay un cambio en el estado o los props que recibe un componente se vuelve a renderizar todo el componente y sus descendientes

### Del state a los props

Desde BadgeNew.js pasamos a traves de los props de Badge.js los valores del state y así hemos conectado BadgeForm.js y Badge.js

**_BadgeNew.js_**

```
<Badge
	firstName={this.state.form.firstName}
	lastName={this.state.form.lastName}
	jobTitle={this.state.form.jobTitle}
	twitter={this.state.form.twitter}
	mail={this.state.form.mail}
	avatarUrl="https://2.gravatar.com/avatar/b9c674ca7541ea962e68107fbc6cb335?s=400&d=mm"
              />
```

**_Badge.js_**

```
<div className="Badge__section-name">
	<img
	className="Badge__avatar"
	src={this.props.avatarUrl}
	alt="Avatar"
	/>
	<h1>
	{this.props.firstName}
	<br />
	{this.props.lastName}
	</h1>
</div>
```

### Listas de componentes

- Para este ejercicio se crea el archivo src/pages/Badges.js

- Cada item de lista requiere un prop único llamado key, es un prop que le ayuda a React para saber si un elemento fue renderizado.

- Se crea el archivo src/components/BadgesList.js
- Pasamos el state de Badges.js a BadgesList.js a través del props badges={this.state.data}

**_Badges.js_**

```
import React from "react";

import "./styles/Badges.css";
import Navbar from "../components/Navbar";
import confLogo from "../images/badge-header.svg";
import BadgesList from "../components/BadgesList";

class Badges extends React.Component {
  state = {
    data: [{
      id: '0101',
      firstName: 'Nata',
      lastName: 'Night',
      jobTitle: 'Data Marketing',
      email: 'nataly.fg@gmail.com',
      twitter: 'nfonseca',
      avatarUrl: "https://2.gravatar.com/avatar/b9c674ca7541ea962e68107fbc6cb335?s=400&d=mm"

    },
    {
      id: '0102',
      firstName: 'Katoxxxika',
      lastName: 'Sanchez',
      jobTitle: 'Human Rights',
      email: 'kalosaji@gmail.cm',
      twitter: 'resistencia',
      avatarUrl: "https://2.gravatar.com/avatar/b9c674ca7541ea962e68107fbc6cb335?s=400&d=mm"


    },
    {
      id: '0103',
      firstName: 'Adrian',
      lastName: 'Jackson',
      jobTitle: 'Engineer',
      email: 'sapitoadrian@gmail.com',
      twitter: 'adrianson',
      avatarUrl: "https://2.gravatar.com/avatar/b9c674ca7541ea962e68107fbc6cb335?s=400&d=mm"


    }]
  }
  render() {
    return (
      <div>
        <Navbar />

        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img className="" src={confLogo} alt="logo" />
            </div>
          </div>
        </div>

        <div className="Badges__container">
          <div className="Badges__buttons">
            <a href="/badges/new" className="btn btn-primary">
              New Badge
            </a>
          </div>
        </div>

        <div className="Badges__list">
          <div className="Badges__container">
            <BadgesList badges={this.state.data} />
          </div>
        </div>
      </div>
    );
  }
}

export default Badges;

```

**src/components/BadgesList.js**

```
import React from 'react';

class BadgesList extends React.Component {
  render() {
    return (
      <ul className="list-unstyled">
        {this.props.badges.map((badge) => {
          return (
            <li key={badge.id}>
              <p>{badge.firstName} {badge.lastName}</p>
            </li>)
        })}
      </ul>
    )
  }
}

export default BadgesList;
```

## React router

Las aplicaciones que se trabajan en React son llamadas **_SPA (Single Page App)_** Estos es posible gracias a React router que es una libreria Open source.

**_Multi Page App:_** Cada página implica una petición al servidor. La respuesta usualmente tiene todo el contenido de la página.

**_SPA (Single Page App)_** Aplicaciones que cargan en una sola página de HTML y cualquier actualizacion la hacen reescibiendo el HTML que ya existía

React Router V4: Nos da las herramientas para poder hacer SPA facilmente. Usaremos 4 componentes:

- BrowserRouter: Es un componente que debe estar siempre lo mas arriba de la aplicación. Todo lo que este adentro funcionará como una SPA.

- Route: Cuando hay un match on el Path, se hace render del componente. El componente va a recibir tres props: match, history, location

- Switch: Dentro de switch solamente van elementos Route. Switch se asegura que solamente un Route se renderize.

- Link: Toma el lugar del elemento `<a>`evita que se recargue la página completamente y actualiza la URL

### Instalación

Existen varias versiones de react router, la que vamos a utilizar para navegadores es react-router-dom en su version 4

```
npm install react-router-dom
```

Una opción para instalar siempre la misma versión es esperar la finalización de la instalación, dirigirse al archivo package.json y en la sección dependencies eliminar el circunflejo de la versión `^`.

```
"dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.4.0",
    "@testing-library/user-event": "^7.2.1",
    "bootstrap": "^4.4.1",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.3.0"
  },
```

- Crear el archivo src/components/App.js
- Desde App.js se gestionan las rutas de la aplicación
- Importar desde src/index.js el componente App.js y renderizarlo en el container

**_Nota:_** En ocasiones es posible no utilizar clases para los componentes sino funciones, esto se hace cuando no se haya declarado otro método y no estemos usando estado

```
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/badges/" component={Badges} />
        <Route exact path="/badges/new" component={BadgeNew} />
      </Switch>
    </BrowserRouter>
  );
}
```

- **_BrowserRouter_** solo debe tener un hijo. Switch encapsula las ruta dentro de BrowserRouter
- **_Switch_** Toma la dirección del navegador y renderiza la ruta que haga match con la url.
- **_Route_** Debe tener la propiedad exact para renderizar unicamente lo que haga match exacto con la url y no una coincidencia en el path
- **_Link_** El link internamente tienen un elemento `<a>` pero tiene la capacidad de interceptar el click del usuario para evitar recargar toda la página

```
<Link to='url'>Click me</Link>
```

**_src/components/App.js_**

```
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BadgeNew from "../pages/BadgeNew";
import Badges from "../pages/Badges";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/badges/" component={Badges} />
        <Route exact path="/badges/new" component={BadgeNew} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
```

## Layout

Es una plantilla utilizada para compartir entre páginas los componentes que son comunes

- Crear el archivo src/components/Layout.js
- Importar desde src/component/App.js el archivo Layout.js
- Los componentes funcionales tienen los props como único argumento
- children es una prop especial que permite pasar elementos hijo directamente en su resultado.
- Pasarle al Layout los componentes que se desean compartir

**_src/components/App.js_**

```
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/badges/" component={Badges} />
          <Route exact path="/badges/new" component={BadgeNew} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
```

**_src/components/Layout.js_**

```
import React from "react";
import Navbar from "./Navbar";

function Layout(props) {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
}

export default Layout;

```

### React.Fragment

- Se debe retornar un solo elemento en el render.
- Una opción para retornar un solo elemento es encapsular con `<div>`todos los elementos, este div aunque es renderizado por el navegador su uso es innecesario para el diseño
- El uso de `<div>`para este tipo de situaciones puede ser reemplazado por `<React.Fragment>`el cual NO se renderiza en el navegador

```
function Layout(props) {
  return (
    <React.Fragment>
      <Navbar />
      {props.children}
    </React.Fragment>
  );
}
```

### 404

- Ruta que se va a renderizar cuando ninguna otra coincida con la dirección del navegador.
- Creamos el archivo src/components/NotFound.js
- En src/components/App.js creamos una ruta sin path y sin exact, solo con el component={NotFound}
- Se recomienda como última ruta
  **_src/components/App.js_**

```
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/badges/" component={Badges} />
          <Route exact path="/badges/new" component={BadgeNew} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
```

## Componentes y su ciclo de vida

Cuando React renderiza los componentes decimos que entran en escena, cuando su estado cambia o recibe unos props diferentes se actualizan y cuando cambiamos de página se dice que se desmontan.

**_Montaje:_**

- Representa el momento donde se inserta el código del componente en el DOM.
- Se llaman tres métodos: constructor, render, componentDidMount.
- **_constructor:_** El método constructor es el lugar mas idoneo para inicializar el state o para inicializar valores.
- El constructor recibe props y estos props los tenemos que inicializar para la super clase Component

```
constructor(props){
	super(props);
	...

}
```

- **_render:_** Es el momento en que React intruduce el componente en el código
- **_componentDidMount:_** Es una señal que se dispara cuando el componente ya es visible en el DOM

**_Actualización:_**

- Ocurre cuando los props o el estado del componente cambian, el componente vuelve a renderizarse.
- Se llaman dos métodos: render, componentDidUpdate.
- componentDidUpdate recibe dos argumentos: los props y el state que tenia anteriormente, en caso que se requiera comparar contra la versión actual.

**_Desmontaje:_**

- Nos da la oportunidad de hacer limpieza de nuestro componente.
- Se llama un método: componentWillUnmount
- Es el lugar perfecto para limpiar memoria, cancelar timeout, setintervals.

### Práctica del ciclo de vida

- En src/pages/Badges.js vamos a crear el método constructor y componentDidMount. Dentro de cada método insertamos un console.log que nos permita identificar en que momento se ejecuta cada método.

src/pages/Badges.js

```
  constructor(props){
    super(props)
    console.log('1. constructor()')
  }

  componentDidMount(){
    console.log('3. componentDidMount()');
  }

  render() {
    console.log('2. render()');
    .
    .
    .
```

console.log

```
1. constructor()
2. render()
3. componentDidMount()

```

- Inicializamos state vacio en el constructror de src/pages/Badges.js
- Vamos a simular que los datos se actualizan con el método componentDidMount(), para ello configuramos un setTimeout que carge los valores del state cuando se ejecute el método.

```
  componentDidMount() {
    console.log("3. componentDidMount()");

    setTimeout(() => {
      this.setState({
        data: [
          {
            id: "0101",
            firstName: "Richard",
            lastName: "Stallman",
            jobTitle: "Activist and programmer",
            email: "no.more.microsoft@gmail.com",
            twitter: "rstallman"
          },
        ]
      });
    }, 3000);
  }
```

Cómo el estado cambia se vuelve a renderizar los componentes y se llama el método componentDidUpdate el cual recibe dos argumentos, el primero es los props que teniamos antes y el segundo es el state que teniamos antes. Esto es util si deseamos comparar los valores que teniamos antes versus los actuales.

```
  componentDidUpdate(prevProps, prevState) {
    console.log("5. componentDidUpdate()");

    console.log({
      prevProps: prevProps, prevState: prevState
    })

    console.log({
      props: this.props, state: this.state
    })

  }

```

ComponentWillUnmount() se llama justo antes de que se salga el componente del DOM. Para ello vamos a cambiar de página y revisar en consola que el método se ejecutó.

```
  componentWillUnmount(){
    console.log("6. componentWillUnmount()")
  }

```

**_output final_**

```
1. constructor()
2/4. render()
3. componentDidMount()
2/4. render()
5. componentDidUpdate()
{prevProps: {…}, prevState: {…}}
{props: {…}, state: {…}}
6. componentWillUnmount()
```

Nota: Se debe tener atención cuando los componentes son desmontados y hay pendiente funcionas asincronas que ejecutan un cambio en el state o props, ya que esto puede causar perdida de memoria. En el caso del setTimeout este retorna un Id al ser declarado, este Id lo podemos usar en un clearTimeout() ejecutado en el método componentWillUnmount(), para limpiar de la memoria la función que estaba pendiente de retorno antes de desmontar el componente .

En caso de que el componente se desmonte luego de haber ejectuado el todas las funciones asincronas, no se generea error al ejecutar el clearTimeout ya que este Id ya expiró.

```
  componentDidMount() {
    console.log("3. componentDidMount()");

    this.timeoutId = setTimeout(() => {
      this.setState({
        data: [...]
      });
    }, 3000);

  }

   componentWillUnmount(){
    console.log("6. componentWillUnmount()")
    clearTimeout(this.timeoutId)
  }
```

## Llamadas a un API

### Introducción

Las llamadas a una API siguen un patrón similar siempre que las hacemos, cada llamada consta de tres estados:

- Loading: cuando la petición se envía y estamos esperando.
- Error: se debe dejar un mensaje para el usuario para arreglar el error o volver a intentarlo.
- Data: los datos nos pueden llegar de dos formas, o un objeto vacio o con los datos requeridos.

### Traer datos de una API

Una llamada a una API es un proceso asíncrono, es decir que lo comenzamos pero no sabemos cuándo acabará. Por lo mismo la función a escribir debe ser asíncrona.
La llamada se hará usando fetch que es una función de React que al pasarle una dirección de internet, hará una petición GET y lo que sea que exista ahí será devuelto.

Antes de que el request sea resuelto puede generar un error la funcion map, ya que trata de mapear una variable que no está definida, para ello se debe inicicializar vacia en el constructor

```
import React from "react";
import Item from "../components/Item";

class Home extends React.Component {
  state = {
    data: { results: [] }
  };

  componentDidMount() {
    this.getCharacters();
  }

  async getCharacters() {
    const response = await fetch("https://rickandmortyapi.com/api/character/");
    const data = await response.json();

    this.setState({ data: data });
  }

  render() {
    return (
      <div className="container">
        <ul className="character__list">
          {this.state.data.results.map(character => (
            <li key={character.id}>
              <Item character={character} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;

```

La experiencia de usuario de la UI se puede mejorar, siempre que hay una petición no solamente hay un estado, tambien está el loading que indica que esta buscando los datos y además es posible que se retorne un error, por ello al state se le pueden añadir dos valores más, loading y error.

Cuando nuestra aplicación comienza, empieza buscando los datos para ello inicializamos loading en true y como no comenzamos con error este lo inicializamos null.

```
state = {
    loading: true,
    error: null,
    data: { results: [] }
  };

```

ahora al ejecutar el método que realiza el request debemos volver a inicializar los valores loading y error del state.

Como el fetch puede ser exitoso o por el contrario puede retornar un error, se debe usar try y catch que lo que hacen es intentar hacer la petición o en su defecto capturar el error.

Al finalizar la petición sea exitosa o falsa debemos modificar el valor de loading a false

```
async getCharacters() {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(
        "https://rickandmortyapi.com/api/character/"
      );
      const data = await response.json();
      this.setState({
        loading: false,
        data: data
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  }
```

Si el valor de loading es true renderizamos un loader para mejorar la experiencia de usuario mientras termina de ejecutarse el request

```
return (
      <div className="container">
        <div className="">
          <ul className="list-inline d-flex justify-content-around flex-wrap">
            {this.state.data.results.map(character => (
              <li className="list-inline-item" key={character.id}>
                <Item character={character} />
              </li>
            ))}
          </ul>
        </div>

        {this.state.loading && <Loader />}
      </div>
    );
```

Si error esta definido vamos a retornar el mensaje del error.

```
render() {
    if (this.state.error) {
      return `Error ${this.state.error.message}`;
    }
    return (...)
    }
```

- Para concatenar el próximo request a la respuesta actual renderizada, vamos a introducir un boton el cual solo puede ser presentado cuando no este loading la aplicación.

- Este boton en el evento onClick va a llamar al método para obtener más datos de la API

```
{!this.state.loading && (
  <div className="row mb-5">
    <div className="col text-center">
      <button
        className="btn btn-primary"
        onClick={() => this.getCharacters()}
      >
        Load More
      </button>
    </div>
  </div>
)}

```

- En el state configuramos una variable nextPage inicializada en 1 y pasamos este valor a la URL del fetch

```
constructor(props) {
    super(props);
    this.state = {
      nextPage: 1,
      loading: true,
      error: null,
      data: { results: [] }
    };
  }
```

- Cada vez que se ejecuta el método que obtiene información de la API incrementamos en 1 el valor de nextPage

- Ahora para conservar los datos actuales mas los nuevos concatenamos el state actual con los datos nuevos.

```

try {
     const response = await fetch(
       `https://rickandmortyapi.com/api/character/?page=${this.state.nextPage}`
     );
     const data = await response.json();
     this.setState({
       loading: false,
       data: {
         results: [].concat(
           this.state.data.results,
           data.results
         )
       },
       nextPage: this.state.nextPage +1
     });
   }
```

### Solicitando datos (GET)

Inicializar el state en el constructor de la forma:
data: undefined (Aun no hay datos)
loading: true (En espera de la respuesta del request)
error: null (aun no hay error)

```
  constructor(props) {
   super(props);

   this.state = {
     loading: true,
     data: undefined,
     error: null
   };
 }
```

el primer paso es manejar el estado donde loading sea true

```
render() {

   if(this.state.loading){
     return "Loading..."
   }
   ...
}
```

El mejor lugar para comezar una petición a una API es el componentDidMount(), eso nos asegura que el código del componente ya esta listo.

Lo primero que vamos a hacer en el método que realiza la petición a la API es declarar nuevamente el estado con loading true y el error null, ya que es posible que el método se vuelva a llamar , en cuyo caso debemos volver a cargar el loading y si hay error hay que cancelarlo.

El segundo paso es hacer la llamada a la API mediante un try catch

Tanto en el try como en el catch debemos suspender el loading por tanto le asignamos false.

En el try inicializamos los valores de data y en catch capturamos el error y lo pasamos al estado.

**_Preparando el entorno de la llamada_**

```
componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({ loading: true, error: null });
    try {
      const data = [];
      this.setState({ loading:false, data: data });
    } catch (error) {
      this.setState({ loading:false, error: error });
    }
  }
```

Nota: Para este ejercicio se va a hacer una peticion a una fake API provista por la dependencia de desarrollo **_json-server_** el cual consulta un archivo en este caso ubicado en server/db.json

Las llamadas a una API son asincronas y retornan una promesa por lo tanto en método debe ser asincrono (async) y esperamos la promesa con await

**_Pasando el método a asincrono_**

```
  async fetchData() {
    this.setState({ loading: true, error: null });
    try {
      const data = await api.badges.list();
      this.setState({ loading:false, data: data });
    } catch (error) {
      this.setState({ loading:false, error: error });
    }
  }
```

**_Simulando el caso cuando la data esta vacia_**

En caso que la data llegue vacia de la api se debe tener una contingencia para esta situación.

src/api.js

```
const api = {
  badges: {
    list() {
       return [];
    },
    ...
  }
}

```

src/components/BadgesList.js

```
class BadgesList extends React.Component {
  render() {
    if(this.props.badges.length === 0){
      return (
        <div>
          <h5 className="alert alert-secondary text-center">Data not found</h5>
        </div>
      )
    }

    return (...)
}
}
```

**_Simulando el caso cuando hay un error_**

src/api.js

```
const api = {
  badges: {
    list() {
           throw new Error("Not Found");
    },
    ...
  }
}
```

src/pages/Badges.js

```
  render() {
    if (this.state.loading) {
      return "Loading...";
    }

    if(this.state.error){
      return (
        <div className="alert alert-danger">
          {`Error: ${this.state.error.message}`}
        </div>
      )
    }

    return (...)
  }
```

**_Valores por defecto en props_**

src/pages/BadgeNew.js

```
<Badge
	firstName={this.state.form.firstName || "First_name"}
	lastName={this.state.form.lastName || "Last_name"}
	jobTitle={this.state.form.jobTitle || "Job_title"}
	twitter={this.state.form.twitter || "twitter"}
	mail={this.state.form.mail || "email"}
	avatarUrl="https://2.gravatar.com/avatar/b9c674ca7541ea962e68107fbc6cb335?s=400&d=mm"
/>
```

**_Tip: Gravata_**
Los avatares de gravatar se llama a través de codificar el email con md5 e insertarlo en la url siguiente

```
// cosmosoft.soluciones@gmail.com
//b9c674ca7541ea962e68107fbc6cb335

https://2.gravatar.com/avatar/insertar_aca?s=400&d=mm

//resultado
https://2.gravatar.com/avatar/b9c674ca7541ea962e68107fbc6cb335?s=400&d=mm
```

para instalar md5 en el proyecto

```
npm install md5
```

Crear el componente Gravatar.js. Este componente va a renderizar el gravatar y para ello se pasa por props el email para codificarlo con md5 para obtener su hash. Para ello debemos importar la libreria md5 después de instalada.

src/components/Gravatar.js

```
import React from "react";
import md5 from "md5";

function Gravatar(props) {
  const email = props.email;
  const hash = md5(email);
  return (
    <img
      className={props.className}
      src={`https://2.gravatar.com/avatar/${hash}?s=400&d=identicon`}
      alt="Avatar"
    />
  );
}

export default Gravatar;

```

src/components/Badge.js

```
<Gravatar className="Badge__avatar" email={this.props.email}/>
```

## Enviando datos (POST)

- Configurando el evento onSubmit en src/pages/BadgeNew
- Pasando el método por props.onSubmit desde src/pages/BadgeNew a src/components/BadgeForm
- importar src/api.js para seguir simulando un API
- Enviar los datos almacenados en this.state.form

## Manejando los estados de la petición durante el POST

De la misma manera en la que se manejan los estados cuando se solicitan datos, deben ser manejados cuando los datos son enviados.

Existe un tiempo entre el clic del boton submit y el envio de los datos. Ese tiempo de espera es necesario visualizarlo. Igual hay que mostrar mensajes de error cuando no funcionan las cosas.

Inicializamos loading en el state como false, ya que cuando llegamos a la página (En este caso BadgeNew.js) no estamos esperando alguna petición o respuesta. Error lo inicilizamos en null

importamos src/components/PageLoading. En caso de encender el loading (true) presentamos el componente PageLoading, en lugar de presentar el formulario

Se debe configurar el caso de cuando se genera un error. Para eso lo vamos a pasar por props desde BadgeNew.js a BadgeForm y si existe los mostramos dentro del del formulario.

En el caso de que todo salga bien queremos redirigir al usuario a Badges.js, Para ello Route recibe tres props match, history y location en este caso vamos utilizar history

src/pages/BadgeNew.js

```
import React from "react";
import "./styles/BadgeNew.css";
import header from "../images/platziconf-logo.svg";
import Badge from "../components/Badge";
import BadgeForm from "../components/BadgeForm";
import PageLoading from "../components/PageLoading";
import api from "../api";

class BadgeNew extends React.Component {
  state = {
    form: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      email: "",
      twitter: "",
      avatarUrl: ""
    }
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, error: null });

    try {
      await api.badges.create(this.state.form);
      this.setState({ loading: false });
      this.props.history.push('/badges')
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }

    return (
      <React.Fragment>
        <div className="BadgeNew__hero">
          <img
            className="BadgeNew__hero-image img-fluid"
            src={header}
            alt="logo"
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge
                firstName={this.state.form.firstName || "First_name"}
                lastName={this.state.form.lastName || "Last_name"}
                jobTitle={this.state.form.jobTitle || "Job_title"}
                twitter={this.state.form.twitter || "twitter"}
                email={this.state.form.email || "email"}
              />
            </div>
            <div className="col-6">
              <BadgeForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.form}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default BadgeNew;

```

## Actualizando datos (PUT)

- Crear la página BadgeEdit.js a partir de duplicar BadgeNew.js y modificar todos los llamados a BadgeNew incluido hoja de estilos y nombre de estilos.

- En App.js vamos a crear la ruta que dirige a BadgeEdit.js para ello debemos tener encuenta que vamos a pasar una variable por la url que identifica al Badge que vamos a editar.

```
<Route exact path="/badges/:badgeId/edit" component={BadgeEdit} />
```

\*\* En la lista de Badges.js hacer que cada tarjeta redireccione a BadgeEdit con un id valido. para ello en BadgesList.js en la seccion donde se mapea la lista, encapsulamos cada tarjeta en un Link que dirija `/badges/${badge.id}/edit`

```
return (
            <li key={badge.id}>
              <Link className="text-reset text-decoration-none" to={`/badges/${badge.id}/edit`}>
                <BadgesListItem badge={badge} />
              </Link>
            </li>
          );
```

- Al hacer click en un badge nos envia a BadgeEdit.js, ahora se debe hacer una petición a la API para que nos retorne los datos del badge.

- Como vamos a arrancar con una peticion iniciamos loading en true.

- La petición la hacemos cuando el componentDidMount ocurra.

- Para el fetchData vamos a usar el método read del archivo api.js que simula nuestra API. Este método recibe el Id del badge que vamos a consultar. El Id se encuentra en la URL, para poder leerlo utilizamos match que es uno de los props que le pasa Route al component.

- Cada una de las variables que se inserta en el path la podemos leer a través del objeto params.

- Si la petición es exitosa detenemos el loading con false y guardamos la respuesta en form que es donde se almacena los datos del formulario.

**_src/pages/BadgeEdit.js_**

```
 componentDidMount() {
    this.fetchData();
  }

  fetchData = async e => {
    this.setState({ loading: true, error: null });
    try {
      const data = await api.badges.read(this.props.match.params.badgeId);

      this.setState({ loading: false, form: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };
```

Nota: se va a hacer refactoring de BadgeForm.js ya que el título esta hardcodeado como New y en este caso es un Edit y el componente debe ser reutilizado para ambos casos.

- Configurar el submit de BadgeEdit.js para que realice la actualización de los datos. Cambiamos el método create por update de api.js el cual recibe dos parametros el badgeId y la información a actualizar.

**_src/pages/BadgeEdit.js_**

```
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, error: null });

    try {
      await api.badges.update(this.props.match.params.badgeId,this.state.form);
      this.setState({ loading: false });
      this.props.history.push("/badges");
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };
```

## Actualizaciones automáticas

Existen varias formas de hacer que la informacion se actualice automáticamente como el uso de web sockets pero a nivel desarrollo es un gran trabajo para el tamaño del proyecto asi que se va a usar polling.

Polling consiste en que cada cierto tiempo que es definido por nosotros se buscan los datos y se actualizan automáticamente. Esto se hará constantemente hasta que el usuario se vaya de la página.

**_src/pages/Badges.js_**

```
componentDidMount() {
    this.fetchData();

    setInterval(()=> this.fetchData(), 5000);

  }

```

Para que no se bloquee la página con el componente del loading con cada petición para actualizar la información, se condiciona el PageLoading a cuando este sea true y los datos no esten definidos.

```
 if (this.state.loading && !this.state.data) {
      return <PageLoading />;
    }
```

Para mejorar la UI se inserta un miniloader que indique que se están actualizando los datos.

```
<div className="Badges__list">
 <div className="Badges__container">
   <BadgesList badges={this.state.data} />
   {this.state.loading && <MiniLoader />}
 </div>
</div>
```

Cómo se configuró un setInterval este se debe cancelar cuando la página cambie para evitar errores, para ello se inicializar la llave del setInterval y cancelarla en el componentWillUnmount

```
componentDidMount() {
   this.fetchData();
   this.intervalId = setInterval(() => this.fetchData(), 5000);
 }

 componentWillUnmount() {
   clearInterval(this.intervalId);
 }
```

## Los detalles de un Badge

- Un CRUD permite crear, editar, listar, actualizar o borrar recursos.
- Insertar la ruta al componente BadgeDetails.js en App.js
- Crear la página BadgeDetail.js que va permitir consultar el detalle de cada Badge
- Utilizar el método read() de api.js y obtener la variable badgeId de la url
- para evitar escribir this.state.data cada vez que llamamos una de sus variables, instanciamos una variable en la clase con la data

```
 import React from "react";
import {Link} from "react-router-dom";
import "./styles/BadgeDetails.css";
import confLogo from "../images/platziconf-logo.svg";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import Badge from "../components/Badge";
import api from "../api";
class BadgeDetails extends React.Component {
	  state = {
	    loading: true,
	    error: null,
	    data: undefined
	  };

	  componentDidMount() {
	    this.fetchData();
	  }

	  fetchData = async e => {
	    this.setState({ loading: true, error: null });
	    try {
	      const data = await api.badges.read(this.props.match.params.badgeId);
	      this.setState({ loading: false, data: data });
	    } catch (error) {
	      this.setState({ loading: false, error: error });
	    }
	  };

	  render() {
	    if (this.state.loading) {
	      return <PageLoading />;
	    }
	    if (this.state.error) {
	      return <PageError error={this.state.error} />;
	    }

	    const badge = this.state.data;
	    return (
	      <div>
		<div className="BadgeDetails__hero">
		  <div className="container">
		    <div className="row">
		      <div className="col-6">
		        <img src={confLogo} alt="Logo de la conferencia" />
		      </div>
		      <div className="col-6 BadgeDetails__hero-attendant-name">
		        <h1>
		          {badge.firstName} {badge.lastName}
		        </h1>
		      </div>
		    </div>
		  </div>
		</div>
		<div className="container">
		  <div className="row">
		    <div className="col">
		      <Badge
		        firstName={badge.firstName}
		        lastName={badge.lastName}
		        jobTitle={badge.jobTitle}
		        twitter={badge.twitter}
		        email={badge.email}
		      />
		    </div>
		    <div className="col">
		        <h2>Actions</h2>
		        <div>
		            <div>
		                <Link className="btn btn-primary mb-4" to={`/badges/${badge.id}/edit`}>Edit</Link>
		            </div>
		            <div>
		                <button className="btn btn-danger">Delete</button>
		            </div>
		        </div>
		    </div>
		  </div>
		</div>
	      </div>
	    );
 	}
}
export default BadgeDetails;
```

## UI Components y Container Components - (División de responsabilidades)

En la programación es bueno separar las tareas en diferentes funciones y en React sucede lo mismo. Cuando un componente hace demasiado, probablemente es mejor dividirlo en dos.

Esta técnica de componentes presentacionales y componentes container es común, útil y hace parte de las buenas prácticas.

**_src/components/App.js_**

```
import BadgeDetails from "../pages/BadgeDetailsContainer";
```

Separando la componentes contenedores (lógica y manejo de datos) y componentes presentacionales

**_src/pages/BadgeDetails.js_**

```
import React from 'react';
import {Link} from "react-router-dom";
import "./styles/BadgeDetails.css";
import confLogo from "../images/platziconf-logo.svg";
import Badge from "../components/Badge";

function BadgeDetails(props){
   const badge = props.badge;
   return(
       <div>
       <div className="BadgeDetails__hero">
         <div className="container">
           <div className="row">
             <div className="col-6">
               <img src={confLogo} alt="Logo de la conferencia" />
             </div>
             <div className="col-6 BadgeDetails__hero-attendant-name">
               <h1>
                 {badge.firstName} {badge.lastName}
               </h1>
             </div>
           </div>
         </div>
       </div>
       <div className="container">
         <div className="row">
           <div className="col">
             <Badge
               firstName={badge.firstName}
               lastName={badge.lastName}
               jobTitle={badge.jobTitle}
               twitter={badge.twitter}
               email={badge.email}
             />
           </div>
           <div className="col">
               <h2>Actions</h2>
               <div>
                   <div>
                       <Link className="btn btn-primary mb-4" to={`/badges/${badge.id}/edit`}>Edit</Link>
                   </div>
                   <div>
                       <button className="btn btn-danger">Delete</button>
                   </div>
               </div>
           </div>
         </div>
       </div>
     </div>
   )
}

export default BadgeDetails;
```

**_src/pages/BadgeDetailsContainer.js_**

```
import React from "react";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import BadgeDetails from './BadgeDetails'

import api from "../api";

class BadgeDetailsContainer extends React.Component {
 state = {
   loading: true,
   error: null,
   data: undefined
 };

 componentDidMount() {
   this.fetchData();
 }

 fetchData = async e => {
   this.setState({ loading: true, error: null });
   try {
     const data = await api.badges.read(this.props.match.params.badgeId);
     this.setState({ loading: false, data: data });
   } catch (error) {
     this.setState({ loading: false, error: error });
   }
 };

 render() {
   if (this.state.loading) {
     return <PageLoading />;
   }
   if (this.state.error) {
     return <PageError error={this.state.error} />;
   }

   return (
     <BadgeDetails badge={this.state.data}/>
   );
 }
}

export default BadgeDetailsContainer;

```

## Portales

Hay momentos en los que queremos renderizar un modal, un tooltip, etc. Esto puede volverse algo complicado ya sea por la presencia de un z-index o un overflow hidden.

En estos casos lo ideal será renderizar en un nodo completamente aparte y para esto React tiene una herramienta llamada Portales que funcionan parecido a ReactDOM.render; se les dice qué se desea renderizar y dónde, con la diferencia de que ese dónde puede ser fuera de la aplicación.

- Para crear portales se utiliza ReactDOM.createPortal() para poder utilizarlo se requiere importar ReactDOM

- createPortal() Recibe dos argumentos el "que" queremos renderizar el "donde" queremos renderizarlo

- Para hacer modales vamos a crear un nuevo nodo en el public/index.html con el id="modal"

- Podemos crear un portal que renderice en este nodo cuando sea requerido.

```
import ReactDOM from 'react-dom';

ReactDOM.createPortal(<h1>Ejemplo</h1>, document.getElementById('modal'))
```

## Modales

- crear el archivo src/components/Modal.js
- El modal es un componente que debemos controlar, se debe poder abrir y cerrar. Para esto enviamos un props isOpen=true para abrir o false para cerrar basado en el patron de diseño Singleton.

src/components/BadgeDetails.js

```
<Modal isOpen={true}/>
```

src/components/Modal.js

```
function Modal(props) {
  if(!props.isOpen){
    return null;
  }
  return ReactDOM.createPortal(
    <h1>Ejemplo</h1>,
    document.getElementById("modal")
  );
}
```

- Dentro del Modal hay contenido y eso depende de lo que vaya a hacer el modal, el contenido del modal va a venir de props.children
- La técnica de usar componentes genéricos para crear uno nuevo especializado se llama composición y es una herramienta que todo buen programador debe saber utilizar.

**_Pasando childrens desde src/page/BadgeDetails.js_**

```
<Modal isOpen={true}>Lorem ipsum</Modal>
```

**_Modal.js_**

```
return ReactDOM.createPortal(
    <div className="Modal">
      <div className="Modal__container">
        <button className="Modal__close-button">
          X
        </button>
        {props.children}
      </div>
    </div>,
    document.getElementById("modal")
  );

```

- Para configurar Modal.js en el evento onClick del boton close para cerrarlo se recibe por props onClose viene de BadgeDetails.js
- BadgeDetails.js es un componente funcional y no maneja estado, el estado lo maneja el contenedor por el ende BadgeDetailsContainer.js le pasa por props el estado a BadgeDetails.js que a su vez se lo pasa a Modal.js

- Desde BadgeDetailsContainer.js inicializamos en el `state modalIsOpen: false`
- Desde BadgeDetailsContainer.js creamos los métodos que abren y cierran el modal

```
  handleOpenModal = (e) => {
    this.setState({ modalIsOpen: true });
  }

  handleCloseModal = (e) => {
    this.setState({ modalIsOpen: false });
  }
```

- Desde Modal.js el boton de cerrar se configura el evento `onClick={props.onClose}`
- Desde BadgeDetails.js pasamos por props al modal:

```
<Modal isOpen={true} onClose={props.onCloseModal}>Lorem ipsum</Modal>
```

- Desde BadgeDetailsContainer pasamos por props a BadgeDetails el médodo handleCloseModal, handleOpenModal y el state modalIsOpen

**_BadgeDetailsContainer_**

```
return (
      <BadgeDetails
        badge={this.state.data}
        onOpenModal={this.handleOpenModal}
        onCloseModal={this.handleCloseModal}
        modalIsOpen={this.state.modalIsOpen}
      />
    );
```

En BadgeDetail.js pasamos al evento onClick del boton delete el prop onOpenModal para que abra el modal y pasamos al modal por el prop isOpen el estado modalIsOpen para controlar si se debe abrir o cerrar el modal.

**_BadgeDetail.js_**

```
<div>
        <button onClick={props.onOpenModal} className="btn btn-danger">
          Delete
        </button>
        <Modal isOpen={props.modalIsOpen} onClose={props.onCloseModal}>
          Lorem ipsum
        </Modal>
</div>
```

Hasta esta parte tenemos configurado el comportamiento del modal Genérico

### Especializando el modal

- Crear src/components/DeleteBadgeModal y reemplazamos en BadgeDetail.js Modal por el nuevo componente.

\*\*\*src/components/DeleteBadgeModal.js

```
import React from "react";
import Modal from "./Modal";

function DeleteBadgeModal(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="DeleteBadgeModal">
        <h1>Are your sure?</h1>
        <p>You are about to delete this badge.</p>
        <div>
          <button onClick={props.onDeleteBadge} className="btn btn-danger mr-4">Delete</button>
          <button onClick={props.onClose} className="btn btn-primary">Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteBadgeModal;

```

## HOOKS

Las funciones no tienen un estado propio que manejar como ciclos de vida a los que deben suscribirse, mientras tanto las clases sí cuentan con ello.

React tiene un feature llamado Hooks que permite que las funciones también tengan features que solamente tienen las clases.

Hooks: Permiten a los componentes funcionales tener características que solo las clases tienen:

- useState: Para manejo de estado.
- useEffect: Para suscribir el componente a su ciclo de vida.
- useReducer: Ejecutar un efecto basado en una acción.

**_Custom Hooks:_** Usamos los hooks fundamentales para crear nuevos hooks custom. Estos hooks irán en su propia función y su nombre comenzará con la palabra use. Otra de sus características es que no pueden ser ejecutados condicionalmente (if).

- useState regresa un arreglo de dos argumentos.
- En la primer posición del arreglo viene una variable
- En la segunda posición del arreglo viene el método que setea la variable. Este inicia como set + el nombre de la variable
- El estado lo podemos inicializar a través del argumento que recibe React.useState()

```
const [count, setCount] = React.useState(0);
```

**_Ejemplo_**

- Creando un un boton que permita incrementar el contador

```
<button
	  onClick={() => {
	    setCount(count +1 )
	  }}
	  className="btn btn-primary mb-4"
	>
	  Increase Count: {count}
</button>
```

### Creando un custom hook

- Normalmente, las variables “desaparecen” cuando se sale de la función, pero las variables de estado son conservadas por React

- El único argumento para el Hook useState() es el estado inicial. Al contrario que en las clases, el estado no tiene porque ser un objeto. Podemos usar números o strings si es todo lo que necesitamos

- El estado solamente se crea la primera vez que nuestro componente se renderiza. Durante los siguientes renderizados, useState nos da el estado actual.

Este custom hook de ejemplo va permitir incrementar el contador hasta el numero maximo que pasemos por parametro y se reinicia

**_Custom Hook_**

```
function useIncreaseCount(max){
  const [count, setCount] =  React.useState(0);

  if(count > max){
    setCount(0)
  }
  return [count, setCount];
}
```

**_hook useState()_**

```
function BadgeDetails(props) {
  const [count, setCount] = useIncreaseCount(4)
  .
  .
  .
	<button
	  onClick={() => {
	    setCount(count +1 )
	  }}
	  className="btn btn-primary mb-4"
	>
	  Increase Count: {count}
	</button>
}
```

Como ya vimos los hooks los utilizamos para darle estado a un componente funcional.

Viendo el ejemplo de la clase me quedó la duda del customHook que se creó ya que este pareciera que inicializa la variable cada vez que se ejecuta lo que debería dar siempre cero para este caso. Revisando la documentación oficial de React me parece importante las siguientes notas:

Normalmente, las variables “desaparecen” cuando se sale de la función, pero las variables de estado son conservadas por React

El único argumento para el Hook useState() es el estado inicial. Al contrario que en las clases, el estado no tiene porque ser un objeto. Podemos usar números o strings si es todo lo que necesitamos

El estado solamente se crea la primera vez que nuestro componente se renderiza. Durante los siguientes renderizados, useState nos da el estado actual.

##Search Filter

- Crear un customHook que permita localizar por nombre o apellido el badge de un usuario
- El search filter se va a implementar en el archivo src/components/BadgesList.js
- Para poder usar hooks debemos convertir este componente de clase en una de función
- Insertar un input tipo text para realizar la busqueda de los badges.
- Convertir el input en un campo controlado. Para esto usamos el hook useState() para inicializar la variable query del estado ademas del método que la actualiza.

```
const [query, setQuery] = React.useState("");

<input
  type="text"
  className="form-control w-100"
  value={query}
  onChange={(e)=>{setQuery(e.target.value)}}
/>
```

- Para realizar el filtrado se requiere el listado de los badges y el query
- El listado filtrado lo vamos a almacenar en la variable filteredBadges
- Utilizando la funcion includes() vamos buscar el query cualquier parte de los badges y retornamos lo que sea true y rechazamos lo que sea false

**_Buscando en el primer nombre_**

```
const badges = props.badges;
  const [query, setQuery] = React.useState("");
  const filteredBadges = badges.filter((badge)=>{
    return badge.firstName.includes(query);
  })
```

**_Buscando en el nombre y apellido_**

```
const filteredBadges = badges.filter(badge => {
    return `${badge.firstName} ${badge.lastName}`.includes(query);
  });
```

- Ahora para desplegar la lista de badges no lo hacemos desde la variable badges sino desde la variable filteredBadges.
- Reemplazar el uso de la variable de badges en el despliegue de la lista por la nueva variable filteredBadges.

- Si creamos solamente el input encima de la lista y realizamos una busqueda que retorne null entonces el input de busqueda desaparecerá, por eso lo convertimos en un componente y lo llamamos desde el despliegue de lista o desde el despliegue cuando retorna vacio.

**_src/components/SearchFilterInput_**

```
import React from "react";

export default function SearchFilterInput(props) {
  return (
    <div className="form-group">
      <label>Filter Badges</label>
      <input
        autoFocus
        type="text"
        className="form-control w-100"
        value={props.value}
        onChange={e => {
          props.onChange(e.target.value);
        }}
      />
    </div>
  );
}

```

**_Pasandole los props_**

```
<SearchFilterInput value={query} onChange={setQuery} />
```

- Se debe tener encuenta que las busquedas son case sensitive por tal motivo debemos convertir tanto los valores de los badges a minusculas asi como las entradas al input de busqueda y comparar (Normalizar).

```
const filteredBadges = badges.filter(badge => {
    return `${badge.firstName} ${badge.lastName}`.toLowerCase().includes(query.toLowerCase());
  });
```

### useMemo()

- Aunque ya esta funcionando el search filter es un calculo costoso para el caso de miles de registros
- Utilizando el hook de React useMemo() permite pasarle una funcion y unos argumentos
- La primera vez que recibe los argumentos ejecuta la funcion y regresa los resultados los cuales son almacenados
- La segunda vez que se ejecuta si los argumentos son los mismos ya estan memorizados y los regresa sin volver a calcular la función
- El primer argumento de useMemo() es la función
- El segundo argumento de useMemo() es una lista. Estos son los argumentos que siempre que sean iguales si la constestación esta memorizada, regresa de inmediato la contestación sino la calcula por primera vez
- El resultado de la funcion que le pasamos a useMemo debe guadarse en lugar que permita utilizarlo fuera de él para ello convertimos el resultado de useMemo en un estado.
- Para este caso este estado lo inicializamos con la lista de los badges.
- El resultado de la funcion que pasamos por useMemo lo almacenamos en el estado a través del método que lo actualiza

```
import React from "react";
import BadgesListItem from "./BadgeListItem";
import SearchFilterInput from "./SearchFilterInput";
import { Link } from "react-router-dom";

function BadgesList(props) {
  const badges = props.badges;
  const [query, setQuery] = React.useState("");

  const [filteredBadges, setFilteredBadges] = React.useState(badges);

  React.useMemo(() => {
    const result = badges.filter(badge => {
      return `${badge.firstName} ${badge.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });

    setFilteredBadges(result);
  }, [badges, query]);

  if (filteredBadges.length === 0) {
    return (
      <React.Fragment>
        <SearchFilterInput value={query} onChange={setQuery} />
        <div>
          <h5 className="alert alert-secondary text-center">Data not found</h5>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className="BadgesList">
      <SearchFilterInput value={query} onChange={setQuery} />

      <ul className="list-unstyled">
        {filteredBadges.map(badge => {
          return (
            <li key={badge.id}>
              <Link
                className="text-reset text-decoration-none"
                to={`/badges/${badge.id}`}
              >
                <BadgesListItem badge={badge} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BadgesList;

```

**_Ultimo paso empaquetar en un customhook_**

```
import React from "react";
import BadgesListItem from "./BadgeListItem";
import SearchFilterInput from "./SearchFilterInput";
import { Link } from "react-router-dom";

function useSearchBadges(badges) {
  const [query, setQuery] = React.useState("");

  const [filteredBadges, setFilteredBadges] = React.useState(badges);

  React.useMemo(() => {
    const result = badges.filter(badge => {
      return `${badge.firstName} ${badge.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });

    setFilteredBadges(result);
  }, [badges, query]);

  return { query, setQuery, filteredBadges };
}

function BadgesList(props) {
  const badges = props.badges;

  const { query, setQuery, filteredBadges } = useSearchBadges(badges);

  if (filteredBadges.length === 0) {
    return (
      <React.Fragment>
        <SearchFilterInput value={query} onChange={setQuery} />
        <div>
          <h5 className="alert alert-secondary text-center">Data not found</h5>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className="BadgesList">
      <SearchFilterInput value={query} onChange={setQuery} />

      <ul className="list-unstyled">
        {filteredBadges.map(badge => {
          return (
            <li key={badge.id}>
              <Link
                className="text-reset text-decoration-none"
                to={`/badges/${badge.id}`}
              >
                <BadgesListItem badge={badge} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BadgesList;

```
