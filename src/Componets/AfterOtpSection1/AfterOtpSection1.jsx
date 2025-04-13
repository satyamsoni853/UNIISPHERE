import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Background from "../Background/Background.jsx";
import "./AfterOtpSection1.css";
import Unispherelogo from "./Unispherelogo.png";

function AfterOtpSection1() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract state from location with fallback
  const { email: passedEmail, username: passedUsername, token: passedToken } = location.state || {};

  // Debug token presence
  useEffect(() => {
    if (!passedToken) {
      console.warn("Warning: No token received from previous page");
    } else {
      console.log("Token received successfully:", passedToken);
    }
  }, [passedToken]);

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState(passedToken || "");
  const [userId, setUserId] = useState(null); // Added to store userId from backend if available

  // State for Step 1 (Pre-filled with passed data)
  const [username, setUsername] = useState(passedUsername || "");
  const [email, setEmail] = useState(passedEmail || "");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  // State for Step 2 (Basic Personal Info)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Gender, setGender] = useState("");

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
    "Sketching",
    "Sprinting",
    "JAVA",
    "Modeling",
    "Dancing",
    "Painting",
    "Crafting",
    "Gardening",
    "Driving",
  ];

  // State for Step 5 (Skills)
  const [searchSkill, setSearchSkill] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const skillSuggestions = [
    "HTML",
    "CSS",
    "JavaScript",
    "Java",
    "SQL",
    "Python",
    "React",
    "Node.js",
    "MongoDB",
    "Git",
  ];

  // State for Step 6 (About, Location)
  const [About, setAbout] = useState("");
  const [userLocation, setUserLocation] = useState("");

  // State for Step 8 (Profile Picture Upload)
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Step Handlers
  const handleFirstStepSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (password !== rePassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }
    if (!username || !email || !password || !rePassword) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }
    console.log(
      "Step 1 - Registration:",
      JSON.stringify({ username, email, password, rePassword }, null, 2)
    );
    setError("");
    setStep(2);
    setIsSubmitting(false);
  };

  const handleSecondStepSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (!firstName || !lastName || !Gender) {
      setError("All required fields must be filled");
      setIsSubmitting(false);
      return;
    }
    console.log(
      "Step 2 - Personal Info:",
      JSON.stringify({ firstName, lastName, PhoneNumber, Gender }, null, 2)
    );
    setError("");
    setStep(3);
    setIsSubmitting(false);
  };

  const handleThirdStepSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (!headline) {
      setError("Headline is required");
      setIsSubmitting(false);
      return;
    }
    console.log(
      "Step 3 - Education/Work:",
      JSON.stringify(
        { headline, college, degree, workorProject, startYear, endYear },
        null,
        2
      )
    );
    setError("");
    setStep(4);
    setIsSubmitting(false);
  };

  const handleFourthStepSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    console.log(
      "Step 4 - Interests:",
      JSON.stringify({ selectedInterests }, null, 2)
    );
    setError("");
    setStep(5);
    setIsSubmitting(false);
  };

  const handleFifthStepSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    console.log(
      "Step 5 - Skills:",
      JSON.stringify({ selectedSkills }, null, 2)
    );
    setError("");
    setStep(6);
    setIsSubmitting(false);
  };

  const handleSixthStepSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (!About) {
      setError("About section is required");
      setIsSubmitting(false);
      return;
    }
    console.log(
      "Step 6 - About/Location:",
      JSON.stringify({ About, location: userLocation }, null, 2)
    );
    setError("");
    setStep(7);
    setIsSubmitting(false);
  };

  const handleSeventhStepSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    console.log("Step 7 - Review: All previous data");
    setError("");
    setStep(8);
    setIsSubmitting(false);
  };

  const handleEighthStepSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    console.log("Step 8 - Profile Picture Selected:", profilePicture?.name || "None");
    setError("");
    setStep(9);
    setIsSubmitting(false);
  };

  // Helper function to resize and compress image
  const resizeAndCompressImage = (file) => {
    return new Promise((resolve, reject) => {
      const maxWidth = 500;
      const maxHeight = 500;
      const quality = 0.7;

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const resizedBase64 = canvas.toDataURL("image/jpeg", quality);
          resolve(resizedBase64);
        };
        img.onerror = (error) => reject(error);
        img.src = event.target.result;
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleNinthStepSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    console.log("Starting profile submission...");

    if (!token) {
      setError("Authentication token is missing. Please go back to the login page and try again.");
      setIsSubmitting(false);
      return;
    }

    if (!username || !email || !password || !firstName || !lastName) {
      setError("Required fields are missing");
      setIsSubmitting(false);
      return;
    }

    try {
      let profilePictureUrl = "";
      if (profilePicture) {
        profilePictureUrl = await resizeAndCompressImage(profilePicture);
        console.log("Profile picture compressed and resized successfully");
        const originalSize = profilePicture.size;
        const compressedSize = Math.round((profilePictureUrl.length * 3) / 4);
        console.log(`Image size reduced from ${originalSize} to ~${compressedSize} bytes`);
      }

      const userData = {
        email,
        password,
        username,
        firstName,
        lastName,
        PhoneNumber: PhoneNumber || "",
        Gender: Gender || "",
        Skills: selectedSkills,
        Interests: selectedInterests,
        headline: headline || "",
        location: userLocation || "",
        About: About || "",
        college: college || "",
        degree: degree || "",
        workorProject: workorProject || "",
        startYear: startYear ? parseInt(startYear, 10) : null,
        endYear: endYear ? parseInt(endYear, 10) : null,
        profilePictureBase64: profilePictureUrl,
      };

      const logData = { ...userData };
      if (logData.profilePictureBase64) {
        logData.profilePictureBase64 = logData.profilePictureBase64.substring(0, 50) + "...";
      }
      console.log("Profile data being sent:", logData);

      const response = await axios.post(
        "https://uniisphere-1.onrender.com/auth/completeProfile",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          timeout: 30000,
        }
      );

      console.log("Profile completion successful:", response.data);

      // Extract userId from response if provided, fallback to username
      const returnedUserId = response.data.userId || response.data.id || username;
      setUserId(returnedUserId);

      alert("Profile completed successfully!");

      // Pass token and userId to the next page
      navigate("/view", {
        state: {
          userToken: response.data.token, // Make sure this matches what you're looking for
          userId: response.data.user.id    // Make sure this matches what you're looking for
        }
      });
    } catch (err) {
      console.error("Error details:", err);
      if (err.response) {
        console.error("Server response:", err.response.data);
        setError(`Profile completion failed: ${err.response.data?.error || err.response.statusText}`);
      } else if (err.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError(`Request error: ${err.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    const syntheticEvent = { preventDefault: () => { } };
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

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
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
          disabled={!!passedUsername}
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
          disabled={!!passedEmail}
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
      {error && (
        <p className="error-text" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <Button
        variant="primary"
        type="submit"
        className="otp-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing Up..." : "Sign Up"}
      </Button>
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
      <Form.Group controlId="PhoneNumber" className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter your phone number"
          value={PhoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="Gender" className="mb-3">
        <Form.Label>Gender*</Form.Label>
        <Form.Select
          value={Gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Form.Select>
      </Form.Group>
      {error && (
        <p className="error-text" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <Button
        variant="primary"
        type="submit"
        className="otp-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Next"}
      </Button>
      <Button
        variant="secondary"
        className="otp-btn mt-2"
        onClick={() => setStep(1)}
        disabled={isSubmitting}
      >
        Back
      </Button>
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
      {error && (
        <p className="error-text" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <Button
        variant="primary"
        type="submit"
        className="otp-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Next"}
      </Button>
      <Button
        variant="secondary"
        className="otp-btn mt-2"
        onClick={() => setStep(2)}
        disabled={isSubmitting}
      >
        Back
      </Button>
    </Form>
  );

  const renderFourthStep = () => (
    <Form onSubmit={handleFourthStepSubmit}>
      <Form.Group controlId="interest" className="mb-3">
        <Form.Label>Interests (Optional)</Form.Label>
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
          .filter(
            (interest) =>
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
            {interest}{" "}
            <span onClick={() => handleInterestRemove(interest)}>×</span>
          </span>
        ))}
      </div>
      {error && (
        <p className="error-text" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <Button
        variant="primary"
        type="submit"
        className="otp-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Next"}
      </Button>
      <Button
        variant="secondary"
        className="otp-btn mt-2"
        onClick={() => setStep(3)}
        disabled={isSubmitting}
      >
        Back
      </Button>
    </Form>
  );

  const renderFifthStep = () => (
    <Form onSubmit={handleFifthStepSubmit}>
      <Form.Group controlId="skill" className="mb-3">
        <Form.Label>Skills (Optional)</Form.Label>
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
          .filter(
            (skill) =>
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
      {error && (
        <p className="error-text" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <Button
        variant="primary"
        type="submit"
        className="otp-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Next"}
      </Button>
      <Button
        variant="secondary"
        className="otp-btn mt-2"
        onClick={() => setStep(4)}
        disabled={isSubmitting}
      >
        Back
      </Button>
    </Form>
  );

  const renderSixthStep = () => (
    <Form onSubmit={handleSixthStepSubmit}>
      <Form.Group controlId="About" className="mb-3">
        <Form.Label>About*</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Tell us about yourself"
          value={About}
          onChange={(e) => setAbout(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="location" className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your location (e.g., New York, NY)"
          value={userLocation}
          onChange={(e) => setUserLocation(e.target.value)}
        />
      </Form.Group>
      {error && (
        <p className="error-text" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <Button
        variant="primary"
        type="submit"
        className="otp-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Next"}
      </Button>
      <Button
        variant="secondary"
        className="otp-btn mt-2"
        onClick={() => setStep(5)}
        disabled={isSubmitting}
      >
        Back
      </Button>
    </Form>
  );

  const renderSeventhStep = () => (
    <Form onSubmit={handleSeventhStepSubmit}>
      <p>Review your information before proceeding.</p>
      {error && (
        <p className="error-text" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <Button
        variant="primary"
        type="submit"
        className="otp-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Next"}
      </Button>
      <Button
        variant="secondary"
        className="otp-btn mt-2"
        onClick={() => setStep(6)}
        disabled={isSubmitting}
      >
        Back
      </Button>
    </Form>
  );

  const renderEighthStep = () => (
    <Form onSubmit={handleEighthStepSubmit}>
      <Form.Group controlId="profilePicture" className="mb-3">
        <Form.Label>Profile Picture (Optional)</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {previewUrl && (
          <div className="profile-preview mt-2">
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="circle-image"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          </div>
        )}
        <p className="image-note">Upload a profile picture.</p>
      </Form.Group>
      {error && (
        <p className="error-text" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <Button
        variant="primary"
        type="submit"
        className="otp-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Next"}
      </Button>
      <Button
        variant="secondary"
        className="otp-btn mt-2"
        onClick={() => setStep(7)}
        disabled={isSubmitting}
      >
        Back
      </Button>
    </Form>
  );

  const renderNinthStep = () => (
    <Form onSubmit={handleNinthStepSubmit}>
      <p>Final step: Submit your profile.</p>
      {error && (
        <p className="error-text" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <Button
        variant="primary"
        type="submit"
        className="otp-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Complete Profile"}
      </Button>
      <Button
        variant="secondary"
        className="otp-btn mt-2"
        onClick={handleSkip}
        disabled={isSubmitting}
      >
        Skip
      </Button>
      <Button
        variant="secondary"
        className="otp-btn mt-2"
        onClick={() => setStep(8)}
        disabled={isSubmitting}
      >
        Back
      </Button>
    </Form>
  );

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
        <div className="otp-box">
          <div className="progress-indicator">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => (
              <div key={s} className={`step ${step >= s ? "completed" : ""}`}>
                {s}
              </div>
            ))}
          </div>
          {step === 1
            ? renderFirstStep()
            : step === 2
              ? renderSecondStep()
              : step === 3
                ? renderThirdStep()
                : step === 4
                  ? renderFourthStep()
                  : step === 5
                    ? renderFifthStep()
                    : step === 6
                      ? renderSixthStep()
                      : step === 7
                        ? renderSeventhStep()
                        : step === 8
                          ? renderEighthStep()
                          : renderNinthStep()}
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
