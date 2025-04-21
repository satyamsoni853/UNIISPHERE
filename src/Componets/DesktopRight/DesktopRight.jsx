import axios from "axios";
import React, { useEffect, useState } from "react";
import ConnectandCollbrate from "./Connect&coll.png";
import Connectimage from "./Connect.png";
import "./DesktopRight.css";
import Profileimg from "./Profile.jpeg";
import Sugestion1img from "./Sugestion1.png";
import Sugestion2img from "./Sugestion2.png";
import Sugestion3img from "./Sugestion3.png";
import ConnectandCollbrateSvg from './CollabConnection.svg';
import BottomMessageWidth from '../BottomMessagesWidget/BottomMessagesWidget';

const suggestions = [
  { img: Sugestion1img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion2img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion3img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion1img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion2img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion3img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion3img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
  { img: Sugestion3img, name: "Ajay Pratap", university: "BHU(Banaras Hindu University)" },
];

function DesktopRightsection() {
  const [connect, setConnect] = useState(0); // Renamed from connections
  const [collaborate, setCollaborate] = useState(0); // Renamed from followers
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
      // console.log("RightSection The stored user ID is:", storedUserId);

      try {
        const profileResponse = await axios.get(
          `https://uniisphere-1.onrender.com/getProfile/profile/?userId=${authData.userId}`,
          {
            headers: {
              "Authorization": `Bearer ${authData.token}`
            }
          }
        );
        // console.log("RightSection Full profile response:", profileResponse.data);
        const username = profileResponse.data[0].username;
        const profilePictureUrl = profileResponse.data[0].profilePictureUrl;
        localStorage.setItem("profilePicture", profilePictureUrl);
        localStorage.setItem("username", username);
        if (profileResponse.data && profileResponse.data.length > 0) {
          const userData = profileResponse.data[0];
          setProfileData(userData);

          // Fetch connections1 and connections2 from _count
          const connectCount = userData._count?.connections1 || 0;
          const collaborateCount = userData._count?.connections2 || 0;
          setConnect(connectCount);
          setCollaborate(collaborateCount);
        }

        // Removed separate connections API call since connections1 and connections2 are in profile response
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
    if (!profileData) return Profileimg;

    return profileData.profilePictureUrl ||
      profileData.profileImageUrl ||
      profileData.avatarUrl ||
      profileData.photoUrl ||
      profileData.profilePicture ||
      Profileimg;
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
            onError={(e) => { e.target.src = Profileimg }}
          />
          <div className="profile-right">
            <div className="profile-numbers">
              <span>{connect}</span> {/* Updated from connections */}
              <span>{collaborate}</span> {/* Updated from followers */}
            </div>
            <img src={ConnectandCollbrateSvg} alt="Connect & Collaborate" className="connect-collaborate-img" />
          </div>
        </div>

        <div className="profile-details">
          <h3 className="profile-name">{getFullName()}</h3>
          <p className="profile-company">{profileData?.username || "Uniisphere"}</p>
          <p className="profile-location">{profileData?.location || "Location not specified"}</p>
          <p className="profile-bio">
            {profileData?.About || "Bio not available"}
            <span className="see-more"> see more</span>
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
              <button><img className="connect-btn" src={Connectimage} alt="" /></button>
            </div>
          ))}
        </div>
      </div>
      <BottomMessageWidth />
    </div>
  );
}

export default DesktopRightsection;
