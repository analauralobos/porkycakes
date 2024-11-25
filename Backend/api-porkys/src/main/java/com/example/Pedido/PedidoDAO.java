package com.example.Pedido;

import java.math.BigInteger;
import java.util.List;

import org.sql2o.Connection;

import com.example.Producto.Producto;
import com.example.db.Sql2oDAO;

public class PedidoDAO {

    // Seleccionar todos los pedidos
    public List<Pedido> selectAll() {
        String selectAllSQL = "SELECT * FROM pedido ;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(Pedido.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }

    public int crearPedido(Pedido pedido) {
        String insertSQL = "INSERT INTO pedido (id_Cliente, fecha_pedido, fecha_entrega, lugar_entrega, id_Estado, id_TipoPago) VALUES (:id_Cliente, :fecha_pedido, :fecha_entrega, :lugar_entrega, :id_Estado, :id_TipoPago);";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            Object key = con.createQuery(insertSQL, true) // `true` para recuperar la clave generada
                    .addParameter("id_Cliente", pedido.getId_Cliente())
                    .addParameter("fecha_pedido", pedido.getFecha_pedido())
                    .addParameter("fecha_entrega", pedido.getFecha_entrega())
                    .addParameter("lugar_entrega", pedido.getLugar_entrega())
                    .addParameter("id_Estado", pedido.getId_Estado())
                    .addParameter("id_TipoPago", pedido.getId_TipoPago())
                    .executeUpdate()
                    .getKey();

            // Convertir la clave a int (manejar BigInteger si es necesario)
            if (key instanceof BigInteger) {
                return ((BigInteger) key).intValue();
            } else {
                return (int) key; // Si ya es Integer
            }
        } catch (Exception e) {
            System.err.println("Error al registrar el pedido: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    // Método para modificar un pedido
    public boolean modificarPedido(Pedido pedido) {
        String updateSQL = "UPDATE pedido SET id_Cliente = :id_Cliente, fecha_pedido = :fecha_pedido, fecha_entrega = :fecha_entrega, lugar_entrega = :lugar_entrega, id_Estado = :id_Estado, id_TipoPago = :id_TipoPago WHERE id_Pedido = :id_Pedido;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(updateSQL)
                    .addParameter("id_Pedido", pedido.getId_Pedido())
                    .addParameter("id_Cliente", pedido.getId_Cliente())
                    .addParameter("fecha_pedido", pedido.getFecha_pedido())
                    .addParameter("fecha_entrega", pedido.getFecha_entrega())
                    .addParameter("lugar_entrega", pedido.getLugar_entrega())
                    .addParameter("id_Estado", pedido.getId_Estado())
                    .addParameter("id_TipoPago", pedido.getId_TipoPago())
                    .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al modificar el pedido: " + e.getMessage());
            return false;
        }
    }

    public boolean eliminarPedido(int id_Pedido) {
        String deleteDetallesSQL = "DELETE FROM productosxpedido WHERE id_Pedido = :id_Pedido;";
        String deleteSQL = "DELETE FROM pedido WHERE id_Pedido = :id_Pedido;";
    
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            // Primero eliminar los productos asociados al pedido
            con.createQuery(deleteDetallesSQL)
               .addParameter("id_Pedido", id_Pedido)
               .executeUpdate();
            
            // Luego eliminar el pedido
            con.createQuery(deleteSQL)
               .addParameter("id_Pedido", id_Pedido)
               .executeUpdate();
            
            return true;
        } catch (Exception e) {
            System.err.println("Error al eliminar el pedido: " + e.getMessage());
            return false;
        }
    }
    

    // Método para buscar pedidos por id_cliente // PedidoDAO.java
    public List<Pedido> buscarPedidoPorIdCliente(int id_Cliente) {
        String selectSQL = "SELECT * FROM pedido WHERE id_Cliente = :id_Cliente;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectSQL)
                    .addParameter("id_Cliente", id_Cliente)
                    .executeAndFetch(Pedido.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }

    // Devuelve nombre del cliente que hizo tal pedido
    public String getNombrexPedido(int id_Cliente) {
        String selectSQL = "SELECT cliente.Nombre_Cliente FROM cliente " +
                "INNER JOIN pedido ON cliente.id_cliente = pedido.id_cliente " +
                "WHERE pedido.id_cliente = :id_cliente;";

        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectSQL)
                    .addParameter("id_cliente", id_Cliente)
                    .executeScalar(String.class);
        } catch (Exception e) {
            System.err.println("Error al obtener el nombre del cliente: " + e.getMessage());
            return null;
        }
    }

    // Devuelve el producto y la cantidad pedida del mismo
    public List<ProductoPedido> getProductoxPedido(int id_Pedido) {
        String selectSQL = "SELECT producto.Nombre_Producto, " +
                "productosxpedido.cantidad_pedido " +
                "FROM pedido " +
                "INNER JOIN productosxpedido ON pedido.id_Pedido = productosxpedido.id_Pedido " +
                "INNER JOIN producto ON productosxpedido.id_Producto = producto.id_Producto " +
                "WHERE pedido.id_Pedido = :id_Pedido;";

        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectSQL)
                    .addParameter("id_Pedido", id_Pedido)
                    .executeAndFetch(ProductoPedido.class); // Cambia el tipo
        } catch (Exception e) {
            System.err.println("Error al obtener los productos del pedido: " + e.getMessage());
            return null;
        }
    }

    public boolean modificarEstado(Pedido pedido) {
        String updateSQL = "UPDATE pedido SET id_Estado = :id_Estado WHERE id_Pedido = :id_Pedido;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            int rowsUpdated = con.createQuery(updateSQL)
                    .addParameter("id_Pedido", pedido.getId_Pedido())
                    .addParameter("id_Estado", pedido.getId_Estado())
                    .executeUpdate()
                    .getResult(); // Devuelve el número de filas afectadas
            return rowsUpdated > 0;
        } catch (Exception e) {
            System.err.println("Error al modificar el estado del pedido: " + e.getMessage());
            return false;
        }
    }

}
