// Validar Formato RUT Chileno (ej: 12345678-9)
function validarRut(rut) {
  if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) return false;
  const tmp = rut.split('-');
  let digv = tmp[1].toLowerCase();
  const rutNum = tmp[0];
  let M = 0, S = 1;
  let T = parseInt(rutNum, 10);
  for (; T; T = Math.floor(T / 10)) {
    S = (S + (T % 10) * (9 - M++ % 6)) % 11;
  }
  const dvEsperado = S ? (S - 1).toString() : 'k';
  return dvEsperado === digv;
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof cargarRegiones === 'function') {
    cargarRegiones('select-region', 'select-comuna');
  }
});
