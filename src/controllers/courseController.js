const mongoose = require("mongoose");
const Course = require("../models/Course");

// Create Course
const createCourse = async (req, res) => {
  try {
    const {
      CourseName,
      Slug,
      Description,
      CourseImage,
      DiscountPrice,
      OriginalPrice,
      CourseLanguage,
      Duration,
      TotalLectures,
      CourseLevel,
      CourseRating,
      TotalReviews,
      TotalStudents,
      Status,
      CertificateAvailable,
      InstructorName,
      Category,
    } = req.body;

    if (
      !CourseName ||
      !Slug ||
      !Description ||
      !CourseImage ||
      !DiscountPrice ||
      !OriginalPrice ||
      !CourseLanguage ||
      !Duration ||
      !InstructorName ||
      !Category
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const existingCourse = await Course.findOne({ Slug });

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: "Course slug already exists",
      });
    }

    const course = await Course.create({
      CourseName,
      Slug,
      Description,
      CourseImage,
      DiscountPrice,
      OriginalPrice,
      CourseLanguage,
      Duration,
      TotalLectures,
      CourseLevel,
      CourseRating,
      TotalReviews,
      TotalStudents,
      Status,
      CertificateAvailable,
      InstructorName,
      Category,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Course By ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
