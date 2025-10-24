import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from './Inicio';
import carrito from './carrito';
import ReviewForm from './ReviewForm';
import { useCart } from '../context/CartProvider';

function ProductDetail() {
  const { id } = useParams();
  const productId = parseInt(id);
  const product = PRODUCTS.find(p => p.id === productId);
  const { addItem } = useCart()

  if (!product) {
    return (
      <div className="container" style={{padding: '20px'}}>
        <h1>Producto no encontrado 😥</h1>
        <p>El producto con ID {id} no existe.</p>
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
    const handleAddToCart = () => {
  
      addItem(product, 1);
    alert('¡Producto agregado al carrito!');
  };
  return (
    <div className="container">
      <div className="product-detail">
        <div className="product-image">
          <img src={`/src/images/${product.image}`} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price"><strong>{product.priceFormatted}</strong></p>
          <p className="description">{product.description}</p>
          
          <button 
            className="btn add-to-cart-btn" 
            onClick={handleAddToCart} 
          >Añadir al carrito
          </button>
        </div>
      </div>

      <section className="product-reviews">
        <h2>Valoraciones del Producto</h2>
        {product.reviewAuthor && (
          <div className="reviews-list" id="reviews-list">
            <article className="review-item">
              <div className="review-header">
                <p className="review-author"><strong>{product.reviewAuthor}</strong></p>
                {renderStars(product.reviewRating)}
              </div>
              <p className="review-comment">{product.reviewComment}</p>
            </article>
          </div>
        )}
        {!product.reviewAuthor && (
          <p>Aún no hay reseñas para este producto.</p>
        )}
      </section>

      <ReviewForm productId={productId} />
    </div>
  );
}

export default ProductDetail;