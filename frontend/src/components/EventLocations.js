import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Modal from './Modal.js';
import Formulario from './EditEventForm2.js';
import './Home.css'; 

const EventLocations = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { token } = useContext(UserContext);

    const fetchEventsInscript = async () => {
        try {
            const response = await axios.get("http://localhost:3100/api/event-location", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setEvents(response.data.eventLocations);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            setError(error.response?.data?.error || 'Error al cargar los eventos');
        }
    };
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3100/api/event-location/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setEvents(events.filter(event => event.id !== id)); // Actualiza la lista en pantalla
        } catch (error) {
            console.error('Error deleting event:', error);
            if (error.response?.data) {
                alert(error.response.data);  // Muestra el mensaje de error específico en un alert
            } else {
                alert('Error al eliminar el evento');  // Muestra un mensaje genérico si no hay error específico
            }
        }
    };
    

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
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
                            <p><strong>Dirección:</strong> {event.full_address}</p>
                            <p><strong>ID:</strong> {event.id}</p>
                            <p><strong>ID Usuario Creador:</strong> {event.id_creator_user}</p>
                            <p><strong>ID Locación:</strong> {event.id_location}</p>
                            <p><strong>Latitud:</strong> {event.latitude}</p>
                            <p><strong>Longitud:</strong> {event.longitude}</p>
                            <p><strong>Capacidad Máxima:</strong> {event.max_capacity}</p>
                                                    <button 
                            className="event-button delete" 
                            onClick={() => handleDelete(event.id)}>
                            Eliminar
                        </button>
                        <button 
                            className="event-button" 
                            onClick={() => handleEdit(event)}>
                            Editar
                        </button>
                        </li>
                    ))
                ) : (
                    <p>{error ? `Error: ${error}` : 'No hay eventos disponibles.'}</p>
                )}
            </ul>
            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                {selectedEvent && (
                    <Formulario 
                        event={selectedEvent} 
                        onClose={handleModalClose} 
                        setEvents={setEvents} 
                        events={events}
                        token={token}
                    />
                )}
            </Modal>
        </div>
    );
};

export default EventLocations;
