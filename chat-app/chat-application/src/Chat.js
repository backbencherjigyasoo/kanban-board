import React from 'react';

function Chat({ messages, currentUser }) {
  return (
    <div className="chat-window" style={{ border: '1px solid #ccc', height: '300px', overflowY: 'scroll', padding: '10px' }}>
      {messages.map((message, index) => (
        <div key={index} style={{ 
          textAlign: message.username === currentUser ? 'right' : 'left', 
          backgroundColor: message.username === currentUser ? '#e6f7ff' : '#fff',
          padding: '5px',
          marginBottom: '5px',
          borderRadius: '5px'
        }}>
          <strong>{message.username}</strong> ({message.timestamp}): {message.text}
        </div>
      ))}
    </div>
  );
}

export default Chat;
