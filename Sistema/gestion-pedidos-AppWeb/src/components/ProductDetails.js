// src/components/ProductDetails.js

import React, { useState } from 'react';
import { updateInventory } from '../api';

const ProductDetails = ({ product }) => {
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateInventory(product.id, quantity);
            alert('Inventario actualizado');
        } catch (error) {
            console.error('Error updating inventory:', error);
        }
    };

    return (
        <div>
            <h2>Detalles del Producto</h2>
            {product && (
                <div>
                    <p>Nombre: {product.name}</p>
                    <p>Cantidad Disponible: {product.quantity}</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nueva Cantidad:
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Actualizar Inventario</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
