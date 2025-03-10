import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link for navigation
import axios from "axios"; // API requests
import './UserSignupOtp.css';
import { Form, Button } from "react-bootstrap";
import Background from '../Background/Background.jsx';
import Unispherelogo from "./Unispherelogo.png";
import Connectandsuccess from "./success.png";

function UserSignupOtp() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [userEmail, setUserEmail] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = async (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value.slice(0, 1);
    setOtp(newOtp);

    if (e.target.nextSibling && e.target.value) {
      e.target.nextSibling.focus();
    }

    // Auto-submit when all 6 digits are entered
    if (newOtp.every((digit) => digit !== "")) {
      await verifyOtp(newOtp.join(""));
    }
  };

  const verifyOtp = async (enteredOtp) => {
    try {
      const response = await axios.post("https://uniisphere-1.onrender.com/auth/verifyOtp", {
        email: userEmail,
        otp: enteredOtp,
      });

      if (response.data.success) {
        alert("OTP Verified Successfully!");
        navigate("/dashboard"); // Redirect on success
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert("Error verifying OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    try {
      await axios.post("https://uniisphere-1.onrender.com/auth/resend-otp", { email: userEmail });
      alert("OTP resent successfully!");
      setTimer(30);
      setCanResend(false);
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("Failed to resend OTP.");
    }
  };

  const maskEmail = (email) => {
    if (!email) return "********@*****.com";
    const parts = email.split("@");
    const maskedPart = parts[0].slice(0, 2) + "*****";
    return `${maskedPart}@${parts[1]}`;
  };

  return (
    <div className="login-wrapper">
      <Background />
      <img src={Unispherelogo} alt="Unisphere Logo" className="top-left-logo" />
      <div className="login-container">
        <div className="title-section">
          <h1 className="unisphere-title">
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
          <img src={Connectandsuccess} alt="Connect and Collaborate" className="subtitle" />
        </div>

        <div className="otp-box">
          <h5>Confirm your email</h5>
          <p>We have sent a 6-digit verification code to</p>
          <p className="email-text">{maskEmail(userEmail)}</p>

          <div className="otp-input-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                className="otp-input"
                maxLength="1"
              />
            ))}
          </div>

          <Link to="/AfterOtpSection1">
            <Button
              variant="primary"
              className="otp-btn"
              disabled={otp.some(digit => digit === "")}
            >
              Continue
            </Button>
          </Link>
          
          <Button
            variant="secondary"
            className="otp-btn"
            onClick={handleResendOtp}
            disabled={!canResend}
          >
            {canResend ? "Resend OTP" : `Resend OTP (${timer}s)`}
          </Button>

          <p className="privacy-text">
            Your Privacy is Important <br />
            We may send you member updates, recruiter messages, job suggestions, invitations, reminders, and promotional messages from us and our parents. You can change your preference anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSignupOtp;
