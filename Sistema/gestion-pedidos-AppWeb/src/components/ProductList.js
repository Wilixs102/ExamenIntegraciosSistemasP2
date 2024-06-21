// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { fetchInventory } from '../api';
import '../styles/ProductList.css';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const productos = await fetchInventory();
                const productsWithImages = addImagesToProducts(productos.listaProductos);
                setProducts(productsWithImages);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    const addImagesToProducts = (products) => {
        return products.map((product) => {
            const statusCode = 100 + (product.id % 500); // Genera un código de estado HTTP en un rango de 100 a 599
            const image = `https://http.cat/${statusCode}`;
            return {
                ...product,
                image: image
            };
        });
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div >
            <h1>Memes Disponibles</h1>
            <div >
                {products.map(product => (
                    <div key={product.id}>
                        <div >
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h2 className="product-id">{product.id}</h2>
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-price">${product.price} USD</p>
                            <p className="product-quantity">Stock: {product.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
