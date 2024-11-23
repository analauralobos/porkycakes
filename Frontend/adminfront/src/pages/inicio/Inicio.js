import React from 'react'
import './Inicio.css'
import Categoria from '../../components/Categoria/Categoria'
import Producto from '../../components/Producto/Producto'
import Header from '../../components/Header/Header'

const Inicio = ( {userRole}) => {
  return (
    <div className='i-container'>
      <Header/>
      <Categoria/>
      <hr className='i-divisor'></hr>
      <Producto userRole={userRole}/>
    </div>
  )
}

export default Inicio
