function cargarCatalogo() {
  const contenedorCatalogo = document.getElementById('catalogo');
  if (!contenedorCatalogo) return;

  contenedorCatalogo.innerHTML = '';

  productos.forEach(prod => {
    const divProducto = document.createElement('div');
    divProducto.className = 'producto';
    divProducto.innerHTML = `
      <small style="color: #666666;">${prod.categoria}</small>
      <h3>${prod.nombre}</h3>
      <p style="font-size: 0.9em; color: #333333;">${prod.descripcion}</p>
      <p><strong>Precio:</strong> $${prod.precio} / ${prod.unidad}</p>
      <button class="btn-agregar" onclick="agregarAlCarrito('${prod.nombre}', ${prod.precio})">
        Agregar al Carrito
      </button>
    `;
    contenedorCatalogo.appendChild(divProducto);
  });
}

document.addEventListener('DOMContentLoaded', cargarCatalogo);