# Shotkut.com — Bug & SEO Report

## SEO Finding

**Issue:** Google's search snippet for "shotkut" shows an unrelated tagline
("Contemporary designs made with innovation") instead of the site's actual
meta description.

**Root cause:** shotkut.com is a client-side-rendered React app. Fetching
the raw HTML returns only a `noscript`-style fallback — the real
`<title>`/`<meta description>` tags are injected into `<head>` by JS after
mount (react-helmet or similar), never server-rendered. Google's crawler
likely indexed a stale or placeholder `<head>` from before hydration,
which is why the live SERP snippet doesn't match the current meta tags.

**Recommendation:** Move to SSR or add prerendering (Next.js migration,
or a prerender service like Prerender.io / react-snap) so the final
`<head>` is present on first response, not dependent on JS execution.

## Bugs Found

1. **No SSR/prerendering — JS-only content.** Confirmed by fetching the
   page directly: response body is just a noscript fallback line, no real
   content without JS execution. Affects both crawlers and any user on a
   slow connection or with JS disabled.

2. **OG/Twitter card image aspect ratio mismatch.** `twitter:card` is
   `summary_large_image`, which expects a ~1.91:1 image (e.g. 1200×630),
   but `og:image`/`twitter:image` is 512×512 (square). Links shared on
   Twitter, Slack, WhatsApp, etc. will render cropped or fall back to a
   small-card layout instead of the intended large preview.

3. **Needs live-browser verification.** Only static source was checkable
   with the tools available (no headless browser/JS execution). Worth
   manually testing on a phone: mobile responsiveness after full render,
   and clicking through all nav/footer links for 404s once the app
   bundle loads.

## Bonus / Security Note (unconfirmed — flag only)

Head tags being set via client-side JS rather than server-rendered is
also a place I'd point a pentest — worth checking whether any
user-controllable input ever flows into `document.title` or meta
injection (potential DOM-XSS vector). No direct evidence found; this is
a suggested area to check, not a confirmed bug.

## Note

The assignment brief lists the contact email as `support@shoutkut.com`
(extra "u") while the actual domain is `shotkut.com` — inconsistency in
company materials, not a site bug, but worth flagging.

## Screenshots

*(Attach screenshots of the SERP snippet and the raw-HTML fetch result
here before submitting.)*
