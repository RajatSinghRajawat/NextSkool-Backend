const mongoose = require('mongoose');

<<<<<<< HEAD

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
=======
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'instructor'],
    default: 'student',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);

>>>>>>> origin/mayant1108
