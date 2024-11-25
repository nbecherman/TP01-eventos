import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import FormularioEvento from './formulario';
import Modal from './Modal';
import './Home.css'; 

const Home = () => {
    const [events, setEvents] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const { token } = useContext(UserContext);
    const [searchParams, setSearchParams] = useState({
        name: '',
        category: '',
        startDate: '',
        tag: '',
    });
    const [limit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [pagination, setPagination] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3100/api/event', {
                params: {
                    ...searchParams,
                    limit,
                    offset,
                },
            });
            setEvents(response.data.collection);
            setPagination(response.data.paginacion);
            setErrorMessage('');
        } catch (error) {
            const message = error.response?.data?.message || 'Error al cargar los eventos';
            setErrorMessage(message);
            alert(message);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [searchParams, limit, offset]);
    const inscribirseEvento = async (id) => {
        try {
            const response = await axios.post(
                `http://localhost:3100/api/event/${id}/enrollment`,
                { description: 'Inscripción al evento', attended: false },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            if (response.status === 201) {
                alert("Inscripto con éxito.");
            }
        } catch (error) {
            console.log(error);
            const message = error.response?.data?.error || 'Error al inscribirse en el evento';
            alert(message);  
        }
    };

    const handleInputChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value,
        });
    };

    const handleNextPage = () => {
        setOffset(offset + limit);
    };

    const handlePrevPage = () => {
        setOffset(Math.max(0, offset - limit));
    };

    return (
        <div className="container">
            <h1>Eventos</h1>
            <button onClick={() => setIsModalOpen(true)}>Crear Evento</button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <FormularioEvento onEventCreated={fetchEvents} onClose={() => setIsModalOpen(false)} />
            </Modal>

            <form className="search-form" onSubmit={(e) => { e.preventDefault(); fetchEvents(); }}>
                <input
                    type="text"
                    name="name"
                    value={searchParams.name}
                    onChange={handleInputChange}
                    placeholder="Nombre del evento"
                />
                <input
                    type="text"
                    name="category"
                    value={searchParams.category}
                    onChange={handleInputChange}
                    placeholder="Categoría"
                />
                <input
                    type="date"
                    name="startDate"
                    value={searchParams.startDate}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="tag"
                    value={searchParams.tag}
                    onChange={handleInputChange}
                    placeholder="Etiqueta"
                />
                <button type="submit">Buscar</button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <ul className="event-list">
                {Array.isArray(events) && events.length > 0 ? (
                    events.map((event) => (
                        <li key={event.id} className="event-item">
                            <h3>{event.name}</h3>
                            <p>{event.description}</p>
                            <p><strong>Fecha de inicio:</strong> {new Date(event.start_date).toLocaleString()}</p>
                            <p><strong>Duración:</strong> {event.duration_in_minutes} minutos</p>
                            <p><strong>Precio:</strong> {event.price} USD</p>
                            <button className="event-item-button" onClick={() => inscribirseEvento(event.id)}>
                                INSCRIBIRSE
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No hay eventos disponibles</p>
                )}
            </ul>

            {pagination && (
                <div className="pagination">
                    <button className="pagination-button" onClick={handlePrevPage} disabled={offset === 0}>
                        Anterior
                    </button>
                    <button className="pagination-button" onClick={handleNextPage} disabled={!pagination.nextPage}>
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;
