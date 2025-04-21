import React, { useEffect, useRef, useState } from "react";
import Background from "../Background/Background.jsx";
import DesktopNavbarr from "../DesktopNavbar/DesktopNavbar.jsx";
import DesktopRight from "../DesktopRight/DesktopRight.jsx";
import io from 'socket.io-client';
import "./HumanLib.css";

function HumanLib() {
  // ... (keep existing state variables)
  const [phase, setPhase] = useState(1);
  const [nickname, setNickname] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // Consider implementing history loading later
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [otherUserNickname, setOtherUserNickname] = useState(null); // How will this be set? Needs logic.
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // For chat history loading
  const [error, setError] = useState(null);
  const [isPhase3TimerActive, setIsPhase3TimerActive] = useState(false); // Indicates polling is active
  const [noOneFound, setNoOneFound] = useState(false); // Timeout state
  const [isUser1, setIsUser1] = useState(null); // Store if current user is user1 or user2
  const chatMessagesRef = useRef(null);
  const socketRef = useRef(null);
  const pollTimeoutRef = useRef(null); // Ref to store timeout ID for polling

  const userId = localStorage.getItem("LoginuserId") || localStorage.getItem("userId");
  const token = localStorage.getItem("authToken") || localStorage.getItem("AuthToken");

  // Helper function to set user status
  const setUserStatus = async (status, isOnline) => {
    if (!userId || !token) return; // Don't try if no user/token
    try {
      await fetch(
        `https://uniisphere-1.onrender.com/api/users/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            status, // 'available', 'chatting', 'offline' etc.
            isOnline // Boolean
          }),
        }
      );
      console.log(`User ${userId} status set to: ${status}, isOnline: ${isOnline}`);
      return true;
    } catch (err) {
      console.error("Error setting user status:", err);
      return false;
    }
  };

  // Set up socket connection and handle basic events
  useEffect(() => {
    if (!userId || !token) {
        console.error("Missing userId or token. Cannot establish socket connection.");
        // Maybe redirect to login or show an error
        return;
    }

    socketRef.current = io('https://uniisphere-1.onrender.com', {
      auth: {
        token
      },
      // Send userId in query for initial identification if needed by backend on connect
      query: {
        userId
        // Nickname might not be needed here if it's handled via API calls
      }
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected with userId:', userId);
      // Set user as online and available initially when socket connects
      setUserStatus('available', true);
    });

    socketRef.current.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
       // Optionally set user as offline here, but the cleanup function is more reliable
       // setUserStatus('offline', false);
       // If disconnected unexpectedly, might want to stop polling
       setIsPhase3TimerActive(false);
       clearTimeout(pollTimeoutRef.current);
    });

     socketRef.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
      setError('Failed to connect to chat server. Please refresh.');
      setIsPhase3TimerActive(false); // Stop polling if connection fails
      clearTimeout(pollTimeoutRef.current);
    });


    // --- Socket Event Listeners ---

    socketRef.current.on('chat-matched', (data) => {
      console.log('<<< chat-matched event received:', data);
      // This event confirms a match found by the backend
      if (isPhase3TimerActive) { // Check if we were actually searching
        setSelectedChatId(data.chatId);
        setIsUser1(data.isUser1);
        // Assuming the other user's nickname isn't sent via socket, maybe fetch later or use 'Anonymous'
        setOtherUserNickname("Anonymous"); // Placeholder
        setChatMessages([]); // Clear messages for new chat
        setIsPhase3TimerActive(false); // Stop polling timer
        clearTimeout(pollTimeoutRef.current); // Clear any pending poll timeout
        setNoOneFound(false);
        setError(null);
        setPhase(4); // Go directly to chat phase
        console.log(`Transitioning to Phase 4 (Chat) via socket event. ChatID: ${data.chatId}, isUser1: ${data.isUser1}`);
      } else {
        console.warn("Received 'chat-matched' but wasn't actively searching (phase 3). Ignoring.");
      }
    });

    socketRef.current.on('anonymous-message', (message) => {
       console.log('<<< anonymous-message received:', message);
        // Ensure message is for the current active chat
        if (message.chatId === selectedChatId) {
            // Determine if the message sender (`message.isUser1`) matches our role (`isUser1`)
            const isSentByMe = message.isUser1 === isUser1;
            setChatMessages(prev => [...prev, {
                // Use senderId if available, otherwise determine based on isUser1
                sender: isSentByMe ? "You" : otherUserNickname || "Anonymous",
                text: message.content,
                timestamp: new Date(message.createdAt).toLocaleTimeString([], { // Use server timestamp
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                isSent: isSentByMe, // Based on comparison
            }]);
        } else {
            console.warn(`Received message for different chat ${message.chatId}, current chat is ${selectedChatId}`);
        }
    });

    socketRef.current.on('chat-ended', ({ chatId }) => {
       console.log(`<<< chat-ended event received for chat ${chatId}`);
      if (chatId === selectedChatId) {
        alert("The chat has been ended by the other user or an issue occurred.");
        setSelectedChatId(null);
        setOtherUserNickname(null);
        setChatMessages([]);
        setIsUser1(null);
        setNoOneFound(false); // Reset timeout state
        setError(null);
        setPhase(2); // Go back to the start searching screen
        // Status should be set back to 'available' by the backend endChat handler
      }
    });

    // --- Cleanup Function ---
    return () => {
      console.log("HumanLib component unmounting or dependencies changed. Cleaning up.");
      // Stop polling if active
      clearTimeout(pollTimeoutRef.current);
      setIsPhase3TimerActive(false); // Ensure timer state is cleared

      // Set user as offline when component unmounts or user navigates away
      // Important: This fetch might be interrupted if the browser tab closes immediately.
      // Beacon API could be an alternative for more reliability on unload.
      setUserStatus('offline', false);


      if (socketRef.current) {
        console.log("Disconnecting socket...");
        socketRef.current.off('connect');
        socketRef.current.off('disconnect');
        socketRef.current.off('connect_error');
        socketRef.current.off('chat-matched');
        socketRef.current.off('anonymous-message');
        socketRef.current.off('chat-ended');
        socketRef.current.disconnect();
      }
    };
    // Rerun useEffect if userId or token changes (e.g., login/logout)
  }, [token, userId]); // Removed nickname dependency for socket setup

   // Scroll chat messages to bottom
   useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [chatMessages]);


  const handleStartSearch = async () => {
    if (phase === 2 || phase === 3) {
      try {
        // Set loading state
        setIsLoading(true);
        setError(null);

        // Update user status to searching
        const statusUpdateSuccess = await setUserStatus('searching');
        if (!statusUpdateSuccess) {
          throw new Error('Failed to update user status');
        }

        // Start polling process
        setPhase(3);
        setIsPhase3TimerActive(true);
        let pollAttempts = 0;
        const maxAttempts = 15; // ~30 seconds total polling time
        const pollInterval = 2000; // 2 seconds

        const pollForMatch = async () => {
          try {
            const response = await fetch(
              'https://uniisphere-1.onrender.com/api/anonymous/match',
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Poll response:", data);

            if (data.chatId) {
              console.log("Match found via polling! Chat ID:", data.chatId);
              setIsPhase3TimerActive(false);
              clearTimeout(pollTimeoutRef.current);
            } else if (data.message === "Waiting for another user to join") {
              pollAttempts++;
              if (pollAttempts >= maxAttempts) {
                console.log("No match found after maximum attempts.");
                setIsPhase3TimerActive(false);
                setNoOneFound(true);
                setPhase(4);
                await setUserStatus('available', true);
              } else {
                pollTimeoutRef.current = setTimeout(pollForMatch, pollInterval);
              }
            } else {
              console.error("Unexpected response during polling:", data);
              setError("Received an unexpected response from the server.");
              setIsPhase3TimerActive(false);
              setPhase(2);
            }
          } catch (err) {
            console.error("Error during pollForMatch fetch:", err);
            setError("Network error while searching for chat. Please try again.");
            setIsPhase3TimerActive(false);
            setPhase(2);
            await setUserStatus('available', true);
          } finally {
            setIsLoading(false);
          }
        };

        // Start the first poll attempt
        pollForMatch();

      } catch (err) {
        console.error("Error in handleStartSearch:", err);
        setError("Failed to start chat search. Please try again.");
        setPhase(2);
        setIsLoading(false);
        await setUserStatus('available', true);
      }
    } else if (phase === 1 && !nickname.trim()) {
      setError("Please enter a nickname to proceed.");
      return;
    } else if (phase === 1) {
      setPhase(2);
    }
  };


  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedChatId || isUser1 === null) {
      console.warn("Cannot send message. Missing required data:", { 
        messageInput: !!messageInput.trim(), 
        selectedChatId: !!selectedChatId, 
        isUser1: isUser1 
      });
      return;
    }

    const messageToSend = {
      sender: "You",
      text: messageInput.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSent: true,
      pending: true, // Add pending state for optimistic updates
    };

    // Optimistically add message
    setChatMessages(prev => [...prev, messageToSend]);
    const currentInput = messageInput;
    setMessageInput("");

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
            content: currentInput,
            isUser1: isUser1,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update the message to remove pending state and add server data
      setChatMessages(prev => 
        prev.map(msg => 
          msg === messageToSend 
            ? { ...msg, pending: false, id: data.id, timestamp: data.timestamp } 
            : msg
        )
      );

    } catch (err) {
      console.error("Send message error:", err);
      setError("Failed to send message. Please try again.");
      
      // Remove the failed message
      setChatMessages(prev => prev.filter(msg => msg !== messageToSend));
      setMessageInput(currentInput);
    }
  };

  const handleEndChat = async () => {
    if (!selectedChatId) return;
     console.log(`Initiating end chat for ${selectedChatId}`);

    // Optimistically update UI? Maybe not for ending chat. Wait for confirmation.
    // setPhase(2); // Don't change phase until confirmed

    try {
      const response = await fetch(
        `https://uniisphere-1.onrender.com/api/anonymous/end/${selectedChatId}`,
        {
          method: "POST", // Use POST as per backend route
          headers: {
            "Content-Type": "application/json", // Good practice, even if no body needed by this endpoint
            Authorization: `Bearer ${token}`,
          },
           // No body needed for this request based on backend code
        }
      );

       const responseBody = await response.text(); // Read body once
        console.log("End chat response status:", response.status);
        console.log("End chat response body:", responseBody);


      if (!response.ok) {
           // Try to parse JSON if possible, otherwise use text
           let errorData;
           try {
               errorData = JSON.parse(responseBody);
           } catch (e) {
               errorData = { error: responseBody || `HTTP error ${response.status}` };
           }
           console.error("Failed to end chat:", response.status, errorData);
           setError(`Failed to end chat: ${errorData.error || response.statusText}`);
           return; // Stop execution
      }

      // --- Chat Ended Successfully ---
      console.log("Chat ended successfully via API call.");

      // Clear local state associated with the ended chat
      setSelectedChatId(null);
      setOtherUserNickname(null);
      setChatMessages([]);
      setIsUser1(null);
      setNoOneFound(false); // Reset timeout state
      setError(null);

      // Transition back to the search screen
      setPhase(2);

      // Backend should have:
      // 1. Updated chat status to 'ended'
      // 2. Updated *both* users' status to 'available'
      // 3. Emitted 'chat-ended' event (which we might receive slightly after this completes)


    } catch (err) {
      console.error("End chat fetch error:", err);
      setError("Network error: Failed to end chat. Please try again.");
    }
  };


  // ... (handleReportUser, handleDeleteChat - keep these as placeholders or implement fully later)
  const handleReportUser = async (chatId, reason) => { console.warn("Report User not fully implemented."); alert("Report functionality pending."); };
  const handleDeleteChat = async (chatId) => { console.warn("Delete Chat not fully implemented."); alert("Delete chat history functionality pending.");};


  // Simplified ChatActions for now
  const ChatActions = ({ chatId }) => (
    <div className="HumanLib-chat-actions">
       {/* Report/Delete can be added back later */}
      {/* <button onClick={() => handleReportUser(chatId, "inappropriate")}> Report </button> */}
      {/* <button onClick={() => handleDeleteChat(chatId)}> Delete </button> */}
      <button onClick={handleEndChat} disabled={!selectedChatId || selectedChatId !== chatId}>
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

  // Component to show when polling times out
  const NoOneFoundPage = () => (
    <div className="HumanLib-no-one-found">
      <h2 className="HumanLib-title">Nobody Found Yet...</h2>
      <p className="HumanLib-description">
        We couldn't find a match right now. Would you like to keep searching?
      </p>
      {/* Provide options to retry or cancel */}
      <div className="HumanLib-button-container">
         <button
            className="HumanLib-button HumanLib-cancel"
            onClick={() => {
                setNoOneFound(false);
                setError(null);
                setPhase(2); // Go back to initial search screen
                setUserStatus('available', true); // Ensure status is available if they cancel
            }}
          >
            Go Back
          </button>
          <button
            className="HumanLib-button HumanLib-start"
            onClick={() => {
                setNoOneFound(false); // Reset this state
                setError(null);
                handleStartSearch(); // Re-initiate the search process from phase 2->3
            }}
          >
            Retry Search
          </button>
      </div>

    </div>
  );


   // Component for Error display
   const ErrorDisplay = () => (
     <div className="HumanLib-error">
        <h2 className="HumanLib-title">An Error Occurred</h2>
        <p className="HumanLib-description">{error || "Something went wrong."}</p>
        <button
            className="HumanLib-button HumanLib-start"
            onClick={() => {
                setError(null); // Clear error
                setNoOneFound(false); // Clear no one found state
                setPhase(2); // Go back to start screen
                setUserStatus('available', true); // Reset status
            }}
        >
            Try Again
        </button>
     </div>
   );


  // --- Render Logic ---
  return (
    <div className="HumanLib-wrapper">
      <DesktopNavbarr />
      <Background />
      <div className="HumanLib-main-content">
        <div className="HumanLib-container">
          {/* Phase 1: Nickname Input */}
          {phase === 1 && (
            <div>
              <h2 className="HumanLib-title">Enter Your Nickname</h2>
              <p className="HumanLib-description">
                Choose a temporary nickname for your anonymous chat.
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
                <button
                  className="HumanLib-button HumanLib-start"
                  onClick={handleStartSearch}
                  disabled={!nickname.trim()}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Phase 2: Ready to Search */}
          {phase === 2 && (
            <div>
              <h2 className="HumanLib-title">Ready to Connect</h2>
              <p className="HumanLib-description">
                Click start when you're ready to find a chat partner.
              </p>
              <div className="HumanLib-button-container">
                <button
                  className="HumanLib-button HumanLib-start"
                  onClick={handleStartSearch}
                >
                  Start Searching
                </button>
                <button
                  className="HumanLib-button HumanLib-cancel"
                  onClick={handleEndChat}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Phase 3: Searching/Connecting */}
          {phase === 3 && (
            <div>
              <h2 className="HumanLib-title">Finding a Chat Partner</h2>
              <p className="HumanLib-description">
                Please wait while we connect you with someone...
              </p>
              <div className="HumanLib-loading">
                <div className="HumanLib-spinner"></div>
              </div>
              <div className="HumanLib-button-container">
                <button
                  className="HumanLib-button HumanLib-cancel"
                  onClick={handleEndChat}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Phase 4: Chat Interface OR Error/Timeout Screens */}
          {phase === 4 && (
             <div className="HumanLib-chat-wrapper">
              {error ? (
                <ErrorDisplay /> // Show error component
              ) : noOneFound ? (
                <NoOneFoundPage /> // Show timeout/no match component
              ) : selectedChatId ? (
                // --- Actual Chat Interface ---
                 <>
                  {/* Sidebar placeholder - implement history loading later */}
                  {/* <div className="HumanLib-chat-history-sidebar"> ... </div> */}

                  <div className="HumanLib-chat-container">
                     <div className="HumanLib-chat-header">
                        <div className="HumanLib-chat-contact">
                           <div className="HumanLib-contact-avatar"></div> {/* Placeholder */}
                           <div>
                           <h3 className="HumanLib-contact-name">{otherUserNickname || "Anonymous"}</h3>
                           <p className="HumanLib-contact-status">Anonymous Chat</p>
                           </div>
                        </div>
                         {/* Display End Chat button in header */}
                         <ChatActions chatId={selectedChatId} />
                        {/* Timestamp can be dynamic or just date */}
                        {/* <div className="HumanLib-chat-timestamp"> ... </div> */}
                     </div>

                     <div className="HumanLib-chat-messages" ref={chatMessagesRef}>
                        {chatMessages.length === 0 && !isLoading && (
                            <p className="HumanLib-chat-placeholder">Connecting securely... Say hello!</p>
                        )}
                        {isLoading && <p>Loading messages...</p>}
                        {chatMessages.map((message, index) => (
                            <div
                            key={message.id || index}
                            className={`HumanLib-message ${
                              message.isSent ? "HumanLib-message-sent" : "HumanLib-message-received"
                            } ${message.pending ? "HumanLib-message-pending" : ""}`}
                            >
                            {!message.isSent && (
                                <div className="HumanLib-message-avatar"></div>
                            )}
                            <div className="HumanLib-message-content">
                                <p className="HumanLib-message-text">
                                    {message.text}
                                    {message.pending && <span className="HumanLib-message-pending-indicator">...</span>}
                                </p>
                                <p className="HumanLib-message-timestamp">{message.timestamp}</p>
                            </div>
                            </div>
                        ))}
                     </div>

                     <div className="HumanLib-chat-input">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={!selectedChatId} // Disable if no active chat
                        />
                        {/* Add back emoji/voice buttons if needed */}
                        {/* <button className="HumanLib-emoji-button">😊</button> */}
                        {/* <button className="HumanLib-voice-button">🎙️</button> */}
                        <button
                            className="HumanLib-send-button"
                            onClick={handleSendMessage}
                            disabled={!selectedChatId || !messageInput.trim()} // Disable if no chat or no input
                        >
                            ➤
                        </button>
                     </div>
                  </div>
                </>
              ) : (
                // Fallback case within phase 4 if not error/noOneFound/chatId (should ideally not be reached)
                 <div>Loading Chat...</div>
              )}
            </div>
          )}
        </div>

        {/* Right Section - Conditionally Render */}
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