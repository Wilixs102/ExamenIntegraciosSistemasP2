// src/api.js
import axios from "axios";

export async function fetchInventory() {
    let response = await axios.get("http://localhost:5179/api/v1/PetShop");
    let productos = response.data;
    return productos;
}

export async function getProduct(id) {
    let response = await axios.get(`http://localhost:5179/api/v1/PetShop/${id}`);
    let productos = response.data;
    return productos;
}

export const updateInventory = async (id, updatedProduct) => {
    try {
        
        const response = await axios.put(`http://localhost:5179/api/v1/PetShop/${id}`, updatedProduct);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update inventory');
    }
};

export const addProduct = async (newProduct) => {
    try {
        const response = await axios.post("http://localhost:5179/api/v1/PetShop", newProduct);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add product');
    }
};


  