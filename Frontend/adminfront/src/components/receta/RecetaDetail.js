import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getPasoRecetaById,
  createPasoReceta,
  deletePasoReceta,
} from "../../services/RecetaService";

import "./Receta.css";

const RecetaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados
  const [receta, setReceta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState("receta");

  const [newStep, setNewStep] = useState({
    descripcion: "",
    paso_nro: receta.length + 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recetaData = await getPasoRecetaById(id);
        setReceta(Array.isArray(recetaData) ? recetaData : [recetaData]);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Agregar paso de receta
  const handleAddStep = async () => {
    try {
      const response = await createPasoReceta({ ...newStep, id_Producto: id });
      setReceta([...receta, response]);
      alert("Paso agregado con éxito.");
      setNewStep({ descripcion: "", paso_nro: receta.length + 2 });
    } catch (error) {
      console.error("Error al agregar el paso:", error);
      alert("No se pudo agregar el paso.");
    }
  };

  // Eliminar paso de receta
  const handleDeleteStep = async (index) => {
    const step = receta[index];
    try {
      await deletePasoReceta(id, step.paso_nro);
      setReceta(receta.filter((_, i) => i !== index));
      alert("Paso eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar el paso:", error);
      alert("No se pudo eliminar el paso.");
    }
  };

  if (loading) {
    return <p className="loading">Cargando detalles de la receta...</p>;
  }

  return (
    <div className="r-detail-container">
      {/* Menú lateral */}
      <div className="sidebar">
        <button onClick={() => setSelectedCard("receta")}>Receta</button>
        <button
          className="button-cancelar"
          onClick={() => navigate("/paneladmin")}
        >
          Cancelar
        </button>
      </div>

      <div className="cards-container">
        {/* Pasos de la Receta */}
        {selectedCard === "receta" && (
          <div className="receta-card">
            <h3>Pasos de la Receta</h3>
            {receta.length === 0 ? (
              <p>No hay pasos de receta asociados a este producto.</p>
            ) : (
              <table className="receta-table">
                <thead>
                  <tr>
                    <th>Paso Número</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {receta.map((step, index) => (
                    <tr key={index}>
                      <td>{step.paso_nro}</td>
                      <td>{step.descripcion}</td>
                      <td>
                        <button
                          className="action-button delete"
                          onClick={() => handleDeleteStep(index)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="receta-form-container">
              <h3>Agregar Paso</h3>
              <form>
                <label>Paso Número:</label>
                <input
                  type="number"
                  value={newStep.paso_nro}
                  onChange={(e) =>
                    setNewStep({ ...newStep, paso_nro: e.target.value })
                  }
                />
                <label>Descripción del paso:</label>
                <textarea
                  value={newStep.descripcion}
                  onChange={(e) =>
                    setNewStep({ ...newStep, descripcion: e.target.value })
                  }
                />
                <button
                  className="agregar-paso"
                  type="button"
                  onClick={handleAddStep}
                >
                  Agregar Paso
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecetaDetail;
