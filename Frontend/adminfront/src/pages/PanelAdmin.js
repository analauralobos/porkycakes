import React, { useState } from "react";
import "./PanelAdmin.css";
import ProductList from "../components/Producto/ProductList";
import MateriaPrimaList from "../components/materiaprima/MateriaPrimaList";
import Receta from "../components/receta/Receta";
import Pedido from "../components/pedidos/PedidoList"
import ProveedorList from "../components/proveedores/ProveedorList";
import CompraMP from "../components/compra/CompraMP"
import Cocinar from "../components/cocina/Cocinar";
import { LuCakeSlice } from "react-icons/lu";
import { GiFlour } from "react-icons/gi";
import { FaBook } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import { FaPerson } from "react-icons/fa6";
import { FaShoppingBasket } from "react-icons/fa";
import { GiCook } from "react-icons/gi";

const PanelAdmin = () => {
  const [selectedSection, setSelectedSection] = useState("Productos");

  const renderContent = () => {
    switch (selectedSection) {
      case "Productos":
        return (
          <div>
            <ProductList />
          </div>
        );
      case "Stock":
        return (
          <div>
            <MateriaPrimaList />
          </div>
        );
      case "Recetas":
        return (
          <div>
            <Receta />
          </div>
        );
      case "Pedidos":
        return <div><Pedido/></div>;
      case "Proveedores":
        return <div><ProveedorList/></div>;
      case "Compra":
        return <div><CompraMP/></div>;
      case "Cocinar":
          return <div><Cocinar/></div>;
      default:
        return <div>Seleccione una opción del menú</div>;
    }
  };

  return (
    <div className="admin-panel">
      {/* Menú lateral */}
      <div className="admin-menu">
        <button
          className={`menu-item ${
            selectedSection === "Productos" ? "active" : ""
          }`}
          onClick={() => setSelectedSection("Productos")}
        >
        <LuCakeSlice /> Productos
        </button>
        <button
          className={`menu-item ${selectedSection === "Stock" ? "active" : ""}`}
          onClick={() => setSelectedSection("Stock")}
        >
          <GiFlour /> Stock
        </button>
        <button
          className={`menu-item ${
            selectedSection === "Recetas" ? "active" : ""
          }`}
          onClick={() => setSelectedSection("Recetas")}
        >
          <FaBook /> Recetas
        </button>
        <button
          className={`menu-item ${
            selectedSection === "Pedidos" ? "active" : ""
          }`}
          onClick={() => setSelectedSection("Pedidos")}
        >
          <IoMdHeart /> Pedidos
        </button>

        <button
          className={`menu-item ${
            selectedSection === "Proveedores" ? "active" : ""
          }`}
          onClick={() => setSelectedSection("Proveedores")}
        >
          <FaPerson /> Proveedores
        </button>

        <button
          className={`menu-item ${
            selectedSection === "Compra" ? "active" : ""
          }`}
          onClick={() => setSelectedSection("Compra")}
        >
          <FaShoppingBasket /> Compra Materia Prima
        </button>
        <button
          className={`menu-item ${
            selectedSection === "Cocinar" ? "active" : ""
          }`}
          onClick={() => setSelectedSection("Cocinar")}
        >
          <GiCook /> Cocinar
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className="admin-content">{renderContent()}</div>
    </div>
  );
};

export default PanelAdmin;
