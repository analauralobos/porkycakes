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
function App() {
  const [userRole, setUserRole] = useState(null); 

  return (
    <Router>
      <Navbar userRole={userRole} setUserRole={setUserRole} />
           
      <Routes>
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/contacto" element={<Contacto/>} />
        <Route path="/carrito" element={<Carrito/>} />
        <Route path="/mispedidos" element={<Pedidos/>} />
        <Route path="/paneladmin" element={<PanelAdmin userRole={userRole} />} /> 
        <Route path="/" element={<Inicio/>} /> 
        <Route path="/edit-product/:id" element={<ProductDetail/>} /> 
        <Route path="/edit-mp/:id" element={<MateriaPrimaDetail/>} /> 
        <Route path="/add-MP" element={<MateriaPrimaForm/>} /> 
      </Routes>
    </Router>
  );
}


export default App;

/* <Route path="/" element={<Home userRole={userRole} />} />  */


/*import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import Login from "./components/login/Login";
import Productos from "./pages/ProductoPage";
import AdminHomePage from "./pages/AdminHomePage";
import ProductForm from "./components/productos/ProductForm";
import DetailProduct from "./components/productos/ProductDetail"
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLoginSuccess = () => setIsAuthenticated(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/admin" />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <AdminHomePage onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/productos"
          element={
            isAuthenticated ? (
              <Productos onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/form-product"
          element={isAuthenticated ? <ProductForm /> : <Navigate to="/" />}
        />
        <Route
          path="/detail-product/:id"
          element={isAuthenticated ? <DetailProduct /> : <Navigate to="/productos" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
*/