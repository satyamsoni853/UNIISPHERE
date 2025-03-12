import React, { useState } from "react";
import "./AfterOtpSection1.css";
import { Form, Button } from "react-bootstrap";
import Background from "../Background/Background.jsx";
import Unispherelogo from "./Unispherelogo.png";
import Connectandsuccess from "./success.png";
import axios from "axios";
import UNIISPHERELOGO from '../UNIISPHERELOGO/UNIISPHERELOGO.jsx'

function AfterOtpSection1() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  // State for Step 1
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Added email
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  // State for Step 2 (Basic Personal Info)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");

  // State for Step 3 (Education/Work + Headline)
  const [headline, setHeadline] = useState("");
  const [college, setCollege] = useState("");
  const [degree, setDegree] = useState("");
  const [workorProject, setWorkorProject] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  // State for Step 4 (Interests)
  const [searchInterest, setSearchInterest] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const interestSuggestions = [
    "Sketching", "Sprinting", "JAVA", "Modeling", "Dancing",
    "Painting", "Crafting", "Gardening", "Driving",
  ];

  // State for Step 5 (Skills)
  const [searchSkill, setSearchSkill] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const skillSuggestions = [
    "HTML", "CSS", "JavaScript", "Java", "SQL",
    "Python", "React", "Node.js", "MongoDB", "Git",
  ];

  // State for Step 6 (About, Location)
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");

  // State for Step 8 (Profile Picture URL)
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  // Step Handlers
  const handleFirstStepSubmit = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSecondStepSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !gender) {
      setError("All required fields must be filled");
      return;
    }
    setError("");
    setStep(3);
  };

  const handleThirdStepSubmit = (e) => {
    e.preventDefault();
    if (!headline) {
      setError("Headline is required");
      return;
    }
    setError("");
    setStep(4);
  };

  const handleFourthStepSubmit = (e) => {
    e.preventDefault();
    if (selectedInterests.length < 2) {
      setError("Please select at least 2 interests");
      return;
    }
    setError("");
    setStep(5);
  };

  const handleFifthStepSubmit = (e) => {
    e.preventDefault();
    if (selectedSkills.length < 2) {
      setError("Please select at least 2 skills");
      return;
    }
    setError("");
    setStep(6);
  };

  const handleSixthStepSubmit = (e) => {
    e.preventDefault();
    if (!about) {
      setError("About section is required");
      return;
    }
    setError("");
    setStep(7);
  };

  const handleSeventhStepSubmit = (e) => {
    e.preventDefault();
    setError("");
    setStep(8);
  };

  const handleEighthStepSubmit = (e) => {
    e.preventDefault();
    setError("");
    setStep(9);
  };

  const handleNinthStepSubmit = async (e) => {
    e.preventDefault();
    console.log("Starting profile submission...");

    // Convert startYear and endYear to integers or null
    const parsedStartYear = startYear ? parseInt(startYear, 10) : null;
    const parsedEndYear = endYear ? parseInt(endYear, 10) : null;

    const userData = {
      username: username || null,
      email: email || "", // Required field
      PhoneNumber: phoneNumber || null,
      passwordHash: password, // Backend should hash this
      firstName: firstName || null,
      lastName: lastName || null,
      Gender: gender || null,
      profilePictureUrl: profilePictureUrl || null,
      headline: headline || null,
      location: location || null,
      Skills: selectedSkills,
      Interests: selectedInterests,
      workorProject: workorProject || null,
      About: about || null,
      college: college || null,
      degree: degree || null,
      startYear: parsedStartYear,
      endYear: parsedEndYear,
    };

    try {
      console.log("Submitting user data:", userData);
      const response = await axios.post(
        "https://uniisphere-1.onrender.com/auth/completeProfile",
        userData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Profile completion successful:", response.data);
      alert("Profile completed successfully!");
    } catch (err) {
      console.error("Error details:", err.response || err.message);
      setError(
        "Profile completion failed: " +
        (err.response?.data?.message || err.message)
      );
    }
  };

  const handleSkip = async () => {
    const syntheticEvent = { preventDefault: () => {} };
    await handleNinthStepSubmit(syntheticEvent);
  };

  // Interest and Skill Handlers
  const handleInterestSelect = (interest) => {
    if (selectedInterests.includes(interest) || selectedInterests.length >= 5) return;
    setSelectedInterests([...selectedInterests, interest]);
    setSearchInterest("");
  };

  const handleInterestRemove = (interest) => {
    setSelectedInterests(selectedInterests.filter((i) => i !== interest));
  };

  const handleSkillSelect = (skill) => {
    if (selectedSkills.includes(skill) || selectedSkills.length >= 10) return;
    setSelectedSkills([...selectedSkills, skill]);
    setSearchSkill("");
  };

  const handleSkillRemove = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  // Render Steps
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
      <Form.Group controlId="email" className="mb-3">
        <Form.Label>Email*</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <Button variant="primary" type="submit" className="otp-btn">Sign Up</Button>
    </Form>
  );

  const renderSecondStep = () => (
    <Form onSubmit={handleSecondStepSubmit}>
      <Form.Group controlId="firstName" className="mb-3">
        <Form.Label>First Name*</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="lastName" className="mb-3">
        <Form.Label>Last Name*</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="phoneNumber" className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="gender" className="mb-3">
        <Form.Label>Gender*</Form.Label>
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
      {error && <p className="error-text" style={{ color: "red" }}>{error}</p>}
      <Button variant="primary" type="submit" className="otp-btn">Next</Button>
      <Button variant="secondary" className="otp-btn mt-2" onClick={() => setStep(1)}>Back</Button>
    </Form>
  );

  const renderThirdStep = () => (
    <Form onSubmit={handleThirdStepSubmit}>
      <Form.Group controlId="headline" className="mb-3">
        <Form.Label>Headline*</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your headline (e.g., Software Developer)"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="college" className="mb-3">
        <Form.Label>College</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your college name"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="degree" className="mb-3">
        <Form.Label>Degree</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your degree (e.g., B.Tech)"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="workorProject" className="mb-3">
        <Form.Label>Work or Project</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter work or project title"
          value={workorProject}
          onChange={(e) => setWorkorProject(e.target.value)}
        />
      </Form.Group>
      <div className="year-of-clg">
        <Form.Group controlId="startYear" className="mb-3">
          <Form.Label>Start Year</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter start year"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            min="1900"
            max={new Date().getFullYear()}
          />
        </Form.Group>
        <Form.Group controlId="endYear" className="mb-3">
          <Form.Label>End Year</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter end year"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            min="1900"
            max={new Date().getFullYear() + 10}
          />
        </Form.Group>
      </div>
      {error && <p className="error-text" style={{ color: "red" }}>{error}</p>}
      <Button variant="primary" type="submit" className="otp-btn">Next</Button>
      <Button variant="secondary" className="otp-btn mt-2" onClick={() => setStep(2)}>Back</Button>
    </Form>
  );

  const renderFourthStep = () => (
    <Form onSubmit={handleFourthStepSubmit}>
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
        <p>Select up to 5 things which you are interested in.</p>
      </Form.Group>
      <div className="interest-suggestions">
        {interestSuggestions
          .filter((interest) => interest.toLowerCase().includes(searchInterest.toLowerCase()) && !selectedInterests.includes(interest))
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
      <Button variant="primary" type="submit" className="otp-btn">Next</Button>
      <Button variant="secondary" className="otp-btn mt-2" onClick={() => setStep(3)}>Back</Button>
    </Form>
  );

  const renderFifthStep = () => (
    <Form onSubmit={handleFifthStepSubmit}>
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
        <p>Select up to 10 skills you have.</p>
      </Form.Group>
      <div className="skill-suggestions">
        {skillSuggestions
          .filter((skill) => skill.toLowerCase().includes(searchSkill.toLowerCase()) && !selectedSkills.includes(skill))
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
      <Button variant="primary" type="submit" className="otp-btn">Next</Button>
      <Button variant="secondary" className="otp-btn mt-2" onClick={() => setStep(4)}>Back</Button>
    </Form>
  );

  const renderSixthStep = () => (
    <Form onSubmit={handleSixthStepSubmit}>
      <Form.Group controlId="about" className="mb-3">
        <Form.Label>About*</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Tell us about yourself"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="location" className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your location (e.g., New York, NY)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Form.Group>
      {error && <p className="error-text" style={{ color: "red" }}>{error}</p>}
      <Button variant="primary" type="submit" className="otp-btn">Next</Button>
      <Button variant="secondary" className="otp-btn mt-2" onClick={() => setStep(5)}>Back</Button>
    </Form>
  );

  const renderSeventhStep = () => (
    <Form onSubmit={handleSeventhStepSubmit}>
      <p>Review your information before proceeding.</p>
      {error && <p className="error-text" style={{ color: "red" }}>{error}</p>}
      <Button variant="primary" type="submit" className="otp-btn">Next</Button>
      <Button variant="secondary" className="otp-btn mt-2" onClick={() => setStep(6)}>Back</Button>
    </Form>
  );

  const renderEighthStep = () => (
    <Form onSubmit={handleEighthStepSubmit}>
      <Form.Group controlId="profilePictureUrl" className="mb-3">
        <Form.Label>Profile Picture URL (Optional)</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter the URL of your profile picture (e.g., https://example.com/image.jpg)"
          value={profilePictureUrl}
          onChange={(e) => setProfilePictureUrl(e.target.value)}
        />
        {profilePictureUrl && (
          <div className="profile-preview mt-2">
            <img
              src={profilePictureUrl}
              alt="Profile Preview"
              className="circle-image"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
              onError={() => setError("Invalid image URL")}
            />
          </div>
        )}
        <p className="image-note">Add a URL to your profile picture.</p>
      </Form.Group>
      {error && <p className="error-text" style={{ color: "red" }}>{error}</p>}
      <Button variant="primary" type="submit" className="otp-btn">Next</Button>
      <Button variant="secondary" className="otp-btn mt-2" onClick={() => setStep(7)}>Back</Button>
    </Form>
  );

  const renderNinthStep = () => (
    <Form onSubmit={handleNinthStepSubmit}>
      <p>Final step: Submit your profile.</p>
      {error && <p className="error-text" style={{ color: "red" }}>{error}</p>}
      <Button variant="primary" type="submit" className="otp-btn">Complete Profile</Button>
      <Button variant="secondary" className="otp-btn mt-2" onClick={handleSkip}>Skip</Button>
      <Button variant="secondary" className="otp-btn mt-2" onClick={() => setStep(8)}>Back</Button>
    </Form>
  );

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
          <h1 className="unisphere-title-1">
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
            <span>"Collbrate"</span>
            <span>"Success"</span>
          </h3>
        </div>
      </div>
    </div>
      <div className="signup-Page-1">
      <Background />
      
      <div className="otp-box">
        <div className="progress-indicator">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => (
            <div key={s} className={`step ${step >= s ? "completed" : ""}`}>{s}</div>
          ))}
        </div>
        {step === 1 ? renderFirstStep() :
         step === 2 ? renderSecondStep() :
         step === 3 ? renderThirdStep() :
         step === 4 ? renderFourthStep() :
         step === 5 ? renderFifthStep() :
         step === 6 ? renderSixthStep() :
         step === 7 ? renderSeventhStep() :
         step === 8 ? renderEighthStep() :
         renderNinthStep()}
        <p className="privacy-text">
          Your Privacy is Important <br />
          We may send you member uploads, recruiter messages, job suggestions,
          invitations, reminders, and promotional messages from us and our parents.
          You can change your preference anytime.
        </p>
      </div>
    </div>
    </div>
  );
}

export default AfterOtpSection1;