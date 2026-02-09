# Step 13: Docker – Backend Dockerfile

**Goal:** Add a Dockerfile for the backend so it can run in a container.

---

## 13.1 Backend Dockerfile

Create **backend/Dockerfile** (in the `backend/` folder):

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY src ./src

EXPOSE 3001

CMD ["node", "src/index.js"]
```

- `node:20-alpine` keeps the image small.
- `npm ci --omit=dev` installs only production dependencies (no nodemon).
- Server listens on `process.env.PORT`; default 3001. Expose 3001 so the host can map it.

---

## 13.2 Backend .dockerignore

Create **backend/.dockerignore** so `node_modules` and unnecessary files are not copied:

```
node_modules
.env
.git
*.md
```

Do not put `.env` in the image; pass env (e.g. PORT) via docker-compose or at runtime.

---

## 13.3 Build and run (optional test)

From repo root:

```bash
docker build -t naksh-backend ./backend
docker run -p 3001:3001 naksh-backend
```

Open http://localhost:3001/health (or /api/products). Stop with Ctrl+C.

---

## Checklist

- [ ] backend/Dockerfile exists and uses node:20-alpine
- [ ] backend/.dockerignore excludes node_modules, .env
- [ ] docker build and run starts the API successfully
