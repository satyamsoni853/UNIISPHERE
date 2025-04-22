import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import Background from "../Background/Background.jsx";
import DesktopLeftBottomSection from '../DesktopLeftBottomSection/DesktopLeftBottomSection.jsx'
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import DesktopNavbar from  '../DesktopNavbar/DesktopNavbar.jsx'
import DesktopRight from "../DesktopRight/DesktopRight";
import MobileFooter from "../Mobilefooter/MobileFooter";
import backIcon from "./backsvg.svg";
import "./FullFlowerSectionPage.css";
import Profile from "./Profile.png";
import Profileandview from "./Profileandview.png";
import uploadimage1 from "./UploadImage1.png";
import uploadimage2 from "./UploadImage2.png";
import uploadimage3 from "./UploadImage3.png";
import { Link } from "react-router-dom";

function FullFlowerSectionPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [connections, setConnections] = useState([]);
  const [acceptedConnections, setAcceptedConnections] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("not_connected");

  const dummyExperiences = [
    {
      title: "Project A",
      description: "Worked on a freelance project to build a web application.",
    },
    {
      title: "Internship at Tech Corp",
      subtitle: "Internship",
      description:
        "Assisted in developing a mobile app during a summer internship.",
    },
    {
      title: "Open Source Contribution",
      subtitle: "Volunteer",
      description: "Contributed to an open-source project on GitHub.",
    },
    {
      title: "Startup Experience",
      subtitle: "Co-founder",
      description: "Co-founded a startup focused on AI-driven solutions.",
    },
  ];

  const defaultData = {
    profilePic: Profile,
    collabs: 10,
    connections: 50,
    name: "Kartikey Pandey",
    title: "Software Developer",
    address: "Dehradun, Uttarakhand",
    about: "Nothing to say as of now",
    fullAboutText: "Nothing to say as of now",
    skills: [
      "Python",
      "React",
      "Node.js",
      "MongoDB",
      "Git",
      "SQL",
      "HTML",
      "CSS",
      "JavaScript",
      "Java",
    ],
    interests: ["JAVA", "Painting", "Sketching", "Driving"],
    education: ["Upes dehradun", "btech"],
    collaboratorName: "Jane Smith",
    subCollaborators: ["Alice", "Bob", "Charlie"],
    paragraph:
      "Founder who worked for months to think and plan all the essential stuffs to make the idea and dream to be a on ground working.",
    experiences: dummyExperiences,
    email: "pandkartikey0@gmail.com",
    username: "kartikeyme",
    college: "Upes dehradun",
    degree: "btech",
  };

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
        setError("Authentication required");
        setProfileData(defaultData);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://uniisphere-1.onrender.com/getProfile/profile/?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Raw API response:", response.data);

        if (!response.data || !response.data[0]) {
          throw new Error("No data returned from API");
        }

        const data = response.data[0];

        const transformedData = {
          profilePic: data.profilePictureUrl || defaultData.profilePic,
          collabs:
            data.connections1?.filter((c) => c.status === "accepted").length ||
            0,
          connections:
            (data.connections1?.length || 0) + (data.connections2?.length || 0),
          connections1: data.connections1 || [],
          connections2: data.connections2 || [],
          name:
            `${data.firstName} ${data.lastName}`.trim() ||
            data.username ||
            defaultData.name,
          title: data.headline || defaultData.title,
          address: data.location || defaultData.address,
          about: data.About || defaultData.about,
          fullAboutText: data.About || defaultData.about,
          skills: data.Skills || defaultData.skills,
          interests: data.Interests || defaultData.interests,
          education: [
            data.college || defaultData.college,
            data.degree || defaultData.degree,
          ],
          experiences: [
            {
              title: data.workorProject || "No project",
              subtitle: "Project",
              description: `Working on ${data.workorProject || "No project"}`,
            },
          ],
          email: data.email || defaultData.email,
          username: data.username || defaultData.username,
        };

        console.log("Transformed data:", transformedData);
        setProfileData(transformedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching profile data:", err.response || err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch profile data"
        );
        setProfileData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  useEffect(() => {
    if (profileData) {
      const allConnections = [
        ...(profileData.connections1 || []),
        ...(profileData.connections2 || []),
      ];

      const accepted = allConnections.filter(
        (conn) => conn.status === "accepted"
      );

      setConnections(allConnections);
      setAcceptedConnections(accepted);
    }
  }, [profileData]);

  useEffect(() => {
    if (profileData) {
      console.log("Current profile data:", profileData);
    }
  }, [profileData]);

  const checkConnectionStatus = (data) => {
    const currentUserId = localStorage.getItem("userId");
    if (!currentUserId || !data) return "not_connected";

    const allConnections = [
      ...(data.connections1 || []),
      ...(data.connections2 || []),
    ];
    const connection = allConnections.find(
      (conn) =>
        (conn.userId1 === currentUserId && conn.userId2 === userId) ||
        (conn.userId2 === currentUserId && conn.userId1 === userId)
    );

    return connection ? connection.status : "not_connected";
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const maxLength = 100;
  const data = profileData || defaultData;
  const displayedText = isExpanded
    ? data.fullAboutText
    : data.fullAboutText?.slice(0, maxLength) +
      (data.fullAboutText?.length > maxLength ? "..." : "");

  const prevImageSlide = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? Math.max(images.length - 3, 0) : Math.max(prev - 1, 0)
    );
  };

  const nextImageSlide = () => {
    setCurrentImageIndex((prev) => (prev >= images.length - 3 ? 0 : prev + 1));
  };

  const prevExpSlide = () => {
    setCurrentExpIndex((prev) =>
      prev === 0
        ? Math.max(data.experiences.length - 3, 0)
        : Math.max(prev - 1, 0)
    );
  };

  const nextExpSlide = () => {
    setCurrentExpIndex((prev) =>
      prev >= data.experiences.length - 3 ? 0 : prev + 1
    );
  };

  const prevSkillSlide = () => {
    setCurrentSkillIndex((prev) =>
      prev === 0 ? Math.max(data.skills.length - 4, 0) : Math.max(prev - 1, 0)
    );
  };

  const nextSkillSlide = () => {
    setCurrentSkillIndex((prev) =>
      prev >= data.skills.length - 4 ? 0 : prev + 1
    );
  };

  const prevInterestSlide = () => {
    setCurrentInterestIndex((prev) =>
      prev === 0
        ? Math.max(data.interests.length - 4, 0)
        : Math.max(prev - 1, 0)
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
      <DesktopNavbar />
      <div className="Interest-main-container">
        <Background />
        <div className="Interest-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftBottomSection />
        </div>
        <div className="Interest-middle-main-container">
          <div>
            <div className="Profile-full-section-mainParent">
              <div className="Profile-full-section-container">
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

                {apiResponse && (
                  <div
                    style={{
                      margin: "20px",
                      padding: "10px",
                      background: "#f0f0f0",
                    }}
                  >
                    <h3>API Response:</h3>
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                      {JSON.stringify(apiResponse, null, 2)}
                    </pre>
                  </div>
                )}

                <div className="Profile-full-section-whole-profile-section">
                  <div className="Profile-full-section-top-nav-section">
                    <img
                      src={backIcon}
                      className="back-button"
                      alt="Back"
                      onClick={handleBackClick}
                    />
                    <input type="text" placeholder="Message" />
                  </div>
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
                    <div className="Profile-full-section-message-box">
                      <Link
                        to={`/MessageFinalClass2/${userId}`}
                        onClick={() => localStorage.setItem("SearchUserId", userId)}
                      >
                        Message
                      </Link>
                    </div>
                  </div>

                  <div className="Profile-full-section-profile-info">
                    <p className="Profile-full-section-name">
                      <span>(He/him)</span> {data.name}
                    </p>
                    <p>{data.title}</p>
                    <p>{data.address}</p>
                  </div>

                  <div className="Profile-full-section-profile-buttons">
                    <button className="Profile-full-section-btn">
                      SBM
                    </button>
                    <button className="Profile-full-section-btn">
                      Master Union
                    </button>
                  </div>
                </div>

                <div className="Profile-full-section-goal-section">
                  <p className="Profile-full-section-heading">About</p>
                  <p>
                    {data.about === "Nothing to say as of now" ? (
                      <span style={{ fontStyle: "italic", color: "#666" }}>
                        {data.about}
                      </span>
                    ) : (
                      displayedText
                    )}
                    {data.about !== "Nothing to say as of now" &&
                      data.fullAboutText?.length > maxLength && (
                        <button
                          className="Profile-full-section-goal-button"
                          onClick={toggleExpand}
                        >
                          {isExpanded ? "See Less" : "See More"}
                        </button>
                      )}
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

                <div className="Profile-full-section-upload-slider-box">
                  <p className="Profile-full-section-heading">Upload</p>
                  <div className="Profile-full-section-down-upload-slider-con">
                    <IoIosArrowBack
                      className={`Profile-full-section-Back ${
                        currentImageIndex === 0 ? "disabled" : ""
                      }`}
                      onClick={prevImageSlide}
                      disabled={currentImageIndex === 0}
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
                            <p>Project showcase</p>
                          </div>
                        ))}
                    </div>
                    <IoIosArrowForward
                      className={`Profile-full-section-Forward ${
                        currentImageIndex >= images.length - 3 ? "disabled" : ""
                      }`}
                      onClick={nextImageSlide}
                      disabled={currentImageIndex >= images.length - 3}
                    />
                  </div>
                </div>

                <div className="Profile-full-section-experience-slider-box">
                  <p className="Profile-full-section-heading">Experience</p>
                  <div className="Profile-full-section-down-experience-slider-con">
                    <IoIosArrowBack
                      className={`Profile-full-section-Back ${
                        currentExpIndex === 0 ? "disabled" : ""
                      }`}
                      onClick={prevExpSlide}
                      disabled={currentExpIndex === 0}
                    />
                    <div className="Profile-full-section-slide-track">
                      {data.experiences.length > 0 ? (
                        data.experiences
                          .slice(currentExpIndex, currentExpIndex + 3)
                          .map((exp, index) => (
                            <div
                              style={{
                                backgroundColor: color[index % color.length],
                              }}
                              key={index}
                              className="Profile-full-section-experince-inner-div"
                            >
                              <div className="Profile-full-section-experince-innerdiv-heading">
                                <h3>{exp.title || "Untitled"}</h3>
                                <h5>{exp.subtitle || "No subtitle"}</h5>
                              </div>
                              <p>
                                {exp.description || "No description available"}
                              </p>
                            </div>
                          ))
                      ) : (
                        <p>No experiences available</p>
                      )}
                    </div>
                    <IoIosArrowForward
                      className={`Profile-full-section-Forward ${
                        currentExpIndex >= data.experiences.length - 3
                          ? "disabled"
                          : ""
                      }`}
                      onClick={nextExpSlide}
                      disabled={currentExpIndex >= data.experiences.length - 3}
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
                      className={`Profile-full-section-left-btn ${
                        currentSkillIndex === 0 ? "disabled" : ""
                      }`}
                      onClick={prevSkillSlide}
                      disabled={currentSkillIndex === 0}
                    />
                    <div className="Profile-full-section-suggested-tags">
                      {data.skills.length > 0 ? (
                        data.skills
                          .slice(currentSkillIndex, currentSkillIndex + 4)
                          .map((skill, index) => (
                            <div
                              key={index}
                              style={{
                                backgroundColor: color[index % color.length],
                              }}
                              className="Profile-full-section-tag"
                            >
                              {skill || "Unnamed skill"}
                            </div>
                          ))
                      ) : (
                        <p>No skills available</p>
                      )}
                    </div>
                    <IoIosArrowForward
                      className={`Profile-full-section-right-btn ${
                        currentSkillIndex >= data.skills.length - 4
                          ? "disabled"
                          : ""
                      }`}
                      onClick={nextSkillSlide}
                      disabled={currentSkillIndex >= data.skills.length - 4}
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
                      className={`Profile-full-section-left-btn ${
                        currentInterestIndex === 0 ? "disabled" : ""
                      }`}
                      onClick={prevInterestSlide}
                      disabled={currentInterestIndex === 0}
                    />
                    <div className="Profile-full-section-suggested-tags">
                      {data.interests.length > 0 ? (
                        data.interests
                          .slice(currentInterestIndex, currentInterestIndex + 4)
                          .map((interest, index) => (
                            <div
                              key={index}
                              style={{
                                backgroundColor: color[index % color.length],
                              }}
                              className="Profile-full-section-tag"
                            >
                              {interest || "Unnamed interest"}
                            </div>
                          ))
                      ) : (
                        <p>No interests available</p>
                      )}
                    </div>
                    <IoIosArrowForward
                      className={`Profile-full-section-right-btn ${
                        currentInterestIndex >= data.interests.length - 4
                          ? "disabled"
                          : ""
                      }`}
                      onClick={nextInterestSlide}
                      disabled={
                        currentInterestIndex >= data.interests.length - 4
                      }
                    />
                  </div>
                </div>

                <div className="Profile-full-section-main-education">
                  <div className="Profile-full-section-upper-education">
                    <div className="Profile-full-section-education-headingAndFull">
                      <p className="Profile-full-section-heading">
                        Education Details
                      </p>
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