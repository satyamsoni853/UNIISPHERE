import React, { useState, useEffect } from 'react';
import './View.css';
import DesktopView from '../DesktopView/DesktopView.jsx';
import MobileView from '../MobileView/MobileView.jsx'; // Fixed case consistency

function View() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768); // Use callback for initial state

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="view-container"> {/* Added className for styling */}
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}

export default View;