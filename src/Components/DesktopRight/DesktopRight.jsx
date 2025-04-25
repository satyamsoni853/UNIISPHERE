import axios from "axios";
import React, { useEffect, useState } from "react";
import ConnectAndCollaborate from "./connectAndCollaborate.png";
import ConnectImage from "./connectImage.png";
import "./DesktopRight.css";
import ProfileImage from "./profileImage.jpeg";
import Suggestion1Image from "./suggestion1Image.png";
import Suggestion2Image from "./suggestion2Image.png";
import Suggestion3Image from "./suggestion3Image.png";
import ConnectAndCollaborateSvg from "./connectAndCollaborate.svg";
import BottomMessagesWidget from "../BottomMessagesWidget/BottomMessagesWidget";

const suggestions = [
  { img: Suggestion1Image, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Suggestion2Image, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Suggestion3Image, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Suggestion1Image, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Suggestion2Image, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Suggestion3Image, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Suggestion3Image, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Suggestion3Image, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Suggestion3Image, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Suggestion3Image, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
];

function DesktopRightSection() {
  const [connect, setConnect] = useState(0);
  const [collaborate, setCollaborate] = useState(0);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
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
        setLoading(false);
        return;
      }

      setUserId(authData.userId);
      const storedUserId = localStorage.getItem("userId");

      try {
        const profileResponse = await axios.get(
          `https://uniisphere-1.onrender.com/getProfile/profile/?userId=${authData.userId}`,
          {
            headers: {
              "Authorization": `Bearer ${authData.token}`
            }
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
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load profile data");
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

    return profileData.profilePictureUrl ||
      profileData.profileImageUrl ||
      profileData.avatarUrl ||
      profileData.photoUrl ||
      profileData.profilePicture ||
      ProfileImage;
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
            onError={(e) => { e.target.src = ProfileImage }}
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
              <button><img className="connect-btn" src={ConnectImage} alt="" /></button>
            </div>
          ))}
        </div>
      </div>
      <BottomMessagesWidget />
    </div>
  );
}

export default DesktopRightSection;