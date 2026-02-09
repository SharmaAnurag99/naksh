# Step 2: Backend Data (In-Memory)

**Goal:** Add in-memory products list and cart store for the API.

---

## 2.1 Products data

Create **backend/src/data/products.js**:

```javascript
const products = [
  { id: '1', name: 'Gold Ring', price: 15000, image: '/placeholder-ring.jpg' },
  { id: '2', name: 'Silver Necklace', price: 8500, image: '/placeholder-necklace.jpg' },
  { id: '3', name: 'Diamond Earrings', price: 25000, image: '/placeholder-earrings.jpg' },
  { id: '4', name: 'Pearl Bracelet', price: 12000, image: '/placeholder-bracelet.jpg' },
  { id: '5', name: 'Emerald Pendant', price: 18000, image: '/placeholder-pendant.jpg' },
];

function getAllProducts() {
  return products;
}

function getProductById(id) {
  return products.find((p) => p.id === id);
}

module.exports = { getAllProducts, getProductById, products };
```

You can change names, prices, and image paths; keep `id`, `name`, `price`, `image` for the frontend.

---

## 2.2 Cart store (in-memory)

Create **backend/src/data/cartStore.js**:

```javascript
// In-memory cart: array of { productId, name, price, image, quantity }
let cart = [];

function getCart() {
  return cart;
}

function addItem(item) {
  const existing = cart.find((i) => i.productId === item.productId);
  if (existing) {
    existing.quantity += item.quantity || 1;
    return existing;
  }
  cart.push({
    productId: item.productId,
    name: item.name,
    price: item.price,
    image: item.image,
    quantity: item.quantity || 1,
  });
  return cart[cart.length - 1];
}

function updateItem(productId, quantity) {
  const item = cart.find((i) => i.productId === productId);
  if (!item) return null;
  if (quantity <= 0) {
    cart = cart.filter((i) => i.productId !== productId);
    return null;
  }
  item.quantity = quantity;
  return item;
}

function removeItem(productId) {
  const before = cart.length;
  cart = cart.filter((i) => i.productId !== productId);
  return before !== cart.length;
}

module.exports = { getCart, addItem, updateItem, removeItem };
```

---

## 2.3 Do not change index.js yet

Routes will use these in Step 3. No need to require them in `index.js` in this step.

---

## Checklist

- [ ] `backend/src/data/products.js` exports `getAllProducts`, `getProductById`
- [ ] `backend/src/data/cartStore.js` exports `getCart`, `addItem`, `updateItem`, `removeItem`
