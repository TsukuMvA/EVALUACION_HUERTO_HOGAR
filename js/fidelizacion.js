const CLAVE_PUNTOS = 'huertohogar_fidelizacion';
const CLAVE_PEDIDOS = 'huertohogar_pedidos';

function obtenerPuntos() {
  const sesion = obtenerSesion();
  if (!sesion) return null;
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_PUNTOS) || '{}');
    return datos[sesion.usuarioId] || { puntos: 0, pedidosPremiados: [], descuentosCanjeados: 0 };
  } catch { return { puntos: 0, pedidosPremiados: [], descuentosCanjeados: 0 }; }
}

function guardarPuntos(datos) {
  const sesion = obtenerSesion();
  if (!sesion) return;
  const todos = JSON.parse(localStorage.getItem(CLAVE_PUNTOS) || '{}');
  todos[sesion.usuarioId] = datos;
  localStorage.setItem(CLAVE_PUNTOS, JSON.stringify(todos));
}

function nivelPorPuntos(puntos) {
  if (puntos >= 300) return { nombre: 'Huerto', minimo: 300, siguiente: null, beneficio: 'Descuento de demostración y beneficio preferente.' };
  if (puntos >= 100) return { nombre: 'Brote', minimo: 100, siguiente: 300, beneficio: 'Descuento de demostración disponible.' };
  return { nombre: 'Semilla', minimo: 0, siguiente: 100, beneficio: 'Acumulación de puntos.' };
}

function procesarPedidosPremiados() {
  const datos = obtenerPuntos();
  if (!datos) return null;
  const pedidos = JSON.parse(localStorage.getItem(CLAVE_PEDIDOS) || '[]');
  let cambios = false;
  pedidos.forEach(pedido => {
    if (pedido.estado === 'Confirmado' && !datos.pedidosPremiados.includes(pedido.id)) {
      datos.puntos += Math.floor(Number(pedido.total || 0) / 100);
      datos.pedidosPremiados.push(pedido.id);
      cambios = true;
    }
  });
  if (cambios) guardarPuntos(datos);
  return datos;
}

function renderizarFidelizacion() {
  const login = document.getElementById('fidelizacion-login');
  const contenido = document.getElementById('fidelizacion-contenido');
  const sesion = obtenerSesion();
  if (!sesion) { contenido.hidden = true; login.hidden = false; return; }
  contenido.hidden = false; login.hidden = true;

  const datos = procesarPedidosPremiados() || { puntos: 0, descuentosCanjeados: 0 };
  const nivel = nivelPorPuntos(datos.puntos);
  document.getElementById('puntos-actuales').textContent = datos.puntos.toLocaleString('es-CL');
  document.getElementById('nivel-actual').textContent = nivel.nombre;
  document.getElementById('beneficio-nivel').textContent = nivel.beneficio;

  const barra = document.getElementById('barra-progreso');
  const texto = document.getElementById('texto-progreso');
  if (nivel.siguiente) {
    const avance = ((datos.puntos - nivel.minimo) / (nivel.siguiente - nivel.minimo)) * 100;
    barra.style.width = `${Math.max(0, Math.min(100, avance))}%`;
    texto.textContent = `Te faltan ${nivel.siguiente - datos.puntos} puntos para llegar a ${nivel.siguiente} puntos.`;
  } else {
    barra.style.width = '100%';
    texto.textContent = '¡Has alcanzado el nivel máximo del programa!';
  }

  const btn = document.getElementById('btn-canjear');
  btn.disabled = datos.puntos < 100;
  btn.textContent = datos.puntos >= 100 ? 'Canjear 100 puntos' : `Necesitas ${100 - datos.puntos} puntos más`;
  btn.onclick = () => {
    if (datos.puntos < 100) return;
    datos.puntos -= 100;
    datos.descuentosCanjeados = (datos.descuentosCanjeados || 0) + 1;
    guardarPuntos(datos);
    const mensaje = document.getElementById('mensaje-fidelizacion');
    mostrarMensaje(mensaje, 'Canje realizado: obtuviste un descuento de demostración de $1.000 CLP.', 'exito');
    renderizarFidelizacion();
  };
}

document.addEventListener('DOMContentLoaded', renderizarFidelizacion);
