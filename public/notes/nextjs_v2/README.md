[//]: # @param group $$ NextJS
[//]: # @param title $$ NextJS v2
[//]: # @param author $$ Iván D. Sánchez


# Curso de Next.js

Consideraciones que debemos tener antes de iniciar un proyecto:

- ¿Como lo llevaremos a producción?
- ¿Es optimo el bundle?

Otra gran consideración es el **Total coast of ownership** y es cuanto le vale a la empresa el tiempo que gastas en mantener el framework que tu mism@ creaste


*Si en lo que inviertes la mayoría de tu tiempo no agrega valor  a tus usuarios, tal vez no estés enfocado en lo correcto*


El enfoque al desarrollar debe estar concentrado en brindar valor a la aplicación, brindar valor al negocio


**RESUMEN:** Next.js nos hace enfocar en el desarrollo del producto dejando de lado decisiones que no agregan este valor como ser la arquitectura de la aplicación


## Instalando NextJS

Existen dos formas para instalar Next en un proyecto, desde el cli con el comando

    npx create-next-app@latest
    # or
    yarn create next-app

O de la forma manual


  mkdir platzi-store-next
  cd platzi-store-next
  npm init -y
  npm install next react react-dom


Ahora configuramos los script del package.json

      "scripts": {
        "dev": "next",
        "build": "next build",
        "start": "next start"
      },

Next requiere para su sistema de enrutamiento la carpeta **pages**, también tiene por defecto una página 404 en caso de acceder a una ruta no existente en la carpeta *pages*

- next incorpora ***hot reloading*** y **fast refresh**

## Routing

- Routing basado en el file system, osea que depende del ordenamiento del arbol de archivos de la carpeta pages



### Rutas estáticas

Son aquellas rutas que no contienen un parámetro pasado por url

La página de home corresponde a la ubicada en "pages/index.js", se le llama página básica porque no depende de un contenido externo


*about and contact pages exampĺe*

      pages
      - about.js    // url_base/about
      - contact.js  // url_base/contact
      - index.js    // url_base


### Rutas dinámicas

Son aquellas rutas que direccionan a una página pero dependen de los parámetros que reciban

Para crear una ruta dinámica se debe anidar en una carpeta (parte estática de la ruta) un archivo de tipo [variable].js, de esta forma el nombre que le demos a la variable es como podemos capturar el parámetro

para capturar el parametro usamos el hook useRouter que viene de **next/router**

creando la ruta product/:id


      pages
      - product
        - [id].js



*/product/:id*


      import React from 'react'
      import {useRouter} from 'next/router'

      export default function Product() {
        const {query: {id}} = useRouter()
        return (
          <div>Product {id}</div>
        )
      }


## #UnderTheHood setup y páginas: optimizaciones ocultas

dev -  development enviroment
build - crea un bundle optimo para produccion
start - Sever node para produccion 


Si hacemos un build podemos ver un output la estrategia de compilacion de cada archivo en nuestro proeyecto con nextjs: 

server - SSR (uses getInitialProps or getServerSideProps)
static - No initial props
SSG  - getStaticProps

NextJS utliza code splitting para dividir el código en varios archivos permitiendo optimizar la aplicación en funcion de los archivos que varian vs los que no requieren enviarse en cada petición al servidor, tambien agrega a los archivos hash assets para el control del caché.

Al hacer code splitting solo cargamos los paquetes necesarios de la página en especifico, cuando hacemos una compilación de un solo bundle estamos enviando código innesario en cada página que visitamos.

En algunas páginas vamos a ver que tenemos paquetes que son reusables pero hay ciertos chunks que corresponden a cada página en específico.


Para poder ver el comportamiento de estas estrategias de optimización podemos correr el build con npm run start y vemos el network

## #UnderTheHood páginas: pre rendering de páginas

Pre-rendering -> Next.js crea el HTML por cada pagina lo cual resulta mejor para el SEO. Adicionalmente hay que saber que existen dos métodos de Pre-rendering
1. Static Generation (Recomendado por Next.js) -> El HTML es generado en build time y es reutilizable para cada petición
2. Server-side Rendering: El HTML es generado en cada petición

## Enlazando páginas

Existen dos tipos de enlazamiento de páginas, cuando se hace de lado del servidor que es cuando el usuario solicita a este la página a enlazar y el navegador hace una regarga mientras recibe los archivos requeridos, y la otra forma es el SPA (Single Page App), que es cuando contamos con los chunks requeridos para navegar a través de la solución solo recargando los componentes del VDOM sin recargar la página. 

En el caso de NextJS cuenta con una característica de optimización que hace prefetching de otros componentes antes que el usuario navegue a ellos.

pre-fetching de recursos: Al hacer hover sobre un enlace este solicita al servidor los archivos o chunks requeridos y hace un prefetch de estos recursos que se necesitan, antes de cargar la página, NextJS va a intentar cargarla por debajo 

Nota: A partir de la version 10.0.3 de NexJS, cambia el comportamiento del pre-fetching ahora por default al cargar la página hace el  prefetching de cada uno de los componentes Link que se encuentre en la pagina actual al momento que esta se renderiza , No cuando se le hace hover. 

Si queremos deshabilitar este comportaminento por default y solo hacer el prefetching cuando sea un hover o en el evento onMouseEnter
simplemente debemos setear su configuracion en false

Para navegar entre página debemos importar el componente Link de 'next/link'

        
        <Link href="/about" prefetch={false } ><a> About </a></Link>


components/NavBar


    import React from 'react'
    import Link from 'next/link'

    function NavBar() {
      return (
        <nav>
          <menu>
            <Link href={"/"}><a>Home</a></Link>
            <Link href={"/about"}><a>About</a></Link>
          </menu>
        </nav>
      )
    }

    export default NavBar


## API y Debugging

### ¿Cómo crear API con NextJS?

Next permite crear API, para ello vamos a crearla como si se tratase de una página, para este caso *pages/api/avo*

*api* es una carpeta especial y siempre se debe llamar así

La forma de crear rutas es la misma que la de crear páginas

El servicio de api de next trabaja con funciones anónimas que tienen por parámetros el request y el response como se haría en una apliación de NodeJS 

como estamos trabajando con typescript debemos importar de http el tipo de dato de los parámetros de la función

*Example pages/api/avo/index.ts*


        import {IncomingMessage, ServerResponse} from "http"

        const allAvos = (request: IncomingMessage, response: ServerResponse) => {

          response.end(JSON.stringify({hello: 'world'}))

        }

        export default allAvos



*Output*


  // http://localhost:3000/api/avo

  {
    "hello": "world"
  }


Ahora vamos a usar el simulador de conexión a base de datos creado en la carpeta database/db.ts y vamos a crear una instancia de la clase para acceder a sus métodos

En esta petición vamos a retornar todo el listado de productos, del servicio que estamos consumiendo no solo vamos a devolver la data sino tambien su longitud, status code y un header que identifique que la respuesta corresponde a un application/json


*Example pages/api/avo/index.ts*


      import {IncomingMessage, ServerResponse} from "http"
      import DB from "@database"

      const allAvos = async (request: IncomingMessage, response: ServerResponse) => {
        const db = new DB()
        const allEntries = await db.getAll()
        const length = allEntries.length
        response.statusCode =  200
        response.setHeader('Content-type', 'application/json')
        response.end(JSON.stringify({data: allEntries, length}))

      }

      export default allAvos


Ahora vamos a crear una ruta dinamica para consultar el listado de productos por su id, en este caso podemos comenzar por copiar el código anterior en el nuevo archivo pages/api/avo/[id].js pero en este caso para poder acceder a los query params debemos extender el tipo de request y response desde next ya que no podemos acceder request.query usandon IncommingMessage

Como NextJS funciona con NodeJS podemos simplificar nuestro código utilizando la notación de Nodejs

*Before*

        import {NextApiRequest, NextApiResponse} from "next"
        import DB from "@database"

        const allAvos = async (request: NextApiRequest, response: NextApiResponse) => {
          const db = new DB()
          const id = request.query.id

          const entry = await db.getById(id as string)
          response.statusCode =  200
          response.setHeader('Content-type', 'application/json')
          response.end(JSON.stringify({data: entry}))

        }

        export default allAvos

*After*

        import {NextApiRequest, NextApiResponse} from "next"
        import DB from "@database"

        const allAvos = async (request: NextApiRequest, response: NextApiResponse) => {
          const db = new DB()
          const id = request.query.id

          const entry = await db.getById(id as string)

          response.status(200).json(entry)

        }

        export default allAvos


### Debbug in Nextjs

NextJS por debajo es una aplicación de Node, para poder hacer debug de nuesta aplicación debemos modificar en nuestro package.json el script de dev

      "scripts": {
        "dev": "NODE_OPTIONS='--inspect' next",
        "build": "next build",
        "start": "next start",
        "type-check": "tsc --noEmit"
      },

Ahora al correr nuesto ambiente de desarrollo nos va a indicar por la terminal por cual puerto podemos acceder al inspect


Podemos encontrar el inspect de nuestra api ingresando about:inspect

Pendiente verificar si está habilitado el debug en ambiente de desarrollo.



## Conectando nuestros componentes a la API


/*pages/index.tsx - Home*/



        import React, {useState, useEffect} from 'react'
        import Navbar from '../components/Navbar/Navbar'

        const HomePage = () => {

          const[productList, setProductList] = useState<TProduct[]>([])


          useEffect(()=>{
            window.fetch('/api/avo').then((response)=>response.json()).then(({data})=>setProductList(data))

          },[])

          return (
            <div>
              <Navbar />
              <div>Platzi and Next.js!</div>
              {
                productList.map((product)=><div>{product.name}</div>)
              }
            </div>
          )
        }

        export default HomePage


## Extendiendo el Document


Como en toda aplicación de React existe App que es el documento principal, y antes de este se encuentra el Document que se encarga de envolver a toda la aplicación

      Document
        App
          Our Application /pages/

Cuando se habla de extender se refiere a personalizar estos documentos según los requerimiento del caso.

Para extender el documento debemos crear un archivo _document.tsx o _document.js dentro de pages

Desde la documentacion de NextJs podemos descargar un template para custom document para personalizar lo que necesitamos 

https://nextjs.org/docs/advanced-features/custom-document


        import Document, { Html, Head, Main, NextScript } from 'next/document'

        class MyDocument extends Document {
          static async getInitialProps(ctx) {
            const originalRenderPage = ctx.renderPage

            // Run the React rendering logic synchronously
            ctx.renderPage = () =>
              originalRenderPage({
                // Useful for wrapping the whole react tree
                enhanceApp: (App) => App,
                // Useful for wrapping in a per-page basis
                enhanceComponent: (Component) => Component,
              })

            // Run the parent `getInitialProps`, it now includes the custom `renderPage`
            const initialProps = await Document.getInitialProps(ctx)

            return initialProps
          }

          render() {
            return (
              <Html>
                <Head />
                <body>
                  <Main />
                  <NextScript />
                </body>
              </Html>
            )
          }
        }

        export default MyDocument


En el componente Main es donde viene nuestra aplición

Desde acá podemos extender por ejemplo el Head, como lo sería para personalizar:

- Favicon
- Modificar las fuentes desde un CDN
- Para agregar estilos externos
- Scripts de JS externos

Desde el documento también podriamos agregar elementos adicionales que apliquen para todas las páginas, pero que estén por fuera de nuestra aplicación
Tambien podriamos agregar una clase al body

/*pages/_document.tsx*/

        import Document, { Html, Head, Main, NextScript } from 'next/document'

        class MyDocument extends Document {
        

          render() {
            return (
              <Html>
                <Head>
                  {/*
                  - Favicon
                  - Modificar las fuentes desde un CDN
                  - Para agregar estilos externos
                  - Scripts de JS externos          
                  */}
                </Head>
                <body className='new-body-class'>
                  <Main />
                  <NextScript />
                </body>
              </Html>
            )
          }
        }

        export default MyDocument

#### Advertencias sobre extender el Document:

Ya que el Document se renderiza en servidor, los eventos como onClick no funcionarán.
Los componentes de React fuera de <Main /> no serán inicializados por el navegador. No añadir lógica de la aplicación aquí o CSS personalizado (como styled-jsx). Si necesita componentes compartidos en todas sus páginas (como un menú o una barra de herramientas).
getInitialPropsfunción de Document no se llama durante las transiciones del lado del cliente, ni cuando una página está optimizada estáticamente.




## Extendiendo el App


Buscamos en la documentación de NextJS un template para el custom App y lo pegamos en el archivo pages/_app.tsx


        // import App from 'next/app'

        function MyApp({ Component, pageProps }) {
          return <Component {...pageProps} />
        }

        // Only uncomment this method if you have blocking data requirements for
        // every single page in your application. This disables the ability to
        // perform automatic static optimization, causing every page in your app to
        // be server-side rendered.
        //
        // MyApp.getInitialProps = async (appContext) => {
        //   // calls page's `getInitialProps` and fills `appProps.pageProps`
        //   const appProps = await App.getInitialProps(appContext);
        //
        //   return { ...appProps }
        // }

        export default MyApp
      
El elemnto Component corresponde a la pages, _app.js envuelve todas las páginas, por eso es el punto donde se trabajan los providers, context/providers, theme, data

Otro uso muy comun es utilizar este componente para usar los layouts, para elementos comunes para todas las páginas o para pasar props adicionales

Para retirar los errores de tipo usando typescript importamos AppProps desde next/app y declaramos los tipos de datos



         import {AppProps} from 'next/app'

        function MyApp({ Component, pageProps }: AppProps) {
          return <Component {...pageProps} />
        }

        // Only uncomment this method if you have blocking data requirements for
        // every single page in your application. This disables the ability to
        // perform automatic static optimization, causing every page in your app to
        // be server-side rendered.
        //
        // MyApp.getInitialProps = async (appContext) => {
        //   // calls page's `getInitialProps` and fills `appProps.pageProps`
        //   const appProps = await App.getInitialProps(appContext);
        //
        //   return { ...appProps }
        // }

        export default MyApp


El comentario central corresponde a una función apra activar el SSR para todas las páginas, Se debe usar con cuidado ya que se podría bloquear toda la data

Vamos a crear un layout para ser usado en _app e integrarlo a todas las páginas, en este caso el NavBar el cual lo vamos incluir en un nuevo componente Layout

El Layout recibe las pages por medio de un children component

Para el caso de Typescript debemos indicar queel componente  es de tipo :React.FC 




*components/Layout/Layout.tsx*

        import Navbar from 'components/Navbar/Navbar'
        import React from 'react'

        const Layout:React.FC = ({children}) => {
          return (
            <div>
              <Navbar/>
              {children}
              <footer>Footer</footer>
            </div>
          )
        }

        export default Layout


IMportamos el Layout desde _app.tsx y envolvemos Component
Se debe parar la terminal y volver a compilar

/*pages/_app.tsx*/

      function MyApp({ Component, pageProps }: AppProps) {
        return(
            <Layout>
              <Component {...pageProps} />
            </Layout>

        ) 
      }



## Path alias

Para evitar los import hell - dot hell

        ../../

        import Navbar from '../../components/Navbar/Navbar'


Tenemos la opcion de usar los path aliase para acceder directamente


        import Navbar from 'components/Navbar/Navbar'

        import Navbar from '@components/Navbar/Navbar'


Para configurarlos tanto en js como ts vamos a configurarlo en el tsconfig.js, en el cual vamos a necesitar dos cosas:

 el baseUrl es el punto de referencia a la raiz del proyecto


        "baseUrl": ".",

Y en los paths el mapeo del proyecto. Ejemplo lo que empieze por components lo busques en tal ruta y se le indica a la ruta que es un acceso a muchos /*


          "paths": {
            "@database": ["database/db.ts"],
            "@components/*": ["components/*"]
          },

Se debe volver a compilar


## Explora las soluciones de CSS en NextJS y su flexibilidad

NextJs nos permite el approach o enfoque  de nuestra preferencia, sin embargo sin necesidad de configurar podemos  utilizar:

Built-in CSS NextJS(defecto) 
1. Global CSS (.css)
2. Module CSS (.module.css)
3. CSS-in-JS Styled JSX (Es propia de NextJS - Mantenida por Vercel)

###  Global CSS (.css)

Los estilos globales deben ir en el root de la aplicación, 
Los archivos pueden tener cualquier nombre solo deben tener la extensión .css
Importamos los estilos globales desde _app.js y ya estan listos para ser usados en cualquier parte de la aplicación

*styles.css*

       //estilo insertado en el body extendiendo _document.tsx 
      .new-body-class{
        background-color: aqua;
      }

*pages/_app.tsx*

      ...

      import '../style.css'

      ...

### Module CSS (.module.css)

Los .module solo aplican para cada componente en especifico
el archivo stylename.module.css debe estar ubicado en la carpeta del componente que queremos estilizar
Por consistencia el stylename puede tener cualquier nombre pero preferible el del componente
Ahora debemos importar los estilos desde el componente, pero como si se tratara de un archivo de JavaScript

Lo usamos como CSS-Module que fué antes que aparecediera CSS in JSX, CSS-Module es similar a como se trabaja en postCSS
El nombre de las clases son transformadas a modulename_classname__hash con eso se evita la colisión de estilos


*components/Layout/Layout.module.css*


      .container{
        background-color: salmon;
      }

*components/Layout/Layout.tsx*


      import Navbar from '@components/Navbar/Navbar'
      import React from 'react'
      import styles from './Layout.module.css'

      const Layout:React.FC = ({children}) => {
        return (
          <div className={styles.container}>
            <Navbar/>
            {children}
            <footer>Footer</footer>
          </div>
        )
      }

      export default Layout


### CSS-in-JSX

Styled JSX funciona pasando los estilos por medio de un componente de React llamado style con una propiedad '<style jsx>' y dentro de este componente creamos un template literal con las propiedades de CSS 


*components/Layout/Layout.tsx*

      import Navbar from '@components/Navbar/Navbar'
      import React from 'react'
      import styles from './Layout.module.css'

      const Layout:React.FC = ({children}) => {
        return (
          <div className={styles.container}>
            <Navbar/>
            {children}
            <footer className='footer'>Footer</footer>
            <style jsx>
              {`
                .footer{
                  background: lightblue;
                }
              `}
            </style>
          </div>
        )
      }

      export default Layout


CSS-in-JS agrega automáticamente nombre a las clases para evitar colisiones con otros estilos


## Utilizando Vercel para hacer Deploy

Para el despliegue en vercel desde el repo es necesario dar permisos en la configuracion de github e indicar los repos que se pueden integrar con vercel.


## Introducción a los pre-render modes

CSR (Client Side Render): el código se ejecuta en el navegador y tendremos problemas con el SEO
SSR (Sever Side render): El contenido se ejecuta en el servidor, para contenido dinámico, y ésto permite que se pueda indexar
SSG (Static site Generator): El contenido se genera en el deploy, ayuda al seo, pero no recomendable para contenido muy dinamico


## UnderTheHood Server Side Rendering: getServerSideProps

getServerSideProps se ejecuta en el servidor, por lo tanto no se puede usar window, en su lugar podriamos instalar el isomorphic-unfetch

No usar URL relativas al usar getServerSideProps

Si la petición la hacemos en ambiente de desarrollo vamos a ver que la página se renderiza con un JSON en su script como una de la estrategias de renderizado de lado del cliente, mientras que si compilamos (build) y consumimos el servicio en producción vemos que el servidor nos retorna el HTML de la página con el request ya renderizado.

SSR mejora el SEO

Bajo esta estructura lo que hicimos fue mover el request de lado del cliente al servidor, y dependiendo de donde esté nuestra API puede que demore un poco mas en responder al cliente con el contenido previamente renderizado

## UnderTheHood Static Generation: getStaticProps

Tiene la misma estructura que getServerSideProps

getServerSideProps funciona on demand osea cada vez que se hace una petición al servidor mientra que getStaticProps se ejecuta una única vez y es cuando se compila (build) la solución.

Si tenemos miles de usuario de manera concurrente, el servidor debe crear un nuevo render por cada petición en caso de usar SSR mientras que SSG retorna los mismos archivos estáticos.

**NOTA** getServerSideProps y getStaticProps solo pueden ser usadas desde las páginas y no desde los componentes y son métodos de tipo async

## #UnderTheHood Static Dynamic Static Generation: getStaticPaths

getStaticProps recibe del contexto, los params para renderizar las páginas dinámicas.

En el caso de las páginas dinámicas, getStaticProps debe conocer de antemano todas las páginas que va renderizar ya que esto se hace in build-time

Se requiere un segundo método obligatorio para las páginas dinámicas llamado getStaticPaths que es de tipo async.

getStaticPaths retorna un objeto con la propiedad path que retorna un array, en este caso con los ids de las páginas a generar. No es necesario hacer esto de manera manual, desde este método podemos hacer un request para obtener los Ids

Debemos parsear la respuesta según el objeto (querys) que espera el contexto de getStaticProps {params: {id: <id>}}

getStaticPaths retorna una segunda propiedad llamada fallback, por el momento lo vamos a pasar en false.

Fallback hace parte del llamado incremental static generation

fallback en false lo que va a hacer es que toda pagina no incluida en los paths va dar un 404