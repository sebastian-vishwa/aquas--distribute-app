const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    items: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Delivered', 'In Transit', 'Cancelled'],
      default: 'In Transit',
    },
    invoiceLink: {
      type: String,
      default: '#',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);