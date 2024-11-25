package com.example.Security;

import static spark.Spark.*;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.security.Key;

import java.util.Date;
import com.example.Cliente.Cliente;
import com.example.Cliente.ClienteDAO;

public class AuthController {
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private ClienteDAO clienteDAO;

    public AuthController(ClienteDAO clienteDAO) {
        this.clienteDAO = clienteDAO;

        post("/login", (req, res) -> {
            String email = req.queryParams("email");
            String password = req.queryParams("password");

            Cliente cliente = clienteDAO.buscarPorEmail(email).orElse(null);
            if (cliente == null || !cliente.getPass_cliente().equals(password)) {
                res.status(401);
                return "Credenciales incorrectas";
            }

            // Generar el token
            String token = Jwts.builder()
                    .setSubject(cliente.getEmail_cliente())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 día
                    .signWith(SECRET_KEY) // Usar la clave generada
                    .compact();

            // Guardar token en la base de datos
            clienteDAO.updateToken(cliente.getId_Cliente().intValue(), token);

            res.type("application/json");
            return "{ \"token\": \"" + token + "\" }";
        });

        before("/ruta-protegida/*", (req, res) -> {
            String token = req.headers("Authorization");
            if (token == null || !validateToken(token)) {
                halt(401, "No autorizado");
            }
        });
    }

    private boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY) // Usar la misma clave que para generar el token
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

}
