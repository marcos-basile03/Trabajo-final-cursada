
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

import LoginPage from './pages/Auth/LoginPage'; 
import PrivateRoute from './components/PrivateRoute'; 

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />

        <Route path="/chat/:id" element={
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}