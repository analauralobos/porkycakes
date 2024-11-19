package com.example.Pedido;

import java.util.List;
import java.util.Map;

import com.example.Producto.Producto;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import spark.Route;

public class PedidoController {
    private static final Gson gson = new Gson();
    private static final PedidoDAO pedidoDAO = new PedidoDAO();

    // Obtener todos los pedidos
    public static Route getTodosPedidos = (Request request, Response response) -> {
        response.type("application/json");
        try {
            PedidoDAO p = new PedidoDAO();
            List<Pedido> res = p.selectAll();
            return new Gson().toJson(res);
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error controlador: " + e.getMessage());
        }
    };
    public static Route crearPedido = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Pedido nuevoPedido = gson.fromJson(request.body(), Pedido.class);
            int idPedido = pedidoDAO.crearPedido(nuevoPedido); // Obtén el ID generado
            response.status(201);
            return gson.toJson(Map.of(
                    "id_Pedido", idPedido,
                    "mensaje", "Pedido creado exitosamente"));
        } catch (Exception e) {
            response.status(500);
            return gson.toJson(Map.of(
                    "error", "Error al crear pedido: " + e.getMessage()));
        }
    };

    // Modificar un pedido
    public static Route modificarPedido = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Pedido pedidoModificado = gson.fromJson(request.body(), Pedido.class);
            if (pedidoDAO.modificarPedido(pedidoModificado)) {
                response.status(200);
                return gson.toJson(pedidoModificado);
            } else {
                response.status(404);
                return gson.toJson("Pedido no encontrado");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al modificar el pedido: " + e.getMessage());
        }
    };

    // Eliminar un pedido
    public static Route eliminarPedido = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int id_Pedido = Integer.parseInt(request.params(":id"));
            if (pedidoDAO.eliminarPedido(id_Pedido)) {
                response.status(204);
                return gson.toJson("Pedido eliminado");
            } else {
                response.status(404);
                return gson.toJson("Pedido no encontrado");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al eliminar el pedido: " + e.getMessage());
        }
    };

    // Obtener pedidos por id_Cliente // PedidoController.java
    public static Route getPedidosPorCliente = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int idCliente = Integer.parseInt(request.params(":id_Cliente"));

            List<Pedido> pedidos = pedidoDAO.buscarPedidoPorIdCliente(idCliente);
            if (pedidos != null && !pedidos.isEmpty()) {
                return gson.toJson(pedidos);
            } else {
                response.status(404);
                return gson.toJson("No se encontraron pedidos para este cliente");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al obtener los pedidos del cliente: " + e.getMessage());
        }
    };

    // Obtener el nombre del cliente por id_Cliente
    public static Route getNombrexPedido = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int idCliente = Integer.parseInt(request.params(":id_Cliente"));

            // Llamamos al método getNombrexPedido del DAO
            String nombreCliente = pedidoDAO.getNombrexPedido(idCliente);
            if (nombreCliente != null) {
                return gson.toJson(nombreCliente);
            } else {
                response.status(404);
                return gson.toJson("Cliente no encontrado");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al obtener el nombre del cliente: " + e.getMessage());
        }
    };

    // Obtener productos por id_Pedido
    public static Route getProductosPorPedido = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int idPedido = Integer.parseInt(request.params(":id_Pedido"));

            // Llamamos al método getProductoxPedido del DAO
            List<ProductoPedido> productos = pedidoDAO.getProductoxPedido(idPedido); // Cambia el tipo a ProductoPedido
            if (productos != null && !productos.isEmpty()) {
                return gson.toJson(productos); // Serializa la lista de ProductoPedido
            } else {
                response.status(404);
                return gson.toJson("No se encontraron productos para este pedido");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al obtener los productos del pedido: " + e.getMessage());
        }
    };

}
