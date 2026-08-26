const Driver = require('../models/Driver');

// 1. Function to Save a New Driver
const addDriver = async (req, res) => {
  try {
    const newDriver = new Driver(req.body);
    await newDriver.save();
    res.status(201).json({ message: '✅ Driver added successfully!', driver: newDriver });
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

module.exports = { addDriver, getDrivers };