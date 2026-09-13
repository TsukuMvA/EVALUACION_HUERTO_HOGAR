const CLAVE_RESEÑAS = 'huertohogar_reseñas';

function obtenerReseñas() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_RESEÑAS)) || {};
  } catch {
    return {};
  }
}

function guardarReseñas(data) {
  localStorage.setItem(CLAVE_RESEÑAS, JSON.stringify(data));
}

function estrellas(n) {
  return '★'.repeat(Number(n)) + '☆'.repeat(5 - Number(n));
}

function renderizarDetalleProducto(producto) {
  const el = document.getElementById('detalle-producto');
  if (!el) return;

  el.innerHTML = `
    <div class="detalle-icono">${iconoDetalle(producto.categoria)}</div>
    <div>
      <span class="categoria-badge">${producto.categoria}</span>
      <p class="codigo-producto">${producto.codigo}</p>
      <h1>${producto.nombre}</h1>
      <p>${producto.descripcion}</p>
      <p class="origen-producto"><strong>Origen / procedencia:</strong> ${producto.origen || 'Información no especificada en el documento.'}</p>
      <div class="detalle-precio">${formatoPrecioDetalle(producto.precio)} <small>/ ${producto.unidad}</small></div>
      <p><strong>Disponibilidad:</strong> ${producto.stock} ${producto.unidad.includes('bolsa') ? 'bolsas' : producto.unidad.includes('frasco') ? 'frascos' : producto.unidad.includes('litro') ? 'litros' : 'kg'}</p>
      <button class="btn-agregar" onclick="agregarDetalleAlCarrito('${producto.codigo}')">Agregar al carrito</button>
    </div>
  `;
}

function formatoPrecioDetalle(v) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(v);
}

function iconoDetalle(c) {
  const iconos = {
    'Frutas Frescas': '🍎',
    'Verduras Orgánicas': '🥕',
    'Productos Orgánicos': '🍯',
    'Productos Lácteos': '🥛'
  };
  return iconos[c] || '🌱';
}

function agregarDetalleAlCarrito(codigo) {
  const p = productos.find(x => x.codigo === codigo);
  if (!p) return;

  let c = JSON.parse(localStorage.getItem('carrito') || '[]');
  const e = c.find(x => x.codigo === codigo || x.nombre === p.nombre);

  if (e) {
    if (e.cantidad >= p.stock) {
      alert('No hay más stock disponible.');
      return;
    }
    e.cantidad++;
  } else {
    c.push({
      codigo: p.codigo,
      nombre: p.nombre,
      precio: p.precio,
      cantidad: 1,
      subtotal: p.precio,
      unidad: p.unidad
    });
  }

  localStorage.setItem('carrito', JSON.stringify(c));
  alert(`${p.nombre} fue agregado al carrito.`);
}

function prepararReseñas(producto) {
  const todas = obtenerReseñas();
  const lista = todas[producto.codigo] || [];
  const listaEl = document.getElementById('lista-reseñas');
  const resumen = document.getElementById('resumen-calificacion');

  const promedio = lista.length
    ? lista.reduce((s, r) => s + r.calificacion, 0) / lista.length
    : 0;

  resumen.innerHTML = lista.length
    ? `<strong>${promedio.toFixed(1)} / 5</strong><span class="estrellas">${estrellas(Math.round(promedio))}</span><small>${lista.length} reseña${lista.length === 1 ? '' : 's'}</small>`
    : '<span>Aún no hay calificaciones</span>';

  listaEl.innerHTML = lista.length
    ? lista.map(r => `
        <article class="reseña-card">
          <div>
            <strong>${escapeHtml(r.nombre)}</strong>
            <span class="estrellas">${estrellas(r.calificacion)}</span>
          </div>
          <p>${escapeHtml(r.comentario)}</p>
          <small>${new Date(r.fecha).toLocaleDateString('es-CL')}</small>
        </article>
      `).join('')
    : '<p class="sin-reseñas">Sé el primero en calificar este producto.</p>';

  const form = document.getElementById('form-reseña');
  form.dataset.codigo = producto.codigo;

  form.onsubmit = (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre-reseña').value.trim();
    const cal = Number(document.getElementById('calificacion').value);
    const comentario = document.getElementById('comentario').value.trim();
    const msg = document.getElementById('mensaje-reseña');

    if (!nombre || !cal || !comentario) {
      msg.textContent = 'Completa todos los campos.';
      msg.className = 'mensaje error';
      return;
    }

    const data = obtenerReseñas();
    data[producto.codigo] = data[producto.codigo] || [];
    data[producto.codigo].unshift({
      nombre,
      calificacion: cal,
      comentario,
      fecha: new Date().toISOString()
    });

    guardarReseñas(data);
    form.reset();
    msg.textContent = '¡Reseña publicada correctamente!';
    msg.className = 'mensaje exito';
    prepararReseñas(producto);
  };
}

function escapeHtml(s) {
  return String(s).replace(/[&<>'"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[c]));
}