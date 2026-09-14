document.addEventListener('DOMContentLoaded', () => {
  const formAgregar = document.getElementById('form-agregar-producto');
  const tablaProductos = document.getElementById('tabla-productos');
  const listaMensajes = document.getElementById('lista-mensajes');
  const mensajeAdmin = document.getElementById('mensaje-admin');

  // Claves en LocalStorage
  const CLAVE_PRODUCTOS = 'huertohogar_productos_custom';
  const CLAVE_CONTACTOS = 'huertohogar_contactos';

  // Cargar inicial
  renderizarProductos();
  renderizarMensajes();

  // Función para agregar nuevo producto
  if (formAgregar) {
    formAgregar.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('admin-nombre').value.trim();
      const precio = parseInt(document.getElementById('admin-precio').value);
      const categoria = document.getElementById('admin-categoria').value;
      const imagen = document.getElementById('admin-imagen').value.trim();

      if (!nombre || !precio || !categoria || !imagen) {
        mostrarMensaje('Completa todos los campos del producto.', 'error');
        return;
      }

      const nuevosProductos = obtenerProductosGuardados();
      const nuevoItem = {
        id: Date.now(),
        nombre,
        precio,
        categoria,
        imagen
      };

      nuevosProductos.push(nuevoItem);
      localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(nuevosProductos));

      formAgregar.reset();
      mostrarMensaje('¡Producto agregado con éxito!', 'exito');
      renderizarProductos();
    });
  }

  function obtenerProductosGuardados() {
    try {
      return JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS)) || [];
    } catch {
      return [];
    }
  }

  function renderizarProductos() {
    if (!tablaProductos) return;
    const productos = obtenerProductosGuardados();

    if (productos.length === 0) {
      tablaProductos.innerHTML = `<tr><td colspan="5" style="padding: 15px; text-align: center;">No hay productos personalizados agregados aún.</td></tr>`;
      return;
    }

    tablaProductos.innerHTML = productos.map(prod => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px;">${prod.id}</td>
        <td style="padding: 12px; font-weight: bold;">${prod.nombre}</td>
        <td style="padding: 12px;">$${prod.precio.toLocaleString('es-CL')}</td>
        <td style="padding: 12px;">${prod.categoria}</td>
        <td style="padding: 12px; text-align: center;">
          <button onclick="eliminarProducto(${prod.id})" style="background: #d9534f; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Eliminar</button>
        </td>
      </tr>
    `).join('');
  }

  // Eliminar producto
  window.eliminarProducto = function(id) {
    let productos = obtenerProductosGuardados();
    productos = productos.filter(p => p.id !== id);
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos));
    renderizarProductos();
  };

  function renderizarMensajes() {
    if (!listaMensajes) return;
    const mensajes = JSON.parse(localStorage.getItem(CLAVE_CONTACTOS)) || [];

    if (mensajes.length === 0) {
      listaMensajes.innerHTML = `<p style="text-align: center; color: #666;">No hay mensajes de contacto registrados.</p>`;
      return;
    }

    listaMensajes.innerHTML = mensajes.map(m => `
      <div style="background: #fff; border-left: 4px solid #2e7d32; padding: 15px; border-radius: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
        <p style="margin: 0 0 5px 0;"><strong>De:</strong> ${m.nombre} (${m.email})</p>
        <p style="margin: 0 0 5px 0;"><strong>Asunto:</strong> ${m.asunto}</p>
        <p style="margin: 0; color: #444;"><strong>Mensaje:</strong> ${m.mensaje}</p>
        <small style="color: #888; display: block; margin-top: 8px;">Fecha: ${new Date(m.fecha).toLocaleString()}</small>
      </div>
    `).join('');
  }

  function mostrarMensaje(texto, tipo) {
    if (!mensajeAdmin) return;
    mensajeAdmin.textContent = texto;
    mensajeAdmin.className = `mensaje ${tipo === 'error' ? 'alert alert-danger' : 'alert alert-success'}`;
    mensajeAdmin.style.display = 'block';
    mensajeAdmin.style.padding = '10px';
    mensajeAdmin.style.marginBottom = '15px';
    mensajeAdmin.style.borderRadius = '5px';
    
    if (tipo === 'error') {
      mensajeAdmin.style.backgroundColor = '#f8d7da';
      mensajeAdmin.style.color = '#721c24';
    } else {
      mensajeAdmin.style.backgroundColor = '#d4edda';
      mensajeAdmin.style.color = '#155724';
    }
  }
});