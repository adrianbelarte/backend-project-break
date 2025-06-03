const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.showProducts);
router.get('/:productId', productController.showProductById);

module.exports = router;
