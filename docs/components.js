module.exports = {
  components: {
    schemas: {
      Product: {
        type: 'object',
        required: ['name', 'price', 'category'],
        properties: {
          _id: {
            type: 'string',
            description: 'ID autogenerado por MongoDB'
          },
          name: {
            type: 'string',
            description: 'Nombre del producto'
          },
          description: {
            type: 'string',
            description: 'Descripción del producto'
          },
          category: {
            type: 'string',
            description: 'Categoría del producto'
          },
          size: {
            type: 'string',
            description: 'Tamaño del producto'
          },
          price: {
            type: 'number',
            description: 'Precio en euros'
          },
          image: {
            type: 'string',
            description: 'URL de la imagen del producto'
          }
        },
        example: {
          name: 'Camiseta Azul',
          description: 'Camiseta de algodón 100%',
          category: 'Ropa',
          size: 'M',
          price: 19.99,
          image: 'https://example.com/image.jpg'
        }
      }
    }
  }
};