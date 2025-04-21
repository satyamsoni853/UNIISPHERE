import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import "./InterestForm.css";
import DesktopRight from "../DesktopRight/DesktopRight.jsx";
import DesktopLeftbottom from "../DesktopLeftBottom/DesktopLeftBottom.jsx";
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbarr from "../DesktopNavbar/DesktopNavbar.jsx";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import MobileFooter from "../Mobilefooter/MobileFooter.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Interset() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch existing interests on component mount
  useEffect(() => {
    const fetchUserInterests = async () => {
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

        if (response.data && response.data.interests) {
          setSelectedInterests(response.data.interests);
        }
      } catch (error) {
        console.error("Error fetching user interests:", error);
      }
    };

    fetchUserInterests();
  }, []);

  const [interests] = useState([
    "UI/UX", "JAVA", "CSS", "C++", "Python", "V+", "Figma", "Photoshop", 
    "Swift", "Kotlin", "SQL", "MongoDB", "React", "Angular", "Node.js",
    "JavaScript", "TypeScript", "Next.js", "Vue.js", "Bootstrap", "Tailwind CSS",
    "Material UI", "Chakra UI", "Redux", "Express.js", "Spring Boot", "Django",
    "Flask", "Ruby on Rails", "ASP.NET", "GraphQL", "REST API", "Firebase",
    "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS", "Google Cloud", "Azure"
  ]);

  const [color] = useState(["#F3FDF4", "#FDF9F9", "#eaead6", "#F7F7F7"]);

  const tagsRef1 = useRef(null);
  const tagsRef2 = useRef(null);

  const filteredInterests = interests.filter(interest => 
    interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const row1 = filteredInterests.slice(0, Math.ceil(filteredInterests.length / 2));
  const row2 = filteredInterests.slice(Math.ceil(filteredInterests.length / 2));

  const scrollLeft = () => {
    if (tagsRef1.current && tagsRef2.current) {
      tagsRef1.current.scrollBy({ left: -200, behavior: "smooth" });
      tagsRef2.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (tagsRef1.current && tagsRef2.current) {
      tagsRef1.current.scrollBy({ left: 200, behavior: "smooth" });
      tagsRef2.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleInterestClick = (interest) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const handleSave = async () => {
    if (selectedInterests.length === 0) {
      alert("Please select at least one interest to save.");
      return;
    }

    setLoading(true);
    try {
      const authToken = localStorage.getItem("AuthToken") || localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId") || localStorage.getItem("LoginuserId");

      if (!authToken || !userId) {
        throw new Error("User not authenticated. Please log in.");
      }

      console.log("Sending request with:", {
        userId,
        interests: selectedInterests
      });

      const response = await axios.patch(
        `https://uniisphere-1.onrender.com/users/profile`,
        {
          userId: userId,
          interests: selectedInterests
        },
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
        }
      );

      console.log("Response:", response.data);

      if (response.status === 200) {
        alert("Interests saved successfully!");
        navigate(`/ProfileEditSection/${userId}`);
      }
    } catch (error) {
      console.error("Error saving interests:", error);
      
      if (error.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("AuthToken");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("LoginuserId");
        navigate("/userlogin");
      } else {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to save interests. Please try again.';
        alert(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <DesktopNavbarr/>
      <div className="Interest-main-container">
        <Background />
        <div className="Interest-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftbottom />
        </div>
        <div className="Interest-middle-main-container">
          <div className="middle-interest-mainParent">
            <div className="middle-interest-container">
              <div className="middle-interest-header">
                {isMobile && (
                  <span onClick={() => navigate(-1)}>
                    <IoArrowBackCircleOutline className="middle-interest-header-icon" />
                  </span>
                )}
                <span>Interests</span>
              </div>

              <div className="middle-interest-searchAndIconMain">
                <div className="middle-interest-search">
                  <FiSearch className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search interests" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="middle-interest-interestAndArrow">
                <button className="arrow-btn" onClick={scrollLeft}>
                  <IoIosArrowBack className="main-left-arrow" />
                </button>

                <div className="middle-interest-tags-wrapper">
                  <div className="middle-interest-tags">
                    <div className="middle-interest-tags-row" ref={tagsRef1}>
                      {row1.map((interest, index) => (
                        <div
                          key={index}
                          className={`middle-interest-tag ${selectedInterests.includes(interest) ? 'selected' : ''}`}
                          style={{
                            backgroundColor: color[index % color.length],
                          }}
                          onClick={() => handleInterestClick(interest)}
                        >
                          {interest}
                        </div>
                      ))}
                    </div>

                    <div className="middle-interest-tags-row" ref={tagsRef2}>
                      {row2.map((interest, index) => (
                        <div
                          key={index + row1.length}
                          className={`middle-interest-tag ${selectedInterests.includes(interest) ? 'selected' : ''}`}
                          style={{
                            backgroundColor: color[index % color.length],
                          }}
                          onClick={() => handleInterestClick(interest)}
                        >
                          {interest}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button className="arrow-btn" onClick={scrollRight}>
                  <IoIosArrowForward className="main-right-arrow" />
                </button>
              </div>

              <div className="middle-interest-parentOfPrompt">
                <div className="middle-interest-prompt">
                  <h1>Selected Interests ({selectedInterests.length})</h1>
                </div>
              </div>

              <div className="middle-interest-suggested-tags">
                {selectedInterests.map((interest, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: color[index % color.length] }}
                    className="middle-interest-tag"
                    onClick={() => handleInterestClick(interest)}
                  >
                    {interest}
                  </div>
                ))}
              </div>

              <div className="middle-interest-description">
                <div className="middle-interest-lastParagraph">
                  <p>
                    Interests can present you in a better way among others. Also,
                    they can help to show you related things.
                  </p>
                </div>
              </div>

              <div className="middle-interest-last-buttons">
                <button 
                  className="middle-interest-cancel" 
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  className="middle-interest-save" 
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                {isMobile && <MobileFooter />}
              </div>
            </div>
          </div>
        </div>
        <div className="Interest-right-main-container">
          <DesktopRight />
        </div>
      </div>
    </div>
  );
}

export default Interset;