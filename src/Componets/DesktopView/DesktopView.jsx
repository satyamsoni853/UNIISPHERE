import React from 'react';
import DesktopNavbarr from '../DesktopNavbarr/DesktopNavbarr.jsx';
import Decktopleftbottom from '../DesktopLeftbottom/DesktopLeftbottom.jsx'
import Decklefttop from '../DesktopLeftTop-1/DesktopLeftTop.jsx'
import DesktopMiddle from '../DesktopMiddle/DesktopMiddle.jsx'
import DesktopRight from '../DesktopRight/DesktopRight.jsx'
import './DesktopView.css';

function DesktopView() {
  return (
    <>
      {/* Navbar */}
      <div className="desktop-navbar">
        <DesktopNavbarr />
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