from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors

def generar_pdf(order_data, filename):
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter
    top_margin = 50
    left_margin = 50

    # Encabezado de la factura
    c.setFont("Helvetica-Bold", 14)
    c.drawString(left_margin, height - top_margin, "Factura")
    c.setFont("Helvetica", 12)
    c.drawString(left_margin, height - top_margin - 30, f"Orden ID: {order_data[0][0]}")
    c.drawString(left_margin, height - top_margin - 50, f"Cliente: {order_data[0][5]}")
    c.drawString(left_margin, height - top_margin - 70, f"Email: {order_data[0][6]}")

    # Títulos de las columnas
    y = height - top_margin - 110
    c.setStrokeColor(colors.black)
    c.setFillColor(colors.lightgrey)
    c.rect(left_margin, y, width - 100, 20, fill=1)
    c.setFillColor(colors.black)
    c.drawString(left_margin + 10, y + 5, "Producto")
    c.drawString(left_margin + 200, y + 5, "Cantidad")
    c.drawString(left_margin + 300, y + 5, "Precio Unit.")
    c.drawString(left_margin + 400, y + 5, "Total")

    # Listado de productos
    y -= 30
    c.setFont("Helvetica", 10)
    total_factura = 0
    for row in order_data:
        orderId, productId, productName, productPrice, quantity, customerName, customerEmail = row
        totalValue = productPrice * quantity
        total_factura += totalValue
        c.drawString(left_margin + 10, y, f"{productName}")
        c.drawString(left_margin + 200, y, f"{quantity}")
        c.drawString(left_margin + 300, y, f"{productPrice:.2f}")
        c.drawString(left_margin + 400, y, f"{totalValue:.2f}")
        y -= 20

    # Total de la factura
    c.setFont("Helvetica-Bold", 12)
    c.drawString(left_margin, y - 10, f"Total Factura: {total_factura:.2f}")
    
    c.save()

# Luego, asegúrate de llamar a esta función en tu flujo principal después de insertar la factura y obtener los datos.
