const tiendasHuertoHogar = [
    { ciudad: 'Santiago', lat: -33.4489, lng: -70.6693 },
    { ciudad: 'Puerto Montt', lat: -41.4689, lng: -72.9411 },
    { ciudad: 'Villarica', lat: -39.2823, lng: -72.2275 },
    { ciudad: 'Nacimiento', lat: -37.5020, lng: -72.6736 },
    { ciudad: 'Viña del Mar', lat: -33.0246, lng: -71.5518 },
    { ciudad: 'Valparaíso', lat: -33.0472, lng: -71.6127 },
    { ciudad: 'Concepción', lat: -36.8201, lng: -73.0444 }
];

function inicializarMapaTiendas() {
    const mapaElemento = document.getElementById('mapa-tiendas');
    const listaElemento = document.getElementById('lista-tiendas');
    if (!mapaElemento || typeof L === 'undefined') return;

    const mapa = L.map(mapaElemento).setView([-36.2, -71.2], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapa);

    const limites = [];
    tiendasHuertoHogar.forEach(tienda => {
        const punto = [tienda.lat, tienda.lng];
        limites.push(punto);
        L.marker(punto).addTo(mapa).bindPopup(`<strong>HuertoHogar</strong><br>${tienda.ciudad}`);

        if (listaElemento) {
            const item = document.createElement('li');
            item.innerHTML = `<button type="button" class="tienda-link">${tienda.ciudad}</button>`;
            item.querySelector('button').addEventListener('click', () => {
                mapa.setView(punto, 10);
                L.popup().setLatLng(punto).setContent(`<strong>HuertoHogar</strong><br>${tienda.ciudad}`).openOn(mapa);
            });
            listaElemento.appendChild(item);
        }
    });

    mapa.fitBounds(limites, { padding: [30, 30] });
}

document.addEventListener('DOMContentLoaded', inicializarMapaTiendas);
