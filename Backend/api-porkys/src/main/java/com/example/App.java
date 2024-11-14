package com.example;

import static spark.Spark.*;
import org.sql2o.Sql2o;

import com.example.Administrador.AdministradorController;
import com.example.Categoria.CategoriaController;
import com.example.Cliente.ClienteController;
import com.example.Compra.CompraController;
import com.example.Estado.EstadoController;
import com.example.Ingrediente.IngredienteController;
import com.example.MateriaPrima.MateriaPrimaController;
import com.example.PasosReceta.PasosRecetaController;
import com.example.Pedido.PedidoController;
import com.example.Producto.ProductoController;
import com.example.ProductosPorPedido.ProductosPorPedidoController;
import com.example.Proveedor.ProveedorController;
import com.example.TipoMateriaPrima.TipoMateriaPrimaController;
import com.example.TipoPago.TipoPagoController;
import com.example.Usuario.UsuarioController;
import com.example.Valoracion.ValoracionController;
import com.example.db.Sql2oDAO;

public class App {
    public static void main(String[] args) {
        try {
            Sql2o sql2o = Sql2oDAO.getSql2o();
            System.out.println("Conexión exitosa a la base de datos");
        } catch (Exception e) {
            System.out.println("No se pudo conectar a la base de datos: " + e.getMessage());
        }

        // Habilitar CORS antes de definir las rutas
        enableCORS("http://localhost:3000", "*", "*");
        // Ruta combinada para login en el backend
        post("/porkys/login", UsuarioController.login);

        // Rutas para Administradores
        get("porkys/administrador/todos", AdministradorController.getTodosAdmins);
        get("porkys/administrador/:email/:pass", AdministradorController.getIsAdmin);
        post("porkys/administrador/crear", AdministradorController.crearAdmin);
        post("porkys/administrador/login", AdministradorController.loginAdmin);
        put("porkys/administrador/modificar", AdministradorController.modificarAdmin);
        delete("porkys/administrador/eliminar/:id", AdministradorController.eliminarAdmin);

        // Rutas para Clientes
        get("porkys/clientes/todos", ClienteController.getTodosClientes);
        get("porkys/clientes/:email/:pass", ClienteController.getIsCliente);
        post("porkys/clientes/crear", ClienteController.crearCliente);
        post("porkys/clientes/login", ClienteController.loginCliente);
        post("porkys/clientes/modificar", ClienteController.modificarCliente);
        delete("porkys/clientes/eliminar/:id_cliente", ClienteController.eliminarCliente);

        // Compras
        get("porkys/compras/todas", CompraController.getTodasCompras);
        post("porkys/compras/crear", CompraController.crearCompra);
        put("porkys/compras/modificar", CompraController.modificarCompra);
        delete("porkys/compras/eliminar/:id_compra", CompraController.eliminarCompra);

        // Estados
        get("porkys/estados/todos", EstadoController.getTodosEstados);
        post("porkys/estados/crear", EstadoController.crearEstado);
        delete("porkys/estados/eliminar/:id", EstadoController.eliminarEstado);
        post("porkys/estados/modificar/:id", EstadoController.modificarEstado);

        // Ingredientes
        get("porkys/ingredientes/todos", IngredienteController.getTodosIngredientes);
        get("porkys/ingredientes/detalles/:id", IngredienteController.getIngredienteId);
        post("porkys/ingredientes/crear", IngredienteController.crearIngrediente);
        delete("porkys/ingredientes/eliminar/:idMateriaPrima/:idProducto", IngredienteController.eliminarIngrediente);
        put("porkys/ingredientes/modificar", IngredienteController.modificarIngrediente);

        // Materia Prima
        get("porkys/matprima/todas", MateriaPrimaController.getTodasMatPrimas);
        get("porkys/matprima/detalles/:id", MateriaPrimaController.getMatPrimasId);
        post("porkys/matprima/crear", MateriaPrimaController.crearMateriaPrima);
        delete("porkys/matprima/eliminar/:id", MateriaPrimaController.eliminarMateriaPrima);
        put("porkys/matprima/modificar/:id", MateriaPrimaController.modificarMateriaPrima);

        // Pasos Recetas
        get("porkys/pasosrecetas/todos", PasosRecetaController.getTodosPasosRecetas);
        get("porkys/pasosrecetas/detalles/:id", PasosRecetaController.getPasosRecetasId);
        post("porkys/pasosrecetas/crear", PasosRecetaController.crearPasos);
        delete("porkys/pasosrecetas/eliminar/:id_Producto/:paso_nro", PasosRecetaController.eliminarPaso);
        post("porkys/pasosrecetas/modificar/:id_Producto/:paso_nro", PasosRecetaController.modificarPaso);

        // Pedidos
        get("porkys/pedidos/todos", PedidoController.getTodosPedidos);
        post("porkys/pedidos/crear", PedidoController.crearPedido);
        post("porkys/pedidos/modificar/:id", PedidoController.modificarPedido);
        delete("porkys/pedidos/eliminar/:id", PedidoController.eliminarPedido);

        // Productos
        get("porkys/productos/todos", ProductoController.getTodosProductos);
        get("porkys/productos/detalles/:id", ProductoController.getProductoId);
        post("porkys/productos/crear", ProductoController.crearProducto);
        put("porkys/productos/modificar/:id", ProductoController.modificarProducto);
        delete("porkys/productos/eliminar/:id", ProductoController.eliminarProducto);

        // ProductosXPedido
        get("porkys/productosXpedido/todos", ProductosPorPedidoController.getTodosProductosXpedido);
        post("porkys/productosXpedido/crear", ProductosPorPedidoController.crearProductoXPedido);
        post("porkys/productosXpedido/modificar/:id", ProductosPorPedidoController.modificarProductoXPedido);
        delete("porkys/productosXpedido/eliminar/:id", ProductosPorPedidoController.eliminarProductoXPedido);

        // Proveedor
        get("porkys/proveedor/todos", ProveedorController.getTodosProveedor);
        post("porkys/proveedor/crear", ProveedorController.crearProveedor);
        post("porkys/proveedor/modificar/:id", ProveedorController.modificarProveedor);
        delete("porkys/proveedor/eliminar/:id", ProveedorController.eliminarProveedor);

        // Tipo MP
        get("porkys/tipomp/todos", TipoMateriaPrimaController.getTodosTipoMP);
        post("porkys/tipomp/crear", TipoMateriaPrimaController.crearTipoMateriaPrima);
        post("porkys/tipomp/modificar/:id", TipoMateriaPrimaController.modificarTipoMateriaPrima);
        delete("porkys/tipomp/eliminar/:id", TipoMateriaPrimaController.eliminarTipoMateriaPrima);

        // Tipo pago
        get("porkys/tipopago/todos", TipoPagoController.getTodosTipoPago);
        post("porkys/tipopago/crear", TipoPagoController.crearTipoPago);
        post("porkys/tipopago/modificar/:id", TipoPagoController.modificarTipoPago);
        delete("porkys/tipopago/eliminar/:id", TipoPagoController.eliminarTipoPago);

        // Valoraciones
        get("porkys/valoracion/todas", ValoracionController.getTodasValoraciones);
        post("porkys/valoracion/crear", ValoracionController.crearValoracion);
        post("porkys/valoracion/modificar", ValoracionController.modificarValoracion);
        delete("porkys/valoracion/eliminar/:id_cliente/:id_producto/:fecha_valoracion",
                ValoracionController.eliminarValoracion);

        // Categorías
        get("porkys/categorias/todas", CategoriaController.getTodasCategorias);
        get("porkys/categorias/:nombre", CategoriaController.getCategoriaPorNombre);
        get("porkys/categorias/obtener/:id_categoria", CategoriaController.getCategoriaPorId);

        // Ruta para obtener productos por categoría
        get("porkys/productos/categoria/nombre/:nombreCategoria", ProductoController.getProductosPorNombreCategoria);

    }

    // Método para habilitar CORS
    private static void enableCORS(final String origin, final String methods, final String headers) {
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", origin);
            response.header("Access-Control-Request-Method", methods);
            response.header("Access-Control-Allow-Headers", headers);
        });
    }
}
