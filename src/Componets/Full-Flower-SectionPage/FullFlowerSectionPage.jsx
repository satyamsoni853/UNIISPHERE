import React, { useState } from "react";
import "./FullFlowerSectionPage.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import uploadimage1 from "./uploadImage1.png";
import uploadimage2 from "./uploadImage2.png";
import uploadimage3 from "./uploadImage3.png";
import Collab from "./Collab.png";
import CollabProfile from "./CollabProfile.png";
import Profileandview from "./Profileandview.png";
import Profile from "./Profile.png";
import { FaEdit } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { IoSettings } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";

function FullFlowerSectionPage() {
  const [profilePic] = useState(Profile);
  const [collabs] = useState(10);
  const [connections] = useState(50);
  const [name] = useState("Himanshu Choudhary");
  const [title] = useState("Software Engineer || Web Developer");
  const [address] = useState("Gurgaon , Haryana, India");
  const [buttons] = useState(["Message", "Connect"]);
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
  const [paragraph] = useState("Passionate about coding and problem-solving.");

  return (
    <div>
      <div className="Profile-full-section-mainParent">
        <div className="Profile-full-section-container">
          {/* Profile Section */}
          <div className="Profile-full-section-whole-profile-section">
            <div className="Profile-full-section-top-nav-section">
              <IoArrowBack  className="Profile-full-section-Back" />
              <div className="Profile-full-section-search">
                <FiSearch className="Profile-full-section-search-icon" />
                <input type="text" placeholder="Search" />
              </div>
            </div>
            <div className="Profile-full-section-profile-header">
              <div className="Profile-full-section-imageContainer">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="Profile-full-section-profile-pic"
                />
                <h5 className="Profile-full-section-verified">Verified</h5>
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
              {buttons.map((btn, index) => (
                <button key={index} className="Profile-full-section-btn">
                  {btn}
                </button>
              ))}
            </div>
          </div>

          {/* Goal Section */}
          <div className="Profile-full-section-aboutAndgoal-section">
            <h3>Your Plan and Goal</h3>
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

          {/* Analytics Section */}
          <div className="Profile-full-section-main-analytics-parent">
            <div className="Profile-full-section-anlaytic-main-section">
              <h3>Analytics</h3>
              <div className="Profile-full-section-analytics-container">
                <div className="Profile-full-section-circle"></div>
                <div className="Profile-full-section-circle"></div>
                <div className="Profile-full-section-circle"></div>
                <div className="Profile-full-section-circle"></div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="Profile-full-section-aboutAndgoal-section">
            <div className="Profile-full-section-about-headingAndFull">
              <h3>About</h3>
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
          <div className="Profile-full-section-slider-box">
            <h2>Upload</h2>
            <div className="Profile-full-section-down-slider-con">
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
          <div className="Profile-full-section-slider-box-experience">
            <h2>Experience</h2>
            <div className="Profile-full-section-down-slider-con">
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
              <h3>Skills</h3>
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
              <h3>Collabs</h3>
              <div className="Profile-full-section-logos"></div>
            </div>
            <div className="Profile-full-section-second-div-arrowAndContent">
              <IoIosArrowBack
                className="Profile-full-section-left-btn"
                onClick={prevImageSlide}
              />
              <div className="Profile-full-section-innerDiv-onlyContent">
                <div className="Profile-full-section-left">
                  <div className="Profile-full-section-collabratorCard">
                    <div className="Profile-full-section-collab-image">
                      <img src={uploadimage1} alt="" />
                    </div>
                    <div className="Profile-full-section-collabratorDetails">
                      <h4>{collaboratorName}</h4>
                      <div className="Profile-full-section-education"></div>
                      <div className="Profile-full-section-subCollabrators">
                        (
                        {subCollaborators.map((val, index) => (
                          <h6 key={index}>{val},</h6>
                        ))}
                        )
                      </div>
                    </div>
                  </div>
                  <div className="Profile-full-section-para">
                    <p>{paragraph}</p>
                  </div>
                </div>
                <div className="Profile-full-section-right">
                  <img src={uploadimage2} alt="" />
                </div>
              </div>
              <IoIosArrowForward
                className="Profile-full-section-right-btn"
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
                <h3>Education</h3>
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
  );
}

export default FullFlowerSectionPage;
