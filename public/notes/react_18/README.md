[//]: # @param group $$ React
[//]: # @param title $$ Novedades React 18
[//]: # @param author $$ Iván D. Sánchez

# Novedades

CSR

Cambio de render a CreateRoot

```
const container = document.getElementById('root')
const root = CreateRoot(container)
root.render(<App />)

```

SSR

Cambio de hydrate a hydrateRoot

```
const container = document.getElementById('root')
const root = hydrateRoot(container, <App />)


```

## useId


Para generar un id de lo componentes que se mapean

```
const itemList = items.map((item) => {
  const id = useId()
  <p key={id} >{item}</p>
})
```


