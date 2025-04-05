import React, { useState } from "react";
import "./MessageMobileInbox.css";
import { IoIosAddCircle } from "react-icons/io";

const messagesData = [
  { id: 1, name: "Vijay Prasad", text: "Hello brother how are you. I am that ....", unread: true },
  { id: 2, name: "Arjun Verma", text: "Hello brother how are you. I am that ....", unread: true },
  { id: 3, name: "Sakshi", text: "Hello brother how are you. I am that ....", unread: true },
  { id: 4, name: "Vinod", text: "Hello brother how are you. I am that ....", unread: true },
  { id: 5, name: "Riya", text: "Hello brother how are you. I am that ....", unread: true },
  { id: 6, name: "Aditya", text: "Hello brother how are you. I am sure that ....", unread: false },
  { id: 7, name: "Prajwal", text: "Hello brother how are you. I am sure that ....", unread: false },
  { id: 8, name: "Rohit", text: "Hello brother how are you. I am sure that ....", unread: false },
  { id: 9, name: "Prajiwal", text: "Hello brother how are you. I am sure that ....", unread: false },
];

export default function MessageMobileInbox() {
  const [selectedTab, setSelectedTab] = useState("Unread");
  const [messages, setMessages] = useState(messagesData);

  const filteredMessages = messages.filter(msg =>
    selectedTab === "Unread" ? msg.unread : true
  );

  const markAsRead = (id) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === id ? { ...msg, unread: false } : msg
      )
    );
  };

  const tabs = ["Unread", "Drafts", "Groups", "Filters"];

  return (
    <div className="Message-Mobile-Container">
      
      {/* ✅ Navbar */}
      <div className="Message-Mobile-Navbar">
        <img
          className="Message-Mobile-Navbar-Avatar"
          src="https://api.dicebear.com/8.x/thumbs/svg?seed=user"
          alt="User"
        />
        <input
          className="Message-Mobile-Navbar-Input"
          type="text"
          placeholder="Search or type a message..."
        />
        <button className="Message-Mobile-Navbar-Add"><IoIosAddCircle/></button>
      </div>

      {/* Tabs */}
      <div className="Message-Mobile-Tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`Message-Mobile-Tab ${selectedTab === tab ? "active" : ""}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Message List */}
      <div className="Message-Mobile-List">
        {filteredMessages.map(msg => (
          <div
            key={msg.id}
            className="Message-Mobile-Item"
            onClick={() => markAsRead(msg.id)}
          >
            <div className="Message-Mobile-Profile">
              <img
                src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${msg.name}`}
                alt={msg.name}
                className="Message-Mobile-Avatar"
              />
              <div>
                <h3 className="Message-Mobile-Name">{msg.name}</h3>
                <p className="Message-Mobile-Text">{msg.text}</p>
              </div>
            </div>
            {msg.unread && <span className="Message-Mobile-Dot"></span>}
          </div>
        ))}
      </div>
    </div>
  );
}
