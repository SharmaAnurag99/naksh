# Step 8: Frontend Cart Context

**Goal:** Implement cart state with Context API: add item, update quantity, remove item, cart total and count. Functional components only.

---

## 8.1 Create CartContext

Create **frontend/src/context/CartContext.jsx**:

- Use `createContext` and one `CartProvider` component that holds state.
- State: `cart` – array of `{ id, name, price, image, quantity }` (use `product.id` as `id` for simplicity).
- Provide: `cart`, `addItem`, `updateQuantity`, `removeItem`, `getCartTotal`, `getCartCount`.

**Example structure:**

```jsx
import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addItem(product, quantity = 1) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
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
      prev.map((i) => (i.id === productId ? { ...i, quantity } : i))
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
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
```

Ensure each cart item has `id` (from product), `name`, `price`, `image`, `quantity` so the Cart page can use them.

---

## 8.2 Wrap app with CartProvider

In **frontend/src/main.jsx**, wrap `<App />` with `CartProvider` (inside `BrowserRouter`):

```jsx
import { CartProvider } from './context/CartContext';

// ...
<BrowserRouter>
  <CartProvider>
    <App />
  </CartProvider>
</BrowserRouter>
```

---

## 8.3 Use in components

In any functional component:

```jsx
import { useCart } from '../context/CartContext';

function SomeComponent() {
  const { cart, addItem, getCartCount } = useCart();
  // ...
}
```

---

## Checklist

- [ ] CartContext with cart, addItem, updateQuantity, removeItem, getCartTotal, getCartCount
- [ ] CartProvider wraps App in main.jsx
- [ ] useCart() hook for consuming context
