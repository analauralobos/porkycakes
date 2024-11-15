import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Añadido useNavigate
import { getProductsByCategory, getAllProducts } from '../../services/ProductoService';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FaSearch } from 'react-icons/fa';
import './Menu.css';

const Menu = () => {
  const [productos, setProductos] = useState([]);
  const { categoria } = useParams(); 
  const navigate = useNavigate(); 

  const categorias = ['Torta', 'Galletitas', 'Alfajores', 'Tartas', 'Sin T.A.C.C', 'Vegano'];

  // Función para obtener productos por categoría
  const fetchProductsByCategory = async (categoriaSeleccionada) => {
    setProductos([]);
    try {
      const data = await getProductsByCategory(categoriaSeleccionada);
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
      console.error("Error al cargar los productos:", error);
    }
  };

  // Función para obtener todos los productos
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

  // Función para manejar el clic en una categoría
  const handleCategoryClick = (categoriaSeleccionada) => {
    navigate(`/menu/${categoriaSeleccionada}`); // Cambia la URL para reflejar la categoría seleccionada
  };

  useEffect(() => {
    if (!categorias.includes(categoria) && categoria !== 'Todos') {
      navigate('/menu/Todos');
    } else if (categoria === 'Todos') {
      fetchAllProducts();
    } else {
      fetchProductsByCategory(categoria);
    }
  }, [categoria]);
  

  return (
    <div>
      {/* Fila de botones de categorías y formulario */}
      <div className="d-flex justify-content-between mb-3">
        <div className="btn-group grupo-botones">
          <button
            className={`${categoria === 'Todos' ? "boton-activo" : "boton-inactivo"}`}
            onClick={() => handleCategoryClick('Todos')}
          >
            Todos
          </button>
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`${categoria === cat ? "boton-activo" : "boton-inactivo"}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Formulario de búsqueda a la derecha de los botones */}
        <Form inline className="d-flex form-style">
          <Form.Control
            type="text"
            placeholder="Buscar producto..."
            className="mr-2 form-style"
          />
          <button className="btn boton-activo-form" type="submit">
            <FaSearch />
          </button>
        </Form>
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
            <img className="espera" src="../recursos/porkycakes_logo.png" alt="" />
            <p>Cargando...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
