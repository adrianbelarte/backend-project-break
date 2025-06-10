module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'API de Productos',
    version: '1.0.0',
    description: 'Documentación de la API REST para la gestión de productos',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor local'
    }
  ]
};