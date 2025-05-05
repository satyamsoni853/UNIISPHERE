import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoReorderThreeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Background from "../Background/Background";
import Unispherelogo from "./Unispherelogo.png";
import "./Userloginfile.css";

function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://uniisphere-backend-latest.onrender.com/api/auth/login",
        { email, password }
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("AuthToken", token);
        console.log("Stored Auth Token:", token);

        const userId = response.data.user.id;
        console.log("User ID:", userId);
        console.log("Login User ID:", userId);
        const LoginuserId = userId;
        localStorage.setItem("LoginuserId", LoginuserId);
        localStorage.setItem("logMessage", `Login User ID: ${LoginuserId}`);

        console.log("Token:", token);

        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId);

        console.log("Authentication data saved:", {
          token: token.substring(0, 10) + "...",
          userId,
        });

        alert("Login Successful!");

        navigate("/View", {
          state: {
            userToken: token,
            userId: userId,
          },
        });
      }
    } catch (error) {
      alert(
        `Login Failed: ${
          error.response?.data?.message ||
          "An error occurred. Please try again."
        }`
      );
      console.error("Login Error:", error);
    } finally {
      setIsLoading(false); // Stop loading
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
        <Background />

        <div className="login-box">
          <label htmlFor="email">Email or Phone Number</label>
          <input
            id="email"
            type="text"
            placeholder="Enter your email or phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading} // Disable input during loading
          />

          <label htmlFor="password">Password (6+ Characters)</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading} // Disable input during loading
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="remember-container">
            <div className="mobile-forgot">
              <p>
                <Link to="/ForgotPassword">Forgot Password?</Link>
              </p>
            </div>
            <div className="Login-remember-me">
              <input type="checkbox" id="remember" disabled={isLoading} />
              <label htmlFor="remember">Remember Me</label>
            </div>
          </div>

          <p className="desktop-forgot">
            <Link to="/ForgotPassword">Forgot Password?</Link>
          </p>

          <p className="terms">
            By clicking Agree & Join or Continue, you agree to the Unisphere
            User Agreement, Privacy Policy, and Cookie Policy.
          </p>

          <div className="button-container">
            <button
              className="login-singup-button login-btn"
              type="button"
              onClick={handleLogin}
              disabled={isLoading} // Disable button during loading
            >
              {isLoading ? (
                <span className="loading-spinner">Loading...</span>
              ) : (
                "Login"
              )}
            </button>
          </div>

          <div className="or-divider">
            <span className="line"></span>
            Or with
            <span className="line"></span>
          </div>

          <div className="google-container">
            <button
              className="google-btn"
              style={{ display: "flex", alignItems: "center" }}
              disabled={isLoading} // Disable Google button during loading
            >
              <Link
                to="/GoogleLogin"
                style={{ display: "flex", alignItems: "center" }}
              >
                <FcGoogle className="google-icon" /> Google
              </Link>
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