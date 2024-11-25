import axios from "axios";

const API_URL = "http://localhost:4567/porkys/pedidos";

export const createPedido = async (pedidoData) => {
  try {
    const response = await axios.post(`${API_URL}/crear`, pedidoData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    throw error;
  }
};

// Obtener pedidos por id_Cliente
export const getPedidosByCliente = async (idCliente) => {
  try {
    const response = await axios.get(`${API_URL}/cliente/${idCliente}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener los pedidos para el cliente ${idCliente}:`,
      error
    );
    throw error;
  }
};

// Obtener el nombre del cliente por id_Cliente
export const getNombreByCliente = async (idCliente) => {
  try {
    const response = await axios.get(`${API_URL}/nombreCliente/${idCliente}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener el nombre del cliente con id ${idCliente}:`,
      error
    );
    throw error;
  }
};

// Obtener productos por id_Pedido
export const getProductosByPedido = async (idPedido) => {
  try {
    const response = await axios.get(
      `http://localhost:4567/porkys/pedidos/productos/${idPedido}`
    );
    return response.data; 
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return []; 
  }
};

export const getPedidos = async () => {
  const response = await fetch("http://localhost:4567/porkys/pedidos/todos");
  return response.json();
};

export const getEstados = async () => {
  const response = await fetch("http://localhost:4567/porkys/estados/todos");
  return response.json();
};

export const getClientes = async () => {
  const response = await fetch("http://localhost:4567/porkys/clientes/todos");
  return response.json();
};

export const getTipoPago = async () => {
  const response = await fetch("http://localhost:4567/porkys/tipopago/todos");
  return response.json();
};

export const updatePedido = async (pedido) => {
  const response = await fetch(
    `http://localhost:4567/porkys/pedidos/modificar/${pedido.id_Pedido}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    }
  );
  if (!response.ok) {
    throw new Error("Error al modificar el pedido");
  }
  return response.json();
};


export const modificarEstadoPedido = async (idPedido, idEstado) => {
  const response = await axios.post(`${API_URL}/modificarEstado/${idPedido}/${idEstado}`);
  return response.data;
};

export const eliminarPedido = async (id) => {
  const response = await axios.delete(`${API_URL}/eliminar/${id}`);
  return response.data;
};