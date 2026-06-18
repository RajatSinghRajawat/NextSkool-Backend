const Student = require('../models/students');
const Course = require('../models/Course');
const Lead = require('../models/Lead');
const Payment = require('../models/Payment');

// Get Dashboard Data
const getDashboardStats = async (req, res) => {
  try {
    // 1. Get counts in parallel
    const [studentsCount, coursesCount, leadsCount] = await Promise.all([
      Student.countDocuments(),
      Course.countDocuments(),
      Lead.countDocuments()
    ]);

    // 2. Aggregate Total Revenue from completed payments
    const revenueData = await Payment.aggregate([
      { $match: { is_paid: true } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    // 3. Get recent 5 leads
    const recentLeads = await Lead.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // 4. Get recent 5 registered students
    const recentStudents = await Student.find()
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          students: studentsCount,
          courses: coursesCount,
          leads: leadsCount,
          revenue: totalRevenue
        },
        recentLeads,
        recentStudents
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboardStats
};
