
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css'; 

import ChatList from './components/ChatList'; 
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <Router>
      <div className="app-container">
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