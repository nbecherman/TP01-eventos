import React, { useState } from 'react';
import axios from 'axios';

const EditCategoryForm = ({ category, onClose, setCategories, categories }) => {
    const [formData, setFormData] = useState({
        name: category.name || '',
        display_order: category.display_order || '' // Asumiendo que display_order es el único otro campo editable
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(category.id);
        try {
            const response = await axios.put(
                `http://localhost:3100/api/event-category/${category.id}`,
                formData,
            );
    
            if (response.status === 201) {
                console.log(response);
                const updatedCategory = response.data;
                setCategories(categories.map(cat => (cat.id === updatedCategory.id ? updatedCategory : cat)));
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
                Orden de visualización:
                <input 
                    type="number" 
                    name="display_order" 
                    value={formData.display_order} 
                    onChange={handleChange} 
                    required 
                />
            </label>
            <button type="submit">Guardar cambios</button>
        </form>
    );
};

export default EditCategoryForm;
