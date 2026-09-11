const express = require('express');
const router = express.Router();
const { addVehicle, getVehicles, deleteVehicle, updateVehicle } = require('../controllers/vehicleController');

// 1. GET request to fetch all vehicles: /api/vehicles
router.get('/', getVehicles);

// 2. Specific routes
router.post('/add', addVehicle);

// 3. Parameterized routes
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);

module.exports = router;