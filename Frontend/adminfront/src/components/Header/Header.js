import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import headerImg4 from '../../assets/img/header.png';
import headerImg5 from '../../assets/img/header55.png';
import headerImg6 from '../../assets/img/header66.png';

const Header = () => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false); // Ocultar "Cargando" cuando la imagen se haya cargado
  };

  return (
    <div id="headerCarousel" className="carousel slide h-header" data-bs-ride="carousel">
      {loading && (
        <div className="loading-indicator">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}
      
      <div className={`carousel-inner ${loading ? 'd-none' : ''}`}>
        {/* Imagen 1 */}
        <div className="carousel-item active">
          <img className="header-logo" src="./recursos/porkycakes_logo.png" alt="Logo" />
          <img
            src={headerImg4}
            className="d-block w-100 header-image"
            alt="Torta 1"
            onLoad={handleImageLoad} // Marcar la imagen como cargada
          />
          <div className="carousel-caption">
            <h2 className="header-title">Tortas artesanales para cada ocasión</h2>
            <p className="header-description">Elige el sabor y diseño que mejor represente tu celebración</p>
          </div>
        </div>
        {/* Imagen 2 */}
        <div className="carousel-item">
          <img className="header-logo" src="./recursos/porkycakes_logo.png" alt="Logo" />
          <img
            src={headerImg6}
            className="d-block w-100 header-image"
            alt="Torta 2"
            onLoad={handleImageLoad}
          />
          <div className="carousel-caption">
            <h2 className="header-title">La combinación perfecta de sabor y diseño</h2>
            <p className="header-description">Disfruta de tortas hechas con los mejores ingredientes y diseñadas para sorprender</p>
          </div>
        </div>
        {/* Imagen 3 */}
        <div className="carousel-item">
          <img className="header-logo" src="./recursos/porkycakes_logo.png" alt="Logo" />
          <img
            src={headerImg5}
            className="d-block w-100 header-image"
            alt="Torta 3"
            onLoad={handleImageLoad}
          />
          <div className="carousel-caption">
            <h2 className="header-title">Dejanos ser parte de tus momentos más dulces</h2>
            <p className="header-description">Cada pastel es una pieza única, creada para hacer que tu ocasión sea aún más especial</p>
          </div>
        </div>
      </div>

      {/* Controles del Carrusel */}
      <button className="carousel-control-prev" type="button" data-bs-target="#headerCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#headerCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default Header;
