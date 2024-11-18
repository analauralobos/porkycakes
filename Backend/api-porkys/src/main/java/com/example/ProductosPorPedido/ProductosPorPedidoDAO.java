package com.example.ProductosPorPedido;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.sql2o.Connection;

import com.example.db.Sql2oDAO;

public class ProductosPorPedidoDAO {
    // Seleccionar todos los productosXPedido
    public List<ProductosPorPedido> selectAll() {
        String selectAllSQL = "SELECT * FROM productosxpedido ;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(ProductosPorPedido.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }

    // Método para crear un nuevo producto por pedido
    public boolean crearProductoXPedido(ProductosPorPedido productosXPedido) {
        String insertSQL = "INSERT INTO productosxpedido (id_Pedido, id_Producto, cantidad_pedido, precio, observacion) VALUES (:id_Pedido, :id_Producto, :cantidad_pedido, :precio, :observacion);";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(insertSQL)
                    .addParameter("id_Pedido", productosXPedido.getId_Pedido())
                    .addParameter("id_Producto", productosXPedido.getId_Producto())
                    .addParameter("cantidad_pedido", productosXPedido.getCantidad_pedido())
                    .addParameter("precio", productosXPedido.getPrecio())
                    .addParameter("observacion", productosXPedido.getObservacion())
                    .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al registrar el producto por pedido: " + e.getMessage());
            return false;
        }
    }

    // Método para modificar un producto por pedido
    public boolean modificarProductoXPedido(ProductosPorPedido productosXPedido) {
        String updateSQL = "UPDATE productosxpedido SET id_Producto = :id_Producto, cantidad_pedido = :cantidad_pedido, precio = :precio, observacion = :observacion WHERE id_Pedido = :id_Pedido;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(updateSQL)
                    .addParameter("id_Pedido", productosXPedido.getId_Pedido())
                    .addParameter("id_Producto", productosXPedido.getId_Producto())
                    .addParameter("cantidad_pedido", productosXPedido.getCantidad_pedido())
                    .addParameter("precio", productosXPedido.getPrecio())
                    .addParameter("observacion", productosXPedido.getObservacion())
                    .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al modificar el producto por pedido: " + e.getMessage());
            return false;
        }
    }

    // Método para eliminar un producto por pedido
    public boolean eliminarProductoXPedido(int id_Pedido) {
        String deleteSQL = "DELETE FROM productosxpedido WHERE id_Pedido = :id_Pedido;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(deleteSQL)
                    .addParameter("id_Pedido", id_Pedido)
                    .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al eliminar el producto por pedido: " + e.getMessage());
            return false;
        }
    }

    public List<ProductosPorPedido> selectByIdPedido(int id_Pedido) {
        List<ProductosPorPedido> productosXpedido = new ArrayList<>();
        String query = "SELECT * FROM productosxpedido WHERE id_Pedido = :id_Pedido";  
        try (Connection con = Sql2oDAO.getSql2o().open()) {  
            productosXpedido = con.createQuery(query)
                    .addParameter("id_Pedido", id_Pedido)
                    .executeAndFetch(ProductosPorPedido.class);  
        } catch (Exception e) {
            System.err.println("Error al obtener los productos por pedido: " + e.getMessage());
        }
        return productosXpedido;
    }
    

}
