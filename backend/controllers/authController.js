const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // 1. Check if user already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Create the new user using your blueprint
    const newUser = new User({ name, email, password });
    
    // 3. Save them to MongoDB Atlas
    await newUser.save();

    res.status(201).json({ message: '✅ User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser };