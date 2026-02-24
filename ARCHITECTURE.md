# Blog System Architecture (Production)

## System Flow

```
Public Pages
/handybook, /blog, /blog/:slug
          ↓
Supabase Edge Function
/make-server-ab2b18df/blog
          ↓
KV Store Table
kv_store_ab2b18df
```

## Data Storage

- Posts are stored as JSON in the KV table under keys like `blog_post:<slug>`.
- The Edge Function handles filtering and sorting.
- Writes are protected with `x-admin-secret`.

## Routes

```
/
/about
/services
/why-us
/handybook
/blog
/blog/:slug
/quote
/contact
/feedback
/privacy-policy
```

## Security

- Public read endpoints are open.
- Write endpoints require `BLOG_ADMIN_SECRET` via `x-admin-secret`.
- Supabase service role key is used only inside the function.
