import axios from "axios";
const API_URL = "http://localhost:4567/porkys/ingredientes";

// Obtener todos los ingredientes
export const getAllIngredients = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los ingredientes:", error);
    throw error;
  }
};

// Crear un nuevo ingrediente
export const createIngredient = async (ingredientData) => {
  try {
    const response = await axios.post(`${API_URL}/crear`, ingredientData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el ingrediente:", error);
    throw error;
  }
};

// Obtener un ingrediente por id
export const getIngredientById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/detalles/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al ver el ingrediente con ID ${id}:`, error);
    throw error;
  }
};

// Actualizar un ingrediente existente
export const updateIngredient = async (id, ingredientData) => {
  try {
    const response = await axios.put(
      `${API_URL}/modificar/${id}`,
      ingredientData
    );
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el ingrediente con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un ingrediente
export const deleteIngredient = async (idMateriaPrima, idProducto) => {
  try {
    const response = await axios.delete(
      `http://localhost:4567/porkys/ingredientes/eliminar/${idMateriaPrima}/${idProducto}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el ingrediente:", error);
    throw error;
  }
};
