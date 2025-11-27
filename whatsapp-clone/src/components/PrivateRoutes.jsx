// src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // Revisa si existe el token en el almacenamiento local
    const token = localStorage.getItem('token');
    
    if (!token) {
        // Si no hay token, lo redirige al login
        return <Navigate to="/login" replace />;
    }
    
    return children; // Si hay token, muestra el componente (ej: Chat)
};

export default PrivateRoute;