module.exports = {
  paths: {
    '/products': {
      get: {
        summary: 'Obtener todos los productos',
        tags: ['Productos'],
        responses: {
          200: {
            description: 'Lista de productos',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Product' }
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Crear un nuevo producto',
        tags: ['Productos'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Product' }
            }
          }
        },
        responses: {
          201: {
            description: 'Producto creado con éxito'
          }
        }
      }
    },
    '/products/{id}': {
      get: {
        summary: 'Obtener producto por ID',
        tags: ['Productos'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Producto encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' }
              }
            }
          },
          404: { description: 'Producto no encontrado' }
        }
      },
      put: {
        summary: 'Actualizar un producto',
        tags: ['Productos'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Product' }
            }
          }
        },
        responses: {
          200: { description: 'Producto actualizado' },
          404: { description: 'Producto no encontrado' }
        }
      },
      delete: {
        summary: 'Eliminar un producto',
        tags: ['Productos'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: { description: 'Producto eliminado' },
          404: { description: 'Producto no encontrado' }
        }
      }
    }
  }
};