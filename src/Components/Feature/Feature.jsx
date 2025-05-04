import React from "react";

import "./Feature.css"; // Import the CSS file for styling
import { ChevronDown, ChevronUp } from "lucide-react";

function Feature() {
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <div
        className="feature-messages-widget"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className="feature-messages-text">Feature</span>
        <span className="feature-icon">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>

      {/* Feedback Form */}
      {isOpen && (
        <div className="desktop-feedback-container">
          <div className="desktop-feedback-header">
            <h1>
              We'd love your feedback! Would you like to take a quick one-step
              survey?
            </h1>
            <button 
            onClick={()=>{
            setIsOpen(false)
            }}
            className="desktop-feedback-close-btn">×</button>
          </div>
          <div className="desktop-feedback-emojis">
            <div className="desktop-feedback-emoji-btn">
             <span className="desktop-feedback-emoji">😔</span>
             <span className="desktop-feedback-emoji-emotions">Very Bad</span>
            </div>
            <div className="desktop-feedback-emoji-btn">
             <span className="desktop-feedback-emoji">☹️</span>
             <span className="desktop-feedback-emoji-emotions">Bad</span>
            </div>
            <div className="desktop-feedback-emoji-btn">
             <span className="desktop-feedback-emoji">😐</span>
             <span className="desktop-feedback-emoji-emotions">Neutral</span>
            </div>
            <div className="desktop-feedback-emoji-btn">
             <span className="desktop-feedback-emoji">🙂</span>
             <span className="desktop-feedback-emoji-emotions">Nice</span>
            </div>
            <div className="desktop-feedback-emoji-btn">
             <span className="desktop-feedback-emoji">🤩</span>
             <span className="desktop-feedback-emoji-emotions">Excellent</span>
            </div>
            
          </div>
          <div className="desktop-feedback-textarea-container">

            <label htmlFor="desktop-feedback-textarea" className="desktop-feedback-label">
               We'd love your feedback! Would you like to take a quick one-step
              survey?
            </label>
            <textarea
              className="desktop-feedback-textarea"
             
            ></textarea>
          </div>
          <div className="desktop-feedback-textarea-container">

            <label htmlFor="desktop-feedback-textarea" className="desktop-feedback-label">
            Problem you are facing and the right solution according to you which we can do
            </label>
            <textarea
              className="desktop-feedback-textarea"
             
            ></textarea>
          </div>
          <div className="desktop-feedback-buttons">
            <button className="desktop-feedback-cancel-btn">Cancel</button>
            <button className="desktop-feedback-submit-btn">Submit</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Feature;
