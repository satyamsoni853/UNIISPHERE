import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import Unispherelogo from './Unispherelogo.png';
import Background from '../Background/Background';
import './ForgotPassword.css';
import Toast from '../Common/Toast';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const navigate = useNavigate(); // Initialize the navigate function

  const showErrorToast = (message) => {
    setToastMessage(message);
    setToastType('error');
    setShowToast(true);
  };

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setToastType('success');
    setShowToast(true);
  };

  // Function to send OTP
  const sendOtp = async () => {
    try {
      const response = await axios.post('https://uniisphere-backend-latest.onrender.com/auth/forgot-password', { email });
      showSuccessToast(response.data.message || 'OTP sent successfully');
      setOtpSent(true);
    } catch (error) {
      showErrorToast(error.response?.data?.error || 'Failed to send OTP');
    }
  };

  // Function to reset password and navigate to "/"
  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      showErrorToast("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post('https://uniisphere-backend-latest.onrender.com/auth/reset-password', {
        email,
        otp,
        newPassword,
      });
      showSuccessToast(response.data.message || 'Password reset successfully');
      navigate("/"); // Navigate to home page after successful reset
    } catch (error) {
      showErrorToast(error.response?.data?.error || 'Failed to reset password');
    }
  };

  return (
    <div>
      <div className="login-wrapper-1">
        <Background />
        <img src={Unispherelogo} alt="Unisphere Logo-1" className="top-left-logo" />
        <div className="login-container-1">
          <h1 className="unisphere-title-container">
            <span className="u">U</span>
            <span className="n">N</span>
            <span className="i">I</span>
            <span className="i">I</span>
            <span className="s">S</span>
            <span className="p">P</span>
            <span className="h">H</span>
            <span className="e">E</span>
            <span className="r">R</span>
            <span className="e">E</span>
          </h1>
          <div className="Success-1"><h3>"Connect" "Collaborate" "Success"</h3></div>
        </div>
      </div>
      <div className="signup-Page-1">
        <Background />
        <div className="login-box">
          <div className="email-otp-container">
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
            />
            <button type="button" className="send-otp-btn login-singup-button  " onClick={sendOtp}>
              Send OTP
            </button>
          </div>
          {otpSent && (
            <>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="otp-input"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="password-input"
              />
              <input
                type="password"
                placeholder="Re-enter New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="password-input"
              />
              <button   type="button" className="reset-password-btn login-singup-button " onClick={resetPassword}>
                Reset Password
              </button>
            </>
          )}
        </div>
      </div>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        type={toastType}
      />
    </div>
  );
}

export default ForgotPassword;
