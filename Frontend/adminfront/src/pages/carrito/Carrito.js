import React, { useState, useEffect } from 'react';
import './Carrito.css';
import { obtenerCarrito } from '../../components/carrito/CarritoFunciones'; 

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = obtenerCarrito();
    console.log("Carrito desde el localStorage:", carritoGuardado);  // Verifica el contenido del carrito
    setCarrito(carritoGuardado);
}, []);


  return (
    <div>
      <h2>Carrito</h2>
      {carrito.length > 0 ? (
        <ul>
          {carrito.map((producto) => (
            <li key={producto.id_producto}>
              {producto.Nombre_Producto} - Cantidad: {producto.cantidad}
            </li>
          ))}
        </ul>
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
};

export default Carrito;
