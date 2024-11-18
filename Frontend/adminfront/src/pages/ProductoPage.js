import React from "react";
import { useNavigate } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductList from "../components/productos/ProductList";

function ProductoPage({ onLogout }) {
    const navigate = useNavigate(); 
    
    const handleAddProduct = () => {
        navigate('/form-product'); 
    };

    return (
        <div>
            <Navbar onLogout={onLogout} />
            <div>
                <ProductList />
            </div>
            <div>
                <button onClick={handleAddProduct}>Agregar Producto</button> 
                <button>Eliminar Producto</button>
               
            </div>
            <Footer />
        </div>
    );
}

export default ProductoPage;
;
