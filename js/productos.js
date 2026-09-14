// Listado completo de productos según el documento oficial de HuertoHogar
const PRODUCTOS_BASE = [
  {
    id: 1,
    codigo: 'FR001',
    nombre: 'Manzanas Fuji',
    precio: 1200,
    categoria: 'Frutas Frescas',
    imagen: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop',
    descripcion: 'Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule.',
    origen: 'Valle del Maule',
    disponibilidad: 'Disponible',
    stock: 150
  },
  {
    id: 2,
    codigo: 'FR002',
    nombre: 'Naranjas Valencia',
    precio: 1000,
    categoria: 'Frutas Frescas',
    imagen: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500&auto=format&fit=crop',
    descripcion: 'Jugosas y ricas en vitamina C, ideales para zumos frescos y refrescantes.',
    origen: 'Valle Central',
    disponibilidad: 'Disponible',
    stock: 200
  },
  {
    id: 3,
    codigo: 'FR003',
    nombre: 'Plátanos Cavendish',
    precio: 800,
    categoria: 'Frutas Frescas',
    imagen: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop',
    descripcion: 'Plátanos maduros y dulces, perfectos para el desayuno o como snack energético.',
    origen: 'Zona Norte',
    disponibilidad: 'Disponible',
    stock: 250
  },
  {
    id: 4,
    codigo: 'VR001',
    nombre: 'Zanahorias Orgánicas',
    precio: 900,
    categoria: 'Verduras Orgánicas',
    imagen: 'https://images.unsplash.com/photo-1598170845058-12ef4a457939?w=500&auto=format&fit=crop',
    descripcion: 'Zanahorias crujientes cultivadas sin pesticidas en la Región de O\'Higgins.',
    origen: 'Región de O\'Higgins',
    disponibilidad: 'Disponible',
    stock: 100
  },
  {
    id: 5,
    codigo: 'VR002',
    nombre: 'Espinacas Frescas',
    precio: 700,
    categoria: 'Verduras Orgánicas',
    imagen: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop',
    descripcion: 'Espinacas frescas y nutritivas por bolsa de 500g, perfectas para batidos verdes.',
    origen: 'Maipú',
    disponibilidad: 'Disponible',
    stock: 80
  },
  {
    id: 6,
    codigo: 'VR003',
    nombre: 'Pimientos Tricolores',
    precio: 1500,
    categoria: 'Verduras Orgánicas',
    imagen: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&auto=format&fit=crop',
    descripcion: 'Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos.',
    origen: 'Paine',
    disponibilidad: 'Disponible',
    stock: 120
  },
  {
    id: 7,
    codigo: 'PO001',
    nombre: 'Miel Orgánica',
    precio: 5000,
    categoria: 'Productos Orgánicos',
    imagen: 'https://www.google.com/imgres?q=miel%20organica&imgurl=https%3A%2F%2Fnaturel.cl%2Fcdn%2Fshop%2Ffiles%2FMIel_Multifloral_600grs.png%3Fv%3D1736988879%26width%3D3840&imgrefurl=https%3A%2F%2Fnaturel.cl%2Fproducts%2Fmiel-multifloral-600grs%3Fsrsltid%3DAfmBOoobhJdYY-sNug1wWSfXVd8cfTfSu0sywEJiYh1GgH7uQgHPhWEE&docid=lUDxTa5ltYt-4M&tbnid=BYovnj85eoVuqM&vet=12ahUKEwiWz8Gjie2WAxXss5UCHfYiIM0QnPAOegQIMRAA..i&w=1080&h=1080&hcb=2&ved=2ahUKEwiWz8Gjie2WAxXss5UCHfYiIM0QnPAOegQIMRAAhttps://www.google.com/imgres?q=miel%20organica&imgurl=https%3A%2F%2Fadagio.cl%2Fcdn%2Fshop%2Ffiles%2Fmiel-organica-ulmo.jpg%3Fv%3D1701198006%26width%3D1280&imgrefurl=https%3A%2F%2Fadagio.cl%2Fproducts%2Fmiel-de-ulmo-organica-adagio-bees%3Fsrsltid%3DAfmBOoq06q6ECM9TCFO-_3kgVd821ZsG45r8KP__lBFMM0uqevxES-uv&docid=RB4G09u_PrmmyM&tbnid=m5guEi6WEfOL7M&vet=12ahUKEwiWz8Gjie2WAxXss5UCHfYiIM0QnPAOegUIlwEQAA..i&w=1280&h=1280&hcb=2&ved=2ahUKEwiWz8Gjie2WAxXss5UCHfYiIM0QnPAOegUIlwEQAA',
    descripcion: 'Miel pura y orgánica por frasco de 500g producida por apicultores locales.',
    origen: 'Curacaví',
    disponibilidad: 'Disponible',
    stock: 50
  },
  {
    id: 8,
    codigo: 'PO003',
    nombre: 'Quinua Orgánica',
    precio: 3200,
    categoria: 'Productos Orgánicos',
    imagen: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop',
    descripcion: 'Quinua orgánica rica en proteínas, ideal para ensaladas y guisos saludables.',
    origen: 'Valle del Elqui',
    disponibilidad: 'Disponible',
    stock: 90
  },
  {
    id: 9,
    codigo: 'PL001',
    nombre: 'Leche Entera',
    precio: 1100,
    categoria: 'Productos Lácteos',
    imagen: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop',
    descripcion: 'Leche entera fresca de granja local, rica en calcio y nutrientes esenciales.',
    origen: 'Melipilla',
    disponibilidad: 'Disponible',
    stock: 110
  }
];

