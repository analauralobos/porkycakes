package com.example.Ingrediente;

import java.util.List;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import spark.Route;

public class IngredienteController {
    private static final Gson gson = new Gson();
    private static final IngredienteDAO ingredienteDAO = new IngredienteDAO();

    // Obtener todas los ingredientes
    public static Route getTodosIngredientes = (Request request, Response response) -> {
        response.type("application/json");
        try {
            IngredienteDAO p = new IngredienteDAO();
            List<Ingrediente> res = p.selectAll();
            return new Gson().toJson(res);
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error controlador: " + e.getMessage());
        }
    };
    // Ver ingredientes por id del producto
    public static Route getIngredienteId = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int idProducto = Integer.parseInt(request.params(":id"));
            List<Ingrediente> ingredientes = ingredienteDAO.selectIngredienteId(idProducto);

            if (ingredientes != null && !ingredientes.isEmpty()) {
                response.status(200);
                return gson.toJson(ingredientes);
            } else {
                response.status(404);
                return gson.toJson("No se encontraron ingredientes para el producto especificado.");
            }
        } catch (NumberFormatException e) {
            response.status(400);
            return gson.toJson("ID de producto inválido");
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al seleccionar los ingredientes: " + e.getMessage());
        }
    };

    // Crear nuevo ingrediente
    public static Route crearIngrediente = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Ingrediente nuevoIngrediente = gson.fromJson(request.body(), Ingrediente.class);
            ingredienteDAO.crearIngrediente(nuevoIngrediente);
            response.status(201);
            return gson.toJson(nuevoIngrediente);
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al crear ingrediente: " + e.getMessage());
        }
    };

    // Modificar un ingrediente
    public static Route modificarIngrediente = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Ingrediente ingredienteModificado = gson.fromJson(request.body(), Ingrediente.class);
            boolean modificado = ingredienteDAO.modificarIngrediente(ingredienteModificado);

            if (modificado) {
                response.status(200);
                return gson.toJson("Ingrediente modificado exitosamente");
            } else {
                response.status(400);
                return gson.toJson("No se pudo modificar el ingrediente.");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al modificar ingrediente: " + e.getMessage());
        }
    };

    // Eliminar un ingrediente
public static Route eliminarIngrediente = (Request request, Response response) -> {
    response.type("application/json");
    try {
        // Obtener id_MateriaPrima e id_Producto desde la URL
        int idMateriaPrima = Integer.parseInt(request.params(":idMateriaPrima"));
        int idProducto = Integer.parseInt(request.params(":idProducto"));

        boolean eliminado = ingredienteDAO.eliminarIngrediente(idMateriaPrima, idProducto);

        if (eliminado) {
            response.status(200);
            return gson.toJson("Ingrediente eliminado exitosamente");
        } else {
            response.status(400);
            return gson.toJson("No se pudo eliminar el ingrediente.");
        }
    } catch (Exception e) {
        response.status(500);
        return gson.toJson("Error al eliminar ingrediente: " + e.getMessage());
    }
};


}
