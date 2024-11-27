import React, { useState, useEffect } from 'react';
import './Carrito.css';
import { obtenerCarrito, eliminarDelCarrito, vaciarCarrito } from '../../components/carrito/CarritoFunciones';
import { createPedido } from '../../services/PedidoService';
import { createProductoxPedido } from '../../services/ProductosxPedidoService';
import { useNavigate } from 'react-router-dom';
import shop from '../../assets/img/shop.svg'
import { disminuirPorciones } from '../../services/ProductoService';

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [tipoPago, setTipoPago] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cargarCarrito = () => {
    const carritoGuardado = obtenerCarrito();
    setCarrito(carritoGuardado);
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  const manejarEliminacion = (idProducto) => {
    eliminarDelCarrito(idProducto);
    cargarCarrito();
  };

  const calcularTotal = () => {
    return carrito.reduce(
      (acumulador, producto) => acumulador + producto.precio_vta * producto.cantidad,
      0
    );
  };

  const obtenerFechaEntrega = () => {
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() + 5); // Sumar 5 días
    return fechaActual.toISOString().slice(0, 10); 
  };

  // Nueva función para crear productos por pedido
  const crearProductosPorPedido = async (idPedido) => {
    for (const producto of carrito) {
      const pxpData = {
        id_Pedido: parseInt(idPedido),
        id_Producto: parseInt(producto.id_Producto),
        cantidad_pedido: parseInt(producto.cantidad),
        precio: parseFloat(producto.precio_vta * producto.cantidad), // Calcular precio total correctamente
        observacion: " ", // Opcional
      };

      try {
        await createProductoxPedido(pxpData);
        await disminuirPorciones(producto.id_Producto, producto.cantidad);
      } catch (error) {
        console.error("Error al asociar el producto con el pedido:", error);
        alert("Hubo un problema al agregar un producto al pedido. Inténtalo de nuevo.");
        return;
      }
    }
  };

  const enviarPedido = async () => {
    if (!tipoPago) {
      alert("Por favor, selecciona un método de pago.");
      return;
    }

    const cliente = JSON.parse(localStorage.getItem("userinfo"));
    const fecha_pedido = new Date();

    const pedidoData = {
      id_Cliente: parseInt(cliente.id_persona),
      fecha_pedido: fecha_pedido.toISOString().slice(0, 10),
      fecha_entrega: obtenerFechaEntrega(),
      lugar_entrega: "Local",
      id_Estado: 1,
      id_TipoPago: parseInt(tipoPago, 10),
    };

    try {
      const pedidoResponse = await createPedido(pedidoData);
      const idPedido = pedidoResponse.id_Pedido;
      crearProductosPorPedido(idPedido);

      alert("Pedido enviado con éxito.");
      vaciarCarrito();
      cargarCarrito();
      setTipoPago("");
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
    }
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
                      className="botonDeleteCarrito"
                      onClick={() => manejarEliminacion(producto.id_Producto)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-carrito">
            <p>Total del carrito: ${calcularTotal().toFixed(2)}</p>
          </div>

          {/* Selección del tipo de pago */}
          <div className="tipo-pago">
            <p className="metodoPagoTitulo">Selecciona el método de pago:</p>
            <select
              id="tipoPago"
              value={tipoPago}
              onChange={(e) => setTipoPago(e.target.value)}
            >
              <option value="">-- Selecciona --</option>
              <option value="1">Efectivo</option>
              <option value="2">Crédito</option>
              <option value="3">Débito</option>
              <option value="4">Transferencia</option>
              <option value="5">Mercado Pago</option>
            </select>
          </div>

          <button className="enviarPedido" onClick={enviarPedido}>
            Enviar Pedido
          </button>
        </>
      ) : (
        <div className="center-content">
          <p className="carritoVacio">¡El carrito está vacío!</p>
          <img src={shop} alt="shop" className='imagencarritoshop' onClick={() => navigate('/menu/Todos')} />
        </div>
      )}
    </div>
  );
};

export default Carrito;

