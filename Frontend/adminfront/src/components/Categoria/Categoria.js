import React, { useState, useEffect } from 'react';
import './Categoria.css';
import { getAllCategorias } from '../../services/CateogriaService';
import { useNavigate } from 'react-router-dom';

const Categoria = () => {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getAllCategorias();
        const categoriasConImagenes = data.map((categoria) => ({
          ...categoria,
          imagen: categoria.imagen
            ? `data:image/png;base64,${btoa(
                new Uint8Array(categoria.imagen).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ''
                )
              )}`
            : null,
        }));
        setCategorias(categoriasConImagenes);
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleCategoriaClick = (categoria) => {
    navigate(`/menu/${categoria.nombre}`);
  };

  return (
    <div className="c-menu container">
      <h2 className="menu-titulo">Descubre nuestras categorías</h2>
      <div className="categorias-container">
        {categorias.map((categoria) => (
          <div
            key={categoria.id_categoria}
            className="categoria-item"
            onClick={() => handleCategoriaClick(categoria)}
          >
            {categoria.imagen ? (
              <img
                src={categoria.imagen}
                alt={`Categoría ${categoria.nombre}`}
                className="categoria-imagen"
              />
            ) : (
              <div className="categoria-placeholder">📷</div>
            )}
            <p className="categoria-nombre">{categoria.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categoria;
