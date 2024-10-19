import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/login'; 
import Register from './components/Register';
import Home from './components/home';
import EventInscript from './components/eventInscript';

import './App.css';
import { UserProvider, UserContext } from './context/UserContext'; 

function App() {
    const { token } = useContext(UserContext); 

    return (
        <div className="app-container">
            <div className="content-wrap">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={token ? <Navigate to="/home" /> : <Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} />
                        <Route path="/inscript" element={token ? <EventInscript /> : <Navigate to="/" />} />
                    </Routes>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default function AppWithProvider() {
    return (
        <UserProvider>
            <Router>
                <App />
            </Router>
        </UserProvider>
    );
}
