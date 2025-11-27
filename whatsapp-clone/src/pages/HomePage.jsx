import React from 'react';
import ChatList from '../components/ChatList'; 
import '../styles/App.css'; // Esto importa las clases .app-container, .sidebar, .main-content

export default function HomePage() {
  return (
    // Usa la clase 'app-container' para el layout principal (100vh, flex)
    <div className="app-container">
      
      {/* 1. Barra lateral (Sidebar): Muestra la lista de chats */}
      <div className="sidebar">
        <ChatList /> 
      </div>
      
      {/* 2. Área principal (Main Content): Muestra el placeholder */}
      <div className="main-content">
        <p className="placeholder-text">Selecciona un chat para empezar a conversar.</p>
      </div>
    </div>
  );
}