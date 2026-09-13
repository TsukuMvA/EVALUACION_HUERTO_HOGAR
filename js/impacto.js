(function() {
  const pedidos = obtenerPedidos();
  const sesion = obtenerSesion();

  const propios = sesion ? pedidos.filter(p => p.cliente?.email === sesion.email) : [];
  const compras = propios.flatMap(p => p.productos || []);

  const locales = compras.filter(item => {
    const producto = productos.find(p => p.codigo === item.codigo);
    return producto && Boolean(producto.origen) && /local|maule|o'higgins|ohiggins|granjas/i.test(producto.origen);
  });

  const valorLocal = locales.reduce((sum, item) => sum + Number(item.subtotal || item.precio * item.cantidad || 0), 0);
  const unidadesLocales = locales.reduce((sum, item) => sum + Number(item.cantidad || 0), 0);
  const puntosImpacto = Math.min(100, unidadesLocales * 10 + (valorLocal >= 10000 ? 20 : valorLocal >= 5000 ? 10 : 0));

  const indicador = document.getElementById('indicador-impacto');
  const detalle = document.getElementById('detalle-impacto');
  const barra = document.getElementById('barra-impacto');
  const aporte = document.getElementById('aporte-comunidad');
  const detalleComunidad = document.getElementById('detalle-comunidad');
  const comprasLocales = document.getElementById('compras-locales');

  if (!sesion) {
    indicador.textContent = 'Inicia sesión';
    detalle.textContent = 'Inicia sesión para consultar el impacto asociado a tus propios pedidos.';
    return;
  }

  if (!propios.length) {
    indicador.textContent = 'Sin compras registradas';
    detalle.textContent = 'Cuando confirmes un pedido, aquí podrás consultar tu indicador educativo.';
  } else {
    const nivel = puntosImpacto >= 70 ? 'Alto' : puntosImpacto >= 30 ? 'Medio' : 'Inicial';
    indicador.textContent = `Impacto ${nivel}`;
    detalle.textContent = `${puntosImpacto}/100 puntos educativos asociados a compras con origen local identificado.`;
  }

  barra.style.width = `${puntosImpacto}%`;
  aporte.textContent = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(valorLocal);

  detalleComunidad.textContent = locales.length 
    ? `${locales.length} línea(s) de productos con origen local identificado.` 
    : 'Aún no hay productos con origen local identificado en tus pedidos.';
    
  comprasLocales.textContent = unidadesLocales;
})();