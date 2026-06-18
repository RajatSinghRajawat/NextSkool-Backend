const Student = require('../models/students');
const Course = require('../models/Course');
const Lead = require('../models/Lead');
const Payment = require('../models/Payment');

// 1. Get Lead Analytics (Group by Status and Source)
const getLeadAnalytics = async (req, res) => {
  try {
    const [statusStats, sourceStats] = await Promise.all([
      Lead.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Lead.aggregate([
        { $group: { _id: '$source', count: { $sum: 1 } } }
      ])
    ]);

    return res.status(200).json({
      success: true,
      data: {
        byStatus: statusStats,
        bySource: sourceStats
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Get Revenue Analytics (Group by Month)
const getRevenueAnalytics = async (req, res) => {
  try {
    const revenueByMonth = await Payment.aggregate([
      { $match: { is_paid: true } },
      {
        $group: {
          _id: { $month: '$created_at' },
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return res.status(200).json({
      success: true,
      data: revenueByMonth
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Get Course Analytics (Enrolled Students by Course)
const getCourseAnalytics = async (req, res) => {
  try {
    const courseStats = await Course.find()
      .select('CourseName TotalStudents Category')
      .sort({ TotalStudents: -1 });

    return res.status(200).json({
      success: true,
      data: courseStats
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getLeadAnalytics,
  getRevenueAnalytics,
  getCourseAnalytics
};
