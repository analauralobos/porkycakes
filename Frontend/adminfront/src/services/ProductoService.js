import axios from "axios";
const API_URL = "http://localhost:4567/porkys/productos";

// Obtener todos los productos
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

// Crear un nuevo producto
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/crear`, productData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
};

// Obtener un producto por id
export const getProductById = async (id, productData) => {
  try {
    const response = await axios.get(`${API_URL}/detalles/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error al ver el producto con ID ${id}:`, error);
    throw error;
  }
};

// Actualizar un producto existente
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/modificar/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el producto con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un producto
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/eliminar/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
    throw error;
  }
};

// Obtener productos por nombre de categoría
export const getProductsByCategory = async (nombreCategoria) => {
  const response = await axios.get(`${API_URL}/categoria/nombre/${nombreCategoria}`);
  return response.data;
};


