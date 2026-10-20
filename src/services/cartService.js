const CART_KEY = 'huerto-hogar-cart';
export function getCart() { try { const saved = localStorage.getItem(CART_KEY); if (!saved) return []; const parsed = JSON.parse(saved); return Array.isArray(parsed) ? parsed : []; } catch { return []; } }
export function saveCart(cart) { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* fallback sin persistencia */ } }
export function addToCart(cart, product) {
  const stock = Number(product.stock);
  if (!Number.isInteger(stock) || stock <= 0) throw new Error('Este producto no tiene stock disponible.');
  const existing = cart.find((item) => item.id === product.id);
  const currentQuantity = existing ? Number(existing.quantity) : 0;
  if (currentQuantity >= stock) throw new Error('No hay más stock disponible para este producto.');
  if (existing) return cart.map((item) => item.id === product.id ? { ...item, name: product.name, price: Number(product.price), stock, quantity: currentQuantity + 1 } : item);
  return [...cart, { id: product.id, name: product.name, price: Number(product.price), stock, image: product.image ?? '', quantity: 1 }];
}
export function updateCartQuantity(cart, productId, quantity) { const item = cart.find((p) => p.id === Number(productId)); if (!item) throw new Error('El producto no está en el carrito.'); const parsed = Number(quantity); if (!Number.isInteger(parsed) || parsed < 1) throw new Error('La cantidad debe ser un entero mayor que cero.'); if (parsed > item.stock) throw new Error('La cantidad supera el stock disponible.'); return cart.map((p) => p.id === Number(productId) ? { ...p, quantity: parsed } : p); }
export function removeFromCart(cart, productId) { return cart.filter((item) => item.id !== Number(productId)); }
export function getCartTotal(cart) { return cart.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0); }
export function getCartItemCount(cart) { return cart.reduce((count, item) => count + Number(item.quantity), 0); }
