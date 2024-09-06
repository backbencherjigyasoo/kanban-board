import React, { useState } from 'react';

function MessageInput({ sendMessage }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage(''); // Clear the input after sending
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        style={{ width: '80%' }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default MessageInput;
