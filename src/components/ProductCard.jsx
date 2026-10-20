const formatCLP = (amount) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount);
export default function ProductCard({ product, onAddToCart }) {
  const outOfStock = Number(product.stock) <= 0;
  return <article className="card product-card h-100">{product.image ? <img src={product.image} className="card-img-top" alt={product.name} loading="lazy"/> : <div className="product-placeholder" role="img" aria-label={`Imagen no disponible de ${product.name}`}>🌱</div>}
    <div className="card-body d-flex flex-column"><div className="d-flex justify-content-between align-items-start gap-2 mb-2"><span className="badge text-bg-success">{product.category}</span>{product.onOffer && <span className="badge text-bg-warning">Oferta</span>}</div>
      <h2 className="h5 card-title">{product.name}</h2><p className="card-text text-muted">{product.description || 'Producto fresco para tu hogar.'}</p><p className="mb-2"><strong className="fs-5">{formatCLP(product.price)}</strong></p>
      <p className={`small ${outOfStock ? 'text-danger' : 'text-muted'}`}>{outOfStock ? 'Sin stock disponible' : `Stock disponible: ${product.stock}`}</p><button type="button" className="btn btn-success mt-auto" disabled={outOfStock} onClick={() => onAddToCart(product)}>{outOfStock ? 'Agotado' : 'Agregar al carrito'}</button>
    </div></article>;
}
