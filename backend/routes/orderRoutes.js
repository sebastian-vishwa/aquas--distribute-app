const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getActiveOrders,
  getOrderSummary,
  getOrderById,
  getInvoice,
  cancelOrder,
  updateOrderStatus,
} = require('../controllers/orderController');
const auth = require('../middleware/auth');
const requireManager = require('../middleware/requireManager');

router.use(auth);

// specific paths before '/:id'
router.get('/active', getActiveOrders);
router.get('/summary', getOrderSummary);

router.post('/', createOrder);
router.get('/', getMyOrders);
router.get('/:id', getOrderById);
router.get('/:id/invoice', getInvoice);

router.patch('/:id/cancel', cancelOrder);
router.patch('/:id/status', requireManager, updateOrderStatus);

module.exports = router;