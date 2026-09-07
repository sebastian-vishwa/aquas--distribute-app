const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: String,   // snapshot at time of order
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true }, // snapshot — never trust live price later
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],

  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, default: 15 },
  total: { type: Number, required: true },

  status: {
    type: String,
    enum: ['Ordered', 'Dispatched', 'In Transit', 'Delivered', 'Cancelled'],
    default: 'Ordered',
  },

  statusHistory: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
  }],

  deliveryAddress: { type: String, required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
}, { timestamps: true });

orderSchema.pre('save', function (next) {
  if (this.isNew) {
    this.statusHistory.push({ status: this.status, timestamp: new Date() });
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);