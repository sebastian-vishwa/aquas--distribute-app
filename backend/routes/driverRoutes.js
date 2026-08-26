const express = require('express');
const router = express.Router();
const { addDriver, getDrivers } = require('../controllers/driverController');

// POST request to add a driver: /api/drivers/add
router.post('/add', addDriver);

// GET request to fetch all drivers: /api/drivers
router.get('/', getDrivers);

module.exports = router;