let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const tablaCarrito = document.getElementById('items-carrito');
const totalPago = document.getElementById('total-pago');
const subtotalPago = document.getElementById('subtotal-pago');
const cantidadResumen = document.getElementById('cantidad-resumen');
const contadorCarrito = document.getElementById('contador-carrito');
const carritoVacio = document.getElementById('carrito-vacio');
const carritoContenido = document.getElementById('carrito-contenido');
const btnVaciar = document.getElementById('btn-vaciar');
const btnComprar = document.getElementById('btn-comprar');
const mensajeCarrito = document.getElementById('mensaje-carrito');

function formatearPrecio(valor) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(valor);
}

function obtenerStock(nombre) {
  if (typeof productos === 'undefined') return Infinity;
  const producto = productos.find(item => item.nombre === nombre);
  return producto ? producto.stock : Infinity;
}

function mostrarMensaje(texto, tipo = 'exito') {
  if (!mensajeCarrito) return;
  mensajeCarrito.textContent = texto;
  mensajeCarrito.className = `mensaje ${tipo}`;
  window.clearTimeout(mostrarMensaje.timer);
  mostrarMensaje.timer = window.setTimeout(() => {
    mensajeCarrito.className = 'mensaje';
    mensajeCarrito.textContent = '';
  }, 3000);
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio, codigo = '', unidad = '') {
  const stock = obtenerStock(nombre);
  const productoExistente = carrito.find(item => item.nombre === nombre);

  if (productoExistente) {
    if (productoExistente.cantidad >= stock) {
      mostrarMensaje('No puedes agregar más unidades: alcanzaste el stock disponible.', 'error');
      return;
    }
    productoExistente.cantidad += 1;
    productoExistente.subtotal = productoExistente.cantidad * productoExistente.precio;
  } else {
    carrito.push({ nombre, precio, cantidad: 1, subtotal: precio, codigo, unidad });
  }

  guardarCarrito();
  renderizarCarrito();
  mostrarMensaje(`${nombre} fue agregado al carrito.`);
}

function cambiarCantidad(indice, nuevaCantidad) {
  const producto = carrito[indice];
  if (!producto) return;

  const stock = obtenerStock(producto.nombre);
  const cantidad = Math.max(1, Math.min(Number(nuevaCantidad) || 1, stock));

  if (cantidad === stock && Number(nuevaCantidad) > stock) {
    mostrarMensaje('La cantidad solicitada supera el stock disponible.', 'error');
  }

  producto.cantidad = cantidad;
  producto.subtotal = producto.cantidad * producto.precio;
  guardarCarrito();
  renderizarCarrito();
}

function eliminarProducto(indice) {
  const producto = carrito[indice];
  if (!producto) return;
  carrito.splice(indice, 1);
  guardarCarrito();
  renderizarCarrito();
  mostrarMensaje(`${producto.nombre} fue eliminado del carrito.`);
}

function renderizarCarrito() {
  if (!tablaCarrito) return;

  tablaCarrito.innerHTML = '';
  let totalCalculado = 0;
  let unidadesTotales = 0;

  carrito.forEach((producto, indice) => {
    producto.subtotal = producto.cantidad * producto.precio;
    totalCalculado += producto.subtotal;
    unidadesTotales += producto.cantidad;

    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td data-label="Producto">
        <strong>${producto.nombre}</strong>
        ${producto.codigo ? `<small>${producto.codigo}${producto.unidad ? ` · ${producto.unidad}` : ''}</small>` : ''}
      </td>
      <td data-label="Precio">${formatearPrecio(producto.precio)}</td>
      <td data-label="Cantidad">
        <div class="control-cantidad">
          <button type="button" aria-label="Disminuir cantidad de ${producto.nombre}" onclick="cambiarCantidad(${indice}, ${producto.cantidad - 1})" ${producto.cantidad <= 1 ? 'disabled' : ''}>−</button>
          <input type="number" min="1" max="${obtenerStock(producto.nombre)}" value="${producto.cantidad}" aria-label="Cantidad de ${producto.nombre}" onchange="cambiarCantidad(${indice}, this.value)">
          <button type="button" aria-label="Aumentar cantidad de ${producto.nombre}" onclick="cambiarCantidad(${indice}, ${producto.cantidad + 1})" ${producto.cantidad >= obtenerStock(producto.nombre) ? 'disabled' : ''}>+</button>
        </div>
      </td>
      <td data-label="Subtotal"><strong>${formatearPrecio(producto.subtotal)}</strong></td>
      <td data-label="Acciones"><button class="btn-eliminar" type="button" onclick="eliminarProducto(${indice})">Eliminar</button></td>
    `;
    tablaCarrito.appendChild(fila);
  });

  if (subtotalPago) subtotalPago.textContent = formatearPrecio(totalCalculado);
  if (totalPago) totalPago.textContent = formatearPrecio(totalCalculado);
  if (cantidadResumen) cantidadResumen.textContent = unidadesTotales;
  if (contadorCarrito) contadorCarrito.textContent = unidadesTotales;

  const hayProductos = carrito.length > 0;
  if (carritoVacio) carritoVacio.hidden = hayProductos;
  if (carritoContenido) carritoContenido.hidden = !hayProductos;
  if (btnComprar) btnComprar.disabled = !hayProductos;
}

function vaciarCarrito() {
  if (carrito.length === 0) return;
  if (!window.confirm('¿Seguro que quieres vaciar el carrito?')) return;
  carrito = [];
  guardarCarrito();
  renderizarCarrito();
  mostrarMensaje('El carrito fue vaciado.');
}

if (btnVaciar) btnVaciar.addEventListener('click', vaciarCarrito);

if (btnComprar) {
  btnComprar.addEventListener('click', () => {
    if (carrito.length === 0) {
      mostrarMensaje('El carrito está vacío. Agrega productos antes de comprar.', 'error');
      return;
    }
    const sesion = JSON.parse(localStorage.getItem('huertohogar_sesion') || 'null');
    if (!sesion) {
      mostrarMensaje('Debes iniciar sesión antes de confirmar el pedido.', 'error');
      setTimeout(() => { window.location.href = 'login.html'; }, 700);
      return;
    }
    localStorage.setItem('huertohogar_checkout_carrito', JSON.stringify(carrito));
    window.location.href = 'envio.html';
  });
}

document.addEventListener('DOMContentLoaded', renderizarCarrito);
