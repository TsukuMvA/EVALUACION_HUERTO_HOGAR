// Validar Formato RUT Chileno (ej: 12345678-9)
function validarRut(rut) {
  if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) return false;
  const tmp = rut.split('-');
  let digv = tmp[1];
  const rutNum = tmp[0];
  if (digv === 'K') digv = 'k';
  
  let M = 0, S = 1;
  let T = parseInt(rutNum, 10);
  for (; T; T = Math.floor(T / 10)) {
    S = (S + (T % 10) * (9 - M++ % 6)) % 11;
  }
  const dvEsperado = S ? (S - 1).toString() : 'k';
  return dvEsperado === digv;
}

// Validar Email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Handler de Validaciones para el Registro
document.addEventListener('DOMContentLoaded', () => {
  const formRegistro = document.getElementById('form-registro');
  if (!formRegistro) return;

  // Cargar selector de regiones si existe el elemento
  if (typeof cargarRegiones === 'function') {
    cargarRegiones('select-region', 'select-comuna');
  }

  formRegistro.addEventListener('submit', (e) => {
    e.preventDefault();

    const rut = document.getElementById('rut')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value;

    if (rut && !validarRut(rut)) {
      alert("El RUT ingresado no es válido. Usa el formato 12345678-K");
      return;
    }

    if (email && !validarEmail(email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (password && password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    alert("¡Registro realizado con éxito!");
    formRegistro.reset();
  });
});