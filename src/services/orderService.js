const ORDER_KEY = 'huerto-hogar-last-order';
export function saveLastOrder(order) { try { localStorage.setItem(ORDER_KEY, JSON.stringify(order)); } catch { /* almacenamiento no disponible */ } }
export function getLastOrder() { try { const saved = localStorage.getItem(ORDER_KEY); return saved ? JSON.parse(saved) : null; } catch { return null; } }
