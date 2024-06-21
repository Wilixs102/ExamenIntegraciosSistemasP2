// src/App.js

import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import OrderForm from './components/OrderForm';
import ActualizarLista from './components/AgregarProducto';

const App = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
    };

    const handlePlaceOrder = (productId, quantity) => {
        // Lógica para manejar la realización del pedido
        console.log('Pedido realizado:', { productId, quantity });
    };

    return (
        <div>
            <h1>Sistema de Órdenes de Compra</h1>
            <ProductList onSelectProduct={handleSelectProduct} />
            {selectedProduct && <ProductDetails product={selectedProduct} />}
            <OrderForm onPlaceOrder={handlePlaceOrder} />
            {/* <ActualizarLista onPlaceOrder={handlePlaceOrder}/> */}
        </div>
    );
};

export default App;
