import React from 'react';
import { useCart } from '../context/CartProvider';


function ProductoCarrito({ item }) {
  const { removeItem } = useCart();

  const subtotal = (item.price || 0) * item.quantity;
  const subtotalFormatted = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(subtotal);

  return (
    <div className="cart-item"> 
      {(() => {
        const src = item.image && typeof item.image === 'string' && (item.image.startsWith('data:') || item.image.startsWith('http'))
          ? item.image
          : `/src/images/${item.image}`;
        return (
          <img 
            src={src} 
            alt={item.name} 
            style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
            onError={(e) => { e.target.onerror = null; e.target.src = '/src/images/usb.avif'; }}
          />
        );
      })()}
      <div className="item-details">
        <h4>{item.name}</h4>
  <p>Cantidad: {item.quantity}</p>
  <p>Precio Unitario: {item.priceFormatted ?? (`$${Number(item.price).toLocaleString('es-CL')}`)}</p>
        <p>Subtotal: <strong>{subtotalFormatted}</strong></p>
      </div>
      <button onClick={() => removeItem(item.id)} className="btn">
        Eliminar
      </button>
    </div>
  );
}

export default ProductoCarrito;