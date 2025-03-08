import React from 'react';
import './DesktopMiddle.css';
import ConnectMidlleimage from './middleconnectimage.png';
import MiddlemainImage from './Middle-image-main.png';
import Profileimage from './Profile-image.png';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { TfiCommentsSmiley } from 'react-icons/tfi';
import { PiShareFatThin } from 'react-icons/pi';

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

      {/* Main Image */}
      <div className="middle-main-image">
        <img src={MiddlemainImage} alt="Main" className="middle-content-image" />
      </div>

      {/* Action Bar: Connect Button on Left, Icons on Right */}
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
