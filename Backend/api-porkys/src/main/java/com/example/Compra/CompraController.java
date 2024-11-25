package com.example.Compra;

import java.util.List;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import spark.Route;

public class CompraController {
    private static final Gson gson = new Gson();
    private static final CompraDAO compraDAO = new CompraDAO();
    // Obtener todas las compras
    public static Route getTodasCompras = (Request request, Response response) -> {
        response.type("application/json");
        try {
            CompraDAO p = new CompraDAO();
            List<Compra> res = p.selectAll();
            return new Gson().toJson(res);
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error controlador: " + e.getMessage());
        }
    };
    // Crear nueva compra
    public static Route crearCompra = (request, response) -> {
        response.type("application/json");
        try {
            Compra nuevaCompra = gson.fromJson(request.body(), Compra.class);
            compraDAO.crearCompra(nuevaCompra);
            response.status(201);
            return gson.toJson(nuevaCompra);
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al crear la compra: " + e.getMessage());
        }
    };

    // Modificar una compra
    public static Route modificarCompra = (request, response) -> {
        response.type("application/json");
        try {
            Compra compraModificada = gson.fromJson(request.body(), Compra.class);
            if (compraDAO.modificarCompra(compraModificada)) {
                response.status(200);
                return gson.toJson(compraModificada);
            } else {
                response.status(404);
                return gson.toJson("Compra no encontrada");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al modificar la compra: " + e.getMessage());
        }
    };

    // Eliminar una compra
    public static Route eliminarCompra = (request, response) -> {
        response.type("application/json");
        try {
            int id_Compra = Integer.parseInt(request.params(":id_compra"));
            if (compraDAO.eliminarCompra(id_Compra)) {
                response.status(204);
                return gson.toJson("Compra eliminada");
            } else {
                response.status(404);
                return gson.toJson("Compra no encontrada");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al eliminar la compra: " + e.getMessage());
        }
    };
}
