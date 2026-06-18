<<<<<<< HEAD
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

module.exports = connectDB;
=======
const mongoose = require('mongoose')

const connect_DB = mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to DB')
}).catch((error) => {
    console.log(error)
});


module.exports = { connect_DB };
>>>>>>> tushar
