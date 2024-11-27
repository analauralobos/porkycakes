package com.example.Producto;

import java.util.List;
import java.util.Map;

import org.sql2o.Connection;
import com.example.db.Sql2oDAO;

public class ProductoDAO {
    // Seleccionar todos los productos
    public List<Producto> selectAll() {
        String selectAllSQL = "SELECT * FROM producto ;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(Producto.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }

    // Método para seleccionar un producto por id
    public Producto selectProductoId(int id_Producto) {
        String selectSQL = "SELECT * FROM producto WHERE id_Producto = :id_Producto;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            Producto producto = con.createQuery(selectSQL)
                    .addParameter("id_Producto", id_Producto)
                    .executeAndFetchFirst(Producto.class);
            return producto;
        } catch (Exception e) {
            System.err.println("Error al seleccionar el producto: " + e.getMessage());
            return null;
        }
    }

    // Método para crear un nuevo producto PRODUCTODAO.JAVA
    public boolean crearProducto(Producto producto) {
        String insertSQL = "INSERT INTO producto (Nombre_Producto, precio_vta, cant_porciones, descripcion_producto, p_categoria, imagen) VALUES (:Nombre_Producto, :precio_vta, :cant_porciones, :descripcion_producto, :p_categoria, :imagen);";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(insertSQL)
                    .addParameter("Nombre_Producto", producto.getNombre_Producto())
                    .addParameter("precio_vta", producto.getPrecio_vta())
                    .addParameter("cant_porciones", producto.getCant_porciones())
                    .addParameter("descripcion_producto", producto.getDescripcion_producto())
                    .addParameter("p_categoria", producto.getP_categoria())
                    .addParameter("imagen", producto.getImagen())
                    .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al registrar el producto: " + e.getMessage());
            return false;
        }
    }

    // Método para modificar un producto
    public boolean modificarProducto(int idProducto, Producto producto) {
        String updateSQL = "UPDATE producto SET Nombre_Producto = :Nombre_Producto, precio_vta = :precio_vta, cant_porciones = :cant_porciones, descripcion_producto = :descripcion_producto, p_categoria = :p_categoria WHERE id_Producto = :id_Producto;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(updateSQL)
                    .addParameter("id_Producto", producto.getId_Producto())
                    .addParameter("Nombre_Producto", producto.getNombre_Producto())
                    .addParameter("precio_vta", producto.getPrecio_vta())
                    .addParameter("cant_porciones", producto.getCant_porciones())
                    .addParameter("descripcion_producto", producto.getDescripcion_producto())
                    .addParameter("p_categoria", producto.getP_categoria())
                    .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al modificar el producto: " + e.getMessage());
            return false;
        }
    }

    // Método para eliminar un producto
    public boolean eliminarProducto(int id_Producto) {
        String deleteSQL = "DELETE FROM producto WHERE id_Producto = :id_Producto;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(deleteSQL)
                    .addParameter("id_Producto", id_Producto)
                    .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al eliminar el producto: " + e.getMessage());
            return false;
        }
    }

    // Método para seleccionar productos por nombre de categoría
    public List<Producto> selectProductosPorNombreCategoria(String nombreCategoria) {
        String selectSQL = "SELECT p.* FROM producto p "
                + "JOIN categoria c ON p.p_categoria = c.id_categoria "
                + "WHERE c.nombre = :nombreCategoria;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectSQL)
                    .addParameter("nombreCategoria", nombreCategoria)
                    .executeAndFetch(Producto.class);
        } catch (Exception e) {
            System.err.println("Error al seleccionar productos por nombre de categoría: " + e.getMessage());
            return null;
        }
    }

    // Método para disminuir porciones de un producto
    public boolean disminuirPorcionesProducto(int id_Producto, int cant_porciones) {
        String disminuirSQL = "UPDATE producto SET cant_porciones = cant_porciones - :cant_porciones WHERE id_Producto = :id_Producto;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(disminuirSQL)
                    .addParameter("id_Producto", id_Producto)
                    .addParameter("cant_porciones", cant_porciones)
                    .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al disminuir la cantidad de producto: " + e.getMessage());
            return false;
        }
    }

    // Método para obtener porciones un producto
    public Integer getPorcionesProducto(int id_Producto) {
        String porcionesSQL = "SELECT cant_porciones FROM producto WHERE id_Producto = :id_Producto;"; // Añadido 'FROM
                                                                                                       // producto'
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            Integer cantPorciones = con.createQuery(porcionesSQL)
                    .addParameter("id_Producto", id_Producto)
                    .executeAndFetchFirst(Integer.class);
            return cantPorciones;
        } catch (Exception e) {
            System.err.println("Error al obtener porciones del producto: " + e.getMessage());
            return null;
        }
    }

    // Método para disminuir MP de un producto al ser comprado
    public boolean disminuirMPdeProducto(int id_Producto, float cantComprado) {
        // Primero, verificar que hay suficiente stock de cada materia prima
        String verificarStockSQL = "SELECT mp.id_MateriaPrima, mp.unidades, i.cantidad * :cantComprado AS cantidadNecesaria "
                +
                "FROM materia_prima mp " +
                "JOIN ingrediente i ON mp.id_MateriaPrima = i.id_MateriaPrima " +
                "WHERE i.id_Producto = :id_Producto;";

        try (Connection con = Sql2oDAO.getSql2o().open()) {
            // Ejecutar la consulta
            List<Map<String, Object>> materiales = con.createQuery(verificarStockSQL)
                    .addParameter("id_Producto", id_Producto)
                    .addParameter("cantComprado", cantComprado)
                    .executeAndFetchTable()
                    .asList();

            // Agregar depuración para ver los resultados
            System.out.println("Resultados de la consulta:");
            for (Map<String, Object> material : materiales) {
                System.out.println("ID Materia Prima: " + material.get("id_MateriaPrima"));
                System.out.println("Unidades: " + material.get("unidades"));
                System.out.println("Cantidad: " + material.get("cantidad"));
                System.out.println("Cantidad Necesaria: " + material.get("cantidadNecesaria"));
            }

            // Iterar sobre los materiales para verificar si hay suficiente stock
            for (Map<String, Object> material : materiales) {
                // Asegurarse de que los valores no sean nulos
                Object unidadesDisponiblesObj = material.get("unidades");
                Object cantidadObj = material.get("cantidad");
                Object cantidadNecesariaObj = material.get("cantidadNecesaria");

                // Depuración para ver los valores
                System.out.println("Unidad disponible: " + unidadesDisponiblesObj);
                System.out.println("Cantidad: " + cantidadObj);
                System.out.println("Cantidad necesaria: " + cantidadNecesariaObj);

                // Si alguna de las propiedades es null, mostramos un mensaje de error
                if (unidadesDisponiblesObj == null || cantidadNecesariaObj == null) {
                    System.err.println("Faltan datos de stock o cantidad necesaria para la materia prima ID "
                            + material.get("id_MateriaPrima"));
                    return false;
                }

                // Convertir a tipos apropiados y comprobar la lógica
                try {
                    float unidadesDisponibles = Float.parseFloat(unidadesDisponiblesObj.toString());
                    float cantidadNecesaria = Float.parseFloat(cantidadNecesariaObj.toString());

                    if (unidadesDisponibles < cantidadNecesaria) {
                        System.err.println(
                                "No hay suficiente stock de la materia prima ID " + material.get("id_MateriaPrima") +
                                        ". Necesitas " + cantidadNecesaria + " y solo hay " + unidadesDisponibles);
                        return false;
                    }
                } catch (NumberFormatException e) {
                    System.err.println("Error al convertir valores a números: " + e.getMessage());
                    return false; // Si hay un problema con la conversión, retornamos false
                }
            }

            // Si pasamos todas las verificaciones, disminuimos el stock
            String disminuirSQL = "UPDATE materia_prima mp " +
                    "JOIN ingrediente i ON mp.id_MateriaPrima = i.id_MateriaPrima " +
                    "SET mp.unidades = mp.unidades - (i.cantidad * :cantComprado) " +
                    "WHERE i.id_Producto = :id_Producto;";

            // Ejecutar la disminución de las unidades
            con.createQuery(disminuirSQL)
                    .addParameter("id_Producto", id_Producto)
                    .addParameter("cantComprado", cantComprado)
                    .executeUpdate();

            return true; // Si todo es exitoso, retornamos true
        } catch (Exception e) {
            System.err.println("Error al disminuir la cantidad de MP: " + e.getMessage());
            return false; // En caso de error
        }

    }

}
