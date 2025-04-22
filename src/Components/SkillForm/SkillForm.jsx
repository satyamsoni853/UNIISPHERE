import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import "./SkillForm.css";
import DesktopRight from "../DesktopRight/DesktopRight";
import DesktopLeftBottom from "../DesktopLeftBottom/DesktopLeftBottom.jsx";
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbarr from "../DesktopNavbar/DesktopNavbar.jsx";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import MobileFooter from "../Mobilefooter/MobileFooter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SkillForm() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch existing skills on component mount
  useEffect(() => {
    const fetchUserSkills = async () => {
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

        if (response.data && response.data.Skills) {
          setSelectedSkills(response.data.Skills);
        }
      } catch (error) {
        console.error("Error fetching user skills:", error);
      }
    };

    fetchUserSkills();
  }, []);

  const [skills] = useState([
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

  const filteredSkills = skills.filter(skill => 
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const row1 = filteredSkills.slice(0, Math.ceil(filteredSkills.length / 2));
  const row2 = filteredSkills.slice(Math.ceil(filteredSkills.length / 2));

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

  const handleSkillClick = (skill) => {
    setSelectedSkills(prev => {
      if (prev.includes(skill)) {
        return prev.filter(s => s !== skill);
      } else {
        return [...prev, skill];
      }
    });
  };

  const handleSave = async () => {
    if (selectedSkills.length === 0) {
      alert("Please select at least one skill to save.");
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
        Skills: selectedSkills
      });

      const response = await axios.patch(
        `https://uniisphere-1.onrender.com/users/profile`,
        {
          userId: userId,
          Skills: selectedSkills
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
        alert("Skills saved successfully!");
        navigate(`/ProfileEditSection/${userId}`);
      }
    } catch (error) {
      console.error("Error saving skills:", error);
      
      if (error.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("AuthToken");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("LoginuserId");
        navigate("/userlogin");
      } else {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to save skills. Please try again.';
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
      <div className="Skill-main-container">
        <Background />
        <div className="Skill-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftBottom />
        </div>
        <div className="Skill-middle-main-container">
          <div className="middle-skills-mainParent">
            <div className="middle-skills-container">
              <div className="middle-skills-header">
                {isMobile && (
                  <span onClick={() => navigate(-1)}>
                    <IoArrowBackCircleOutline className="middle-skills-header-icon" />
                  </span>
                )}
                <span>Skills</span>
              </div>

              <div className="middle-skills-searchAndIconMain">
                <div className="middle-skills-search">
                  <FiSearch className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search skills" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="middle-skills-skillsAndArrow">
                <button className="arrow-btn" onClick={scrollLeft}>
                  <IoIosArrowBack className="main-left-arrow" />
                </button>

                <div className="middle-skills-tags-wrapper">
                  <div className="middle-skills-tags">
                    <div className="middle-skills-tags-row" ref={tagsRef1}>
                      {row1.map((skill, index) => (
                        <div
                          key={index}
                          className={`middle-skills-tag ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                          style={{
                            backgroundColor: color[index % color.length],
                            
                          }}
                          onClick={() => handleSkillClick(skill)}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>

                    <div className="middle-skills-tags-row" ref={tagsRef2}>
                      {row2.map((skill, index) => (
                        <div
                          key={index + row1.length}
                          className={`middle-skills-tag ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                          style={{
                            backgroundColor:color[index % color.length],
                           
                          }}
                          onClick={() => handleSkillClick(skill)}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button className="arrow-btn" onClick={scrollRight}>
                  <IoIosArrowForward className="main-right-arrow" />
                </button>
              </div>

              <div className="middle-skills-parentOfPrompt">
                <div className="middle-skills-prompt">
                  <h1>Selected Skills ({selectedSkills.length})</h1>
                </div>
              </div>

              <div className="middle-skills-suggested-tags">
                {selectedSkills.map((skill, index) => (
                  <div
                    key={index}
                   style={{  backgroundColor:color[index % color.length],}}
                    className="middle-skills-tag"
                    onClick={() => handleSkillClick(skill)}
                  >
                    {skill}
                  </div>
                ))}
              </div>

              <div className="middle-skills-description">
                <div className="middle-skills-lastParagraph">
                  <p>
                    Skills can present you in a better way among others. Also,
                    they can help to show you related things.
                  </p>
                </div>
              </div>

              <div className="middle-skills-last-buttons">
                <button 
                  className="middle-skills-cancel" 
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  className="middle-skills-save" 
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
        <div className="Skill-right-main-container">
          <DesktopRight />
        </div>
      </div>
    </div>
  );
}

export default SkillForm;