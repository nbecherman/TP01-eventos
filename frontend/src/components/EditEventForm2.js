import React, { useState } from 'react';
import axios from 'axios';

const EditEventForm = ({ event, onClose, setEvents, events, token }) => {
    const [formData, setFormData] = useState({
        name: event.name || '',
        full_address: event.full_address || '',
        id_creator_user: event.id_creator_user || '',
        id_location: event.id_location || '',
        latitude: event.latitude || '',
        longitude: event.longitude || '',
        max_capacity: event.max_capacity || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:3100/api/event-location/${event.id}`,
                formData,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
    
            if (response.status === 200) {
                console.log(response);
                const updatedEvent = response.data;
                setEvents(events.map(ev => (ev.id === updatedEvent.id ? updatedEvent : ev)));
                onClose(); 
            } else {
                console.error('Error en la actualización:', response.data.message);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />
            </label>
            <label>
                Dirección:
                <input 
                    type="text" 
                    name="full_address" 
                    value={formData.full_address} 
                    onChange={handleChange} 
                    required 
                />
            </label>
            <label>
                ID Locación:
                <input 
                    type="number" 
                    name="id_location" 
                    value={formData.id_location} 
                    onChange={handleChange} 
                    required 
                />
            </label>
            <label>
                Latitud:
                <input 
                    type="text" 
                    name="latitude" 
                    value={formData.latitude} 
                    onChange={handleChange} 
                    required 
                />
            </label>
            <label>
                Longitud:
                <input 
                    type="text" 
                    name="longitude" 
                    value={formData.longitude} 
                    onChange={handleChange} 
                    required 
                />
            </label>
            <label>
                Capacidad Máxima:
                <input 
                    type="number" 
                    name="max_capacity" 
                    value={formData.max_capacity} 
                    onChange={handleChange} 
                    required 
                />
            </label>
            <button type="submit">Guardar cambios</button>
        </form>
    );
};

export default EditEventForm;
