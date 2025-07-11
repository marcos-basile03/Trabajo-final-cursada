
import React, { useState } from 'react';
import '../styles/MessageInput.css'; 



function MessageInput() {
  const [messageText, setMessageText] = useState('');


  const handleSendMessage = (e) => {
    e.preventDefault();

    if (messageText.trim()) {

      console.log("Mensaje enviado (solo en consola por ahora):", messageText); 
      setMessageText('');
    }
  };

  return (
    <form className="message-input-container" onSubmit={handleSendMessage}>
      <input
        type="text"
        placeholder="Escribe un mensaje..."
        className="message-input"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button type="submit" className="send-button">
        ➤
      </button>
    </form>
  );
}

export default MessageInput;