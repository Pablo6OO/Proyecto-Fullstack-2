import React from 'react';
import '../style.css';
import ProductCard from './ProductCard';
import Carrusel from './carrusel';
import CustomerReviews from './CustomerReviews';
import { useSearch } from '../context/SearchContext';


const PRODUCTS = [
  {
    id: 1,
    name: "Taza de gato negro",
    price: 2990,
    priceFormatted: "$2.990",
    description: "Taza de gato negro",
    image: "taza1.jpg",
    reviewAuthor: "Juan Rodríguez",
    reviewComment: "Buena taza, aunque un poco más pequeña de lo que esperaba. Cumple su función.",
    reviewRating: 4,
  },
  {
    id: 2,
    name: "Hervidor generico",
    price: 12500,
    priceFormatted: "$12.500",
    description: "hervidor de agua generico y economico",
    image: "hervidor1.webp",
    reviewAuthor: "Juan Rodríguez",
    reviewComment: "buen hervidor cumple su funcion",
    reviewRating: 4,
  },
  {
    id: 3,
    name: "Mouse Inalambrico",
    price: 20000,
    priceFormatted: "$20.000",
    description: "Mouse inalambrico con buena precision",
    image: "mouse.webp",
    reviewAuthor: null,
    reviewComment: null,
    reviewRating: 0,
  },
  {
    id: 4,
    name: "Tostador Manual",
    price: 1900,
    priceFormatted: "$1.900",
    description: "Tostador manual para pan",
    image: "tostador.webp",
    reviewAuthor: null,
    reviewComment: null,
    reviewRating: 0,
  }
  ,
  {
    id: 5,
    name: "USB Sandisk",
    price: 5000,
    priceFormatted: "$5.000",
    description: "USB SanDisk de 64GB",
    image: "usb.avif",
    reviewAuthor: null,
    reviewComment: null,
    reviewRating: 0,
  },
    {
    id: 6,
    name: "Sanduchera Eléctrica",
    price: 12000,
    priceFormatted: "$12.000",
    description: "sanduchera electrica para preparar ricos sándwiches",
    image: "sandwich.webp",
    reviewAuthor: null,
    reviewComment: null,
    reviewRating: 0,
  }
];
function Inicio() {
  const { searchTerm, setSearchTerm } = useSearch();
  const adminProducts = (() => {
    try {
      const stored = JSON.parse(localStorage.getItem('products')) || [];
      return stored.map((p, idx) => ({
        ...p,
        id: `admin-${idx}`,
        priceFormatted: `$${Number(p.price).toLocaleString('es-CL')}`,
        image: p.image
      }));
    } catch {
      return [];
    }
  })();

  const allProducts = [...PRODUCTS, ...adminProducts];

  const filtered = allProducts.filter(product => {
    if (!searchTerm || searchTerm.trim() === '') return true;
    const q = searchTerm.toLowerCase();
    return (
      (product.name && product.name.toLowerCase().includes(q)) ||
      (product.description && product.description.toLowerCase().includes(q))
    );
  });

  return (
    <div className="container">
      <section className="hero">
        <h1>Bienvenido a nuestra tienda</h1>
        <p>Productos de calidad para tu día a día.</p>
      </section>
        <div className="search-wrapper">
          <input
            type="search"
            className="search-input"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            aria-label="Buscar productos"
          />
        </div>

        {(!searchTerm || searchTerm.trim() === '') && (
          <Carrusel products={allProducts} />
        )}
      <section className="product-grid">
        <h2>Nuestros Productos</h2>
        <div className="products-container">
          {filtered.length > 0 ? (
            filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No se encontraron productos para "{searchTerm}"</p>
          )}
        </div>
      </section>

      <CustomerReviews />      
     
    </div>
  );
}

export default Inicio;
export { PRODUCTS };