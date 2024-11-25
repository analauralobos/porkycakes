package com.example.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import com.example.Cliente.ClienteDAO;
import com.example.Cliente.Cliente;
import com.example.Administrador.AdministradorDAO;
import com.example.Administrador.Administrador;

import javax.crypto.SecretKey;
import java.util.Date;

public class AuthService {
    private static final String SECRET_KEY = "tu_clave_secreta_que_debe_tener_al_menos_256_bits"; 
    private static final long EXPIRATION_TIME = 864_000_000; // 10 días en milisegundos

    private static final ClienteDAO clienteDAO = new ClienteDAO();
    private static final AdministradorDAO adminDAO = new AdministradorDAO();
    private static final SecretKey secretKey = Keys.hmacShaKeyFor(SECRET_KEY.getBytes()); // Crea la clave secreta

    // Autenticar Cliente
    public static String loginCliente(String email, String password) {
        if (clienteDAO.authenticateCliente(email, password)) {
            Cliente cliente = clienteDAO.buscarPorEmail(email).orElse(null); // Obtenemos el cliente para generar el token
            return generateTokenCliente(cliente); // Genera y devuelve el token si las credenciales son válidas
        }
        return null; // Devuelve null si las credenciales no son válidas
    }

    // Autenticar Administrador
    public static String loginAdmin(String email, String password) {
        if (adminDAO.authenticateAdmin(email, password)) {
            Administrador admin = adminDAO.buscarPorEmail(email).orElse(null); // Obtenemos el administrador para generar el token
            return generateTokenAdmin(admin); // Genera y devuelve el token si las credenciales son válidas
        }
        return null; // Devuelve null si las credenciales no son válidas
    }

    // Generar token para Cliente
    private static String generateTokenCliente(Cliente cliente) {
        Claims claims = Jwts.claims().setSubject(cliente.getEmail_cliente());
        claims.put("nombre", cliente.getNombre_Cliente());
        claims.put("id", cliente.getId_Cliente()); 

        Date now = new Date();
        Date validity = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(secretKey) // Usar la clave secreta generada
                .compact();
    }

    // Generar token para Administrador
    private static String generateTokenAdmin(Administrador admin) {
        Claims claims = Jwts.claims().setSubject(admin.getEmail());
        claims.put("nombre", admin.getNombre());
        claims.put("id", admin.getId_administrador()); 

        Date now = new Date();
        Date validity = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(secretKey) // Usar la clave secreta generada
                .compact();
    }

    // Validar token
    public static Claims validateToken(String token) {
        try {
            return Jwts.parserBuilder() // Usar parserBuilder para evitar deprecated
                    .setSigningKey(secretKey) // Usar la clave secreta generada
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            return null; // Devuelve null si el token no es válido
        }
    }

    
}
