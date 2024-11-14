import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <img className="header-logo" src="./recursos/porkycakes_logo.png" alt="Logo" />
        <h2 className="header-title">Tortas Artesanales para cada ocasión</h2>
        <p className="header-description">Crea recuerdos inolvidables con nuestros sabores irresistibles</p>
        <button className="header-button">Ver Menú</button>
      </div>
    </div>
  )
}

export default Header
