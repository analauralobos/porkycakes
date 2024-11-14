import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../services/ProductoService";
import { useNavigate } from "react-router-dom";
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response || []);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/detail-product/${id}`);
  };

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  return (
    <div className="product-list-container">
      <div className="header">
        <label>
          <input className="input"></input>
        </label>        
        <button className="add-product-button">Agregar Producto</button>
      </div>

      
      {products.length === 0 ? (
        <p className="no-products-message">No hay productos disponibles.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Porciones</th>
              <th>Categoría</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id_Producto}>
                <td>{product.Nombre_Producto}</td>
                <td>{product.precio_vta} $</td>
                <td>{product.cant_porciones}</td>
                <td>{product.p_categoria}</td>
                <td>
                  <button
                    className="action-button edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit-product/${product.id_Producto}`);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="action-button delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Eliminar producto ${product.Nombre_Producto}`);
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
