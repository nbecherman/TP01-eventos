import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import './Home.css'; 

const EventInscript = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const { token } = useContext(UserContext);

    const fetchEventsInscript = async () => {
        try {
            const response = await axios.get("http://localhost:3100/api/event/eventEnrollmentByUser", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                console.log(response);
                setEvents(response.data); 
            }
        } catch (error) {
            setError(error.response?.data?.error || 'Error al cargar los eventos');
        }
    };

    useEffect(() => {
        if (token) {
            fetchEventsInscript();
        }
    }, [token]);
    return (
        <div className='container'>
            <ul className="event-list">
                {Array.isArray(events) && events.length > 0 ? (
                    events.map((event) => (
                        <li key={event.id} className="event-item">
                            <h3>{event.name}</h3>
                            <p>{event.description}</p>
                            <p><strong>Fecha de inicio:</strong> {new Date(event.start_date).toLocaleString()}</p>
                            <p><strong>Duración:</strong> {event.duration_in_minutes} minutos</p>
                            <p><strong>Precio:</strong> {event.price} USD</p>
                        </li>
                    ))
                ) : (
                    <p>{error || 'No hay eventos disponibles'}</p>
                )}
            </ul>
        </div>
    );
};

export default EventInscript;
