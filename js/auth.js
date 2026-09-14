const CLAVE_USUARIOS = 'huertohogar_usuarios';
const CLAVE_SESION = 'huertohogar_sesion';

function obtenerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || [];
  } catch {
    return [];
  }
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

async function hashPassword(password) {
  if (!window.crypto?.subtle) {
    return btoa(unescape(encodeURIComponent(password)));
  }

  const datos = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest('SHA-256', datos);
  return [...new Uint8Array(buffer)]
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

function mostrarMensaje(elemento, texto, tipo = 'error') {
  if (!elemento) return;
  elemento.textContent = texto;
  elemento.className = `mensaje ${tipo}`;
}

function validarPasswordSegura(password) {
  return password && password.length >= 8;
}

async function registrarUsuario(evento) {
  evento.preventDefault();

  const form = evento.currentTarget;
  const mensaje = document.getElementById('mensaje-registro');
  const nombre = document.getElementById('nombre')?.value.trim();
  const rut = document.getElementById('rut')?.value.trim();
  const email = document.getElementById('email')?.value.trim().toLowerCase();
  const password = document.getElementById('password')?.value;
  
  const regionElem = document.getElementById('select-region') || document.getElementById('region');
  const comunaElem = document.getElementById('select-comuna') || document.getElementById('comuna');
  
  const region = regionElem ? regionElem.value : '';
  const comuna = comunaElem ? comunaElem.value : '';
  
  const direccion = document.getElementById('direccion')?.value.trim() || '';
  const telefono = document.getElementById('telefono')?.value.trim() || '';

  if (!nombre || !rut || !email || !password || !region || !comuna) {
    mostrarMensaje(mensaje, 'Completa todos los campos obligatorios.');
    return;
  }

  if (typeof validarRut === 'function' && !validarRut(rut)) {
    mostrarMensaje(mensaje, 'El RUT ingresado no es válido. Usa el formato 12345678-K.');
    return;
  }

  if (typeof validarEmail === 'function' && !validarEmail(email)) {
    mostrarMensaje(mensaje, 'Ingresa un correo electrónico válido.');
    return;
  }

  if (!validarPasswordSegura(password)) {
    mostrarMensaje(mensaje, 'La contraseña debe tener al menos 8 caracteres.');
    return;
  }

  const usuarios = obtenerUsuarios();
  if (usuarios.some(usuario => usuario.email === email)) {
    mostrarMensaje(mensaje, 'Ya existe una cuenta registrada con ese correo.');
    return;
  }

  const passwordHash = await hashPassword(password);

  usuarios.push({
    id: crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    nombre,
    rut,
    email,
    passwordHash,
    region,
    comuna,
    direccion,
    telefono,
    creadoEn: new Date().toISOString()
  });

  guardarUsuarios(usuarios);
  form.reset();
  mostrarMensaje(mensaje, '¡Cuenta creada correctamente! Ahora puedes iniciar sesión.', 'exito');

  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1200);
}

async function iniciarSesion(evento) {
  evento.preventDefault();

  const email = document.getElementById('login-email')?.value.trim().toLowerCase();
  const password = document.getElementById('login-password')?.value;
  const mensaje = document.getElementById('mensaje-login');

  if (!email || !password) {
    mostrarMensaje(mensaje, 'Ingresa tu correo y contraseña.');
    return;
  }

  if (email === 'admin@huertohogar.cl' && password === 'Admin123') {
    localStorage.setItem(CLAVE_SESION, JSON.stringify({
      usuarioId: 'admin-001',
      nombre: 'Administrador',
      email: email,
      esAdmin: true,
      inicioSesion: new Date().toISOString()
    }));

    mostrarMensaje(mensaje, '¡Bienvenido Administrador!', 'exito');
    setTimeout(() => {
      window.location.href = 'admin.html';
    }, 900);
    return;
  }

  const usuarios = obtenerUsuarios();
  const usuario = usuarios.find(item => item.email === email);

  if (!usuario) {
    mostrarMensaje(mensaje, 'Correo o contraseña incorrectos.');
    return;
  }

  const passwordHash = await hashPassword(password);
  if (passwordHash !== usuario.passwordHash) {
    mostrarMensaje(mensaje, 'Correo o contraseña incorrectos.');
    return;
  }

  localStorage.setItem(CLAVE_SESION, JSON.stringify({
    usuarioId: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
    esAdmin: false,
    inicioSesion: new Date().toISOString()
  }));

  mostrarMensaje(mensaje, `¡Bienvenido/a, ${usuario.nombre}!`, 'exito');

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 900);
}

