import React from 'react';
import DesktopNavbarr from '../DesktopNavbarr/DesktopNavbarr.jsx';
import Desktopleft1 from '../DesktopLeftTop1/DesktopLeft1.jsx';
import Desktopleft2 from '../DesktopLeftTop2/DesktopLeft2.jsx';
import DesktopMiddle from '../DesktopMiddle/DesktopMiddle.jsx';
import DesktopRight from '../RightSection/DesktopRightsection.jsx';
import './View.css';

function View() {
  return (
    <>
      {/* Navbar */}
      <div className="navbar">
        <DesktopNavbarr />
      </div>

      {/* Main View Container */}
      <div className="view-container">
        {/* Left Section */}
        <div className="view-left">
          <Desktopleft1 />
          <Desktopleft2 />
        </div>

        {/* Middle Section */}
        <div className="view-middle">
          <DesktopMiddle />
        </div>

        {/* Right Section */}
        <div className="view-right">
          <DesktopRight />
        </div>
      </div>
    </>
  );
}

export default View;
