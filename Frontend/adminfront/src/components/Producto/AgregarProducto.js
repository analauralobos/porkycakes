import React, { useState, useRef } from "react";
import { createProduct } from "../../services/ProductoService";
import { useNavigate } from "react-router-dom";
import './AgregarProducto.css';

const AgregarProducto = () => {
  const [formData, setformData] = useState({ nombre: '', precio: '', cantPorciones: '', descripcion: '', categoria: '', imagen: '' });
  const [previewImage, setPreviewImage] = useState(null); // Estado para la vista previa
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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
    formDataToSend.append("p_categoria", parseInt(formData.categoria));

    if (formData.imagen) {
      formDataToSend.append("imagen", formData.imagen);
    }

    try {
      const response = await createProduct(formDataToSend);
      console.log("Producto creado:", response);
      alert("Producto creado exitosamente");
      setformData({ nombre: '', precio: '', cantPorciones: '', descripcion: '', categoria: '', imagen: '' });
      setPreviewImage(null); // Limpiar vista previa
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Hubo un error al crear el producto");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setformData({ ...formData, imagen: file });
      setPreviewImage(URL.createObjectURL(file)); // Crear URL de vista previa
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className="mp-detail-container">
      <div className="sidebar">
        <button>Agregar Productos</button>
        <button
          className="button-cancelar"
          onClick={() => navigate("/paneladmin")}
        >
          Cancelar
        </button>
      </div>
      <div className="cards-container">
        <div className="card-p">
          <h2 className="h2AgrProd">Agregar Producto</h2>
          <form onSubmit={handleAgregarProducto} className="agregar-producto-form">
            <div className="form-row">
              <div className="form-field">
                <label>Nombre del Producto:</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setformData({ ...formData, nombre: e.target.value })}
                  required
                  className="form-control"
                />
              </div>
              {previewImage && (
                <div className="preview-container">
                  <img src={previewImage} alt="Vista previa" className="preview-image" />
                </div>
              )}
            </div>
            <div>
              <label>Precio de Venta:</label>
              <input
                type="number"
                min={0}
                value={formData.precio}
                onChange={(e) => setformData({ ...formData, precio: e.target.value })}
                required
                className="form-control"
              />
            </div>
            <div>
              <label>Cantidad de Porciones:</label>
              <input
                type="number"
                min={0}
                value={formData.cantPorciones}
                onChange={(e) => setformData({ ...formData, cantPorciones: e.target.value })}
                required
                className="form-control"
              />
            </div>
            <div>
              <label>Descripción:</label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setformData({ ...formData, descripcion: e.target.value })}
                required
                className="form-control"
              />
            </div>
            <div>
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
            <div>
              <label>Imagen:</label>
              <input
                type="file"
                required
                onChange={handleFileChange}
                className="form-control"
                ref={fileInputRef}
              />
            </div>
            <button type="submit" className="save-button">Guardar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgregarProducto;