function mapearCategoria(cat) {
  const mapa = {
    'frutas': 'Frutas Frescas',
    'verduras': 'Verduras Orgánicas',
    'organicos': 'Productos Orgánicos',
    'lacteos': 'Productos Lácteos',
    'hierbas': 'Productos Orgánicos',
    'macetas': 'Productos Orgánicos'
  };
  return mapa[cat?.toLowerCase()] || 'Productos Orgánicos';
}

function obtenerTodosLosProductos() {
  let productosCustom = [];
  try {
    productosCustom = JSON.parse(localStorage.getItem('huertohogar_productos_custom')) || [];
  } catch (e) {
    productosCustom = [];
  }

  const productosCustomFormateados = productosCustom.map(prod => ({
    id: prod.id || Date.now(),
    codigo: prod.codigo || `ADM-${prod.id}`,
    nombre: prod.nombre,
    precio: Number(prod.precio),
    categoria: mapearCategoria(prod.categoria),
    imagen: prod.imagen || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500',
    descripcion: prod.descripcion || 'Producto fresco agregado desde el panel de administración.',
    origen: prod.origen || 'Productor Local',
    disponibilidad: prod.stock > 0 ? 'Disponible' : 'Agotado',
    stock: Number(prod.stock) || 10
  }));

  return [...PRODUCTOS_BASE, ...productosCustomFormateados];
}

window.agregarAlCarrito = function(id) {
  const productos = obtenerTodosLosProductos();
  const producto = productos.find(p => p.id === id);
  
  if (!producto) return;

  let carrito = [];
  try {
    carrito = JSON.parse(localStorage.getItem('huertohogar_carrito')) || [];
  } catch (e) {
    carrito = [];
  }

  const index = carrito.findIndex(item => item.id === id);
  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem('huertohogar_carrito', JSON.stringify(carrito));
  
  const contador = document.getElementById('contador-carrito');
  if (contador) {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = totalItems;
  }

  alert(`¡${producto.nombre} agregado al carrito!`);
};

