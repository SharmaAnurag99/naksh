# Step 16: .dockerignore and Project README

**Goal:** Finalise .dockerignore files (if not done in 13 and 14) and write the project README with setup and Docker instructions.

---

## 16.1 .dockerignore (recap)

- **backend/.dockerignore**: `node_modules`, `.env`, `.git`, `*.md`
- **frontend/.dockerignore**: `node_modules`, `dist`, `.env`, `.env.local`, `.git`, `*.md`

This keeps images smaller and avoids copying secrets.

---

## 16.2 Project README.md at repo root

Create **README.md** in `Naksh-Jeweller/` with at least:

### Sections

1. **Project title**  
   e.g. “Naksh Jewels – Mini E-commerce Module”

2. **Description**  
   Short line: React frontend + Node/Express backend; product listing, cart, Docker.

3. **Tech stack**  
   - Frontend: React (Vite), Context API, React Router  
   - Backend: Node.js, Express  
   - Data: In-memory (optional: MongoDB)  
   - Docker: Dockerfile for frontend and backend, docker-compose

4. **Prerequisites**  
   - Node.js 18+  
   - Docker and Docker Compose (for Docker run)

5. **Local setup (without Docker)**  
   - Backend: `cd backend && npm install && npm run dev` (runs on http://localhost:3001)  
   - Frontend: `cd frontend && npm install && npm run dev` (runs on http://localhost:5173)  
   - Set `frontend/.env`: `VITE_API_URL=http://localhost:3001`

6. **Run with Docker (mandatory for assignment)**  
   ```bash
   docker-compose up --build
   ```  
   - Frontend: http://localhost:3000  
   - Backend API: http://localhost:3001  
   - First time or after code changes use `--build`.

7. **API endpoints**  
   - `GET /api/products` – list products  
   - `POST /api/cart` – add to cart (body: `{ "productId": "1", "quantity": 2 }`)  
   - `GET /api/cart` – get cart (if implemented)

8. **Optional**  
   - Screenshots or link to a short demo video  
   - Note that no UI libraries are used (plain CSS)

---

## 16.3 Example README snippet

```markdown
# Naksh Jewels – Mini E-commerce Module

A small e-commerce demo: product listing and cart (React + Node.js).

## Tech stack

- **Frontend:** React (Vite), Context API, React Router, no UI library
- **Backend:** Node.js, Express, in-memory data
- **DevOps:** Docker, docker-compose

## Prerequisites

- Node.js 18+
- Docker & Docker Compose

## Local development

**Backend**
```bash
cd backend && npm install && npm run dev
```
Runs at http://localhost:3001

**Frontend**
```bash
cd frontend && npm install && npm run dev
```
Create `frontend/.env` with `VITE_API_URL=http://localhost:3001`  
Runs at http://localhost:5173

## Run with Docker

From project root:

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000  
- Backend: http://localhost:3001  

## API

- `GET /api/products` – list products  
- `POST /api/cart` – add to cart (`{ "productId": "1", "quantity": 1 }`)  
- `GET /api/cart` – get cart
```

---

## Checklist

- [ ] backend and frontend .dockerignore in place
- [ ] README.md at repo root with setup and Docker instructions
- [ ] API endpoints documented
