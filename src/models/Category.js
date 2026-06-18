const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    CategoryName: {
      type: String,
      required: true,
      unique: true,
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

    CategoryImage: {
      type: String,
      default: "",
    },

    CategoryIcon: {
      type: String,
      default: "",
    },

    Status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    TotalCourses: {
      type: Number,
      default: 0,
    },

    FeaturedCategory: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
