import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../services/ProductoService";
import { getIngredientById } from "../../services/IngredienteService";
import { getMatPrimaById } from "../../services/MateriaPrimaService";
import { getPasoRecetaById } from "../../services/RecetaService";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [receta, setReceta] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const fetchReceta = async () => {
      try {
        const data = await getPasoRecetaById(id);
        setReceta(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching receta details:", error);
      }
    };

    const fetchIngredients = async () => {
      try {
        const ingredientsData = await getIngredientById(id);
        const ingredientsWithNames = await Promise.all(
          ingredientsData.map(async (ingredient) => {
            const materiaPrima = await getMatPrimaById(ingredient.id_MateriaPrima);
            return {
              ...ingredient,
              Nombre_MP: materiaPrima.Nombre_MP,
            };
          })
        );
        setIngredients(ingredientsWithNames);
      } catch (error) {
        console.error("Error fetching ingredients details:", error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchProduct(), fetchIngredients(), fetchReceta()]);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, product);
      alert("Producto actualizado con éxito");
      navigate("/productos");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Error al actualizar el producto, por favor intenta nuevamente.");
    }
  };

  if (loading) {
    return <p>Cargando detalles del producto y receta...</p>;
  }

  return (
    <div>
      <h2>Detalles de Producto: {product.Nombre_Producto}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Producto: {product.Nombre_Producto}</label>
        </div>
        <div>
          <label>Precio de Venta: {product.precio_vta}</label>
        </div>
        <div>
          <label>Cantidad de Porciones: {product.cant_porciones}</label>
        </div>
        <div>
          <label>Descripción: {product.descripcion_producto}</label>
        </div>
        <div>
          <label>Ingredientes:</label>
          <ul>
            {ingredients.map((ingredient) => (
              <li key={ingredient.id_MateriaPrima}>
                {`${ingredient.cantidad} ${ingredient.unidades} - ${ingredient.Nombre_MP}`}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label>Receta:</label>
          <ul>
            {receta.map((preceta) => (
              <li key={`${preceta.id_Producto}-${preceta.paso_nro}`}>
                {`Paso ${preceta.paso_nro}: ${preceta.descripcion}`}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Actualizar Producto</button>
      </form>
    </div>
  );
};

export default ProductDetail;
