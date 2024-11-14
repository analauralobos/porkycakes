import React from 'react'
import './Footer.css'
import { FaInstagram, FaFacebook, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
    return (
        <div class="container footer">
            <div class="row">
                <div class="col-4">
                    <p className="encabezado">Redes Sociales:</p>
                </div>
                <div class="col-4">
                    <p className="encabezado">Contacto:</p>
                </div>
            </div>
            <div className="row">
                <div className="col-1">
                    <FaInstagram className="icono"></FaInstagram>
                </div>
                <div className="col-3 g-0">
                    <p className="contenido">porky.cakes</p>
                </div>
                <div className="col-1">
                    <FaEnvelope className="icono"></FaEnvelope>
                </div>
                <div className="col-3 g-0">
                    <p className="contenido">porky_cakes@outlook.com</p>
                </div>
            </div>
            <div className="row">
                <div className="col-1">
                    <FaFacebook className="icono"></FaFacebook>
                </div>
                <div className="col-3 g-0">
                    <p className="contenido g-0">Porky Cakes</p>
                </div>
                <div className="col-1">
                    <FaPhone className="icono"></FaPhone>
                </div>
                <div className="col-3 g-0">
                    <p className="contenido">2302-657698</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
