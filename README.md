# Naksh Jewels – Mini E-commerce Module

Small e-commerce demo for the Naksh Jewels assessment: product listing and cart using React + Node.js, with Docker.

## Tech stack

- **Frontend:** React (Vite-style structure), Context API, React Router, plain CSS (no UI library)
- **Backend:** Node.js, Express, in-memory data
- **DevOps:** Docker, docker-compose

> Note: This repo includes source files; you should still run `npm install` / project scaffolding on your machine as described below.

## Prerequisites

- Node.js 18+
- npm
- Docker & Docker Compose

## Local development (without Docker)

### Backend

```bash
cd backend
npm install express dotenv cors nodemon
npm run dev
```

Backend runs at `http://localhost:3001`.

### Frontend

If you have not yet created the Vite project, you can either:

- Use the provided `frontend/` source as reference and wire it into your own Vite app, **or**
- Scaffold a fresh Vite app and copy the `src/` and config pieces:

```bash
cd ..
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install react-router-dom
```

Then ensure:

- `src/main.jsx`, `src/App.jsx`, `src/context/CartContext.jsx`, `src/components`, `src/pages`, `src/services`, `src/data` match this repo.
- Create `.env`:

```env
VITE_API_URL=http://localhost:3001
```

Run:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Run with Docker

From the project root:

```bash
docker-compose up --build
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

`docker-compose up --build` (first time or after changes), then `docker-compose up` for subsequent runs.

## API

- `GET /api/products` – list products
- `GET /api/cart` – get current cart
- `POST /api/cart` – add to cart
  - body: `{ "productId": "1", "quantity": 2 }`
- `PATCH /api/cart/:id` – update quantity
  - body: `{ "quantity": 3 }`
- `DELETE /api/cart/:id` – remove item from cart

## Assignment mapping

- **Product listing** – `frontend/src/pages/ProductListing.jsx` + `getProducts` in `src/services/api.js`
- **Product card** – `frontend/src/components/ProductCard.jsx`
- **Cart page** – `frontend/src/pages/Cart.jsx` + `CartContext`
- **State management** – `frontend/src/context/CartContext.jsx` (Context API)
- **Responsive design** – `frontend/src/index.css` (grid + media queries)
- **Backend APIs** – `backend/src/routes/products.js`, `backend/src/routes/cart.js`
- **Validation middleware** – `backend/src/middleware/validateCart.js`
- **Error handling** – `backend/src/middleware/errorHandler.js` + 404 in `backend/src/index.js`
- **Environment variables** – `backend/.env`, `backend/.env.example`, `frontend/.env`, `frontend/.env.example`
- **Docker** – `backend/Dockerfile`, `frontend/Dockerfile`, `docker-compose.yml`

