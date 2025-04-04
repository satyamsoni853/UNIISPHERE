import React, { useState } from "react";
import "./MobileFooter.css"; // Import CSS for styling

import Addicon from "./Addicon.png";
import Clendericon from "./Clendericon.png";
import Homeicon from "./Homeicon.png";
import Networkicon from "./Networkicon.png";
import Notificationicon from "./Notificationicon.png";
import { Link } from "react-router-dom";

function MobileFooter() { 
  const [showNetwork,setShowNetwork]=useState(false)
  return (
    <div className="mobile-footer">
      <div className="mobile-footer-container">
        <img src={Homeicon} alt="Home" className="mobile-footer-icon" />
        <img
          src={Notificationicon}
          alt="Notification"
          className="mobile-footer-icon"
        />
        <img src={Addicon} alt="Add" className="mobile-footer-add-icon" />
        <img src={Clendericon} alt="Calendar" className="mobile-footer-icon" />
        <img src={Networkicon} 
        onClick={()=>{
          setShowNetwork(!showNetwork)
        }}
        alt="Network" className="mobile-footer-icon" />
      </div>
      {showNetwork && (
        <div className="mobile-connections-card">
          <div className="mobile-connections-item">
            <Link to="/NetworkPage" className="connection-link">
              Connection
            </Link>
          </div>

          <div className="mobile-connections-item">Edu-vault</div>
          <div className="mobile-connections-item active">Human Library</div>
          <div className="mobile-connections-item">Guidance</div>
          <div className="mobile-connections-item">NGOs</div>
        </div>
      )}
    </div>
  );
}

export default MobileFooter;
