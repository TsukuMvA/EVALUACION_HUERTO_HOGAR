let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


const tablaCarrito = document.getElementById('items-carrito');
const totalPago = document.getElementById('total-pago');
const btnVaciar = document.getElementById('btn-vaciar');
const btnComprar = document.getElementById('btn-comprar');

function agregarAlCarrito(nombre, precio) {
  const productoExistente = carrito.find(item => item.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += 1;
    productoExistente.subtotal = productoExistente.cantidad * productoExistente.precio;
  } else {
    carrito.push({
      nombre: nombre,
      precio: precio,
      cantidad: 1,
      subtotal: precio
    });
  }

  actualizarCarrito();
}


function renderizarTabla() {
  if (!tablaCarrito) return;
  
  tablaCarrito.innerHTML = '';
  let totalCalculado = 0;

  carrito.forEach((producto, indice) => {
    totalCalculado += producto.subtotal;

    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td>${producto.cantidad}</td>
      <td>$${producto.subtotal}</td>
      <td><button onclick="eliminarProducto(${indice})">Eliminar</button></td>
    `;
    tablaCarrito.appendChild(fila);
  });

  if (totalPago) {
    totalPago.textContent = totalCalculado;
  }
}


function eliminarProducto(indice) {
  carrito.splice(indice, 1);
  actualizarCarrito();
}


function actualizarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderizarTabla();
}

if (btnVaciar) {
  btnVaciar.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
  });
}

if (btnComprar) {
  btnComprar.addEventListener('click', () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de comprar.');
    } else {
      alert('¡Gracias por tu compra en Huerto Hogar!');
      carrito = [];
      actualizarCarrito();
    }
  });
}

document.addEventListener('DOMContentLoaded', renderizarTabla);