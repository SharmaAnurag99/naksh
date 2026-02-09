# Step 1: Backend Setup

**Goal:** Create the Node.js + Express backend project with environment variables.

---

## 1.1 Create project

From the repo root (`Naksh-Jeweller/`):

```bash
mkdir backend
cd backend
npm init -y
```

---

## 1.2 Install dependencies

```bash
npm install express dotenv
npm install -D nodemon
```

- `express` – web server
- `dotenv` – load `.env` into `process.env`
- `nodemon` – auto-restart on file change (dev only)

---

## 1.3 Folder and entry file

Create:

- `backend/src/index.js` – main app file

**backend/src/index.js:**

```javascript
require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true, message: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## 1.4 Environment variables

Create **backend/.env** (do not commit real secrets):

```
PORT=3001
```

Create **backend/.env.example** (commit this):

```
PORT=3001
```

---

## 1.5 NPM scripts

In **backend/package.json**, set:

```json
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}
```

---

## 1.6 Verify

From `backend/`:

```bash
npm run dev
```

Open http://localhost:3001/health – you should see `{"ok":true,"message":"Backend is running"}`.

---

## Checklist

- [ ] `backend/` exists with `package.json`, `src/index.js`
- [ ] `.env` and `.env.example` with `PORT=3001`
- [ ] `npm run dev` starts server; `/health` returns JSON
