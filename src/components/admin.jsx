function admin() {
  return (
    <section className="container">
      <div className="product-detail">
        <div className="product-image">
          <img src="src/images/taza1.jpg" alt="Taza1" />
        </div>
        <div className="product-info">
          <h1>Taza de gato negro</h1>
          <p className="price">$2.990</p>
          <p className="description">
          Taza de gato negro
          </p>
          <button className="btn add-to-cart-btn" data-product-id="1">Añadir al Carrito</button>
        </div>
      </div>
        <section class="product-reviews" />

      <h2>Valoraciones del Producto</h2>

      <div className="reviews-summary" id="reviews-summary">
        <div className="average-rating">
          <span className="rating-value">4.5</span>
          <span className="star">&#9733;</span>
          <span className="star">&#9733;</span>
          <span className="star">&#9733;</span>
          <span className="star">&#9733;</span>
          <span className="star star-half">&#9733;</span>
        </div>
        <span className="reviews-count">(Basado en 3 reseñas)</span>
      </div>

      <div className="reviews-list" id="reviews-list">
        <article className="review-item">
          <div className="review-header">
            <p className="review-author"><strong>Juan Rodríguez</strong></p>
            <div className="review-rating">
              <span className="star">&#9733;</span><span class="star">&#9733;</span><span class="star">&#9733;</span><span class="star">&#9733;</span><span class="star star-empty">&#9734;</span>
            </div>
          </div>
          <p className="review-comment">Buena taza, aunque un poco más pequeña de lo que esperaba. Cumple su función.</p>
        </article>
      </div>

      <div className="review-form">
        <h3>Escribe tu propia reseña</h3>
        <form id="new-review-form">
          <div className="form-group">
            <label for="reviewer-name">Tu nombre:</label>
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
            <label for="review-text">Tu comentario:</label>
            <textarea id="review-text" name="review-text" rows="4" required />
          </div>
          <button type="submit" className="btn">Enviar Reseña</button>
        </form>
      </div>
    </section>
  );
}

export default admin