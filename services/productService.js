import { initialProducts } from '../data/products.js';
const STORAGE_KEY = 'huerto-hogar-products';
let memoryProducts = initialProducts.map((product) => ({ ...product }));
function readProducts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) { const parsed = JSON.parse(saved); if (Array.isArray(parsed)) return parsed; }
  } catch { /* localStorage puede no estar disponible */ }
  return memoryProducts;
}
function saveProducts(products) {
  memoryProducts = products.map((product) => ({ ...product }));
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryProducts)); } catch { /* fallback en memoria */ }
}
function validate(data) {
  if (!String(data.name ?? '').trim()) throw new Error('El nombre es obligatorio.');
  if (!String(data.category ?? '').trim()) throw new Error('La categoría es obligatoria.');
  if (!Number.isFinite(Number(data.price)) || Number(data.price) < 0) throw new Error('El precio debe ser un número igual o mayor que cero.');
  if (!Number.isInteger(Number(data.stock)) || Number(data.stock) < 0) throw new Error('El stock debe ser un entero igual o mayor que cero.');
}
export function getProducts() { return readProducts().map((p) => ({ ...p })); }
export function getProductById(id) { const p = readProducts().find((x) => x.id === Number(id)); return p ? { ...p } : null; }
export function createProduct(data) {
  validate(data); const products = readProducts();
  const product = { id: Math.max(0, ...products.map((p) => Number(p.id) || 0)) + 1, name: String(data.name).trim(), category: String(data.category).trim(), price: Number(data.price), stock: Number(data.stock), onOffer: Boolean(data.onOffer), image: data.image ?? '', description: data.description ?? '' };
  saveProducts([...products, product]); return { ...product };
}
export function updateProduct(id, changes) {
  const products = readProducts(); const existing = products.find((p) => p.id === Number(id));
  if (!existing) throw new Error('Producto no encontrado.');
  const updated = { ...existing, ...changes, id: existing.id }; validate(updated);
  updated.price = Number(updated.price); updated.stock = Number(updated.stock); updated.name = String(updated.name).trim(); updated.category = String(updated.category).trim();
  saveProducts(products.map((p) => p.id === existing.id ? updated : p)); return { ...updated };
}
export function deleteProduct(id) { const products = readProducts(); const filtered = products.filter((p) => p.id !== Number(id)); if (filtered.length === products.length) return false; saveProducts(filtered); return true; }
export function resetProducts() { memoryProducts = initialProducts.map((p) => ({ ...p })); try { localStorage.removeItem(STORAGE_KEY); } catch { /* no disponible */ } }
