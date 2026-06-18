const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

router.post("/", upload.single("CourseImage"), createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", upload.single("CourseImage"), updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;