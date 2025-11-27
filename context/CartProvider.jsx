import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';

// Hook personalizado para no tener que importar useContext y CartContext en cada archivo
export const useCart = () => {
  return useContext(CartContext);
};

// El componente Provider que manejará toda la lógica
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (productToAdd, quantity) => {
    // Verificamos si el producto ya está en el carrito
    const existingItemIndex = cart.findIndex(item => item.id === productToAdd.id);

    if (existingItemIndex !== -1) {
      // Si ya existe, actualizamos solo la cantidad
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // Si es nuevo, lo agregamos (asumiendo que productToAdd tiene id, name, price, image)
      // Nota: Tu 'product' tiene 'priceFormatted', pero necesitaremos el 'price' como número. 
      // Asegúrate de que tu objeto PRODUCT tenga el precio como número.
      setCart(prevCart => [...prevCart, { ...productToAdd, quantity }]);
    }
  };

  const removeItem = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculamos el total de items (para el ícono del carrito)
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculamos el precio total
  // (Asegúrate de que 'item.price' sea un NÚMERO)
  const totalPrice = cart.reduce((total, item) => {
    // Si tu precio está formateado (ej: "$1.234"), necesitas el número.
    // Asumiré que 'item.price' es el número.
    return total + (item.price * item.quantity);
  }, 0);

  // Formatear el precio total para mostrarlo
  const totalPriceFormatted = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(totalPrice);


  // Esto es lo que los componentes "hijos" podrán usar
  const value = {
    cart,
    addItem,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
    totalPriceFormatted
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};