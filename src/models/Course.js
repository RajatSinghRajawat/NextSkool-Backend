const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    CourseName: {
      type: String,
      required: true,
      trim: true,
    },

    Slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    Description: {
      type: String,
      required: true,
    },

    CourseImage: {
      type: String,
      required: true,
    },

    DiscountPrice: {
      type: Number,
      required: true,
    },

    OriginalPrice: {
      type: Number,
      required: true,
    },

    CourseLanguage: {
      type: String,
      required: true,
    },

    Duration: {
      type: String,
      required: true,
    },

    TotalLectures: {
      type: Number,
      default: 0,
    },

    CourseLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    CourseRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    TotalReviews: {
      type: Number,
      default: 0,
    },

    TotalStudents: {
      type: Number,
      default: 0,
    },

    Status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },

    CertificateAvailable: {
      type: Boolean,
      default: true,
    },

    InstructorName: {
      type: String,
      required: true,
    },

    Category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);