import React from 'react';
import { useCart } from '../context/CartProvider';

// Este componente recibe el 'item' del carrito como prop
function ProductoCarrito({ item }) {
  const { removeItem } = useCart();

  // Calcula el subtotal para este item
  const subtotal = item.price * item.quantity;
  const subtotalFormatted = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(subtotal);

  return (
    <div className="cart-item"> {/* Asegúrate de tener estilos para .cart-item */}
      <img 
        src={`/src/images/${item.image}`} 
        alt={item.name} 
        style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
      />
      <div className="item-details">
        <h4>{item.name}</h4>
        <p>Cantidad: {item.quantity}</p>
        <p>Precio Unitario: {item.priceFormatted}</p> {/* Asumiendo que tiene priceFormatted */}
        <p>Subtotal: <strong>{subtotalFormatted}</strong></p>
      </div>
      <button onClick={() => removeItem(item.id)} className="btn">
        Eliminar
      </button>
    </div>
  );
}

export default ProductoCarrito;