function enviarContacto(evento) {
  evento.preventDefault();

  const nombre = document.getElementById('contacto-nombre')?.value.trim();
  const email = document.getElementById('contacto-email')?.value.trim();
  const asunto = document.getElementById('contacto-asunto')?.value.trim();
  const mensajeTexto = document.getElementById('contacto-mensaje')?.value.trim();
  const mensajeElemento = document.getElementById('mensaje-contacto');

  if (!nombre || !email || !asunto || !mensajeTexto) {
    mostrarMensaje(mensajeElemento, 'Completa todos los campos obligatorios.');
    return;
  }

  const mensajes = JSON.parse(localStorage.getItem('huertohogar_contactos')) || [];
  mensajes.push({
    id: Date.now(),
    nombre,
    email,
    asunto,
    mensaje: mensajeTexto,
    fecha: new Date().toISOString()
  });
  localStorage.setItem('huertohogar_contactos', JSON.stringify(mensajes));

  evento.currentTarget.reset();
  mostrarMensaje(mensajeElemento, '¡Mensaje enviado con éxito! Te responderemos pronto.', 'exito');
}

function guardarPerfil(evento) {
  evento.preventDefault();
  const sesion = obtenerSesion();
  if (!sesion) return;
  const usuarios = obtenerUsuarios();
  const usuario = usuarios.find(u => u.id === sesion.usuarioId);
  if (!usuario) return;
  
  if (document.getElementById('perfil-nombre')) usuario.nombre = document.getElementById('perfil-nombre').value.trim();
  if (document.getElementById('perfil-email')) usuario.email = document.getElementById('perfil-email').value.trim().toLowerCase();
  if (document.getElementById('perfil-direccion')) usuario.direccion = document.getElementById('perfil-direccion').value.trim();
  if (document.getElementById('perfil-telefono')) usuario.telefono = document.getElementById('perfil-telefono').value.trim();
  if (document.getElementById('perfil-region')) usuario.region = document.getElementById('perfil-region').value;
  if (document.getElementById('perfil-comuna')) usuario.comuna = document.getElementById('perfil-comuna').value;
  
  guardarUsuarios(usuarios);
  localStorage.setItem(CLAVE_SESION, JSON.stringify({...sesion, nombre: usuario.nombre, email: usuario.email}));
  const mensaje = document.getElementById('mensaje-perfil');
  mostrarMensaje(mensaje, 'Perfil actualizado correctamente.', 'exito');
}

function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
  window.location.href = 'login.html';
}

function obtenerSesion() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_SESION));
  } catch {
    return null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const formRegistro = document.getElementById('form-registro');
  const formLogin = document.getElementById('form-login');
  const formPerfil = document.getElementById('form-perfil');
  const formContacto = document.getElementById('form-contacto');

  if (formRegistro) formRegistro.addEventListener('submit', registrarUsuario);
  if (formLogin) formLogin.addEventListener('submit', iniciarSesion);
  if (formPerfil) formPerfil.addEventListener('submit', guardarPerfil);
  if (formContacto) formContacto.addEventListener('submit', enviarContacto);

  const sesion = obtenerSesion();
  const navPrincipal = document.querySelector('nav[aria-label="Navegación principal"]');

  if (sesion && sesion.esAdmin && navPrincipal) {
    if (!document.getElementById('nav-admin-link')) {
      const adminLink = document.createElement('a');
      adminLink.id = 'nav-admin-link';
      adminLink.href = 'admin.html';
      adminLink.textContent = '⚙️ Admin';
      adminLink.style.fontWeight = 'bold';
      adminLink.style.color = '#ffeb3b';

      navPrincipal.appendChild(adminLink);
    }
  }
});