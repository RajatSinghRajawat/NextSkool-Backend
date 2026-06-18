const express = require('express');
const router = express.Router();
const {
  getLeadAnalytics,
  getRevenueAnalytics,
  getCourseAnalytics
} = require('../controllers/analyticsController');

router.get('/leads', getLeadAnalytics);
router.get('/revenue', getRevenueAnalytics);
router.get('/courses', getCourseAnalytics);

module.exports = router;
