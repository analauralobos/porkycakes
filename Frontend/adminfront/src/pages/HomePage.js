import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Inicio from "./inicio/Inicio";

function HomePage() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login"); 
  };

  return (
    <div className='container'>
      <Inicio/>
    </div>
    /*
    <div className="container text-center">
      <h1>Bienvenido a Porky Cakes</h1>
      <button className="btn btn-primary" onClick={handleLoginRedirect}>
        Iniciar Sesión
      </button>
    </div>
    */
  );
}

export default HomePage;
