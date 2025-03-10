import React, { useState } from "react";
import "./AfterOtpSection1.css";
import { Form, Button } from "react-bootstrap";
import Background from "../Background/Background.jsx";
import Unispherelogo from "./Unispherelogo.png";
import Connectandsuccess from "./success.png";
import axios from "axios";

function AfterOtpSection1() {
  // State for step control
  const [step, setStep] = useState(1);

  // State for first step (username, password)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");

  // State for second step (additional info)
  const [headline, setHeadline] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [projectLink, setProjectLink] = useState("");

  // State for third step (interests)
  const [searchInterest, setSearchInterest] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const interestSuggestions = [
    "Sketching", "Sprinting", "JAVA", "Modeling", "Dancing", 
    "Painting", "Crafting", "Gardening", "Driving"
  ];

  // State for fourth step (skills)
  const [searchSkill, setSearchSkill] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const skillSuggestions = [
    "HTML", "CSS", "JavaScript", "Java", "SQL", 
    "Python", "React", "Node.js", "MongoDB", "Git"
  ];

  // State for fifth step (profile picture)
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  // Handle first step submission
  const handleFirstStepSubmit = (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setStep(2); // Move to the next step
  };

  // Handle second step submission
  const handleSecondStepSubmit = (e) => {
    e.preventDefault();

    if (!headline || !gender || !about) {
      setError("All fields are required");
      return;
    }

    setError("");
    setStep(3); // Move to the next step
  };

  // Handle third step submission
  const handleThirdStepSubmit = (e) => {
    e.preventDefault();

    if (selectedInterests.length < 2) {
      setError("Please select at least 2 interests");
      return;
    }

    setError("");
    setStep(4); // Move to the next step
  };

  // Handle fourth step submission
  const handleFourthStepSubmit = (e) => {
    e.preventDefault();

    if (selectedSkills.length < 2) {
      setError("Please select at least 2 skills");
      return;
    }

    setError("");
    setStep(5); // Move to the next step
  };

  // Handle fifth step submission with API call
  const handleFifthStepSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("headline", headline);
    formData.append("gender", gender);
    formData.append("about", about);
    formData.append("projectLink", projectLink || ""); // Handle empty project link
    formData.append("interests", JSON.stringify(selectedInterests)); // Convert array to string
    formData.append("skills", JSON.stringify(selectedSkills)); // Convert array to string
    if (profilePicture) {
      formData.append("profilePicture", profilePicture); // Append file if exists
    }

    try {
      const response = await axios.post(
        "https://uniisphere-1.onrender.com/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Registration successful:", response.data);
      alert("Signup completed successfully!");
      // Optionally reset form or redirect user
    } catch (err) {
      setError("Registration failed: " + (err.response?.data?.message || err.message));
    }
  };

  // Handle skip
  const handleSkip = () => {
    setStep(5); // Move to the next step without uploading an image
    setProfilePicture(null); // Ensure no image is set if skipped
  };

  // Handle interest selection
  const handleInterestSelect = (interest) => {
    if (selectedInterests.includes(interest) || selectedInterests.length >= 5) return;
    setSelectedInterests([...selectedInterests, interest]);
    setSearchInterest(""); // Clear search after selection
  };

  // Handle interest removal
  const handleInterestRemove = (interest) => {
    setSelectedInterests(selectedInterests.filter(i => i !== interest));
  };

  // Handle skill selection
  const handleSkillSelect = (skill) => {
    if (selectedSkills.includes(skill) || selectedSkills.length >= 10) return; // Limit to 10 skills
    setSelectedSkills([...selectedSkills, skill]);
    setSearchSkill(""); // Clear search after selection
  };

  // Handle skill removal
  const handleSkillRemove = (skill) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  // Render first step form
  const renderFirstStep = () => (
    <Form onSubmit={handleFirstStepSubmit}>
      <Form.Group controlId="username" className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="password" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="rePassword" className="mb-3">
        <Form.Label>Re-enter Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Re-enter password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          required
        />
      </Form.Group>

      {error && <p className="error-text" style={{ color: "red" }}>{error}</p>}

      <Button variant="primary" type="submit" className="otp-btn">
        Sign Up
      </Button>
    </Form>
  );

  // Render second step form
  const renderSecondStep = () => (
    <Form onSubmit={handleSecondStepSubmit}>
      <Form.Group controlId="headline" className="mb-3">
        <Form.Label>Headline</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your headline (e.g., Software Developer)"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="gender" className="mb-3">
        <Form.Label>Gender</Form.Label>
        <Form.Select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="about" className="mb-3">
        <Form.Label>About</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Tell us about yourself"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="projectLink" className="mb-3">
        <Form.Label>Project Link</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter a project link (e.g., GitHub)"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
        />
      </Form.Group>

      {error && <p className="error-text" style={{ color: "red" }}>{error}</p>}

      <Button variant="primary" type="submit" className="otp-btn">
        Next
      </Button>
      <Button
        variant="secondary"
        className="otp-btn mt-2"
        onClick={() => setStep(1)}
      >
        Back
      </Button>
    </Form>
  );

  // Render third step form (Interests)
  const renderThirdStep = () => (
    <Form onSubmit={handleThirdStepSubmit}>
      <Form.Group controlId="interest" className="mb-3">
        <Form.Label>Interest*</Form.Label>
        <div className="interest-search">
          <Form.Control
            type="text"
            placeholder="Search your interest"
            value={searchInterest}
            onChange={(e) => setSearchInterest(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <p>Select up to 5 things which you are interested in. So that we can make your connection better.</p>
      </Form.Group>

      <div className="interest-suggestions">
        {interestSuggestions
          .filter(interest => 
            interest.toLowerCase().includes(searchInterest.toLowerCase()) && 
            !selectedInterests.includes(interest)
          )
          .map((interest, index) => (
            <Button
              key={index}
              variant="outline-primary"
              className="interest-btn"
              onClick={() => handleInterestSelect(interest)}
              disabled={selectedInterests.length >= 5}
            >
              {interest}
            </Button>
          ))}
      </div>

      <div className="selected-interests">
        {selectedInterests.map((interest, index) => (
          <span key={index} className="selected-interest">
            {interest} <span onClick={() => handleInterestRemove(interest)}>×</span>
          </span>
        ))}
      </div>

      {error && <p className="error-text" style={{ color: "red" }}>{error}</p>}

      <Button variant="primary" type="submit" className="otp-btn">
        Next
      </Button>
      <Button
        variant="secondary"
        className="otp-btn mt-2"
        onClick={() => setStep(2)}
      >
        Back
      </Button>
    </Form>
  );

  // Render fourth step form (Skills)
  const renderFourthStep = () => (
    <Form onSubmit={handleFourthStepSubmit}>
      <Form.Group controlId="skill" className="mb-3">
        <Form.Label>Skills*</Form.Label>
        <div className="skill-search">
          <Form.Control
            type="text"
            placeholder="Search your skills"
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <p>Select up to 10 skills you have. This will help us recommend better opportunities.</p>
      </Form.Group>

      <div className="skill-suggestions">
        {skillSuggestions
          .filter(skill => 
            skill.toLowerCase().includes(searchSkill.toLowerCase()) && 
            !selectedSkills.includes(skill)
          )
          .map((skill, index) => (
            <Button
              key={index}
              variant="outline-primary"
              className="skill-btn"
              onClick={() => handleSkillSelect(skill)}
              disabled={selectedSkills.length >= 10}
            >
              {skill}
            </Button>
          ))}
      </div>

      <div className="selected-skills">
        {selectedSkills.map((skill, index) => (
          <span key={index} className="selected-skill">
            {skill} <span onClick={() => handleSkillRemove(skill)}>×</span>
          </span>
        ))}
      </div>

      {error && <p className="error-text" style={{ color: "red" }}>{error}</p>}

      <Button variant="primary" type="submit" className="otp-btn">
        Next
      </Button>
      <Button
        variant="secondary"
        className="otp-btn mt-2"
        onClick={() => setStep(3)}
      >
        Back
      </Button>
    </Form>
  );

  // Render fifth step form (Profile Picture)
  const renderFifthStep = () => (
    <Form onSubmit={handleFifthStepSubmit}>
      <Form.Group controlId="profilePicture" className="mb-3">
        <Form.Label>Profile Picture</Form.Label>
        <div className="profile-circle">
          <label htmlFor="profile-input" className="circle-label">
            {previewImage ? (
              <img src={previewImage} alt="Profile Preview" className="circle-image" />
            ) : (
              <span className="upload-text">Choose File</span>
            )}
          </label>
          <input
            id="profile-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="form-control"
            style={{ display: "none" }} // Hide the default input
          />
        </div>
        <p className="image-note">
          In order to make your connection faster and easier add your profile picture.
        </p>
      </Form.Group>

      {error && <p className="error-text" style={{ color: "red" }}>{error}</p>}

      <Button variant="primary" type="submit" className="otp-btn">
        Complete Signup
      </Button>
      <Button
        variant="secondary"
        className="otp-btn mt-2"
        onClick={handleSkip}
      >
        Skip
      </Button>
      <Button
        variant="secondary"
        className="otp-btn mt-2"
        onClick={() => setStep(4)}
      >
        Back
      </Button>
    </Form>
  );

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

        <div className="otp-box">
          {/* Progress Indicator Inside the Box */}
          <div className="progress-indicator">
            <div className={`step ${step >= 1 ? "completed" : ""}`}>1</div>
            <div className={`step ${step >= 2 ? "completed" : ""}`}>2</div>
            <div className={`step ${step >= 3 ? "completed" : ""}`}>3</div>
            <div className={`step ${step >= 4 ? "completed" : ""}`}>4</div>
            <div className={`step ${step >= 5 ? "completed" : ""}`}>5</div>
          </div>

          <h5>
            {step === 1 ? "Create your account" : 
             step === 2 ? "Complete your profile" : 
             step === 3 ? "Select your interests" : 
             step === 4 ? "Add your skills" : 
             "Add your profile picture"}
          </h5>

          {step === 1 ? renderFirstStep() : 
           step === 2 ? renderSecondStep() : 
           step === 3 ? renderThirdStep() : 
           step === 4 ? renderFourthStep() : 
           renderFifthStep()}

          <p className="privacy-text">
            Your Privacy is Important <br />
            We may send you member uploads, recruiter messages, job suggestions,
            invitations, reminders, and promotional messages from us and our
            parents. You can change your preference anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AfterOtpSection1;