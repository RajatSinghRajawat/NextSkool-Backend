const mongoose = require('mongoose');


const fileds = mongoose.Schema({
    user_name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const Auth = mongoose.model("User_Authentication", fileds);


module.exports = { Auth };