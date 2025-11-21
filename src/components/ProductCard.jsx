import React from 'react';
import { Link } from 'react-router-dom';
function ProductCard({ product }) {
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className="star" style={{ color: i < rating ? 'gold' : 'gray' }}>
          &#9733;
        </span>
      );
    }
    return <div className="review-rating">{stars}</div>;
  };
return (
    <article className="product-card">
      <Link to={`/producto/${product.id}`} className="product-link"> 
        <div className="product-image">
          <img src={`src/images/${product.image}`} alt={product.name} />
        </div>
  </Link>

      <div className="product-info">
        <Link to={`/producto/${product.id}`} className="product-link"> 
            <h3>{product.name}</h3>
        </Link>
        
        <p className="product-description">{product.description}</p>
        <p className="product-price">{product.priceFormatted ?? (product.price ? `$${(product.price/100).toFixed(2)}` : '')}</p>
      
      </div>
      <div>

      </div>
      
      
    </article>
  );
}



export default ProductCard;