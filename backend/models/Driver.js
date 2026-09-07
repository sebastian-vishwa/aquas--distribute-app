const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  driverId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  // Default values for the roster table
  status: { type: String, default: 'Active' },
  assignedVehicle: { type: String, default: 'Unassigned' }
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);