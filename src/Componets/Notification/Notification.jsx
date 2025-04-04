import React, { useState } from "react";

const notifications = [
  { time: "2 hrs", message: "Hello brother how are you. I that ....", alert: true, color: "notification-border-blue-400" },
  { time: "3 hrs", message: "Hello brother how are you. I that ....", alert: true, color: "notification-border-yellow-400" },
  { time: "6 hrs", message: "Hello brother how are you. I that ....", alert: true, color: "notification-border-red-400" },
  { time: "8 hrs", message: "Hello brother how are you. I am sure that ....", alert: false, color: "notification-border-gray-400" },
  { time: "12 hrs", message: "Hello brother how are you. I am sure that ....", alert: false, color: "notification-border-gray-400" },
  { time: "18 hrs", message: "Hello brother how are you. I am sure that ....", alert: false, color: "notification-border-blue-400" },
  { time: "2 days", message: "Hello brother how are you. I am sure that ....", alert: false, color: "notification-border-gray-400" },
];

const timeFilters = {
  Today: (time) => time.includes("hrs"),
  "Last Week": (time) => time.includes("days") && parseInt(time) <= 7,
  "Last Month": (time) => time.includes("days") && parseInt(time) > 7 && parseInt(time) <= 30,
  "Last Year": (time) => time.includes("days") && parseInt(time) > 30,
};

function Notification() {
  const [activeTab, setActiveTab] = useState("Today");

  const filteredNotifications = notifications.filter((notif) =>
    timeFilters[activeTab](notif.time)
  );

  return (
    <div className="notification-container">
      <div className="notification-tabs">
        {Object.keys(timeFilters).map((tab) => (
          <button
            key={tab}
            className={`notification-tab-button ${activeTab === tab ? 'bg-gray-400 text-white' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="notification-space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif, index) => (
            <div
              key={index}
              className={`notification-notification-item ${notif.color}`}
            >
              <img
                src="https://via.placeholder.com/50"
                alt="Profile"
                className="notification-profile-pic"
              />
              <div className="notification-notification-content">
                <p className="notification-font-semibold">Vijay Prasad</p>
                <p className="notification-text-sm notification-text-gray-600">{notif.message}</p>
              </div>
              <span className="notification-notification-time">{notif.time}</span>
              {notif.alert && <span className="notification-alert-icon">🔔</span>}
            </div>
          ))
        ) : (
          <p>No notifications in this time range.</p>
        )}
      </div>
    </div>
  );
}

export default Notification;
