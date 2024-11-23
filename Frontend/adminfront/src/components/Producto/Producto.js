import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../services/ProductoService';
import Card from 'react-bootstrap/Card'
import { agregarAlCarrito, eliminarDelCarrito } from '../carrito/CarritoFunciones';
import ModalCarrito from '../../components/carrito/ModalCarrito';
import './Productos.css'
import logopig from '../../assets/img/logopig.png'

const Producto = ({ userRole }) => {
  const [productos, setProductos] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [mensajeToast, setMensajeToast] = useState('');


  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getAllProducts();
        const productosConImagenes = data.map(producto => ({
          ...producto,
          imagen: producto.imagen ? `data:image/png;base64,${btoa(
            new Uint8Array(producto.imagen).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          )}` : null
        }));
        setProductos(productosConImagenes);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProductos();
  }, []);


  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito(producto);
    setMensajeToast(`${producto.Nombre_Producto} agregado al carrito`);
    setShowToast(true);
  };

  const handleEliminarDelCarrito = (idProducto, producto) => {
    eliminarDelCarrito(idProducto);
    setMensajeToast(`${producto.Nombre_Producto} eliminado del carrito`);
    setShowToast(true);
  };

  return (
    <div>
      <div className="container mt-4">
        <div className='displayTituloyLogo'>
        <h2 className="Producto">Los más comprados</h2>
        <img src={logopig} alt="logopig" className="logopig" />
        </div>
        <div className="row">
          {productos.map((producto) => (
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
                  {userRole === 'cliente' && (
                    <div>
                      <button
                        className="boton-activo"
                        onClick={() => handleAgregarAlCarrito(producto)}
                      >
                        +
                      </button>
                      <button
                        className="boton-activo"
                        onClick={() => handleEliminarDelCarrito(producto.id_Producto, producto)}
                      >
                        -
                      </button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <ModalCarrito
        show={showToast}
        toggleShow={() => setShowToast(false)}
        mensaje={mensajeToast}
      />
      </div>
  );
};

export default Producto;
