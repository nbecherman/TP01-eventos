// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/login';
import Register from './components/Register';
import Home from './components/home';

function App() {
    const [user, setUser] = useState(null); // Estado para el usuario logueado

    const handleLogin = (userData) => {
        setUser(userData); // Guarda la información del usuario al iniciar sesión
    };

    const handleLogout = () => {
        setUser(null); // Limpia la información del usuario al cerrar sesión
    };

    return (
        <Router>
            <div>
                <Header user={user} onLogout={handleLogout} /> {/* Pasa el usuario y la función de logout */}
                <Routes>
                    <Route path="/" element={<Login onLogin={handleLogin} />} /> {/* Pasa la función de login */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
