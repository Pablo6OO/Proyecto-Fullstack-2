import React, { useEffect, useState } from 'react';
import { useParams, Link , useNavigate } from 'react-router-dom';
import { PRODUCTS } from './Inicio';
import ReviewForm from './ReviewForm';
import { useCart } from '../context/CartProvider';
import { useAuth } from './registerUser';
import ProductService from '../services/productService';
import ReviewService from '../services/reviewService';

function ProductDetail() {
  const { id } = useParams();
  const paramId = id;
  const [product, setProduct] = useState(null);
  const [productReviews, setProductReviews] = useState([]);

  const { addItem } = useCart()
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const numericId = parseInt(paramId, 10);

    const loadProduct = async () => {
      if (!isNaN(numericId)) {
        try {
          const p = await ProductService.getById(numericId);
          if (mounted) setProduct({
            id: p.id,
            name: p.name || p.title || 'Sin nombre',
            price: p.price || 0,
            priceFormatted: p.price ? `$${Number(p.price).toLocaleString('es-CL')}` : '$0',
            description: p.description || p.category || '',
            image: p.image || 'placeholder.jpg'
          });
        } catch (e) {
          // fallback to static
          const staticP = PRODUCTS.find(pp => pp.id === numericId) || null;
          if (mounted) setProduct(staticP);
        }
      } else {
        // non-numeric id: try static products
        const staticP = PRODUCTS.find(p => p.id === paramId || p.name === paramId) || null;
        if (mounted) setProduct(staticP);
      }

      // load reviews for this product
      try {
        const all = await ReviewService.getAll();
        const filtered = (all || []).filter(r => String(r.productId) === String(paramId) || String(r.productId) === String(numericId));
        if (mounted) setProductReviews(filtered);
      } catch (err) {
        console.error('Error fetching reviews for product:', err);
      }
    };

    loadProduct();
    return () => { mounted = false; };
  }, [paramId]);

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
    return productReviews || [];
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