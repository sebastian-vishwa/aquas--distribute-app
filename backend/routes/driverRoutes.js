const express = require('express');
const router = express.Router();
const { addDriver, getDrivers, driverLogin } = require('../controllers/driverController');

// POST request to add a driver: /api/drivers/add
router.post('/add', addDriver);

// GET request to fetch all drivers: /api/drivers
router.get('/', getDrivers);

// POST request for Mobile App Driver Login: /api/drivers/app-login
router.post('/app-login', driverLogin);

module.exports = router;