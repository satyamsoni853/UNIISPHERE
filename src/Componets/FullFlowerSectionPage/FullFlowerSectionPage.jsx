import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Background from "../Background/Background.jsx";
import DesktopLeftbottom from "../DesktopLeftbottom/DesktopLeftbottom.jsx";
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr.jsx";
import DesktopRight from "../DesktopRight/DesktopRight";
import MobileFooter from "../Mobilefooter/MobileFooter";
import "./FullFlowerSectionPage.css";
import Profile from "./Profile.png";
import Profileandview from "./Profileandview.png";
import uploadimage1 from "./UploadImage1.png";
import uploadimage2 from "./UploadImage2.png";
import uploadimage3 from "./UploadImage3.png";

function FullFlowerSectionPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);

  // Default dummy data
  const defaultData = {
    profilePic: Profile,
    collabs: 10,
    connections: 50,
    name: "Himanshu Choudhary",
    title: "Software Engineer || Web Developer",
    address: "Gurgaon, Haryana, India",
    about:
      "Passionate developer with experience in web and mobile development.",
    fullAboutText:
      "Passionate developer with experience in web and mobile development. I specialize in React, Node.js, and building scalable applications. Love to work on open-source projects and contribute to the tech community.",
    skills: [
      "UI/UX",
      "JAVA",
      "CSS",
      "C++",
      "Python",
      "V+",
      "Figma",
      "Photoshop",
    ],
    interests: [
      "UI/UX",
      "JAVA",
      "CSS",
      "C++",
      "Python",
      "V+",
      "Figma",
      "Photoshop",
    ],
    education: ["Hansraj College", "B.A Programme", "12th Class", "10th Class"],
    collaboratorName: "Jane Smith",
    subCollaborators: ["Alice", "Bob", "Charlie"],
    paragraph:
      "Founder Himanshu who worked for months to think and plan all the essential stuffs to make the idea and dream to be a on ground working.",
    experiences: [
      {
        title: "Farewell",
        subtitle: "Backstage Handler",
        description:
          "The actual idea of Unisphere was of The Founder Himanshu who worked for months to...",
      },
    ],
  };

  // Image data
  const images = [
    uploadimage1,
    uploadimage2,
    uploadimage3,
    uploadimage2,
    uploadimage3,
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentExpIndex, setCurrentExpIndex] = useState(0);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [currentInterestIndex, setCurrentInterestIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const color = ["#F3FDF4", "#FDF9F9", "#eaead6", "#F7F7F7"];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        setError("Authentication required. Using dummy data.");
        setProfileData(defaultData);
        setLoading(false);
        return;
      }

      if (!userId || userId === "unknown") {
        setError("Invalid user ID. Using dummy data.");
        setProfileData(defaultData);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://uniisphere-1.onrender.com/getProfile/profile/${userId}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        const data = response.data;
        if (!data || Object.keys(data).length === 0) {
          throw new Error("No data returned from API");
        }

        // Transform API data to match our component's structure
        const transformedData = {
          profilePic: data.profilePictureUrl || defaultData.profilePic,
          collabs: data._count?.connections1 || defaultData.collabs,
          connections:
            (data._count?.connections1 || 0) +
              (data._count?.connections2 || 0) || defaultData.connections,
          name:
            `${data.firstName || ""} ${data.lastName || ""}`.trim() ||
            defaultData.name,
          title: data.headline || defaultData.title,
          address: data.location || defaultData.address,
          about: data.About || defaultData.about,
          fullAboutText: data.About || defaultData.fullAboutText,
          skills: data.skills || defaultData.skills,
          interests: data.interests || defaultData.interests,
          education: data.education || defaultData.education,
          collaboratorName:
            data.collaboratorName || defaultData.collaboratorName,
          subCollaborators:
            data.subCollaborators || defaultData.subCollaborators,
          paragraph: data.paragraph || defaultData.paragraph,
          experiences: data.experiences || defaultData.experiences,
        };

        setProfileData(transformedData);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile data. Showing dummy data.");
        setProfileData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  // Handler functions
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const maxLength = 100;
  const data = profileData || defaultData;
  const displayedText = isExpanded
    ? data.fullAboutText
    : data.fullAboutText?.slice(0, maxLength) +
      (data.fullAboutText?.length > maxLength ? "..." : "");

  const prevImageSlide = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImageSlide = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevExpSlide = () => {
    setCurrentExpIndex((prev) =>
      prev === 0 ? data.experiences.length - 1 : prev - 1
    );
  };

  const nextExpSlide = () => {
    setCurrentExpIndex((prev) =>
      prev === data.experiences.length - 1 ? 0 : prev + 1
    );
  };

  const prevSkillSlide = () => {
    setCurrentSkillIndex((prev) =>
      prev === 0 ? Math.max(data.skills.length - 4, 0) : prev - 1
    );
  };

  const nextSkillSlide = () => {
    setCurrentSkillIndex((prev) =>
      prev >= data.skills.length - 4 ? 0 : prev + 1
    );
  };

  const prevInterestSlide = () => {
    setCurrentInterestIndex((prev) =>
      prev === 0 ? Math.max(data.interests.length - 4, 0) : prev - 1
    );
  };

  const nextInterestSlide = () => {
    setCurrentInterestIndex((prev) =>
      prev >= data.interests.length - 4 ? 0 : prev + 1
    );
  };

  const handleBackClick = () => navigate("/");

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
    );
  }

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
          <div>
            <div className="Profile-full-section-mainParent">
              <div className="Profile-full-section-container">
                <IoArrowBack
                  className="back-button"
                  onClick={handleBackClick}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",
                    margin: "10px",
                  }}
                />
                {error && (
                  <div
                    style={{
                      color: "orange",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    {error}
                  </div>
                )}
                <div className="Profile-full-section-whole-profile-section">
                  <div className="Profile-full-section-top-nav-section"></div>
                  <div className="Profile-full-section-profile-header">
                    <div className="Profile-full-section-imageContainer">
                      <img
                        src={data.profilePic}
                        alt="Profile"
                        className="Profile-full-section-profile-pic"
                      />
                    </div>
                    <div className="Profile-full-section-parent-collabs-connection">
                      <div className="Profile-full-section-collabsDetails">
                        <h4>Collabs</h4>
                        <span>{data.collabs}</span>
                      </div>
                      <div className="Profile-full-section-connectionsDetails">
                        <h4>Connections</h4>
                        <span>{data.connections}</span>
                      </div>
                    </div>
                  </div>

                  <div className="Profile-full-section-profile-info">
                    <p>{data.name}</p>
                    <p>{data.title}</p>
                    <p>{data.address}</p>
                    <p>User ID: {userId}</p>
                  </div>

                  <div className="Profile-full-section-profile-buttons">
                    <button className="Profile-full-section-btn">
                      Message
                    </button>
                    <button className="Profile-full-section-btn">
                      Connect
                    </button>
                  </div>
                </div>

                <div className="Profile-full-section-goal-section">
                  <p className="Profile-full-section-heading">
                    Your Plan and Goal
                  </p>
                  <p>
                    {displayedText}
                    <span>
                      {data.fullAboutText?.length > maxLength && (
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

                <div className="Profile-full-section-about-section">
                  <div className="Profile-full-section-about-headingAndFull">
                    <p className="Profile-full-section-heading">About</p>
                  </div>
                  <p>
                    {displayedText}
                    <span>
                      {data.fullAboutText?.length > maxLength && (
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

                <div className="Profile-full-section-experience-slider-box">
                  <p className="Profile-full-section-heading">Experience</p>
                  <div className="Profile-full-section-down-experience-slider-con">
                    <IoIosArrowBack
                      className="Profile-full-section-Back"
                      onClick={prevExpSlide}
                    />
                    <div className="Profile-full-section-slide-track">
                      {data.experiences
                        .slice(currentExpIndex, currentExpIndex + 3)
                        .map((exp, index) => (
                          <div
                            style={{
                              backgroundColor: color[index % color.length],
                            }}
                            key={index}
                            className="Profile-full-section-experince-inner-div"
                          >
                            <h3>{exp.title}</h3>
                            <h5>{exp.subtitle}</h5>
                            <p>{exp.description}</p>
                          </div>
                        ))}
                    </div>
                    <IoIosArrowForward
                      className="Profile-full-section-Forward"
                      onClick={nextExpSlide}
                    />
                  </div>
                </div>

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
                      {data.skills
                        .slice(currentSkillIndex, currentSkillIndex + 4)
                        .map((skill, index) => (
                          <div
                            key={index}
                            style={{
                              backgroundColor: color[index % color.length],
                            }}
                            className="Profile-full-section-tag"
                          >
                            {skill}
                          </div>
                        ))}
                    </div>
                    <IoIosArrowForward
                      className="Profile-full-section-right-btn"
                      onClick={nextSkillSlide}
                    />
                  </div>
                </div>

                <div className="Profile-full-section-main-collabs-section">
                  <div className="Profile-full-section-heading-and-logos">
                    <p className="Profile-full-section-heading">Collabs</p>
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
                            <p>{data.collaboratorName}</p>
                            <div className="Profile-full-section-education">
                              <p>M.Tech </p>
                              <p>B.tech </p>
                            </div>
                            <div className="Profile-full-section-subCollabrators">
                              (
                              <div className="Profile-full-section-sunCollabrators-name">
                                {data.subCollaborators.map((val, index) => (
                                  <p key={index}>{val},</p>
                                ))}
                              </div>
                              )
                            </div>
                          </div>
                        </div>
                        <div className="Profile-full-section-para">
                          <p>{data.paragraph}</p>
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
                      {data.interests
                        .slice(currentInterestIndex, currentInterestIndex + 4)
                        .map((interest, index) => (
                          <div
                            key={index}
                            style={{
                              backgroundColor: color[index % color.length],
                            }}
                            className="Profile-full-section-tag"
                          >
                            {interest}
                          </div>
                        ))}
                    </div>
                    <IoIosArrowForward
                      className="Profile-full-section-right-btn"
                      onClick={nextInterestSlide}
                    />
                  </div>
                </div>

                <div className="Profile-full-section-main-education">
                  <div className="Profile-full-section-upper-education">
                    <div className="Profile-full-section-education-headingAndFull">
                      <p className="Profile-full-section-heading">Education</p>
                    </div>
                    <div className="Profile-full-section-buttons-section">
                      {data.education.map((edu, index) => (
                        <button
                          key={index}
                          className={`btn ${
                            index === 0
                              ? "btn-left"
                              : index === data.education.length - 1
                              ? "btn-right"
                              : "btn-middle"
                          }`}
                        >
                          {edu}
                        </button>
                      ))}
                    </div>
                  </div>
                  <img
                    className="Profile-full-section-public-logo"
                    src={Profileandview}
                    alt=""
                  />
                  {isMobile && <MobileFooter />}
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
