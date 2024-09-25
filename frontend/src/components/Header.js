// src/components/Header.js
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Header.css'; // Estilos

const Header = ({ user, onLogout }) => {
    const token = localStorage.getItem('token');    
    const userP = localStorage.getItem('user');    
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/'); // Redirige a la página de inicio
    };

    return (
        <header className="header">
            <div className="logo">Mi Sitio</div>
            {userP && (
                <div className="user-info">
                    <span className="user-icon">👤</span> {/* Puedes reemplazar esto con un icono real */}
                    <span className="username">{userP}</span>
                    <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
                </div>
            )}
        </header>
    );
};

export default Header;

