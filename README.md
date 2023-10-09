# Getting Started

First, run the development server:

Version **Node 16.17.0**

```bash
yarn dev
```

## Configuararciones iniciales

- Reconstruir los modulos con `npm i`

    ***Importante agregar `mongo/` al gitignore***

### DDBB en local

- tener docker desktop corriendo y ejecutar

``` bash
  docker compose up -d
```

### Cadena de conexion con MongoDB local (contenedor)

``` bash
  mongodb://localhost:27017/entriesdb
```

### Llenar la DDDBB con datos de prueba usando

- usa este comando solo una vez o elimina el file /page/api/seed

```bash
  GET - localhost://localhost:3000/api/seed
```

### Font global

- use en el _document

``` html
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
```

- Configuarar variables de entorno

- MongoDB URL Local, para conexion con la base de datos.

``` bash
  mongodb://localhost:27017/entriesdb
```

## Middleware con Next.js 13

Si necesitas agregar más opciones de coincidencia en el middleware de Next.js, puedes modificar la propiedad matcher en el objeto config. Puedes hacerlo de varias formas:

Agregar múltiples rutas de coincidencia: Puedes proporcionar un array de rutas en la propiedad matcher. Por ejemplo:

``` js
    export const config = {
      matcher: ['/checkout/:path*', '/cart/:id'],
    };
```

En este caso, el middleware se ejecutará en cualquier URL que coincida con /checkout/:path* o /cart/:id.

Utilizar patrones de coincidencia más específicos: Puedes utilizar patrones de coincidencia más específicos utilizando parámetros y comodines en las rutas. Por ejemplo:

``` js
    export const config = {
      matcher: ['/checkout/:id', '/checkout/:id/:step'],
    };
```

En este caso, el middleware se ejecutará en URLs que coincidan con /checkout/:id o /checkout/:id/:step, donde :id y :step son parámetros variables que pueden representar diferentes valores en la URL.

Utilizar expresiones regulares: Si necesitas una lógica de coincidencia más avanzada, puedes utilizar expresiones regulares en la propiedad matcher. Por ejemplo:

``` js
    export const config = {
      matcher: [/^\/checkout\/\d+$/, /^\/cart\/\w+$/],
    };
```

En este caso, el middleware se ejecutará en URLs que coincidan con /checkout/ seguido de uno o más dígitos, o /cart/ seguido de uno o más caracteres alfanuméricos.

Recuerda que puedes combinar estas opciones para crear patrones de coincidencia más complejos según tus necesidades.

## Metodo de Pago

Utilizar las credenciales PayPal fake para demo:

``` credentials
    Email    => sb-jrmqj26430242@personal.example.com
    Password => 123456789
```

## Dependecias

``` bash
  yarn add @mui/material @emotion/react @emotion/styled
  yarn add @mui/icons-material
  yarn add uuid
  yarn add notistack
  yarn add date-fns
  yarn add @mui/x-data-grid
  yarn add js-cookies
  yarn add bcryptjs
  yarn add jsonwebtoken
  yarn add react-hook-form
  yarn add axios
  yarn add next-auth
```

## Enlaces

- [Material UI](https://mui.com/)
- [Material ui Icons](https://mui.com/material-ui/material-icons/?query=moon)
- [Drag & Drop react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd)
- [Codigos de respuesta http](https://developer.mozilla.org/es/docs/Web/HTTP/Status)
- [Middleware Next](https://nextjs.org/docs/advanced-features/middleware)
- [Guia de migración Middleware Next](https://nextjs.org/docs/messages/middleware-upgrade-guide#breaking-changes)
- [Snackbar](https://mui.com/material-ui/react-snackbar/)
- [notistack - con Provider](https://github.com/iamhosseindhv/notistack)
- [date-fns](https://date-fns.org/)
- [Mui Grid](https://mui.com/x/react-data-grid/getting-started/#main-content)
- [react-hook-form](https://react-hook-form.com/get-started)
- [Next - Middleware](https://nextjs.org/docs/messages/nested-middleware)
- [Next - Auth](https://next-auth.js.org/)

## Vista previa

![Home](assets/home.png)
