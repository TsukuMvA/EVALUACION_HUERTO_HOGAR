const regionesYComunas = [
  {
    region: "Región Metropolitana",
    comunas: ["Santiago Centro", "Providencia", "Las Condes", "Maipú"]
  },
  {
    region: "Región de Valparaíso",
    comunas: ["Viña del Mar", "Valparaíso", "Quilpué"]
  },
  {
    region: "Región del Biobío",
    comunas: ["Concepción", "Talcahuano", "Chillán"]
  }
];

function cargarRegiones(selectRegionId, selectComunaId, regionInicial = '', comunaInicial = '') {
  const selectRegion = document.getElementById(selectRegionId);
  const selectComuna = document.getElementById(selectComunaId);

  if (!selectRegion || !selectComuna) return;

  selectRegion.innerHTML = '<option value="">Seleccione Región</option>';
  regionesYComunas.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.region;
    opt.textContent = item.region;
    selectRegion.appendChild(opt);
  });

  const seleccionarComuna = (comunaInicialActual = '') => {
    const regionSeleccionada = selectRegion.value;
    selectComuna.innerHTML = '<option value="">Seleccione Comuna</option>';
    const encontrada = regionesYComunas.find(r => r.region === regionSeleccionada);
    if (encontrada) {
      encontrada.comunas.forEach(comuna => {
        const opt = document.createElement('option');
        opt.value = comuna;
        opt.textContent = comuna;
        selectComuna.appendChild(opt);
      });
      if (comunaInicialActual) selectComuna.value = comunaInicialActual;
    }
  };

  selectRegion.addEventListener('change', () => {
    const regionSeleccionada = selectRegion.value;
    selectComuna.innerHTML = '<option value="">Seleccione Comuna</option>';

    seleccionarComuna();
  });

  if (regionInicial) {
    selectRegion.value = regionInicial;
    seleccionarComuna(comunaInicial);
  }
}
