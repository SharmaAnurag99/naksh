# Step 10: Frontend Cart Page

**Goal:** Cart page with list of items, quantity update, remove option, and subtotal. Functional components only; no UI libraries.

---

## 10.1 Cart page component

Create **frontend/src/pages/Cart.jsx**:

- Use `useCart()` to get `cart`, `updateQuantity`, `removeItem`, `getCartTotal`.
- Wrap content in `<Layout>` so the header and cart link are visible.
- If `cart.length === 0`, show an empty state (e.g. “Your cart is empty” and a link to “/”).

---

## 10.2 Cart item row

For each item show:

- Image (item.image)
- Name (item.name)
- Price (item.price, e.g. ₹X)
- Quantity: controllable (input type number or +/- buttons). On change, call `updateQuantity(item.id, newQuantity)`. If quantity becomes &lt; 1, remove the item (you can do this inside updateQuantity in Context).
- “Remove” button: call `removeItem(item.id)`.

Use a simple list or table; on small screens you can make each item a card (responsive in Step 11).

---

## 10.3 Subtotal

At the bottom, show “Subtotal: ₹…” using `getCartTotal()`. Format with `toLocaleString()` if you like.

---

## 10.4 Example structure

```jsx
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQuantity, removeItem, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <Layout>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/">Continue shopping</Link>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Cart</h1>
      <div className="cart-list">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <span>{item.name}</span>
            <span>₹{item.price.toLocaleString()}</span>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Number(e.target.value) || 1)}
            />
            <button type="button" onClick={() => removeItem(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <p className="cart-total">Subtotal: ₹{getCartTotal().toLocaleString()}</p>
    </Layout>
  );
}
```

Add minimal CSS for `.cart-list`, `.cart-item`, `.cart-total` (e.g. spacing, alignment). Table or flex/grid is fine.

---

## 10.5 Wire route

In **src/App.jsx**:

```jsx
import Cart from './pages/Cart';

<Route path="/cart" element={<Cart />} />
```

---

## Checklist

- [ ] Cart page shows all items with image, name, price, quantity, Remove
- [ ] Quantity can be updated (and item removed if quantity &lt; 1)
- [ ] Subtotal displayed
- [ ] Empty cart state with link to home
- [ ] Route `/cart` renders Cart page
