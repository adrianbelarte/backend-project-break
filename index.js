const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sesión
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
}));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares personalizados
const authMiddleware = require('./middlewares/authMiddleware');

// Rutas
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); // ← nuevo archivo que debes crear

// Rutas públicas
app.use(authRoutes);
app.use('/products', productRoutes);

// Rutas protegidas (requieren sesión)
app.use('/dashboard', authMiddleware, dashboardRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
