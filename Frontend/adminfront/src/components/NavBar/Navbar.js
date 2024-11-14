import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi"; 
import './Navbar.css';

const Navbar = ({ userRole, setUserRole }) => {
    const [menu, setMenu] = useState("inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para manejar el menú desplegable
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserRole(null);
    navigate('/'); // Redirige al Home después de hacer logout
  };

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem); // Cambiar el menú activo
    setIsMenuOpen(false); // Cerrar el menú en pantallas pequeñas después de hacer clic
  };

    return (
    <div className="navbar">      
      <Link to="/" className="logo">PorkyCakes</Link>      
      <button
        className="hamburger-menu"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <GiHamburgerMenu />
      </button>      
      <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
        <li
          onClick={() => handleMenuClick("inicio")}
          className={menu === "inicio" ? "active" : ""}
        >
          <Link to="/">Inicio</Link>
        </li>
        <li
          onClick={() => handleMenuClick("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          <Link to="/menu">Menú</Link>
        </li>
        <li
          onClick={() => handleMenuClick("contacto")}
          className={menu === "contacto" ? "active" : ""}
        >
          <Link to="/contacto">Contacto</Link>
        </li>
        {userRole === 'admin' && (
          <li
            onClick={() => handleMenuClick("paneladmin")}
            className={menu === "paneladmin" ? "active" : ""}
          >
            <Link to="/paneladmin">Panel Admin</Link>
          </li>
        )}
            </ul>
      
      <div className="navbar-right">        
        <GoSearch className="busqueda" />
        <div className="navbar-search-icon">
          <AiOutlineShoppingCart className="carrito" />
          <div className="dot"></div>
        </div>
        
        {userRole ? (
          <div className="user-options">
            <span className="navbar-text">{`Bienvenido, ${userRole}`}</span>
            <button onClick={handleLogout}>Salir</button>
          </div>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
