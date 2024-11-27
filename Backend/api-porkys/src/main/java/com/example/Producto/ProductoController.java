package com.example.Producto;

import com.google.gson.Gson;
import java.util.List;

import javax.servlet.MultipartConfigElement;
import javax.servlet.http.Part;

import spark.Request;
import spark.Response;
import spark.Route;

public class ProductoController {
    private static final Gson gson = new Gson();
    private static final ProductoDAO productoDAO = new ProductoDAO();

    // Obtener todos los productos
    public static Route getTodosProductos = (Request request, Response response) -> {
        response.type("application/json");
        try {
            ProductoDAO p = new ProductoDAO();
            List<Producto> res = p.selectAll();
            return new Gson().toJson(res);
        } catch (Exception e) {
            response.status(500);
            return new Gson().toJson("Error controlador: " + e.getMessage());
        }
    };

    // Ver un producto por id
    public static Route getProductoId = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int idProducto = Integer.parseInt(request.params(":id"));
            Producto producto = productoDAO.selectProductoId(idProducto);
            if (producto != null) {
                response.status(200);
                return gson.toJson(producto);
            } else {
                response.status(404);
                return gson.toJson("Producto no encontrado");
            }
        } catch (NumberFormatException e) {
            response.status(400);
            return gson.toJson("ID de producto inválido");
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al seleccionar el producto: " + e.getMessage());
        }
    };

    // Crear nuevo producto PRODUCTOCONTROLLLER.JAVA
    public static Route crearProducto = (Request request, Response response) -> {
        response.type("application/json");
        try {
            MultipartConfigElement multipartConfigElement = new MultipartConfigElement("/tmp");
            request.raw().setAttribute("org.eclipse.jetty.multipartConfig", multipartConfigElement);

            String nombre = request.raw().getParameter("Nombre_Producto");
            String precio = request.raw().getParameter("precio_vta");
            String porciones = request.raw().getParameter("cant_porciones");
            String descripcion = request.raw().getParameter("descripcion_producto");
            String categoria = request.raw().getParameter("p_categoria");

            Part filePart = request.raw().getPart("imagen");
            byte[] imagenBytes = null;
            if (filePart != null) {
                imagenBytes = filePart.getInputStream().readAllBytes();
            }

            Producto nuevoProducto = new Producto();
            nuevoProducto.setNombre_Producto(nombre);
            nuevoProducto.setPrecio_vta(Integer.parseInt(precio));
            nuevoProducto.setCant_porciones(Integer.parseInt(porciones));
            nuevoProducto.setDescripcion_producto(descripcion);
            nuevoProducto.setP_categoria(Integer.parseInt(categoria));
            nuevoProducto.setImagen(imagenBytes);

            productoDAO.crearProducto(nuevoProducto);
            response.status(201);
            return gson.toJson(nuevoProducto);
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al crear el producto: " + e.getMessage());
        }
    };

    public static Route modificarProducto = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int idProducto = Integer.parseInt(request.params(":id"));
            Producto producto = gson.fromJson(request.body(), Producto.class);

            boolean actualizado = productoDAO.modificarProducto(idProducto, producto);

            if (actualizado) {
                response.status(200);
                return gson.toJson("Producto actualizado con éxito.");
            } else {
                response.status(400);
                return gson.toJson("No se pudo actualizar el producto.");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al actualizar producto: " + e.getMessage());
        }
    };

    // Eliminar un producto
    public static Route eliminarProducto = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int id_Producto = Integer.parseInt(request.params(":id"));
            if (productoDAO.eliminarProducto(id_Producto)) {
                response.status(204);
                return gson.toJson("Producto eliminado");
            } else {
                response.status(404);
                return gson.toJson("Producto no encontrado");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al eliminar el producto: " + e.getMessage());
        }
    };

    // Obtener productos por nombre de categoría
    public static Route getProductosPorNombreCategoria = (Request request, Response response) -> {
        response.type("application/json");
        try {
            String nombreCategoria = request.params(":nombreCategoria"); // Obtener el nombre de la categoría
            List<Producto> productos = productoDAO.selectProductosPorNombreCategoria(nombreCategoria);
            if (!productos.isEmpty()) {
                response.status(200);
                return gson.toJson(productos);
            } else {
                response.status(404);
                return gson.toJson("No se encontraron productos en esta categoría");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al obtener productos por nombre de categoría: " + e.getMessage());
        }
    };

    // Disminuir porciones de un producto
    public static Route disminuirPorcionesProducto = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int idProducto = Integer.parseInt(request.params(":id"));
            int cantPorciones = Integer.parseInt(request.queryParams("cant_porciones"));

            boolean resultado = productoDAO.disminuirPorcionesProducto(idProducto, cantPorciones);

            if (resultado) {
                response.status(200);
                return gson.toJson("Porciones disminuidas exitosamente.");
            } else {
                response.status(400);
                return gson.toJson("No se pudieron disminuir las porciones.");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al disminuir las porciones del producto: " + e.getMessage());
        }
    };

    // Agregar porciones de un producto
    public static Route aumentarPorcionesProducto = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int idProducto = Integer.parseInt(request.params(":id"));
            int cantPorciones = Integer.parseInt(request.queryParams("cant_porciones"));

            boolean resultado = productoDAO.aumentarPorcionesProducto(idProducto, cantPorciones);

            if (resultado) {
                response.status(200);
                return gson.toJson("Porciones disminuidas exitosamente.");
            } else {
                response.status(400);
                return gson.toJson("No se pudieron disminuir las porciones.");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al disminuir las porciones del producto: " + e.getMessage());
        }
    };

    // Obtener porciones de un producto
    public static Route getPorcionesProducto = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int idProducto = Integer.parseInt(request.params(":id"));
            Integer cantPorciones = productoDAO.getPorcionesProducto(idProducto);

            if (cantPorciones != null) {
                response.status(200);
                return gson.toJson(cantPorciones);
            } else {
                response.status(404);
                return gson.toJson("Producto no encontrado o no tiene porciones.");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al obtener las porciones del producto: " + e.getMessage());
        }
    };

    // Disminuir MP de un producto al ser comprado
    public static Route disminuirMPdeProducto = (Request request, Response response) -> {
        response.type("application/json");
        try {
            int idProducto = Integer.parseInt(request.params(":id"));
            int cantComprado = Integer.parseInt(request.queryParams("cant_comprado"));

            boolean resultado = productoDAO.disminuirMPdeProducto(idProducto, cantComprado);

            if (resultado) {
                response.status(200);
                return gson.toJson("Materia prima disminuida exitosamente.");
            } else {
                response.status(400);
                return gson.toJson("No se pudo disminuir la materia prima.");
            }
        } catch (Exception e) {
            response.status(500);
            return gson.toJson("Error al disminuir materia prima: " + e.getMessage());
        }
    };

}
