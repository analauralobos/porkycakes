package com.example.Usuario;

import com.example.Cliente.Cliente;
import com.example.Cliente.ClienteDAO;
import com.example.Administrador.Administrador;
import com.example.Administrador.AdministradorDAO;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import spark.Request;
import spark.Response;
import spark.Route;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.Optional;

public class UsuarioController {

    private static final Gson gson = new Gson();
    private static final AdministradorDAO adminDAO = new AdministradorDAO();
    private static final ClienteDAO clienteDAO = new ClienteDAO();

    // Ruta de login
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
                    Integer id = admin.get().id_administrador;
                    return gson.toJson(new LoginResponse("admin", token, id));
                }
            }
            // Verificar si el usuario es un cliente
            else if (clienteDAO.authenticateCliente(email, pass)) {
                String token = generateToken(email, "cliente");
                Optional<Cliente> cliente = clienteDAO.buscarPorEmail(email);
                if (cliente.isPresent()) {
                    Integer id = cliente.get().id_Cliente; 
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

    // Generación de un token de autenticación usando JWT
    private static String generateToken(String email, String role) {
        // Define la clave secreta para firmar el token (debería guardarse de forma segura)
        Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Usar la clave generada con HMAC SHA-256

        // Establece el tiempo de expiración del token (por ejemplo, 1 hora)
        long expirationTime = 1000 * 60 * 60; // 1 hora en milisegundos

        // Genera el JWT
        JwtBuilder builder = Jwts.builder()
                .setSubject(email) // El subject puede ser el correo del usuario
                .claim("role", role) // Puedes agregar claims personalizados
                .setIssuedAt(new Date()) // Fecha de emisión
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime)) // Fecha de expiración
                .signWith(secretKey); // Firma con la clave secreta generada

        return builder.compact();
    }

    // Verificación del JWT
    public static boolean validarToken(String token) {
        try {
            Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); // La misma clave secreta que se usó para generar el token

            // Nueva forma de validar el token usando JwtParserBuilder
            JwtParser parser = Jwts.parserBuilder()
                    .setSigningKey(secretKey) // Configurar la clave secreta
                    .build();
            
            // Verifica y parsea el token
            parser.parseClaimsJws(token);

            // Si no se lanza ninguna excepción, el token es válido
            return true;
        } catch (Exception e) {
            // Si el token no es válido o ha expirado, devuelve false
            return false;
        }
    }

    // Ruta protegida como ejemplo
    public static Route protectedRoute = (Request request, Response response) -> {
        String token = request.headers("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // Eliminar 'Bearer ' del encabezado
            if (validarToken(token)) {
                return gson.toJson("Acceso permitido");
            } else {
                response.status(401);
                return gson.toJson("Token no válido o expirado");
            }
        } else {
            response.status(400);
            return gson.toJson("Falta el token");
        }
    };

    // Clase auxiliar para la respuesta del login
    public static class LoginResponse {
        String role;
        String token;
        Integer id_persona;

        LoginResponse(String role, String token, Integer id_persona) {
            this.role = role;
            this.token = token;
            this.id_persona = id_persona;
        }
    }
}
