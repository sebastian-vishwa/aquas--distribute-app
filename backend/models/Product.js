const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String },
  wholesalePrice: { type: Number, required: true },
  currentStock: { type: Number, required: true },
  reorderLevel: { type: Number },
  unit: { type: String },
  status: { type: String, default: 'In Stock' },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);