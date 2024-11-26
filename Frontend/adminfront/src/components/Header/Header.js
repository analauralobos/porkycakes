/**import React from 'react'
import './Header.css'
import '../../assets/img/header.png'

const Header = () => {
  return (
    <div className="h-header">
      <div className="header-content">
        <img className="header-logo" src="./recursos/porkycakes_logo.png" alt="Logo" />
        <h2 className="header-title">Tortas Artesanales para cada ocasión</h2>
        <p className="header-description">Crea recuerdos inolvidables con nuestros sabores irresistibles</p>
      </div>
    </div>
  )
}

export default Header*/


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import headerImg from '../../assets/img/header.jpg';
import headerImg2 from '../../assets/img/header7.jpg';
import headerImg3 from '../../assets/img/header4.jpg';

const Header = () => {
  return (
    <div id="headerCarousel" className="carousel slide h-header" data-bs-ride="carousel">
      <div className="carousel-inner">
      
        {/* Imagen 1 */}
        <div className="carousel-item active">
        <img className="header-logo" src="./recursos/porkycakes_logo.png" alt="Logo" />
          <img src={headerImg}  className="d-block w-100 header-image" alt="Torta 1" />
          <div className="carousel-caption">
            <h2 className="header-title">Tortas artesanales para cada ocasión</h2>
            <p className="header-description">Elige el sabor y diseño que mejor represente tu celebración</p>
          </div>
        </div>
        {/* Imagen 2 */}
        <div className="carousel-item">
        <img className="header-logo" src="./recursos/porkycakes_logo.png" alt="Logo" />
          <img  src={headerImg2} className="d-block w-100 header-image" alt="Torta 2" />
          <div className="carousel-caption">
            <h2 className="header-title">La combinación perfecta de sabor y diseño</h2>
            <p className="header-description">Disfruta de tortas hechas con los mejores ingredientes y diseñadas para sorprender</p>
          </div>
        </div>
        {/* Imagen 3 */}
        <div className="carousel-item">
        <img className="header-logo" src="./recursos/porkycakes_logo.png" alt="Logo" />
          <img src={headerImg3}  className="d-block w-100 header-image" alt="Torta 3" />
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
