package com.example.Ingrediente;

import java.util.List;
import org.sql2o.Connection;
import com.example.db.Sql2oDAO;

public class IngredienteDAO {
    // Seleccionar todos los ingredientes
    public List<Ingrediente> selectAll() {
        String selectAllSQL = "SELECT * FROM ingrediente ;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(Ingrediente.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }

    // Método para seleccionar un ingrediente por id
    public List<Ingrediente> selectIngredienteId(int id_Producto) {
        String selectSQL = "SELECT * FROM ingrediente WHERE id_Producto = :id_Producto;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {            
            List<Ingrediente> ingredientes = con.createQuery(selectSQL)
                    .addParameter("id_Producto", id_Producto)
                    .executeAndFetch(Ingrediente.class);
            return ingredientes;
        } catch (Exception e) {
            System.err.println("Error al seleccionar los ingredientes: " + e.getMessage());
            return null;
        }
    }

    // Método para registrar un nuevo ingrediente
    public boolean crearIngrediente(Ingrediente ingrediente) {
        String insertSQL = "INSERT INTO ingrediente (id_MateriaPrima, id_Producto, cantidad, unidades) VALUES (:id_MateriaPrima, :id_Producto, :cantidad, :unidades);";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(insertSQL)
                    .addParameter("id_MateriaPrima", ingrediente.getId_MateriaPrima())
                    .addParameter("id_Producto", ingrediente.getId_Producto())
                    .addParameter("cantidad", ingrediente.getCantidad())
                    .addParameter("unidades", ingrediente.getUnidades())
                    .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al registrar el ingrediente: " + e.getMessage());
            return false;
        }
    }

    // Método para modificar un ingrediente existente
    public boolean modificarIngrediente(Ingrediente ingrediente) {
        String updateSQL = "UPDATE ingrediente SET cantidad = :cantidad, unidades = :unidades WHERE id_MateriaPrima = :id_MateriaPrima AND id_Producto = :id_Producto;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(updateSQL)
                    .addParameter("id_MateriaPrima", ingrediente.getId_MateriaPrima())
                    .addParameter("id_Producto", ingrediente.getId_Producto())
                    .addParameter("cantidad", ingrediente.getCantidad())
                    .addParameter("unidades", ingrediente.getUnidades())
                    .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al modificar el ingrediente: " + e.getMessage());
            return false;
        }
    }

// Método para eliminar un ingrediente existente
public boolean eliminarIngrediente(int idMateriaPrima, int idProducto) {
    String deleteSQL = "DELETE FROM ingrediente WHERE id_MateriaPrima = :idMateriaPrima AND id_Producto = :idProducto;";
    try (Connection con = Sql2oDAO.getSql2o().open()) {
        con.createQuery(deleteSQL)
            .addParameter("idMateriaPrima", idMateriaPrima)
            .addParameter("idProducto", idProducto)
            .executeUpdate();
        return true;
    } catch (Exception e) {
        System.err.println("Error al eliminar el ingrediente: " + e.getMessage());
        return false;
    }
}


}