document.addEventListener('DOMContentLoaded', () => {
  const inputBuscar = document.getElementById('buscar-producto');
  const selectCategoria = document.getElementById('filtro-categoria');
  const selectDisponibilidad = document.getElementById('filtro-disponibilidad');
  const inputPrecioMin = document.getElementById('precio-min');
  const inputPrecioMax = document.getElementById('precio-max');
  const selectOrdenar = document.getElementById('ordenar-productos');
  const btnLimpiar = document.getElementById('limpiar-filtros');
  const contenedorCatalogo = document.getElementById('catalogo');
  const elemResultado = document.getElementById('resultado-catalogo');
  const elemResumen = document.getElementById('resumen-filtros');
  const divSinResultados = document.getElementById('sin-resultados');

  // SVG de respaldo directo si falla la carga de una imagen
  const IMAGEN_FALLBACK = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20px' fill='%2364748b'%3EImagen no disponible%3C/text%3E%3C/svg%3E";

  function renderizarCatalogo() {
    if (!contenedorCatalogo) return;

    let lista = obtenerTodosLosProductos();

    const textoBusqueda = inputBuscar?.value.toLowerCase().trim() || '';
    const catSelec = selectCategoria?.value || 'Todas';
    const dispSelec = selectDisponibilidad?.value || 'Todas';
    const pMin = parseFloat(inputPrecioMin?.value) || 0;
    const pMax = parseFloat(inputPrecioMax?.value) || Infinity;
    const orden = selectOrdenar?.value || 'relevancia';

    lista = lista.filter(prod => {
      const coincideTexto = prod.nombre.toLowerCase().includes(textoBusqueda) ||
                            prod.codigo.toLowerCase().includes(textoBusqueda) ||
                            prod.descripcion.toLowerCase().includes(textoBusqueda) ||
                            prod.origen.toLowerCase().includes(textoBusqueda);

      const coincideCat = (catSelec === 'Todas') || (prod.categoria === catSelec);
      const coincideDisp = (dispSelec === 'Todas') || (prod.disponibilidad === dispSelec);
      const coincidePrecio = prod.precio >= pMin && prod.precio <= pMax;

      return coincideTexto && coincideCat && coincideDisp && coincidePrecio;
    });

    if (orden === 'nombre-asc') lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (orden === 'nombre-desc') lista.sort((a, b) => b.nombre.localeCompare(a.nombre));
    if (orden === 'precio-asc') lista.sort((a, b) => a.precio - b.precio);
    if (orden === 'precio-desc') lista.sort((a, b) => b.precio - a.precio);
    if (orden === 'stock-desc') lista.sort((a, b) => b.stock - a.stock);

    if (elemResultado) {
      elemResultado.textContent = `Mostrando ${lista.length} producto(s).`;
    }

    if (elemResumen) {
      elemResumen.textContent = `Categoría: ${catSelec} | Búsqueda: "${textoBusqueda || 'Todas'}"`;
    }

    if (lista.length === 0) {
      contenedorCatalogo.innerHTML = '';
      if (divSinResultados) divSinResultados.hidden = false;
      return;
    }

    if (divSinResultados) divSinResultados.hidden = true;

    contenedorCatalogo.innerHTML = lista.map(prod => `
      <article class="tarjeta-producto" style="background:#fff; border-radius:10px; padding:15px; box-shadow: 0 4px 10px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between;">
        <img src="${prod.imagen}" alt="${prod.nombre}" onerror="this.onerror=null; this.src='${IMAGEN_FALLBACK}';" style="width:100%; height:180px; object-fit:cover; border-radius:8px;">
        <span style="font-size:0.8rem; color:#666; margin-top:10px; display:block;">Código: ${prod.codigo} | ${prod.categoria}</span>
        <h3 style="margin:5px 0; font-size:1.2rem;">${prod.nombre}</h3>
        <p style="font-size:0.85rem; color:#777; margin-bottom:5px;">Origen: ${prod.origen}</p>
        <p style="font-size:0.9rem; color:#555; flex-grow:1;">${prod.descripcion}</p>
        <div style="margin-top:10px; font-weight:bold; font-size:1.1rem; color:#2e7d32;">
          $${prod.precio.toLocaleString('es-CL')} CLP
        </div>
        <button onclick="agregarAlCarrito(${prod.id})" class="btn-submit" style="margin-top:10px; width:100%; background:#2e7d32; color:white; border:none; padding:10px; border-radius:6px; cursor:pointer;">
          Agregar al Carrito
        </button>
      </article>
    `).join('');
  }

  [inputBuscar, selectCategoria, selectDisponibilidad, inputPrecioMin, inputPrecioMax, selectOrdenar].forEach(elem => {
    if (elem) elem.addEventListener('input', renderizarCatalogo);
  });

  if (btnLimpiar) {
    btnLimpiar.addEventListener('click', () => {
      if (inputBuscar) inputBuscar.value = '';
      if (selectCategoria) selectCategoria.value = 'Todas';
      if (selectDisponibilidad) selectDisponibilidad.value = 'Todas';
      if (inputPrecioMin) inputPrecioMin.value = '';
      if (inputPrecioMax) inputPrecioMax.value = '';
      if (selectOrdenar) selectOrdenar.value = 'relevancia';
      renderizarCatalogo();
    });
  }

  renderizarCatalogo();
});