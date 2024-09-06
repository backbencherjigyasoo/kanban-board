import React, { useState, useEffect } from 'react';
import { webSocketService } from './Websocket';
import Chat from './Chat';
import MessageInput from './MessageInput';

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const handleMessage = (message) => {
      const parsedMessage = JSON.parse(message);
      const newMessage = {
        username: parsedMessage.username,
        text: parsedMessage.text,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // Connect WebSocket only if it's not already connected
    if (!webSocketService.socket || webSocketService.socket.readyState === WebSocket.CLOSED) {
      webSocketService.connect('ws://localhost:8080');
    }

    webSocketService.onMessage(handleMessage);

    // Cleanup on unmount
    return () => {
      webSocketService.offMessage(handleMessage);
    };
  }, []);

  const handleLogin = () => {
    if (username.trim()) {
      setLoggedIn(true); // Proceed to the chat if a valid username is entered
    }
  };

  const sendMessage = (message) => {
    const messageObj = {
      username, // Include the current user's username in the message
      text: message,
    };
    
    // Add the sent message to the local state immediately
    const newMessage = {
      username,
      text: message,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    
    // Send the message through WebSocket
    webSocketService.sendMessage(JSON.stringify(messageObj));
  };

  if (!loggedIn) {
    return (
      <div className="login-screen">
        <h1>Enter Your Username</h1>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username"
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Chat Application</h1>
      <h2>Logged in as: {username}</h2> {/* Display the logged-in user's name */}
      <Chat messages={messages} currentUser={username} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}

export default App;
