import axios from 'axios';

const BASE_URL = 'http://localhost:4567/porkys/proveedor';

// Obtener todos los proveedores
export const getProveedores = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los proveedores:', error);
    throw error;
  }
};

// Agregar un proveedor
export const addProveedor = async (proveedor) => {
  try {
    const response = await axios.post(`${BASE_URL}/crear`, proveedor);
    return response.data;
  } catch (error) {
    console.error('Error al agregar el proveedor:', error);
    throw error;
  }
};

// Actualizar un proveedor
export const updateProveedor = async (id, proveedor) => {
    try {
      const response = await axios.post(`${BASE_URL}/modificar/${id}`, proveedor);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el proveedor:', error);
      throw error;
    }
  };
  
// Eliminar un proveedor
export const deleteProveedor = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/eliminar/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el proveedor:', error);
    throw error;
  }
};
