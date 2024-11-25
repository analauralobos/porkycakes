package com.example.Compra;

import java.util.List;
import org.sql2o.Connection;
import com.example.db.Sql2oDAO;

public class CompraDAO {
    // Seleccionar todos los clientes
    public List<Compra> selectAll() {
        String selectAllSQL = "SELECT * FROM compra ;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(Compra.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }

    // Método para crear una nueva compra
    public boolean crearCompra(Compra compra) {
        String insertSQL = "INSERT INTO compra (id_Proveedor, id_MateriaPrima, fecha_compra, cantidad_compra, precio_compra) VALUES (:id_Proveedor, :id_MateriaPrima, :fecha_compra, :cantidad_compra, :precio_compra);";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(insertSQL)
                    .addParameter("id_Proveedor", compra.getId_Proveedor())
                    .addParameter("id_MateriaPrima", compra.getId_MateriaPrima())
                    .addParameter("fecha_compra", compra.getFecha_compra())
                    .addParameter("cantidad_compra", compra.getCantidad_compra())
                    .addParameter("precio_compra", compra.getPrecio_compra())
                    .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al registrar la compra: " + e.getMessage());
            return false;
        }
    }

    // Método para modificar una compra
    public boolean modificarCompra(Compra compra) {
        String updateSQL = "UPDATE compra SET id_Proveedor = :id_Proveedor, id_MateriaPrima = :id_MateriaPrima, fecha_compra = :fecha_compra, cantidad_compra = :cantidad_compra, precio_compra = :precio_compra WHERE id_Compra = :id_Compra;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(updateSQL)
                    .addParameter("id_Compra", compra.getId_Compra())
                    .addParameter("id_Proveedor", compra.getId_Proveedor())
                    .addParameter("id_MateriaPrima", compra.getId_MateriaPrima())
                    .addParameter("fecha_compra", compra.getFecha_compra())
                    .addParameter("cantidad_compra", compra.getCantidad_compra())
                    .addParameter("precio_compra", compra.getPrecio_compra())
                    .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al modificar la compra: " + e.getMessage());
            return false;
        }
    }

    // Método para eliminar una compra
    public boolean eliminarCompra(int id_Compra) {
        String deleteSQL = "DELETE FROM compra WHERE id_Compra = :id_Compra;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(deleteSQL)
                    .addParameter("id_Compra", id_Compra)
                    .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al eliminar la compra: " + e.getMessage());
            return false;
        }
    }
}
