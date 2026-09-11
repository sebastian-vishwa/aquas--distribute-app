const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, businessType } = req.body;
    
    // 1. Check if user already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Create the new user using your blueprint
    const newUser = new User({ 
      name, 
      email, 
      password, 
      businessType: businessType || 'Wholesale / Distribution' 
    });
    
    // 3. Save them to MongoDB Atlas
    await newUser.save();

    res.status(201).json({ message: '✅ User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await User.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: '✅ Customer deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error: error.message });
  }
};

module.exports = { registerUser, getCustomers, deleteCustomer };