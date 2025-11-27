import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    const { login } = useAuth(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError("Ambos campos son obligatorios.");
            return;
        }

        const result = await login(email, password);

        if (result.ok) {
            navigate('/'); // <<--- OK: esto SÍ debe estar
        } else {
            setError(result.msg || "Credenciales inválidas.");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#4CAF50' }}>Iniciar Sesión</h2>

            {error && (
                <p style={{ color: 'red', textAlign: 'center', padding: '10px', border: '1px solid red', borderRadius: '4px', marginBottom: '15px' }}>
                    {error}
                </p>
            )}
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <button 
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px 15px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '15px'
                    }}
                >
                    Entrar
                </button>

                <p style={{ textAlign: 'center', marginTop: '15px' }}>
                    ¿No tienes cuenta? <a href="/register" style={{ color: '#4CAF50', textDecoration: 'none' }}>Regístrate aquí</a>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;