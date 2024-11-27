import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createPasoReceta,
  getAllPasosReceta,
} from "../../services/RecetaService";
import { getAllProducts } from "../../services/ProductoService";
import "./Receta.css";

const RecetaForm = () => {
  const [productosSinReceta, setProductosSinReceta] = useState([]);
  const [id_producto, setIdProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [paso_nro, setPasoNro] = useState("");

  const navigate = useNavigate();

  // Cargar productos sin recetas al montar el componente
  useEffect(() => {
    const fetchProductosSinReceta = async () => {
      try {
        const productosData = await getAllProducts();
        const pasosRecetasData = await getAllPasosReceta();

        // Filtrar productos sin recetas
        const productosConRecetas = pasosRecetasData.map(
          (paso) => paso.id_Producto
        );
        const productosSinReceta = productosData.filter(
          (producto) => !productosConRecetas.includes(producto.id_Producto)
        );

        setProductosSinReceta(productosSinReceta);
      } catch (error) {
        console.error("Error al cargar los productos sin receta: ", error);
      }
    };

    fetchProductosSinReceta();
  }, []);

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoPasoReceta = {
      id_Producto: parseInt(id_producto, 10),
      descripcion,
      paso_nro: parseInt(paso_nro, 10),
    };

    try {
      await createPasoReceta(nuevoPasoReceta);
      alert("Paso de receta agregado con éxito.");
      navigate("/paneladmin");
    } catch (error) {
      console.error("Error al agregar el paso de receta: ", error);
      alert("Error al agregar el paso de receta, por favor intenta nuevamente.");
    }
  };

  return (
    <div className="r-detail-container">     
      <div className="sidebar">
        <button>Agregar Receta</button>
        <button
          className="button-cancelar"
          onClick={() => navigate("/paneladmin")}
        >
          Cancelar
        </button>
      </div>
    <div className="cards-container">
    <div className="card-p">
      <h3>Agregar Paso de Receta</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Producto (sin receta):</label>
          <select
            value={id_producto}
            onChange={(e) => setIdProducto(e.target.value)}
            required
          >
            <option value="">Seleccione un producto</option>
            {productosSinReceta.map((producto) => (
              <option key={producto.id_Producto} value={producto.id_Producto}>
                {producto.Nombre_Producto}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Descripción del Paso:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Número del Paso:</label>
          <input
            type="number"
            value={paso_nro}
            onChange={(e) => setPasoNro(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="agregar-paso">
          Guardar
        </button>       
      </form>
    </div>
    </div>
    </div>
  );
};

export default RecetaForm;
