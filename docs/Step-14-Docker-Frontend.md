# Step 14: Docker – Frontend Dockerfile

**Goal:** Add a Dockerfile that builds the React app and serves it (e.g. with `serve` so we don’t need nginx config).

---

## 14.1 Install serve (for production build)

In the frontend we need to serve the built static files. Option A: use `serve` inside the image.

Add to **frontend/package.json** (as dependency or devDependency, then we use it in Docker):

```bash
cd frontend && npm install serve
```

So the start command can be `npx serve -s dist -l 3000`.

---

## 14.2 Frontend Dockerfile (single-stage)

Create **frontend/Dockerfile**:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
```

- Build runs in the container and produces `dist/`.
- `serve -s dist` serves the SPA so client-side routes work.
- Frontend will call the API at a URL you set via `VITE_API_URL`; in docker-compose we’ll set this so the browser can reach the backend (e.g. `http://localhost:3001`).

---

## 14.3 Build-time env for Vite

Vite bakes `import.meta.env.VITE_*` at **build** time. So when we run `npm run build` inside Docker, we must pass the API URL. In the Dockerfile you can use a default:

```dockerfile
ENV VITE_API_URL=http://localhost:3001
RUN npm run build
```

Or leave it to docker-compose by using an `ARG`:

```dockerfile
ARG VITE_API_URL=http://localhost:3001
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build
```

Then in docker-compose you can pass `build.args`. For the assignment, `http://localhost:3001` is fine so the user’s browser calls the host’s backend when both run via `docker-compose up`.

---

## 14.4 Frontend .dockerignore

Create **frontend/.dockerignore**:

```
node_modules
dist
.env
.env.local
.git
*.md
```

---

## 14.5 Optional: multi-stage with nginx

If you prefer nginx instead of `serve`:

- Stage 1: `node:20-alpine` – copy source, `npm ci`, `npm run build`.
- Stage 2: `nginx:alpine` – copy `dist` from stage 1 to `/usr/share/nginx/html`, copy a small `nginx.conf` that serves the SPA (try_files for client-side routing). Expose 80.

For the assignment, `serve` is enough and simpler.

---

## Checklist

- [ ] frontend/Dockerfile builds and runs `serve -s dist -l 3000`
- [ ] frontend/.dockerignore excludes node_modules, dist, .env
- [ ] VITE_API_URL set at build so API base URL is correct (e.g. localhost:3001)
