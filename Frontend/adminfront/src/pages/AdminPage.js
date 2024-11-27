import React from 'react';

function AdminPage({ onLogout }) {
    return (
        <div>
            <h1>Panel de Administración</h1>
            <button onClick={onLogout}>Cerrar Sesión</button>
        </div>
    );
}

export default AdminPage; 

