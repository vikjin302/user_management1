const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../services/emailService');

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = crypto.randomBytes(3).toString('hex');

    const user = new User({ email, password: hashedPassword, name, otp });
    await user.save();

    const confirmationLink = `http://localhost:3000/confirm-email?otp=${otp}&email=${email}`;
    const emailSent = sendEmail(email, 'Email Confirmation', `Please confirm your email by clicking the following link: ${confirmationLink}`);

    if (emailSent) {
      res.status(200).json({ message: 'Signup successful. Please check your email to confirm your address' });
    } else {
      res.status(500).json({ message: 'Error sending confirmation email' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during signup' });
  }
};

const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    user.otp = otp;
    await user.save();

    const emailSent = sendEmail(email, 'Your OTP Code', `Your OTP code is ${otp}`);

    if (emailSent) {
      res.status(200).json({ message: 'OTP sent successfully' });
    } else {
      res.status(500).json({ message: 'Error sending OTP' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during OTP generation' });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email, otp });
    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.otp = null; // Clear OTP after successful verification
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'OTP verified successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error during OTP verification' });
  }
};

const confirmEmail = async (req, res) => {
  const { otp, email } = req.query;
  try {
    const user = await User.findOne({ email, otp });
    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.status(200).json({ message: 'Email confirmed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error during email confirmation' });
  }
};

module.exports = {
  signup,
  sendOtp,
  verifyOtp,
  confirmEmail,
};
