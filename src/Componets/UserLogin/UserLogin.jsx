import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Userloginfile.css";
import { Link } from "react-router-dom";
import Unispherelogo from "./Unispherelogo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Background from "../Background/Background";
import { FcGoogle } from "react-icons/fc";
import { IoReorderThreeOutline } from "react-icons/io5";

function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }

    try {
      const response = await axios.post(
        "https://uniisphere-1.onrender.com/auth/login",
        { email, password }
      );

      if (response.status === 200) {
        alert("Login Successful!");
        navigate("/DecktopView"); // Redirect after successful login
      }
    } catch (error) {
      alert(
        `Login Failed: ${
          error.response?.data?.message ||
          "An error occurred. Please try again."
        }`
      );
      console.error("Login Error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    // Implement Google login logic here
  };

  return (
    <div>
      <div className="login-wrapper-1">
        <Background />

        {/* Left-side Unisphere Logo */}
        <div className="top-left-container">
         <div>
         <img
            src={Unispherelogo}
            alt="Unisphere Logo-1"
            className="top-left-logo"
          />
         </div>
          <div>
          <IoReorderThreeOutline className="top-menu-icon" />
          </div>
        </div>

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
          <div className="Success-1">
            <h3>
              <span>"Connect" </span>
              <span>"Collbrate" </span>
              <span>"Succeed"</span>
            </h3>
          </div>
        </div>
      </div>
      <div className="signup-Page-1">
        <Background />

        <div className="login-box">
          <label htmlFor="email">Email or Phone Number</label>
          <input
            id="email"
            type="text"
            placeholder="Enter your email or phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password (6+ Characters)</label>
          <div className="password-field">
            <input
              id="password"
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

          <div className="remember-container">
            <div>
              <input type="checkbox" id="remember" />
            </div>
            <div className="remember-me">
              <label htmlFor="remember">Remember Me</label>
            </div>
          </div>
          <p>
            <Link to="/ForgotPassword">Forgot Password?</Link>
          </p>

          <p className="terms">
            By clicking Agree & Join or Continue, you agree to the Unisphere
            User Agreement, Privacy Policy, and Cookie Policy.
          </p>

          <div className="button-container">
            <button className="login-singup-button "  type="button" className="login-btn" onClick={handleLogin}>
              Continue
            </button>
          </div>

          <div className="or-divider">
            <span className="line"></span>
            Or with
            <span className="line"></span>
          </div>

          <div className="google-container">
            <button  className="google-btn" onClick={handleGoogleLogin}>
              <FcGoogle className="google-icon" /> Google
            </button>
          </div>

          <p className="signup-text">
            Create an account on Unisphere{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
