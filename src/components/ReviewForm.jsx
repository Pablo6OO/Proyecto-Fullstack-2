import React, { useState } from 'react';
import { useAuth } from './registerUser';
import ReviewService from '../services/reviewService';

function ReviewForm({ productId }) {
  const [formData, setFormData] = useState({
    rating: '',
    comment: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Debes estar registrado para enviar una reseña');
      return;
    }

    if (!formData.rating || !formData.comment) {
      alert('Por favor completa todos los campos');
      return;
    }

    
    const newReview = {
      productId: String(productId),
      author: user.email,
      authorName: user.name || user.email.split('@')[0],
      rating: parseInt(formData.rating, 10),
      comment: formData.comment,
      date: new Date().toISOString()
    };

    ReviewService.create(newReview).then(() => {
      setSubmitted(true);
      setFormData({ rating: '', comment: '' });
      setTimeout(() => setSubmitted(false), 3000);
      // Recargar la página para simplificar la actualización de reseñas
      window.location.reload();
    }).catch(err => {
      console.error('Error saving review:', err);
      alert('Ocurrió un error al enviar la reseña. Intenta nuevamente.');
    });
  };

  if (!user) {
    return (
      <div className="review-form">
        <h3>Escribe tu propia reseña</h3>
        <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
          <strong>Debes estar registrado para dejar una reseña.</strong> 
          Por favor, <a href="/login" style={{ color: 'var(--accent-color)' }}>inicia sesión</a> o 
          <a href="/registro" style={{ color: 'var(--accent-color)' }}> regístrate</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="review-form">
      <h3>Escribe tu propia reseña</h3>
      {submitted && <p style={{ color: 'green', fontWeight: 'bold' }}>¡Reseña enviada exitosamente!</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label><strong>Tu correo:</strong> {user.email}</label>
        </div>
        
        <div className="form-group">
          <label>Tu calificación:</label>
          <div className="star-rating-input">
            <input 
              type="radio" 
              id="star5-p" 
              name="rating" 
              value="5" 
              checked={formData.rating === '5'}
              onChange={handleChange}
              required 
            /><label htmlFor="star5-p" title="5 estrellas">&#9733;</label>
            <input 
              type="radio" 
              id="star4-p" 
              name="rating" 
              value="4" 
              checked={formData.rating === '4'}
              onChange={handleChange}
            /><label htmlFor="star4-p" title="4 estrellas">&#9733;</label>
            <input 
              type="radio" 
              id="star3-p" 
              name="rating" 
              value="3" 
              checked={formData.rating === '3'}
              onChange={handleChange}
            /><label htmlFor="star3-p" title="3 estrellas">&#9733;</label>
            <input 
              type="radio" 
              id="star2-p" 
              name="rating" 
              value="2" 
              checked={formData.rating === '2'}
              onChange={handleChange}
            /><label htmlFor="star2-p" title="2 estrellas">&#9733;</label>
            <input 
              type="radio" 
              id="star1-p" 
              name="rating" 
              value="1" 
              checked={formData.rating === '1'}
              onChange={handleChange}
            /><label htmlFor="star1-p" title="1 estrella">&#9733;</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="review-text">Tu comentario:</label>
          <textarea 
            id="review-text" 
            name="comment" 
            rows="4" 
            value={formData.comment}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn">Enviar Reseña</button>
      </form>
    </div>
  );
}

export default ReviewForm;