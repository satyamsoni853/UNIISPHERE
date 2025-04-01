import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import "./BottomMessagesWidget.css";
import Usericon from "./Usericon.png";

const messages = [
  { id: 1, name: "Vijay Prasad", time: "2 hrs", text: "Hello brother how are you. I that ...." },
  { id: 2, name: "Vijay Prasad", time: "3 hrs", text: "Hello brother how are you. I that ...." },
  { id: 3, name: "Vijay Prasad", time: "6 hrs", text: "Hello brother how are you. I that ...." },
  { id: 4, name: "Vijay Prasad", time: "8 hrs", text: "Hello brother how are you. I am sure that ...." },
  { id: 5, name: "Vijay Prasad", time: "12 hrs", text: "Hello brother how are you. I am sure that ...." },
  { id: 6, name: "Vijay Prasad", time: "18 hrs", text: "Hello brother how are you. I am sure that ...." },
  { id: 7, name: "Vijay Prasad", time: "2 days", text: "Hello brother how are you. I am sure that ...." },
];

const MessagesWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

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
