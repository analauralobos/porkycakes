package com.example.Cliente;

import java.util.List;
import com.example.Security.AuthService;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import spark.Route;

public class ClienteController {

    private static final Gson gson = new Gson();
    private static final ClienteDAO clienteDAO = new ClienteDAO();

    // Obtener todos los clientes
    public static Route getTodosClientes = (Request request, Response response) -> {
        response.type("application/json");
        try {
            List<Cliente> clientes = clienteDAO.selectAll();
            return gson.toJson(clientes);
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error controlador: " + e.getMessage());
        }
    };

    // Verificar si el cliente existe con email y pass
    public static Route getIsCliente = (Request request, Response response) -> {
        response.type("application/json");
        String email = request.params(":email");
        String pass = request.params(":pass");

        try {
            Boolean existe = clienteDAO.authenticateCliente(email, pass);
            return gson.toJson(existe);
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error controlador: " + e.getMessage());
        }
    };

    // Crear nuevo cliente
    public static Route crearCliente = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Cliente nuevoCliente = gson.fromJson(request.body(), Cliente.class);
            boolean creado = clienteDAO.crearCliente(nuevoCliente);
            if (creado) {
                response.status(201);
                return gson.toJson(nuevoCliente);
            } else {
                response.status(400);
                return gson.toJson("Error al crear el cliente");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al crear cliente: " + e.getMessage());
        }
    };

    // Login de cliente
    public static Route loginCliente = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Cliente loginCliente = gson.fromJson(request.body(), Cliente.class);
            String token = AuthService.loginCliente(loginCliente.getEmail_cliente(), loginCliente.getPass_cliente());
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

    // Modificar cliente
    public static Route modificarCliente = (Request request, Response response) -> {
        response.type("application/json");
        try {
            Cliente clienteModificado = gson.fromJson(request.body(), Cliente.class);
            boolean modificado = clienteDAO.modificarCliente(clienteModificado);
            if (modificado) {
                response.status(200);
                return gson.toJson(clienteModificado);
            } else {
                response.status(404);
                return gson.toJson("Cliente no encontrado");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al modificar el cliente: " + e.getMessage());
        }
    };

    // Eliminar cliente
    public static Route eliminarCliente = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int idCliente = Integer.parseInt(request.params(":id_cliente"));
            boolean eliminado = clienteDAO.eliminarCliente(idCliente);
            if (eliminado) {
                response.status(204); // No Content
                return gson.toJson("Cliente eliminado");
            } else {
                response.status(404);
                return gson.toJson("Cliente no encontrado");
            }
        } catch (NumberFormatException e) {
            response.status(400);
            return gson.toJson("ID de cliente inválido");
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al eliminar el cliente: " + e.getMessage());
        }
    };

    // Obtener el nombre del cliente por id_cliente
    public static Route obtenerNombreClientePorId = (Request request, Response response) -> {
        response.type("application/json");
        
        try {
            int idCliente = Integer.parseInt(request.params(":id_Cliente"));
            String nombreCliente = clienteDAO.NombreClientePorId(idCliente);
            if (nombreCliente != null) {
                return gson.toJson(nombreCliente);
            } else {
                response.status(404);
                return gson.toJson("Cliente no encontrado");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error controlador: " + e.getMessage());
        }
        };
}
