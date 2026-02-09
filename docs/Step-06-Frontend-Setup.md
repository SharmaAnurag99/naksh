# Step 6: Frontend Setup

**Goal:** Create the React app with Vite, add React Router, and clean boilerplate. No UI libraries.

---

## 6.1 Create project

From repo root (`Naksh-Jeweller/`):

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

---

## 6.2 Install React Router

```bash
npm install react-router-dom
```

---

## 6.3 Folder structure

Create these folders (you can add files in later steps):

- `frontend/src/components/`
- `frontend/src/context/`
- `frontend/src/pages/`
- `frontend/src/services/`
- `frontend/src/data/` (optional, for static JSON fallback)

---

## 6.4 Clean default content

- In **src/App.jsx**: remove default Vite content; keep a simple placeholder like `<div>Naksh Jewels</div>` for now.
- In **src/App.css**: remove or simplify; we will use minimal global styles.
- Keep **src/index.css** for global/responsive base styles.
- Remove **src/assets/react.svg** usage if you don’t need it.

---

## 6.5 Basic App with Router (placeholder)

In **src/main.jsx**, wrap the app with `BrowserRouter`:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

In **src/App.jsx**:

```jsx
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home – Product listing coming in Step 9</div>} />
      <Route path="/cart" element={<div>Cart – coming in Step 10</div>} />
    </Routes>
  );
}

export default App;
```

---

## 6.6 Verify

```bash
npm run dev
```

Open http://localhost:5173. You should see the home text; visiting /cart should show the cart placeholder.

---

## Checklist

- [ ] React + Vite project in `frontend/`
- [ ] react-router-dom installed
- [ ] Folders: components, context, pages, services (and optionally data)
- [ ] Routes for `/` and `/cart` (placeholder content only)
