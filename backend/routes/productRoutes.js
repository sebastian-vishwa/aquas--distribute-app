const express = require('express');
const router = express.Router();
const { addProduct, getProducts , getProductById,updateProduct,deleteProduct} = require('../controllers/productController');
const auth = require('../middleware/auth');
const requireManager = require('../middleware/requireManager');

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/add', auth, requireManager, addProduct);
router.put('/:id', auth, requireManager, updateProduct);
router.delete('/:id', auth, requireManager, deleteProduct);

module.exports = router;