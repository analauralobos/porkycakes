import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { BsBox2HeartFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import Login from '../login/Login';
import './Navbar.css';
import { getNombreCli } from '../../services/ClienteService';
import { getNombreAdmin } from '../../services/AdminService';

const Navbar = ({ userRole, setUserRole, cat }) => {
  const [nombreCliente, setNombreCliente] = useState('');
  const [menu, setMenu] = useState("inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Cambia el estado del menú según la ruta
  useEffect(() => {
    if (location.pathname.startsWith('/menu')) {
      setMenu('menu');
    } else if (location.pathname === '/') {
      setMenu('inicio');
    } else if (location.pathname === '/contacto') {
      setMenu('contacto');
    } else if (location.pathname === '/paneladmin') {
      setMenu('paneladmin');
    } else {
      setMenu('');
    }
  }, [location.pathname]);

  const isActiveRoute = (route) => location.pathname === route;

  useEffect(() => {
    if(userRole === "cliente"){
    const fetchNombreCliente = async () => {
      const cliente = JSON.parse(localStorage.getItem("userinfo"));
      const idCliente = cliente?.id_persona;
      try {
        const nombre = await getNombreCli(idCliente);
        setNombreCliente(nombre);
      } catch (err) {
        console.log("Error al cargar nombre del cliente: " + err);
      }
    }
    fetchNombreCliente();
  } else if(userRole === "admin"){
    const fetchNombreAdmin = async () => {
      const admin = JSON.parse(localStorage.getItem("userinfo"));
      const idAdmin = admin?.id_persona;
      try {
        const nombre = await getNombreAdmin(idAdmin);
        setNombreCliente(nombre);
      } catch (err) {
        console.log("Error al cargar nombre del cliente: " + err);
      }
    }
    fetchNombreAdmin();
  }
  }, [userRole])


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
          <Link to={`/menu/${cat}`}>Menú</Link>
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
        {userRole === 'cliente' && (
          <>
            <Link to="/mispedidos">
              <BsBox2HeartFill
                size={25}
                className={`mispedidos ${isActiveRoute('/mispedidos') ? 'active' : ''}`}
              />
            </Link>
            <div className="navbar-search-icon">
              <Link to="/carrito">
                <AiOutlineShoppingCart
                  size={30}
                  className={`carrito ${isActiveRoute('/carrito') ? 'active' : ''}`}
                />
              </Link>
            </div>
          </>
        )}
        {userRole ? (
          <div className="user-options">
            <span className="navbar-text">{`Bienvenid@, ${nombreCliente}`}</span>
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
