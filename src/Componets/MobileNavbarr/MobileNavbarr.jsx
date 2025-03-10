import React from "react";
import Background from "../Background/Background";
import "./MobileNavbarr.css";
import { CiSearch } from "react-icons/ci";
import Messageicon from "./Messageicon.png";
import Usericon from "./Usericon.png";
import Smallimage1 from "./small-image1.png";
import Smallimage2 from "./small-image2.png";
import Smallimage3 from "./small-image3.png";

function MobileNavbarr() {
  return (
    <div className="mobile-navbarr-container">
      <Background />
      <div className="mobile-navbarr">
        {/* Small Background Images */}
        <img src={Smallimage1} alt="Left Decor" className="small-image left" />
        <img src={Smallimage2} alt="Center Decor" className="small-image center" />
        <img src={Smallimage3} alt="Right Decor" className="small-image right" />

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
