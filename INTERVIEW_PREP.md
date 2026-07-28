# Interview Prep — Auth Design Q&A

**Why access + refresh tokens instead of one long-lived token?**
Splits risk from convenience. Access token is short-lived (15m) so a leak
self-heals fast; refresh token is long-lived but never touches JS — it's
HttpOnly, so XSS can't steal it, and it's revocable server-side.

**Why HttpOnly cookies for the refresh token?**
HttpOnly means `document.cookie` can't read it — an XSS payload running in
the page has no way to exfiltrate it. It only leaves the browser as part
of an actual HTTP request to the auth endpoint.

**Why JWT for the access token?**
Stateless verification — no DB round-trip per request, just a signature
check. Acceptable tradeoff here because it's short-lived, so an
un-revokable window of 15 minutes is the worst case.

**Why bcrypt for passwords?**
Deliberately slow, salted, adaptive cost factor — resists brute-force and
rainbow-table attacks far better than fast hashes like SHA-256.

**How does refresh token rotation work?**
Every time a refresh token is used, it's revoked and a new one is issued
in the same "family." If a revoked token is ever presented again, that's
a stolen-token replay — the whole family gets revoked, killing every
session descended from that login.

**Why middleware for auth?**
Centralizes the "is this request authenticated" check in one place
instead of repeating verification logic in every controller — every
protected route just runs `requireAuth` first.

**How does the full authentication flow work end to end?**
Login issues both tokens → access token used per-request → on expiry,
the cookie-borne refresh token silently gets a new pair → user never
sees a forced logout unless the refresh token itself is invalid/expired/reused.

**How does logout invalidate the session?**
The server marks that refresh token's DB record as revoked and clears the
cookie. Even if someone had a copy of the old cookie, the hash lookup
finds it revoked and rejects it.
