import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../services/ProductoService';
import Card from 'react-bootstrap/Card'
import { agregarAlCarrito, eliminarDelCarrito } from '../carrito/CarritoFunciones';
import './Productos.css'

const Producto = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getAllProducts();
        const productosConImagenes = data.map(producto => ({
          ...producto,
          imagen: producto.imagen ? `data:image/png;base64,${btoa(
            new Uint8Array(producto.imagen).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          )}` : null
        }));
        setProductos(productosConImagenes);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="Producto">Los más comprados</h2>
      <div className="row">
        {productos.map((producto) => (
          <div key={producto.id_producto} className="col-md-4 mb-4">
            <Card>
              {producto.imagen && (
                <Card.Img
                  src={producto.imagen}
                  variant="top"
                  alt={producto.Nombre_Producto}
                  className="imagen">
                </Card.Img>
              )}
              <Card.Body>
                <Card.Text className='nombre'>{producto.Nombre_Producto}</Card.Text>
                <Card.Text className='descripcion'>{producto.descripcion_producto}</Card.Text>
                <Card.Text className='precio'>Precio: ${producto.precio_vta}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Producto;
