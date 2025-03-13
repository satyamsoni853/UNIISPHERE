import React from "react";
import Background from "../Background/Background";
import "./MobileNavbarr.css";
import { CiSearch } from "react-icons/ci";
import Messageicon from "./Messageicon.png";
import Usericon from "./Usericon.png";


function MobileNavbarr() {
  return (
    <div className="mobile-navbarr-container">
      <Background />
      <div className="mobile-navbarr">
        {/* Small Background Images */}
        

        {/* User Icon */}
        <img src={Usericon} alt="User" className="mobile-navbarr-icon" />

        {/* Search Bar */}
        <div className="mobile-navbarr-search">
          <CiSearch className="mobile-navbarr-search-icon" />
          <input type="text" placeholder="Search" className="mobile-navbarr-input" />
        </div>

        {/* Message Icon */}
        <img src={Messageicon} alt="Message" className="mobile-navbarr-icon" />
      </div>
    </div>
  );
}

export default MobileNavbarr;
