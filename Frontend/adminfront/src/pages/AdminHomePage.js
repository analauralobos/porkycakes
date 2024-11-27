import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function AdminHomePage({ onLogout }) {
  return (
    <div>
      <Navbar onLogout={onLogout} />
      <div>
        <h3>Panel de Administración</h3>
        <p>Bienvenido a la administración de Porky Cakes</p>        
      </div>
      <Footer/>
    </div>
  );
}

export default AdminHomePage;
