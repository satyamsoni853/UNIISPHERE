import React, { useState, useEffect } from 'react';
import './View.css';
import DesktopView from '../DesktopView/DesktopView.jsx';
import MobileView from '../Mobileview/Mobileview.jsx';

function View() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}

export default View;