const express = require('express');
const productController = require('../controllers/product-controller');
const upload = require('../utils/fileUploader');

const router = express.Router();

// Create Product
router.post('/',upload.array('images', 5), productController.createProduct);

// Get All Products
router.get('/', productController.getAllProducts);
router.post('/createmany', productController.insertManyProducts);

// Get Product by ID
router.get('byid/:id', productController.getProductById);

// Update Product
router.put('byid/:id', productController.updateProduct);

// Delete Product
router.delete('byid/:id', productController.deleteProduct);

// Search Products (with filters)
router.get('/search', productController.searchProducts);

module.exports = router;
