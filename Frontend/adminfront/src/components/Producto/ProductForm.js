import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../services/ProductoService';

const ProductForm = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [porciones, setPorciones] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            Nombre_Producto: nombre,
            precio_vta: precio,
            cant_porciones: porciones,
            descripcion_producto: descripcion
        };

        try {
            await createProduct(newProduct);
            alert('Producto agregado con éxito');
            navigate('/productos'); 
        } catch (error) {
            console.error('Error al agregar producto:', error);
            alert('Error al agregar el producto, por favor intenta nuevamente.');
        }
    };

    return (
        <div>
            <h2>Agregar Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Producto:</label>
                    <input 
                        type="text" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Precio de Venta:</label>
                    <input 
                        type="number" 
                        value={precio} 
                        onChange={(e) => setPrecio(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Cantidad de Porciones:</label>
                    <input 
                        type="number" 
                        value={porciones} 
                        onChange={(e) => setPorciones(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea 
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Agregar Producto</button>
            </form>
        </div>
    );
};

export default ProductForm;
