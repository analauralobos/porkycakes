import React, { useState } from 'react';
import './Contacto.css'; 

const Contacto = () => {
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const numeroWhatsapp = '5492302669496'; 
    const mensajeCodificado = encodeURIComponent(mensaje); 
    const url = `https://wa.me/${numeroWhatsapp}?text=${mensajeCodificado}`;
    window.open(url, '_blank');
  };

  return (
    <div className="contacto-container">
      <h2 className="form-contacto">¿Tienes Alguna Duda o Pedido Especial?</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <textarea
          className="mensaje-input"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe tu mensaje"
          rows="8"
          required
        />
        <button type="submit" className="enviar-btn">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contacto;
