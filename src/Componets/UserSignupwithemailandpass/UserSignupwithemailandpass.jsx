import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import axios from "axios"; // Import axios
import Unispherelogo from "./Unispherelogo.png";
import Connectandsuccess from "./Success.png";
import Background from "../Background/Background";
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
      navigate("/AfterOtpSection1"); // Redirect to dashboard on success
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  return (
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
            <button type="submit">Send OTP</button>
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
            <button type="submit" className="otp-button">
              Continue
            </button>

            {/* Privacy Message */}
            <p className="privacy-message">
              Your Privacy is Important. We may send you member updates,
              recruiter messages, job suggestions, invitations, reminders, and
              promotional messages. You can change your preference anytime.
            </p>
          </form>
        )}

        {/* Already have an account */}
        <p className="Login-here-sentence">
          Already have an account? <a href="/">Login here</a>
        </p>

        {/* Error Message */}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default UserSignupwithemailandpass;
