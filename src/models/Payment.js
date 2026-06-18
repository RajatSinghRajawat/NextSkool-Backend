const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
{
  User_id: {
    type: String,
    trim: true,
    default: null
  },

  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  order_id: {
    type: String,
    trim: true,
    default: null
  },

  is_paid: {
    type: Boolean,
    default: false
  },

  amount: {
    type: Number,
    required: true,
    min: 0
  },

  emi_discount: {
    type: Number,
    default: 0,
    min: 0
  },

  emi_type: {
    type: String,
    enum: ['monthly', 'quarterly', 'semester', 'yearly'],
    default: null
  },

  emi_number: {
    type: Number,
    default: 1,
    min: 1
  },

  total_emis: {
    type: Number,
    default: 1,
    min: 1
  },

  payment_date: {
    type: Date,
    default: null
  },

  emi_duedate: {
    type: Date,
    default: null
  },

  currency: {
    type: String,
    trim: true,
    uppercase: true,
    default: 'INR'
  },

  receipt: {
    type: String,
    trim: true,
    default: null
  },

  status: {
    type: String,
    enum: ['failed', 'successfully', 'pending'],
    default: 'pending'
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}
);

module.exports = mongoose.model('Payment', paymentSchema);