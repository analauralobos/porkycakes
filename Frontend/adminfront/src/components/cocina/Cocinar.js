import React, { useState, useEffect } from "react";
import { agregarPorciones, disminuirMP, getAllProducts } from "../../services/ProductoService";


const Cocinar = () => {
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [porciones, setPorciones] = useState(0);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await getAllProducts(); // Resolviendo la promesa
                setProductos(response);
            } catch (err) {
                console.log("Error al obtener productos: " + err);
            }
        };
        fetchProductos();
    }, []);

    useEffect(() => {
        if (!productoSeleccionado || cantidad <= 0) {
            setPorciones(0);
            return;
        }

        const producto = productos.find(
            (prod) => prod.id_Producto === parseInt(productoSeleccionado)
        );

        if (producto) {
            const { p_categoria } = producto;

            switch (p_categoria) {
                case 1: // Torta
                    setPorciones(cantidad * 20);
                    break;
                case 2: // Galletitas
                case 3: // Alfajores
                    setPorciones(cantidad); // Porciones iguales a la cantidad
                    break;
                case 4:
                    setPorciones(cantidad * 8)
                    break;
                case 5: // Vegano
                case 6:
                    setPorciones(0); // Usuario debe ingresarlas manualmente
                    break;
                default:
                    setPorciones(cantidad); // Por defecto, las porciones son iguales a la cantidad
            }
        }
    }, [productoSeleccionado, cantidad, productos]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const sumarPorciones = await agregarPorciones(productoSeleccionado, porciones);
            const materiaPrimaUsada = await disminuirMP(productoSeleccionado, cantidad);
            setCantidad(0);
            setPorciones(0);
            setProductoSeleccionado("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="mp-detail-container">
            <div className="cards-container">
                <div className="card-p">
                    <h2 className="h2AgrProd">Cargar Producto Cocinado</h2>
                    <div className="product-details">
                        <form onSubmit={handleSubmit} className="agregar-producto-form">
                            {/* Seleccionar producto */}
                            <div className="form-row">
                                <div className="form-field">
                                    <label htmlFor="producto">Producto Cocinado:</label>
                                    <select
                                        id="producto"
                                        value={productoSeleccionado}
                                        onChange={(e) => setProductoSeleccionado(e.target.value)}
                                        required
                                        className="form-control"
                                    >
                                        <option value="">Seleccione un producto</option>
                                        {productos.map((producto) => (
                                            <option
                                                key={producto.id_Producto}
                                                value={producto.id_Producto}
                                            >
                                                {producto.Nombre_Producto}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Cantidad cocinada */}
                                    <label htmlFor="cantidad">Cantidad Cocinada:</label>
                                    <input
                                        type="number"
                                        id="cantidad"
                                        value={cantidad}
                                        onChange={(e) => setCantidad(parseInt(e.target.value))}
                                        min="1"
                                        required
                                        className="form-control"
                                    />

                                    {/* Porciones calculadas o ingresadas */}
                                    <label htmlFor="porciones">Porciones Agregadas:</label>
                                    <input
                                        type="number"
                                        id="porciones"
                                        className="form-control"
                                        value={porciones}
                                        onChange={(e) => setPorciones(parseInt(e.target.value))}
                                        min="1"
                                        required={productos.find((prod) => parseInt(productoSeleccionado) === prod.id_Producto)?.p_categoria > 4}
                                        disabled={[5, 6].includes(productos.find((prod) => parseInt(productoSeleccionado) === prod.id_Producto)?.p_categoria) === false} // Solo habilitar si es Sin TACC o Vegano
                                    />
                                    <button type="submit" className="save-button">Cargar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cocinar;
