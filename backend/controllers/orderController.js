const Order = require('../models/Order');
const Product = require('../models/Product');

// Fetch all orders sorted by date descending
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1, createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Seed realistic orders by cross-referencing actual Product database
const seedOrders = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(400).json({
        message: 'No products found in the database. Please add products first before seeding orders.',
      });
    }

    const customerPool = [
      'Apex Traders PLC',
      'Global Retail Mart',
      'Metro Supermarket',
      'Ceylon Hospitality Group',
      'Orchid Grand Hotel',
      'Cinnamon Red Resort',
      'Lanka Logistics Hub'
    ];

    const statuses = ['Pending', 'Dispatched', 'Delivered'];

    // Clear old seeded orders
    await Order.deleteMany({});

    const dummyOrders = [];
    const count = 5; // Generate 5 realistic dummy orders

    for (let i = 0; i < count; i++) {
      // Pick random product
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      // Random quantity between 10 and 100
      const quantity = Math.floor(Math.random() * 91) + 10;
      const unitPrice = randomProduct.wholesalePrice || 2500;
      const total = quantity * unitPrice;

      // Random customer & status
      const customerName = customerPool[i % customerPool.length];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      // Vary date over the past 14 days
      const daysAgo = i * 2 + 1;
      const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

      dummyOrders.push({
        orderId: `ORD-${1001 + i}`,
        customerName,
        productName: randomProduct.productName,
        quantity,
        unitPrice,
        total,
        status,
        date,
        items: quantity,
        invoiceLink: '#'
      });
    }

    const createdOrders = await Order.insertMany(dummyOrders);

    res.status(201).json({
      message: 'Refreshed!',
      count: createdOrders.length,
      orders: createdOrders,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding orders', error: error.message });
  }
};

module.exports = {
  getOrders,
  seedOrders,
};