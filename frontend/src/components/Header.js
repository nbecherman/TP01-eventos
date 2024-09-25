// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Estilos

const Header = ({ user, onLogout }) => {
    return (
        <header className="header">
            <div className="logo">Mi Sitio</div>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register">Registrarse</Link></li>
                </ul>
            </nav>
            {user && (
                <div className="user-info">
                    <span className="user-icon">👤</span> {/* Puedes reemplazar esto con un icono real */}
                    <span className="username">{user.username}</span>
                    <button className="logout-button" onClick={onLogout}>Cerrar sesión</button>
                </div>
            )}
        </header>
    );
};

export default Header;

