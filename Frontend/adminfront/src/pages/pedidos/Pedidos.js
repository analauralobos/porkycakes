import React, { useEffect, useState } from 'react';
import './Pedidos.css';
import { getPedidosByCliente, getNombreByCliente, getProductosByPedido, modificarEstadoPedido, eliminarPedido, getPedidos } from '../../services/PedidoService';
import { getNombreCli } from '../../services/ClienteService';

const Pedidos = () => {
  const [nombreCliente, setNombreCliente] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [actionToPerform, setActionToPerform] = useState(null); // Estado para almacenar la acción a realizar (cancelar o eliminar)
  const [pedidoId, setPedidoId] = useState(null); // Estado para almacenar el id del pedido que se va a cancelar/eliminar

  useEffect(() => {
    const fetchPedidos = async () => {
      const cliente = JSON.parse(localStorage.getItem("userinfo"));
      const idCliente = cliente?.id_persona;

      try {
        if (!idCliente) {
          console.error("No se encontró información del cliente.");
          return;
        }

        // Obtener todos los pedidos
        const todosLosPedidos = await getPedidos();
        const nombre = await getNombreCli(idCliente);
        setNombreCliente(nombre);

        // Verificar si el idCliente está en los pedidos
        const clienteEnPedidos = todosLosPedidos.some(pedido => pedido.id_Cliente === idCliente);

        if (!clienteEnPedidos) {
          console.log("El cliente no tiene pedidos.");
          setPedidos([]);  // Si el cliente no tiene pedidos, establecer arreglo vacío
          return;
        }

        // Si el cliente está en los pedidos, buscar los pedidos específicos
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
      case 2: return "En Producción";
      case 3: return "Terminado";
      case 4: return "Anulado";
      case 5: return "Entregado";
      default: return "";
    }
  };

  const getMedioPago = (tipoPago) => {
    switch (tipoPago) {
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

  const handleCloseModal = () => {
    setShowModal(false); // Cierra el modal
    setPedidoId(null);
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
                    <b style={{ color: 'black' }}>{getEstadoPedido(pedido.id_Estado)}</b>
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
                  Eliminar
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
        <>
          <div className="modal-overlay"></div>
          <div className="modal show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar acción</h5>
                </div>
                <div className="modal-body">
                  <p>¿Estás seguro de que deseas {actionToPerform === 'cancelar' ? 'cancelar' : 'eliminar'} este pedido?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-aceptarModal"
                    onClick={handleConfirmarAccion}
                  >
                    Aceptar
                  </button>
                  <button
                    type="button"
                    className="btn btn-cancelarModal"
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Pedidos;
