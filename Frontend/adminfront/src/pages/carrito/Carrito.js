import React, { useState, useEffect } from 'react';
import './Carrito.css';
import { obtenerCarrito } from '../../components/carrito/CarritoFunciones';

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = obtenerCarrito();  
    setCarrito(carritoGuardado);
  }, []);

  return (
    <div className="carrito-container">
      <h2 className='tituloCarrito'>Mi Carrito</h2>
      {carrito.length > 0 ? (
        <table className="carrito-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Imagen</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((producto) => (
              <tr key={producto.id_Producto}>
                <td>{producto.Nombre_Producto}</td>
                <td><img src={producto.imagen} alt={producto.Nombre_Producto} width="50" /></td>
                <td>{producto.cantidad}</td>
                <td>${producto.precio_vta}</td>
                <td>${producto.precio_vta * producto.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
};

export default Carrito;
