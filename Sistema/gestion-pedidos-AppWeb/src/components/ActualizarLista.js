const axios = require('axios');

const productos = [
  { id: 1, name: "Laptop", quantity: 45, price: 999.99, available: true },
  { id: 2, name: "Mouse Inalámbrico", quantity: 140, price: 29.99, available: true },
  { id: 3, name: "Teclado Mecánico", quantity: 95, price: 79.99, available: true },
  { id: 4, name: "Monitor 24 pulgadas", quantity: 25, price: 199.99, available: true },
  { id: 5, name: "Silla Ergonómica", quantity: 15, price: 249.99, available: true },
  { id: 6, name: "Disco Duro Externo 1TB", quantity: 70, price: 59.99, available: true },
  { id: 7, name: "Cámara Web HD", quantity: 35, price: 49.99, available: true },
  { id: 8, name: "Micrófono USB", quantity: 30, price: 89.99, available: true },
  { id: 9, name: "Auriculares Bluetooth", quantity: 55, price: 69.99, available: true },
  { id: 10, name: "Router Wi-Fi", quantity: 20, price: 129.99, available: true }
];

async function actualizarInventario() {
  for (const producto of productos) {
    try {
      const response = await axios.post('http://localhost:3000/api/inventory/update', {
        id: producto.id,
        quantity: producto.quantity,
        price: producto.price,
        available: producto.available
      });
      console.log(`Producto ID ${producto.id} actualizado:`, response.data);
    } catch (error) {
      console.error(`Error al actualizar el producto ID ${producto.id}:`, error.response ? error.response.data : error.message);
    }
  }
}

actualizarInventario();
