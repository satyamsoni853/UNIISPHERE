import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfileEditSection.css";
import { FiEdit } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import PersonImage from "./Person.png"; // Fallback image
import DesktopRight from "../DesktopRight/DesktopRight";
import DesktopLeftBottomSection from '../DesktopLeftBottomSection/DesktopLeftBottomSection.jsx'
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop";
import Background from "../Background/Background";
import DesktopNavbar from  '../DesktopNavbar/DesktopNavbar.jsx'
import MobileFooter from "../Mobilefooter/MobileFooter";

function ProfileEditSection() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(PersonImage);
  const [collabs, setCollabs] = useState(10);
  const [connections, setConnections] = useState(50);
  const [name, setName] = useState("John Doe");
  const [title, setTitle] = useState("Building Uniisphere | Masters Union");
  const [address, setAddress] = useState("New York, USA");
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [education, setEducation] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [fullAboutText, setFullAboutText] = useState(
    "Passionate developer with experience in web and mobile development."
  );
  const [profilePicture, setProfilePicture] = useState(null);

  const hasFetched = useRef(false);
  const skillsRef = useRef(null);
  const interestsRef = useRef(null);
  const bgGradients = [
    "linear-gradient(to bottom, #44A9B133, #33FF0033)",
    "linear-gradient(to bottom, #DC4A4533, #E1C86B33)",
    "linear-gradient(to bottom, #AC89A333, #67646433)",
    "linear-gradient(to bottom, #44A9B133, #75757533)",
  ];

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const storedUserId = localStorage.getItem("userId");
        const authToken = localStorage.getItem("authToken");

        if (!storedUserId || !authToken) {
          throw new Error("User ID or token not found in localStorage.");
        }

        setUserId(storedUserId);
        const response = await axios.get(
          `https://uniisphere-1.onrender.com/users/profile/${storedUserId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          setUserData(response.data);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Update state when userData changes
  useEffect(() => {
    if (userData) {
      const user = Array.isArray(userData) ? userData[0] : userData;
      setProfilePic(user.profilePictureUrl || PersonImage);
      setCollabs(user.collabs || 10);
      setConnections(user._count?.connections1 || 50);
      setName(user.username || "John Doe");
      setTitle(user.headline || "Building Uniisphere | Masters Union");
      setAddress(user.location || "New York, USA");
      setSkills(user.Skills || user.skills || []);
      setInterests(user.Interests || user.interests || []);
      setEducation(user.education || []);
      setFullAboutText(user.About || user.about || "Passionate developer...");
    }
  }, [userData]);

  // Handle profile picture upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      try {
        const authToken = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if (!authToken || !userId) {
          throw new Error("User not authenticated. Please log in.");
        }

        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("profilePicture", file);

        const response = await axios.patch(
          "https://uniisphere-1.onrender.com/users/profile",
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              Accept: "application/json",
            },
          }
        );

        if (response.status === 200) {
          setProfilePic(response.data.user.profilePictureUrl);
        }
      } catch (err) {
        console.error("Error updating profile picture:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          navigate("/login");
        }
        setError("Failed to update profile picture.");
      }
    }
  };

  // Scroll functions
  const scrollLeft = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  // About section toggle
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const maxLength = 100;
  const displayedText = isExpanded
    ? fullAboutText
    : `${fullAboutText.slice(0, maxLength)}${
        fullAboutText.length > maxLength ? "..." : ""
      }`;

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="desktop-view-wrapper">
      <DesktopNavbar />
      <div className="interest-main-container">
        <Background />
        <aside className="interest-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftBottomSection />
        </aside>
        <main className="interest-middle-main-container">
          <div className="followers-middle-section-2-main-parent-public">
            <div className="followers-middle-section-2-middle-container-public">
              <div className="followers-middle-section-2-middle-section-public">
                <div className="followers-middle-section-2-top-nav-icon">
                  <IoArrowBackCircleOutline
                    className="followers-middle-section-2-back-logo"
                    onClick={() => navigate(-1)}
                    role="button"
                    aria-label="Go back"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && navigate(-1)}
                  />
                </div>

                {/* Profile Details */}
                <div className="followers-middle-section-2-profile-header-public">
                  <div className="followers-middle-section-2-image-container-public">
                    <img
                      src={profilePic}
                      alt={`${name}'s profile`}
                      className="followers-middle-section-2-profile-pic-public"
                    />
                    <label className="profile-picture-edit-label">
                      <FiEdit className="edit-icon" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                  <div className="followers-middle-section-2-collabs-details-public">
                    <h4>Collabs</h4>
                    <span>{collabs}</span>
                  </div>
                  <div className="followers-middle-section-2-connections-details-public">
                    <h4>Connections</h4>
                    <span>{connections}</span>
                  </div>
                </div>

                {/* Name and Details */}
                <div className="followers-middle-section-2-profile-info-public">
                  <div className="followers-middle-section-2-name-and-edit-public">
                    <Link to={`/PersonalInfoUpdate/${userId}`}>
                      <FiEdit className="followers-middle-section-2-icon-public" />
                    </Link>
                    <p className="followers-middle-section-2-profile-info-public-name">
                      <span style={{ marginRight: "12px" }}>(He/Him)</span>
                      {name}
                    </p>
                  </div>
                  <p className="followers-middle-section-2-profile-info-public-title">
                    {title}
                  </p>
                  <p className="followers-middle-section-2-profile-info-public-address">
                    {address}
                  </p>
                </div>

                <div className="followers-middle-section-2-profile-buttons-public">
                  <button className="followers-middle-section-2-btn-public">
                    Masters Union
                  </button>
                  <button className="followers-middle-section-2-btn-public">
                    SBM
                  </button>
                </div>

                {/* About Section */}
                <div className="followers-middle-section-2-about-section-public">
                  <h3>About</h3>
                  <p>
                    {displayedText}
                    {fullAboutText.length > maxLength && (
                      <button
                        className="followers-middle-section-2-about-button-public"
                        onClick={toggleExpand}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? "See Less" : "See More"}
                      </button>
                    )}
                  </p>
                </div>

                {/* Upload Section */}
                <div className="followers-middle-section-2-upload-section-public">
                  <div className="followers-middle-section-2-heading-and-edit-public">
                    <p>Upload</p>
                    <Link to={`/uploadsection/${userId}`}>
                      <FiEdit className="followers-middle-section-2-icon-public" />
                    </Link>
                  </div>
                  <h6>No Upload yet.</h6>
                </div>

                {/* Experience Section */}
                <div className="followers-middle-section-2-upload-section-public">
                  <div className="followers-middle-section-2-heading-and-edit-public">
                    <p>Experience</p>
                    <Link to={`/AboutAndExperience/${userId}`}>
                      <FiEdit className="followers-middle-section-2-icon-public" />
                    </Link>
                  </div>
                  <h6>No Experience yet.</h6>
                </div>

                {/* Skills Section */}
                <div className="followers-middle-section-2-skills-section-public">
                  <div className="followers-middle-section-2-heading-and-icons-public">
                    <h3>Skills</h3>
                    <Link to={`/Skill/${userId}`}>
                      <FiEdit className="followers-middle-section-2-icon-public" />
                    </Link>
                  </div>
                  <div className="followers-middle-section-2-scroll-container">
                    <button
                      className="followers-middle-section-2-scroll-btn"
                      onClick={() => scrollLeft(skillsRef)}
                      aria-label="Scroll skills left"
                    >
                      <IoIosArrowBack />
                    </button>
                    <div
                      className="followers-middle-section-2-skill-list-public"
                      ref={skillsRef}
                    >
                      {skills.map((val, index) => (
                        <div
                          key={index}
                          style={{
                            background: bgGradients[index % bgGradients.length],
                          }}
                          className="followers-middle-section-2-skills-mini-div-public"
                        >
                          {val}
                        </div>
                      ))}
                    </div>
                    <button
                      className="followers-middle-section-2-scroll-btn"
                      onClick={() => scrollRight(skillsRef)}
                      aria-label="Scroll skills right"
                    >
                      <IoIosArrowForward />
                    </button>
                  </div>
                </div>

                {/* Collabs Section */}
                <div className="followers-middle-section-2-upload-section-public">
                  <div className="followers-middle-section-2-heading-and-edit-public">
                    <p>Collabs</p>
                    <Link to={`/Collab/${userId}`}>
                      <FiEdit className="followers-middle-section-2-icon-public" />
                    </Link>
                  </div>
                  <h6>No Collab yet.</h6>
                </div>

                {/* Interests Section */}
                <div className="followers-middle-section-2-skills-section-public">
                  <div className="followers-middle-section-2-heading-and-icons-public">
                    <h3>Interests</h3>
                    <Link to={`/Interest/${userId}`}>
                      <FiEdit className="followers-middle-section-2-icon-public" />
                    </Link>
                  </div>
                  <div className="followers-middle-section-2-scroll-container">
                    <button
                      className="followers-middle-section-2-scroll-btn"
                      onClick={() => scrollLeft(interestsRef)}
                      aria-label="Scroll interests left"
                    >
                      <IoIosArrowBack />
                    </button>
                    <div
                      className="followers-middle-section-2-skill-list-public"
                      ref={interestsRef}
                    >
                      {interests.map((val, index) => (
                        <div
                          key={index}
                          style={{
                            background: bgGradients[index % bgGradients.length],
                          }}
                          className="followers-middle-section-2-skills-mini-div-public"
                        >
                          {val}
                        </div>
                      ))}
                    </div>
                    <button
                      className="followers-middle-section-2-scroll-btn"
                      onClick={() => scrollRight(interestsRef)}
                      aria-label="Scroll interests right"
                    >
                      <IoIosArrowForward />
                    </button>
                  </div>
                </div>

                {/* Education Section */}
                <div className="followers-middle-section-2-main-education-public">
                  <div className="followers-middle-section-2-education-heading-and-edit-public">
                    <h3>Education</h3>
                    <Link to={`/EducationEdit/${userId}`}>
                      <FiEdit className="followers-middle-section-2-icon-public" />
                    </Link>
                  </div>
                  <div className="followers-middle-section-2-buttons-section-public">
                    {education.map((edu, index) => (
                      <button key={index} className="education-button">
                        {edu}
                      </button>
                    ))}
                    {!education.length && (
                      <>
                        <button className="education-button">MIT</button>
                        <button className="education-button">Harvard</button>
                        <button className="education-button">10th</button>
                        <button className="education-button">12th</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {isMobile && (
              <div className="interest-section-mobile-footer">
                <MobileFooter />
              </div>
            )}
          </div>
        </main>
        <aside className="interest-right-main-container">
          <DesktopRight />
        </aside>
      </div>
    </div>
  );
}

export default ProfileEditSection;
