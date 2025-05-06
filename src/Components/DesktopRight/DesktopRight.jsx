import axios from "axios";
import React, { useEffect, useState } from "react";
import ConnectImage from "./connectImage.png";
import "./DesktopRight.css";
import ProfileImage from "./profileImage.jpeg";
import ConnectAndCollaborateSvg from "./connectAndCollaborate.svg";
import BottomMessagesWidget from "../BottomMessagesWidget/BottomMessagesWidget";

const dummySuggestions = [
  {
    img: ProfileImage,
    name: "Ajay Pratap",
    university: "BHU (Banaras Hindu University)",
  },
  {
    img: ProfileImage,
    name: "Ravi Sharma",
    university: "IIT Delhi",
  },
  {
    img: ProfileImage,
    name: "Priya Singh",
    university: "JNU (Jawaharlal Nehru University)",
  },
  {
    img: ProfileImage,
    name: "Priya Singh",
    university: "JNU (Jawaharlal Nehru University)",
  },
  {
    img: ProfileImage,
    name: "Priya Singh",
    university: "JNU (Jawaharlal Nehru University)",
  },
  {
    img: ProfileImage,
    name: "Priya Singh",
    university: "JNU (Jawaharlal Nehru University)",
  },
];

function DesktopRightSection() {
  const [connect, setConnect] = useState(0);
  const [collaborate, setCollaborate] = useState(0);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthData = () => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("userId");
    return storedToken && storedUserId ? { token: storedToken, userId: storedUserId } : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const authData = getAuthData();

      if (!authData) {
        console.error("No authentication data available");
        setError("Authentication required");
        setSuggestions(dummySuggestions);
        setLoading(false);
        return;
      }

      setUserId(authData.userId);

      try {
        const profileResponse = await axios.get(
          `https://uniisphere-backend-latest.onrender.com/api/users/profile/?userId=${authData.userId}`,
          {
            headers: {
              Authorization: `Bearer ${authData.token}`,
            },
          }
        );

        const username = profileResponse.data[0].username;
        const profilePictureUrl = profileResponse.data[0].profilePictureUrl;
        localStorage.setItem("profilePicture", profilePictureUrl);
        localStorage.setItem("username", username);

        if (profileResponse.data && profileResponse.data.length > 0) {
          const userData = profileResponse.data[0];
          setProfileData(userData);

          const connectCount = userData._count?.connections1 || 0;
          const collaborateCount = userData._count?.connections2 || 0;
          setConnect(connectCount);
          setCollaborate(collaborateCount);
        }

        const suggestionsResponse = await axios({
          method: "get",
          url: `https://uniisphere-backend-latest.onrender.com/api/suggestions`,
          data: { userId: authData.userId },
          headers: {
            Authorization: `Bearer ${authData.token}`,
            "Content-Type": "application/json",
          },
        });

        const fetchedSuggestions = suggestionsResponse.data.map((user) => ({
          img: user.profilePictureUrl || ProfileImage,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Unknown User",
          university: user.university || "University not specified",
        }));

        setSuggestions(fetchedSuggestions);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
        setSuggestions(dummySuggestions);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getFullName = () => {
    if (!profileData) return "Loading...";
    return `${profileData.firstName || ""} ${profileData.lastName || ""}`.trim();
  };

  const getProfilePictureUrl = () => {
    if (!profileData) return ProfileImage;

    return (
      profileData.profilePictureUrl ||
      profileData.profileImageUrl ||
      profileData.avatarUrl ||
      profileData.photoUrl ||
      profileData.profilePicture ||
      ProfileImage
    );
  };

  return (
    <div className="right-section-container">
      <div className="rightsection">
        {loading && <div className="loading">Loading profile data...</div>}

        {error && <div className="error-message">{error}</div>}

        <div className="profile-card">
          <img
            src={getProfilePictureUrl()}
            alt="Profile"
            className="profile-image"
            onError={(e) => {
              e.target.src = ProfileImage;
            }}
          />
          <div className="profile-right">
            <div className="profile-numbers">
              <span>{connect}</span>
              <span>{collaborate}</span>
            </div>
            <img src={ConnectAndCollaborateSvg} alt="Connect & Collaborate" className="connect-collaborate-img" />
          </div>
        </div>

        <div className="profile-details">
          <h3 className="profile-name">{getFullName()}</h3>
          <p className="profile-company">{profileData?.username || "Uniisphere"}</p>
          <p className="profile-location">{profileData?.location || "Location not specified"}</p>
          <p className="profile-bio">
            {profileData?.About || "Bio not available"}
            <span className="see-more"> .....see more</span>
          </p>
        </div>

        <div className="suggested-cards">
          <h4 className="suggested-title">Suggestions</h4>
          {suggestions.map((suggestion, index) => (
            <div key={index} className="suggestion-card">
              <img src={suggestion.img} alt={suggestion.name} className="suggestion-img" />
              <div className="suggestion-info">
                <p className="suggestion-name">{suggestion.name}</p>
                <p className="suggestion-university">{suggestion.university}</p>
              </div>
              <button>
                <img className="Desktop-connect-btn" src={ConnectImage} alt="" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <BottomMessagesWidget />
    </div>
  );
}

export default DesktopRightSection;
