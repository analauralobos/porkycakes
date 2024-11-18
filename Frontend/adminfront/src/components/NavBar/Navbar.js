import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { BsBox2HeartFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import Login from '../login/Login';
import './Navbar.css';

const Navbar = ({ userRole, setUserRole, cat }) => {
  const [menu, setMenu] = useState("inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/menu')) {
      setMenu('menu');
    } else if (location.pathname === '/') {
      setMenu('inicio');
    } else if (location.pathname === '/contacto') {
      setMenu('contacto');
    } else if (location.pathname === '/paneladmin') {
      setMenu('paneladmin');
    }
  }, [location.pathname]);

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('id_persona');
    localStorage.removeItem('role');
    navigate('/');
  };

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  return (
    <div className="navbar-container">
      <Link to="/" className="logo">PorkyCakes</Link>
      <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <GiHamburgerMenu />
      </button>
      <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
        <li className={menu === "inicio" ? "active" : ""}>
          <Link to="/">Inicio</Link>
        </li>
        <li className={menu === "menu" ? "active" : ""}>
          <Link to={`/menu/${cat}`}>Menu</Link>
        </li>
        <li className={menu === "contacto" ? "active" : ""}>
          <Link to="/contacto">Contacto</Link>
        </li>
        {userRole === 'admin' && (
          <li className={menu === "paneladmin" ? "active" : ""}>
            <Link to="/paneladmin">Panel Admin</Link>
          </li>
        )}
      </ul>
      <div className="navbar-right">
        <BsBox2HeartFill size={25} />
        <div className="navbar-search-icon">
          <AiOutlineShoppingCart size={30} className="carrito" />
        </div>
        {userRole ? (
          <div className="user-options">
            <span className="navbar-text">{`Bienvenido, ${userRole}`}</span>
            <button onClick={handleLogout}>Salir</button>
          </div>
        ) : (
          <button onClick={openLoginModal}>Login</button>
        )}
      </div>

      {showLoginModal && <Login closeModal={closeLoginModal} setUserRole={setUserRole} />}
    </div>
  ); 
};

export default Navbar;
