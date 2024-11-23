import { toast } from "react-toastify";

// Obtener el ID de la persona solo cuando sea necesario
const obtenerIdPersona = () => {
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  return userInfo?.id_persona;
};

// Obtener el carrito para un usuario específico
export const obtenerCarrito = () => {
  const id_persona = obtenerIdPersona();  
  if (!id_persona) {
    console.log("No se encontró el ID de persona en el localStorage");
    return [];
  }
  
  const carritos = JSON.parse(localStorage.getItem("carritos")) || {};
  return carritos[id_persona] || [];
};

// Guardar el carrito para un usuario específico
export const guardarCarrito = (carrito) => {
  const id_persona = obtenerIdPersona(); 
  if (!id_persona) {
    console.log("No se encontró el ID de persona en el localStorage");
    return;
  }
  
  const carritos = JSON.parse(localStorage.getItem("carritos")) || {};
  carritos[id_persona] = carrito; // Asocia el carrito al id_persona
  localStorage.setItem("carritos", JSON.stringify(carritos));
};

// Agregar un producto al carrito
export const agregarAlCarrito = (producto) => {
  const carritoActual = obtenerCarrito();
  const id_persona = obtenerIdPersona();  

  // Buscar si el producto ya está en el carrito
  const productoExistente = carritoActual.find(
    (item) => item.id_Producto === producto.id_Producto
  );

  if (productoExistente) {
    // Incrementar la cantidad si ya está en el carrito
    productoExistente.cantidad += 1;
  } else {
    // Agregar el producto con cantidad inicial 1
    carritoActual.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(carritoActual);
};

// Obtener la cantidad total de productos en el carrito
export const obtenerCantidadTotal = () => {
  const carrito = obtenerCarrito();
  return carrito.reduce((total, item) => total + item.cantidad, 0);
};

// Eliminar un producto del carrito (reduciendo la cantidad)
export const eliminarDelCarrito = (id_producto) => {
  let carritoActual = obtenerCarrito();
  const id_persona = obtenerIdPersona();  

  // Buscar el producto en el carrito
  const producto = carritoActual.find((item) => item.id_Producto === id_producto);

  if (producto) {
    // Reducir la cantidad del producto
    producto.cantidad -= 1;

    // Si la cantidad llega a 0, eliminar el producto del carrito
    if (producto.cantidad === 0) {
      carritoActual = carritoActual.filter((item) => item.id_Producto !== id_producto);
    }

    // Guardar el carrito actualizado
    guardarCarrito(carritoActual);
  }
};

// Vaciar el carrito para el usuario actual
export const vaciarCarrito = () => {
  const id_persona = obtenerIdPersona();  
  if (!id_persona) {
    console.log("No se encontró el ID de persona en el localStorage");
    return;
  }

  const carritos = JSON.parse(localStorage.getItem("carritos")) || {};
  delete carritos[id_persona]; // Elimina el carrito del usuario actual
  localStorage.setItem("carritos", JSON.stringify(carritos));
};
