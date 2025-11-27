import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const API_REGISTER_URL = `${API_BASE_URL}/register`;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const showMessage = (msg) => {
        console.error("Mensaje de Alerta:", msg);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !name) {
            showMessage("Todos los campos son obligatorios.");
            return;
        }
        
        if (password.length < 6) {
            showMessage("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        try {
            const response = await fetch(API_REGISTER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('Registro exitoso. Inicia sesión ahora.');
                navigate('/login');
            } else {
                showMessage(data.msg || 'Error al registrar el usuario.');
            }
        } catch (error) {
            showMessage('Error de conexión al servidor. Revisa la consola.');
            console.error('Fetch Error:', error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc' }}>
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Registrar
                </button>
                <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
            </form>
        </div>
    );
}

export default RegisterPage;