const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true, unique: true },
  status: { type: String, default: 'Idle' },
  driver: { type: String, default: 'Unassigned' },
  location: { type: String, default: 'Depot' }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);