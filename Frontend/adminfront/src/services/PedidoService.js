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
    console.error(`Error al obtener los pedidos para el cliente ${idCliente}:`, error);
    throw error;
  }
};

// Obtener el nombre del cliente por id_Cliente
export const getNombreByCliente = async (idCliente) => {
  try {
    const response = await axios.get(`${API_URL}/nombreCliente/${idCliente}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el nombre del cliente con id ${idCliente}:`, error);
    throw error;
  }
};

// Obtener productos por id_Pedido
export const getProductosByPedido = async (idPedido) => {
  try {
    const response = await axios.get(`${API_URL}/productos/${idPedido}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener los productos para el pedido ${idPedido}:`, error);
    throw error;
  }
};
