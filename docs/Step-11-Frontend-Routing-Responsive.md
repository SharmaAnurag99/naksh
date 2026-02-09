# Step 11: Frontend Routing & Responsive Design

**Goal:** Confirm all routes work and add basic responsive CSS so the app is usable on mobile and desktop.

---

## 11.1 Routes checklist

- **/** → ProductListing (product grid)
- **/cart** → Cart page

Both should be wrapped by Layout (inside each page component). No extra route config needed if you already have this from Steps 9 and 10.

---

## 11.2 Base layout (header) responsive

- Use flexbox for the header: title on the left, “Cart (count)” on the right.
- On small screens, keep the same or stack; ensure the link is tappable (min touch target).

Example in **index.css**:

```css
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}
header a {
  margin-left: 0.5rem;
}
```

---

## 11.3 Product grid responsive

You already have something like:

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
```

- On narrow viewports, fewer columns (e.g. 1–2); on wide, more. `minmax(200px, 1fr)` does that.
- Optionally add `padding` to the main content and `max-width` for very large screens:

```css
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
```

---

## 11.4 Cart list responsive

- Desktop: cart items in a table or row (image, name, price, quantity, remove).
- Mobile: stack each item vertically (card-like), so each row becomes a block. Use flexbox column or grid with one column.

Example:

```css
.cart-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.cart-item {
  display: grid;
  grid-template-columns: 60px 1fr auto auto auto;
  align-items: center;
  gap: 0.5rem;
}
.cart-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
}

@media (max-width: 600px) {
  .cart-item {
    grid-template-columns: 60px 1fr;
    gap: 0.25rem;
  }
  .cart-item input,
  .cart-item button {
    grid-column: 2;
  }
}
```

Adjust to match your Cart markup (e.g. if you use a table, use `display: block` and style tr/td for small screens).

---

## 11.5 Viewport meta

Ensure **index.html** has:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

Vite’s default index usually has this.

---

## Checklist

- [ ] / and /cart work and show correct content
- [ ] Header layout works on narrow and wide screens
- [ ] Product grid adapts (fewer columns on mobile)
- [ ] Cart list/cards readable and usable on mobile
- [ ] Viewport meta present
