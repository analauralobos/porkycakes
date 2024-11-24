import React, { useEffect, useState } from "react";
import {
  getPedidos,
  getEstados,
  getClientes,
  getTipoPago,
  updatePedido,
  getProductosByPedido,
} from "../../services/PedidoService";
import "./Pedido.css";

const PedidoList = () => {
  const [pedidos, setPedidos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [tiposPago, setTiposPago] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [noProductos, setNoProductos] = useState(false);

  // transiciones permitidas
  const transicionesPermitidas = {
    1: [2, 4], // Pendiente: En Producción, Anulado
    2: [3, 4], // En Producción: Terminado, Anulado
    3: [5], // Terminado: Entregado
    4: [], // Anulado: Sin cambios permitidos
    5: [], // Entregado: Sin cambios permitidos
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pedidoData, estadoData, clienteData, tipoPagoData] =
          await Promise.all([
            getPedidos(),
            getEstados(),
            getClientes(),
            getTipoPago(),
          ]);

        const enrichedPedidos = pedidoData.map((pedido) => ({
          ...pedido,
          cliente: clienteData.find(
            (cliente) => cliente.id_Cliente === pedido.id_Cliente
          ),
          estado: estadoData.find(
            (estado) => estado.id_Estado === pedido.id_Estado
          ),
          tipoPago: tipoPagoData.find(
            (tp) => tp.id_TipoPago === pedido.id_TipoPago
          ),
        }));

        setPedidos(enrichedPedidos);
        setEstados(estadoData);
        setClientes(clienteData);
        setTiposPago(tipoPagoData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangeEstado = async (idPedido, newEstadoId) => {
    try {
      const pedido = pedidos.find((p) => p.id_Pedido === idPedido);
      // Validar transición permitida
      const estadoActualId = pedido.estado?.id_Estado;
      if (
        !transicionesPermitidas[estadoActualId]?.includes(
          parseInt(newEstadoId, 10)
        )
      ) {
        alert("La transición de estado no está permitida.");
        return;
      }

      const updatedPedido = {
        ...pedido,
        id_Estado: parseInt(newEstadoId, 10),
      };

      await updatePedido(updatedPedido);

      setPedidos((prevPedidos) =>
        prevPedidos.map((p) =>
          p.id_Pedido === idPedido
            ? {
                ...p,
                estado: estados.find(
                  (e) => e.id_Estado === updatedPedido.id_Estado
                ),
              }
            : p
        )
      );
      alert("Estado actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      alert("No se pudo actualizar el estado.");
    }
  };

  // Función para mostrar los productos del pedido
  const handleShowProductos = async (idPedido) => {
    console.log("Llamando a handleShowProductos con idPedido:", idPedido);  // Log para ver si se llama correctamente
    try {
      const productosData = await getProductosByPedido(idPedido);
      console.log("Productos obtenidos para el pedido:", productosData);  // Log para ver los productos

      if (productosData.length === 0) {
        console.log("No se encontraron productos para el pedido");  // Log para no productos
        setNoProductos(true); // No hay productos
      } else {
        console.log("Productos cargados correctamente");  // Log para productos cargados
        setProductos(productosData); // Hay productos
        setNoProductos(false);
      }

      setPedidoSeleccionado(idPedido);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setNoProductos(true); // Manejo de error si la llamada falla
    }
  };

  if (loading) return <p>Cargando pedidos...</p>;

  return (
    <div className="pedido-list-container">
      <table className="pedido-table">
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>Cliente</th>
            <th>Fecha Pedido</th>
            <th>Fecha Entrega</th>
            <th>Lugar Entrega</th>
            <th>Estado</th>
            <th>Tipo de Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id_Pedido}>
              <td>{pedido.id_Pedido}</td>
              <td>{pedido.cliente?.Nombre_Cliente || "Desconocido"}</td>
              <td>{pedido.fecha_pedido}</td>
              <td>{pedido.fecha_entrega}</td>
              <td>{pedido.lugar_entrega}</td>
              <td>
                <select
                  value={pedido.estado?.id_Estado || ""}
                  onChange={(e) =>
                    handleChangeEstado(pedido.id_Pedido, e.target.value)
                  }
                >
                  {estados.map((estado) => (
                    <option key={estado.id_Estado} value={estado.id_Estado}>
                      {estado.descripcion_Estado}
                    </option>
                  ))}
                </select>
              </td>
              <td>{pedido.tipoPago?.descripcion_TP || "Desconocido"}</td>
              <td>
                <button
                  className="button"
                  onClick={() => handleShowProductos(pedido.id_Pedido)}
                >
                  Ver productos
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de productos */}
      {pedidoSeleccionado && (
        <div className="modal">
          <div className="modal-content">
            <h2>Productos del Pedido {pedidoSeleccionado}</h2>
            {noProductos ? (
              <p>No hay productos en este pedido.</p>
            ) : (
              <ul>
                {productos.map((producto, index) => (
                  <li key={index}>
                    {producto.Nombre_Producto} - Cantidad:{" "}
                    {producto.cantidad_pedido}
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => setPedidoSeleccionado(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PedidoList;
