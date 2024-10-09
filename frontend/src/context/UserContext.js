// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crear el contexto
export const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Cargar el token desde localStorage cuando el componente se monte
    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem('token'));
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedToken) {
            setToken(storedToken);
            setUser(storedUser);
        }
    }, []);

    // Función para iniciar sesión
    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3100/api/user/login', {
                username,
                password,
            });

            if (response.status === 200) {
                const receivedToken = response.data.token;
                setToken(receivedToken);
                setUser(username);

                // Guardar el token y el usuario en localStorage
                localStorage.setItem('token', JSON.stringify(receivedToken));
                localStorage.setItem('user', JSON.stringify(username));
            }
        } catch (error) {
            console.error('Error en el inicio de sesión', error);
            throw new Error('Login failed');
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    // Valores que provee el contexto
    return (
        <UserContext.Provider value={{ user, token, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
