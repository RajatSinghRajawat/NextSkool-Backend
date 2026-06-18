const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  FullName: {
    type: String,
    required: true
  },

  Email: {
    type: String,
    required: true,
    unique: true
  },

  MobileNumber: {
    type: String,
    required: false
  },



  ProfileImage: {
    type: String,
    default: ""
  },

  Gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
  },

  DateOfBirth: {
    type: Date
  },

  Address: {
    type: String
  },

  City: {
    type: String
  },

  State: {
    type: String
  },

  Country: {
    type: String
  },

  Pincode: {
    type: String
  },

  EnrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],

  WishlistCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],

  CompletedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],

  Certificates: [{
    type: String
  }],

  Role: {
    type: String,
    default: "Student"
  },

  IsVerified: {
    type: Boolean,
    default: false
  },

  LastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
