import axios from 'axios';

const API_URL = 'http://localhost:4567/porkys';

export const login = (credentials) => 
    axios.post(`${API_URL}/login/${credentials.email}/${credentials.password}`)
        .then(response => response.data) 
        .catch(error => {
            throw error.response ? error.response.data : new Error("Error en el servidor");
        });
