import React, { useState, useEffect } from "react";
import "./AboutAndExperience.css";
import DesktopRight from "../DesktopRight/DesktopRight.jsx";
import DesktopLeftbottom from "../DesktopLeftbottom/DesktopLeftbottom.jsx";
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbarr from "../DesktopNavbar/DesktopNavbar.jsx";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import MobileFooter from "../Mobilefooter/MobileFooter.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AboutAndExperiance() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [title, setTitle] = useState(""); // Title for the experience section
  const [name, setName] = useState(""); // Organization/Company name
  const [aboutDesc, setAboutDesc] = useState(""); // About description content
  const [location, setLocation] = useState(""); // Location input
  const [locationType, setLocationType] = useState(""); // Location type (e.g., remote, onsite)
  const [description, setDescription] = useState(""); // Detailed description for experience

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
          `https://uniisphere-1.onrender.com/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.data) {
          setAboutDesc(response.data.about || "");
          if (response.data.experience && response.data.experience.length > 0) {
            const exp = response.data.experience[0]; // Assuming single experience for simplicity
            setTitle(exp.title || "");
            setName(exp.name || "");
            setLocation(exp.location || "");
            setLocationType(exp.locationType || "");
            setDescription(exp.description || "");
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
        `https://uniisphere-1.onrender.com/users/profile`,
        {
          userId: userId,
          about: aboutDesc,
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

  const handleSaveExperience = async () => {
    if (!title.trim() || !name.trim() || !location.trim() || !locationType.trim() || !description.trim()) {
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

      const experienceData = {
        title,
        name,
        location,
        locationType,
        description,
      };

      const response = await axios.patch(
        `https://uniisphere-1.onrender.com/users/profile`,
        {
          userId: userId,
          experience: [experienceData], // Sending as an array for consistency
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Experience saved successfully!");
        navigate(`/ProfileEditSection/${userId}`);
      }
    } catch (error) {
      console.error("Error saving experience:", error);
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
      <DesktopNavbarr />
      <div className="AboutAndExperiance-main-container">
        <Background />
        <div className="AboutAndExperiance-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftbottom />
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
                  defaultValue="The actual idea of Uniisphere was of The Founder Himanshu who worked for months to think and plan all the essential stuff."
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
                <div className="middle-aboutExperience-inputGroup">
                  <label>Title</label>
                  <input
                    type="text"
                    className="middle-aboutExperience-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="middle-aboutExperience-inputGroup">
                  <label>Name of Organization / Company</label>
                  <input
                    type="text"
                    className="middle-aboutExperience-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="middle-aboutExperience-inputGroup">
                  <label>Location</label>
                  <input
                    type="text"
                    className="middle-aboutExperience-input"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="middle-aboutExperience-inputGroup">
                  <label>Location Type</label>
                  <input
                    type="text"
                    className="middle-aboutExperience-input"
                    value={locationType}
                    onChange={(e) => setLocationType(e.target.value)}
                  />
                </div>
                <div className="middle-aboutExperience-inputGroup">
                  <label>Description</label>
                  <textarea
                    className="middle-aboutExperience-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
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
                  {isMobile && <MobileFooter />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="AboutAndExperiance-right-main-container">
          <DesktopRight />
        </div>
      </div>
    </div>
  );
}

export default AboutAndExperiance;