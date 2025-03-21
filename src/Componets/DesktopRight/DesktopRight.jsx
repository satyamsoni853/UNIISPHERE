import axios from "axios";
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
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    fullName: "",
    location: "",
    about: "",
    college: "",
  });

  // Get authentication data from localStorage
  const getAuthData = () => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("userId");
    return storedToken && storedUserId ? { token: storedToken, userId: storedUserId } : null;
  };

  // Fetch data (combined connections and profile)
  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      const authData = getAuthData();
      
      if (!authData) {
        setError("Authentication required");
        setLoading(false);
        return;
      }

      setLoading(true);
      setUserId(authData.userId);

      try {
        // Fetch connections
        const connectionsResponse = await fetch("https://uniisphere-1.onrender.com/api/connections", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authData.token}`,
          },
          signal: abortController.signal,
        });

        if (!connectionsResponse.ok) {
          throw new Error(`Failed to fetch connections: ${connectionsResponse.status}`);
        }

        const connectionsData = await connectionsResponse.json();
        setConnections(connectionsData.connections?.length || 0);

        // Fetch profile
        const profileResponse = await fetch(`https://uniisphere-1.onrender.com/getProfile/profile/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "user-id": authData.userId,
          },
          signal: abortController.signal,
        });

        if (!profileResponse.ok) {
          throw new Error(`Failed to fetch profile: ${profileResponse.status}`);
        }

        const profileData = await profileResponse.json();
        setProfileData({
          fullName: `${profileData.firstName} ${profileData.lastName}`,
          location: profileData.location,
          about: profileData.About,
          college: profileData.college,
        });

      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Error fetching data:", error);
          setError("Failed to load data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup
    return () => {
      abortController.abort();
    };
  }, []);

  const getProfilePictureUrl = () => {
    // Assuming the API returns a profile picture URL, or fallback to default
    return profileData.profilePicture || Profileimg;
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleBio = () => setIsExpanded(!isExpanded);

  return (
    <div className="right-section-container">
      <div className="rightsection">
        {/* Loading state */}
        {loading && <div className="loading">Loading profile data...</div>}
        
        {/* Error state */}
        {error && <div className="error-message">{error}</div>}
        
        {/* Profile Section */}
        {!loading && !error && (
          <>
            <div className="profile-card">
              <img 
                src={getProfilePictureUrl()} 
                alt="Profile" 
                className="profile-image"
                onError={(e) => { e.target.src = Profileimg; }}
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
              <h3 className="profile-name">{profileData.fullName || "Rahul Verma"}</h3>
              <p className="profile-company">{profileData.college || "Uniisphere"}</p>
              <p className="profile-location">{profileData.location || "New Delhi, Delhi"}</p>
              <p className="profile-bio">
                {isExpanded 
                  ? profileData.about 
                  : (profileData.about || "The actual idea of Uniisphere was of The Founder Himanshu who worked for months to this all time ....").slice(0, 100)}
                {profileData.about?.length > 100 && (
                  <span className="see-more" onClick={toggleBio}>
                    {isExpanded ? " see less" : " see more"}
                  </span>
                )}
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
                  <button>
                    <img className="connect-btn" src={Connectimage} alt="Connect" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DesktopRightsection;