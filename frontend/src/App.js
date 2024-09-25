// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/login';
import Register from './components/Register';
import Home from './components/home';

function App() {

    return (
        <Router>
            <div>
                <Header/> {/* Pasa el usuario y la función de logout */}
                <Routes>
                    <Route path="/" element={<Login />} /> {/* Pasa la función de login */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
