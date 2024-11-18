package com.example.ProductosPorPedido;

import java.util.List;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import spark.Route;

public class ProductosPorPedidoController {
    private static final Gson gson = new Gson();
    private static final ProductosPorPedidoDAO productosXPedidoDAO = new ProductosPorPedidoDAO();
    // Obtener todos los productosXpedido
    public static Route getTodosProductosXpedido = (Request request, Response response) -> {
        response.type("application/json");
        try {
            ProductosPorPedidoDAO p = new ProductosPorPedidoDAO();
            List<ProductosPorPedido> res = p.selectAll();
            return new Gson().toJson(res);
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error controlador: " + e.getMessage());
        }
    };

    // Crear nuevo producto por pedido
    public static Route crearProductoXPedido = (request, response) -> {
        response.type("application/json");
        try {
            ProductosPorPedido nuevoProductoXPedido = gson.fromJson(request.body(), ProductosPorPedido.class);
            productosXPedidoDAO.crearProductoXPedido(nuevoProductoXPedido);
            response.status(201);
            return gson.toJson(nuevoProductoXPedido);
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al crear el producto por pedido: " + e.getMessage());
        }
    };

    // Modificar un producto por pedido
    public static Route modificarProductoXPedido = (request, response) -> {
        response.type("application/json");
        try {
            ProductosPorPedido productoXPedidoModificado = gson.fromJson(request.body(), ProductosPorPedido.class);
            if (productosXPedidoDAO.modificarProductoXPedido(productoXPedidoModificado)) {
                response.status(200);
                return gson.toJson(productoXPedidoModificado);
            } else {
                response.status(404);
                return gson.toJson("Producto por pedido no encontrado");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al modificar el producto por pedido: " + e.getMessage());
        }
    };

    // Eliminar un producto por pedido
    public static Route eliminarProductoXPedido = (request, response) -> {
        response.type("application/json");
        try {
            int id_Pedido = Integer.parseInt(request.params(":id"));
            if (productosXPedidoDAO.eliminarProductoXPedido(id_Pedido)) {
                response.status(204);
                return gson.toJson("Producto por pedido eliminado");
            } else {
                response.status(404);
                return gson.toJson("Producto por pedido no encontrado");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al eliminar el producto por pedido: " + e.getMessage());
        }
    };

    // Obtener productos por id_Pedido
    public static Route getProductosXpedidoPorId = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int id_Pedido = Integer.parseInt(request.params(":id"));
            List<ProductosPorPedido> res = productosXPedidoDAO.selectByIdPedido(id_Pedido);
            return gson.toJson(res);
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error controlador: " + e.getMessage());
        }
    };

}
