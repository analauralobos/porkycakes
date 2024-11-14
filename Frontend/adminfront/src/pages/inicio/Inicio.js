import React from 'react'
import './Inicio.css'
import Header from '../../components/Header/Header'
import Categoria from '../../components/Categoria/Categoria'
import Producto from '../../components/Producto/Producto'
import Footer from '../../components/Footer/Footer'

const Inicio = () => {
  return (
    <div>
      <Header/>
      <Categoria/>
      <hr className='divisor'></hr>
      <Producto/>
      <Footer/>
    </div>
  )
}

export default Inicio
