import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Categories from './pages/Categories.jsx';
import Offers from './pages/Offers.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import PurchaseSuccess from './pages/PurchaseSuccess.jsx';
import PurchaseFailure from './pages/PurchaseFailure.jsx';
import Admin from './pages/Admin.jsx';
import NotFound from './pages/NotFound.jsx';
export default function App(){return <BrowserRouter><CartProvider><Navbar/><Routes><Route path="/" element={<Home/>}/><Route path="/productos" element={<Products/>}/><Route path="/categorias" element={<Categories/>}/><Route path="/ofertas" element={<Offers/>}/><Route path="/carrito" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="/compra-exitosa" element={<PurchaseSuccess/>}/><Route path="/compra-fallida" element={<PurchaseFailure/>}/><Route path="/admin" element={<Admin/>}/><Route path="*" element={<NotFound/>}/></Routes><Footer/></CartProvider></BrowserRouter>}
