import axios from "axios";
const API_URL = "http://localhost:4567/porkys/pxp";

// Crear un nuevo producto x pedido
export const createProductoxPedido = async (pxpData) => {
  try {
    const response = await axios.post(`${API_URL}/crearPxP`, pxpData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el PxP:", error);
    throw error;
  }
};

// Obtener productos por id_pedido
export const getProductosXPedidoPorId = async (idPedido) => {
  try {
    const response = await axios.get(`${API_URL}/getPxP/${idPedido}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos por pedido:", error);
    throw error;
  }
};
