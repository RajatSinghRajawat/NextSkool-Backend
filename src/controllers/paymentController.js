const express = require("express");
const Payment = require("../models/Payment");

const createPayment = async (req, res) => {
    try {
        const {User_id, student_id, order_id, is_paid, amount, emi_discount, emi_type, emi_number, total_emis, payment_date} = req.body;
        const payment = new Payment({
            User_id,
            student_id,
            order_id,
            is_paid,
            amount,
            emi_discount,
            emi_type,
            emi_number,
            total_emis,
            payment_date
        });
        await payment.save();
        res.status(201).json({message: "Payment created successfully", payment});
    } catch (error) {
        console.error("Error creating payment:", error);
        res.status(500).json({message: "Payment not created", error: error.message});
    }
};

const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('student_id', 'name email');
        res.status(200).json({message: "Payments retrieved successfully", payments});
    } catch (error) {
        console.error("Error retrieving payments:", error);
        res.status(500).json({message: "Payments not retrieved", error: error.message});
    }
};

const getPaymentById = async (req, res) => {
    try {
        const {id} = req.params;
        const payment = await Payment.findById(id).populate('student_id', 'name email');
        if (!payment) {
            return res.status(404).json({message: "Payment not found"});
        }
        res.status(200).json({message: "Payment retrieved successfully", payment});
    } catch (error) {
        console.error("Error retrieving payment:", error);
        res.status(500).json({message: "Payment not retrieved", error: error.message});
    }
};

const updatePayment = async (req, res) => {
    try{
        const {id} = req.params;
        const {User_id, student_id, order_id, is_paid, amount, emi_discount, emi_type, emi_number, total_emis, payment_date} = req.body;
        const payment = await Payment.findByIdAndUpdate(id, {
            User_id,
            student_id,
            order_id,
            is_paid,
            amount,
            emi_discount,  
            emi_type,
            emi_number,
            total_emis, 
            payment_date
        }, {new: true});
        if(!payment){   
            return res.status(404).json({message: "Payment not found"});
        }
        res.status(200).json({message: "Payment updated successfully", payment});
    } catch (error) {
        console.error("Error updating payment:", error);
        res.status(500).json({message: "Payment not updated", error: error.message});
    }
};

module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment
};