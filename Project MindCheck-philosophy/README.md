# MindCheck — Netlify Deployment 

## Why this version fixes "Server Offline"

Three bugs in the previous version caused the error:

1. **`node_bundler = "esbuild"`** — esbuild failed to bundle `mongoose` (which has native C++ bindings), producing a broken function that crashed on cold start.  
   **Fixed:** Using `"zisi"` (Netlify's default zip bundler — just zips `node_modules`, always works).

2. **`mongoose` only in root `package.json`** — Netlify Functions need their own `package.json` inside the functions folder so `npm install` runs there at build time.  
   **Fixed:** Added `netlify/functions/package.json` with `mongoose` as a dependency.

3. **`health.js` returned HTTP 500 on any DB error** — the frontend treated non-200 as "Server Offline" even when the function itself was reachable.  
   **Fixed:** `health.js` always returns HTTP 200; the frontend reads the `database` field (`"connected"` / `"disconnected"`) to set the status indicator.

---

## Deploy in 3 steps

### 1 — MongoDB Atlas setup
1. [cloud.mongodb.com](https://cloud.mongodb.com) → create a free M0 cluster
2. **Database Access** → add user with read/write access
3. **Network Access** → Add IP `0.0.0.0/0` (allow all — required for Netlify)
4. **Connect → Drivers** → copy your connection URI

### 2 — Push to GitHub & connect to Netlify
1. Push this folder to a new GitHub repo
2. [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**
3. Settings Netlify auto-detects from `netlify.toml`:
   - **Publish directory:** `public`
   - **Build command:** `cd netlify/functions && npm install`
   - **Functions directory:** `netlify/functions`

### 3 — Set environment variables
**Netlify Dashboard → Site → Environment Variables → Add variable:**

| Key | Value |
|-----|-------|
| `MONGO_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/mindcheck?retryWrites=true&w=majority` |
| `ADMIN_USER` | `admin` |
| `ADMIN_PASS` | your password |
| `SECRET` | any long random string |

→ **Trigger a redeploy** after adding variables.

---

## Local development

```bash
npm install
cd netlify/functions && npm install && cd ../..
cp .env.example .env      # fill in real values
npx netlify dev           # http://localhost:8888
```

---

## Project structure

```
mindcheck-netlify/
├── public/
│   └── index.html                    ← Full SPA frontend
├── netlify/
│   └── functions/
│       ├── package.json              ← mongoose installed here at build time
│       ├── lib/
│       │   ├── db.js                 ← Mongoose schema + cached connection
│       │   └── auth.js               ← Token auth + response helpers
│       ├── health.js                 ← GET  /.netlify/functions/health
│       ├── entries.js                ← POST /.netlify/functions/entries
│       ├── admin-login.js            ← POST /.netlify/functions/admin-login
│       ├── admin-stats.js            ← GET  /.netlify/functions/admin-stats
│       ├── admin-entries.js          ← GET/DELETE /.netlify/functions/admin-entries
│       ├── admin-entry.js            ← GET/DELETE /.netlify/functions/admin-entry?id=
│       ├── admin-category-analytics.js
│       ├── admin-export.js           ← GET  /.netlify/functions/admin-export
│       └── admin-change-password.js
├── netlify.toml                      ← Build config + CORS headers + SPA redirect
├── package.json
└── .env.example
```

## Admin dashboard
Open your Netlify URL → click **⚙ Admin** → login with `ADMIN_USER` / `ADMIN_PASS`.
