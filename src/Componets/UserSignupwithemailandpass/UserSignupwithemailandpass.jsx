import axios from "axios"; // Import axios
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import Background from "../Background/Background";
import Unispherelogo from "./Unispherelogo.png";
import "./UserSignupwithemailandpass.css"; // Optional: for styling

function UserSignupwithemailandpass() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Register, 2: Verify OTP
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

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
      setStep(2); // Move to OTP verification step
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

    try {
      const response = await axios.post(
        "https://uniisphere-1.onrender.com/auth/verifyOtp",
        { email, otp }
      );
      console.log("OTP verified:", response.data);
      
      // Extract and verify token
      const token = response.data.tempToken;
      
      if (!token) {
        setError("No authentication token received from server. Please try again.");
        return;
      }
      
      console.log("Token received successfully:", token.substring(0, 10) + "...");
      
      // Pass it in the navigation state
      navigate("/AfterOtpSection1", { 
        state: { 
          email, 
          username, 
          token 
        } 
      });
    } catch (err) {
      console.error("OTP verification error:", err);
      setError(err.response?.data?.error || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div>
      <div className="login-wrapper-1">
        <Background />

        {/* Left-side Unisphere Logo */}
        <img
          src={Unispherelogo}
          alt="Unisphere Logo-1"
          className="top-left-logo"
        />

        {/* Container for Title and Success Image */}
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
              <span>"Collbrate" </span>
              <span>"Succeed"</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="signup-Page-1">
        <div className="UserSignupwithemailandpass-container">
          <Background />
          {/* Step 1: Email and Username Input */}
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

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="otp-container">
              <h2>Confirm your email</h2>
              <p>We have sent a 6-digit verification code to {email}</p>

              {/* OTP Input Boxes */}
              <div className="otp-input-container">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="otp-input"
                    value={otp[index] || ""}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[index] = e.target.value;
                      setOtp(newOtp.join(""));
                    }}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <button className="login-singup-button" type="submit">
                Continue
              </button>

              {/* Privacy Message */}
            </form>
          )}

          {/* Already have an account */}
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

          {/* Error Message */}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default UserSignupwithemailandpass;