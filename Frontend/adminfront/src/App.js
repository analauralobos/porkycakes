import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Navbar from './components/NavBar/Navbar';
import PanelAdmin from './pages/PanelAdmin';
import Inicio from './pages/inicio/Inicio';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetail from './components/Producto/ProductDetail';
import Menu from './pages/menu/Menu';
import Carrito from './pages/carrito/Carrito';
import Contacto from './pages/contacto/Contacto';
import Pedidos from './pages/pedidos/Pedidos';

import MateriaPrimaDetail from './components/materiaprima/MateriaPrimaDetail';
import MateriaPrimaForm from './components/materiaprima/MateriaPrimaForm';
import RecetaForm from './components/receta/RecetaForm';
import RecetaDetail from './components/receta/RecetaDetail';


import AgregarProducto from './components/Producto/AgregarProducto'

import Footer from './components/Footer/Footer';


function App() {
  const [userRole, setUserRole] = useState(null);
  const [idPersona, setIdPersona] = useState(localStorage.getItem('id_persona'));  // Leer el id_persona desde localStorage

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setUserRole(storedRole);  // Establecer el rol desde localStorage
    }
  }, []);

  return (
    <Router>
      <Navbar userRole={userRole} setUserRole={setUserRole} />
      <Routes>
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />

        <Route path="/menu/:categoria" element={<Menu userRole={userRole} />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/mispedidos" element={<Pedidos />} />
        <Route path="/paneladmin" element={<PanelAdmin userRole={userRole} />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/edit-product/:id" element={<ProductDetail />} />
        <Route path="/edit-mp/:id" element={<MateriaPrimaDetail />} />
        <Route path="/add-MP" element={<MateriaPrimaForm />} />
        <Route path="/add-receta" element={<RecetaForm />} />
        <Route path="/edit-receta/:id" element={<RecetaDetail />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
