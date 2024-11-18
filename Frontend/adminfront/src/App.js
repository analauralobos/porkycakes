import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
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

import AgregarProducto from './components/Producto/AgregarProducto'

import Footer from './components/Footer/Footer';


function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <Router>
      <Navbar userRole={userRole} setUserRole={setUserRole} />
      <Routes>
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />

        <Route path="/menu/:categoria" element={<Menu />} />
        <Route path="/contacto" element={<Contacto/>} />
        <Route path="/carrito" element={<Carrito/>} />
        <Route path="/mispedidos" element={<Pedidos/>} />
        <Route path="/paneladmin" element={<PanelAdmin userRole={userRole} />} /> 
        <Route path="/" element={<Inicio/>} /> 
        <Route path="/edit-product/:id" element={<ProductDetail/>} /> 
        <Route path="/edit-mp/:id" element={<MateriaPrimaDetail/>} /> 
        <Route path="/add-MP" element={<MateriaPrimaForm/>} /> 
        <Route path="/add-product" element={<AgregarProducto/>} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
