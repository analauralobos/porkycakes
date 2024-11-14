import React from 'react'
import './Inicio.css'
import Categoria from '../../components/Categoria/Categoria'
import Producto from '../../components/Producto/Producto'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

const Inicio = () => {
  return (
    <div className='container'>
      <Header/>
      <Categoria/>
      <hr className='divisor'></hr>
      <Producto/>
      <Footer/>
    </div>
  )
}

export default Inicio
