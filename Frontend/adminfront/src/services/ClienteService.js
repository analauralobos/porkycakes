import axios from 'axios';

const API_URL = 'http://localhost:4567/porkys/clientes';

export const getAllClientes = () => axios.get(`${API_URL}/todos`);
export const createCliente = (clienteData) => axios.post(`${API_URL}/crear`, clienteData);
export const getIsCliente = (email, pass) => axios.get(`${API_URL}/${email}/${pass}`);
export const loginCLiente = (credentials) =>
    axios.post(`${API_URL}/login`, credentials)
        .then(response => response.data)
        .catch(error => {
            throw error.response ? error.response.data : new Error("Error en el servidor");
        });

        /*
export const obtenerNombreCliente = async (idCliente) => {
  const response = await axios.get(`${API_URL}/nombreCliente/${idCliente}`);
  return response.data;
};
*/
export const getNombreCli = (idCliente) => axios.get(`${API_URL}/nombreCliente/${idCliente}`);
