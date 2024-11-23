import React, { useState, useRef } from "react";
import { createProduct } from "../../services/ProductoService";
import './AgregarProducto.css';

const AgregarProducto = () => {
  const [formData, setformData] = useState({ nombre: '', precio: '', cantPorciones: '', descripcion: '', categoria: '', imagen: '' });
  const fileInputRef = useRef(null);  

  const categorias = [
    { id: 1, nombre: 'Torta' },
    { id: 2, nombre: 'Galletitas' },
    { id: 3, nombre: 'Alfajores' },
    { id: 4, nombre: 'Tartas' },
    { id: 5, nombre: 'Sin T.A.C.C' },
    { id: 6, nombre: 'Vegano' }
  ];

  const handleAgregarProducto = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("Nombre_Producto", formData.nombre);
    formDataToSend.append("precio_vta", parseFloat(formData.precio));
    formDataToSend.append("cant_porciones", parseInt(formData.cantPorciones));
    formDataToSend.append("descripcion_producto", formData.descripcion);
    formDataToSend.append("p_categoria", parseInt(formData.categoria));  // Se envía el ID de la categoría

    // Adjuntar archivo
    if (formData.imagen) {
      formDataToSend.append("imagen", formData.imagen);
    }

    try {
      const response = await createProduct(formDataToSend);
      console.log("Producto creado:", response);
      alert("Producto creado exitosamente");
      setformData({ nombre: '', precio: '', cantPorciones: '', descripcion: '', categoria: '', imagen: '' });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';  
      }

    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Hubo un error al crear el producto");
    }
  };

  return (
    <div className="agregar-producto-container">
      <h2>Agregar Producto</h2>
      <form onSubmit={handleAgregarProducto} className="agregar-producto-form">
        <div className="form-group">
          <label>Nombre del Producto:</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => setformData({ ...formData, nombre: e.target.value })}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Precio de Venta:</label>
          <input
            type="number"
            value={formData.precio}
            onChange={(e) => setformData({ ...formData, precio: e.target.value })}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Cantidad de Porciones:</label>
          <input
            type="number"
            value={formData.cantPorciones}
            onChange={(e) => setformData({ ...formData, cantPorciones: e.target.value })}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => setformData({ ...formData, descripcion: e.target.value })}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Categoría:</label>
          <select
            value={formData.categoria}
            onChange={(e) => setformData({ ...formData, categoria: e.target.value })}
            required
            className="form-control"
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Imagen:</label>
          <input
            type="file"
            onChange={(e) => setformData({ ...formData, imagen: e.target.files[0] })}
            className="form-control"
            ref={fileInputRef} 
          />
        </div>
        <button type="submit" className="submit-button">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AgregarProducto;
