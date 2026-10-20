import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { getCartItemCount } from '../services/cartService.js';
const links = [['Inicio', '/'], ['Productos', '/productos'], ['Categorías', '/categorias'], ['Ofertas', '/ofertas'], ['Administración', '/admin']];
export default function Navbar() {
  const { cart } = useCart(); const count = getCartItemCount(cart);
  return <nav className="navbar navbar-expand-lg navbar-dark bg-success"><div className="container">
    <NavLink className="navbar-brand fw-bold" to="/">🌱 Huerto Hogar</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Abrir o cerrar menú"><span className="navbar-toggler-icon" /></button>
    <div className="collapse navbar-collapse" id="mainNavbar"><div className="navbar-nav ms-auto align-items-lg-center">
      {links.map(([label, to]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-link${isActive ? ' active fw-bold' : ''}`}>{label}</NavLink>)}
      <NavLink to="/carrito" className={({ isActive }) => `nav-link${isActive ? ' active fw-bold' : ''}`}>Carrito <span className="badge text-bg-light">{count}</span></NavLink>
    </div></div>
  </div></nav>;
}
