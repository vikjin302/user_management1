const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../services/emailService');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = crypto.randomBytes(3).toString('hex');

  const user = new User({ email, password: hashedPassword, name, otp });
  await user.save();

  const confirmationLink = `http://localhost:3000/confirm-email?otp=${otp}&email=${email}`;
  const emailSent = sendEmail(email, 'Email Confirmation', `Please confirm your email by clicking the following link: ${confirmationLink}`);

  if (emailSent) {
    res.status(200).send('Signup successful. Please check your email to confirm your address');
  } else {
    res.status(500).send('Error sending confirmation email');
  }
});

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

  const user = await User.findOneAndUpdate({ email }, { otp }, { new: true, upsert: true });
  const emailSent = sendEmail(email, 'Your OTP Code', `Your OTP code is ${otp}`);

  if (emailSent) {
    res.status(200).send('OTP sent successfully');
  } else {
    res.status(500).send('Error sending OTP');
  }
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email, otp });

  if (!user) {
    return res.status(400).send('Invalid OTP');
  }

  user.otp = null; // Clear OTP after successful verification
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ message: 'OTP verified successfully', token });
});

router.get('/confirm-email', async (req, res) => {
  const { otp, email } = req.query;
  const user = await User.findOne({ email, otp });

  if (!user) {
    return res.status(400).send('Invalid OTP');
  }

  user.isVerified = true;
  user.otp = null;
  await user.save();

  res.status(200).send('Email confirmed successfully!');
});

module.exports = router;
