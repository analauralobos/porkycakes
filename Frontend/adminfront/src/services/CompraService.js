import axios from 'axios';

const API_BASE = 'http://localhost:4567/porkys';

// Obtener todas las compras
export const getCompras = async () => {
  const response = await axios.get(`${API_BASE}/compras/todas`);
  return response.data;
};

// Crear una nueva compra
export const crearCompra = async (compra) => {
  const response = await axios.post(`${API_BASE}/compras/crear`, compra);
  return response.data;
};

// Obtener todas las materias primas
export const getMateriasPrimas = async () => {
  const response = await axios.get(`${API_BASE}/matprima/todas`);
  return response.data;
};

// Obtener todos los proveedores
export const getProveedores = async () => {
  const response = await axios.get(`${API_BASE}/proveedor/todos`);
  return response.data;
};

export const actualizarMateriaPrima = async (id, matPrimaData) => {
  try {
    const response = await axios.put(`${API_BASE}/matprima/modificar/${id}`, matPrimaData);
    // Validar que la respuesta tiene los datos esperados
    if (response.data && response.data.id_MateriaPrima === id) {
      return response.data; // Devuelve los datos actualizados
    } else {
      throw new Error("Datos no válidos en la respuesta del backend.");
    }
  } catch (error) {
    console.error(`Error al actualizar la materia prima con ID ${id}:`, error);
    throw error;
  }
};

