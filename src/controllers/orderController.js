const Order = require('../models/Order');
const Student = require('../models/students');
const Course = require('../models/Course');
const Payment = require('../models/Payment');

// Create Order (Initialize payment)
const createOrder = async (req, res) => {
  try {
    const { studentId, courseId, amount, couponApplied } = req.body;

    if (!studentId || !courseId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'studentId, courseId, and amount are required.'
      });
    }

    // Initialize Order
    const order = await Order.create({
      studentId,
      courseId,
      amount,
      couponApplied
    });

    // Also initialize corresponding Payment ledger record
    const payment = await Payment.create({
      student_id: studentId,
      amount,
      status: 'pending',
      is_paid: false
    });

    return res.status(201).json({
      success: true,
      message: 'Order created successfully.',
      data: { order, payment }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Payment and complete Order
const verifyOrderPayment = async (req, res) => {
  try {
    const { orderId, transactionId, paymentSuccess } = req.body;

    if (!orderId || !transactionId || paymentSuccess === undefined) {
      return res.status(400).json({
        success: false,
        message: 'orderId, transactionId, and paymentSuccess state are required.'
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    // Update Order payment status
    order.paymentStatus = paymentSuccess ? 'Completed' : 'Failed';
    order.transactionId = transactionId;
    await order.save();

    // Also update corresponding Payment record
    const payment = await Payment.findOne({ student_id: order.studentId, amount: order.amount, is_paid: false });
    if (payment) {
      payment.status = paymentSuccess ? 'successfully' : 'failed';
      payment.is_paid = paymentSuccess;
      payment.payment_date = paymentSuccess ? new Date() : null;
      payment.receipt = transactionId;
      await payment.save();
    }

    return res.status(200).json({
      success: true,
      message: paymentSuccess ? 'Payment completed successfully.' : 'Payment transaction failed.',
      data: order
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  verifyOrderPayment
};
