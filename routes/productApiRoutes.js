const express = require('express');
const router = express.Router();
const productApiController = require('../controllers/productApiController');

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos
 * 
 *   post:
 *     summary: Crear un producto nuevo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 */

// Rutas API JSON
router.get('/products', productApiController.getAllProducts);
router.get('/products/:id', productApiController.getProductById);
router.post('/products', productApiController.createProduct);
router.put('/products/:id', productApiController.updateProduct);
router.delete('/products/:id', productApiController.deleteProduct);

module.exports = router;
