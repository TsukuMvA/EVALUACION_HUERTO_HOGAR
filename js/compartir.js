function obtenerMensajeCompartir(nombre) {
  return `🌱 ${nombre} en HuertoHogar. Productos frescos y naturales directo a tu hogar.`;
}

function mostrarMensajeCompartir(texto, tipo = 'exito') {
  const el = document.getElementById('mensaje-compartir');
  if (!el) return;
  el.className = `mensaje ${tipo}`;
  el.textContent = texto;
  clearTimeout(window._temporizadorCompartir);
  window._temporizadorCompartir = setTimeout(() => {
    el.className = 'mensaje';
    el.textContent = '';
  }, 3000);
}

async function compartirProducto(producto) {
  const url = `${location.origin}${location.pathname.replace(/[^/]*$/, '')}detalle-producto.html?codigo=${encodeURIComponent(producto.codigo)}`;
  const texto = obtenerMensajeCompartir(producto.nombre);
  const datos = { title: `${producto.nombre} | HuertoHogar`, text: texto, url };

  if (navigator.share) {
    try {
      await navigator.share(datos);
      mostrarMensajeCompartir('Producto compartido correctamente.');
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    mostrarMensajeCompartir('Enlace copiado. Puedes pegarlo en cualquier red social.');
  } catch (error) {
    mostrarMensajeCompartir('No fue posible copiar el enlace.', 'error');
  }
}

function abrirRedSocial(red, producto) {
  const url = `${location.origin}${location.pathname.replace(/[^/]*$/, '')}detalle-producto.html?codigo=${encodeURIComponent(producto.codigo)}`;
  const texto = obtenerMensajeCompartir(producto.nombre);
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(texto);
  let destino = '';

  if (red === 'whatsapp') destino = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
  if (red === 'facebook') destino = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  if (red === 'x') destino = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;

  if (destino) window.open(destino, '_blank', 'noopener,noreferrer,width=700,height=600');
}

function prepararCompartirCatalogo() {
  document.querySelectorAll('.btn-compartir-catalogo').forEach(btn => {
    btn.addEventListener('click', () => {
      const producto = productos.find(p => p.codigo === btn.dataset.codigo);
      if (producto) compartirProducto(producto);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const codigo = params.get('codigo');
  const producto = typeof productos !== 'undefined' ? productos.find(p => p.codigo === codigo) : null;

  document.querySelectorAll('.btn-compartir').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!producto) return;
      const red = btn.dataset.red;
      if (red === 'copiar') {
        const url = `${location.origin}${location.pathname}?codigo=${encodeURIComponent(producto.codigo)}`;
        try {
          await navigator.clipboard.writeText(url);
          mostrarMensajeCompartir('Enlace del producto copiado al portapapeles.');
        } catch (error) {
          mostrarMensajeCompartir('No fue posible copiar el enlace.', 'error');
        }
        return;
      }
      if (red === 'whatsapp' || red === 'facebook' || red === 'x') {
        abrirRedSocial(red, producto);
      }
    });
  });
});
