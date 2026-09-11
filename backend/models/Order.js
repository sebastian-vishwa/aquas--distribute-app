const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    customerName: {
      type: String,
      required: true,
      default: 'Valued Customer',
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Dispatched', 'Delivered', 'Cancelled', 'In Transit'],
      default: 'Pending',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    // Optional helper fields for backwards compatibility
    items: {
      type: Number,
    },
    invoiceLink: {
      type: String,
      default: '#',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);