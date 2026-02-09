import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addItem(product, quantity = 1) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity } : i)),
    );
  }

  function removeItem(productId) {
    setCart((prev) => prev.filter((i) => i.id !== productId));
  }

  function getCartTotal() {
    return cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  function getCartCount() {
    return cart.reduce((sum, i) => sum + i.quantity, 0);
  }

  const value = {
    cart,
    addItem,
    updateQuantity,
    removeItem,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return ctx;
}

