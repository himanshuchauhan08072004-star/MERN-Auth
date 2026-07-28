# MERN Two-Token Authentication System

Production-style auth system: React/Vite/Tailwind frontend + Node/Express/MongoDB backend,
using short-lived access tokens and long-lived, rotating refresh tokens.

## Folder Structure

```
server/
  config/       # DB connection
  controllers/  # request handlers
  middleware/   # auth guard, error handler
  models/       # User, RefreshToken
  routes/       # /api/auth/*
  services/     # auth business logic
  utils/        # token generation/hashing, cookie options
  validators/   # zod schemas
  app.js
  server.js

client/
  src/
    components/ # Navbar, FormInput, Spinner, Avatar, StatCard, StatusBadge,
                 # SecurityPanel, RecentActivityTable, Skeleton, ErrorPage, ThemeToggle
    pages/      # Home, Login, Signup, Dashboard, Profile, Settings,
                 # 401/403/404/500
    context/    # AuthContext (session state), ThemeContext (dark/light)
    hooks/      # useElapsedTime, useTokenCountdown
    services/   # axios instance + api wrappers
    utils/      # jwt decode (display), device/browser detection, error parsing
    routes/     # ProtectedRoute
```

## UI/UX

- Dark/light theme toggle, persisted, no flash-of-wrong-theme on load
- Animated landing page (framer-motion) with real security-feature highlights
- Dashboard shows live session duration, JWT expiry countdown, real
  browser/OS detection, and a security-status panel reflecting what's
  actually implemented server-side
- Profile and Settings pages (appearance tab is fully functional; profile/
  password edits are UI-complete but not wired to backend persistence —
  clearly labeled as such rather than faking a save)
- Dedicated 401/403/404/500 pages, skeleton loaders for initial load

## Architecture

**Access token** — JWT, 15 min expiry, kept in memory on the client (never
localStorage), sent via `Authorization: Bearer`. Stateless — server verifies
signature, no DB lookup needed per request.

**Refresh token** — NOT a JWT. An opaque random string. The server stores
only its SHA-256 hash in MongoDB (`RefreshToken` collection), sent to the
browser as an HttpOnly, Secure, SameSite cookie scoped to `/api/auth`.

Why opaque instead of JWT for the refresh token: a JWT can't be revoked
before its expiry without a DB check anyway, so you get none of the
"stateless" benefit but still carry the XSS/leak risk of a token that
*looks* self-contained. An opaque token is honestly what it is: a lookup
key. It has no data to leak if intercepted outside the cookie.

## Token Flow

1. **Login** → server verifies credentials, creates a new refresh-token
   "family" (a UUID grouping every token descended from this login),
   issues access token (response body) + refresh token (HttpOnly cookie).
2. **Authenticated request** → client attaches access token; server
   verifies JWT signature/expiry only, no DB hit.
3. **Access token expires** → client gets `401 TOKEN_EXPIRED` → axios
   interceptor calls `/refresh-token` (cookie sent automatically) →
   server hashes the incoming token, looks it up, revokes it, issues a
   new access + refresh pair in the *same family* → original request retried.
4. **Reuse detection** → if a refresh token that's already been rotated
   (revoked) is presented again, that's a replay of a stolen token. The
   server revokes the *entire family*, forcing full re-login everywhere.
5. **Logout** → refresh token revoked server-side, cookie cleared.

## Security Measures

- bcrypt (cost 12) for password hashing
- Refresh tokens hashed at rest, rotated on every use, family-revoked on reuse
- HttpOnly + Secure + SameSite cookies, scoped path
- helmet, CORS with credentials, rate limiting on auth routes, mongo-sanitize
- zod validation on all inputs, no secrets shipped to frontend

## Environment Setup

Copy `.env.example` → `.env` in both `server/` and `client/`, fill in:
- `MONGO_URI` — MongoDB Atlas connection string
- `ACCESS_TOKEN_SECRET` / `REFRESH_TOKEN_SECRET` — long random strings, different from each other
- `CLIENT_URL` — deployed frontend origin (for CORS)
- `VITE_API_URL` (client) — deployed backend `/api` URL

## Deployment

- **Frontend → Vercel**: root `client/`, build `npm run build`, output `dist`
- **Backend → Render**: root `server/`, uses `render.yaml` in repo root
- **Database → MongoDB Atlas**: free-tier cluster, IP allowlist set to `0.0.0.0/0` for Render's dynamic IPs (or Atlas's Render-specific peering if configured)

Set `NODE_ENV=production` on Render so cookies use `Secure` + `SameSite=None`.

## API Endpoints

| Method | Route                  | Auth required | Description                      |
|--------|------------------------|---------------|-----------------------------------|
| POST   | `/api/auth/register`   | No            | Create account                   |
| POST   | `/api/auth/login`      | No            | Get access token + refresh cookie |
| POST   | `/api/auth/refresh-token` | Cookie     | Rotate tokens                    |
| POST   | `/api/auth/logout`     | Cookie        | Revoke refresh token              |
| GET    | `/api/auth/me`         | Bearer token  | Current user                      |
