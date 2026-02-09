# Step 5: Backend Error Handling & CORS

**Goal:** Add a central error handler, 404 handler, and CORS so the frontend can call the API.

---

## 5.1 Central error handler

Create **backend/src/middleware/errorHandler.js**:

```javascript
function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ success: false, message });
}

module.exports = errorHandler;
```

In routes, pass errors to Express with `next(err)` so this handler runs.

---

## 5.2 404 (route not found)

In **backend/src/index.js**, after all `app.use` for routes (e.g. after `app.use('/api/cart', cartRouter)`), add:

```javascript
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});
```

---

## 5.3 Register error handler last

After the 404 handler, add:

```javascript
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);
```

So the order is: `express.json()` → routes → 404 handler → error handler.

---

## 5.4 CORS

Install:

```bash
npm install cors
```

In **backend/src/index.js**, after `require('dotenv').config()` and creating the app, add:

```javascript
const cors = require('cors');
app.use(cors());
```

Place it before `app.use(express.json())` or right after it.

---

## 5.5 Full index.js order (reference)

1. `require('dotenv').config()`
2. `require` express, cors, routes, errorHandler
3. `const app = express()`
4. `app.use(cors())`
5. `app.use(express.json())`
6. `app.get('/health', ...)` (optional)
7. `app.use('/api/products', productsRouter)`
8. `app.use('/api/cart', cartRouter)`
9. `app.use(...)` 404 handler
10. `app.use(errorHandler)`
11. `app.listen(PORT, ...)`

---

## Checklist

- [ ] errorHandler middleware registered last
- [ ] 404 returns JSON `{ success: false, message: 'Route not found' }`
- [ ] CORS installed and `app.use(cors())` applied
- [ ] Any `next(err)` in routes results in JSON error response
