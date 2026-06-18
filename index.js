const express = require('express');
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