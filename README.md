# Tienda de Ropa - CRUD con Node.js y Express

Una aplicación web sencilla para gestionar productos de una tienda de ropa. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) utilizando Node.js, Express y MongoDB.

---

## Tecnologías usadas

- **Node.js** y **Express.js**: servidor y manejo de rutas.  
- **MongoDB** con **Mongoose**: modelado y persistencia de datos.  
- **HTML estático** generado dinámicamente desde controladores.  
- **Method Override (_method)**: para habilitar métodos PUT y DELETE en formularios HTML.  
- **Multer** + **Cloudinary**: para subida y almacenamiento de imágenes en la nube.  
- **Jest** y **Supertest**: para pruebas unitarias y de integración.  
- **Jest Mocking**: para simular modelos Mongoose durante las pruebas.  
- **Autenticación y autorización de usuarios**: control de acceso a rutas protegidas.  
- **Documentación de API con Swagger**: interfaz interactiva para explorar la API.

---

## Funcionalidades principales

| Acción                         | Método HTTP | Ruta                       |
|-------------------------------|-------------|----------------------------|
| Listar todos los productos     | GET         | `/dashboard` o `/product`  |
| Ver detalle de un producto     | GET         | `/dashboard/:id` o `/product/:id` |
| Mostrar formulario nuevo       | GET         | `/dashboard/new`            |
| Crear un nuevo producto        | POST        | `/dashboard`                |
| Mostrar formulario edición     | GET         | `/dashboard/:id/edit`       |
| Actualizar un producto         | PUT         | `/dashboard/:id`            |
| Eliminar un producto           | DELETE      | `/dashboard/:id/delete`     |

---

## Modelos y enums

- **Categorías disponibles:**  
  `Camisetas`, `Pantalones`, `Zapatos`, `Accesorios`

- **Tallas disponibles:**  
  `XS`, `S`, `M`, `L`, `XL`

Estas opciones se muestran en los formularios mediante menús desplegables (`<select>`) para facilitar la selección.

---

## Subida de imágenes

Para subir imágenes y almacenarlas en la nube, se utilizan:

- **multer**: para manejar la subida de archivos (multipart/form-data).  
- **cloudinary**: servicio para almacenamiento y gestión de imágenes.  
- **multer-storage-cloudinary**: adaptador que conecta Multer con Cloudinary.
 `no conseguido...`
---

## Instalación de dependencias

Ejecuta estos comandos para instalar todas las dependencias necesarias:

```bash
npm install express mongoose body-parser method-override multer cloudinary multer-storage-cloudinary cors swagger-ui-express swagger-jsdoc
npm install --save-dev jest supertest nodemon
