package com.example.Administrador;

import java.util.List;

import com.example.Security.AuthService;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import spark.Route;

public class AdministradorController {
    private static final Gson gson = new Gson();
    private static final AdministradorDAO adminDAO = new AdministradorDAO();

    // Obtener todos los administradores
    public static Route getTodosAdmins = (Request request, Response response) -> {
        response.type("application/json");
        try {
            List<Administrador> res = adminDAO.selectAll();
            return gson.toJson(res);
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error controlador: " + e.getMessage());
        }
    };

    public static Route getIsAdmin = (Request request, Response response) -> {
        response.type("application/json");
        String email = request.params(":email");
        String pass = request.params(":pass");

        try {
            Boolean res = adminDAO.authenticateAdmin(email, pass); // Llamada al DAO con email y pass
            return gson.toJson(res); // Retorna true o false
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error controlador: " + e.getMessage());
        }
    };
   
    // Crear nuevo administrador
    public static Route crearAdmin = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Administrador nuevoAdmin = gson.fromJson(request.body(), Administrador.class);
            if (adminDAO.crearAdmin(nuevoAdmin)) { // Verifica si se creó correctamente
                response.status(201); // Created
                return gson.toJson(nuevoAdmin);
            } else {
                response.status(400); // Bad Request
                return gson.toJson("Error al crear administrador. Puede que el ID ya exista.");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al crear administrador: " + e.getMessage());
        }
    };

    // Login de administrador
    public static Route loginAdmin = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Administrador loginAdmin = gson.fromJson(request.body(), Administrador.class);
            String token = AuthService.loginAdmin(loginAdmin.getEmail(), loginAdmin.getPassword());
            if (token != null) {
                response.status(200);
                return gson.toJson("Token: " + token);
            } else {
                response.status(401);
                return gson.toJson("Credenciales inválidas");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error en el login: " + e.getMessage());
        }
    };

    // Modificar administrador
    public static Route modificarAdmin = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Administrador adminModificado = gson.fromJson(request.body(), Administrador.class);
            if (adminDAO.modificarAdmin(adminModificado)) { // Verifica si se modificó correctamente
                response.status(200); // OK
                return gson.toJson(adminModificado);
            } else {
                response.status(404); // Not Found
                return gson.toJson("Administrador no encontrado.");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al modificar administrador: " + e.getMessage());
        }
    };

    // Eliminar administrador
    public static Route eliminarAdmin = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int idAdmin = Integer.parseInt(request.params(":id")); // Suponiendo que el ID viene en la URL
            if (adminDAO.eliminarAdmin(idAdmin)) { // Verifica si se eliminó correctamente
                response.status(204); // No Content
                return gson.toJson("Administrador eliminado correctamente.");
            } else {
                response.status(404); // Not Found
                return gson.toJson("Administrador no encontrado.");
            }
        } catch (NumberFormatException e) {
            response.status(400); // Bad Request
            return gson.toJson("ID inválido.");
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al eliminar administrador: " + e.getMessage());
        }
    };
}
