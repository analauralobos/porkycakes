import React, { useState } from "react";
import { createProduct } from "../../services/ProductoService"; // Asegúrate de importar el servicio

const AgregarProducto = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantPorciones, setCantPorciones] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState(null); // Imagen en formato de archivo

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Crear un objeto FormData
    const formData = new FormData();
    formData.append("Nombre_Producto", nombre);
    formData.append("precio_vta", parseFloat(precio));
    formData.append("cant_porciones", parseInt(cantPorciones));
    formData.append("descripcion_producto", descripcion);
    formData.append("p_categoria", categoria);
    formData.append("imagen", imagen);
    
    try {
      // Enviar la solicitud con FormData
      const response = await createProduct(formData);
      console.log("Producto creado:", response);
      alert("Producto creado exitosamente");
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Hubo un error al crear el producto");
    }
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Producto:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio de Venta:</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cantidad de Porciones:</label>
          <input
            type="number"
            value={cantPorciones}
            onChange={(e) => setCantPorciones(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Categoría:</label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="file"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </div>
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AgregarProducto;
