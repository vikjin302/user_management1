import axios from 'axios';

const API_URL = 'http://localhost:3000';  // Replace with your backend URL

export const signup = (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};

export const loginOtp = (otpData) => {
  return axios.post(`${API_URL}/login-otp`, otpData);
};

export const fetchProfile = () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateProfile = (profileData) => {
  const token = localStorage.getItem('token');
  return axios.put(`${API_URL}/profile`, profileData, { headers: { Authorization: `Bearer ${token}` } });
};
