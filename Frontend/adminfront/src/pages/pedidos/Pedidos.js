import React, { useEffect, useState } from 'react';
import './Pedidos.css';
import { getPedidosByCliente, getNombreByCliente, getProductosByPedido } from '../../services/PedidoService';

const Pedidos = () => {
  const [nombreCliente, setNombreCliente] = useState('');
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        // Obtener el ID del cliente desde el localStorage
        const cliente = JSON.parse(localStorage.getItem("userinfo"));
        const idCliente = cliente?.id_persona;

        if (!idCliente) {
          console.error("No se encontró información del cliente.");
          return;
        }

        // Obtener el nombre del cliente
        const nombre = await getNombreByCliente(idCliente);
        setNombreCliente(nombre);

        // Obtener los pedidos del cliente
        const pedidosData = await getPedidosByCliente(idCliente);

        // Mapear cada pedido para incluir los productos relacionados
        const pedidosConDetalles = await Promise.all(
          pedidosData.map(async (pedido) => {
            const productos = await getProductosByPedido(pedido.id_Pedido);
            return { ...pedido, productos };
          })
        );

        setPedidos(pedidosConDetalles);
        console.log(pedidosConDetalles);
      } catch (error) {
        console.error("Error al cargar los pedidos: ", error);
      }
    };

    fetchPedidos();
  }, []);

  const getEstadoPedido = (estado) => {
    switch (estado) {
      case 1:
        return "Pendiente";
      case 2:
        return "Produccion";
      case 3:
        return "Terminado";
      case 4:
        return "Anulado";
      case 5:
        return "Entregado";
      default:
        return "";
    }
  };

  const getMedioPago = (tipoPago) => {
    switch(tipoPago){
      case 1:
        return "Efectivo";
      case 2:
        return "Credito";
      case 3:
        return "Debito";
      case 4:
        return "Transferencia";
      case 5:
        return "Mercado Pago";
    }
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
                <p><strong>Estado del producto:</strong>
                  <span className={`pedido-status ${getEstadoPedido(pedido.id_Estado)}`}>
                    <b style={{color: 'black'}}>{getEstadoPedido(pedido.id_Estado)}</b>
                  </span>
                </p>
                <p className="PedidosTitulos"><strong>Medio de pago:</strong> {getMedioPago(pedido.id_TipoPago)}</p>
                <p><strong>Fecha de pedido:</strong> {pedido.fecha_pedido}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pedidos;
