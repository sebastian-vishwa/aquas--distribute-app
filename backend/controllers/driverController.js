const Driver = require('../models/Driver');

// 1. Function to Save a New Driver
const addDriver = async (req, res) => {
  try {
    const newDriver = new Driver(req.body);
    await newDriver.save();
    res.status(201).json({ message: 'Driver added successfully!', driver: newDriver });
  } catch (error) {
    res.status(500).json({ message: 'Error adding driver', error: error.message });
  }
};

// 2. Function to Get All Drivers for the Roster
const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drivers', error: error.message });
  }
};

// 3. Function for Mobile App Driver Login
const driverLogin = async (req, res) => {
  try {
    const { email, driverId } = req.body;

    // Safety Check: Email හෝ Driver ID නැත්නම් Error එකක් යවනවා (Server Crash නොවී)
    if (!email || !driverId) {
      return res.status(400).json({ message: 'Email and Driver ID are required.' });
    }

    const cleanEmail = email.toString().trim().toLowerCase();
    const cleanDriverId = driverId.toString().trim();

    // Plain text Search - Regex නැතුව Safe විදියට Search කිරීම
    const drivers = await Driver.find({ driverId: cleanDriverId });
    
    // Email එක Match වෙන Driver සොයා ගැනීම
    const driver = drivers.find(d => d.email && d.email.toLowerCase().trim() === cleanEmail);

    if (!driver) {
      return res.status(401).json({ 
        message: 'Invalid Driver ID or Email. Please check Manager Portal entries.' 
      });
    }

    res.status(200).json({
      message: 'Login successful',
      role: 'driver',
      driver: {
        id: driver._id,
        fullName: driver.fullName,
        driverId: driver.driverId,
        email: driver.email,
        phone: driver.phone
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

module.exports = { addDriver, getDrivers, driverLogin };