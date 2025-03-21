import React, { useState } from "react";

import "./FullFlowerSectionPage.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import uploadimage1 from "./UploadImage1.png";
import uploadimage2 from "./UploadImage2.png";
import uploadimage3 from "./UploadImage3.png";

import Profileandview from "./Profileandview.png";
import Profile from "./Profile.png";
import { FaEdit } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { IoSettings } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import DesktopRight from "../DesktopRight/DesktopRight";
import DesktopLeftbottom from "../DesktopLeftbottom/DesktopLeftbottom.jsx";
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr.jsx";

function FullFlowerSectionPage() {
  const [profilePic] = useState(Profile);
  const [collabs] = useState(10);
  const [connections] = useState(50);
  const [name] = useState("Himanshu Choudhary");
  const [title] = useState("Software Engineer || Web Developer");
  const [address] = useState("Gurgaon , Haryana, India");

  const [isExpanded, setIsExpanded] = useState(false);

  const [fullAboutText] = useState(
    "Passionate developer with experience in web and mobile development. I specialize in React, Node.js, and building scalable applications. Love to work on open-source projects and contribute to the tech community."
  );

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const maxLength = 100;
  const displayedText = isExpanded
    ? fullAboutText
    : fullAboutText.slice(0, maxLength) +
      (fullAboutText.length > maxLength ? "..." : "");

  // Image Slider Functionality
  const images = [
    uploadimage1,
    uploadimage2,
    uploadimage3,
    uploadimage2,
    uploadimage3,
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImageSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImageSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Experience Data
  const experiencesData = [
    {
      title: "Farewell",
      subtitle: "Backstage Handler",
      description:
        "The actual idea of Unisphere was of The Founder Himanshu who worked for months to...",
    },
    {
      title: "Fresher party",
      subtitle: "UI/UX Designer",
      description:
        "The actual idea of Unisphere was of The Founder Himanshu who worked for months to...",
    },
    {
      title: "Feast",
      subtitle: "UI/UX Designer",
      description:
        "The actual idea of Unisphere was of The Founder Himanshu who worked for months to...",
    },
    {
      title: "Workshop",
      subtitle: "Event Coordinator",
      description:
        "The actual idea of Unisphere was of The Founder Himanshu who worked for months to...",
    },
    {
      title: "Conference",
      subtitle: "Speaker",
      description:
        "The actual idea of Unisphere was of The Founder Himanshu who worked for months to...",
    },
  ];

  const [currentExpIndex, setCurrentExpIndex] = useState(0);

  const prevExpSlide = () => {
    setCurrentExpIndex((prevIndex) =>
      prevIndex === 0 ? experiencesData.length - 1 : prevIndex - 1
    );
  };

  const nextExpSlide = () => {
    setCurrentExpIndex((prevIndex) =>
      prevIndex === experiencesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Skills and Interest Data
  const [interest] = useState([
    "UI/UX",
    "JAVA",
    "CSS",
    "C++",
    "Python",
    "V+",
    "Figma",
    "Photoshop",
  ]);
  const [skill] = useState([
    "UI/UX",
    "JAVA",
    "CSS",
    "C++",
    "Python",
    "V+",
    "Figma",
    "Photoshop",
  ]);

  const [color] = useState(["#F3FDF4", "#FDF9F9", "#eaead6", "#F7F7F7"]);

  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [currentInterestIndex, setCurrentInterestIndex] = useState(0);

  const prevSkillSlide = () => {
    setCurrentSkillIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(skill.length - 4, 0) : prevIndex - 1
    );
  };

  const nextSkillSlide = () => {
    setCurrentSkillIndex((prevIndex) =>
      prevIndex >= skill.length - 4 ? 0 : prevIndex + 1
    );
  };

  const prevInterestSlide = () => {
    setCurrentInterestIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(interest.length - 4, 0) : prevIndex - 1
    );
  };

  const nextInterestSlide = () => {
    setCurrentInterestIndex((prevIndex) =>
      prevIndex >= interest.length - 4 ? 0 : prevIndex + 1
    );
  };

  // Collab Data
  const [collaboratorName] = useState("Jane Smith");
  const [subCollaborators] = useState(["Alice", "Bob", "Charlie"]);
  const [paragraph] = useState(
    "Founder Himanshu who worked for months to think and plan all the essential stuffs to make the idea and dream to be a on ground working."
  );

  return (
    <div>
      <div className="Interest-main-container">
        <Background />
        <div className="Interest-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftbottom />
        </div>
        <div className="Interest-middle-main-container">
        <div>
      <div className="Profile-full-section-mainParent">
        <div className="Profile-full-section-container">
          {/* Profile Section */}
          <div className="Profile-full-section-whole-profile-section">
            <div className="Profile-full-section-top-nav-section">
              {/* <IoArrowBack  className="Profile-full-section-Back" /> */}
              {/* <div className="Profile-full-section-search">
                <FiSearch className="Profile-full-section-search-icon" />
                <input type="text" placeholder="Search" />
              </div> */}
            </div>
            <div className="Profile-full-section-profile-header">
              <div className="Profile-full-section-imageContainer">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="Profile-full-section-profile-pic"
                />
               
              </div>
              <div className="Profile-full-section-parent-collabs-connection">
                <div className="Profile-full-section-collabsDetails">
                  <h4>Collabs</h4> 
                  <span>{collabs}</span>
                  
                </div>
                <div className="Profile-full-section-connectionsDetails">
                  <h4>Connections</h4>
                  <span>{connections}</span>
                </div>
              </div>
            </div>

            <div className="Profile-full-section-profile-info">
              <p>{name}</p>
              <p>{title}</p>
              <p>{address}</p>
            </div>

            <div className="Profile-full-section-profile-buttons">
            
            <button className="Profile-full-section-btn" >Message</button>
            <button className="Profile-full-section-btn" >Connect</button>
            </div>
          </div>

          {/* Goal Section */}
          <div className="Profile-full-section-goal-section">
            <p className="Profile-full-section-heading">Your Plan and Goal</p>
            <p>
              {displayedText}
              <span>
                {fullAboutText.length > maxLength && (
                  <button
                    className="Profile-full-section-goal-button"
                    onClick={toggleExpand}
                  >
                    {isExpanded ? "See Less" : "See More"}
                  </button>
                )}
              </span>
            </p>
          </div>

          {/* Analytics Section */}
          <div className="Profile-full-section-main-analytics-parent">
            <div className="Profile-full-section-anlaytic-main-section">
              <p className="Profile-full-section-heading">Analytics</p>
              <div className="Profile-full-section-analytics-container">
                <div className="Profile-full-section-circle"></div>
                <div className="Profile-full-section-circle"></div>
                <div className="Profile-full-section-circle"></div>
                <div className="Profile-full-section-circle"></div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="Profile-full-section-about-section">
            <div className="Profile-full-section-about-headingAndFull">
              <p className="Profile-full-section-heading">About</p>
            </div>
            <p>
              {displayedText}
              <span>
                {fullAboutText.length > maxLength && (
                  <button
                    className="Profile-full-section-aboutAndgoal-button"
                    onClick={toggleExpand}
                  >
                    {isExpanded ? "See Less" : "See More"}
                  </button>
                )}
              </span>
            </p>
          </div>

          {/* Upload Section */}
          <div className="Profile-full-section-upload-slider-box">
            <p className="Profile-full-section-heading">Upload</p>
            <div className="Profile-full-section-down-upload-slider-con">
              <IoIosArrowBack
                className="Profile-full-section-Back"
                onClick={prevImageSlide}
              />
              <div className="Profile-full-section-slide-track">
                {images
                  .slice(currentImageIndex, currentImageIndex + 3)
                  .map((image, index) => (
                    <div
                      key={index}
                      className="Profile-full-section-each-slide"
                    >
                      <img
                        src={image}
                        alt="Slide"
                        className="Profile-full-section-slide-img"
                      />
                      <p>the actual idea..... </p>
                    </div>
                  ))}
              </div>
              <IoIosArrowForward
                className="Profile-full-section-Forward"
                onClick={nextImageSlide}
              />
            </div>
          </div>

          {/* Experience Section */}
          <div className="Profile-full-section-experience-slider-box">
            <p className="Profile-full-section-heading">Experience</p>
            <div className="Profile-full-section-down-experience-slider-con">
              <IoIosArrowBack
                 className="Profile-full-section-Back"
                onClick={prevExpSlide}
              />
              <div className="Profile-full-section-slide-track">
                {experiencesData
                  .slice(currentExpIndex, currentExpIndex + 3)
                  .map((data, index) => (
                    <div
                      style={{ backgroundColor: color[index % color.length] }}
                      key={index}
                      className="Profile-full-section-experince-inner-div"
                    >
                      <h3>{data.title}</h3>
                      <h5>{data.subtitle}</h5>
                      <p>{data.description}</p>
                    </div>
                  ))}
              </div>
              <IoIosArrowForward
               className="Profile-full-section-Forward"
                onClick={nextExpSlide}
              />
            </div>
          </div>

          {/* Skills Section */}
          <div className="Profile-full-section-main-wrapper-section">
            <div className="Profile-full-section-heading-and-logos">
              <p className="Profile-full-section-heading">Skills</p>
              <div className="Profile-full-section-logos"></div>
            </div>
            <div className="Profile-full-section-content-and-arrow">
              <IoIosArrowBack
                className="Profile-full-section-left-btn"
                onClick={prevSkillSlide}
              />
              <div className="Profile-full-section-suggested-tags">
                {skill
                  .slice(currentSkillIndex, currentSkillIndex + 4)
                  .map((skillItem, index) => (
                    <div
                      key={index}
                      style={{ backgroundColor: color[index % color.length] }}
                      className="Profile-full-section-tag"
                    >
                      {skillItem}
                    </div>
                  ))}
              </div>
              <IoIosArrowForward
                className="Profile-full-section-right-btn"
                onClick={nextSkillSlide}
              />
            </div>
          </div>

          {/* Collab Section */}
          <div className="Profile-full-section-main-collabs-section">
            <div className="Profile-full-section-heading-and-logos">
              <p
               className="Profile-full-section-heading">Collabs</p>
              <div className="Profile-full-section-logos"></div>
            </div>
            <div className="Profile-full-section-second-div-arrowAndContent">
              <IoIosArrowBack
                className="Profile-full-section-Back"
                onClick={prevImageSlide}
              />
              <div className="Profile-full-section-innerDiv-onlyContent">
                <div className="Profile-full-section-left">
                  <div className="Profile-full-section-collabratorCard">
                    <div className="Profile-full-section-collab-image">
                      <img src={uploadimage1} alt="" />
                    </div>
                    <div className="Profile-full-section-collabratorDetails">
                      <p>{collaboratorName}</p>
                      <div className="Profile-full-section-education">
                        <p>M.Tech </p>
                        <p>B.tech </p>
                      </div>
                      <div className="Profile-full-section-subCollabrators">
                        (
                        <div className="Profile-full-section-sunCollabrators-name">
                          
                          {subCollaborators.map((val, index) => (
                          <p key={index}>{val},</p>
                        ))}
                        </div>
                        )
                      </div>
                    </div>
                  </div>
                  <div className="Profile-full-section-para">
                    <p>{paragraph}</p>
                  </div>
                </div>
                <div className="Profile-collab-full-section-right">
                  <img src={uploadimage2} alt="" />
                </div>
              </div>
              <IoIosArrowForward
                className="Profile-full-section-Forward"
                onClick={nextImageSlide}
              />
            </div>
          </div>

          {/* Interest Section */}
          <div className="Profile-full-section-main-wrapper-section">
            <div className="Profile-full-section-heading-and-logos">
              <h3>Interests</h3>
              <div className="Profile-full-section-logos"></div>
            </div>
            <div className="Profile-full-section-content-and-arrow">
              <IoIosArrowBack
                className="Profile-full-section-left-btn"
                onClick={prevInterestSlide}
              />
              <div className="Profile-full-section-suggested-tags">
                {interest
                  .slice(currentInterestIndex, currentInterestIndex + 4)
                  .map((interestItem, index) => (
                    <div
                      key={index}
                      style={{ backgroundColor: color[index % color.length] }}
                      className="Profile-full-section-tag"
                    >
                      {interestItem}
                    </div>
                  ))}
              </div>
              <IoIosArrowForward
                className="Profile-full-section-right-btn"
                onClick={nextInterestSlide}
              />
            </div>
          </div>

          {/* Education Section */}
          <div className="Profile-full-section-main-education">
            <div className="Profile-full-section-upper-education">
              <div className="Profile-full-section-education-headingAndFull">
                <p className="Profile-full-section-heading">Education</p>
              </div>
              <div className="Profile-full-section-buttons-section">
                <button className="btn btn-left">Hansraj College</button>
                <button className="btn btn-middle">B.A Programme.</button>
                <button className="btn btn-middle">12th Class</button>
                <button className="btn btn-right">10th Class</button>
              </div>
            </div>
            <img
              className="Profile-full-section-public-logo"
              src={Profileandview}
              alt=""
            />
          </div>
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

export default FullFlowerSectionPage;
