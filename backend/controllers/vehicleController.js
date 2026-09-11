const Vehicle = require('../models/Vehicle');

const addVehicle = async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    await newVehicle.save();
    res.status(201).json({ message: 'Vehicle added!', vehicle: newVehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error adding vehicle', error: error.message });
  }
};

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deletedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json({ message: 'Vehicle deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle', error: error.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json({ message: 'Vehicle updated successfully!', vehicle: updatedVehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle', error: error.message });
  }
};

// EXPORT THE FUNCTIONS HERE:
module.exports = { addVehicle, getVehicles, deleteVehicle, updateVehicle };