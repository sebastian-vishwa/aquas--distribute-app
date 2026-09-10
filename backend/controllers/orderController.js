const Order = require('../models/Order');

// 5-6 Realistic wholesale water orders for Aquas B2B platform in LKR
const dummyOrders = [
  {
    orderId: 'ORD-9482',
    date: new Date('2026-08-25'),
    items: 120,
    total: 432000.00,
    status: 'Delivered',
    invoiceLink: 'https://example.com/invoices/INV-9482.pdf',
  },
  {
    orderId: 'ORD-9510',
    date: new Date('2026-08-30'),
    items: 50,
    total: 105000.00,
    status: 'Delivered',
    invoiceLink: 'https://example.com/invoices/INV-9510.pdf',
  },
  {
    orderId: 'ORD-9565',
    date: new Date('2026-09-02'),
    items: 85,
    total: 280500.00,
    status: 'In Transit',
    invoiceLink: 'https://example.com/invoices/INV-9565.pdf',
  },
  {
    orderId: 'ORD-9602',
    date: new Date('2026-09-05'),
    items: 40,
    total: 84000.00,
    status: 'In Transit',
    invoiceLink: 'https://example.com/invoices/INV-9602.pdf',
  },
  {
    orderId: 'ORD-9644',
    date: new Date('2026-09-08'),
    items: 200,
    total: 660000.00,
    status: 'Delivered',
    invoiceLink: 'https://example.com/invoices/INV-9644.pdf',
  },
  {
    orderId: 'ORD-9701',
    date: new Date('2026-09-10'),
    items: 25,
    total: 52500.00,
    status: 'Cancelled',
    invoiceLink: 'https://example.com/invoices/INV-9701.pdf',
  },
];

// Fetch all orders
const getOrders = async (req, res) => {
  try {
    let orders = await Order.find().sort({ date: -1, createdAt: -1 });

    // Auto-seed if database collection is empty so UI has immediate test data
    if (orders.length === 0) {
      orders = await Order.insertMany(dummyOrders);
    } else {
      // Auto-scale legacy orders if stored in legacy USD values (< 5000)
      orders = orders.map((o) => {
        const doc = o.toObject ? o.toObject() : { ...o };
        if (doc.total && doc.total < 5000) {
          doc.total = doc.total * 300;
        }
        return doc;
      });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Seed 5-6 realistic dummy wholesale water orders
const seedOrders = async (req, res) => {
  try {
    await Order.deleteMany({});
    const createdOrders = await Order.insertMany(dummyOrders);

    res.status(201).json({
      message: 'Successfully seeded 6 wholesale water orders into MongoDB',
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