const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const { storage } = require('../config/cloudinary'); 
const upload = multer({ storage }); 

router.get('/', productController.showProducts); 
router.get('/new', productController.showNewProduct);
router.post('/', upload.single('image'), productController.createProduct);
router.put('/:productId', upload.single('image'), productController.updateProduct);
router.get('/:productId/edit', productController.showEditProduct);
router.get('/:productId', productController.showProductById);
router.delete('/:productId/delete', productController.deleteProduct);

module.exports = router;
