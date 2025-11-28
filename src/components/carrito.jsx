import React from 'react';
import { useCart } from '../context/CartProvider'; 
import ProductoCarrito from './ProductoCarrito';  
import { Link } from 'react-router-dom';
import PurchaseService from '../services/purchaseService';

function Carrito() {
  const { cart, clearCart, totalPriceFormatted, totalItems } = useCart();
  
  const handleFinishPurchase = () => {
    // Enviar cada item como compra al backend
    Promise.all(cart.map(item => {
      const purchase = {
        date: new Date().toISOString(),
        product: item.name || item.title,
        price: Number(item.price),
        quantity: item.quantity || 1
      };
      return PurchaseService.create(purchase);
    })).then(() => {
      clearCart();
      alert('¡Compra realizada con éxito!');
    }).catch(err => {
      console.error('Error saving purchases:', err);
      alert('Ocurrió un error al guardar la compra. Intenta nuevamente.');
    });
  };

  
  if (totalItems === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '40px' }}>
        <h1>Tu Carrito está Vacío</h1>
        <p>No has agregado ningún producto todavía.</p>
        <Link to="/" className="btn">Volver a la tienda</Link>
      </div>
    );
  }

 
  return (
    <div className="container">
        <section className="cart-section">
            <h1>Tu Carrito de Compras</h1>
            <div className="cart-container">
                <div className="cart-items">
                    
                    {cart.map(item => (
                      <ProductoCarrito key={item.id} item={item} />
                    ))}
                </div>
                
                <div className="cart-summary">
                    
                    <h3>Resumen de Compra</h3>
                    <p>Total de Productos: {totalItems}</p>
                    <h4>Total a Pagar: <strong>{totalPriceFormatted}</strong></h4>
                    <button 
                      className="btn" 
                      style={{ width: '100%', marginBottom: '10px' }}
                      onClick={handleFinishPurchase}
                    >
                      Finalizar Compra
                    </button>
                    <button 
                      className="btn btn-outline" 
                      style={{ width: '100%' }}
                      onClick={clearCart}
                    >
                      Vaciar Carrito
                    </button>
                </div>
            </div>
        </section>
    </div>
  );
}

export default Carrito;