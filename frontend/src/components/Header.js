import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Header.css'; 

const Header = () => {
    const { token, user, logout } = useContext(UserContext);
    const navigate = useNavigate();
    const [showNavButtons, setShowNavButtons] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleInscriptNavigation = () => {
        navigate('/inscript'); 
    };

    const handleCategorias = () => {
        navigate('/categories'); 
    };

    const handleLocations = () => {
        navigate('/locations'); 
    };
    
    return (
        <header className="header">
            <Link to="/home">
                <div className="logo"><a>Mi Sitio</a></div>
            </Link>
            {user && (
                <div className="user-info">
                    <span className="user-icon">👤</span>
                    <span className="username">{user.username}</span>
                    <button className="logout-button" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                    <button 
                        className="toggle-nav-button" 
                        onClick={() => setShowNavButtons(!showNavButtons)}
                    >
                        {showNavButtons ? 'Ocultar Menú' : 'Mostrar Menú'}
                    </button>

                    
                    <div className={`additional-nav-buttons ${showNavButtons ? 'visible' : ''}`}>
                        <button className="nav-button" onClick={handleInscriptNavigation}>
                            Mis suscripciones
                        </button>
                        <button className="nav-button" onClick={handleCategorias}>
                            Mis Categorias
                        </button>
                        <button className="nav-button" onClick={handleLocations}>
                            Mis Locaciones
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;