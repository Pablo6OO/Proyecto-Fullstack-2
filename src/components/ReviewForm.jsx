import React from 'react';

function ReviewForm({ productId }) {
  return (
    <div className="review-form">
            <h3>Escribe tu propia reseña</h3>
        <form id="new-review-form">
            <div className="form-group">
                <label htmlFor="reviewer-name">Tu nombre:</label>
                <input type="text" id="reviewer-name" name="reviewer-name" required />
            </div>
            
            <div className="form-group">
                <label>Tu calificación:</label>
                <div className="star-rating-input">
                    <input type="radio" id="star5-p" name="rating" value="5" required /><label htmlFor="star5-p" title="5 estrellas">&#9733;</label>
                    <input type="radio" id="star4-p" name="rating" value="4" /><label htmlFor="star4-p" title="4 estrellas">&#9733;</label>
                    <input type="radio" id="star3-p" name="rating" value="3" /><label htmlFor="star3-p" title="3 estrellas">&#9733;</label>
                    <input type="radio" id="star2-p" name="rating" value="2" /><label htmlFor="star2-p" title="2 estrellas">&#9733;</label>
                    <input type="radio" id="star1-p" name="rating" value="1" /><label htmlFor="star1-p" title="1 estrella">&#9733;</label>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="review-text">Tu comentario:</label>
                <textarea id="review-text" name="review-text" rows="4" required></textarea>
            </div>

            <button type="submit" className="btn">Enviar Reseña</button>
        </form>
    </div>
  );
}

export default ReviewForm;