import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { getProducts } from '../services/productService.js';
import { useCart } from '../context/CartContext.jsx';
export default function Products() {
 const [products,setProducts]=useState([]); const [query,setQuery]=useState(''); const [category,setCategory]=useState('Todas'); const [offersOnly,setOffersOnly]=useState(false); const [message,setMessage]=useState(''); const [error,setError]=useState(''); const {addProduct}=useCart();
 useEffect(()=>{setProducts(getProducts());},[]);
 const categories=useMemo(()=>['Todas',...new Set(products.map(p=>p.category).filter(Boolean))],[products]);
 const filtered=useMemo(()=>products.filter(p=>(p.name.toLowerCase().includes(query.toLowerCase())||p.category.toLowerCase().includes(query.toLowerCase()))&&(category==='Todas'||p.category===category)&&(!offersOnly||p.onOffer)),[products,query,category,offersOnly]);
 function add(product){setMessage('');setError('');try{addProduct(product);setMessage(`${product.name} se agregó al carrito.`);}catch(e){setError(e.message);}}
 return <main className="container page-container"><div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4"><div><h1 className="section-title">Nuestros productos</h1><p className="text-muted mb-0">Encuentra tus favoritos para el hogar.</p></div><span className="badge text-bg-success fs-6">{filtered.length} productos</span></div>
 {message&&<div className="alert alert-success" role="status">{message}</div>}{error&&<div className="alert alert-danger" role="alert">{error}</div>}
 <div className="row g-3 mb-4"><div className="col-md-5"><label htmlFor="searchProduct" className="form-label">Buscar</label><input id="searchProduct" className="form-control" placeholder="Nombre o categoría" value={query} onChange={e=>setQuery(e.target.value)}/></div><div className="col-md-4"><label htmlFor="categoryFilter" className="form-label">Categoría</label><select id="categoryFilter" className="form-select" value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></div><div className="col-md-3 d-flex align-items-end"><div className="form-check mb-2"><input id="offersOnly" className="form-check-input" type="checkbox" checked={offersOnly} onChange={e=>setOffersOnly(e.target.checked)}/><label className="form-check-label" htmlFor="offersOnly">Solo ofertas</label></div></div></div>
 {filtered.length===0?<div className="alert alert-info">No se encontraron productos con esos filtros.</div>:<div className="row g-4">{filtered.map(p=><div className="col-sm-6 col-lg-4" key={p.id}><ProductCard product={p} onAddToCart={add}/></div>)}</div>}</main>;
}
