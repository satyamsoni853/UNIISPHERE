import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use a ref to track if the alert has been shown
  const hasAlerted = useRef(false);
  // Use a ref to track if the data has been fetched
  const hasFetched = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to log user details in a structured way
  const logUserDetails = (data) => {
    // Check if data is an array and extract the first object if necessary
    const user = Array.isArray(data) ? data[0] : data;

    console.log("=== User Details ===");
    console.log("User ID:", user.userId || user._id); // Handle both `id` and `_id` (in case the API uses `_id`)
    console.log("Username:", user.username);
    console.log("Email:", user.email);
    console.log("First Name:", user.firstName);
    console.log("Last Name:", user.lastName);
    console.log("Phone Number:", user.phoneNumber);
    console.log("Profile Picture URL:", user.profilePictureUrl);
    console.log("Headline:", user.headline);
    console.log("Location:", user.location);
    console.log("Gender:", user.Gender);
    console.log("Skills:", user.Skills || user.Skills); // Handle case sensitivity
    console.log("Python:", user.python);
    console.log("About:", user.About || user.About); // Handle case sensitivity
    console.log("Interests:", user.Interests || user.Interests); // Handle case sensitivity
    console.log("Work or Project:", user.workorProject);
    console.log("College:", user.college);
    console.log("Degree:", user.degree);
    console.log("Connections Count:", user._count?.connections1); // Handle nested `_count` field
    console.log("===================");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      // Prevent duplicate fetching
      if (hasFetched.current) {
        console.log("Data already fetched, skipping...");
        return;
      }
      hasFetched.current = true;

      console.log("Fetching user data...");
      try {
        const storedUserId = localStorage.getItem("userId");
        if (!storedUserId) {
          throw new Error("User ID not found in localStorage.");
        }
        setUserId(storedUserId);
        console.log("The stored user ID is:", storedUserId);

        const response = await axios.get(
          `https://uniisphere-1.onrender.com/users/profile/${storedUserId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (response.status === 200) {
          setUserData(response.data);
          logUserDetails(response.data);
        }
      } catch (err) {
        alert("Failed to load data. Please try again later.");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Show alert when userData is updated, but only once
  useEffect(() => {
    if (userData && !hasAlerted.current) {
      hasAlerted.current = true;
      alert("Data loaded successfully!");
    }
  }, [userData]);

  // Update state variables when userData changes
  useEffect(() => {
    if (userData) {
      // Handle array response by extracting the first object
      const user = Array.isArray(userData) ? userData[0] : userData;
      setName(user.username || "John Doe");
      setTitle(user.headline || "Building Uniisphere|Masters Union");
      setAddress(user.location || "New York, USA");
      setSkills(user.Skills || user.skills || []);
      setInterests(user.Interests || user.interests || []);
      setEducation(user.education || []);
      setFullAboutText(user.About || user.about || "Passionate developer...");
    }
  }, [userData]);

  // State variables
  const [profilePic, setProfilePic] = useState(userData?.profilePicture || image);
  const [collabs, setCollabs] = useState(userData?.collabs || 10);
  const [connections, setConnections] = useState(userData?.connections || 50);
  const [name, setName] = useState("John Doe");
  const [title, setTitle] = useState("Building Uniisphere|Masters Union");
  const [address, setAddress] = useState("New York, USA");
  const [buttons, setButtons] = useState(["Message", "Connect"]);
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [education, setEducation] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Refs for scrolling
  const skillsRef = useRef(null);
  const interestsRef = useRef(null);

  // About Section with "See More" Feature
  const [fullAboutText, setFullAboutText] = useState(
    "Passionate developer with experience in web and mobile development."
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

  if (loading) return <p>Loading...</p>;

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
                  <IoArrowBackCircleOutline className="Followers-middle-section-2-backLogo" />
                </div>

                {/* Profile Details */}
                <div className="Followers-middle-section-2-profile-header-public">
                  <div className="Followers-middle-section-2-imageContainer-public">
                    <img
                      src={userData?.profilePicture || profilePic}
                      alt="Profile"
                      className="Followers-middle-section-2-profile-pic-public"
                    />
                  </div>
                  <div className="Followers-middle-section-2-collabsDetails-public">
                    <h4>Collabs</h4> <span>{userData?.collabs || collabs}</span>
                  </div>
                  <div className="Followers-middle-section-2-connectionsDetails-public">
                    <h4>Connections</h4>
                    <span>{userData?.connections || connections}</span>
                  </div>
                </div>

                {/* Name and Details */}
                <div className="Followers-middle-section-2-profile-info-public">
                  <div className="Followers-middle-section-2-nameAndEdit-public">
                    <Link to={`/PersonalInfoUpdate/${userId}`}>
                      <FiEdit className="Followers-middle-section-2-icon-public" />
                    </Link>
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
                    <Link to={`/AboutAndExperiance/${userId}`}>
                      <FiEdit className="Followers-middle-section-2-icon-public" />
                    </Link>
                  </div>
                  <h6>No Experience yet.</h6>
                </div>

                {/* Skills Section */}
                <div className="Followers-middle-section-2-skills-section-public">
                  <div className="Followers-middle-section-2-headingAndIcons-public">
                    <h3>Skills</h3>
                    <Link to={`/Skill/${userId}`}>
                      <FiEdit className="Followers-middle-section-2-icon-public" />
                    </Link>
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
                    <Link to={`/Collab/${userId}`}>
                      <FiEdit className="Followers-middle-section-2-icon-public" />
                    </Link>
                  </div>
                  <h6>No Collab yet.</h6>
                </div>

                {/* Interests Section */}
                <div className="Followers-middle-section-2-skills-section-public">
                  <div className="Followers-middle-section-2-headingAndIcons-public">
                    <h3>Interests</h3>
                    <Link to={`/Interset/${userId}`}>
                      <FiEdit className="Followers-middle-section-2-icon-public" />
                    </Link>
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
                    <Link to={`/Collab/${userId}`}>
                      <FiEdit className="Followers-middle-section-2-icon-public" />
                    </Link>
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