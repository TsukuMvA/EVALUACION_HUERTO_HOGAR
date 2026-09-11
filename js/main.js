function formatoPrecio(precio) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(precio);
}

function cargarCatalogo(lista = productos) {
  const contenedorCatalogo = document.getElementById('catalogo');
  const sinResultados = document.getElementById('sin-resultados');
  const resultado = document.getElementById('resultado-catalogo');
  if (!contenedorCatalogo) return;

  contenedorCatalogo.innerHTML = '';

  lista.forEach(prod => {
    const divProducto = document.createElement('article');
    divProducto.className = 'producto-card';
    divProducto.innerHTML = `
      <div class="producto-imagen" aria-hidden="true">${iconoCategoria(prod.categoria)}</div>
      <div class="producto-contenido">
        <div class="producto-meta">
          <span class="categoria-badge">${prod.categoria}</span>
          <span class="codigo-producto">${prod.codigo}</span>
        </div>
        <h2>${prod.nombre}</h2>
        <p class="descripcion-producto">${prod.descripcion}</p>
        <div class="producto-info">
          <p><strong>Precio</strong><br>${formatoPrecio(prod.precio)} / ${prod.unidad}</p>
          <p><strong>Disponibilidad</strong><br><span class="stock">${prod.stock} ${prod.unidad.includes('bolsa') ? 'bolsas' : prod.unidad.includes('frasco') ? 'frascos' : prod.unidad.includes('litro') ? 'litros' : 'kg'}</span></p>
        </div>
        <p class="origen-producto"><strong>Origen / procedencia:</strong> ${prod.origen || 'Información no especificada en el documento.'}</p>
        <div class="producto-acciones">
          <a class="btn-secundario" href="detalle-producto.html?codigo=${encodeURIComponent(prod.codigo)}">Ver detalle</a>
          <button class="btn-agregar" type="button" onclick="agregarAlCarrito('${prod.nombre.replace(/'/g, "\\'")}', ${prod.precio})">Agregar al carrito</button>
        </div>
      </div>
    `;
    contenedorCatalogo.appendChild(divProducto);
  });

  const cantidad = lista.length;
  if (resultado) resultado.textContent = `${cantidad} ${cantidad === 1 ? 'producto encontrado' : 'productos encontrados'}`;
  if (sinResultados) sinResultados.hidden = cantidad !== 0;
}

function iconoCategoria(categoria) {
  const iconos = {
    'Frutas Frescas': '🍎',
    'Verduras Orgánicas': '🥕',
    'Productos Orgánicos': '🍯',
    'Productos Lácteos': '🥛'
  };
  return iconos[categoria] || '🌱';
}

function aplicarFiltros() {
  const texto = document.getElementById('buscar-producto')?.value.trim().toLowerCase() || '';
  const categoria = document.getElementById('filtro-categoria')?.value || 'Todas';

  const filtrados = productos.filter(prod => {
    const coincideCategoria = categoria === 'Todas' || prod.categoria === categoria;
    const coincideTexto = !texto || [prod.codigo, prod.nombre, prod.descripcion, prod.categoria].some(valor =>
      String(valor).toLowerCase().includes(texto)
    );
    return coincideCategoria && coincideTexto;
  });

  cargarCatalogo(filtrados);
}

document.addEventListener('DOMContentLoaded', () => {
  cargarCatalogo();

  document.getElementById('buscar-producto')?.addEventListener('input', aplicarFiltros);
  document.getElementById('filtro-categoria')?.addEventListener('change', aplicarFiltros);
  document.getElementById('limpiar-filtros')?.addEventListener('click', () => {
    document.getElementById('buscar-producto').value = '';
    document.getElementById('filtro-categoria').value = 'Todas';
    cargarCatalogo();
  });
});