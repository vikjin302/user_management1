const express = require('express');
const { signup, sendOtp, verifyOtp, confirmEmail } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/confirm-email', confirmEmail);

module.exports = router;
