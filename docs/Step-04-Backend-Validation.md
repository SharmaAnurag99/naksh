# Step 4: Backend Validation Middleware

**Goal:** Validate POST /cart body (productId required, quantity required and ≥ 1) and return 400 with a clear message when invalid.

---

## 4.1 Validation middleware

Create **backend/src/middleware/validateCart.js**:

```javascript
function validateAddToCart(req, res, next) {
  const { productId, quantity } = req.body;
  const errors = [];

  if (productId === undefined || productId === null || productId === '') {
    errors.push('productId is required');
  }

  if (quantity === undefined || quantity === null) {
    errors.push('quantity is required');
  } else if (typeof quantity !== 'number' || quantity < 1) {
    errors.push('quantity must be a positive number');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors.join('; '),
    });
  }

  next();
}

module.exports = { validateAddToCart };
```

---

## 4.2 Use middleware on POST /cart

In **backend/src/routes/cart.js**:

- At the top, require the middleware:

```javascript
const { validateAddToCart } = require('../middleware/validateCart');
```

- Add the middleware to the POST route (before the handler):

```javascript
router.post('/', validateAddToCart, (req, res, next) => {
  // ... existing handler
});
```

---

## 4.3 Normalise quantity type

In the POST handler, keep using `Number(quantity)` so that string values from JSON (e.g. `"2"`) are converted to a number after validation. The middleware only checks type and range; the route can still coerce for robustness.

---

## 4.4 Test

- **POST** /api/cart with `{}` → 400, message about productId and quantity
- **POST** /api/cart with `{"productId":"1"}` → 400, message about quantity
- **POST** /api/cart with `{"productId":"1","quantity":0}` → 400, quantity must be positive
- **POST** /api/cart with `{"productId":"1","quantity":2}` → 201, item added

---

## Checklist

- [ ] validateAddToCart middleware exists and is used on POST /cart
- [ ] Invalid body returns 400 with a clear message
