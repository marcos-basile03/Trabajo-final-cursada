import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChatProvider } from './context/ChatContext';
import { AuthProvider } from './context/AuthContext'; // <--- IMPORTACIÓN NECESARIA
import AppRouter from './router';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      {/* 1. AuthProvider debe ir PRIMERO para proteger las rutas */}
      <AuthProvider>
        {/* 2. ChatProvider maneja el estado de los chats */}
        <ChatProvider>
          <AppRouter />
        </ChatProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);