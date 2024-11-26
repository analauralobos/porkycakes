import React, { useEffect, useState } from 'react';
import './Pedidos.css';
import { getPedidosByCliente, getNombreByCliente, getProductosByPedido, modificarEstadoPedido, eliminarPedido } from '../../services/PedidoService';
import { getNombreCli } from '../../services/ClienteService';

const Pedidos = () => {
  const [nombreCliente, setNombreCliente] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [actionToPerform, setActionToPerform] = useState(null); // Estado para almacenar la acción a realizar (cancelar o eliminar)
  const [pedidoId, setPedidoId] = useState(null); // Estado para almacenar el id del pedido que se va a cancelar/eliminar

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const cliente = JSON.parse(localStorage.getItem("userinfo"));
        const idCliente = cliente?.id_persona;

        if (!idCliente) {
          console.error("No se encontró información del cliente.");
          return;
        }

        const nombre = await getNombreCli(idCliente);
        setNombreCliente(nombre);

        const pedidosData = await getPedidosByCliente(idCliente);

        const pedidosConDetalles = await Promise.all(
          pedidosData.map(async (pedido) => {
            const productos = await getProductosByPedido(pedido.id_Pedido);
            return { ...pedido, productos };
          })
        );

        setPedidos(pedidosConDetalles);
      } catch (error) {
        console.error("Error al cargar los pedidos: ", error);
      }
    };

    fetchPedidos();
  }, [pedidos]);

  const getEstadoPedido = (estado) => {
    switch (estado) {
      case 1: return "Pendiente";
      case 2: return "Producción";
      case 3: return "Terminado";
      case 4: return "Anulado";
      case 5: return "Entregado";
      default: return "";
    }
  };

  const getMedioPago = (tipoPago) => {
    switch(tipoPago){
      case 1: return "Efectivo";
      case 2: return "Crédito";
      case 3: return "Débito";
      case 4: return "Transferencia";
      case 5: return "Mercado Pago";
      default: return "";
    }
  };

  const handleConfirmarAccion = async () => {
    if (actionToPerform === 'cancelar') {
      try {
        await modificarEstadoPedido(pedidoId, 4); // Cambia a Anulado
      } catch (error) {
        console.error("Error al cancelar el pedido: ", error);
      }
    } else if (actionToPerform === 'eliminar') {
      try {
        await eliminarPedido(pedidoId); 
      } catch (error) {
        console.error("Error al eliminar el pedido: ", error);
      }
    }
    setShowModal(false); // Cierra el modal
  };

  const abrirModal = (idPedido, accion) => {
    setPedidoId(idPedido);
    setActionToPerform(accion);
    setShowModal(true); // Abre el modal
  };

  return (
    <div className="pedidos-container">
      <h2 className="nombreCliente-Pedido">Pedidos de {nombreCliente}</h2>
      {pedidos.length === 0 ? (
        <p className="pedidosVacios">No hay pedidos disponibles.</p>
      ) : (
        <div className="pedidos-list">
          {pedidos.map((pedido) => (
            <div key={pedido.id_pedido} className="pedido-card">
              <div className="pedido-details">
                <p><strong>Pedido: </strong>
                  {pedido.productos.map((producto, index) => (
                    <span key={index}>{producto.Nombre_Producto} (x{producto.cantidad_pedido}), </span>
                  ))}
                </p>
                <p><strong>Estado del pedido:</strong>
                  <span className={`pedido-status ${getEstadoPedido(pedido.id_Estado)}`}>
                    <b style={{color: 'black'}}>{getEstadoPedido(pedido.id_Estado)}</b>
                  </span>
                </p>
                <p><strong>Medio de pago:</strong> {getMedioPago(pedido.id_TipoPago)}</p>
                <p><strong>Fecha de pedido:</strong> {pedido.fecha_pedido}</p>
              </div>

              {/* Botón para eliminar pedido (solo si el estado es 'Entregado' o 'Anulado') */}
              {pedido.id_Estado === 5 || pedido.id_Estado === 4 ? (
                <button
                  className="btn-eliminar"
                  onClick={() => abrirModal(pedido.id_Pedido, 'eliminar')}
                >
                  X
                </button>
              ) : null}

              {/* Botón para cancelar pedido (solo si el estado es 'Pendiente') */}
              {pedido.id_Estado === 1 ? (
                <button
                  className="btn-cancelar"
                  onClick={() => abrirModal(pedido.id_Pedido, 'cancelar')}
                >
                  Cancelar
                </button>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmación */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>¿Estás seguro?</h3>
            <p>¿Deseas {actionToPerform === 'cancelar' ? 'cancelar' : 'eliminar'} este pedido?</p>
            <button className="botonConfirmarAccion" onClick={handleConfirmarAccion}>Sí</button>
            <button className="botonCancelarAccion" onClick={() => setShowModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedidos;
