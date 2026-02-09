# Step 3: Backend Routes

**Goal:** Add GET /products and POST /cart (and optional GET /cart) using the in-memory data.

---

## 3.1 Products route

Create **backend/src/routes/products.js**:

```javascript
const express = require('express');
const { getAllProducts } = require('../data/products');

const router = express.Router();

router.get('/', (req, res) => {
  const products = getAllProducts();
  res.json({ success: true, data: products });
});

module.exports = router;
```

---

## 3.2 Cart route

Create **backend/src/routes/cart.js**:

```javascript
const express = require('express');
const { getCart, addItem } = require('../data/cartStore');
const { getProductById } = require('../data/products');

const router = express.Router();

// GET /api/cart – return current cart
router.get('/', (req, res) => {
  const cart = getCart();
  res.json({ success: true, data: cart });
});

// POST /api/cart – add or update item (validation added in Step 4)
router.post('/', (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = getProductById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const item = addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: Number(quantity),
    });
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

---

## 3.3 Mount routes in app

Update **backend/src/index.js**:

- Add requires at the top (after existing requires):

```javascript
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
```

- After `app.use(express.json());` add:

```javascript
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
```

Keep your existing `/health` route if you want.

---

## 3.4 Test

With server running (`npm run dev`):

- **GET** http://localhost:3001/api/products → list of products
- **POST** http://localhost:3001/api/cart with body `{"productId":"1","quantity":2}` → item added
- **GET** http://localhost:3001/api/cart → current cart

---

## Checklist

- [ ] GET /api/products returns products
- [ ] POST /api/cart with productId and quantity adds to cart
- [ ] GET /api/cart returns cart array
