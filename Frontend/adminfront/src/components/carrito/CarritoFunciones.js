// src/utils/cartUtils.js

// Obtener el carrito del localStorage
export const obtenerCarrito = () => {
  return JSON.parse(localStorage.getItem("carrito")) || [];
};

// Guardar el carrito en localStorage
export const guardarCarrito = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Agregar un producto al carrito
export const agregarAlCarrito = (producto) => {
  const carritoActual = obtenerCarrito();

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

// Eliminar un producto del carrito
export const eliminarDelCarrito = (id_producto) => {
  const carritoActual = obtenerCarrito();
  const carritoActualizado = carritoActual.filter(
    (item) => item.id_producto !== id_producto
  );
  guardarCarrito(carritoActualizado);
};

export const vaciarCarrito = () => {
  localStorage.removeItem('carrito');  // Elimina el carrito de localStorage

  console.log("Carrito vacío:", obtenerCarrito());
};
