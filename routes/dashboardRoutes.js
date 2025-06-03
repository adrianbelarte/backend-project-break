const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const methodOverride = require('method-override');

// Soporte PUT y DELETE desde formularios
router.use(methodOverride('_method'));

router.get('/', productController.showProducts); // muestra todo desde el dashboard
router.get('/new', productController.showNewProduct);
router.post('/', productController.createProduct);
router.get('/:productId', productController.showProductById);
router.get('/:productId/edit', productController.showEditProduct);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId/delete', productController.deleteProduct);

module.exports = router;
