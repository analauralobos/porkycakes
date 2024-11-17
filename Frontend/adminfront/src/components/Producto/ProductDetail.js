import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../services/ProductoService";
import {
  getCategoriasId,
  getAllCategorias,
} from "../../services/CateogriaService";
import {
  getIngredientById,
  createIngredient,
  deleteIngredient,
} from "../../services/IngredienteService";
import {
  getPasoRecetaById,
  createPasoReceta,
  deletePasoReceta,
} from "../../services/RecetaService";
import {
  getAllMatPrimas,
  getMatPrimaById,
} from "../../services/MateriaPrimaService";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [productI, setProductI] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [categoriaTodas, setCatTodas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [receta, setReceta] = useState([]);
  const [matPrimas, setMatPrimas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState("producto");
  const navigate = useNavigate();

  const [newIngredient, setNewIngredient] = useState({
    id_MateriaPrima: "",
    cantidad: 0,
    unidades: "",
  });
  const [newStep, setNewStep] = useState({
    descripcion: "",
    paso_nro: receta.length + 1,
  });

  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer).reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, "");
    return `data:image/jpeg;base64,${window.btoa(binary)}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(id);
        // Convertir la imagen
        const productWithImage = {
          ...productData,
          imagen: productData.imagen
            ? arrayBufferToBase64(productData.imagen)
            : null,
        };
        setProductI(productWithImage);
        setProduct(productData);

        const ingredientsData = await getIngredientById(id);
        const ingredientsWithNames = await Promise.all(
          ingredientsData.map(async (ingredient) => {
            const materiaPrima = await getMatPrimaById(
              ingredient.id_MateriaPrima
            );
            return { ...ingredient, Nombre_MP: materiaPrima.Nombre_MP };
          })
        );
        const recetaData = await getPasoRecetaById(id);
        const categoriaData = await getCategoriasId(productData.p_categoria);
        const categoriaTodas = await getAllCategorias();
        const matPrimasData = await getAllMatPrimas();
        console.log("Materias Primas:", matPrimasData);  // Verifica los datos
        setIngredients(ingredientsWithNames || []);
        setReceta(Array.isArray(recetaData) ? recetaData : [recetaData]);
        setCategoria(categoriaData);
        setCatTodas(categoriaTodas);
        setMatPrimas(matPrimasData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdateProduct = async () => {
    try {
      await updateProduct(id, product);
      alert("Producto actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("No se pudo actualizar el producto.");
    }
  };

  const handleAddIngredient = async () => {
    try {
      const response = await createIngredient({
        ...newIngredient,
        id_Producto: id,
      });
      setIngredients([...ingredients, response]);
      alert("Ingrediente agregado con éxito.");
      setNewIngredient({ id_MateriaPrima: "", cantidad: 0, unidades: "" });
    } catch (error) {
      console.error("Error al agregar el ingrediente:", error);
      alert("No se pudo agregar el ingrediente.");
    }
  };

  const handleDeleteIngredient = async (index) => {
    const ingredient = ingredients[index];
    try {
      await deleteIngredient(
        ingredient.id_MateriaPrima,
        ingredient.id_Producto
      );
      setIngredients(ingredients.filter((_, i) => i !== index));
      alert("Ingrediente eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar el ingrediente:", error);
      alert("No se pudo eliminar el ingrediente.");
    }
  };

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
    return <p className="loading">Cargando detalles del producto...</p>;
  }

  return (
    <div className="product-detail-container">
      {/* Menú lateral */}
      <div className="sidebar">
        <button onClick={() => setSelectedCard("producto")}>Producto</button>
        <button onClick={() => setSelectedCard("ingredientes")}>
          Ingredientes
        </button>
        <button onClick={() => setSelectedCard("receta")}>Receta</button>
        <button
          className="button-cancelar"
          onClick={() => navigate("/paneladmin")}
        >
          Cancelar
        </button>
      </div>

      <div className="cards-container">
        {/* Detalles del Producto */}
        {selectedCard === "producto" && (
          <div className="card-p">
            <h3>Detalles del Producto</h3>
            <div className="product-details">
              <form>
                <label>Nombre:</label>
                <input
                  type="text"
                  value={product.Nombre_Producto}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      Nombre_Producto: e.target.value,
                    })
                  }
                />
                <label>Precio:</label>
                <input
                  type="number"
                  value={product.precio_vta}
                  onChange={(e) =>
                    setProduct({ ...product, precio_vta: e.target.value })
                  }
                />
                <label>Porciones:</label>
                <input
                  type="number"
                  value={product.cant_porciones}
                  onChange={(e) =>
                    setProduct({ ...product, cant_porciones: e.target.value })
                  }
                />
                <label>Descripción:</label>
                <textarea
                  value={product.descripcion_producto}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      descripcion_producto: e.target.value,
                    })
                  }
                />
                <label>Categoría:</label>
                <select
                  value={product.p_categoria}
                  onChange={(e) =>
                    setProduct({ ...product, p_categoria: e.target.value })
                  }
                >
                  <option value="">Seleccione una categoria</option>
                  {categoriaTodas.map((cat) => (
                    <option key={cat.id_categoria} value={cat.id_categoria}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
                <button className="save-button" onClick={handleUpdateProduct}>
                  Guardar
                </button>
              </form>

              <div className="product-image">
                {productI.imagen && (
                  <img src={productI.imagen} alt={productI.Nombre_Producto} />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Ingredientes */}
        {selectedCard === "ingredientes" && (
          <div className="card-p">
            <h3>Ingredientes</h3>
            {ingredients.length === 0 ? (
              <p>No hay ingredientes asociados a este producto.</p>
            ) : (
              <table className="table-ingredients">
                <thead>
                  <tr>
                    <th>Cantidad</th>
                    <th>Unidades</th>
                    <th>Materia Prima</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredients.map((ingredient, index) => (
                    <tr key={index}>
                      <td>{ingredient.cantidad}</td>
                      <td>{ingredient.unidades}</td>
                      <td>{ingredient.Nombre_MP}</td>
                      <td>
                        <button onClick={() => handleDeleteIngredient(index)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="agregar-ingrediente">
              <h3>Agregar Ingrediente</h3>
              <form>
                <label>Materia Prima:</label>
                <select
                  value={newIngredient.id_MateriaPrima}
                  onChange={(e) =>
                    setNewIngredient({
                      ...newIngredient,
                      id_MateriaPrima: e.target.value,
                    })
                  }
                >
                  <option value="">Seleccione una materia prima</option>
                  {matPrimas.map((matPrima) => (
                    <option
                      key={matPrima.id_MateriaPrima}
                      value={matPrima.id_MateriaPrima}
                    >
                      {matPrima.Nombre_MP}
                    </option>
                  ))}
                </select>
                <label>Cantidad:</label>
                <input
                  type="number"
                  value={newIngredient.cantidad}
                  onChange={(e) =>
                    setNewIngredient({
                      ...newIngredient,
                      cantidad: e.target.value,
                    })
                  }
                />
                <label>Unidades:</label>
                <input
                  type="text"
                  value={newIngredient.unidades}
                  onChange={(e) =>
                    setNewIngredient({
                      ...newIngredient,
                      unidades: e.target.value,
                    })
                  }
                />
                <button onClick={handleAddIngredient}>
                  Agregar Ingrediente
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Pasos de la Receta */}
        {selectedCard === "receta" && (
          <div className="card-p">
            <h3>Pasos de la Receta</h3>
            {receta.length === 0 ? (
              <p>No hay pasos de receta asociados a este producto.</p>
            ) : (
              <table className="table-steps">
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
                        <button onClick={() => handleDeleteStep(index)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="receta-form">
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
                <button onClick={handleAddStep}>Agregar Paso</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
