const Enrollment = require('../models/Enrollment');
const Student = require('../models/students');
const Course = require('../models/Course');

// Enroll Student in a Course
const enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    if (!studentId || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'Both studentId and courseId are required.'
      });
    }

    // 1. Verify Student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found.'
      });
    }

    // 2. Verify Course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.'
      });
    }

    // 3. Check for existing enrollment
    const existingEnrollment = await Enrollment.findOne({ studentId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Student is already enrolled in this course.'
      });
    }

    // 4. Create enrollment record
    const enrollment = await Enrollment.create({
      studentId,
      courseId
    });

    // 5. Update Student profile (add course to EnrolledCourses array)
    await Student.findByIdAndUpdate(studentId, {
      $addToSet: { EnrolledCourses: courseId }
    });

    // 6. Update Course statistics (increment TotalStudents count)
    await Course.findByIdAndUpdate(courseId, {
      $inc: { TotalStudents: 1 }
    });

    return res.status(201).json({
      success: true,
      message: 'Enrolled in course successfully.',
      data: enrollment
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all enrollments for a specific student
const getStudentEnrollments = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: 'studentId is required.'
      });
    }

    const enrollments = await Enrollment.find({ studentId }).populate('courseId');

    return res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Cancel an enrollment
const cancelEnrollment = async (req, res) => {
  try {
    const { enrollmentId } = req.params;

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment record not found.'
      });
    }

    // Update Student (remove course from EnrolledCourses)
    await Student.findByIdAndUpdate(enrollment.studentId, {
      $pull: { EnrolledCourses: enrollment.courseId }
    });

    // Update Course (decrement TotalStudents count)
    await Course.findByIdAndUpdate(enrollment.courseId, {
      $inc: { TotalStudents: -1 }
    });

    // Delete enrollment record
    await Enrollment.findByIdAndDelete(enrollmentId);

    return res.status(200).json({
      success: true,
      message: 'Enrollment cancelled successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  enrollStudent,
  getStudentEnrollments,
  cancelEnrollment
};
