const express = require('express');
const router = express.Router();
const { getOrders, seedOrders } = require('../controllers/orderController');

// GET /api/orders - Fetch all orders
router.get('/', getOrders);

// POST /api/orders/seed - Seed realistic dummy wholesale water orders
router.post('/seed', seedOrders);

// GET /api/orders/seed - Convenience endpoint for direct browser testing
router.get('/seed', seedOrders);

module.exports = router;