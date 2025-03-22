/* eslint-disable no-unused-vars */
import React, { useState, useRef,useEffect } from "react";
import "./ProfileEditSection.css";
import { FiEdit } from "react-icons/fi";
import image from "./Person.png";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import DesktopRight from "../DesktopRight/DesktopRight";
import DesktopLeftbottom from "../DesktopLeftbottom/DesktopLeftbottom.jsx";
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr.jsx";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import MobileFooter from "../Mobilefooter/MobileFooter";

function ProfileEditSection() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  // State variables
  const [profilePic, setProfilePic] = useState(image);
  const [collabs, setCollabs] = useState(10);
  const [connections, setConnections] = useState(50);
  const [name, setName] = useState("John Doe");
  const [title, setTitle] = useState("Building Uniisphere|Masters Union");
  const [address, setAddress] = useState("New York, USA");
  const [buttons, setButtons] = useState(["Message", "Connect"]);
  const [skills, setSkills] = useState([
    "React",
    "Node.js",
    "JavaScript",
    "React",
    "Node.js",
    "JavaScript",
    "React",
    "Node.js",
    "JavaScript",
    "React",
  ]);
  const [interests, setInterests] = useState([
    "React",
    "Node.js",
    "JavaScript",
    "React",
    "Node.js",
    "JavaScript",
    "React",
    "Node.js",
    "JavaScript",
    "React",
  ]);
  const [education, setEducation] = useState([
    "MIT",
    "Harvard",
    "10th",
    "12th",
  ]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Refs for scrolling
  const skillsRef = useRef(null);
  const interestsRef = useRef(null);

  // About Section with "See More" Feature
  const [fullAboutText, setFullAboutText] = useState(
    "Passionate developer with experience in web and mobile development. I specialize in React, Node.js, and building scalable applications. Love to work on open-source projects and contribute to the tech community."
  );

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Limiting text length before showing "See More"
  const maxLength = 100;
  const displayedText = isExpanded
    ? fullAboutText
    : fullAboutText.slice(0, maxLength) +
      (fullAboutText.length > maxLength ? "..." : "");

  // Scroll functions
  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div>
      <DesktopNavbarr />
      <div className="ProfileEditSection-main-container">
        <Background />
        <div className="ProfileEditSectionll-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftbottom />
        </div>
        <div className="ProfileEditSection-middle-main-container">
          <div className="Followers-middle-section-2-mainParent-public">
            <div className="Followers-middle-section-2-middle-container-public">
              <div className="Followers-middle-section-2-middle-section-public">

              <div className="Followers-middle-section-2-top-nav-Icon">
                <IoArrowBackCircleOutline className="Followers-middle-section-2-backLogo"/>
              </div>

                {/* Profile Details */}
                <div className="Followers-middle-section-2-profile-header-public">
                  <div className="Followers-middle-section-2-imageContainer-public">
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="Followers-middle-section-2-profile-pic-public"
                    />
                  </div>
                  <div className="Followers-middle-section-2-collabsDetails-public">
                    <h4>Collabs</h4> <span>{collabs}</span>
                  </div>
                  <div className="Followers-middle-section-2-connectionsDetails-public">
                    <h4>Connections</h4>
                    <span>{connections}</span>
                  </div>
                </div>

                {/* Name and Details */}
                <div className="Followers-middle-section-2-profile-info-public">
                  <div className="Followers-middle-section-2-nameAndEdit-public">
                    <FiEdit className="Followers-middle-section-2-icon-public" />
                    <p>{name}</p>
                  </div>
                  <p>{title}</p>
                  <p>{address}</p>
                </div>

                <div className="Followers-middle-section-2-profile-buttons-public">
                  {buttons.map((btn, index) => (
                    <button
                      key={index}
                      className="Followers-middle-section-2-btn-public"
                    >
                      {btn}
                    </button>
                  ))}
                </div>

                {/* About Section with Expandable Content */}
                <div className="Followers-middle-section-2-about-section-public">
                  <h3>About</h3>
                  <p>
                    {displayedText}
                    <span>
                      {fullAboutText.length > maxLength && (
                        <button
                          className="Followers-middle-section-2-about-button-public"
                          onClick={toggleExpand}
                        >
                          {isExpanded ? "See Less" : "See More"}
                        </button>
                      )}
                    </span>
                  </p>
                </div>

                {/* Upload Section */}
                <div className="Followers-middle-section-2-upload-section-public">
                  <div className="Followers-middle-section-2-headingAndEdit-public">
                    <p>Upload</p>
                    <FiEdit className="Followers-middle-section-2-icon-public" />
                  </div>
                  <h6>No Upload yet.</h6>
                </div>

                {/* Experience Section */}
                <div className="Followers-middle-section-2-upload-section-public">
                  <div className="Followers-middle-section-2-headingAndEdit-public">
                    <p>Experience</p>
                    <FiEdit className="Followers-middle-section-2-icon-public" />
                  </div>
                  <h6>No Experience yet.</h6>
                </div>

                {/* Skills Section */}
                <div className="Followers-middle-section-2-skills-section-public">
                  <div className="Followers-middle-section-2-headingAndIcons-public">
                    <h3>Skills</h3>
                    <FiEdit className="Followers-middle-section-2-icon-public" />
                  </div>
                  <div className="Followers-middle-section-2-scroll-container">
                    <button
                      className="Followers-middle-section-2-scroll-btn"
                      onClick={() => scrollLeft(skillsRef)}
                    >
                      <IoIosArrowBack />
                    </button>
                    <div
                      className="Followers-middle-section-2-skill-list-public"
                      ref={skillsRef}
                    >
                      {skills.map((val, index) => (
                        <div
                          key={index}
                          className="Followers-middle-section-2-skillsMiniDiv-public"
                        >
                          {val}
                        </div>
                      ))}
                    </div>
                    <button
                      className="Followers-middle-section-2-scroll-btn"
                      onClick={() => scrollRight(skillsRef)}
                    >
                      <IoIosArrowForward />
                    </button>
                  </div>
                </div>

                {/* Collabs Section */}
                <div className="Followers-middle-section-2-upload-section-public">
                  <div className="Followers-middle-section-2-headingAndEdit-public">
                    <p>Collabs</p>
                    <FiEdit className="Followers-middle-section-2-icon-public" />
                  </div>
                  <h6>No Collab yet.</h6>
                </div>

                {/* Interests Section */}
                <div className="Followers-middle-section-2-skills-section-public">
                  <div className="Followers-middle-section-2-headingAndIcons-public">
                    <h3>Interests</h3>
                    <FiEdit className="Followers-middle-section-2-icon-public" />
                  </div>
                  <div className="Followers-middle-section-2-scroll-container">
                    <button
                      className="Followers-middle-section-2-scroll-btn"
                      onClick={() => scrollLeft(interestsRef)}
                    >
                      <IoIosArrowBack />
                    </button>
                    <div
                      className="Followers-middle-section-2-skill-list-public"
                      ref={interestsRef}
                    >
                      {interests.map((val, index) => (
                        <div
                          key={index}
                          className="Followers-middle-section-2-skillsMiniDiv-public"
                        >
                          {val}
                        </div>
                      ))}
                    </div>
                    <button
                      className="Followers-middle-section-2-scroll-btn"
                      onClick={() => scrollRight(interestsRef)}
                    >
                      <IoIosArrowForward />
                    </button>
                  </div>
                </div>

                {/* Education Section */}
                <div className="Followers-middle-section-2-main-education-public">
                  <div className="Followers-middle-section-2-education-headingAndEdit-public">
                    <h3>Education</h3>
                    <FiEdit className="Followers-middle-section-2-icon-public" />
                  </div>
                  <div className="Followers-middle-section-2-buttons-section-public">
                    <button className="mit">MIT</button>
                    <button className="harvard">Harvard</button>
                    <button className="tenth">10th</button>
                    <button className="twelfth">12th</button>
                    {isMobile && <MobileFooter />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ProfileEditSection-right-main-container">
          <DesktopRight />
        </div>
      </div>
    </div>
  );
}

export default ProfileEditSection;
