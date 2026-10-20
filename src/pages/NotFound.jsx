import { Link } from 'react-router-dom';
export default function NotFound(){return <main className="container page-container"><h1>Página no encontrada</h1><p>La dirección que buscas no existe.</p><Link to="/" className="btn btn-success">Volver al inicio</Link></main>}
