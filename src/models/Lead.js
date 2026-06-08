const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    courseInterested: {
        type: String,
        required: true,
    },

    source: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ['New', 'Contacted', 'Qualified', 'Lost'],
        default: 'New',
    },

    assignedCounselor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    notes: {
        type: String,
    },

    followUpDate: {
        type: Date,
    },

    budget: {
        type: Number,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Lead', leadSchema);