import React, { useState, useEffect } from 'react';
import './Carrito.css';
import { obtenerCarrito, eliminarDelCarrito } from '../../components/carrito/CarritoFunciones';

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  // Función para cargar el carrito
  const cargarCarrito = () => {
    const carritoGuardado = obtenerCarrito();
    setCarrito(carritoGuardado);
  };

  useEffect(() => {
    cargarCarrito(); // Cargar el carrito al montar el componente
  }, []);

  const manejarEliminacion = (idProducto) => {
    eliminarDelCarrito(idProducto); // Llamada a la función para eliminar del almacenamiento
    cargarCarrito(); // Recargar el carrito después de eliminar
  };

  // Calcular el total del carrito
  const calcularTotal = () => {
    return carrito.reduce(
      (acumulador, producto) => acumulador + producto.precio_vta * producto.cantidad,
      0
    );
  };

  return (
    <div className="carrito-container">
      <h2 className="tituloCarrito">Mi Carrito</h2>
      {carrito.length > 0 ? (
        <>
          <table className="carrito-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Imagen</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
                <th>Cancelar</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((producto) => (
                <tr key={producto.id_Producto}>
                  <td>{producto.Nombre_Producto}</td>
                  <td>
                    <img src={producto.imagen} alt={producto.Nombre_Producto} width="50" />
                  </td>
                  <td>{producto.cantidad}</td>
                  <td>${producto.precio_vta}</td>
                  <td>${producto.precio_vta * producto.cantidad}</td>
                  <td>
                    <button
                      className="btn botonDeleteCarrito"
                      onClick={() => manejarEliminacion(producto.id_Producto)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Mostrar el total*/}
          <div className="total-carrito">
            <p>Total del carrito: ${calcularTotal().toFixed(2)}</p>
          </div>
        </>
      ) : (
        <p className="carritoVacio">¡El carrito está vacío!</p>
      )}
    </div>
  );
};

export default Carrito;
