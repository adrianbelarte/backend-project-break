const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const methodOverride = require('method-override');
const productApiRoutes = require('./routes/productApiRoutes');
const cors = require('cors');
dotenv.config();

const { dbConnection } = require('./config/db');
const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const productController = require('./controllers/productController');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/index');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Conexión a la base de datos
dbConnection();

// ✅ Middleware para parsear el body ANTES de methodOverride
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// ✅ methodOverride para _method en POST body o query string
app.use(methodOverride('_method')); // también puedes usar 'X-HTTP-Method-Override' para headers

// ✅ Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Configuración de sesión
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
}));

// ✅ Ruta principal
app.get('/', productController.showProducts);

// ✅ Rutas públicas
app.use(authRoutes);
app.use('/products', productRoutes);
app.use('/api', productApiRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ✅ Rutas protegidas
app.use('/dashboard', authMiddleware, dashboardRoutes);

// ✅ Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
