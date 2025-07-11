
import React, { useEffect, useRef } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { playersData } from '../data/playersData'; 
import Message from './Message'; 
import MessageInput from './MessageInput'; 
import '../styles/ChatWindow.css'; 
import { useChat } from '../context/ChatContext';

function ChatWindow() {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const { messagesByPlayer } = useChat();


  const player = playersData.find(p => p.id === playerId);
  const currentMessages = messagesByPlayer[playerId] || [];

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const handleGoBack = () => {
    navigate('/');
  };

  if (!player) {
    return (
      <div className="chat-window-container no-chat-selected">
        <p>Jugador no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="chat-window-container">
      <div className="chat-header">
        <button onClick={handleGoBack} className="back-button">
          &#8592;
        </button>
        <img src={player.avatar} alt={player.name} className="chat-header-avatar" />
        <h3>{player.name}</h3>
      </div>
      <div className="messages-container">
        {currentMessages.map(msg => (
          <Message key={msg.id} text={msg.text} sender={msg.sender} time={msg.time} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    
      <MessageInput />
    </div>
  );
}

export default ChatWindow;