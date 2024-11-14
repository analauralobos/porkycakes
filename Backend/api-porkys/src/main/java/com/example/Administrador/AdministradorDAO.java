package com.example.Administrador;

import org.sql2o.Connection;
import com.example.db.Sql2oDAO;
import org.mindrot.jbcrypt.BCrypt;

import java.util.List;
import java.util.Optional;

public class AdministradorDAO {

    // Seleccionar todos los administradores
    public List<Administrador> selectAll() {
        String selectAllSQL = "SELECT * FROM administrador;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            return con.createQuery(selectAllSQL).executeAndFetch(Administrador.class);
        } catch (Exception e) {
            System.err.println("Error al ejecutar la query: " + e.getMessage());
            return null;
        }
    }

    // Método para registrar un nuevo administrador
    public boolean crearAdmin(Administrador admin) {
        String insertSQL = "INSERT INTO administrador (nombre, apellido, email, password, rol) VALUES (:nombre, :apellido, :email, :password, :rol);";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            String hashedPassword = BCrypt.hashpw(admin.getPassword(), BCrypt.gensalt());
            con.createQuery(insertSQL)
                    .addParameter("nombre", admin.getNombre())
                    .addParameter("apellido", admin.getApellido())
                    .addParameter("email", admin.getEmail())
                    .addParameter("password", hashedPassword) // Almacena la contraseña encriptada
                    .addParameter("rol", admin.getRol())
                    .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al registrar el administrador: " + e.getMessage());
            return false;
        }
    }

    // Método para buscar un administrador por email
    public Optional<Administrador> buscarPorEmail(String email) {
        String selectSQL = "SELECT * FROM administrador WHERE email = :email;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            Administrador admin = con.createQuery(selectSQL)
                    .addParameter("email", email)
                    .executeAndFetchFirst(Administrador.class);
            return Optional.ofNullable(admin);
        } catch (Exception e) {
            System.err.println("Error al buscar el administrador: " + e.getMessage());
            return Optional.empty();
        }
    }

    // Método para autenticar a un administrador
    public boolean authenticateAdmin(String email, String password) {
        Optional<Administrador> adminOpt = buscarPorEmail(email);
        if (adminOpt.isPresent()) {
            Administrador admin = adminOpt.get();
            return BCrypt.checkpw(password, admin.getPassword()); // Compara la contraseña encriptada
        }
        return false; // El administrador no existe o la contraseña es incorrecta
    }

    // Método para modificar un administrador
    public boolean modificarAdmin(Administrador admin) {
        String updateSQL = "UPDATE administrador SET nombre = :nombre, apellido = :apellido, email = :email, password = :password, rol = :rol WHERE id_administrador = :idAdmin;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            String hashedPassword = BCrypt.hashpw(admin.getPassword(), BCrypt.gensalt());
            con.createQuery(updateSQL)
                    .addParameter("idAdmin", admin.getId_administrador())
                    .addParameter("nombre", admin.getNombre())
                    .addParameter("apellido", admin.getApellido())
                    .addParameter("email", admin.getEmail())
                    .addParameter("password", hashedPassword) // Almacena la contraseña encriptada
                    .addParameter("rol", admin.getRol())
                    .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al modificar el administrador: " + e.getMessage());
            return false;
        }
    }

    // Método para eliminar un administrador
    public boolean eliminarAdmin(int idAdmin) {
        String deleteSQL = "DELETE FROM administrador WHERE id_administrador = :idAdmin;";
        try (Connection con = Sql2oDAO.getSql2o().open()) {
            con.createQuery(deleteSQL)
                    .addParameter("idAdmin", idAdmin)
                    .executeUpdate();
            return true;
        } catch (Exception e) {
            System.err.println("Error al eliminar el administrador: " + e.getMessage());
            return false;
        }
    }
}
