require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);



mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Connected to Aquas MongoDB!'))
  .catch((err) => console.error('Database connection error:', err));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});