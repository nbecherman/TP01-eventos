// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login({ onLogin }) { // Recibe la función onLogin como prop
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3100/api/user/login', {
                username,
                password,
            });

            if (response.status === 200) {
                const userData = response.data; // Asegúrate de que tu API devuelve los datos correctos
                onLogin(userData); // Llama a la función de login con los datos del usuario
                navigate('/home'); // Redirige a la página de inicio
            }
        } catch (error) {
            setErrorMessage('Error en el inicio de sesión');
            console.error(error);
        }
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
            </div>
        </div>
    );
}

export default Login;
