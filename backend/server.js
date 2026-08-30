require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 1. CORS Configuration: Mobile phone එක ඇතුළු ඕනෑම device එකකට access ලබා දීම
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const driverRoutes = require('./routes/driverRoutes');
app.use('/api/drivers', driverRoutes);

const vehicleRoutes = require('./routes/vehicleRoutes');
app.use('/api/vehicles', vehicleRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Connected to Aquas MongoDB!'))
  .catch((err) => console.error('Database connection error:', err));

const PORT = process.env.PORT || 5000;

// 2. Local Network (Wi-Fi) එකේ ඇති Mobile Devices වලට Open කිරීමට '0.0.0.0' එක් කිරීම
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
});