import { createContext, useContext, useEffect, useState } from 'react';
import { addToCart, getCart, removeFromCart, saveCart, updateCartQuantity } from '../services/cartService.js';
import { getProductById } from '../services/productService.js';
const CartContext = createContext(null);
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => getCart());
  useEffect(() => { saveCart(cart); }, [cart]);
  function addProduct(product) { const latest = getProductById(product.id); if (!latest) throw new Error('El producto ya no está disponible.'); setCart((current) => addToCart(current, latest)); }
  function changeQuantity(id, quantity) { setCart((current) => updateCartQuantity(current, id, quantity)); }
  function removeProduct(id) { setCart((current) => removeFromCart(current, id)); }
  function clearCart() { setCart([]); }
  return <CartContext.Provider value={{ cart, addProduct, changeQuantity, removeProduct, clearCart }}>{children}</CartContext.Provider>;
}
export function useCart() { const context = useContext(CartContext); if (!context) throw new Error('useCart debe utilizarse dentro de CartProvider.'); return context; }
