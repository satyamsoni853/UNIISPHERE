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
    <div>
      <div className="messages-widget" onClick={() => setIsOpen(!isOpen)}>
        <img src={Usericon} alt="Profile" className="profile-image" />
        <span className="messages-text">Messages</span>
        <span className="icon">{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
      </div>

      {isOpen && (
        <div className="messages-list">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="message-item"
              onClick={() => setSelectedMessage(msg)}
            >
              <p><strong>{msg.name}</strong> <span>{msg.time}</span></p>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      )}

      {selectedMessage && (
        <div className="selected-message">
          <h3>{selectedMessage.name}</h3>
          <p>{selectedMessage.text}</p>
        </div>
      )}
    </div>
  );
};

export default MessagesWidget;
