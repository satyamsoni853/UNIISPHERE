import React, { useRef, useEffect } from "react";
import "./Feature.css"; // Import the CSS file for styling
import { ChevronDown, ChevronUp } from "lucide-react";

function Feature() {
  const [isOpen, setIsOpen] = React.useState(false); // Feedback form visibility
  const [isSubmitted, setIsSubmitted] = React.useState(false); // Track submission
  const featureRef = useRef(null); // Ref for the feature container

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (featureRef.current && !featureRef.current.contains(event.target)) {
        setIsOpen(false); // Close the feature box if clicked outside
        setIsSubmitted(false); // Reset submission state
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle emoji click
  const handleEmojiClick = () => {
    setIsSubmitted(true); // Show thank-you message
    setTimeout(() => {
      setIsOpen(false); // Close the form after 2 seconds
      setIsSubmitted(false); // Reset submission state
    }, 2000);
  };

  // Handle submit button click
  const handleSubmit = () => {
    setIsSubmitted(true); // Show thank-you message
    setTimeout(() => {
      setIsOpen(false); // Close the form after 2 seconds
      setIsSubmitted(false); // Reset submission state
    }, 2000);
  };

  return (
    <div ref={featureRef} className="feature-container">
      <div
        className="feature-messages-widget"
        onClick={() => {
          setIsOpen(!isOpen);
          setIsSubmitted(false); // Reset submission state when toggling
        }}
      >
        <span className="feature-messages-text">Feature</span>
        <span className="feature-icon">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>

      {/* Feedback Form or Thank You Message */}
      {isOpen && (
        <div className="desktop-feedback-container">
          {isSubmitted ? (
            <div className="desktop-feedback-thankyou">
              <h2>Thanks for the feedback!</h2>
            </div>
          ) : (
            <>
              <div className="desktop-feedback-header">
                <h1>
                  We'd love your feedback! Would you like to take a quick one-step
                  survey?
                </h1>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsSubmitted(false);
                  }}
                  className="desktop-feedback-close-btn"
                >
                  ×
                </button>
              </div>
              <div className="desktop-feedback-emojis">
                <div className="desktop-feedback-emoji-btn" onClick={handleEmojiClick}>
                  <span className="desktop-feedback-emoji">😔</span>
                  <span className="desktop-feedback-emoji-emotions">Very Bad</span>
                </div>
                <div className="desktop-feedback-emoji-btn" onClick={handleEmojiClick}>
                  <span className="desktop-feedback-emoji">☹️</span>
                  <span className="desktop-feedback-emoji-emotions">Bad</span>
                </div>
                <div className="desktop-feedback-emoji-btn" onClick={handleEmojiClick}>
                  <span className="desktop-feedback-emoji">😐</span>
                  <span className="desktop-feedback-emoji-emotions">Neutral</span>
                </div>
                <div className="desktop-feedback-emoji-btn" onClick={handleEmojiClick}>
                  <span className="desktop-feedback-emoji">🙂</span>
                  <span className="desktop-feedback-emoji-emotions">Nice</span>
                </div>
                <div className="desktop-feedback-emoji-btn" onClick={handleEmojiClick}>
                  <span className="desktop-feedback-emoji">🤩</span>
                  <span className="desktop-feedback-emoji-emotions">Excellent</span>
                </div>
              </div>
              <div className="desktop-feedback-textarea-container">
                <label
                  htmlFor="desktop-feedback-textarea"
                  className="desktop-feedback-label"
                >
                  We'd love your feedback! Would you like to take a quick one-step
                  survey?
                </label>
                <textarea className="desktop-feedback-textarea"></textarea>
              </div>
              <div className="desktop-feedback-textarea-container">
                <label
                  htmlFor="desktop-feedback-textarea"
                  className="desktop-feedback-label"
                >
                  Problem you are facing and the right solution according to you which
                  we can do
                </label>
                <textarea className="desktop-feedback-textarea"></textarea>
              </div>
              <div className="desktop-feedback-buttons">
                <button
                  className="desktop-feedback-cancel-btn"
                  onClick={() => {
                    setIsOpen(false);
                    setIsSubmitted(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="desktop-feedback-submit-btn"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Feature;