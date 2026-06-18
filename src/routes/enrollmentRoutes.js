const express = require('express');
const router = express.Router();
const {
  enrollStudent,
  getStudentEnrollments,
  cancelEnrollment
} = require('../controllers/enrollmentController');

router.post('/enroll', enrollStudent);
router.get('/student/:studentId', getStudentEnrollments);
router.delete('/:enrollmentId', cancelEnrollment);

module.exports = router;
