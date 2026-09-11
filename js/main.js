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
  const disponibilidad = document.getElementById('filtro-disponibilidad')?.value || 'Todas';
  const precioMin = Number(document.getElementById('precio-min')?.value) || 0;
  const precioMaxValor = document.getElementById('precio-max')?.value;
  const precioMax = precioMaxValor === '' ? Infinity : Number(precioMaxValor);
  const orden = document.getElementById('ordenar-productos')?.value || 'relevancia';

  let filtrados = productos.filter(prod => {
    const origen = prod.origen || '';
    const textoProducto = [prod.codigo, prod.nombre, prod.descripcion, prod.categoria, origen]
      .join(' ').toLowerCase();
    const coincideTexto = !texto || textoProducto.includes(texto);
    const coincideCategoria = categoria === 'Todas' || prod.categoria === categoria;
    const tieneStock = Number(prod.stock) > 0;
    const coincideDisponibilidad = disponibilidad === 'Todas' ||
      (disponibilidad === 'Disponible' && tieneStock) ||
      (disponibilidad === 'Agotado' && !tieneStock);
    const coincidePrecio = prod.precio >= precioMin && prod.precio <= precioMax;
    return coincideTexto && coincideCategoria && coincideDisponibilidad && coincidePrecio;
  });

  const comparadores = {
    'nombre-asc': (a,b) => a.nombre.localeCompare(b.nombre, 'es'),
    'nombre-desc': (a,b) => b.nombre.localeCompare(a.nombre, 'es'),
    'precio-asc': (a,b) => a.precio - b.precio,
    'precio-desc': (a,b) => b.precio - a.precio,
    'stock-desc': (a,b) => b.stock - a.stock
  };
  if (comparadores[orden]) filtrados.sort(comparadores[orden]);

  cargarCatalogo(filtrados);
  actualizarResumenFiltros(filtrados.length, { texto, categoria, disponibilidad, precioMin, precioMaxValor, orden });
}

function actualizarResumenFiltros(cantidad, filtros) {
  const resumen = document.getElementById('resumen-filtros');
  if (!resumen) return;
  const activos = [];
  if (filtros.texto) activos.push(`texto: “${filtros.texto}”`);
  if (filtros.categoria !== 'Todas') activos.push(filtros.categoria);
  if (filtros.disponibilidad !== 'Todas') activos.push(filtros.disponibilidad === 'Disponible' ? 'con stock' : 'agotados');
  if (filtros.precioMin > 0) activos.push(`desde ${formatoPrecio(filtros.precioMin)}`);
  if (filtros.precioMaxValor !== '') activos.push(`hasta ${formatoPrecio(Number(filtros.precioMaxValor))}`);
  resumen.textContent = activos.length ? `${cantidad} resultado(s) · ${activos.join(' · ')}` : `Mostrando ${cantidad} producto(s)`;
}

document.addEventListener('DOMContentLoaded', () => {
  cargarCatalogo();
  if (typeof prepararCompartirCatalogo === 'function') prepararCompartirCatalogo();

  ['buscar-producto','filtro-categoria','filtro-disponibilidad','precio-min','precio-max','ordenar-productos'].forEach(id => {
    const elemento = document.getElementById(id);
    elemento?.addEventListener(elemento.tagName === 'INPUT' && elemento.type === 'search' ? 'input' : 'change', aplicarFiltros);
    if (id === 'precio-min' || id === 'precio-max') elemento?.addEventListener('input', aplicarFiltros);
  });

  document.getElementById('limpiar-filtros')?.addEventListener('click', () => {
    document.getElementById('buscar-producto').value = '';
    document.getElementById('filtro-categoria').value = 'Todas';
    document.getElementById('filtro-disponibilidad').value = 'Todas';
    document.getElementById('precio-min').value = '';
    document.getElementById('precio-max').value = '';
    document.getElementById('ordenar-productos').value = 'relevancia';
    cargarCatalogo();
    actualizarResumenFiltros(productos.length, { texto:'', categoria:'Todas', disponibilidad:'Todas', precioMin:0, precioMaxValor:'', orden:'relevancia' });
  });

  actualizarResumenFiltros(productos.length, { texto:'', categoria:'Todas', disponibilidad:'Todas', precioMin:0, precioMaxValor:'', orden:'relevancia' });
});
