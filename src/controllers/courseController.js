const mongoose = require("mongoose");
const Course = require("../models/Course");

// create course
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

    if(!CourseName || !Slug || !Description || !CourseImage || !DiscountPrice || !OriginalPrice || !CourseLanguage || !Duration) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    
    const course = new Course({
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

    const savedCourse = await course.save();

    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get course by id
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
