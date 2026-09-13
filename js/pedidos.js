const CLAVE_PEDIDOS = 'huertohogar_pedidos';

function obtenerPedidos() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_PEDIDOS)) || [];
  } catch {
    return [];
  }
}

function guardarPedidos(pedidos) {
  localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(pedidos));
}

function precio(valor) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(valor);
}

function fecha(valor) {
  return new Intl.DateTimeFormat('es-CL', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(valor));
}

function estadoClase(estado) {
  return estado.toLowerCase().replaceAll(' ', '-');
}

function obtenerSesionActual() {
  return typeof obtenerSesion === 'function' ? obtenerSesion() : null;
}

function crearPedidoDesdeCarrito(carrito) {
  if (!Array.isArray(carrito) || !carrito.length) return null;

  const sesion = obtenerSesionActual();
  const pedidos = obtenerPedidos();
  const total = carrito.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);

  const pedido = {
    id: `HH-${Date.now().toString().slice(-8)}`,
    fecha: new Date().toISOString(),
    estado: 'Confirmado',
    cliente: sesion ? { nombre: sesion.nombre, email: sesion.email } : { nombre: 'Cliente invitado', email: '' },
    productos: carrito.map(p => ({
      codigo: p.codigo,
      nombre: p.nombre,
      precio: p.precio,
      cantidad: p.cantidad,
      unidad: p.unidad,
      subtotal: p.precio * p.cantidad
    })),
    total,
    notificaciones: [
      'Pedido recibido correctamente.',
      'Tu pedido ha sido confirmado y está en preparación.'
    ]
  };

  pedidos.unshift(pedido);
  guardarPedidos(pedidos);
  return pedido;
}

function renderizarPedidos() {
  const lista = document.getElementById('lista-pedidos');
  const vacio = document.getElementById('sin-pedidos');
  const pedidos = obtenerPedidos();
  const contador = document.getElementById('contador-carrito');
  const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

  if (contador) {
    contador.textContent = carrito.reduce((s, p) => s + Number(p.cantidad || 0), 0);
  }

  if (!lista) return;

  vacio.hidden = pedidos.length > 0;
  lista.innerHTML = pedidos.map(pedido => `
    <article class="pedido-card">
      <div class="pedido-cabecera">
        <div>
          <span class="codigo-pedido">${pedido.id}</span>
          <h2>Pedido ${pedido.id}</h2>
          <p>Realizado el ${fecha(pedido.fecha)}</p>
        </div>
        <span class="estado-pedido ${estadoClase(pedido.estado)}">${pedido.estado}</span>
      </div>
      <div class="pedido-cuerpo">
        <div>
          <h3>Detalle de productos</h3>
          <ul class="pedido-productos">
            ${pedido.productos.map(p => `
              <li>
                <span>${p.nombre} × ${p.cantidad}</span>
                <strong>${precio(p.subtotal)}</strong>
              </li>
            `).join('')}
          </ul>
        </div>
        <aside class="pedido-total">
          <span>Total</span>
          <strong>${precio(pedido.total)}</strong>
        </aside>
      </div>
      <div class="notificaciones-pedido">
        <h3>Estado y notificaciones</h3>
        ${pedido.notificaciones.map(n => `<p>✓ ${n}</p>`).join('')}
      </div>
      ${pedido.envio ? `
        <div class="notificaciones-pedido">
          <h3>Despacho y seguimiento</h3>
          <p><strong>Entrega:</strong> ${pedido.envio.fechaPreferida} · ${pedido.envio.horario}</p>
          <p><strong>Dirección:</strong> ${pedido.envio.direccion}, ${pedido.envio.comuna}, ${pedido.envio.region}</p>
          <p><strong>Seguimiento:</strong> ${pedido.seguimiento?.estado || 'Pedido confirmado'}</p>
        </div>
      ` : ''}
      <details class="comprobante-pedido">
        <summary>Ver comprobante</summary>
        <div>
          <p><strong>HuertoHogar</strong></p>
          <p>Pedido: ${pedido.id}</p>
          <p>Cliente: ${pedido.cliente.nombre}</p>
          <p>Fecha: ${fecha(pedido.fecha)}</p>
          <p>Total: <strong>${precio(pedido.total)}</strong></p>
        </div>
        <button class="btn-secundario" type="button" onclick="imprimirComprobante('${pedido.id}')">Imprimir comprobante</button>
      </details>
    </article>
  `).join('');
}

function imprimirComprobante(id) {
  const pedido = obtenerPedidos().find(p => p.id === id);
  if (!pedido) return;

  const ventana = window.open('', '_blank');
  ventana.document.write(`
    <html lang="es">
      <head>
        <title>Comprobante ${pedido.id}</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 700px; margin: 40px auto; color: #333; }
          h1 { color: #2E8B57; }
          table { width: 100%; border-collapse: collapse; }
          td, th { padding: 10px; border-bottom: 1px solid #ddd; text-align: left; }
          .total { font-size: 20px; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>HuertoHogar</h1>
        <h2>Comprobante de pedido</h2>
        <p><b>Número:</b> ${pedido.id}</p>
        <p><b>Fecha:</b> ${fecha(pedido.fecha)}</p>
        <p><b>Cliente:</b> ${pedido.cliente.nombre}</p>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${pedido.productos.map(p => `
              <tr>
                <td>${p.nombre}</td>
                <td>${p.cantidad}</td>
                <td>${precio(p.subtotal)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p class="total">Total: ${precio(pedido.total)}</p>
        <p>Estado: ${pedido.estado}</p>
        <script>window.print()<\/script>
      </body>
    </html>
  `);
  ventana.document.close();
}

window.crearPedidoDesdeCarrito = crearPedidoDesdeCarrito;
window.renderizarPedidos = renderizarPedidos;
window.addEventListener('DOMContentLoaded', renderizarPedidos);