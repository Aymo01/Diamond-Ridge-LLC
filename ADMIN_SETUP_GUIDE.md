# Diamond Ridge LLC - Admin Access (Production)

The admin UI and routes are removed for deployment. Blog writes are protected at the API layer.

## How to Manage Blog Posts

Use the API write endpoint to manage posts:

### Option A: API Writes (Recommended)

Blog write endpoints require a shared secret header.

1. Set a secret in the Supabase functions environment:
   - `BLOG_ADMIN_SECRET`
2. Send `x-admin-secret` with POST, PUT, and DELETE requests.

Example (update as needed):

```bash
curl -X POST \
  https://<project>.supabase.co/functions/v1/make-server-ab2b18df/blog/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <public-anon-key>" \
  -H "x-admin-secret: <BLOG_ADMIN_SECRET>" \
  -d '{"title":"Example","slug":"example","published":true}'
```

## Notes

- There is no `/admin` route in production.
- Blog content is public only when `published = true`.
