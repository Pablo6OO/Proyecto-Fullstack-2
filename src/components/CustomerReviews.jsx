import React, { useState, useEffect } from 'react';
import ReviewService from '../services/reviewService';

function CustomerReviews() {
  const [displayedReviews, setDisplayedReviews] = useState([]);

  useEffect(() => {
    // obtener reseñas desde backend
    ReviewService.getAll().then(allReviews => {
      if (!allReviews || allReviews.length === 0) {
        setDisplayedReviews([
        {
          authorName: 'María González',
          author: 'maria@gmail.com',
          rating: 5,
          comment: 'Excelente producto, muy buena calidad. Lo recomiendo 100%.',
          productId: 'default-1'
        },
        {
          authorName: 'Carlos López',
          author: 'carlos@gmail.com',
          rating: 4,
          comment: 'Muy buen producto. La entrega fue rápida y el empaque perfecto.',
          productId: 'default-2'
        },
        {
          authorName: 'Ana Martínez',
          author: 'ana@gmail.com',
          rating: 5,
          comment: 'Superó mis expectativas. Voy a comprar más productos de esta tienda.',
          productId: 'default-3'
        }
      ]);
      } else {
        const shuffled = [...allReviews].sort(() => Math.random() - 0.5);
        setDisplayedReviews(shuffled.slice(0, 3));
      }
    }).catch(err => {
      console.error('Error fetching reviews:', err);
    });
  }, []);

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className="star" style={{ color: i < rating ? '#ffd700' : '#ccc', fontSize: '1.2em' }}>
          &#9733;
        </span>
      );
    }
    return <div className="review-rating">{stars}</div>;
  };

  return (
    <section className="customer-reviews-section">
      <div className="container">
        <h2>Opiniones de Nuestros Clientes</h2>
        <div className="customer-reviews-grid">
          {displayedReviews.map((review, idx) => (
            <article key={idx} className="customer-review-card">
              <div className="review-header">
                <p className="review-author">
                  <strong>{review.authorName || review.author}</strong>
                </p>
                {renderStars(review.rating)}
              </div>
              <p className="review-comment">"{review.comment}"</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerReviews;
