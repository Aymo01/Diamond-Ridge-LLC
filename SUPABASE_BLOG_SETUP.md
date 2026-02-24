# Supabase Blog Setup (KV Store + Edge Functions)

The blog system stores posts in a Supabase KV table used by the Edge Function at:

`/functions/v1/make-server-ab2b18df/blog`

## 1) Verify KV Table

The KV table should exist as:

```sql
CREATE TABLE kv_store_ab2b18df (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
```

If the table is missing, create it in the Supabase SQL Editor.

## 2) Required Environment Variables (Functions)

Set these in your Supabase Functions environment:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `BLOG_ADMIN_SECRET` (required for write endpoints)

## 3) Public Read Endpoints

- `GET /posts` (admin use)
- `GET /posts/published` (public)
- `GET /posts/:slug` (public)

## 4) Write Endpoints (Protected)

Write endpoints require `x-admin-secret`:

- `POST /posts`
- `PUT /posts/:id`
- `DELETE /posts/:id`

Example:

```bash
curl -X POST \
  https://<project>.supabase.co/functions/v1/make-server-ab2b18df/blog/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <public-anon-key>" \
  -H "x-admin-secret: <BLOG_ADMIN_SECRET>" \
  -d '{"title":"Example","slug":"example","published":true}'
```

## 5) Content Publishing

Only posts with `published = true` appear on `/handybook` and `/blog`.
