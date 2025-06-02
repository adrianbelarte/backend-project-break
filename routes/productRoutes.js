const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const Product = require('../models/Product');

// Validaciones para crear y actualizar productos
const productValidations = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('description').notEmpty().withMessage('La descripción es obligatoria'),
  body('image').isURL().withMessage('La imagen debe ser una URL válida'),
  body('category').isIn(['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios']).withMessage('Categoría inválida'),
  body('size').isIn(['XS', 'S', 'M', 'L', 'XL']).withMessage('Tamaño inválido'),
  body('price').isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor que 0'),
];

// Helper para manejar errores de validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET /products - Obtener todos los productos
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener productos' });
  }
});

// GET /products/:id - Obtener producto por ID
router.get('/products/:id', [
  param('id').isMongoId().withMessage('ID inválido'),
], validate, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener el producto' });
  }
});

// POST /products - Crear nuevo producto
router.post('/products', productValidations, validate, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear el producto' });
  }
});

// PUT /products/:id - Actualizar producto por ID
router.put('/products/:id', [
  param('id').isMongoId().withMessage('ID inválido'),
  ...productValidations,
], validate, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProduct) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el producto' });
  }
});

// DELETE /products/:id - Eliminar producto por ID
router.delete('/products/:id', [
  param('id').isMongoId().withMessage('ID inválido'),
], validate, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json({ msg: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar el producto' });
  }
});

module.exports = router;
