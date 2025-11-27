import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartProvider';
import { useAuth } from './registerUser';

function ProductCard({ product }) {
  const { addItem } = useCart();
  const { user } = useAuth();

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
  const formatCLP = (value) => {
    if (typeof value === 'number') {
      return `$${Number(value).toLocaleString('es-CL')}`;
    }
    return value || '';
  };

  const displayPrice = () => {
    if (product.priceFormatted) return product.priceFormatted;
    if (product.price) return formatCLP(product.price);
    return '';
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Debes registrarte primero para agregar productos al carrito');
      return;
    }
    addItem(product, 1);
    alert('¡Producto agregado al carrito!');
  };

  return (
    <article className="product-card">
      <Link to={`/producto/${product.id}`} className="product-link"> 
        <div className="product-image">
          {(() => {
            let src = '';
            if (product.image && typeof product.image === 'string') {
              if (product.image.startsWith('data:') || product.image.startsWith('http')) {
                src = product.image;
              } else {
                src = `src/images/${product.image}`;
              }
            } else {
              src = `src/images/${product.image || 'usb.avif'}`;
            }
            return <img src={src} alt={product.name} onError={(e) => { e.target.onerror = null; e.target.src = 'src/images/usb.avif'; }} />;
          })()}
        </div>
  </Link>

      <div className="product-info">
        <Link to={`/producto/${product.id}`} className="product-link"> 
            <h3>{product.name}</h3>
        </Link>
        
        <p className="product-description">{product.description}</p>
        <p className="product-price">{displayPrice()}</p>
      </div>

      <button 
        className="product-card-add-btn"
        onClick={handleAddToCart}
        title="Agregar al carrito"
      >
        +
      </button>
    </article>
  );
}



export default ProductCard;