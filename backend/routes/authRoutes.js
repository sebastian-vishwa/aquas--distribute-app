const express = require('express');
const router = express.Router();

const { registerUser, getCustomers, deleteCustomer } = require('../controllers/authController');

router.post('/register', registerUser);
router.get('/customers', getCustomers);
router.delete('/customers/:id', deleteCustomer);

module.exports = router;