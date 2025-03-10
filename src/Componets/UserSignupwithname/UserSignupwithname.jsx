import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensures Bootstrap styling
import "./UserLoginwithname.css";
import Unispherelogo from "./Unispherelogo.png";
import Connectandsuccess from "./Success.png";
import Background from "../Background/Background";
import { FcGoogle } from "react-icons/fc";

function UserSignupwithname() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [isAbove16, setIsAbove16] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    const userData = {
      firstName,
      lastName,
      location,
      email,
      collegeName,
      degree,
      specialization,
      age: isAbove16 ? 16 : 0, // Ensures valid number instead of null
      isStudent,
    };

    try {
      const response = await axios.post(
        "https://uniisphere-1.onrender.com/auth/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("User registered successfully!");
      console.log("Response:", response.data);

      localStorage.setItem("userEmail", email);
      navigate("/UserSignupOtp"); // Navigate to OTP page
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
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
          <img
            src={Connectandsuccess}
            alt="Connect and Collaborate"
            className="subtitle"
          />
        </div>

        <div className="login-box">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>First Name</label>
          <input type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

          <label>Last Name</label>
          <input type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />

          <label>Location</label>
          <input type="text" placeholder="Enter your location" value={location} onChange={(e) => setLocation(e.target.value)} />

          <label>College/School Name</label>
          <input type="text" placeholder="Enter your college/school name" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} />

          <label>Degree</label>
          <input type="text" placeholder="Enter your degree" value={degree} onChange={(e) => setDegree(e.target.value)} />

          <label>Specialization</label>
          <input type="text" placeholder="Enter your specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />

          <Form>
            <div className="switch-container">
              <span>I am above 16 years</span>
              <Form.Check
                type="switch"
                id="age-switch"
                className="custom-switch"
                checked={isAbove16}
                onChange={(e) => setIsAbove16(e.target.checked)}
              />
            </div>
          </Form>

          <Form>
            <div className="switch-container">
              <span>I am a student</span>
              <Form.Check
                type="switch"
                id="student-switch"
                className="custom-switch"
                checked={isStudent}
                onChange={(e) => setIsStudent(e.target.checked)}
              />
            </div>
          </Form>

          <button className="continue-btn" onClick={handleSignup} disabled={loading}>
            {loading ? "Registering..." : "Continue"}
          </button>

          {error && <p className="error-msg">{error}</p>}

          <div className="or-divider">
            <span className="line"></span> Or with <span className="line"></span>
          </div>

          <div className="google-container">
            <button className="google-btn">
              <FcGoogle className="google-icon" /> Google
            </button>
          </div>

          <p className="signup-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSignupwithname;
