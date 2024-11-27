import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createMatPrima,
  getAllTMatPrimas,
} from "../../services/MateriaPrimaService";
import "./MateriaPrimaDetail.css";

const MateriaPrimaForm = () => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fechavenc, setFechavenc] = useState("");
  const [unidMedida, setUnmedida] = useState("");
  const [tipomp, setTipoMP] = useState("");
  const [tipomptodas, setTipoMPtodas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matPrimasData = await getAllTMatPrimas();
        console.log("Tipos de Materias Primas: ", matPrimasData);
        setTipoMPtodas(matPrimasData);
      } catch (error) {
        console.error("Error al cargar los tipos de materias primas: ", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMP = {
      Nombre_MP: nombre,
      unidades: parseInt(cantidad, 10),
      Fecha_Vto_Proxima: fechavenc,
      Un_de_Medida: unidMedida,
      id_TipoMP: parseInt(tipomp, 10),
    };

    try {
      await createMatPrima(newMP);
      alert("Materia prima agregada con éxito.");
      navigate("/paneladmin");
    } catch (error) {
      console.error("Error al agregar la materia prima: ", error);
      alert("Error al agregar la materia prima, por favor intenta nuevamente.");
    }
  };

  return (
    <div className="mp-detail-container">
      <div className="sidebar">
        <button>Agregar Mat. Prima</button>
        <button
          className="button-cancelar"
          onClick={() => navigate("/paneladmin")}
        >
          Cancelar
        </button>
      </div>
      <div className="cards-container">
        <div className="card-p">
          <h3>Agregar Materia Prima</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre de la materia prima:</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Stock:</label>
              <input
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Fecha de vencimiento:</label>
              <input
                type="date"
                value={fechavenc}
                onChange={(e) => setFechavenc(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Unidad de Medida:</label>
              <textarea
                value={unidMedida}
                onChange={(e) => setUnmedida(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Tipo Materia Prima</label>
              <select
                value={tipomp}
                onChange={(e) => setTipoMP(e.target.value)}
                required
              >
                <option value="">Seleccione un Tipo de Materia Prima</option>
                {tipomptodas.map((matPrima) => (
                  <option key={matPrima.id_TipoMP} value={matPrima.id_TipoMP}>
                    {matPrima.descripcion_TipoMP}
                  </option>
                ))}
              </select>
            </div>
               
            <button type="submit" className="save-buttonn">Guardar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MateriaPrimaForm;
