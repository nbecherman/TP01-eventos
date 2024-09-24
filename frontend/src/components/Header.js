// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Puedes agregar estilos aquí

const Header = ({ user, onLogout }) => {
    return (
        <header className="header">
            <div className="logo">Mi Sitio</div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register">Registrarse</Link></li>
                    {user && (
                        <li>
                            <span>{user.username}</span>
                            <button onClick={onLogout}>Cerrar sesión</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
