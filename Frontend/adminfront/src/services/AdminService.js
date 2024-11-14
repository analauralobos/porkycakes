import axios from 'axios';

const API_URL = 'http://localhost:4567/porkys/administrador';

export const getAllAdmins = () => axios.get(`${API_URL}/todos`);
export const createAdmin = (adminData) => axios.post(`${API_URL}/crear`, adminData);
export const getIsAdmin = (email, pass) => axios.get(`${API_URL}/${email}/${pass}`);
export const loginAdmin = (credentials) => 
    axios.post(`${API_URL}/login`, credentials)
        .then(response => response.data) 
        .catch(error => {
            throw error.response ? error.response.data : new Error("Error en el servidor");
        });
