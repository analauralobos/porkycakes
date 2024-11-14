import React, { useState, useEffect } from 'react';
import { getProductsByCategory, getAllProducts } from '../../services/ProductoService';
import Card from 'react-bootstrap/Card';
import './Menu.css';

const Menu = () => {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('Todos'); // Inicializar como 'Todos'

  const categorias = ['Torta', 'Galletitas', 'Alfajores', 'Tartas', 'Sin T.A.C.C', 'Vegano'];

  // Función para cargar todos los productos
  const fetchAllProducts = async () => {
    try {
      const data = await getAllProducts();
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
    } catch (error) {
      console.error("Error al cargar todos los productos:", error);
    }
  };

  const handleCategoryClick = async (categoriaSeleccionada) => {
    setCategoria(categoriaSeleccionada);
    setProductos([]);

    if (categoriaSeleccionada === 'Todos') {
      fetchAllProducts();
    } else {
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
    }
  };

  useEffect(() => {
    fetchAllProducts(); // Cargar todos los productos al inicio
  }, []);

  return (
    <div className="container mt-4">
      <h2>Productos por categoría</h2>

      {/* Fila de botones de categorías */}
      <div className="btn-group mb-3" role="group">
        <button
          className={`btn btn-${categoria === 'Todos' ? 'primary' : 'outline-primary'}`}
          onClick={() => handleCategoryClick('Todos')}
        >
          Todos
        </button>
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
            <img className='espera' src="./recursos/porkycakes_logo.png" alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
