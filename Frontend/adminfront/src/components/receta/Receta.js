/*import React, { useEffect, useState } from "react";
import {
  getAllPasosReceta,
  deletePasoReceta,
} from "../../services/RecetaService";
import { getAllProducts } from "../../services/ProductoService";
import { useNavigate } from "react-router-dom";
import "./Receta.css";

const Receta = () => {
  const [recetas, setRecetas] = useState([]);
  const [productos, setProductos] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const [pasosResponse, productosResponse] = await Promise.all([
          getAllPasosReceta(),
          getAllProducts(),
        ]);

        const groupedRecetas = groupByProducto(pasosResponse || []);
        setRecetas(groupedRecetas);

        const productoMap = productosResponse.reduce((acc, producto) => {
          acc[producto.id_Producto] = producto.Nombre_Producto;
          return acc;
        }, {});
        setProductos(productoMap);
      } catch (error) {
        console.error("Error al cargar las recetas: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecetas();
  }, []);

  const groupByProducto = (pasos) => {
    const grouped = pasos.reduce((acc, paso) => {
      const { id_Producto } = paso;
      if (!acc[id_Producto]) {
        acc[id_Producto] = {
          id_Producto,
          pasos: [],
        };
      }
      acc[id_Producto].pasos.push(paso);
      return acc;
    }, {});

    return Object.values(grouped);
  };

  const handleDeleteReceta = async (id_Producto) => {
    const productoNombre = productos[id_Producto] || `ID ${id_Producto}`;
    if (
      window.confirm(
        `¿Estás seguro de eliminar la receta para ${productoNombre}?`
      )
    ) {
      try {
        await deletePasoReceta(id_Producto);
        setRecetas((prev) =>
          prev.filter((receta) => receta.id_Producto !== id_Producto)
        );
        alert(`La receta para ${productoNombre} se eliminó correctamente.`);
      } catch (error) {
        console.error("Error al eliminar la receta:", error);
        alert(
          "Hubo un error al eliminar la receta. Por favor, inténtalo de nuevo."
        );
      }
    }
  };

  const filteredRecetas = Array.isArray(recetas)
    ? recetas.filter((receta) => {
        return (
          productos[receta.id_Producto]
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          receta.pasos.some((paso) =>
            paso.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      })
    : [];

  if (loading) {
    return <div className="loading">Cargando recetas...</div>;
  }

  return (
    <div className="receta-list-container">
      <div className="header-receta">
        <label>
          <input
            type="text"
            className="input"
            placeholder="Buscar recetas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        <button
          className="add-receta-button"
          onClick={() => navigate("/add-receta")}
        >
          Agregar Receta
        </button>
      </div>

      {filteredRecetas.length === 0 ? (
        <p className="no-recetas-message">No hay recetas disponibles.</p>
      ) : (
        <div className="receta-list">
          {filteredRecetas.map((receta) => (
            <div key={receta.id_Producto} className="receta-card">
              <h3>
                Receta:{" "}
                {productos[receta.id_Producto] || `ID ${receta.id_Producto}`}
              </h3>
              <table className="receta-table">
                <thead>
                  <tr>
                    <th>Paso</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  {receta.pasos.map((paso) => (
                    <tr key={paso.paso_nro}>
                      <td>{paso.paso_nro}</td>
                      <td>{paso.descripcion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="receta-actions-container">
                <div className="receta-actions">
                  <button
                    className="edit-receta-button"
                    onClick={() =>
                      navigate(`/edit-receta/${receta.id_Producto}`)
                    }
                  >
                    Editar Receta
                  </button>
                  <button
                    className="delete-receta-button"
                    onClick={() => handleDeleteReceta(receta.id_Producto)}
                  >
                    Eliminar Receta
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Receta;
*/

import React, { useEffect, useState } from "react";
import {
  getAllPasosReceta,
  deletePasoReceta,
} from "../../services/RecetaService";
import { getAllProducts } from "../../services/ProductoService";
import { useNavigate } from "react-router-dom";
import "./Receta.css";

