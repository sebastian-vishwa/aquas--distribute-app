const express = require('express');
const router = express.Router();
const { addDriver, getDrivers, driverLogin, deleteDriver, updateDriver } = require('../controllers/driverController');

// 1. GET request to fetch all drivers: /api/drivers
router.get('/', getDrivers);

// 2. Specific routes
router.post('/add', addDriver);
router.post('/app-login', driverLogin);

// 3. Parameterized routes
router.put('/:id', updateDriver);
router.delete('/:id', deleteDriver);

module.exports = router;