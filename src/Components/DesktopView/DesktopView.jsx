import React from 'react';
import DesktopNavbar from '../DesktopNavbar/DesktopNavbar';
import DesktopLeftBottomSection from '../DesktopLeftBottomSection/DesktopLeftBottomSection.jsx';
import DesktopLeftTop from '../DesktopLeftTop/DesktopLeftTop';
import DesktopMiddle from '../DesktopMiddle/DesktopMiddle';
import DesktopRight from '../DesktopRight/DesktopRight';
import Background from '../Background/Background';
import Feature from '../Feature/Feature';
import './DesktopView.css';

function DesktopView() {
  return (
    <div className="desktop-view-wrapper">
      <Background />
      
      {/* Navbar */}
      <header className="desktop-navbar">
        <DesktopNavbar />
      </header>

      {/* Main View Container */}
      <main className="desktop-view-container">
        {/* Left Section - left2 above left1 */}
        <aside className="desktop-view-left">
          <DesktopLeftTop />
          <DesktopLeftBottomSection />
          {/* <Feature/> */}
        </aside>

        {/* Middle Section */}
        <section className="desktop-view-middle">
          <DesktopMiddle />
        </section>

        {/* Right Section */}
        <aside className="desktop-view-right">
          <DesktopRight />
        </aside>
      </main>
    </div>
  );
}

export default DesktopView;