import React, { useEffect, useState } from "react";
import {
  getCompras,
  crearCompra,
  getMateriasPrimas,
  getProveedores,
  actualizarMateriaPrima,
} from "../../services/CompraService";
import "./CompraMP.css";

const CompraMP = () => {
  const [compras, setCompras] = useState([]);
  const [materiasPrimas, setMateriasPrimas] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [newCompra, setNewCompra] = useState({
    id_Proveedor: "",
    id_MateriaPrima: "",
    cantidad_compra: "",
    precio_compra: "",
    fecha_compra: "",
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const comprasData = await getCompras();
        const materiasPrimasData = await getMateriasPrimas();
        const proveedoresData = await getProveedores();
        setCompras(comprasData);
        setMateriasPrimas(materiasPrimasData);
        setProveedores(proveedoresData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Manejar el envío del formulario
  const handleAddCompra = async () => {
    try {
      await crearCompra(newCompra);

      // Encontrar la materia prima que se va a actualizar
      const materiaPrima = materiasPrimas.find(
        (mp) => mp.id_MateriaPrima === parseInt(newCompra.id_MateriaPrima)
      );

      if (materiaPrima) {
        const updatedQuantity =
          materiaPrima.unidades + parseInt(newCompra.cantidad_compra);

        const updatedMateriaPrima = {
          id_MateriaPrima: materiaPrima.id_MateriaPrima,
          Nombre_MP: materiaPrima.Nombre_MP,
          Un_de_Medida: materiaPrima.Un_de_Medida,
          Fecha_Vto_Proxima: materiaPrima.Fecha_Vto_Proxima,
          id_TipoMP: materiaPrima.id_TipoMP,
          unidades: updatedQuantity,
        };

        const response = await actualizarMateriaPrima(
          materiaPrima.id_MateriaPrima,
          updatedMateriaPrima
        );

        if (response) {
          const updatedMateriasPrimas = await getMateriasPrimas();
          setMateriasPrimas(updatedMateriasPrimas);
          alert("Stock de materia prima actualizado");
        } else {
          console.error("Error al actualizar la materia prima");
        }
      }

      // Obtener las compras actualizadas
      const updatedCompras = await getCompras();
      setCompras(updatedCompras);

      // Limpiar el formulario
      setNewCompra({
        id_Proveedor: "",
        id_MateriaPrima: "",
        cantidad_compra: "",
        precio_compra: "",
        fecha_compra: "",
      });

      setShowModal(false); // Cerrar el modal después de agregar la compra
    } catch (error) {
      console.error(
        "Error al crear la compra o actualizar la materia prima:",
        error
      );
      alert(
        "Hubo un error al actualizar la materia prima. Revisa la consola para más detalles."
      );
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="compra-list-container">
      <div className="header">
        <button
          className="add-compra-button"
          onClick={() => setShowModal(true)}
        >
          Agregar Compra
        </button>
      </div>
      <div>
        <table className="compra-table">
          <thead>
            <tr>
              <th>ID Compra</th>
              <th>Proveedor</th>
              <th>Materia Prima</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra) => {
              const proveedor = proveedores.find(
                (p) => p.id_Proveedor === compra.id_Proveedor
              );
              const materiaPrima = materiasPrimas.find(
                (mp) => mp.id_MateriaPrima === compra.id_MateriaPrima
              );

              return (
                <tr key={compra.id_Compra}>
                  <td>{compra.id_Compra}</td>
                  <td>{proveedor ? proveedor.Nombre_Prov : "Desconocido"}</td>
                  <td>
                    {materiaPrima ? materiaPrima.Nombre_MP : "Desconocido"}
                  </td>
                  <td>{compra.cantidad_compra}</td>
                  <td>{compra.precio_compra}</td>
                  <td>{compra.fecha_compra}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Modal */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">              
              <h3>Formulario de Compra</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <label>Proveedor:</label>
                <select
                  value={newCompra.id_Proveedor}
                  onChange={(e) =>
                    setNewCompra({ ...newCompra, id_Proveedor: e.target.value })
                  }
                >
                  <option value="">Seleccione</option>
                  {proveedores.map((prov) => (
                    <option key={prov.id_Proveedor} value={prov.id_Proveedor}>
                      {prov.Nombre_Prov}
                    </option>
                  ))}
                </select>

                <label>Materia Prima:</label>
                <select
                  value={newCompra.id_MateriaPrima}
                  onChange={(e) =>
                    setNewCompra({
                      ...newCompra,
                      id_MateriaPrima: e.target.value,
                    })
                  }
                >
                  <option value="">Seleccione</option>
                  {materiasPrimas.map((mp) => (
                    <option key={mp.id_MateriaPrima} value={mp.id_MateriaPrima}>
                      {mp.Nombre_MP}
                    </option>
                  ))}
                </select>

                <label>Cantidad:</label>
                <input
                  type="number"
                  value={newCompra.cantidad_compra}
                  onChange={(e) =>
                    setNewCompra({
                      ...newCompra,
                      cantidad_compra: e.target.value,
                    })
                  }
                />

                <label>Precio:</label>
                <input
                  type="number"
                  value={newCompra.precio_compra}
                  onChange={(e) =>
                    setNewCompra({
                      ...newCompra,
                      precio_compra: e.target.value,
                    })
                  }
                />
                <label>Fecha:</label>
                <input
                  type="date"
                  value={newCompra.fecha_compra}
                  onChange={(e) =>
                    setNewCompra({ ...newCompra, fecha_compra: e.target.value })
                  }
                />
                <label>
                  <button
                    className="action-button edit"
                    onClick={handleAddCompra}
                  >
                    Agregar
                  </button>
                  <button
                    className="action-button delete"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                </label>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompraMP;
