// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/login'; // Cambié 'login' a 'Login' para mantener la convención de mayúsculas
import Register from './components/Register';
import Home from './components/home';
import { UserProvider } from './context/UserContext'; // Importa el UserProvider

function App() {
    return (
        <UserProvider> {/* Envuelve la aplicación en UserProvider */}
            <Router>
                <div>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/home" element={<Home />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;
