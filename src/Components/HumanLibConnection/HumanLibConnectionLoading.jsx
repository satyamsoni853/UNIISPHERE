import React from 'react';
import DesktopNavbar from '../DesktopNavbar/DesktopNavbar';
import DesktopRight from '../DesktopRight/DesktopRight';
import './HumanLibConnectionLoading.css';


export default function ConnectionLoading() {
  return (
    <div className="ConnectionLoading">
      <DesktopNavbar />

      <main className="ConnectionLoading-main">
        <div className="ConnectionLoading-graphic">
          <div className="ring ring1" />
          <div className="ring ring2" />
          <div className="ring ring3" />
          <div className="ring ring4" />
        </div>

        <h2 className="ConnectionLoading-title">
          Connecting with the most accurate person to you.
        </h2>
      </main>

      <DesktopRight />
    </div>
  );
}