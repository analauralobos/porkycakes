import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMatPrimaById,
  updateMatPrima,
  getAllTMatPrimas,
} from "../../services/MateriaPrimaService";
import "./MateriaPrimaDetail.css";
const MateriaPrimaDetail = () => {
  const { id } = useParams(); // Obtener el ID desde los parámetros de la URL
  const navigate = useNavigate();

  const [materiaPrima, setMateriaPrima] = useState({
    Nombre_MP: "",
    unidades: "",
    Un_de_Medida: "",
    Fecha_Vto_Proxima: "",
    id_TipoMP: "",
  });

  const [tiposMateriaPrima, setTiposMateriaPrima] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener tipos de materia prima
        const tipoMPData = await getAllTMatPrimas();
        setTiposMateriaPrima(tipoMPData);

        // Obtener los datos de la materia prima específica
        const matPrimaData = await getMatPrimaById(id);
        if (matPrimaData) {
          setMateriaPrima(matPrimaData);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMateriaPrima({
      ...materiaPrima,
      [name]: value,
    });
  };

  const handleUpdateMP = async (e) => {
    e.preventDefault();
    try {
      await updateMatPrima(id, materiaPrima);
      alert("Materia prima actualizada con éxito.");
      navigate("/paneladmin");
    } catch (error) {
      console.error("Error al actualizar la materia prima:", error);
      alert("No se pudo actualizar la materia prima.");
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="mp-detail-container">     
      <div className="sidebar">
        <button>Editar Mat. Prima</button>
        <button
          className="button-cancelar"
          onClick={() => navigate("/paneladmin")}
        >
          Cancelar
        </button>
      </div>

      <div className="cards-container">
        <div className="card-p">
          <h3>Detalles de Materia Prima</h3>
          <form onSubmit={handleUpdateMP}>
            <label>Nombre:</label>
            <input
              type="text"
              name="Nombre_MP"
              value={materiaPrima.Nombre_MP}
              onChange={handleChange}
            />

            <label>Cantidad:</label>
            <input
              type="number"
              name="unidades"
              value={materiaPrima.unidades}
              onChange={handleChange}
            />

            <label>Unidad de Medida:</label>
            <input
              type="text"
              name="Un_de_Medida"
              value={materiaPrima.Un_de_Medida}
              onChange={handleChange}
            />

            <label>Vencimiento:</label>
            <input
              type="date"
              name="Fecha_Vto_Proxima"
              value={materiaPrima.Fecha_Vto_Proxima}
              onChange={handleChange}
            />

            <label>Tipo:</label>
            <select
              name="id_TipoMP"
              value={materiaPrima.id_TipoMP}
              onChange={handleChange}
            >
              <option value="">Seleccione un tipo de materia prima</option>
              {tiposMateriaPrima.map((tipo) => (
                <option key={tipo.id_TipoMP} value={tipo.id_TipoMP}>
                  {tipo.descripcion_TipoMP}
                </option>
              ))}
            </select>

            <button type="submit" className="save-button" >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MateriaPrimaDetail;
