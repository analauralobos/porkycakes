package com.example.Usuario;

import com.example.Cliente.Cliente;
import com.example.Cliente.ClienteDAO;

import java.util.Optional;

import com.example.Administrador.Administrador;
import com.example.Administrador.AdministradorDAO;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import spark.Request;
import spark.Response;
import spark.Route;

public class UsuarioController {
    private static final Gson gson = new Gson();
    private static final AdministradorDAO adminDAO = new AdministradorDAO();
    private static final ClienteDAO clienteDAO = new ClienteDAO();

    public static Route login = (Request request, Response response) -> {
        response.type("application/json");

        // Obtener el email y la contraseña desde el cuerpo de la solicitud (POST)
        JsonObject credentials = JsonParser.parseString(request.body()).getAsJsonObject();
        String email = credentials.get("email").getAsString();
        String pass = credentials.get("password").getAsString();

        try {
            // Verificar si el usuario es un administrador
            if (adminDAO.authenticateAdmin(email, pass)) {
                String token = generateToken(email, "admin");
                Optional<Administrador> admin = adminDAO.buscarPorEmail(email);
                if (admin.isPresent()) {
                    Long id = admin.get().id_administrador;
                    return gson.toJson(new LoginResponse("admin", token, id));
                }
            }
            // Verificar si el usuario es un cliente
            else if (clienteDAO.authenticateCliente(email, pass)) {
                String token = generateToken(email, "cliente");
                Optional<Cliente> cliente = clienteDAO.buscarPorEmail(email);
                if (cliente.isPresent()) {
                    Long id = cliente.get().id_Cliente; 
                    return gson.toJson(new LoginResponse("cliente", token, id));
                }
            }
            // Si no es ni administrador ni cliente
            response.status(401); // Credenciales inválidas
            return gson.toJson("Credenciales inválidas");
        } catch (Exception e) {
            response.status(500); // Error en el servidor
            return gson.toJson("Error en el login: " + e.getMessage());
        }
        
    };

    // Generación de un token de autenticación (simulado, en producción usar JWT)
    private static String generateToken(String email, String role) {
        // Aquí puedes generar un JWT real, este es solo un ejemplo simple
        return "dummyTokenFor_" + role + "_" + email; // Este es un token estático solo para ejemplo
    }

    // Clase auxiliar para la respuesta del login
    public static class LoginResponse {
        String role;
        String token;
        Long id_persona;

        LoginResponse(String role, String token, Long id_persona) {
            this.role = role;
            this.token = token;
            this.id_persona = id_persona;
        }
    }
}
