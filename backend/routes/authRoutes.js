const express = require('express');
const router = express.Router();

// Import BOTH functions from your controller
const { registerUser, getCustomers } = require('../controllers/authController');

router.post('/register', registerUser);

// This exact line must exist for your React table's fetch request to work
router.get('/customers', getCustomers);

module.exports = router;