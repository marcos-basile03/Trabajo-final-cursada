import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    
    // Importante: extraemos loading e isAuthenticated
    const { loading, isAuthenticated } = useAuth();

    // 1. Mientras AuthContext verifica el token → mostrar loader
    if (loading) {
        return (
            // Usa estilos más robustos para Tailwind o CSS
            <div style={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center", /* Centrar verticalmente */
                height: "100vh", /* Ocupar toda la altura de la vista */
                fontSize: "20px",
                backgroundColor: "#f0f2f5"
            }}>
                Cargando sesión...
            </div>
        );
    }

    // 2. Si no está autenticado → redirigir a login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 3. Si está autenticado → permitir acceso al contenido envuelto
    return children;
};

export default PrivateRoute;