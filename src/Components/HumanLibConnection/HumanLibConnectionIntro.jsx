import React from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopNavbar from '../DesktopNavbar/DesktopNavbar';
import DesktopRight from '../DesktopRight/DesktopRight';
import './HumanLibConnectionIntro.css';

export default function ConnectionIntro() {
  const navigate = useNavigate();

  return (
    <div className="ConnectionIntro">
      <DesktopNavbar />

      <main className="ConnectionIntro-main">
        <div className="ConnectionIntro-graphic">
          <div className="circle outer" />
          <div className="circle inner" />
          <img src="/avatars/avatar1.jpg" className="avatar pos1" alt="" />
          <img src="/avatars/avatar2.jpg" className="avatar pos2" alt="" />
          <img src="/avatars/avatar3.jpg" className="avatar pos3" alt="" />
        </div>

        <h2 className="ConnectionIntro-title">
          Get connected with the ones who are just like you. <br />
          And want someone to share their feelings
        </h2>
        <p className="ConnectionIntro-subtitle">
          Within just a click get connected to some other student who will never judge on your feelings.
        </p>

        <button
          className="ConnectionIntro-button"
          onClick={() => navigate('/connect/loading')}
        >
          Start searching
        </button>
      </main>

      <DesktopRight />
    </div>
  );
}