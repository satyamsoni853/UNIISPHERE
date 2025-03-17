import React, { useState, useEffect } from "react";
import "./DesktopRight.css";
import Profileimg from "./Profile.jpeg";
import ConnectandCollbrate from "./Connect&coll.png";
import Sugestion1img from "./Sugestion1.png";
import Sugestion2img from "./Sugestion2.png";
import Sugestion3img from "./Sugestion3.png";
import Connectimage from "./Connect.png";

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
  const [connections, setConnections] = useState(0); // State for total connections
  const [followers, setFollowers] = useState(0);    // State for total followers (optional)
  const [userId, setUserId] = useState(null);       // State to store fetched userId

  // Fetch user connections when component mounts
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch("https://uniisphere-1.onrender.com/api/connections", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
          body: JSON.stringify({ userId: userId || "7be6aac4-b786-4b9f-b3ba-f911e2f89a04" }), // Default userId or fetched userId
        });

        if (!response.ok) {
          throw new Error("Failed to fetch connections");
        }

        const data = await response.json();
        // Extract the first userId from the connections array as the current user's ID
        const currentUserId = data.connections[0]?.userId || "7be6aac4-b786-4b9f-b3ba-f911e2f89a04";
        setUserId(currentUserId);

        // Calculate total connections based on the length of the connections array
        const totalConnections = data.connections.length || 0;
        setConnections(totalConnections);

        // Assuming followers are not directly provided, you might need a separate API call
        setFollowers(0); // Update this if the API provides followers data

      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

    fetchConnections();
  }, [userId]); // Re-run if userId changes

  return (
    <div className="right-section-container">
      <div className="rightsection">
        {/* Profile Section */}
        <div className="profile-card">
          <img src={Profileimg} alt="Profile" className="profile-image" />
          <div className="profile-right">
            <div className="profile-numbers">
              <span>{connections}</span> {/* Dynamically display connections */}
              <span>{followers}</span>   {/* Dynamically display followers */}
            </div>
            <img src={ConnectandCollbrate} alt="Connect & Collaborate" className="connect-collaborate-img" />
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <h3 className="profile-name">Rahul Verma</h3>
          <p className="profile-company">Uniisphere</p>
          <p className="profile-location">New Delhi, Delhi</p>
          <p className="profile-bio">
            The actual idea of Uniisphere was of The Founder Himanshu who worked for months to this all time ....
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