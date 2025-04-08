import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import { MdOutlineVideoCall } from "react-icons/md";
import backIcon from "./backsvg.svg";
import callingIcon from "./call.svg";
import gallaryIcon from "./gallary.svg";
import profilePicSmall from "./profilePicSmall.png";
import stickerIcon from "./sticker.svg";
import microphoneIcon from "./on.svg";
import "./MessageFinalClass2.css";

function MessageFinalClass2() {
  const { messageId } = useParams();
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [conversations, setConversations] = useState([]); // State for sidebar conversations
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [receiverData, setReceiverData] = useState({});

  const senderId = "18114725-fcc6-4cbe-a617-894a464b9fc8";
  const token = localStorage.getItem("authToken") || "your-auth-token-here";

  // Fetch conversations for sidebar
  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://uniisphere-1.onrender.com/api/messages/conversations?userId=${senderId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch conversations: ${response.status}`);
        }

        const data = await response.json();
        console.log("Sidebar Conversations API Response:", data);

        // Map conversations to sidebar format
        const transformedConversations = data.map((msg) => ({
          id: msg.id || msg._id || msg.conversationId || msg.user?.id,
          name: msg.user?.username || "Unknown User",
          time: new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          preview: msg.lastMessage || "No messages yet",
          profilePictureUrl: msg.user?.profilePictureUrl || profilePicSmall,
        }));

        setConversations(transformedConversations);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching conversations:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchConversations();
    }
  }, [senderId, token]);

  // Fetch conversation messages for the selected conversation
  useEffect(() => {
    const fetchConversation = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://uniisphere-1.onrender.com/api/messages/conversation/${messageId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch conversation");
        }

        const data = await response.json();
        console.log("GET API Response (Conversation):", data);

        const messages = Array.isArray(data) ? data : data.messages || [];
        const transformedMessages = messages.map((msg) => ({
          id: msg.id || msg._id,
          senderId: msg.senderId,
          sender: msg.senderId === senderId ? "You" : msg.user?.username || "Unknown",
          text: msg.content || msg.lastMessage,
          timestamp: msg.timestamp || msg.createdAt,
          image: msg.image || null,
        }));

        if (messages.length > 0) {
          const receiver = messages.find((msg) => msg.senderId !== senderId)?.user || {};
          setReceiverData({
            username: receiver.username || "Unknown",
            profilePictureUrl: receiver.profilePictureUrl || profilePicSmall,
          });
        }

        setChatMessages(transformedMessages);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching conversation:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (messageId && token) {
      fetchConversation();
    }
  }, [messageId, token, senderId]);

  // Send message function
  const sendMessage = async (content) => {
    if (!content.trim()) return;

    try {
      const response = await fetch("https://uniisphere-1.onrender.com/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: messageId,
          content,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      const data = await response.json();
      console.log("Message sent successfully:", data);

      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          id: data.id,
          senderId: senderId,
          sender: "You",
          text: content,
          timestamp: new Date().toISOString(),
        },
      ]);

      setMessageInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      setError(error.message || "Failed to send message");
    }
  };

  const handleSendMessage = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(messageInput);
    }
  };

  return (
    <>
      <div className="message-part-2-app">
        {/* Sidebar Section with Real Data */}
        <div className="message-part-2-sidebar">
          <h1>Messages</h1>
          {loading && <p>Loading conversations...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && conversations.length === 0 && (
            <p>No conversations found.</p>
          )}
          {!loading &&
            !error &&
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`message-part-2-message-item ${
                  conversation.id === messageId ? "active" : ""
                }`}
                onClick={() => window.location.href = `/MessageFinalClass2/${conversation.id}`} // Navigate to conversation
                style={{ cursor: "pointer" }}
              >
                <img
                  src={conversation.profilePictureUrl}
                  alt="profile"
                  className="message-part-2-profile-pic"
                />
                <div className="message-part-2-message-info">
                  <div className="message-part-2-message-header">
                    <span className="message-part-2-name">{conversation.name}</span>
                    <span className="message-part-2-time">{conversation.time}</span>
                  </div>
                  <p className="message-part-2-preview">{conversation.preview}</p>
                </div>
                {conversation.status === "unread" && (
                  <span className="message-part-2-unread-dot"></span>
                )}
              </div>
            ))}
        </div>

        {/* Chat Section */}
        <div className="message-part-2-chat">
          <div className="message-part-2-chat-header">
            <img
              src={receiverData.profilePictureUrl || profilePicSmall}
              alt="profile"
              className="message-part-2-profile-pic"
            />
            <h3>{receiverData.username || "Loading..."}</h3>
            <div className="call-video-icon">
              <span>
                <IoCall />
              </span>
              <span>
                <MdOutlineVideoCall />
              </span>
            </div>
          </div>
          <div className="message-part-2-chat-body">
            {loading && <p className="message-part-2-loading">Loading messages...</p>}
            {error && <p className="message-part-2-error">Error: {error}</p>}
            {!loading && !error && chatMessages.length === 0 && (
              <p className="message-part-2-no-messages">No messages yet.</p>
            )}
            {!loading &&
              !error &&
              chatMessages.map((message, index) => {
                const isNewSender =
                  index === 0 || message.senderId !== chatMessages[index - 1]?.senderId;

                const messageTime = new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <React.Fragment key={message.id || index}>
                    {isNewSender && (
                      <p className="message-part-2-timestamp">
                        {new Date(message.timestamp).toLocaleDateString()}
                      </p>
                    )}
                    <div
                      className={`message-part-2-message ${
                        message.senderId === senderId
                          ? "message-part-2-sent"
                          : "message-part-2-received"
                      }`}
                    >
                      <div className="message-part-2-message-content-container">
                        {message.senderId !== senderId && (
                          <img
                            className="message-part-2-message-person-image"
                            src={receiverData.profilePictureUrl || profilePicSmall}
                            alt=""
                          />
                        )}
                        <div className="message-part-2-message-content">
                          <p>{message.text}</p>
                          <span className="message-time">{messageTime}</span>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
          <div className="message-part-2-chat-footer">
            <input
              type="text"
              placeholder="Type a message..."
              className="message-part-2-input"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleSendMessage}
            />
            {error && (
              <div className="message-error-alert">
                {error}
                <button onClick={() => setError(null)}>✕</button>
              </div>
            )}
            <div className="message-part-2-icons">
              <span>
                <img className="message-part-2-chat-all-icon" src={stickerIcon} alt="StickerIcon" />
              </span>
              <span>
                <img className="message-part-2-chat-all-icon" src={gallaryIcon} alt="GallaryIcon" />
              </span>
              <span>
                <img className="message-part-2-chat-all-icon" src={microphoneIcon} alt="MicrophoneIcon" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Chat Section */}
      <div className="mobile-chat-profile-container">
        <div className="mobile-chat-container">
          <div className="mobile-chat-header">
            <div className="mobile-chat-header-top">
              <div className="mobile-chat-back-icon">
                <img className="mobile-chat-all-icon" src={backIcon} alt="" />
              </div>
              <div className="mobile-chat-profile-pic-small">
                <img src={receiverData.profilePictureUrl || profilePicSmall} alt="Profile" />
                <div className="mobile-chat-header-bottom">
                  <span className="mobile-chat-name">{receiverData.username || "Loading..."}</span>
                  <span className="mobile-chat-username">{receiverData.username || ""}</span>
                </div>
              </div>
            </div>
            <img className="mobile-chat-all-icon" src={callingIcon} alt="" />
          </div>
          <div className="mobile-chat-profile">
            <div className="mobile-chat-profile-pic-large">
              <img src={receiverData.profilePictureUrl || profilePicSmall} alt="Profile" />
            </div>
            <div className="mobile-chat-big-name">{receiverData.username || "Loading..."}</div>
            <div className="mobile-chat-big-username">{receiverData.username || ""}</div>
            <button className="mobile-chat-voice-call">Voice Call</button>
            <div className="mobile-chat-interests">
              Loading interests...
            </div>
          </div>
          <div className="mobile-chat-input">
            <input
              type="text"
              className="mobile-chat-text-input"
              placeholder="Type a message"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleSendMessage}
            />
            <div className="mobile-chat-icons">
              <span>
                <img className="mobile-chat-all-icon" src={stickerIcon} alt="StickerIcon" />
              </span>
              <span>
                <img className="mobile-chat-all-icon" src={gallaryIcon} alt="GallaryIcon" />
              </span>
              <span>
                <img className="mobile-chat-all-icon" src={microphoneIcon} alt="MicrophoneIcon" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageFinalClass2;