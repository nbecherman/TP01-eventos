import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Modal from './Modal.js';
import Formulario from './EditEventCategoryForm.js';
import './Home.css'; 

const Categorias = () => {
    const [Category, setCategory] = useState([]);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { token } = useContext(UserContext);

    const fetchEventsInscript = async () => {
        try {
            const response = await axios.get("http://localhost:3100/api/event-category");
            console.log('API Response:', response); // Añadimos un log para verificar la respuesta
            if (response.status === 200) {
                setCategory(response.data.collection || []); // Suponiendo que la respuesta tenga una propiedad `collection`
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            setError(error.response?.data?.error || 'Error al cargar los eventos');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3100/api/event-category/${id}`);
            setCategory(Category.filter(category => category.id !== id)); // Actualiza la lista de categorías
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
                {Array.isArray(Category) && Category.length > 0 ? (
                    Category.map((category) => (
                        <li key={category.id} className="event-item">
                            <h3>{category.name}</h3>
                            <h3>{category.display_order}</h3>

                            <button 
                                className="event-button delete" 
                                onClick={() => handleDelete(category.id)}>
                                Eliminar
                            </button>
                            <button 
                                className="event-button" 
                                onClick={() => handleEdit(category)}>
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
                    category={selectedEvent} 
                        onClose={handleModalClose} 
                        setCategories={setCategory} 
                        categories={Category}
                    />
                )}
            </Modal>
        </div>
    );
};

export default Categorias;
