import React, { useContext } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Header.css'; 

const Header = () => {
    const { token, user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleInscriptNavigation = () => {
        navigate('/inscript'); 
    };
    
    return (
        <header className="header">
                    <Link to="/home" >
                    <div className="logo"><a>Mi Sitio</a></div>
                    </Link>
            {user ? (
                <div className="user-info">
                    <span className="user-icon">👤</span>
                    <span className="username">{user.username}</span>
                    <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
                    <button className="logout-button" onClick={handleInscriptNavigation}>
                        Mis suscripciones
                    </button>
                </div>
            ) : null}
        </header>
    );
};

export default Header;
