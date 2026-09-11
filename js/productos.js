const productos = [
  {
    codigo: "FR001",
    nombre: "Manzanas Fuji",
    categoria: "Frutas Frescas",
    precio: 1200,
    unidad: "kilo",
    stock: 150,
    origen: "Valle del Maule",
    descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule.",
    sostenibilidad: "Producto de origen local; conocer y destacar su procedencia ayuda a valorar la producción nacional.",
    receta: "Ensalada de manzana, espinaca y miel: combina manzana en cubos con espinaca fresca y un toque de miel."
  },
  {
    codigo: "FR002",
    nombre: "Naranjas Valencia",
    categoria: "Frutas Frescas",
    precio: 1000,
    unidad: "kilo",
    stock: 200,
    descripcion: "Jugosas y ricas en vitamina C, ideales para zumos frescos.",
    sostenibilidad: "Producto fresco de origen no especificado en el documento. Se recomienda completar este dato con el proveedor.",
    receta: "Jugo natural de naranja: exprime las naranjas y sirve frío, sin necesidad de agregar azúcar."
  },
  {
    codigo: "FR003",
    nombre: "Plátanos Cavendish",
    categoria: "Frutas Frescas",
    precio: 800,
    unidad: "kilo",
    stock: 250,
    descripcion: "Plátanos maduros y dulces, ricos en potasio y vitaminas.",
    sostenibilidad: "Producto fresco; se recomienda completar el dato de prácticas sostenibles con información del proveedor.",
    receta: "Batido de plátano: licúa plátano maduro con leche y sirve inmediatamente."
  },
  {
    codigo: "VR001",
    nombre: "Zanahorias Orgánicas",
    categoria: "Verduras Orgánicas",
    precio: 900,
    unidad: "kilo",
    stock: 100,
    origen: "Región de O'Higgins",
    descripcion: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins.",
    sostenibilidad: "El documento señala que son cultivadas sin pesticidas, una práctica destacada para una producción más responsable.",
    receta: "Ensalada de zanahoria: ralla zanahoria fresca y acompaña con hojas verdes y un aliño suave."
  },
  {
    codigo: "VR002",
    nombre: "Espinacas Frescas",
    categoria: "Verduras Orgánicas",
    precio: 700,
    unidad: "bolsa de 500g",
    stock: 80,
    origen: "Información no especificada en el documento.",
    descripcion: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos.",
    sostenibilidad: "El documento indica que son cultivadas bajo prácticas orgánicas.",
    receta: "Batido verde: mezcla espinaca fresca, plátano y agua o leche hasta obtener una textura suave."
  },
  {
    codigo: "VR003",
    nombre: "Pimientos Tricolores",
    categoria: "Verduras Orgánicas",
    precio: 1500,
    unidad: "kilo",
    stock: 120,
    descripcion: "Pimientos rojos, amarillos y verdes, ideales para salteados.",
    sostenibilidad: "Producto fresco; se recomienda completar el detalle de certificaciones o prácticas sostenibles con el proveedor.",
    receta: "Salteado tricolor: corta los pimientos en tiras y saltéalos hasta que queden tiernos y coloridos."
  },
  {
    codigo: "PO001",
    nombre: "Miel Orgánica",
    categoria: "Productos Orgánicos",
    precio: 5000,
    unidad: "frasco de 500g",
    stock: 50,
    origen: "Producida por apicultores locales.",
    descripcion: "Miel pura y orgánica producida por apicultores locales.",
    sostenibilidad: "Producto orgánico producido por apicultores locales, destacando el vínculo con productores de la comunidad.",
    receta: "Aliño de miel: mezcla miel con un poco de aceite y jugo de naranja para acompañar ensaladas."
  },
  {
    codigo: "PO003",
    nombre: "Quinua Orgánica",
    categoria: "Productos Orgánicos",
    precio: 3200,
    unidad: "kilo",
    stock: 60,
    descripcion: "Grano andino súper nutritivo y libre de pesticidas.",
    sostenibilidad: "El documento describe el producto como libre de pesticidas; se recomienda ampliar la información con certificaciones del proveedor.",
    receta: "Ensalada de quinua: cocina la quinua y mézclala con verduras frescas y un aliño ligero."
  },
  {
    codigo: "PL001",
    nombre: "Leche Entera",
    categoria: "Productos Lácteos",
    precio: 1100,
    unidad: "litro",
    stock: 90,
    origen: "Granjas locales.",
    descripcion: "Leche fresca proveniente de granjas locales.",
    sostenibilidad: "Proveniente de granjas locales, reforzando el vínculo de HuertoHogar con productores de cercanía.",
    receta: "Avena con leche y fruta: combina leche con avena cocida y fruta fresca para un desayuno sencillo."
  }
];

function renderizarInformacionExtra(producto) {
  const contenedor = document.getElementById("info-extra-contenido");
  if (!contenedor || !producto) return;
  const origen = producto.origen || "Información no especificada en el documento.";
  const sostenibilidad = producto.sostenibilidad || "Se recomienda completar este dato con información del proveedor.";
  const receta = producto.receta || "Consulta nuestras sugerencias del blog para encontrar ideas de preparación.";
  contenedor.innerHTML = `
    <article class="info-extra-card"><div class="info-extra-icono">📍</div><h3>Origen del producto</h3><p>${escapeHtmlProducto(origen)}</p></article>
    <article class="info-extra-card"><div class="info-extra-icono">🌱</div><h3>Prácticas sostenibles</h3><p>${escapeHtmlProducto(sostenibilidad)}</p></article>
    <article class="info-extra-card"><div class="info-extra-icono">🥗</div><h3>Receta sugerida</h3><p>${escapeHtmlProducto(receta)}</p></article>`;
}

function escapeHtmlProducto(texto) {
  return String(texto).replace(/[&<>"']/g, caracter => ({"&":"&amp;","<":"&lt;",">":"&gt;","":"&quot;","'":"&#039;"}[caracter]));
}
