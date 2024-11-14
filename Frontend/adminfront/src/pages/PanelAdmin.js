import React, { useState } from 'react';
import './PanelAdmin.css';
import ProductList from '../components/Producto/ProductList'
const PanelAdmin = () => {
  const [selectedSection, setSelectedSection] = useState('Productos');

  const renderContent = () => {
    switch (selectedSection) {
      case 'Productos':
        return <div><ProductList/></div>;
      case 'Stock':
        return <div>Gestión de stock</div>;
      case 'Recetas':
        return <div>Gestión de recetas</div>;
      case 'Pedidos':
        return <div>Gestión de pedidos</div>;
      default:
        return <div>Seleccione una opción del menú</div>;
    }
  };

  return (
    <div className="admin-panel d-flex">
      {/* Menú lateral */}
      <div className="admin-menu">
        <button
          className={`menu-item ${selectedSection === 'Productos' ? 'active' : ''}`}
          onClick={() => setSelectedSection('Productos')}
        >
          Productos
        </button>
        <button
          className={`menu-item ${selectedSection === 'Stock' ? 'active' : ''}`}
          onClick={() => setSelectedSection('Stock')}
        >
          Stock
        </button>
        <button
          className={`menu-item ${selectedSection === 'Recetas' ? 'active' : ''}`}
          onClick={() => setSelectedSection('Recetas')}
        >
          Recetas
        </button>
        <button
          className={`menu-item ${selectedSection === 'Pedidos' ? 'active' : ''}`}
          onClick={() => setSelectedSection('Pedidos')}
        >
          Pedidos
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default PanelAdmin;
