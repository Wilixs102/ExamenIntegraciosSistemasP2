// src/components/AddProduct.js

import React, { useState } from 'react';
import { addProduct } from '../api';
import '../styles/AgregarProducto.css';

const AddProduct= () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');


    const handleSubmit = async (e) => {
      e.preventDefault();
      // Validación de campos
      if (!name || !price || !quantity) {
          alert('Por favor, completa todos los campos.');
          return;
      }
      if (isNaN(Number(price)) || isNaN(Number(quantity))) {
          alert('El precio y la cantidad deben ser números.');
          return;
      }
      const newProduct = { name, price, quantity };
      try {
          await addProduct(newProduct);
          alert('¡Se agregó el producto correctamente!');
          setName('');
          setPrice('');
          setQuantity('');
      } catch (error) {
          alert('No se agregó el producto');
      }
  };
  
    return (
      <div>
        <h2>Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Quantity:</label>
                <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>
            <button type="submit">Añadir Product</button>
        </form>
      </div>
    );
};

export default AddProduct;
