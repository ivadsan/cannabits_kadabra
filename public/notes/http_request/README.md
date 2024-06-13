[//]: # @param group $$ Desarrollo de aplicaciones web
[//]: # @param title $$ HTTP request methods
[//]: # @param author $$ Iván D. Sánchez

# HTTP request methods

## Request Params (Parámetros de Ruta)

Los Request Params o parámetros de ruta se utilizan para enviar información a través de la URL misma, como parte de la ruta del endpoint. Este método es útil para identificar recursos específicos en un servidor.

- Ejemplo de URL con Request Params: https://api.ejemplo.com/usuarios/123

  - Aquí, 123 es un parámetro de ruta que puede representar el ID de un usuario específico.

- Uso típico: RESTful APIs para identificar recursos específicos.

```
GET /usuarios/123 HTTP/1.1
Host: api.ejemplo.com
```

## Query Params (Consulta o Query Parameters)

Los parámetros de consulta se utilizan para enviar información adicional en una solicitud, usualmente para filtrar, buscar o paginar los datos.

- Ejemplo de URL con Query Params: https://api.ejemplo.com/usuarios?edad=25&ciudad=Madrid
  - Aquí, edad=25 y ciudad=Madrid son parámetros de consulta.
- Uso típico: Filtrado, búsqueda, y paginación en las APIs.

```
GET /usuarios?edad=25&ciudad=Madrid HTTP/1.1
Host: api.ejemplo.com
```

## Request Body (Cuerpo de la Solicitud)

El Request Body se utiliza principalmente con métodos HTTP que envían datos al servidor, como POST, PUT, PATCH y DELETE. Los datos se envían en el cuerpo de la solicitud, en lugar de en la URL.

- Ejemplo de solicitud con Request Body:

```
POST /usuarios HTTP/1.1
Host: api.ejemplo.com
Content-Type: application/json

{
  "nombre": "Juan",
  "edad": 25,
  "ciudad": "Madrid"
}
```

- Uso típico: Crear o actualizar recursos. El cuerpo de la solicitud permite enviar datos estructurados, como JSON o XML.

## Comparación y Uso Apropiado

- Request Params: Útil para identificar un recurso específico (por ejemplo, /usuarios/123 para el usuario con ID 123).
- Query params: Útil para enviar parámetros opcionales para modificar la acción de la solicitud (por ejemplo, filtros y búsquedas).
- Request Body: Útil para enviar datos complejos y estructurados al servidor, principalmente en métodos que modifican el estado del servidor (por ejemplo, POST para crear nuevos recursos, PUT para actualizar).
