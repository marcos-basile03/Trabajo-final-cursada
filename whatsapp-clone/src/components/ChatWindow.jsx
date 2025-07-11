// src/components/ChatWindow.jsx
import React, { useState, useEffect } from 'react'; // Importamos useState y useEffect
import { useParams } from 'react-router-dom';
import { playersData } from '../data/playersData';
import Message from './Message';
import MessageInput from './MessageInput';
import '../styles/ChatWindow.css';

function ChatWindow() {
  const { playerId } = useParams();
  const [currentMessages, setCurrentMessages] = useState([]); // Estado para los mensajes de la conversación
  const [currentPlayer, setCurrentPlayer] = useState(null); // Estado para el jugador actual

  useEffect(() => {
    // Busca el jugador en nuestros datos cada vez que playerId cambie
    const foundPlayer = playersData.find(player => player.id === playerId);
    setCurrentPlayer(foundPlayer);
    // Si se encuentra el jugador, inicializa los mensajes con los de sus datos
    if (foundPlayer) {
      setCurrentMessages(foundPlayer.messages);
    } else {
      setCurrentMessages([]);
    }
  }, [playerId]); // Este useEffect se ejecuta cuando el playerId de la URL cambia

  const handleSendMessage = (text) => {
    const newMessage = {
      id: currentMessages.length + 1, // ID simple
      sender: 'me', // Siempre eres tú el que envía
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Hora actual
    };
    setCurrentMessages((prevMessages) => [...prevMessages, newMessage]); // Añade el nuevo mensaje al estado
    // Opcional: Desplazar hacia abajo al enviar mensaje
    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  if (!currentPlayer) {
    return (
      <div className="chat-window-container no-chat-selected">
        <p>Selecciona un chat para empezar a conversar.</p>
      </div>
    );
  }

  return (
    <div className="chat-window-container">
      <div className="chat-header">
        <img src={currentPlayer.avatar} alt={currentPlayer.name} className="chat-header-avatar" />
        <h3>{currentPlayer.name}</h3>
      </div>

      <div className="messages-container">
        {currentMessages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      <MessageInput onSendMessage={handleSendMessage} /> {/* Pasamos la función al MessageInput */}
    </div>
  );
}

export default ChatWindow;