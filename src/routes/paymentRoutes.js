const express = require("express");
const router = express.Router();
const { createPayment, getPayments, getPaymentById, updatePayment } = require("../controllers/paymentController");

// Create a new payment
router.post("/", createPayment);
// Get all payments
router.get("/", getPayments);
// Get a payment by ID
router.get("/:id", getPaymentById);
// Update a payment by ID
router.put("/:id", updatePayment);
module.exports = router;