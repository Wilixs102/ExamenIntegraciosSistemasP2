import pandas as pd
import pyodbc

# Cargar el archivo CSV
csv_path = 'order_data.csv'
df = pd.read_csv(csv_path)

# Configuración de la conexión a la base de datos
server = 'DESKTOP-0ISNO40'
database = 'IntegracionBaseUno'
trusted_connection = 'yes'
driver = '{SQL Server}'

# Conectar a la base de datos SQL Server
conn_str = f'DRIVER={driver};SERVER={server};DATABASE={database};Trusted_Connection={trusted_connection};'
conn = pyodbc.connect(conn_str)
cursor = conn.cursor()

# Contadores para el número de registros procesados
inserted_records = 0
updated_products = 0

# Insertar registros en la tabla Orders
for index, row in df.iterrows():
    cursor.execute('''
        INSERT INTO Orders (orderId, productId, productName, productPrice, quantity, customerName, customerEmail)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', row['orderId'], row['productId'], row['productName'], row['productPrice'], row['quantity'], row['customerName'], row['customerEmail'])
    conn.commit()
    inserted_records += 1

# Actualizar la cantidad de productos en la tabla Producto
for index, row in df.iterrows():
    cursor.execute('''
        UPDATE Producto
        SET quantity = quantity - ?
        WHERE id = ?
    ''', row['quantity'], row['productId'])
    conn.commit()
    updated_products += 1

# Mostrar mensajes de éxito
print(f"Se han insertado exitosamente {inserted_records} registros en la tabla Orders.")
print(f"Se han actualizado exitosamente las cantidades de {updated_products} productos en la tabla Producto.")

# Cerrar la conexión
cursor.close()
conn.close()
