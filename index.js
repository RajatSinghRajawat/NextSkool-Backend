const express = require('express');
<<<<<<< HEAD
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
=======
const cors = require('cors');
const { connect_DB } = require('./src/config/db');

const port = process.env.PORT || 5000;


const app = express()
app.use(express.json())
app.use(cors())


const router = require('./src/routes/authRoutes');
app.use('/apis', router)

connect_DB()


app.listen(port, () => {
    console.log(`Server is running. ${port}`);
})
>>>>>>> tushar
