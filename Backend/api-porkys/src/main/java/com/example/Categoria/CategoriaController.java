package com.example.Categoria;

import java.util.List;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import spark.Route;

public class CategoriaController {
    private static final Gson gson = new Gson();
    private static final CategoriaDAO categoriaDAO = new CategoriaDAO();

    // Obtener todas las categorías
    public static Route getTodasCategorias = (Request request, Response response) -> {
        response.type("application/json");
        try {
            List<Categoria> categorias = categoriaDAO.selectAllCategorias();
            return gson.toJson(categorias);
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al obtener categorías: " + e.getMessage());
        }
    };

    // Obtener una categoría por nombre (sensible a mayúsculas)
    public static Route getCategoriaPorNombre = (Request request, Response response) -> {
        response.type("application/json");
        try {
            String nombre = request.params(":nombre");
            Categoria categoria = categoriaDAO.obtenerCategoriaPorNombre(nombre);
            if (categoria != null) {
                return gson.toJson(categoria);
            } else {
                response.status(404);
                return gson.toJson("Categoría no encontrada");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al obtener la categoría: " + e.getMessage());
        }
    };
        // Obtener una categoría por id 
        public static Route getCategoriaPorId = (Request request, Response response) -> {
            response.type("application/json");
            try {
                int id_categoria = Integer.parseInt(request.params(":id_categoria"));
                Categoria categoria = categoriaDAO.obtenerCategoriaPorId(id_categoria);
                if (categoria != null) {
                    return gson.toJson(categoria);
                } else {
                    response.status(404);
                    return gson.toJson("Categoría no encontrada");
                }
            } catch (Exception e) {
                response.status(500);
                return gson.toJson("Error al obtener la categoría: " + e.getMessage());
            }
        };
}
