CREATE TABLE Factura (
    idFactura INT PRIMARY KEY IDENTITY(1,1),
    orderId BIGINT,
    productId INT,
    productName VARCHAR(255),
    productPrice DECIMAL(10, 2),
    quantity INT,
    customerName VARCHAR(255),
    customerEmail VARCHAR(255),
    totalValue DECIMAL(10, 2)
);
