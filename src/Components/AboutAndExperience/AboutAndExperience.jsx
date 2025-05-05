import React, { useState, useEffect } from "react";
import "./AboutAndExperience.css";
import DesktopRight from "../DesktopRight/DesktopRight.jsx";
import DesktopLeftBottomSection from '../DesktopLeftBottomSection/DesktopLeftBottomSection.jsx'
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbar from '../DesktopNavbar/DesktopNavbar.jsx'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import MobileFooter from "../Mobilefooter/MobileFooter.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AboutAndExperiance() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [experiences, setExperiences] = useState([{
    title: "",
    organizationName: "",
    location: "",
    locationType: "",
    description: ""
  }]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [aboutDesc, setAboutDesc] = useState("");

  // Fetch existing about and experience data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem("AuthToken") || localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId") || localStorage.getItem("LoginuserId");

        if (!authToken || !userId) {
          console.error("No auth token or user ID found");
          return;
        }

        const response = await axios.get(
          `https://uniisphere-backend-latest.onrender.com/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.data) {
          setAboutDesc(response.data.About || "");
          if (response.data.experiences && response.data.experiences.length > 0) {
            setExperiences(response.data.experiences);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSaveAbout = async () => {
    if (!aboutDesc.trim()) {
      alert("Please enter an about description.");
      return;
    }

    setLoading(true);
    try {
      const authToken = localStorage.getItem("AuthToken") || localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId") || localStorage.getItem("LoginuserId");

      if (!authToken || !userId) {
        throw new Error("User not authenticated. Please log in.");
      }

      const response = await axios.patch(
        `https://uniisphere-backend-latest.onrender.com/users/profile`,
        {
          userId: userId,
          About: aboutDesc,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("About section saved successfully!");
        navigate(`/ProfileEditSection/${userId}`);
      }
    } catch (error) {
      console.error("Error saving about section:", error);
      if (error.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("AuthToken");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("LoginuserId");
        navigate("/userlogin");
      } else {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to save about section. Please try again.";
        alert(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index] = {
      ...newExperiences[index],
      [field]: value
    };
    setExperiences(newExperiences);
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, {
      title: "",
      organizationName: "",
      location: "",
      locationType: "",
      description: ""
    }]);
  };

  const handleRemoveExperience = (index) => {
    if (experiences.length > 1) {
      const newExperiences = experiences.filter((_, i) => i !== index);
      setExperiences(newExperiences);
    }
  };

  const handleSaveExperience = async () => {
    const isValid = experiences.every(exp => 
      exp.title.trim() && 
      exp.organizationName.trim() && 
      exp.location.trim() && 
      exp.locationType.trim() && 
      exp.description.trim()
    );

    if (!isValid) {
      alert("Please fill in all experience fields.");
      return;
    }

    setLoading(true);
    try {
      const authToken = localStorage.getItem("AuthToken") || localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId") || localStorage.getItem("LoginuserId");

      if (!authToken || !userId) {
        throw new Error("User not authenticated. Please log in.");
      }

      // Log the data being sent
      console.log("Sending experience data:", {
        userId,
        experiences: experiences.map(exp => ({
          title: exp.title,
          organizationName: exp.organizationName,
          location: exp.location,
          locationType: exp.locationType,
          description: exp.description
        }))
      });

      const response = await axios.patch(
        `https://uniisphere-backend-latest.onrender.com/users/profile`,
        {
          userId,
          experiences: experiences.map(exp => ({
            title: exp.title,
            organizationName: exp.organizationName,
            location: exp.location,
            locationType: exp.locationType,
            description: exp.description
          }))
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.status === 200) {
        alert("Experience saved successfully!");
        navigate(`/ProfileEditSection/${userId}`);
      }
    } catch (error) {
      console.error("Error saving experience:", error);
      console.error("Error response:", error.response?.data);
      if (error.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("AuthToken");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("LoginuserId");
        navigate("/userlogin");
      } else {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to save experience. Please try again.";
        alert(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DesktopNavbar />
      <div className="AboutAndExperiance-main-container">
        <Background />
        <div className="AboutAndExperiance-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftBottomSection />
        </div>
        <div className="AboutAndExperiance-middle-main-container">
          <div className="middle-aboutExperience-mainParent">
            <div className="middle-aboutExperience-container">
              {/* About Section */}
              <div className="middle-aboutExperience-aboutSection">
                <div className="middle-interest-header">
                  {isMobile && (
                    <span onClick={handleCancel}>
                      <IoArrowBackCircleOutline />
                    </span>
                  )}
                  <span>About</span>
                </div>
                <textarea
                  className="middle-aboutExperience-textarea"
                  placeholder="Tell us about yourself..."
                  value={aboutDesc}
                  onChange={(e) => setAboutDesc(e.target.value)}
                  maxLength={1000}
                />
                <div className="middle-aboutExperience-buttons">
                  <button
                    className="middle-aboutExperience-cancel"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    className="middle-aboutExperience-save"
                    onClick={handleSaveAbout}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>

              {/* Experience Section */}
              <div className="middle-aboutExperience-experienceSection">
                <h3>Experience</h3>
                {experiences.map((exp, index) => (
                  <div key={index} className="experience-entry">
                    <div className="middle-aboutExperience-inputGroup">
                      <label>Title*</label>
                      <input
                        type="text"
                        className="middle-aboutExperience-input"
                        value={exp.title}
                        onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                      />
                    </div>
                    <div className="middle-aboutExperience-inputGroup">
                      <label>Name of Organization / Company*</label>
                      <input
                        type="text"
                        className="middle-aboutExperience-input"
                        value={exp.organizationName}
                        onChange={(e) => handleExperienceChange(index, 'organizationName', e.target.value)}
                      />
                    </div>
                    <div className="middle-aboutExperience-inputGroup">
                      <label>Location*</label>
                      <input
                        type="text"
                        className="middle-aboutExperience-input"
                        value={exp.location}
                        onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                      />
                    </div>
                    <div className="middle-aboutExperience-inputGroup">
                      <label>Location Type*</label>
                      <select
                        className="middle-aboutExperience-input"
                        value={exp.locationType}
                        onChange={(e) => handleExperienceChange(index, 'locationType', e.target.value)}
                      >
                        <option value="">Select Type</option>
                        <option value="Remote">Remote</option>
                        <option value="On-site">On-site</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                    <div className="middle-aboutExperience-inputGroup">
                      <label>Description*</label>
                      <textarea
                        className="middle-aboutExperience-textarea"
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      />
                    </div>
                    {experiences.length > 1 && (
                      <button
                        className="remove-experience-btn"
                        onClick={() => handleRemoveExperience(index)}
                      >
                        Remove Experience
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="add-experience-btn"
                  onClick={handleAddExperience}
                >
                  Add Another Experience
                </button>
                <div className="middle-aboutExperience-buttons">
                  <button
                    className="middle-aboutExperience-cancel"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    className="middle-aboutExperience-save"
                    onClick={handleSaveExperience}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {isMobile && <MobileFooter />}
        </div>
        <div className="AboutAndExperiance-right-main-container">
          <DesktopRight />
        </div>
      </div>
    </div>
  );
}

export default AboutAndExperiance;
