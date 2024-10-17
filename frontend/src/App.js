import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/login'; 
import Register from './components/Register';
import Home from './components/home';
import './App.css';
import { UserProvider, UserContext } from './context/UserContext'; 

function App() {
    const { token } = useContext(UserContext); 
    const navigate = useNavigate(); 
    useEffect(() => {
        if (token) {
            navigate('/home'); 
        }
    }, [token, navigate]);

    return (
        <div className="app-container">
            <div className="content-wrap">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/home" element={<Home />} />
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