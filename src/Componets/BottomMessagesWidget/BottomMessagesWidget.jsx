import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import "./BottomMessagesWidget.css";
import Usericon from  './Usericon.png'

const MessagesWidget = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="messages-widget" onClick={() => setIsOpen(!isOpen)}>
      <img
        src={Usericon}// Replace with actual image URL
        alt="Profile"
        className="profile-image"
      />
      <span className="messages-text">Messages</span>
      <span className="icon">
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </span>
    </div>
  );
};

export default MessagesWidget;