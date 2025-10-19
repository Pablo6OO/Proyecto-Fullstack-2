import React from 'react';
import ProductCard from './ProductCard';

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
  }
];
function Inicio() {
  return (
    <div className="container">
      <section className="hero">
        <h1>Bienvenido a nuestra tienda</h1>
        <p>Productos de calidad para tu día a día.</p>
      </section>

      <section className="product-grid">
        <h2>Nuestros Productos</h2>
        <div className="products-container">
          {PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="product-reviews">
        <h2>Opiniones de Nuestros Clientes</h2>
        <div className="reviews-list" id="reviews-list">
          <article className="review-item">
            <div className="review-header">
              <p className="review-author"><strong>Benjamin leroy</strong></p>
              <div className="review-rating">
                <span className="star">&#9733;</span><span className="star">&#9733;</span><span className="star">&#9733;</span><span className="star">&#9733;</span><span className="star">&#9733;</span>
              </div>
            </div>
            <p className="review-comment">Envian rapido los pedidos.</p>
          </article>
        </div>
      </section>

      <section className="About-us">
        <h2>Sobre Nosotros</h2>
        <p>En Tienda Pato Feliz, nos dedicamos a la venta de productos de calidad, para lograr una satisfaccion de nuestros clientes. Somos un proyecto academico de un estudiante de DuocUC</p>
      </section>

      <div className="review-form">
        <h3>Danos Tu Opinion</h3>
        <form id="new-review-form">
          <div className="form-group">
            <label htmlFor="reviewer-name">Tu nombre:</label>
            <input type="text" id="reviewer-name" name="reviewer-name" required />
          </div>
          <div className="form-group">
            <label>Tu calificación:</label>
            <div className="star-rating-input">
              <input type="radio" id="star5" name="rating" value="5" required /><label htmlFor="star5" title="5 estrellas">&#9733;</label>
              <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="star4" title="4 estrellas">&#9733;</label>
              <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="star3" title="3 estrellas">&#9733;</label>
              <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="star2" title="2 estrellas">&#9733;</label>
              <input type="radio" id="star1" name="rating" value="1" /><label htmlFor="star1" title="1 estrella">&#9733;</label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="review-text">Tu comentario:</label>
            <textarea id="review-text" name="review-text" rows="4" required></textarea>
          </div>
          <button type="submit" className="btn">Enviar Reseña</button>
        </form>
      </div>
      <section className="footer">
        <div className="container">
            <p>&copy; 2025 Tienda Pato Feliz. DuocUc.</p>
        </div>
    </section>
    </div>
  );
}

export default Inicio;
export { PRODUCTS };