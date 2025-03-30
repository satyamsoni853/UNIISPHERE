import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import "./Interset.css";
import DesktopRight from "../DesktopRight/DesktopRight";
import DesktopLeftbottom from "../DesktopLeftbottom/DesktopLeftbottom.jsx";
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr.jsx";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import MobileFooter from "../Mobilefooter/MobileFooter";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Interset() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  const [interest, setInterest] = useState([
    "UI/UX", "JAVA", "CSS", "C++", "Python", "V+", "Figma", "Photoshop", "Swift",
    "Kotlin", "SQL", "MongoDB", "React", "Angular", "Node.js", "Java", "HTML",
    "JavaScript", "TypeScript", "Next.js", "Vue.js", "Bootstrap", "Tailwind CSS",
    "Material UI", "Chakra UI", "Redux", "Express.js", "Spring Boot", "Django",
    "Flask", "Ruby on Rails", "ASP.NET", "GraphQL", "REST API", "Firebase",
    "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS", "Google Cloud", "Azure",
    "Linux", "Git", "Go", "Rust",
  ]);
  const [Slideinterest, setSlideInterest] = useState([
    "UI/UX", "JAVA", "CSS", "C++", "Python", "V+", "Figma", "Photoshop", "Swift",
    "Kotlin", "SQL", "MongoDB", "React", "Angular", "Node.js", "Java",
  ]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [color] = useState(["#F3FDF4", "#FDF9F9", "#eaead6", "#F7F7F7"]);

  const tagsRef1 = useRef(null);
  const tagsRef2 = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const row1 = interest.slice(0, Math.ceil(interest.length / 2));
  const row2 = interest.slice(Math.ceil(interest.length / 2));

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

  const handleInterestClick = (skill) => {
    setSelectedInterests((prev) =>
      prev.includes(skill) ? prev.filter((item) => item !== skill) : [...prev, skill]
    );
  };

  const handleCancel = () => {
    setSelectedInterests([]);
    navigate(-1);
  };

  const handleSave = async () => {
    if (selectedInterests.length === 0) {
      alert("Please select at least one interest to save.");
      return;
    }

    try {
      const authToken = localStorage.getItem("authToken");

      // Log the authToken for debugging
      console.log("Auth Token:", authToken);

      if (!authToken) {
        throw new Error("User not authenticated. Please log in.");
      }

      const response = await axios.patch(
        `https://uniisphere-1.onrender.com/users/profile/`,
        { interests: selectedInterests },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Success response:", response.data);
        alert("Interests saved successfully!");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error saving interests:", error.response?.data || error.message);
      if (error.response) {
        alert(`Failed to save interests: ${error.response.data.message || error.response.statusText}`);
      } else {
        alert("Failed to save interests. Check your network or try again later.");
      }
    }
  };

  return (
    <div>
      <DesktopNavbarr />
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
                  <span>
                    <IoArrowBackCircleOutline />
                  </span>
                )}
                <span>Interest</span>
              </div>

              <div className="middle-interest-searchAndIconMain">
                <div className="middle-interest-search">
                  <FiSearch className="search-icon" />
                  <input type="text" placeholder="Search" />
                </div>
              </div>

              <div className="middle-interest-interestAndArrow">
                <button className="arrow-btn" onClick={scrollLeft}>
                  <IoIosArrowBack className="main-left-arrow" />
                </button>

                <div className="middle-interest-tags-wrapper">
                  <div className="middle-interest-tags">
                    <div className="middle-interest-tags-row" ref={tagsRef1}>
                      {row1.map((skill, index) => (
                        <div
                          key={index}
                          className={`middle-interest-tag ${
                            selectedInterests.includes(skill) ? "selected" : ""
                          }`}
                          style={{ backgroundColor: color[index % color.length] }}
                          onClick={() => handleInterestClick(skill)}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>

                    <div className="middle-interest-tags-row" ref={tagsRef2}>
                      {row2.map((skill, index) => (
                        <div
                          key={index + row1.length}
                          className={`middle-interest-tag ${
                            selectedInterests.includes(skill) ? "selected" : ""
                          }`}
                          style={{ backgroundColor: color[index % color.length] }}
                          onClick={() => handleInterestClick(skill)}
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

              <div className="middle-interest-parentOfPrompt">
                <div className="middle-interest-prompt">
                  <h1>Add other interests which you have knowledge of</h1>
                </div>
              </div>

              <div className="middle-interest-suggested-tags">
                {Slideinterest.map((skill, index) => (
                  <div
                    key={index}
                    className={`middle-interest-tag ${
                      selectedInterests.includes(skill) ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color[index % color.length] }}
                    onClick={() => handleInterestClick(skill)}
                  >
                    {skill}
                  </div>
                ))}
              </div>

              <div className="middle-interest-description">
                <p>
                  Interests can present you in a better way among others. Also,
                  they can help to show you related things.
                </p>
              </div>

              <div className="middle-interest-last-buttons">
                <button className="middle-interest-cancel" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="middle-interest-save" onClick={handleSave}>
                  Save
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