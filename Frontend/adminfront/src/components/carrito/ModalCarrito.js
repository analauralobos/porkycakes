import React, { useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import './ModalCarrito.css'

const ModalCarrito = ({ show, toggleShow, mensaje }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        toggleShow();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [show, toggleShow]);

  return (
    <Toast
      show={show}
      onClose={toggleShow}
      className="position-fixed top-0 end-0 toast-custom"
      style={{ backgroundColor: 'pink' }}
    >
      <Toast.Header>
        <strong className="me-auto" style={{ color: 'black' }}>Carrito</strong>
      </Toast.Header>
      <Toast.Body style={{ color: 'black' }}>{mensaje}</Toast.Body>
    </Toast>
  );

};

export default ModalCarrito;
