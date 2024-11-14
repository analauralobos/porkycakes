package com.example.PasosReceta;

import java.util.List;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import spark.Route;

public class PasosRecetaController {
    private static final Gson gson = new Gson();
    private static final PasosRecetaDAO pasosDAO = new PasosRecetaDAO();

    // Obtener todos los pasos
    public static Route getTodosPasosRecetas = (Request request, Response response) -> {
        response.type("application/json");
        try {
            PasosRecetaDAO p = new PasosRecetaDAO();
            List<PasosReceta> res = p.selectAll();
            return new Gson().toJson(res);
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error controlador: " + e.getMessage());
        }
    };

    // Ver pasos receta por id del producto
    public static Route getPasosRecetasId = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int idProducto = Integer.parseInt(request.params(":id"));
            List<PasosReceta> receta = pasosDAO.selectRecetaId(idProducto);

            if (receta != null && !receta.isEmpty()) {
                response.status(200);
                return gson.toJson(receta);
            } else {
                response.status(404);
                return gson.toJson("No se encontraron la receta para el producto especificado.");
            }
        } catch (NumberFormatException e) {
            response.status(400);
            return gson.toJson("ID de producto inválido");
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al seleccionar los pasos: " + e.getMessage());
        }
    };

    // Crear nuevo paso de receta
    public static Route crearPasos = (Request request, Response response) -> {
        response.type("application/json");
        try {
            PasosReceta nuevoP = gson.fromJson(request.body(), PasosReceta.class);
            pasosDAO.crearPasos(nuevoP);
            response.status(201);
            return gson.toJson(nuevoP);
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al crear materia prima: " + e.getMessage());
        }
    };

    // Controlador para eliminar un paso
    public static Route eliminarPaso = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int id_Producto = Integer.parseInt(request.params(":id_Producto"));
            int paso_nro = Integer.parseInt(request.params(":paso_nro"));
            if (pasosDAO.eliminarPaso(id_Producto, paso_nro)) {
                response.status(200); // OK
                return gson.toJson("Paso eliminado exitosamente.");
            } else {
                response.status(404); // Not Found
                return gson.toJson("Paso no encontrado.");
            }
        } catch (Exception e) {
            response.status(500); // Internal Server Error
            return gson.toJson("Error al eliminar el paso: " + e.getMessage());
        }
    };

    // Controlador para modificar un paso
    public static Route modificarPaso = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int id_Producto = Integer.parseInt(request.params(":id_Producto"));
            int paso_nro = Integer.parseInt(request.params(":paso_nro"));
            PasosReceta pasosReceta = gson.fromJson(request.body(), PasosReceta.class);
            pasosReceta.setId_Producto(id_Producto);
            pasosReceta.setPaso_nro(paso_nro);
            if (pasosDAO.modificarPaso(pasosReceta)) {
                response.status(200); // OK
                return gson.toJson("Paso modificado exitosamente.");
            } else {
                response.status(404); // Not Found
                return gson.toJson("Paso no encontrado.");
            }
        } catch (Exception e) {
            response.status(500); // Internal Server Error
            return gson.toJson("Error al modificar el paso: " + e.getMessage());
        }
    };

}
