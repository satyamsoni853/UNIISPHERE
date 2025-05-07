import React, { useState, useEffect, useRef } from "react";
import "./HumanLib.css"; // Import the external CSS file
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar.jsx";
import DesktopRight from "../DesktopRight/DesktopRight.jsx";
import Background from "../Background/Background.jsx";
import Toast from "../Common/Toast";
import axios from "axios";

function HumanLib() {
  // Existing state variables
  const [phase, setPhase] = useState(1);
  const [nickname, setNickname] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPhase3TimerActive, setIsPhase3TimerActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  // New state for online users
  const [onlineUsers, setOnlineUsers] = useState([]);

  const chatMessagesRef = useRef(null);

  // Sender ID and token
  const senderId =
    localStorage.getItem("LoginuserId") || "18114725-fcc6-4cbe-a617-894a464b9fc8";
  const token =
    localStorage.getItem("authToken") || "your-auth-token-here";

  // Handler to transition to the next phase
  const handleNextPhase = async (nextPhase) => {
    if (phase === 1 && !nickname.trim()) {
      showErrorToast("Please enter a nickname to proceed.");
      return;
    }
    if (phase === 2) {
      // Call the getOnlineUsers API before transitioning to Phase 3
      try {
        const response = await axios.get(
          "https://uniisphere-backend-latest.onrender.com/api/human-lib/getOnlineUsers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.data;
        setOnlineUsers(data); // Store the list of online users
        showSuccessToast("Fetched online users successfully.");
        // Proceed to Phase 3
        setPhase(3);
        setIsPhase3TimerActive(true);
      } catch (err) {
        showErrorToast("Failed to fetch online users. Proceeding to connect...");
        console.error(err);
        // Optionally proceed to Phase 3 even if the API fails
        setPhase(3);
        setIsPhase3TimerActive(true);
      }
    } else if (phase === 3 && isPhase3TimerActive) {
      return;
    } else {
      setPhase(nextPhase || phase + 1);
    }
  };

  // Existing useEffect for Phase 3 timer
  useEffect(() => {
    if (phase !== 3 || !isPhase3TimerActive) return;

    const timer = setTimeout(() => {
      setIsPhase3TimerActive(false);
      setPhase(4);
    }, 10000);

    return () => clearTimeout(timer);
  }, [phase, isPhase3TimerActive]);

  // Existing useEffect for fetching chat history
  useEffect(() => {
    if (phase !== 4) return;

    const fetchChatHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://uniisphere-backend-latest.onrender.com/api/anonymous-chat/history?userId=${senderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.data;

        if (data && data.length > 0) {
          const transformedHistory = data.map((chat) => ({
            chatId: chat.chatId,
            lastMessage: chat.lastMessage || "No messages yet",
            timestamp: chat.updatedAt
              ? new Date(chat.updatedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Unknown",
          }));
          setChatHistory(transformedHistory);
          setSelectedChatId(transformedHistory[0].chatId);
          showSuccessToast("Now you are chatting with a random person.");
        } else {
          throw new Error("No chat history found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (token && senderId) {
      fetchChatHistory();
    }
  }, [phase, token, senderId]);

  // Existing useEffect for fetching chat messages
  useEffect(() => {
    if (!selectedChatId) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://uniisphere-backend-latest.onrender.com/api/anonymous-chat/${selectedChatId}/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.data;

        const transformedMessages = data.map((msg) => ({
          sender: msg.senderId === senderId ? "You" : msg.senderNickname || "Anonymous",
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
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 2000);
    return () => clearInterval(intervalId);
  }, [selectedChatId, token, senderId]);

  // Existing auto-scroll effect
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Existing handleSendMessage
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedChatId) return;

    const newMessage = {
      sender: "You",
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSent: true,
      type: "text",
    };

    setChatMessages((prev) => [...prev, newMessage]);
    setMessageInput("");

    try {
      const response = await axios.post(
        `https://uniisphere-backend-latest.onrender.com/api/anonymous-chat/${selectedChatId}/messages`,
        {
          content: messageInput,
          senderId: senderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.data;
    } catch (err) {
      setError(err.message);
      setChatMessages((prev) => prev.filter((msg) => msg !== newMessage));
    }
  };

  // Existing handleKeyDown
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Existing DummyPage component
  const DummyPage = () => (
    <div className="HumanLib-dummy-page">
      <h2 className="HumanLib-title">No Active Chat Found</h2>
      <p className="HumanLib-description">
        It looks like we couldn't find an active chat for you at the moment. <br />
        Please try again later or start a new search.
      </p>
      <button
        className="HumanLib-button HumanLib-start"
        onClick={() => setPhase(2)}
      >
        Try Again
      </button>
    </div>
  );

  // Existing toast functions
  const showErrorToast = (message) => {
    setToastMessage(message);
    setToastType("error");
    setShowToast(true);
  };

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setToastType("success");
    setShowToast(true);
  };

  return (
    <div className="HumanLib-wrapper">
      <DesktopNavbar />
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
              {/* Display online users */}
              <div className="HumanLib-online-users">
                <h3>Online Users</h3>
                {onlineUsers.length === 0 ? (
                  <p>No users online or click "Start searching" to fetch.</p>
                ) : (
                  <ul>
                    {onlineUsers.map((user) => (
                      <li key={user.userId}>{user.nickname || "Anonymous"}</li>
                    ))}
                  </ul>
                )}
              </div>
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
                onClick={() => handleNextPhase()}
                disabled={isPhase3TimerActive}
              >
                {isPhase3TimerActive ? "Connecting..." : "Start Chat"}
              </button>
            </div>
          ) : (
            <div className="HumanLib-chat-wrapper">
              {error ? (
                <DummyPage />
              ) : (
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
                        className={`HumanLib-chat-history-item ${
                          selectedChatId === chat.chatId ? "active" : ""
                        }`}
                        onClick={() => setSelectedChatId(chat.chatId)}
                      >
                        <div className="HumanLib-chat-history-info">
                          <p className="HumanLib-chat-history-preview">{chat.lastMessage}</p>
                          <p className="HumanLib-chat-history-timestamp">{chat.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="HumanLib-chat-container">
                    <div className="HumanLib-chat-header">
                      <div className="HumanLib-chat-contact">
                        <div className="HumanLib-contact-avatar"></div>
                        <div>
                          <h3 className="HumanLib-contact-name">Anonymous</h3>
                          <p className="HumanLib-contact-status">Anonymous Chat</p>
                        </div>
                      </div>
                      <div className="HumanLib-chat-timestamp">
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>
                    <div className="HumanLib-chat-messages" ref={chatMessagesRef}>
                      {!selectedChatId && <p>Select a chat to view messages.</p>}
                      {selectedChatId && chatMessages.length === 0 && (
                        <p>No messages yet. Start the conversation!</p>
                      )}
                      {chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`HumanLib-message ${
                            message.isSent
                              ? "HumanLib-message-sent"
                              : "HumanLib-message-received"
                          }`}
                        >
                          {!message.isSent && (
                            <div className="HumanLib-message-avatar"></div>
                          )}
                          <div className="HumanLib-message-content">
                            <p className="HumanLib-message-sender">{message.sender}</p>
                            {message.type === "voice" ? (
                              <div className="HumanLib-voice-message">
                                <span className="HumanLib-voice-waveform">
                                  🎙️ Voice message
                                </span>
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
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        type={toastType}
      />
    </div>
  );
}

export default HumanLib;