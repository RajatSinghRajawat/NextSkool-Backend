const mongoose = require('mongoose');


const fileds = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
}
);


const Auth = mongoose.model("User_Authentication", fileds);


module.exports = { Auth };