# Architecture & Deployment Summary

## Architecture

React (Vite) frontend talks to an Express/MongoDB backend over a REST API
under `/api/auth/*`. Auth uses two tokens:

- **Access token** — JWT, 15 min expiry, held in memory on the client
  (never localStorage), sent as `Authorization: Bearer <token>`.
- **Refresh token** — opaque random string (not a JWT), stored server-side
  only as a SHA-256 hash, delivered to the browser as an HttpOnly, Secure,
  SameSite cookie scoped to `/api/auth`.

## Token Storage & Exchange

1. Login issues both tokens and starts a "family" (UUID) grouping every
   token descended from that login.
2. Each API call sends the access token; server verifies the JWT
   signature only — no DB hit.
3. On access-token expiry, an axios interceptor calls `/refresh-token`
   (cookie sent automatically by the browser) — server hashes the
   incoming token, looks it up, revokes it, and issues a new pair in the
   same family.
4. If a revoked (already-used) refresh token is ever presented again,
   that's a replay of a stolen token — the entire family is revoked,
   forcing full re-login.
5. Logout revokes the current refresh token server-side and clears the
   cookie.

## Deployment Choices

- **Frontend → Vercel** — zero-config static hosting for Vite builds,
  free tier, instant preview deploys per push.
- **Backend → Render** — free/low-cost Node web service tier, easy env
  var management, `render.yaml` in repo root for one-click config.
- **Database → MongoDB Atlas** — managed free-tier cluster, no
  self-hosted ops burden, works from any host via connection string.

This split (static frontend / API backend / managed DB) keeps each piece
independently deployable and matches how the assignment's stack was
scoped.
