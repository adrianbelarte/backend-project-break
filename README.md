# Tienda de Ropa - CRUD con Node.js y Express

Este proyecto es una aplicación web simple para gestionar productos de una tienda de ropa. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre productos.

## Tecnologías usadas

- **Node.js**
- **Express.js**
- **MongoDB con Mongoose** (estructura de modelo y queries)
- **HTML estático generado desde controladores**
- **Método override (_method)** para permitir PUT y DELETE desde formularios HTML
- **Supertest y Jest** para pruebas automatizadas
- **Jest Mocking** para simular modelos de Mongoose

## Funcionalidades

- Ver todos los productos (`GET /dashboard`)
- Ver detalle de producto (`GET /dashboard/:id`)
- Crear nuevo producto (`GET /dashboard/new` + `POST /dashboard`)
- Editar producto existente (`GET /dashboard/:id/edit` + `PUT /dashboard/:id`)
- Eliminar producto (`DELETE /dashboard/:id/delete`)

## Categorías y Tallas (enums)

- **Categorías**: Camisetas, Pantalones, Zapatos, Accesorios
- **Tallas**: XS, S, M, L, XL

Estas se renderizan como `<select>` en los formularios.

## Subida de imagenes
npm install multer cloudinary multer-storage-cloudinary

## Testing

Las rutas están testeadas usando **Jest** y **Supertest**. Se usan mocks para simular la lógica de base de datos con Mongoose.

Para correr los tests:

```bash
npm test
npm install cors
npm install swagger-ui-express swagger-jsdoc