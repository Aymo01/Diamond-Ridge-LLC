# Testing Checklist (Production)

## Pre-Flight

- [ ] Supabase functions env vars set: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `BLOG_ADMIN_SECRET`
- [ ] Vite env vars set for EmailJS (see [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md))
- [ ] SPA rewrite rule configured on host (all routes -> `index.html`)

## Functional Tests

### Blog (Public)

- [ ] Visit `/handybook` and `/blog` with at least one published post
- [ ] Search and category filter work
- [ ] `/blog/:slug` loads a published post

### Blog (Write API)

- [ ] POST `/blog/posts` with `x-admin-secret` succeeds
- [ ] POST without `x-admin-secret` is rejected (401/503)

### Contact / Quote / Feedback

- [ ] Contact form sends EmailJS email
- [ ] Quote form sends EmailJS email
- [ ] Feedback form sends EmailJS email
- [ ] No console errors in production build

## Visual / Content

- [ ] Email links use `mailto:info@diamondridgellc.us`
- [ ] Phone links dial correctly on mobile
- [ ] 404 page renders for unknown routes
