// src/App.jsx
import React from 'react'; // Asegúrate de que solo importes React si no usas otros hooks
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // No necesitamos useLocation por ahora
import './styles/App.css'; // Asegúrate de que la ruta sea './styles/App.css'

import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <Router> {/* Asegúrate de que Router envuelva todo */}
      <div className="app-container"> {/* Volvemos a la estructura original de dos columnas */}
        <div className="sidebar">
          <ChatList />
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<p className="placeholder-text">Selecciona un chat para empezar a conversar.</p>} />
            <Route path="/chat/:playerId" element={<ChatWindow />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;