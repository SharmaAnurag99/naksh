# Step 15: Docker Compose

**Goal:** Add docker-compose.yml at the repo root so the app runs with `docker-compose up`.

---

## 15.1 docker-compose.yml at repo root

Create **docker-compose.yml** in `Naksh-Jeweller/` (same level as `frontend/` and `backend/`):

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - PORT=3001

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=http://localhost:3001
```

- **backend**: built from `./backend`, exposes 3001. PORT=3001 so the server listens on 3001 inside the container.
- **frontend**: built from `./frontend`, exposes 3000. Build uses `VITE_API_URL=http://localhost:3001` so the browser (user’s machine) calls the backend on the host’s 3001 port when both are run with `docker-compose up`.

---

## 15.2 Build-time env for frontend

Vite reads `VITE_*` at build time. So we need to pass `VITE_API_URL` as a build arg and use it in the Dockerfile. Update **frontend/Dockerfile** to accept an build arg:

```dockerfile
ARG VITE_API_URL=http://localhost:3001
ENV VITE_API_URL=$VITE_API_URL
# ... rest same, then:
RUN npm run build
```

Update **docker-compose.yml** so the frontend build gets the value:

```yaml
  frontend:
    build:
      context: ./frontend
      args:
        VITE_API_URL: http://localhost:3001
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

Then when someone runs `docker-compose up --build`, the frontend image is built with the correct API URL.

---

## 15.3 Run and verify

From repo root:

```bash
docker-compose up --build
```

- Open **http://localhost:3000** – frontend (product listing, cart).
- Open **http://localhost:3001/api/products** – backend API.
- Add to cart and open cart; count and list should work.

Stop with Ctrl+C. Use `docker-compose down` if you want to remove containers.

---

## 15.4 Assignment requirement

The assignment says: “Application must run using: docker-compose up”. So `docker-compose up --build` (first time or after code change) and then `docker-compose up` (later runs) must be enough to use the app.

---

## Checklist

- [ ] docker-compose.yml at repo root with backend and frontend services
- [ ] Backend port 3001, frontend port 3000
- [ ] frontend build receives VITE_API_URL for API base URL
- [ ] docker-compose up --build runs both; app works in browser
