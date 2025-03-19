import axios from "axios"; // Make sure to import axios
import React, { useEffect, useState } from "react";
import ConnectandCollbrate from "./Connect&coll.png";
import Connectimage from "./Connect.png";
import "./DesktopRight.css";
import Profileimg from "./Profile.jpeg";
import Sugestion1img from "./Sugestion1.png";
import Sugestion2img from "./Sugestion2.png";
import Sugestion3img from "./Sugestion3.png";

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
  const [connections, setConnections] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get authentication data from localStorage
  const getAuthData = () => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("userId");
    return storedToken && storedUserId ? { token: storedToken, userId: storedUserId } : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      // Get auth data
      const authData = getAuthData();

      if (!authData) {
        console.error("No authentication data available");
        setError("Authentication required");
        setLoading(false);
        return;
      }

      setUserId(authData.userId);

      try {
        // Fetch profile data with userId as query parameter
        const profileResponse = await axios.get(
          `https://uniisphere-1.onrender.com/getProfile/profile/?userId=${authData.userId}`,
          {
            headers: {
              "Authorization": `Bearer ${authData.token}`
            }
          }
        );

        console.log("Full profile response:", profileResponse.data);
        
        // Set profile data from response
        if (profileResponse.data && profileResponse.data.length > 0) {
          const userData = profileResponse.data[0];
          
          // Log what profile picture fields are available
          console.log("Available profile data fields:", Object.keys(userData));
          
          setProfileData(userData);
        }

        // Fetch connections count
        const connectionsResponse = await axios.get(
          "https://uniisphere-1.onrender.com/api/connections",
          {
            headers: {
              "Authorization": `Bearer ${authData.token}`
            }
          }
        );

        console.log("Connections response:", connectionsResponse.data);
        
        // Calculate total connections from response
        const connectionCount = connectionsResponse.data.connections?.length || 0;
        setConnections(connectionCount);
        
        // For now, set followers to 0 or get from another API
        setFollowers(0);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Only run once on component mount

  // Calculate full name from profile data
  const getFullName = () => {
    if (!profileData) return "Loading...";
    return `${profileData.firstName || ""} ${profileData.lastName || ""}`.trim();
  };

  // Function to get the profile picture URL with multiple fallback options
  const getProfilePictureUrl = () => {
    if (!profileData) return Profileimg;
    
    // Try different possible field names for profile picture
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
        {/* Loading state */}
        {loading && <div className="loading">Loading profile data...</div>}
        
        {/* Error state */}
        {error && <div className="error-message">{error}</div>}
        
        {/* Profile Section */}
        <div className="profile-card">
          <img 
            src={getProfilePictureUrl()} 
            alt="Profile" 
            className="profile-image"
            onError={(e) => {e.target.src = Profileimg}}
          />
          <div className="profile-right">
            <div className="profile-numbers">
              <span>{connections}</span>
              <span>{followers}</span>
            </div>
            <img src={ConnectandCollbrate} alt="Connect & Collaborate" className="connect-collaborate-img" />
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <h3 className="profile-name">{getFullName()}</h3>
          <p className="profile-company">{profileData?.headline || "Uniisphere"}</p>
          <p className="profile-location">{profileData?.location || "Location not specified"}</p>
          <p className="profile-bio">
            {profileData?.About || "Bio not available"}
            <span className="see-more"> see more</span>
          </p>
        </div>

        {/* Suggested Connections Section */}
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
    </div>
  );
}

export default DesktopRightsection;
