package com.example.Pedido;

import java.util.List;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import spark.Route;

public class PedidoController {
    private static final Gson gson = new Gson();
    private static final PedidoDAO pedidoDAO = new PedidoDAO();

    // Obtener todos los pedidos
    public static Route getTodosPedidos = (Request request, Response response) ->
    {
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
    // Crear nuevo pedido
    public static Route crearPedido = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Pedido nuevoPedido = gson.fromJson(request.body(), Pedido.class);
            pedidoDAO.crearPedido(nuevoPedido);
            response.status(201);
            return gson.toJson(nuevoPedido);
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al crear pedido: " + e.getMessage());
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

}
