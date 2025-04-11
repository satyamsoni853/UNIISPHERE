import React, { useState } from "react";
import './MentorSection.css'; 
import photoIcon from "./ProfileIcon.png";
import profilePhoto from "./profilephoto.png";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import svg1 from "./svg1.svg";
import person3 from "./person3.svg";
import person5 from "./person5.svg";
import person2 from "./person2.svg";
import person4 from "./person4.svg";
import person6 from "./person6.svg";
import svg2 from "./svg2.svg";
import svg3 from "./svg3.svg";
import svg4 from "./svg4.svg";
import backIcon from "./backsvg.svg";
import svg6 from "./svg6.svg";
import largesvg2 from "./large svg2.svg";
import largesvg3 from "./large svg3.svg";
import largesvg4 from "./large svg4.svg";
import largesvg5 from "./large svg5.svg";
import largesvg6 from "./large svg6.svg";

const MentorSection = () => {
  const [showMentorProfile, setShowMentorProfile] = useState(false);
  const [showMentorDefault, setShowMentorDefault] = useState(true);
  const [showDesktopMentorDefault, setShowDesktopMentorDefault] =
    useState(true);
  const [showDesktopMentorProfile, setShowDesktopMentorProfile] =
    useState(false);
  // Mentor data managed with useState
  const backGroundColors = ["#FFF8F1", "#E8FFF8", "#EEF7FF"];
  const textColors = ["#E79464", "#46AA87", "#6F8BE8"];
  const [skills, setSkills] = useState(["C++", "Python", "Java"]);
  const [mentors, setMentors] = useState([
    {
      name: "Yash Jadoun",
      title: "Product Designer",
      image: profilePhoto,
      mentees: "15k",
      company: "Google",
      company_image: "",
    },
    {
      name: "Tarun Bhadouria",
      title: "UI/UX Designer",
      image: profilePhoto,
      mentees: "27k",
      company: "Flipcart",
      company_image: "",
    },
    {
      name: "Yash Jadoun",
      title: "Product Designer",
      image: profilePhoto,
      mentees: "15k",
      company: "Google",
      company_image: "",
    },
    {
      name: "Tarun Bhadouria",
      title: "UI/UX Designer",
      image: profilePhoto,
      mentees: "27k",
      company: "Flipcart",
      company_image: "",
    },
    {
      name: "Tarun Bhadouria",
      title: "UI/UX Designer",
      image: profilePhoto,
      mentees: "27k",
      company: "Flipcart",
      company_image: "",
    },
    // {
    //   name: "Yash Jadoun",
    //   title: "Product Designer",
    //   image: profilePhoto,
    //   mentees: "15k",
    //   company: "Google",
    //   company_image: "",
    // },
    // {
    //   name: "Tarun Bhadouria",
    //   title: "UI/UX Designer",
    //   image: profilePhoto,
    //   mentees: "27k",
    //   company: "Flipcart",
    //   company_image: "",
    // },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {/* ******************------------DESKTOP VIEW ----------------------******************** */}
      {showDesktopMentorDefault && (
        <div className="mentor-desktop-main-container">
          {/* Header Section */}
          <div className="mentor-desktop-header">
            <div className="mentor-desktop-header-left">
              <h1 className="mentor-desktop-title">Mentors for You</h1>
              <div className="mentor-desktop-header-text">
                <h2 className="mentor-desktop-subheading">
                  Get Connected to the Best Mentors
                </h2>
                <p className="mentor-desktop-description">
                  Book and meet with the experts in there respective fields. To
                  get the shortcuts of success.
                </p>

                <div className="mentor-desktop-search-bar">
                  <input
                    type="text"
                    placeholder="Search Mentor"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="mentor-desktop-search-input"
                  />
                  <span className="mentor-desktop-search-icon">🔍</span>
                </div>
              </div>
            </div>
            {/* Mentor Images with Decorative Shapes */}
            <div className="mentor-desktop-right-section">
              <div className="mentor-desktop-profile-stack">
                <img
                  className="mentor-desktop-profile-stack-image1"
                  src={svg1}
                  alt=""
                />

                <div className="mentor-desktop-profile-stack-image-con">
                  <img src={largesvg2} alt="" />
                  <img
                    className="mentor-desktop-profile-stack-image2"
                    src={person2}
                    alt=""
                  />
                </div>
                <div className="mentor-desktop-profile-stack-image-con">
                  <img src={largesvg3} alt="" />
                  <img
                    className="mentor-desktop-profile-stack-image3"
                    src={person3}
                    alt=""
                  />
                </div>
                <div className="mentor-desktop-profile-stack-image-con">
                  <img src={largesvg4} alt="" />
                  <img
                    className="mentor-desktop-profile-stack-image4"
                    src={person4}
                    alt=""
                  />
                </div>

                <div className="mentor-desktop-profile-stack-image-con">
                  <img src={largesvg5} alt="" />
                  <img
                    className="mentor-desktop-profile-stack-image5"
                    src={person5}
                    alt=""
                  />
                </div>
                <div className="mentor-desktop-profile-stack-image-con">
                  <img src={largesvg6} alt="" />
                  <img
                    className="mentor-desktop-profile-stack-image6"
                    src={person6}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation Section */}
          <div className="mentor-desktop-recommendation">
            <div className="mentor-desktop-recommendation-header">
              <h3 className="mentor-desktop-recommendation-title">
                Recommend for you
              </h3>
              <button className="mentor-desktop-show-all">
                Show all {">"}
              </button>
            </div>
            <div className="mentor-desktop-arrow-and-cards">
              <IoIosArrowBack className="mentor-desktop-arrow" />
              <div className="mentor-desktop-cards-container">
                {mentors.map((mentor, index) => (
                  <div
                    onClick={() => {
                      setShowDesktopMentorDefault(false);
                      setShowDesktopMentorProfile(true);
                    }}
                    key={index}
                    className="mentor-desktop-card"
                  >
                    <img
                      src={mentor.image}
                      alt="Yash Jadoun"
                      className="mentor-desktop-card-image"
                    />
                    <div
                      style={{
                        backgroundColor:
                          backGroundColors[index % backGroundColors.length],
                      }}
                      className="mentor-desktop-card-heading-div"
                    >
                      <h4 className="mentor-desktop-card-name">
                        {mentor.name}
                      </h4>
                      <span className="mentor-desktop-card-title">
                        {mentor.title}
                      </span>
                      <div className="mentor-desktop-card-company">
                        <img src={photoIcon} alt="" />
                        <span>{mentor.company}</span>
                      </div>
                      <div className="mentor-desktop-card-info">
                        <div className="mentor-desktop-card-info-image">
                          <img src={photoIcon} alt="" />
                          <img src={photoIcon} alt="" />
                          <img src={photoIcon} alt="" />
                        </div>
                        <span>{mentor.mentees}+ mentee</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <IoIosArrowForward className="mentor-desktop-arrow" />
            </div>
          
          </div>
        </div>
      )}

      {showDesktopMentorProfile && (
        <div className="mentor-desktop-profile-card">
          {/* Top Section */}
          <div className="mentor-desktop-profile-left-section">
            <img
              src={profilePhoto}
              alt="Yash Jadoun"
              className="mentor-desktop-profile-photo"
            />
          </div>

          <div className="mentor-desktop-profile-right-section">
            <div className="mentor-desktop-profile-middle">
              <div className="mentor-desktop-profile-name-tagline">
                <span className="mentor-desktop-profile-name">Yash Jadoun</span>
                <span className="mentor-desktop-profile-tagline">
                  Book and Meet with the experts in there respective fields. To
                  get the shortcuts of success.
                </span>
              </div>
              <div className="mentor-desktop-profile-buttons">
                <button className="mentor-desktop-profile-button-overview">
                  Overview
                </button>
                <button className="mentor-desktop-profile-button-book">
                  Book Slot
                </button>
              </div>
              <div className="mentor-desktop-profile-experience">
                <div className="mentor-desktop-profile-experience-heading">
                  <div>
                    <span>3+</span> <span>Years of</span>
                  </div>
                  <span className="mentor-desktop-profile-experience-last-heading">
                    designing experience
                  </span>
                </div>
                <div className="mentor-desktop-profile-experience-profiles">
                  <img
                    src={profilePhoto}
                    alt="Experience Icon"
                    className="mentor-desktop-profile-experience-profile"
                  />
                  <img
                    src={profilePhoto}
                    alt="Profile 1"
                    className="mentor-desktop-profile-experience-profile"
                  />
                  <img
                    src={profilePhoto}
                    alt="Profile 2"
                    className="mentor-desktop-profile-experience-profile"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mentor-desktop-profile-bottom">
              <div className="mentor-desktop-profile-expertise">
                <h3>Expertise</h3>
                <div className="mentor-desktop-profile-skills">
                  {skills.map((val, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: backGroundColors[index],
                        color: textColors[index],
                      }}
                      className="mentor-desktop-profile-skill "
                    >
                      {val}
                    </span>
                  ))}
                  <span className="mentor-desktop-profile-skill-more">
                    15 more
                  </span>
                </div>
              </div>
              <div className="mentor-desktop-profile-projects">
                <h3>Projects</h3>
                <ul className="mentor-desktop-profile-project-list">
                  <li>The Pink Town</li>
                  <li>2018 era</li>
                  <li>Red Ant</li>

                  <span className="mentor-desktop-profile-project-more">
                    7 more
                  </span>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================MOBILE VIEW OF THE MENTOR ========================================= */}
      {showMentorDefault && (
        <div className="mentor-mobile-container">
          {/* Mentors for You Section */}
          <div className="mentor-mobile-mentors-for-you">
            <div className="mentor-mobile-top-left-section">
              <h2 className="mentor-mobile-title">Mentors for You</h2>
              <div className="mentor-mobile-description">
                <span>Get Connected to the Best Mentors.</span>
                <p>
                  Book and Meet with the experts in their respective fields.
                </p>

                <div className="mentor-mobile-settings-search">
                  <input
                    type="text"
                    placeholder="Search"
                    className="mentor-mobile-settings-search-bar"
                  />
                </div>
              </div>
            </div>
            <div className="mentor-mobile-profile-stack">
              <img src={svg1} alt="" />

              <div className="mentor-mobile-profile-stack-image-con">
                <img src={svg2} alt="" />
                <img
                  className="mentor-mobile-profile-stack-image2"
                  src={person2}
                  alt=""
                />
              </div>
              <div className="mentor-mobile-profile-stack-image-con">
                <img src={svg3} alt="" />
                <img
                  className="mentor-mobile-profile-stack-image3"
                  src={person3}
                  alt=""
                />
              </div>
              <div className="mentor-mobile-profile-stack-image-con">
                <img src={svg4} alt="" />
                <img
                  className="mentor-mobile-profile-stack-image4"
                  src={person4}
                  alt=""
                />
              </div>

              <img src={person5} alt="" />
              <div className="mentor-mobile-profile-stack-image-con">
                <img src={svg6} alt="" />
                <img
                  className="mentor-mobile-profile-stack-image6"
                  src={person6}
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* Top Mentor Section */}
          <div className="mentor-mobile-top-mentor">
            <div className="mentor-mobile-top-header">
              <h2 className="mentor-mobile-title">Top Mentor</h2>
              <Link href="#" className="mentor-mobile-see-all">
                See All{" "}
                <span>
                  {" "}
                  <IoIosArrowForward />{" "}
                </span>
              </Link>
            </div>
            <div className="mentor-mobile-card-list">
              {mentors.map((mentor, index) => (
                <div
                  onClick={() => {
                    setShowMentorDefault(false);
                    setShowMentorProfile(true);
                  }}
                  key={index}
                  className="mentor-mobile-card"
                >
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="mentor-mobile-card-img"
                  />
                  <div className="mentor-mobile-card-info">
                    <h3 className="mentor-mobile-card-name">{mentor.name}</h3>
                    <p className="mentor-mobile-card-title">{mentor.title}</p>
                    <div className="mentor-mobile-card-company-logo-and-image">
                      <img
                        className="mentor-mobile-card-company-logo"
                        src={photoIcon}
                        alt=""
                      />
                      <span className="mentor-mobile-card-company-name">
                        {mentor.company}
                      </span>
                    </div>
                    <div className="mentor-mobile-mantess-image-and-data">
                      <img
                        className="mentor-mobile-mantess-image"
                        src={photoIcon}
                        alt=""
                      />
                      <img
                        className="mentor-mobile-mantess-image"
                        src={photoIcon}
                        alt=""
                      />
                      <img
                        className="mentor-mobile-mantess-image"
                        src={photoIcon}
                        alt=""
                      />
                      <span className="mentor-mobile-card-mentees">
                        {mentor.mentees}+ Mentees
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* ==============SPECFIC MENTOR PROFILE========================= */}
      {showMentorProfile && (
        <div className="mentor-profile-card">
          {/* Top Section */}
          <div className="mentor-profile-top">
            <img
              src={profilePhoto}
              alt="Yash Jadoun"
              className="mentor-profile-photo"
            />
            <img
              onClick={() => {
                setShowMentorDefault(true);
                setShowMentorProfile(false);
              }}
              className="mentor-profile-backIcon"
              src={backIcon}
              alt=""
            />
            <div className="mentor-profile-name-tagline">
              <span className="mentor-profile-name">Yash Jadoun</span>
              <span className="mentor-profile-tagline">
                Book and Meet with the experts in there respective fields. To
                get the shortcuts of success.
              </span>
            </div>
          </div>

          {/* Middle Section */}
          <div className="mentor-profile-middle">
            <div className="mentor-profile-buttons">
              <button className="mentor-profile-button-overview">
                Overview
              </button>
              <button className="mentor-profile-button-book">Book Slot</button>
            </div>
            <div className="mentor-profile-experience">
              <div className="mentor-profile-experience-heading">
                <div>
                  <span>3+</span> <span>Years of</span>
                </div>
                <span className="mentor-profile-experience-last-heading">
                  designing experience
                </span>
              </div>
              <div className="mentor-profile-experience-profiles">
                <img
                  src={profilePhoto}
                  alt="Experience Icon"
                  className="mentor-profile-experience-profile"
                />
                <img
                  src={profilePhoto}
                  alt="Profile 1"
                  className="mentor-profile-experience-profile"
                />
                <img
                  src={profilePhoto}
                  alt="Profile 2"
                  className="mentor-profile-experience-profile"
                />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mentor-profile-bottom">
            <div className="mentor-profile-expertise">
              <h3>Expertise</h3>
              <div className="mentor-profile-skills">
                {skills.map((val, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: backGroundColors[index],
                      color: textColors[index],
                    }}
                    className="mentor-profile-skill "
                  >
                    {val}
                  </span>
                ))}
                <span className="mentor-profile-skill-more">15 more</span>
              </div>
            </div>
            <div className="mentor-profile-projects">
              <h3>Projects</h3>
              <ul className="mentor-profile-project-list">
                <li>The Pink Town</li>
                <li>2018 era</li>
                <li>Red Ant</li>

                <span className="mentor-profile-project-more">7 more</span>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MentorSection;
