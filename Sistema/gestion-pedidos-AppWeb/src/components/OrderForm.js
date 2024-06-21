// src/components/OrderForm.js

import React, { useState } from 'react';
import { updateInventory, getProduct } from '../api';
import Papa from 'papaparse';
import '../styles/OrderForm.css';

const OrderForm = () => {
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [message, setMessage] = useState('');
    const [orderData, setOrderData] = useState([]);

    const isNumeric = (value) => {
        return /^-?\d+$/.test(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!productId || !quantity || !customerName || !customerEmail) {
            setMessage('Se deben ingresar todos los parámetros.');
            return;
        }

        if (!isNumeric(quantity)) {
            setMessage('Quantity debe ser un número.');
            return;
        }

        try {
            const originalProductResponse = await getProduct(productId);
            const originalProduct = originalProductResponse.producto;

            if (!originalProduct) {
                setMessage('Product no encontrado.');
                return;
            }

            const stock = originalProduct.quantity;
            const quantityNumber = parseInt(quantity, 10);

            if (stock < quantityNumber) {
                setMessage(`La cantidad de pedido (${quantityNumber}) excede el stock del producto (${stock}).`);
                return;
            }

            const newQuantity = (stock - quantityNumber).toString();

            const updatedProduct = {
                id: productId,
                quantity: newQuantity,
                name: originalProduct.name,
                price: originalProduct.price
            };

            const response = await updateInventory(productId, updatedProduct);
            setMessage('Pedido realizado satisfactoriamente!');

            const order = {
                orderId: new Date().getTime(),
                productId: productId,
                productName: originalProduct.name,
                productPrice: originalProduct.price,  // Captura el precio del producto
                quantity: quantityNumber,
                customerName: customerName,
                customerEmail: customerEmail
            };

            setOrderData([...orderData, order]);
        } catch (error) {
            setMessage('No se pudo realizar el pedido.');
        }
    };

    const exportToCSV = () => {
        const csv = Papa.unparse(orderData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'order_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <h2>Realizar Pedidos</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="productId">Product ID:</label>
                    <input
                        type="text"
                        id="productId"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="text"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="customerName">Customer Name:</label>
                    <input
                        type="text"
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="customerEmail">Customer Email:</label>
                    <input
                        type="email"
                        id="customerEmail"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                </div>
                <button type="submit">Realizar Pedido</button>
            </form>
            {message && <p>{message}</p>}
            {orderData.length > 0 && (
                <button onClick={exportToCSV}>Exportar a CSV</button>
            )}
        </div>
    );
};

export default OrderForm;
