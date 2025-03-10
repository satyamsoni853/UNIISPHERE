import React from "react";
import "./MobileFooter.css"; // Import CSS for styling

import Addicon from "./Addicon.png";
import Clendericon from "./Clendericon.png";
import Homeicon from "./Homeicon.png";
import Networkicon from "./Networkicon.png";
import Notificationicon from "./Notificationicon.png";

function MobileFooter() {
  return (
    <div className="mobile-footer">
      <div className="mobile-footer-container">
        <img src={Homeicon} alt="Home" className="mobile-footer-icon" />
        <img src={Notificationicon} alt="Notification" className="mobile-footer-icon" />
        <img src={Addicon} alt="Add" className="mobile-footer-add-icon" />
        <img src={Clendericon} alt="Calendar" className="mobile-footer-icon" />
        <img src={Networkicon} alt="Network" className="mobile-footer-icon" />
      </div>
    </div>
  );
}

export default MobileFooter;
