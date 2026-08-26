const express = require('express');
const router = express.Router();
const { addVehicle, getVehicles } = require('../controllers/vehicleController');

// POST request to add a vehicle
router.post('/add', addVehicle);

// GET request to fetch all vehicles
router.get('/', getVehicles);

// THIS IS THE LINE THAT PREVENTS THE CRASH:
module.exports = router;