# Step 9: Frontend Product Listing

**Goal:** Build Layout (header with cart link), ProductCard (image, name, price, Add to Cart), and Product Listing page using API or static JSON. No UI libraries.

---

## 9.1 Layout component

Create **frontend/src/components/Layout.jsx**:

- Simple header with a title (e.g. “Naksh Jewels”) and a link to `/cart` showing cart count (use `useCart().getCartCount()`).
- Render `children` below the header.
- Use semantic HTML and plain CSS (or a small layout class in index.css).

Example:

```jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Layout({ children }) {
  const { getCartCount } = useCart();
  return (
    <>
      <header>
        <Link to="/">Naksh Jewels</Link>
        <Link to="/cart">Cart ({getCartCount()})</Link>
      </header>
      <main>{children}</main>
    </>
  );
}
```

---

## 9.2 ProductCard component

Create **frontend/src/components/ProductCard.jsx**:

- Props: `product` (object with `id`, `name`, `price`, `image`).
- Render: image (use `product.image`; can use a placeholder if needed), name, price, “Add to Cart” button.
- On button click: call `addItem(product)` from `useCart()`.
- Functional component only; no UI library.

Example:

```jsx
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price?.toLocaleString?.() ?? product.price}</p>
      <button type="button" onClick={() => addItem(product)}>
        Add to Cart
      </button>
    </div>
  );
}
```

Style with CSS so the card looks clear (image size, spacing). Use a placeholder image path if your backend uses one (e.g. from public folder).

---

## 9.3 ProductListing page

Create **frontend/src/pages/ProductListing.jsx**:

- On mount, call `getProducts()` from your API service (Step 7).
- State: `products` (array), `loading` (boolean), `error` (string or null).
- While loading: show “Loading…”
- On error: show error message (we’ll improve in Step 12).
- On success: render a grid of `ProductCard` for each product.
- Use Layout: wrap content in `<Layout>` so header and cart link appear.

Example structure:

```jsx
import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <h1>Products</h1>
      {loading && <p>Loading…</p>}
      {error && <p>Error: {error}</p>}
      <div className="product-grid">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </Layout>
  );
}
```

---

## 9.4 Wire route

In **src/App.jsx**, replace the home route with:

```jsx
import ProductListing from './pages/ProductListing';

<Route path="/" element={<ProductListing />} />
```

---

## 9.5 Basic grid CSS

In **src/index.css** (or a dedicated CSS file) add something like:

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.product-card {
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
}
.product-card img {
  max-width: 100%;
  height: 150px;
  object-fit: cover;
}
```

Responsive refinements can go in Step 11.

---

## Checklist

- [ ] Layout with header, title, and “Cart (count)” link
- [ ] ProductCard with image, name, price, Add to Cart
- [ ] ProductListing fetches products and shows loading/error/grid
- [ ] Route `/` renders ProductListing inside Layout
