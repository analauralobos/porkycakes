package com.example.Categoria;

import java.util.List;
import org.sql2o.Connection;
import com.example.db.Sql2oDAO;

public class CategoriaDAO {

    // Método para seleccionar todas las categorías
    public List<Categoria> selectAllCategorias() {
        String selectAllSQL = "SELECT * FROM categoria;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(Categoria.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }

    // Método para obtener una categoría por nombre, diferenciando mayúsculas
    public Categoria obtenerCategoriaPorNombre(String nombre) {
        String selectByNameSQL = "SELECT * FROM categoria WHERE nombre = :nombre;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectByNameSQL)
                    .addParameter("nombre", nombre)
                    .executeAndFetchFirst(Categoria.class);
        } catch (Exception e) {
            System.err.println("Error al obtener la categoría por nombre: " + e.getMessage());
            return null;
        }
    }


    public Categoria obtenerCategoriaPorId(int id_categoria) {
        String selectSQL = "SELECT * FROM categoria WHERE id_categoria = :id_categoria;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            Categoria categoria = con.createQuery(selectSQL)
                    .addParameter("id_categoria", id_categoria)
                    .executeAndFetchFirst(Categoria.class);
            return categoria;
        } catch (Exception e) {
            System.err.println("Error al obtener la categoría por id: " + e.getMessage());
            return null;
        }
    }
}
