import React from 'react';
import './DesktopMiddle.css';
import ConnectMidlleimage from './middleconnectimage.png';
import MiddlemainImage from './Middle-image-main.png';
import Profileimage from './Profile-image.png';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { TfiCommentsSmiley } from 'react-icons/tfi';
import { PiShareFatThin } from 'react-icons/pi';
import Smallimage1 from './small-image1.png';
import Smallimage2 from './small-image2.png';
import Smallimage3 from './small-image3.png';
import Smallimage4 from './small-image4.png';
import Smallimage5 from './small-image5.png';
import Smallimage6 from './small-image6.png';
import Smallimage7 from './small-image7.png';
import Smallimage8 from './small-image8.png';
import Smallimage9 from './small-image9.png';

function DesktopMiddle() {
  return (
    <div className="middle-middle-card">
      {/* Profile Header */}
      <div className="middle-profile-header">
        <img src={Profileimage} alt="Profile" className="middle-profile-pic" />
        <div className="middle-profile-info">
          <div className="middle-profile-top">
            <span className="middle-profile-name">Vijay Prasad</span>
            <span className="middle-post-time">18h</span>
          </div>
          <p className="middle-profile-details">University of Delhi | Works at Google</p>
        </div>
        <BsThreeDotsVertical className="middle-options-icon" />
      </div>

      {/* Main Image Container */}
      <div className="middle-main-image">
        <img src={MiddlemainImage} alt="Main" className="middle-content-image" />

        {/* Small Images Positioned Over Main Image */}
        <div className="small-images-overlay">
          {/* Right End */}
          <img src={Smallimage1} alt="Right 1" className="small-image right right1" />
          <img src={Smallimage2} alt="Right 2" className="small-image right right2" />
          <img src={Smallimage3} alt="Right 3" className="small-image right right3" />

          {/* Left End */}
          <img src={Smallimage4} alt="Left 1" className="small-image left left1" />
          <img src={Smallimage5} alt="Left 2" className="small-image left left2" />
          <img src={Smallimage6} alt="Left 3" className="small-image left left3" />

          {/* Top */}
          <img src={Smallimage7} alt="Top 1" className="small-image top top1" />
          <img src={Smallimage8} alt="Top 2" className="small-image top top2" />
          <img src={Smallimage9} alt="Top 3" className="small-image top top3" />
        </div>
      </div>

      {/* Action Bar */}
      <div className="middle-action-bar">
        <img src={ConnectMidlleimage} alt="Connect" className="middle-connect-image" />
        <div className="middle-action-icons">
          <PiShareFatThin className="middle-icon" />
          <TfiCommentsSmiley className="middle-icon" />
          <CiHeart className="middle-icon" />
        </div>
      </div>

      {/* Post Text */}
      <div className="middle-post-text">
        <span className="middle-post-author">Vijay Prasad</span> Been have evolved to go in the university and will
        probably prefer the university of... <span className="middle-see-more">more</span>
      </div>
    </div>
  );
}

export default DesktopMiddle;
