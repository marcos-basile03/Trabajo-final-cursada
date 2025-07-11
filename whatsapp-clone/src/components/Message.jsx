import React from 'react';
import '../styles/Message.css'; 

function Message({ message }) {

  const messageClass = message.sender === 'me' ? 'my-message' : 'other-message';

  return (
    <div className={`message-bubble ${messageClass}`}>
      <p>{message.text}</p>
      <span className="message-time">{message.time}</span>
    </div>
  );
}

export default Message;