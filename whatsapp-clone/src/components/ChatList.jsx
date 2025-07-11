// src/components/ChatList.jsx
import React from 'react';
import ChatListItem from './ChatListItem'; // <-- Importa el componente de cada item
import { playersData } from '../data/playersData'; // <-- Importa los datos de los jugadores
import '../styles/ChatList.css'; // <-- Asegúrate de que la ruta de estilos esté correcta

function ChatList() {
  return (
    <div className="chat-list-container">
      <h2>Chats</h2>
      <div className="chat-items">
        {/* Aquí mapeamos los datos de los jugadores y creamos un ChatListItem por cada uno */}
        {playersData.map((player) => (
          <ChatListItem key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}

export default ChatList;