import React, { useState } from "react";
import DesktopNavbar from '../DesktopNavbar/DesktopNavbar.jsx'
import Decktopleftbottom from "../DesktopLeftbottom/DesktopLeftbottom.jsx";
import Decklefttop from "../DesktopLeftTop/DesktopLeftTop.jsx";
import DesktopMiddle from "../DesktopMiddle/DesktopMiddle.jsx";
import DesktopRight from "../DesktopRight/DesktopRight.jsx";
import "./DesktopView.css";     
 
import Backgrund from "../Background/Background.jsx";

function DesktopView() {


  return (
    <>
      <Backgrund />
      {/* Navbar */}
      <div className="desktop-navbar">
        <DesktopNavbar />
      </div>

      {/* Main View Container */}
      <div className="desktop-view-container">
        {/* Left Section - left2 above left1 */}
        <div className="desktop-view-left">
          <Decklefttop />
          <Decktopleftbottom />
        </div>

        {/* Middle Section */}
        <div className="desktop-view-middle">
          <DesktopMiddle />
 
        </div>

        {/* Right Section */}
        <div className="desktop-view-right">
          <DesktopRight />
        </div>
      </div>
    </>
  );
}

export default DesktopView;
