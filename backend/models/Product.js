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

function calculateStatus(currentStock, reorderLevel) {
  if (currentStock <= 0) return 'Out of Stock';
  if (reorderLevel && currentStock <= reorderLevel) return 'Low Stock';
  return 'In Stock';
}

productSchema.pre('save', function (next) {
  this.status = calculateStatus(this.currentStock, this.reorderLevel);
  next();
});

module.exports = mongoose.model('Product', productSchema);