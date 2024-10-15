import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const FormularioEvento = () => {
    const { token } = useContext(UserContext);
    const [evento, setEvento] = useState({
        name: '',
        description: '',
        id_event_category: '',
        id_event_location: '',
        id_tag: '',
        start_date: '',
        duration_in_minutes: '',
        price: '',
        enabled_for_enrollment: false,
        max_assistance: '',
    });

    const [categorias, setCategorias] = useState([]);
    const [eventLocations, setEventLocations] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:3100/api/event-category');
                if (Array.isArray(response.data)) {
                    setCategorias(response.data);
                } else {
                    setCategorias([]); // Si no es un array, define un array vacío
                }
            } catch (error) {
                console.error(error);
                setCategorias([]); // En caso de error, maneja la situación con un array vacío
            }
        };

        const fetchEventLocations = async () => {
            try {
                const response = await axios.get('http://localhost:3100/api/event-location/all');
                setEventLocations(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchTags = async () => {
            try {
                const response = await axios.get('http://localhost:3100/api/event-category/Alltags');
                setTags(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategorias();
        fetchEventLocations();
        fetchTags();
    }, []);

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
            alert("Insertado con éxito");
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
                <label>
                    Descripción:
                    <textarea name="description" value={evento.description} onChange={handleChange} required />
                </label>
                <label>
                    Categoría:
                    <select name="id_event_category" value={evento.id_event_category} onChange={handleChange} required>
                        <option value="">Seleccionar Categoría</option>
                        {categorias.length > 0 ? (
                            categorias.map(categoria => (
                                <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
                            ))
                        ) : (
                            <option value="">No hay categorías disponibles</option>
                        )}
                    </select>
                </label>
                <label>
                    Ubicación:
                    <select name="id_event_location" value={evento.id_event_location} onChange={handleChange} required>
                        <option value="">Seleccionar Ubicación</option>
                        {eventLocations.map(location => (
                            <option key={location.id} value={location.id}>{location.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Etiquetas:
                    <select name="id_tag" value={evento.id_tag} onChange={handleChange} required>
                        <option value="">Seleccionar Etiqueta</option>
                        {tags.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Fecha de Inicio:
                    <input type="datetime-local" name="start_date" value={evento.start_date} onChange={handleChange} required />
                </label>
                <label>
                    Duración (en minutos):
                    <input type="number" name="duration_in_minutes" value={evento.duration_in_minutes} onChange={handleChange} required />
                </label>
                <label>
                    Precio:
                    <input type="number" name="price" value={evento.price} onChange={handleChange} required />
                </label>
                <label>
                    Habilitado para Inscripción:
                    <input type="checkbox" name="enabled_for_enrollment" checked={evento.enabled_for_enrollment} onChange={handleChange} />
                </label>
                <label>
                    Máxima Asistencia:
                    <input type="number" name="max_assistance" value={evento.max_assistance} onChange={handleChange} required />
                </label>
                <button type="submit">Crear Evento</button>
            </form>
        </div>
    );
};

export default FormularioEvento;
