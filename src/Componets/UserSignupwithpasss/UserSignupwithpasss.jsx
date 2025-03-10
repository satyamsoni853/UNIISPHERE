/* eslint-disable no-undef */
import React, { useState } from "react";
import axios from "axios";
import './UserSignupwithpasss.css'
import Unispherelogo from "./Unispherelogo.png";
import Connectandsuccess from "./Success.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Background from "../Background/Background";
import { FcGoogle } from "react-icons/fc";

function UserSignupwithpasss() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (password !== reenterPassword) {
      setError("Passwords do not match");
      return;
    }
    setError(""); // Clear error if passwords match

    try {
      const response = await axios.post(
        "https://uniisphere-1.onrender.com/auth/register",
        { email, password }
      );
      console.log("Signup successful:", response.data);
      alert("Signup successful!");
    } catch (error) {
      console.error("Signup error:", error);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <Background /> {/* Background Component */}
      {/* Top-left Logo */}
      <img src={Unispherelogo} alt="Unisphere Logo" className="top-left-logo" />
      <div className="login-container">
        {/* Title Section */}
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
          <img
            src={Connectandsuccess}
            alt="Connect Collaborate Success"
            className="subtitle"
          />
        </div>

        {/* Signup Box */}
        <div className="login-box">
          <label>Email or Phone Number</label>
          <input
            type="text"
            placeholder="Enter your email or phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password (6+ Characters)</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <label>Re-enter Password</label>
          <div className="password-field">
            <input
              type={showReenterPassword ? "text" : "password"}
              placeholder="Re-enter password"
              value={reenterPassword}
              onChange={(e) => setReenterPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowReenterPassword(!showReenterPassword)}
            >
              {showReenterPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <p className="error-message">{error}</p>}

          {/* Terms & Conditions */}
          <p className="terms">
            By clicking Agree & Join or Continue, you agree to the Unisphere
            User Agreement, Privacy Policy, and Cookie Policy.
          </p>

          {/* Signup Button */}
          <button className="login-btn" onClick={handleSignup}>
            Continue
          </button>

          {/* OR Divider */}
          <div className="or-divider">
            <span className="line"></span>
            Or with
            <span className="line"></span>
          </div>

          {/* Google Signup */}
          <div className="google-container">
            <button className="google-btn">
              <FcGoogle className="google-icon" /> Google
            </button>
          </div>

          {/* Login Link */}
          <p className="signup-text">
            Already have an account? <a href="#">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSignupwithpasss;
