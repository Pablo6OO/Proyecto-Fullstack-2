import React from 'react';
import { useCart } from '../context/CartProvider'; // <-- 1. IMPORTA EL HOOK
import ProductoCarrito from './ProductoCarrito';   // <-- 2. IMPORTA EL COMPONENTE DE FILA
import { Link } from 'react-router-dom';

function Carrito() { // Nota: Cambié 'carrito' a 'Carrito' (Mayúscula inicial) por convención de React
  
  // 3. OBTIENE LOS DATOS DEL CONTEXTO
  const { cart, clearCart, totalPriceFormatted, totalItems } = useCart();

  // 4. MANEJA EL CASO DE CARRITO VACÍO
  if (totalItems === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '40px' }}>
        <h1>Tu Carrito está Vacío</h1>
        <p>No has agregado ningún producto todavía.</p>
        <Link to="/" className="btn">Volver a la tienda</Link>
      </div>
    );
  }

  // 5. RENDERIZA EL CARRITO LLENO
  return (
    <div className="container">
        <section className="cart-section">
            <h1>Tu Carrito de Compras</h1>
            <div className="cart-container">
                <div className="cart-items">
                    {/* 6. MAPEA LOS ITEMS DEL CARRITO Y RENDERIZA CADA UNO */}
                    {cart.map(item => (
                      <ProductoCarrito key={item.id} item={item} />
                    ))}
                </div>
                
                <div className="cart-summary">
                    {/* 7. MUESTRA EL RESUMEN */}
                    <h3>Resumen de Compra</h3>
                    <p>Total de Productos: {totalItems}</p>
                    <h4>Total a Pagar: <strong>{totalPriceFormatted}</strong></h4>
                    <button className="btn" style={{ width: '100%', marginBottom: '10px' }}>
                      Finalizar Compra
                    </button>
                    <button 
                      className="btn btn-outline" 
                      style={{ width: '100%' }}
                      onClick={clearCart} // <-- 8. CONECTA EL BOTÓN DE VACIAR
                    >
                      Vaciar Carrito
                    </button>
                </div>
            </div>
        </section>
    </div>
  );
}

export default Carrito; // <-- Asegúrate de exportar con Mayúscula