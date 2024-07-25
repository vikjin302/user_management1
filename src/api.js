import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL 

export const registerUser = (userData) => axios.post(`${API_BASE_URL}/api/auth/register`,userData);
export const verifyOtp = (otpData) => axios.post(`${API_BASE_URL}/api/auth/verify-otp`,otpData);
export const loginUser = (userData) => axios.post(`${API_BASE_URL}/api/auth/login`, userData);
export const otpLogin = (otpData) => axios.post(`${API_BASE_URL}/api/auth/otp-login`, otpData);
export const getProfile = (token) => axios.get(`${API_BASE_URL}/api/user/profile`, {
  headers: { Authorization: `Bearer ${token}` },
});
export const updateProfile = (token, profileData) => axios.put(`${API_BASE_URL}/api/user/profile`, profileData, {
  headers: { Authorization: `Bearer ${token}` },
});