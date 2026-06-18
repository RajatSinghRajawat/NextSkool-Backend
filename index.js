const express = require('express');
const mongoose = require('mongoose');
const leadRoutes = require('./src/routes/leadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/leads', leadRoutes);


// Connect to MongoDB and start server
mongoose
  .connect('mongodb://127.0.0.1:27017/nextskool')
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
