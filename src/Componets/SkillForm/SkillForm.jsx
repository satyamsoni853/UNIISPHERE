import React, { useState, useRef,useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import "./SkillForm.css";
import DesktopRight from "../DesktopRight/DesktopRight";
import DesktopLeftbottom from "../DesktopLeftbottom/DesktopLeftbottom.jsx";
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr.jsx";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import MobileFooter from "../Mobilefooter/MobileFooter";
function SkillForm() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  const [skills] = useState([
    "UI/UX",
    "JAVA",
    "CSS",
    "C++",
    "Python",
    "V+",
    "Figma",
    "Photoshop",
    "Swift",
    "Kotlin",
    "SQL",
    "MongoDB",
    "React",
    "Angular",
    "Node.js",
  ]);

  const [color] = useState(["#F3FDF4", "#FDF9F9", "#eaead6", "#F7F7F7"]);

  const tagsRef1 = useRef(null); // Ref for the first row
  const tagsRef2 = useRef(null); // Ref for the second row

  // Split the skills array into two rows
  const row1 = skills.slice(0, Math.ceil(skills.length / 2));
  const row2 = skills.slice(Math.ceil(skills.length / 2));

  // Scroll Left for both rows
  const scrollLeft = () => {
    if (tagsRef1.current && tagsRef2.current) {
      tagsRef1.current.scrollBy({ left: -200, behavior: "smooth" });
      tagsRef2.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Scroll Right for both rows
  const scrollRight = () => {
    if (tagsRef1.current && tagsRef2.current) {
      tagsRef1.current.scrollBy({ left: 200, behavior: "smooth" });
      tagsRef2.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div>
      <DesktopNavbarr/>
      <div className="Skill-main-container">
        <Background />
        <div className="Skill-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftbottom />
        </div>
        <div className="Skill-middle-main-container">
          <div className="middle-skills-mainParent">
             <div className="middle-skills-container">
                          {/* Header */}
            
                          <div className="middle-skills-header">
                            {isMobile && (
                              <span>
                                <IoArrowBackCircleOutline className="middle-skills-header-icon" />
                              </span>
                            )}
                         
                            <span>Skills</span>
                          </div>

              <div className="middle-skills-searchAndIconMain">
                <div className="middle-skills-search">
                  <FiSearch className="search-icon" />
                  <input type="text" placeholder="Search" />
                </div>
              </div>

              <div className="middle-skills-skillsAndArrow">
                <button className="arrow-btn" onClick={scrollLeft}>
                  <IoIosArrowBack className="main-left-arrow" />
                </button>

                <div className="middle-skills-tags-wrapper">
                  <div className="middle-skills-tags">
                    {/* First Row */}
                    <div className="middle-skills-tags-row" ref={tagsRef1}>
                      {row1.map((skill, index) => (
                        <div
                          key={index}
                          className="middle-skills-tag"
                          style={{
                            backgroundColor: color[index % color.length],
                          }}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>

                    {/* Second Row */}
                    <div className="middle-skills-tags-row" ref={tagsRef2}>
                      {row2.map((skill, index) => (
                        <div
                          key={index + row1.length} // Ensure unique keys
                          className="middle-skills-tag"
                          style={{
                            backgroundColor: color[index % color.length],
                          }}
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
                  <h1>Add other skills which you have knowledge of</h1>
                </div>
              </div>

              <div className="middle-skills-suggested-tags">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: color[index % color.length] }}
                    className="middle-skills-tag"
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
                <button className="middle-skills-cancel">Cancel</button>
                <button className="middle-skills-save">Save</button>
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
