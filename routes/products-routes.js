const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createmany,
  getProductswithpage
} = require('../controllers/product-controller');

const router = express.Router();

// Routes
router.get('/getproduct', getAllProducts);
router.post('/productbypage', getProductswithpage);

router.get('/:id', getProductById);
router.post('/products', createmany);
router.post('/', createProduct);

router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
