const express = require('express');
const { register, login, logout } = require('../controllers/authController');

const router = express.Router();

router.post('/sign_up', register);
router.post('/sign_in', login);
router.post('/sign_out', logout);

module.exports = router;