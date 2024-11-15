import React, { useEffect, useState } from "react";
import {
  getAllMatPrimas,
  getAllTMatPrimas,
  deleteMatPrima,  
} from "../../services/MateriaPrimaService";
import { useNavigate } from "react-router-dom";
import "./MateriaPrimaList.css";

const MateriaPrimaList = () => {
  const [matPrimas, setMatPrimas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tmatPrimas, settMatPrimas] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el filtro de búsqueda
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatPrimas = async () => {
      try {
        const response = await getAllMatPrimas();
        setMatPrimas(response || []);
        const tmpData = await getAllTMatPrimas();
        settMatPrimas(tmpData);
      } catch (error) {
        console.error("Error fetching mat primas: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatPrimas();
  }, []);

  // Función para obtener la descripción del tipo de materia prima
  const getTipoDescripcion = (idTipoMP) => {
    const tipo = tmatPrimas.find((t) => t.id_TipoMP === idTipoMP);
    return tipo ? tipo.descripcion_TipoMP : "Sin descripción";
  };

  // Filtrar materias primas basadas en el término de búsqueda
  const filteredMatPrimas = matPrimas.filter((matPrima) => {
    return (
      matPrima.Nombre_MP.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getTipoDescripcion(matPrima.id_TipoMP)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return <div className="loading">Cargando materia primas...</div>;
  }

  const handleDeleteMP = async (id) => {
    try {
      await deleteMatPrima(id);
      setMatPrimas((prevMatPrimas) =>
        prevMatPrimas.filter((mp) => mp.id_MateriaPrima !== id)
      );
      alert("Materia prima eliminada con éxito.");
    } catch (error) {
      console.error("Error al eliminar la materia prima:", error);
      alert("No se pudo eliminar la materia prima.");
    }
  };

  return (
    <div className="mp-list-container">
      <div className="headermp">
        <label>
          <input
            type="text"
            className="input"
            placeholder="Buscar materia prima..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </label>
        <button
          className="add-mp-button"
          onClick={() => navigate("/add-MP")} 
        >
          Agregar Materia Prima
        </button>
      </div>

      {filteredMatPrimas.length === 0 ? (
        <p className="no-matPrimas-message">
          No hay materias primas disponibles.
        </p>
      ) : (
        <table className="mp-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Un. Medida</th>
              <th>Vencimiento</th>
              <th>Tipo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredMatPrimas.map((matPrima) => {
              const isLowStock =
                (matPrima.Un_de_Medida === "gramos" &&
                  matPrima.unidades <= 100) ||
                (matPrima.Un_de_Medida === "unidad" &&
                  matPrima.unidades <= 10) ||
                (matPrima.Un_de_Medida === "litros" && matPrima.unidades <= 2);

              return (
                <tr
                  key={matPrima.id_MateriaPrima}
                  className={isLowStock ? "low-stock" : ""}
                >
                  <td>{matPrima.Nombre_MP}</td>
                  <td>{matPrima.unidades}</td>
                  <td>{matPrima.Un_de_Medida}</td>
                  <td>{matPrima.Fecha_Vto_Proxima}</td>
                  <td>{getTipoDescripcion(matPrima.id_TipoMP)}</td>
                  <td>
                    <button
                      className="action-button edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/edit-MP/${matPrima.id_MateriaPrima}`);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="action-button delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          window.confirm(
                            `¿Estás seguro de eliminar "${matPrima.Nombre_MP}"?`
                          )
                        ) {
                          handleDeleteMP(matPrima.id_MateriaPrima);
                        }
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MateriaPrimaList;
