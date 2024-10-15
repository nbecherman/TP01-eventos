import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import './FormularioEvento.css';

const FormularioEvento = () => {
    const { token } = useContext(UserContext);
    const [evento, setEvento] = useState({
        name: '',
        description: '',
        id_event_category: '',
        id_event_location: '',
        start_date: '',
        duration_in_minutes: '',
        price: '',
        enabled_for_enrollment: false,
        max_assistance: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEvento({
            ...evento,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3100/api/event', { 
                ...evento, 
                id_creator_user: token 
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            alert("Insertado con exito");
            
        } catch (error) {
            if (error.response.data) {
                alert(error.response.data);
            } else {
                alert('Ocurrió un error al crear el evento. Inténtalo de nuevo.');
            }
        }
    };
    return (
        <div>
            <h1>Crear Evento</h1>
            <form className="event-form" onSubmit={handleSubmit}>
                <label>
                    Nombre del Evento:
                    <input type="text" name="name" value={evento.name} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Descripción:
                    <textarea name="description" value={evento.description} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Categoría:
                    <input type="number" name="id_event_category" value={evento.id_event_category} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Ubicación:
                    <input type="number" name="id_event_location" value={evento.id_event_location} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Fecha de Inicio:
                    <input type="datetime-local" name="start_date" value={evento.start_date} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Duración (en minutos):
                    <input type="number" name="duration_in_minutes" value={evento.duration_in_minutes} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Precio:
                    <input type="number" name="price" value={evento.price} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Habilitado para Inscripción:
                    <input type="checkbox" name="enabled_for_enrollment" checked={evento.enabled_for_enrollment} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Máxima Asistencia:
                    <input type="number" name="max_assistance" value={evento.max_assistance} onChange={handleChange} required />
                </label>
                <br />
                <button type="submit">Crear Evento</button>
            </form>
        </div>
    );
};

export default FormularioEvento;
