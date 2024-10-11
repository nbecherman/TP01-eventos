import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Header.css'; 

const Header = () => {
    const { token, user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    return (
        <header className="header">
            <div className="logo">Mi Sitio</div>
            {user ? (
                <div className="user-info">
                    <span className="user-icon">👤</span>
                    <span className="username">{user.username}</span>
                    <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
                </div>
            ) : null}
        </header>
    );
};

export default Header;