const Receta = () => {
  const [recetas, setRecetas] = useState([]);
  const [productos, setProductos] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const [selectedReceta, setSelectedReceta] = useState(null); // Receta seleccionada para eliminar
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const [pasosResponse, productosResponse] = await Promise.all([
          getAllPasosReceta(),
          getAllProducts(),
        ]);

        const groupedRecetas = groupByProducto(pasosResponse || []);
        setRecetas(groupedRecetas);

        const productoMap = productosResponse.reduce((acc, producto) => {
          acc[producto.id_Producto] = producto.Nombre_Producto;
          return acc;
        }, {});
        setProductos(productoMap);
      } catch (error) {
        console.error("Error al cargar las recetas: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecetas();
  }, []);

  const groupByProducto = (pasos) => {
    const grouped = pasos.reduce((acc, paso) => {
      const { id_Producto } = paso;
      if (!acc[id_Producto]) {
        acc[id_Producto] = {
          id_Producto,
          pasos: [],
        };
      }
      acc[id_Producto].pasos.push(paso);
      return acc;
    }, {});

    return Object.values(grouped);
  };

  const handleDeleteReceta = async () => {
    if (selectedReceta) {
      try {
        await deletePasoReceta(selectedReceta.id_Producto);
        setRecetas((prev) =>
          prev.filter((receta) => receta.id_Producto !== selectedReceta.id_Producto)
        );
        setShowModal(false);
        alert(
          `La receta para ${
            productos[selectedReceta.id_Producto] || `ID ${selectedReceta.id_Producto}`
          } se eliminó correctamente.`
        );
      } catch (error) {
        console.error("Error al eliminar la receta:", error);
        alert("Hubo un error al eliminar la receta. Por favor, inténtalo de nuevo.");
      }
    }
  };

  const filteredRecetas = Array.isArray(recetas)
    ? recetas.filter((receta) => {
        return (
          productos[receta.id_Producto]
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          receta.pasos.some((paso) =>
            paso.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      })
    : [];

  if (loading) {
    return <div className="loading">Cargando recetas...</div>;
  }

  return (
    <div className="receta-list-container">
      <div className="header-receta">
        <label>
          <input
            type="text"
            className="input"
            placeholder="Buscar recetas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        <button
          className="add-receta-button"
          onClick={() => navigate("/add-receta")}
        >
          Agregar Receta
        </button>
      </div>

      {filteredRecetas.length === 0 ? (
        <p className="no-recetas-message">No hay recetas disponibles.</p>
      ) : (
        <div className="receta-list">
          {filteredRecetas.map((receta) => (
            <div key={receta.id_Producto} className="receta-card">
              <h3>
                Receta:{" "}
                {productos[receta.id_Producto] || `ID ${receta.id_Producto}`}
              </h3>
              <table className="receta-table">
                <thead>
                  <tr>
                    <th>Paso</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  {receta.pasos.map((paso) => (
                    <tr key={paso.paso_nro}>
                      <td>{paso.paso_nro}</td>
                      <td>{paso.descripcion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="receta-actions-container">
                <div className="receta-actions">
                  <button
                    className="edit-receta-button"
                    onClick={() =>
                      navigate(`/edit-receta/${receta.id_Producto}`)
                    }
                  >
                    Editar Receta
                  </button>
                  <button
                    className="delete-receta-button"
                    onClick={() => {
                      setSelectedReceta(receta);
                      setShowModal(true);
                    }}
                  >
                    Eliminar Receta
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmación */}
      {showModal && (
        <>
          <div className="modal-overlayy"></div>
          <div className="modal show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-headerr">
                  <h5 className="modal-title">Confirmar eliminación</h5>                  
                </div>
                <div className="modal-body">
                  <p>
                    ¿Estás seguro de que deseas eliminar la receta para{" "}
                    {productos[selectedReceta?.id_Producto] || "este producto"}?
                  </p>
                </div>
                <div className="modal-footerr">
                <button
                    type="button"
                    className="btn btn-secondaryModal"
                    onClick={handleDeleteReceta}
                  >
                    Aceptar
                  </button>
                  <button
                    type="button"
                    
                    className="btn btn-dangerModal"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
             
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Receta;
