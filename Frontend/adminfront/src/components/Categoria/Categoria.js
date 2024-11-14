import React, { useState, useEffect } from 'react';
import './Categoria.css';
import { getAllCategorias } from '../../services/CateogriaService';

const Categoria = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getAllCategorias();
        const categoriasConImagenes = data.map(categoria => ({
          ...categoria,
          imagen: categoria.imagen ? `data:image/png;base64,${btoa(
            new Uint8Array(categoria.imagen).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          )}` : null
        }));
        setCategorias(categoriasConImagenes);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleCategoriaClick = (categoria) => {
    // ACCION AL CLICKEAR CATEGORIA -> IR A MENU CON BUSQUEDA EN ESA CATEGORIA
  };

  return (
    <div className="c-menu">
      <h2 className='titulo'>Categorías</h2>
      <div className="categorias-container">
        {categorias.map(categoria => (
          <div
            key={categoria.id_categoria}
            className="categoria-item"
            onClick={() => handleCategoriaClick(categoria)}
          >
            {categoria.imagen && (
              <img src={categoria.imagen} alt={categoria.nombre} className="categoria-imagen" />
            )}
            <p className="categoria-nombre">{categoria.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categoria;
