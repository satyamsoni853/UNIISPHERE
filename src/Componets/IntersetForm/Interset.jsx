import React, { useState, useRef } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi"; // Importing search icon
import "./Interset.css";
import DesktopRight from "../DesktopRight/DesktopRight";
import DesktopLeftbottom from "../DesktopLeftbottom/DesktopLeftbottom.jsx";
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr.jsx";
function Interset() {
  const [interest, setInterest] = useState([
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
    "UI/UX",
    "Java",
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
    "Java",
    "HTML",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "Vue.js",
    "Bootstrap",
    "Tailwind CSS",
    "Material UI",
    "Chakra UI",
    "Redux",
    "Express.js",
    "Spring Boot",
    "Django",
    "Flask",
    "Ruby on Rails",
    "ASP.NET",
    "GraphQL",
    "REST API",
    "Firebase",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Kubernetes",
    "AWS",
    "Google Cloud",
    "Azure",
    "Linux",
    "Git",
    "Go",
    "Rust",
  ]);
  const [Slideinterest, setSlideInterest] = useState([
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
    "Java",
  ]);

  const [color, setColor] = useState([
    "#F3FDF4",
    "#FDF9F9",
    "#eaead6",
    "#F7F7F7",
  ]);

  const tagsRef1 = useRef(null); // Ref for the first row
  const tagsRef2 = useRef(null); // Ref for the second row

  // Split the interest array into two rows
  const row1 = interest.slice(0, Math.ceil(interest.length / 2));
  const row2 = interest.slice(Math.ceil(interest.length / 2));

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
      <div className="Interest-main-container">
        <Background />
        <div className="Interest-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftbottom />
        </div>
        <div className="Interest-middle-main-container">
          <div className="middle-interest-mainParent">
            <div className="middle-interest-container">
              {/* Header */}
              <h2 className="middle-interest-header">Interest</h2>

              {/* Search Bar with Icon */}
              <div className="middle-interest-searchAndIconMain">
                <div className="middle-interest-search">
                  <FiSearch className="search-icon" /> {/* Search Icon */}
                  <input type="text" placeholder="Search" />
                </div>
              </div>

              {/* Interests Section with Arrows */}
              <div className="middle-interest-interestAndArrow">
                <button className="arrow-btn" onClick={scrollLeft}>
                  <IoIosArrowBack className="main-left-arrow" />
                </button>

                <div className="middle-interest-tags-wrapper">
                  <div className="middle-interest-tags">
                    {/* First Row */}
                    <div className="middle-interest-tags-row" ref={tagsRef1}>
                      {row1.map((skill, index) => (
                        <div
                          key={index}
                          className="middle-interest-tag"
                          style={{
                            backgroundColor: color[index % color.length],
                          }}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>

                    {/* Second Row */}
                    <div className="middle-interest-tags-row" ref={tagsRef2}>
                      {row2.map((skill, index) => (
                        <div
                          key={index + row1.length} // Ensure unique keys
                          className="middle-interest-tag"
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

              {/* Prompt */}
              <div className="middle-interest-parentOfPrompt">
                <div className="middle-interest-prompt">
                  <h1>Add other interests which you have knowledge of</h1>
                </div>
              </div>

              {/* Suggested Interests */}
              <div className="middle-interest-suggested-tags">
                {Slideinterest.map((skill, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: color[index % color.length] }}
                    className="middle-interest-tag"
                  >
                    {skill}
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="middle-interest-description">
                <p>
                  Interests can present you in a better way among others. Also,
                  they can help to show you related things.
                </p>
              </div>

              {/* Buttons */}
              <div className="middle-interest-last-buttons">
                <button className="middle-interest-cancel">Cancel</button>
                <button className="middle-interest-save">Save</button>
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
