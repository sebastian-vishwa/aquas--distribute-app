const express = require('express');
const router = express.Router();
const { addProduct, getProducts, deleteProduct } = require('../controllers/productController');

// POST request to add a product
router.post('/add', addProduct);

// GET request to fetch all products for your inventory table
router.get('/', getProducts);

router.delete('/:id', deleteProduct);

module.exports = router;
