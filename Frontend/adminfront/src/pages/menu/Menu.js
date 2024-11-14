import React, { useState } from 'react';
import { getProductsByCategory } from '../../services/ProductoService';
import Card from 'react-bootstrap/Card';
import './Menu.css';

const Menu = () => {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('');

  const categorias = ['Torta', 'Galletitas', 'Alfajores', 'Tartas', 'Sin T.A.C.C', 'Vegano'];

  const handleCategoryClick = async (categoriaSeleccionada) => {
    setCategoria(categoriaSeleccionada);
    setProductos([]);  

    try {
      const data = await getProductsByCategory(categoriaSeleccionada);
      
      // Verificar si hay productos para mostrar
      if (data.length === 0) {
        setProductos([]);  // Si no hay productos, no se muestran
      } else {
        const productosConImagenes = data.map((producto) => ({
          ...producto,
          imagen: producto.imagen
            ? `data:image/png;base64,${btoa(
                new Uint8Array(producto.imagen).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ''
                )
              )}` 
            : null,
        }));
        setProductos(productosConImagenes);
      }
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Productos por categoría</h2>

      {/* Fila de botones de categorías */}
      <div className="btn-group mb-3" role="group">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`btn btn-${categoria === cat ? 'primary' : 'outline-primary'}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mostrar productos si existen */}
      <div className="row">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.id_producto} className="col-md-4 mb-4">
              <Card>
                {producto.imagen && (
                  <Card.Img
                    src={producto.imagen}
                    variant="top"
                    alt={producto.Nombre_Producto}
                    className="imagen"
                  />
                )}
                <Card.Body>
                  <Card.Text className="nombre">{producto.Nombre_Producto}</Card.Text>
                  <Card.Text className="descripcion">{producto.descripcion_producto}</Card.Text>
                  <Card.Text className="precio">Precio: ${producto.precio_vta}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No se encontraron productos para esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
