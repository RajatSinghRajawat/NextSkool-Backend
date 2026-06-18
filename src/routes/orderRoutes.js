const express = require('express');
const router = express.Router();
const { createOrder, verifyOrderPayment } = require('../controllers/orderController');

router.post('/', createOrder);
router.post('/verify', verifyOrderPayment);

module.exports = router;
