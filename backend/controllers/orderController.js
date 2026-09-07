const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cannot place an order with no items' });
    }
    if (!deliveryAddress) {
      return res.status(400).json({ message: 'Delivery address is required' });
    }

    const orderItems = [];
    let subtotal = 0;

    for (const cartItem of items) {
      const product = await Product.findById(cartItem.id);
      if (!product) {
        return res.status(404).json({ message: `Product ${cartItem.id} not found` });
      }
      const unitPrice = product.wholesalePrice;
      subtotal += unitPrice * cartItem.quantity;

      orderItems.push({
        product: product._id,
        productName: product.productName,
        quantity: cartItem.quantity,
        unitPrice,
      });
    }

    const deliveryFee = 15;
    const total = subtotal + deliveryFee;

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      subtotal,
      deliveryFee,
      total,
      deliveryAddress,
    });

    await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

const getActiveOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
      status: { $in: ['Ordered', 'Dispatched', 'In Transit'] },
    }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching active orders', error: error.message });
  }
};

const getOrderSummary = async (req, res) => {
  try {
    const yearStart = new Date(new Date().getFullYear(), 0, 1);
    const orders = await Order.find({ user: req.user.id });
    const thisYearOrders = orders.filter((o) => o.createdAt >= yearStart);

    res.status(200).json({
      total: orders.length,
      delivered: thisYearOrders.filter((o) => o.status === 'Delivered').length,
      inTransit: orders.filter((o) => o.status === 'In Transit').length,
      cancelled: thisYearOrders.filter((o) => o.status === 'Cancelled').length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order summary', error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};

const getInvoice = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id })
      .populate('user', 'companyName email billingAddress');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({
      invoiceNumber: `INV-${order._id.toString().slice(-6).toUpperCase()}`,
      issuedDate: order.createdAt,
      billTo: {
        company: order.user.companyName,
        email: order.user.email,
        address: order.user.billingAddress,
      },
      items: order.items,
      subtotal: order.subtotal,
      deliveryFee: order.deliveryFee,
      total: order.total,
      status: order.status,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating invoice', error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.status !== 'Ordered') {
      return res.status(400).json({ message: 'Only pending orders can be cancelled' });
    }

    order.status = 'Cancelled';
    order.statusHistory.push({ status: 'Cancelled', timestamp: new Date() });
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling order', error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Ordered', 'Dispatched', 'In Transit', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    order.statusHistory.push({ status, timestamp: new Date() });
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getActiveOrders,
  getOrderSummary,
  getOrderById,
  getInvoice,
  cancelOrder,
  updateOrderStatus,
};