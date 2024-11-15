import React from 'react'
import './Inicio.css'
import Categoria from '../../components/Categoria/Categoria'
import Producto from '../../components/Producto/Producto'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

const Inicio = () => {
  return (
    <div className='i-container'>
      <Header/>
      <Categoria/>
      <hr className='i-divisor'></hr>
      <Producto/>
    </div>
  )
}

export default Inicio
