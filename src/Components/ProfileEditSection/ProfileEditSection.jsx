import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfileEditSection.css";
import { FiEdit } from "react-icons/fi";
import image from "./Person.png"; // Fallback image
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import DesktopRight from "../DesktopRight/DesktopRight";
import DesktopLeftBottomSection from "../DesktopLeftBottomSection/DesktopLeftBottomSection.jsx";
import DesktopLeftTop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import Background from "../Background/Background.jsx";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar.jsx";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import MobileFooter from "../Mobilefooter/MobileFooter";

function ProfileEditSection() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(image); // Default to fallback image
  const [collabs, setCollabs] = useState(10);
  const [connections, setConnections] = useState(50);
  const [name, setName] = useState("John Doe");
  const [title, setTitle] = useState("Building Uniisphere|Masters Union");
  const [address, setAddress] = useState("New York, USA");
  const [buttons, setButtons] = useState(["Message", "Connect "]);
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [education, setEducation] = useState([]);
  const [class10Board, setClass10Board] = useState("");
  const [class12Board, setClass12Board] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [fullAboutText, setFullAboutText] = useState(
    "Passionate developer with experience in web and mobile development."
  );
  const [profilePicture, setProfilePicture] = useState(null);

  const hasFetched = useRef(false);
  const skillsRef = useRef(null);
  const interestsRef = useRef(null);
  const bgGradients = [
    "linear-gradient(180deg, rgba(4, 230, 255, 0.04) 0%, rgba(255, 217, 0, 0.04) 88.89%)",
    "linear-gradient(180deg, rgba(220, 74, 69, 0.06) 0%, rgba(225, 200, 107, 0.06) 100%)",
    "linear-gradient(180deg, rgba(172, 137, 163, 0.06) 0%, rgba(103, 100, 100, 0.06) 100%)",
  ];
  

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (hasFetched.current) {
        console.log("Data already fetched, skipping...");
        return;
      }
      hasFetched.current = true;

      console.log("Fetching user data...");
      try {
        const storedUserId = localStorage.getItem("userId");
        const authToken = localStorage.getItem("authToken");

        if (!storedUserId || !authToken) {
          throw new Error("User ID not found in localStorage.");
        }

        setUserId(storedUserId);
        console.log("Profile Edit Section The stored user ID is:", storedUserId);

        const response = await axios.get(
          `https://uniisphere-backend-latest.onrender.com/api/users/profile/${storedUserId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        console.log("API Response:", response.data);

        if (response.status === 200) {
          const userData = response.data.user || response.data;
          setUserData(userData);
          logUserDetails(userData);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        console.error("Error response:", err.response?.data);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const logUserDetails = (data) => {
    const user = Array.isArray(data) ? data[0] : data;
    console.log("=== User Details ===");
    console.log("User ID:", user.userId || user._id);
    console.log("Username:", user.username);
    console.log("Email:", user.email);
    console.log("First Name:", user.firstName);
    console.log("Last Name:", user.lastName);
    console.log("Phone Number:", user.phoneNumber);
    console.log("Profile Picture URL:", user.profilePictureUrl);
    console.log("Headline:", user.headline);
    console.log("Location:", user.location);
    console.log("Gender:", user.Gender);
    console.log("Skills:", user.Skills || user.skills);
    console.log("Interests (raw):", user.Interests);
    console.log("Interests (lowercase):", user.interests);
    console.log("Python:", user.python);
    console.log("About:", user.About || user.about);
    console.log("Work or Project:", user.workorProject);
    console.log("College:", user.college);
    console.log("Degree:", user.degree);
    console.log("Connections Count:", user._count?.connections1);
    console.log("===================");
  };

  // Update state when userData changes
  useEffect(() => {
    if (userData) {
      const user = Array.isArray(userData) ? userData[0] : userData;
      
      // Debug logging
      console.log("Processing user data for skills and interests:");
      console.log("Raw skills:", user.Skills);
      console.log("Raw interests:", user.Interests);
      
      // Ensure we handle arrays properly for both Skills and Interests
      const processArray = (data) => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        if (typeof data === 'string') {
          try {
            // Try parsing if it's a JSON string
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
          } catch (e) {
            // If not JSON, split by comma if it's a comma-separated string
            return data.split(',').map(item => item.trim()).filter(Boolean);
          }
        }
        return [];
      };

      // Set basic profile info
      setProfilePic(user.profilePictureUrl || image);
      setCollabs(user.collabs || 10);
      setConnections(user._count?.connections1 || 50);
      setName(user.username || "John Doe");
      setTitle(user.headline || "Building Uniisphere|Masters Union");
      setAddress(user.location || "New York, USA");
      
      // Process skills and interests
      const processedSkills = processArray(user.Skills);
      const processedInterests = processArray(user.Interests);
      
      console.log("Processed skills:", processedSkills);
      console.log("Processed interests:", processedInterests);
      
      setSkills(processedSkills);
      setInterests(processedInterests);
      
      // Set education data
      setClass10Board(user.class10Board || "");
      setClass12Board(user.class12Board || "");
      setEducation(user.education || []);
      setFullAboutText(user.About || user.about || "Passionate developer...");
    }
  }, [userData]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file.name, "Size:", file.size);
      setProfilePicture(file);

      try {
        const authToken = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if (!authToken || !userId) {
          throw new Error("User not authenticated. Please log in.");
        }

        console.log("User ID for profile update:", userId);

        // Create FormData and append fields with correct case
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("profilePicture", file);

        // Log the exact contents being sent
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }

        // Ensure token has Bearer prefix
        const tokenWithBearer = authToken.startsWith("Bearer ")
          ? authToken
          : `Bearer ${authToken}`;

        console.log("Authorization header:", tokenWithBearer);

        const response = await axios.patch(
          "https://uniisphere-backend-latest.onrender.com/api/users/profile",
          formData,
          {
            headers: {
              Authorization: tokenWithBearer,
              Accept: "application/json",
            },
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
            // Log request configuration
            onUploadProgress: (progressEvent) => {
              console.log(
                "Upload progress:",
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );
            },
          }
        );

        console.log("Profile picture update response:", response.data);
        if (response.status === 200) {
          setProfilePic(response.data.user.profilePictureUrl);
        }
      } catch (err) {
        console.error("Error updating profile picture:", err);
        if (err.response) {
          console.error("Error response data:", err.response.data);
          console.error("Error response status:", err.response.status);
          console.error("Error response headers:", err.response.headers);
          console.error("Request config:", {
            url: err.config.url,
            method: err.config.method,
            headers: err.config.headers,
            data: err.config.data, // Log the actual data being sent
          });

          if (err.response.status === 401) {
            console.error("Token used:", err.config.headers["Authorization"]);
            // Log the FormData contents for debugging
            const formDataDebug = new FormData(err.config.data);
            for (let [key, value] of formDataDebug.entries()) {
              console.error(`FormData ${key}:`, value);
            }
            localStorage.removeItem("authToken");
            localStorage.removeItem("userId");
            navigate("/login");
          }
        } else if (err.request) {
          console.error("Network error details:", {
            readyState: err.request.readyState,
            status: err.request.status,
            statusText: err.request.statusText,
          });
        }
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
    : fullAboutText.slice(0, maxLength) +
      (fullAboutText.length > maxLength ? "..." : "");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <DesktopNavbar />
      <div className="ProfileEditSection-main-container">
        <Background />
        <div className="ProfileEditSection-left-main-container">
          <DesktopLeftTop />
          <DesktopLeftBottomSection />
        </div>
        <div className="ProfileEditSection-middle-main-container">
          <div className="Followers-middle-section-2-mainParent-public">
            <div className="Followers-middle-section-2-middle-container-public">
              <div className="Followers-middle-section-2-middle-section-public">
                <div className="Followers-middle-section-2-top-nav-Icon">
                  <IoArrowBackCircleOutline
                    className="Followers-middle-section-2-backLogo"
                    onClick={() => navigate(-1)}
                  />
                </div>

                {/* Profile Details */}
                <div className="Followers-middle-section-2-profile-header-public">
                  <div className="Followers-middle-section-2-imageContainer-public">
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="Followers-middle-section-2-profile-pic-public"
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
                  <div className="Followers-middle-section-2-collabsDetails-public">
                    <p className="section-heading">Collabs</p> <span>{collabs}</span>
                  </div>
                  <div className="Followers-middle-section-2-connectionsDetails-public">
                    <p className="section-heading">Connections</p> <span>{connections}</span>
                  </div>
                </div>

                {/* Name and Details */}
                <div className="Followers-middle-section-2-profile-info-public">
                  <div className="Followers-middle-section-2-nameAndEdit-public">
                    <Link to={`/PersonalInfoUpdate/${userId}`}>
                      <FiEdit className="Followers-middle-section-2-icon-public" />
                    </Link>
                    <p>
                      <span>(He/Him)</span>
                      {name}
                    </p>
                  </div>
                  <p className="Followers-middle-section-2-profile-info-public-title">
                    {title}
                  </p>
                  <p className="Followers-middle-section-2-profile-info-public-address">
                    {address}
                  </p>
                </div>

                <div className="Followers-middle-section-2-profile-buttons-public">
                  <button className="Followers-middle-section-2-btn-public">
                    Master Union
                  </button>
                  <button className="Followers-middle-section-2-btn-public">
                    SBM
                  </button>
                </div>

                {/* About Section */}
                <div className="section-container">
                  <div className="Followers-middle-section-2-headingAndEdit-public">
                    <p className="ProfileEdit_section-section-heading">About</p>
                    <Link to={`/about/${userId}`}>
                      <FiEdit className="Followers-middle-section-2-icon-public" />
                    </Link>
                  </div>
                  <p>
                    {displayedText}
                    {fullAboutText.length > maxLength && (
                      <button
                        className="Followers-middle-section-2-about-button-public"
                        onClick={toggleExpand}
                      >
                        {isExpanded ? "See Less" : "See More"}
                      </button>
                    )}
                  </p>
                </div>

                {/* Upload Section */}
                <div className="section-container">
                  <div className="Followers-middle-section-2-headingAndEdit-public">
                    <p className="section-heading">Upload</p>
                    <Link to={`/uploadsection/${userId}`}>
                      <FiEdit className="Followers-middle-section-2-icon-public" />
                    </Link>
                  </div>
                  <p>No Upload yet.</p>
                </div>

                {/* Experience Section */}
                <div className="section-container">
                  <div className="Followers-middle-section-2-headingAndEdit-public">
                    <p className="section-heading">Experience</p>
                    <Link to={`/AboutAndExperience/${userId}`}>
                      <FiEdit className="Followers-middle-section-2-icon-public" />
                    </Link>
                  </div>
                  <p>No Experience yet.</p>
                </div>

                {/* Skills Section */}
                <div className="section-container">
                  <div className="Followers-middle-section-2-headingAndEdit-public">
                    <p className="section-heading">Skills</p>
                    <Link to={`/skills/${userId}`}>
                      <FiEdit className="Followers-middle-section-2-icon-public" />
                    </Link>
                  </div>
                  <div className="Followers-middle-section-2-scroll-container">
                    <button
                      className="Followers-middle-section-2-scroll-btn"
                      onClick={() => scrollLeft(skillsRef)}
                    >
                      <IoIosArrowBack className="Followers-middle-section-2-ArrowBack" />
                    </button>
                    <div
                      className="Followers-middle-section-2-skill-list-public"
                      ref={skillsRef}
                    >
                      {skills.map((val, index) => (
                        <div
                          key={index}
                          style={{
                            background: bgGradients[index % bgGradients.length],
                          }}
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
                      {/* <IoIosArrowForward /> */}
                    </button>
                  </div>
                </div>

                {/* Collabs Section */}
                <div className="section-container">
                  <div className="Followers-middle-section-2-headingAndEdit-public">
                    <p className="section-heading">Collabs</p>
                    <Link to={`/collab/${userId}`}>
                      <FiEdit className="Followers-middle-section-2-icon-public" />
                    </Link>
                  </div>
                  <p>No Collab yet.</p>
                </div>

                {/* Interests Section */}
                <div className="section-container">
                  <div className="Followers-middle-section-2-headingAndEdit-public">
                    <p className="section-heading">Interests</p>
                    <Link to={`/interests/${userId}`}>
                      <FiEdit className="Followers-middle-section-2-icon-public" />
                    </Link>
                  </div>
                  <div className="Followers-middle-section-2-scroll-container">
                    <button
                      className="Followers-middle-section-2-scroll-btn"
                      onClick={() => scrollLeft(interestsRef)}
                    >
                      <IoIosArrowBack className="Followers-middle-section-2-ArrowBack" />
                    </button>
                    <div
                      className="Followers-middle-section-2-skill-list-public"
                      ref={interestsRef}
                    >
                      {interests.map((val, index) => (
                        <div
                          key={index}
                          style={{
                            background: bgGradients[index % bgGradients.length],
                          }}
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
                      {/* <IoIosArrowForward /> */}
                    </button>
                  </div>
                </div>

                {/* Education Section */}
                <div className="section-container">
                  <div className="Followers-middle-section-2-headingAndEdit-public">
                    <p className="section-heading">Education</p>
                    <Link to={`/education/${userId}`}>
                      <FiEdit className="Followers-middle-section-2-icon-public" />
                    </Link>
                  </div>
                  <div className="Followers-middle-section-2-buttons-section-public">
                    {class10Board && (
                      <button className="tenth">{class10Board}</button>
                    )}
                    {class12Board && (
                      <button className="twelfth">{class12Board}</button>
                    )}
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