const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const { dbConnection } = require('./config/db');
const authMiddleware = require('./middlewares/authMiddleware');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const productController = require('./controllers/productController');

const app = express();
const PORT = process.env.PORT || 3000;

dbConnection();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
}));

app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal con productos en HTML
app.get('/', productController.showProducts);

// Rutas públicas
app.use(authRoutes);
app.use('/products', productRoutes);

// Rutas protegidas
app.use('/dashboard', authMiddleware, dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
