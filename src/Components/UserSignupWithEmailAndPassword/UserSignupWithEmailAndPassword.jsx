import axios from "axios";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../Background/Background";
import Unispherelogo from "./Unispherelogo.png";
import "./UserSignupWithEmailAndPassword.css";

function UserSignupwithemailandpass() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState(Array(6).fill("")); // Array to store 6 digits
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const inputRefs = useRef([]); // Refs for OTP input boxes

  // Handle registration and OTP sending
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://uniisphere-1.onrender.com/auth/register",
        { email, username }
      );
      console.log("OTP sent:", response.data);
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send OTP. Please check your email and username."
      );
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    const otpString = otp.join(""); // Combine OTP digits
    try {
      const response = await axios.post(
        "https://uniisphere-1.onrender.com/auth/verifyOtp",
        { email, otp: otpString }
      );
      console.log("OTP verified:", response.data);

      const token = response.data.tempToken;
      if (!token) {
        setError("No authentication token received from server. Please try again.");
        return;
      }

      console.log("Token received successfully:", token.substring(0, 10) + "...");
      navigate("/AfterOtpSection1", {
        state: { email, username, token },
      });
    } catch (err) {
      console.error("OTP verification error:", err);
      setError(err.response?.data?.error || "Invalid OTP. Please try again.");
    }
  };

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    // Only allow single digit
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if a digit is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle key events (e.g., backspace)
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5].focus(); // Focus on the last input
    }
    e.preventDefault();
  };

  return (
    <div>
      <div className="login-wrapper-1">
        <Background />
        <img
          src={Unispherelogo}
          alt="Unisphere Logo-1"
          className="top-left-logo"
        />
        <div className="login-container-1">
          <div>
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
          </div>
          <div className="Succeed-1">
            <h3>
              <span>"Connect" </span>
              <span>"Collaborate" </span>
              <span>"Succeed"</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="signup-Page-1">
        <div className="UserSignupwithemailandpass-container">
          <Background />
          {step === 1 && (
            <form onSubmit={handleRegister} className="Signup-form">
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                />
              </div>
              <button className="login-singup-button" type="submit">
                Send OTP
              </button>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="otp-container">
              <h2>Confirm your email</h2>
              <p>We have sent a 6-digit verification code to {email}</p>
              <div className="otp-input-container" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="otp-input"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    autoFocus={index === 0} // Auto-focus first input
                  />
                ))}
              </div>
              <button className="login-singup-button" type="submit">
                Continue
              </button>
            </form>
          )}
          <div className="Login-here-sentence">
            <p>
              Already have an account? <a href="/">Login here</a>
            </p>
            <p>Your Privacy Is Important</p>
            <p>
              We may send you member updates, recruiter message, job
              suggestions, invitations, reminder and promotional messages from
              us and our parents. You can change your preference anytime.
            </p>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default UserSignupwithemailandpass;