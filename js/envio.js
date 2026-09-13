const CLAVE_PEDIDOS = 'huertohogar_pedidos';
const CLAVE_CHECKOUT = 'huertohogar_checkout_carrito';

let checkout = JSON.parse(localStorage.getItem(CLAVE_CHECKOUT) || '[]');

function money(v) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(v);
}

function mensajeEnvio(texto, tipo = 'error') {
  const el = document.getElementById('mensaje-envio');
  if (el) {
    el.textContent = texto;
    el.className = `mensaje ${tipo}`;
  }
}

function fechaISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function cargarDatos() {
  const sesion = obtenerSesion();

  if (sesion) {
    const usuarios = obtenerUsuarios();
    const u = usuarios.find((x) => x.id === sesion.usuarioId);

    if (u) {
      document.getElementById('direccion-envio').value = u.direccion || '';
      document.getElementById('telefono-envio').value = u.telefono || '';

      if (typeof cargarRegiones === 'function') {
        cargarRegiones(
          'region-envio',
          'comuna-envio',
          u.region || '',
          u.comuna || ''
        );
      }
    }
  }

  const date = document.getElementById('fecha-entrega');
  date.min = fechaISO();
  date.value = date.min;
}

function renderResumen() {
  const box = document.getElementById('resumen-envio-productos');
  let total = 0;

  box.innerHTML = checkout
    .map((p) => {
      const sub = p.precio * p.cantidad;
      total += sub;
      return `<div class="resumen-linea"><span>${p.nombre} × ${p.cantidad}</span><strong>${money(sub)}</strong></div>`;
    })
    .join('');

  document.getElementById('total-envio').textContent = money(total);
}

function confirmarEnvio(e) {
  e.preventDefault();

  if (!checkout.length) {
    mensajeEnvio('No hay productos para confirmar. Regresa al catálogo.');
    return;
  }

  const sesion = obtenerSesion();
  if (!sesion) {
    mensajeEnvio('Debes iniciar sesión para confirmar el pedido y guardar tus datos de entrega.');
    return;
  }

  const region = document.getElementById('region-envio').value;
  const comuna = document.getElementById('comuna-envio').value;

  const pedido = {
    id: `HH-${Date.now().toString().slice(-8)}`,
    fecha: new Date().toISOString(),
    estado: 'Confirmado',
    cliente: {
      nombre: sesion.nombre,
      email: sesion.email
    },
    productos: checkout.map((p) => ({
      ...p,
      subtotal: p.precio * p.cantidad
    })),
    total: checkout.reduce((s, p) => s + p.precio * p.cantidad, 0),
    envio: {
      direccion: document.getElementById('direccion-envio').value.trim(),
      region,
      comuna,
      telefono: document.getElementById('telefono-envio').value.trim(),
      fechaPreferida: document.getElementById('fecha-entrega').value,
      horario: document.querySelector('input[name="horario"]:checked').value
    },
    seguimiento: {
      estado: 'Pedido confirmado',
      actualizado: new Date().toISOString(),
      pasos: [
        { nombre: 'Pedido confirmado', estado: 'completo' },
        { nombre: 'En preparación', estado: 'actual' },
        { nombre: 'En camino', estado: 'pendiente' },
        { nombre: 'Entregado', estado: 'pendiente' }
      ]
    },
    notificaciones: [
      'Pedido recibido correctamente.',
      'Tu despacho fue programado según la fecha preferida indicada.'
    ]
  };

  const pedidos = JSON.parse(localStorage.getItem(CLAVE_PEDIDOS) || '[]');
  pedidos.unshift(pedido);

  localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(pedidos));
  localStorage.removeItem(CLAVE_CHECKOUT);
  localStorage.removeItem('carrito');

  mensajeEnvio(`Pedido ${pedido.id} confirmado.`, 'exito');

  setTimeout(() => {
    location.href = 'pedidos.html';
  }, 900);
}

document.addEventListener('DOMContentLoaded', () => {
  cargarDatos();
  renderResumen();
  document.getElementById('form-envio').addEventListener('submit', confirmarEnvio);
});