import React, { useEffect, useState } from "react";
import {
  getProveedores,
  addProveedor,
  updateProveedor,
  deleteProveedor,
} from "../../services/ProveedorService";
import "./Proveedor.css";

const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProveedor, setEditingProveedor] = useState(null);
  const [newProveedor, setNewProveedor] = useState({
    CUIT: "",
    Nombre_Prov: "",
    Direccion_Prov: "",
    email_Prov: "",
    Telefono_Prov: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProveedores();
        setProveedores(data);
      } catch (error) {
        console.error("Error al cargar los proveedores:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddOrUpdate = async () => {
    try {
      if (editingProveedor) {
        await updateProveedor(editingProveedor.id_Proveedor, newProveedor);
      } else {
        await addProveedor(newProveedor);
      }
      const updatedProveedores = await getProveedores();
      setProveedores(updatedProveedores);
      setShowModal(false);
      setEditingProveedor(null);
      setNewProveedor({
        CUIT: "",
        Nombre_Prov: "",
        Direccion_Prov: "",
        email_Prov: "",
        Telefono_Prov: "",
      });
    } catch (error) {
      console.error("Error al guardar el proveedor:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProveedor(id);
      const updatedProveedores = await getProveedores();
      setProveedores(updatedProveedores);
    } catch (error) {
      console.error("Error al eliminar el proveedor:", error);
    }
  };

  if (loading) return <p>Cargando proveedores...</p>;

  return (
    <div className="proveedor-list-container">
      <div className="header">
        <button
          className="add-proveedor-button"
          onClick={() => {
            setEditingProveedor(null); // Asegúrate de que no esté en modo edición.
            setNewProveedor({
              CUIT: "",
              Nombre_Prov: "",
              Direccion_Prov: "",
              email_Prov: "",
              Telefono_Prov: "",
            }); // Restablece el formulario.
            setShowModal(true);
          }}
        >
          Agregar Proveedor
        </button>
      </div>
      <table className="proveedor-table">
        <thead>
          <tr>            
            <th>CUIT</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.id_Proveedor}>
              
              <td>{proveedor.CUIT}</td>
              <td>{proveedor.Nombre_Prov}</td>
              <td>{proveedor.Direccion_Prov}</td>
              <td>{proveedor.email_Prov}</td>
              <td>{proveedor.Telefono_Prov}</td>
              <td>
                <button
                  className="action-button edit"
                  onClick={() => {
                    setEditingProveedor(proveedor);
                    setNewProveedor(proveedor);
                    setShowModal(true);
                  }}
                >
                  Editar
                </button>
                <button
                  className="action-button delete"
                  onClick={() => handleDelete(proveedor.id_Proveedor)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              {editingProveedor ? "Editar Proveedor" : "Agregar Proveedor"}
            </h2>
            <form className="formPr">
              <label>CUIT:</label>
              <input
                type="text"
                value={newProveedor.CUIT}
                onChange={(e) =>
                  setNewProveedor({ ...newProveedor, CUIT: e.target.value })
                }
              />

              <label>Nombre:</label>
              <input
                type="text"
                value={newProveedor.Nombre_Prov}
                onChange={(e) =>
                  setNewProveedor({
                    ...newProveedor,
                    Nombre_Prov: e.target.value,
                  })
                }
              />

              <label>Dirección:</label>
              <input
                type="text"
                value={newProveedor.Direccion_Prov}
                onChange={(e) =>
                  setNewProveedor({
                    ...newProveedor,
                    Direccion_Prov: e.target.value,
                  })
                }
              />

              <label>Email:</label>
              <input
                type="email"
                value={newProveedor.email_Prov}
                onChange={(e) =>
                  setNewProveedor({
                    ...newProveedor,
                    email_Prov: e.target.value,
                  })
                }
              />

              <label>Teléfono:</label>
              <input
                type="text"
                value={newProveedor.Telefono_Prov}
                onChange={(e) =>
                  setNewProveedor({
                    ...newProveedor,
                    Telefono_Prov: e.target.value,
                  })
                }
              />
                <label>
              <button className="action-button edit" onClick={handleAddOrUpdate}>
                Guardar
              </button>
              <button className="action-button delete" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              </label>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProveedorList;
