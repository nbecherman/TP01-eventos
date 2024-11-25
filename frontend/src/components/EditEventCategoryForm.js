import React, { useState } from 'react';
import axios from 'axios';

const EditCategoryForm = ({ category, onClose, setCategories, categories }) => {
    const [formData, setFormData] = useState({
        name: category.name || '',
        display_order: category.display_order || ''
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Resetea el error antes de la validación

        // Validación local en el frontend
        if (!formData.name) {
            alert('El campo "Nombre" es obligatorio.');
            return;
        }
        if (formData.name.length < 3) {
            alert('El nombre debe tener al menos 3 caracteres.');
            return;
        }
        if (!formData.display_order) {
            alert('El campo "Orden de visualización" es obligatorio.');
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:3100/api/event-category/${category.id}`,
                formData
            );

            if (response.status === 201) {
                const updatedCategory = response.data;
                setCategories(categories.map(cat => (cat.id === updatedCategory.id ? updatedCategory : cat)));
                onClose();
            } else {
                alert('Error en la actualización: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            setError('Error al enviar la solicitud. Revisa la consola para más detalles.');
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
                Orden de visualización:
                <input
                    type="number"
                    name="display_order"
                    value={formData.display_order}
                    onChange={handleChange}
                    required
                />
            </label>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Guardar cambios</button>
        </form>
    );
};

export default EditCategoryForm;
