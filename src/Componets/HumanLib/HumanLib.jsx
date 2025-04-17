import React, { useEffect, useRef, useState } from "react";
import Background from "../Background/Background.jsx";
import DesktopNavbarr from "../DesktopNavbarr/DesktopNavbarr.jsx";
import DesktopRight from "../DesktopRight/DesktopRight.jsx";
import "./HumanLib.css";

function HumanLib() {
  const [phase, setPhase] = useState(1);
  const [nickname, setNickname] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [otherUserNickname, setOtherUserNickname] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPhase3TimerActive, setIsPhase3TimerActive] = useState(false);
  const [noOneFound, setNoOneFound] = useState(false);
  const chatMessagesRef = useRef(null);

  const senderId = localStorage.getItem("LoginuserId") || "18114725-fcc6-4cbe-a617-894a464b9fc8";
  const token = localStorage.getItem("authToken") || "your-auth-token-here";

  const handleNextPhase = (nextPhase) => {
    if (phase === 1 && !nickname.trim()) {
      alert("Please enter a nickname to proceed.");
      return;
    }
    if (phase === 2) {
      setPhase(3);
      setIsPhase3TimerActive(true);
      setNoOneFound(false);
      setSelectedChatId(null);
      setOtherUserNickname(null);
    } else if (phase === 3 && isPhase3TimerActive) {
      return;
    } else {
      setPhase(nextPhase || phase + 1);
    }
  };

  const retryConnection = () => {
    setNoOneFound(false);
    setIsPhase3TimerActive(true);
    setError(null);
    setSelectedChatId(null);
    setOtherUserNickname(null);
    setPhase(3);
  };

  useEffect(() => {
    if (phase !== 3 || !isPhase3TimerActive) return;

    const timer = setTimeout(() => {
      setIsPhase3TimerActive(false);
      setNoOneFound(true);
      setPhase(4);
    }, 20000);

    const pollConnection = async () => {
      try {
        const response = await fetch(
          `https://uniisphere-1.onrender.com/api/anonymous/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId: senderId,
              nickname: nickname,
            }),
          }
        );

        const data = await response.json();
        console.log("Human Connection API Response:", data); // Log full API response

        if (!response.ok) {
          throw new Error(data.message || "Failed to initialize chat");
        }

        if (data.chatId) {
          console.log("User found:", data.otherUserNickname || "Anonymous"); // Log when user is found
          setSelectedChatId(data.chatId);
          setOtherUserNickname(data.otherUserNickname || "Anonymous");
          setIsPhase3TimerActive(false);
          setNoOneFound(false);
          setPhase(4);
          setChatHistory((prev) => [
            ...prev,
            {
              chatId: data.chatId,
              lastMessage: "Chat started",
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]);
          clearInterval(pollInterval);
          clearTimeout(timer);
        }
      } catch (err) {
        console.error("Chat initialization error:", err);
        setError("Unable to start chat. Please try again.");
      }
    };

    const pollInterval = setInterval(pollConnection, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(pollInterval);
    };
  }, [phase, isPhase3TimerActive, token, senderId, nickname]);

  useEffect(() => {
    if (!selectedChatId) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `https://uniisphere-1.onrender.com/api/anonymous/message`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch messages: ${response.status}`);
        }

        const data = await response.json();
        console.log("Active Chat API Response:", data);

        if (!data || !data.messages) {
          console.log("No active chat found");
          setChatMessages([]);
          return;
        }

        const transformedMessages = data.messages.map((msg) => ({
          sender: msg.senderId === senderId ? "You" : otherUserNickname || "Anonymous",
          text: msg.content,
          timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isSent: msg.senderId === senderId,
          type: msg.type || "text",
        }));

        setChatMessages(transformedMessages);
      } catch (err) {
        setError(err.message);
        console.error("Messages API Error:", err);
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 2000);
    return () => clearInterval(intervalId);
  }, [selectedChatId, token, senderId, otherUserNickname]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedChatId) return;

    try {
      const response = await fetch(
        `https://uniisphere-1.onrender.com/api/anonymous/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            chatId: selectedChatId,
            content: messageInput,
            senderId: senderId,
            isUser1: false,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to send message");

      const data = await response.json();
      console.log("Message sent:", data);
      setMessageInput("");
      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.chatId === selectedChatId
            ? { ...chat, lastMessage: messageInput, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
            : chat
        )
      );
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error("Send message error:", err);
    }
  };

  const handleReportUser = async (chatId, reason) => {
    try {
      const response = await fetch(
        `https://uniisphere-1.onrender.com/api/anonymous-chat/${chatId}/report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reason }),
        }
      );

      if (!response.ok) throw new Error("Failed to report user");

      const data = await response.json();
      console.log("User reported:", data);
      setSelectedChatId(null);
      setOtherUserNickname(null);
      setChatMessages([]);
      setPhase(2);
    } catch (err) {
      setError("Failed to report user. Please try again.");
      console.error("Report user error:", err);
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      const response = await fetch(
        `https://uniisphere-1.onrender.com/api/anonymous-chat/${chatId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete chat");

      const data = await response.json();
      console.log("Chat deleted:", data);
      setChatHistory((prev) => prev.filter((chat) => chat.chatId !== chatId));
      if (selectedChatId === chatId) {
        setSelectedChatId(null);
        setOtherUserNickname(null);
        setChatMessages([]);
        setPhase(2);
      }
    } catch (err) {
      setError("Failed to delete chat. Please try again.");
      console.error("Delete chat error:", err);
    }
  };

  const handleEndChat = async () => {
    if (!selectedChatId) return;

    try {
      const response = await fetch(
        `https://uniisphere-1.onrender.com/api/anonymous/end/${selectedChatId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to end chat");

      console.log("Chat ended");
      setSelectedChatId(null);
      setOtherUserNickname(null);
      setChatMessages([]);
      setPhase(2);
    } catch (err) {
      setError("Failed to end chat. Please try again.");
      console.error("End chat error:", err);
    }
  };

  const ChatActions = ({ chatId }) => (
    <div className="HumanLib-chat-actions">
      <button onClick={() => handleReportUser(chatId, "inappropriate")}>
        Report User
      </button>
      <button onClick={() => handleDeleteChat(chatId)}>
        Delete Chat
      </button>
      <button onClick={handleEndChat}>
        End Chat
      </button>
    </div>
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const NoOneFoundPage = () => (
    <div className="HumanLib-no-one-found">
      <h2 className="HumanLib-title">No One Found</h2>
      <p className="HumanLib-description">
        We couldn't find anyone to chat with. Please try again.
      </p>
      <button
        className="HumanLib-button HumanLib-start"
        onClick={retryConnection}
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="HumanLib-wrapper">
      <DesktopNavbarr />
      <Background />
      <div className="HumanLib-main-content">
        <div className="HumanLib-container">
          {phase === 1 ? (
            <div>
              <h2 className="HumanLib-title">Enter Your Nickname</h2>
              <p className="HumanLib-description">
                We respect your privacy & keep it safe we suggest to
                <br />
                pick up a nickname for your display.
              </p>
              <input
                type="text"
                placeholder="Enter your nickname"
                className="HumanLib-input"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
              <div className="HumanLib-button-container">
                <button className="HumanLib-button HumanLib-cancel">Cancel</button>
                <button
                  className="HumanLib-button HumanLib-start"
                  onClick={() => handleNextPhase()}
                  disabled={!nickname.trim()}
                >
                  Start searching
                </button>
              </div>
            </div>
          ) : phase === 2 ? (
            <div className="HumanLib-second-page-content-phase2">
              <div className="HumanLib-image-container-phase2">
                <div className="HumanLib-concentric-circles-phase2">
                  <div className="HumanLib-circle-phase2 HumanLib-circle-pink-phase2"></div>
                  <div className="HumanLib-circle-phase2 HumanLib-circle-blue-phase2"></div>
                  <div className="HumanLib-central-image-phase2"></div>
                  <div className="HumanLib-orbiting-image-phase2 HumanLib-orbiting-image-1-phase2"></div>
                  <div className="HumanLib-orbiting-image-phase2 HumanLib-orbiting-image-2-phase2"></div>
                  <div className="HumanLib-orbiting-image-phase2 HumanLib-orbiting-image-3-phase2"></div>
                  <div className="HumanLib-orbiting-image-phase2 HumanLib-orbiting-image-4-phase2"></div>
                </div>
              </div>
              <h2 className="HumanLib-title">
                Get connected with the ones who are just like you. And want to share their feelings
              </h2>
              <p className="HumanLib-description">
                With just a click, get connected to another student who will never judge your feelings.
              </p>
              <div className="HumanLib-button-container">
                <button
                  className="HumanLib-button HumanLib-start"
                  onClick={() => handleNextPhase()}
                >
                  Start searching
                </button>
              </div>
            </div>
          ) : phase === 3 ? (
            <div className="HumanLib-third-page-content">
              <div className="HumanLib-image-container">
                <div className="HumanLib-concentric-circles">
                  <div className="HumanLib-circle HumanLib-circle-red"></div>
                  <div className="HumanLib-circle HumanLib-circle-orange"></div>
                  <div className="HumanLib-circle HumanLib-circle-yellow"></div>
                  <div className="HumanLib-circle HumanLib-circle-green"></div>
                  <div className="HumanLib-circle HumanLib-circle-blue"></div>
                  <div className="HumanLib-circle HumanLib-circle-indigo"></div>
                  <div className="HumanLib-circle HumanLib-circle-violet"></div>
                </div>
              </div>
              <p className="HumanLib-description">
                Connecting with the most <br /> accurate person for you.
              </p>
              <button
                className="HumanLib-button HumanLib-start"
                disabled={isPhase3TimerActive}
              >
                {isPhase3TimerActive ? "Connecting..." : "Start Chat"}
              </button>
            </div>
          ) : (
            <div className="HumanLib-chat-wrapper">
              {error ? (
                <div className="HumanLib-error">
                  <h2 className="HumanLib-title">Error</h2>
                  <p className="HumanLib-description">{error}</p>
                  <button
                    className="HumanLib-button HumanLib-start"
                    onClick={retryConnection}
                  >
                    Retry
                  </button>
                </div>
              ) : noOneFound ? (
                <NoOneFoundPage />
              ) : selectedChatId ? (
                <>
                  <div className="HumanLib-chat-history-sidebar">
                    <h3 className="HumanLib-sidebar-title">Chat History</h3>
                    {isLoading && <p>Loading chat history...</p>}
                    {!isLoading && chatHistory.length === 0 && (
                      <p>No chat history found.</p>
                    )}
                    {chatHistory.map((chat) => (
                      <div
                        key={chat.chatId}
                        className={`HumanLib-chat-history-item ${selectedChatId === chat.chatId ? "active" : ""}`}
                        onClick={() => setSelectedChatId(chat.chatId)}
                      >
                        <div className="HumanLib-chat-history-info">
                          <p className="HumanLib-chat-history-preview">{chat.lastMessage}</p>
                          <p className="HumanLib-chat-history-timestamp">{chat.timestamp}</p>
                        </div>
                        <ChatActions chatId={chat.chatId} />
                      </div>
                    ))}
                  </div>
                  <div className="HumanLib-chat-container">
                    <div className="HumanLib-chat-header">
                      <div className="HumanLib-chat-contact">
                        <div className="HumanLib-contact-avatar"></div>
                        <div>
                          <h3 className="HumanLib-contact-name">{otherUserNickname || "Anonymous"}</h3>
                          <p className="HumanLib-contact-status">Anonymous Chat</p>
                        </div>
                      </div>
                      <div className="HumanLib-chat-timestamp">
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>
                    <div className="HumanLib-chat-messages" ref={chatMessagesRef}>
                      {chatMessages.length === 0 && (
                        <p>No messages yet. Start the conversation!</p>
                      )}
                      {chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`HumanLib-message ${message.isSent ? "HumanLib-message-sent" : "HumanLib-message-received"}`}
                        >
                          {!message.isSent && (
                            <div className="HumanLib-message-avatar"></div>
                          )}
                          <div className="HumanLib-message-content">
                            <p className="HumanLib-message-sender">{message.sender}</p>
                            {message.type === "voice" ? (
                              <div className="HumanLib-voice-message">
                                <span className="HumanLib-voice-waveform">🎙️ Voice message</span>
                              </div>
                            ) : (
                              <p className="HumanLib-message-text">{message.text}</p>
                            )}
                            <p className="HumanLib-message-timestamp">{message.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="HumanLib-chat-input">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={!selectedChatId}
                      />
                      <button className="HumanLib-emoji-button">😊</button>
                      <button className="HumanLib-voice-button">🎙️</button>
                      <button
                        className="HumanLib-send-button"
                        onClick={handleSendMessage}
                        disabled={!selectedChatId}
                      >
                        ➤
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <NoOneFoundPage />
              )}
            </div>
          )}
        </div>
        {phase !== 4 && (
          <div className="HumanLib-right-section">
            <DesktopRight />
          </div>
        )}
      </div>
    </div>
  );
}

export default HumanLib;