require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./src/models/User');
require('./src/models/Payment');

const leadRoutes = require('./src/routes/leadRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nextskool';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('NextSkool Backend is running');
});

app.use('/api/leads', leadRoutes);
app.use('/api/payments', paymentRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });