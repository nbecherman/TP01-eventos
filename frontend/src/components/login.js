// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    // Cargar el token desde localStorage cuando el componente se monte
    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem('token'));
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3100/api/user/login', {
                username,
                password,
            });

            if (response.status === 200) {
                const receivedToken = response.data.token;
                setToken(receivedToken);

                // Guardar el token en localStorage
                localStorage.setItem('token', JSON.stringify(receivedToken));

                // Redirigir al usuario a la página de inicio
                navigate('/home');
            }
        } catch (error) {
            setErrorMessage('Error en el inicio de sesión');
        }
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Iniciar sesión</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Iniciar sesión</button>
                </form>
                <p>
                    ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
                </p>
                {token && (
                    <button onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                )}
            </div>
        </div>
    );
}

export default Login;
