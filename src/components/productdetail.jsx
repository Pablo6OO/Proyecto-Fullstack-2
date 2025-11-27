import React from 'react';
import { useParams, Link , useNavigate } from 'react-router-dom';
import { PRODUCTS } from './Inicio';
import carrito from './carrito';
import ReviewForm from './ReviewForm';
import { useCart } from '../context/CartProvider';
import { useAuth } from './registerUser';

function ProductDetail() {
  const { id } = useParams();
  const paramId = id;
  let product = null;

  if (typeof paramId === 'string' && paramId.startsWith('admin-')) {
    const parts = paramId.split('-');
    const idx = parseInt(parts[1], 10);
    if (!isNaN(idx)) {
      try {
        const stored = JSON.parse(localStorage.getItem('products')) || [];
        const p = stored[idx];
        if (p) {
          product = { ...p, id: paramId, priceFormatted: p.price ? `$${Number(p.price).toLocaleString('es-CL')}` : p.priceFormatted };
        }
      } catch (e) {
      }
    }
  }

  if (!product) {
    const numericId = parseInt(paramId, 10);
    if (!isNaN(numericId)) {
      product = PRODUCTS.find(p => p.id === numericId) || null;
    }
  }

  if (!product) {
    try {
      const stored = JSON.parse(localStorage.getItem('products')) || [];
      const adminProducts = stored.map((p, idx) => ({
        ...p,
        id: `admin-${idx}`,
        priceFormatted: p.price ? `$${Number(p.price).toLocaleString('es-CL')}` : p.priceFormatted
      }));
      product = adminProducts.find(p => p.id === paramId || String(p.id) === String(paramId) || p.name === paramId) || null;
    } catch (e) {
    }
  }
  const { addItem } = useCart()
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="container" style={{padding: '20px'}}>
        <h1>Producto no encontrado 😥</h1>
        <p>El producto con ID {paramId} no existe.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

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

  
  const getProductReviews = () => {
    try {
      const allReviews = JSON.parse(localStorage.getItem('reviews')) || [];
      return allReviews.filter(review => review.productId === paramId);
    } catch (e) {
      return [];
    }
  };

  const handleAddToCart = () => {
  
      addItem(product, 1);
    alert('¡Producto agregado al carrito!');
  };
  return (
    <div className="container">
      <div className="product-detail">
        <div className="product-image">
          {/* soportar imagen base64/URL o nombre de archivo en src/images */}
          {(() => {
            let src = '';
            if (product.image && typeof product.image === 'string') {
              if (product.image.startsWith('data:') || product.image.startsWith('http')) {
                src = product.image;
              } else {
                src = `/src/images/${product.image}`;
              }
            } else {
              
              src = `/src/images/${product.image || 'usb.avif'}`;
            }
            return <img src={src} alt={product.name} onError={(e) => { e.target.onerror = null; e.target.src = '/src/images/usb.avif'; }} />;
          })()}
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price"><strong>{product.priceFormatted}</strong></p>
          <p className="description">{product.description}</p>
          
          {user ? (
            <>
              <button 
                className="btn add-to-cart-btn" 
                onClick={handleAddToCart} 
              >Añadir al carrito
              </button>
            </>
          ) : (
            <>
              <h2>Debe registrarse primero para añadir a Carrito</h2>
            </>
          )}
        </div>
      </div>

      <section className="product-reviews">
        <h2>Valoraciones del Producto</h2>
        {(() => {
          const reviews = getProductReviews();
          const allReviews = [
            ...(product.reviewAuthor ? [{
              id: 'default-' + product.name,
              author: product.reviewAuthor,
              authorName: product.reviewAuthor,
              rating: product.reviewRating,
              comment: product.reviewComment,
              isDefault: true
            }] : []),
            ...reviews
          ];
          
          return allReviews.length > 0 ? (
            <div className="reviews-list">
              {allReviews.map((review, idx) => (
                <article key={idx} className="review-item">
                  <div className="review-header">
                    <p className="review-author">
                      <strong>{review.authorName || review.author}</strong>
                      {review.author && review.author.includes('@') && (
                        <span style={{ fontSize: '0.85em', color: '#666', marginLeft: '8px' }}>({review.author})</span>
                      )}
                    </p>
                    {renderStars(review.rating)}
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </article>
              ))}
            </div>
          ) : (
            <p>Aún no hay reseñas para este producto.</p>
          );
        })()}
      </section>

      <ReviewForm productId={paramId} />
    </div>
  );
}

export default ProductDetail;