# Step 7: Frontend API Layer

**Goal:** Add a service that fetches products from the backend and (optional) a static JSON fallback when the API is unavailable.

---

## 7.1 API base URL

Vite uses env variables prefixed with `VITE_`. Create **frontend/.env**:

```
VITE_API_URL=http://localhost:3001
```

Create **frontend/.env.example**:

```
VITE_API_URL=http://localhost:3001
```

Use it in code as `import.meta.env.VITE_API_URL`.

---

## 7.2 Products API

Create **frontend/src/services/api.js**:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function getProducts() {
  const res = await fetch(`${API_URL}/api/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const json = await res.json();
  return json.data;
}
```

---

## 7.3 Optional: static JSON fallback

If the backend is not running, you can fall back to static data. Create **frontend/src/data/products.json**:

```json
[
  { "id": "1", "name": "Gold Ring", "price": 15000, "image": "/placeholder-ring.jpg" },
  { "id": "2", "name": "Silver Necklace", "price": 8500, "image": "/placeholder-necklace.jpg" },
  { "id": "3", "name": "Diamond Earrings", "price": 25000, "image": "/placeholder-earrings.jpg" },
  { "id": "4", "name": "Pearl Bracelet", "price": 12000, "image": "/placeholder-bracelet.jpg" },
  { "id": "5", "name": "Emerald Pendant", "price": 18000, "image": "/placeholder-pendant.jpg" }
]
```

Then in **api.js** you can do:

```javascript
import productsFallback from '../data/products.json';

export async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/api/products`);
    if (!res.ok) throw new Error('Failed to fetch');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Using fallback products', err);
    return productsFallback;
  }
}
```

Use either “API only” or “API + fallback”; assignment allows “static JSON or API”.

---

## 7.4 Cart API (for optional sync with backend)

If you want the frontend cart to sync with the backend later, you can add:

```javascript
export async function addToCartApi(item) {
  const res = await fetch(`${API_URL}/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: item.id, quantity: item.quantity || 1 }),
  });
  if (!res.ok) throw new Error('Failed to add to cart');
  return res.json();
}
```

For the assignment, cart can stay in Context only; this is optional.

---

## Checklist

- [ ] `VITE_API_URL` in .env and .env.example
- [ ] getProducts() in api.js calling GET /api/products
- [ ] Optional: static products.json and fallback in getProducts()
