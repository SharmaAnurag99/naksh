# Step 12: Frontend Polish

**Goal:** Improve error handling on the Product Listing page and make meaningful Git commits.

---

## 12.1 Product fetch error handling

On the Product Listing page:

- Already: show “Error: …” when `getProducts()` fails (from Step 9).
- Optional: add a “Retry” button that calls `getProducts()` again and clears the error on success.
- Optional: show a short message like “Unable to load products. Please check your connection.” instead of raw `err.message` for a better UX.

Example addition:

```jsx
const loadProducts = () => {
  setLoading(true);
  setError(null);
  getProducts()
    .then(setProducts)
    .catch((err) => setError(err.message || 'Unable to load products.'))
    .finally(() => setLoading(false));
};

useEffect(() => { loadProducts(); }, []);

// In JSX where you show error:
{error && (
  <div>
    <p>{error}</p>
    <button type="button" onClick={loadProducts}>Retry</button>
  </div>
)}
```

---

## 12.2 Edge cases (optional)

- Quantity input in Cart: clamp to at least 1 on blur or when submitting (Context already can remove item when quantity &lt; 1).
- Avoid double “Add to Cart” by disabling the button briefly or showing “Added” feedback.

---

## 12.3 Meaningful Git commits

Make small, clear commits as you build. Examples:

- `chore: backend setup with Express and dotenv`
- `feat(backend): in-memory products and cart store`
- `feat(backend): GET /products and POST /cart routes`
- `feat(backend): cart validation middleware`
- `feat(backend): error handler and CORS`
- `chore: frontend setup with Vite and React Router`
- `feat(frontend): API layer and getProducts`
- `feat(frontend): CartContext and CartProvider`
- `feat(frontend): ProductListing and ProductCard`
- `feat(frontend): Cart page with quantity and remove`
- `style: responsive layout and cart`
- `fix: product fetch error message and retry`

---

## Checklist

- [ ] Product listing shows a clear error and optional retry
- [ ] Git history has separate commits per logical change
