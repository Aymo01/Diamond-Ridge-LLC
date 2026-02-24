# Quick Start - Supabase Blog (Production)

## Step 1: Create the Table

1. Open the Supabase dashboard.
2. Go to **SQL Editor**.
3. Run the SQL from [SUPABASE_BLOG_SETUP.md](SUPABASE_BLOG_SETUP.md).

## Step 2: Add Your First Post

Use the protected write API (recommended):

```bash
curl -X POST \
   https://<project>.supabase.co/functions/v1/make-server-ab2b18df/blog/posts \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer <public-anon-key>" \
   -H "x-admin-secret: <BLOG_ADMIN_SECRET>" \
   -d '{"title":"Example","slug":"example","category":"Maintenance Tips","content":"...","published":true,"author":"Diamond Ridge LLC"}'
```

## Step 3: Verify on the Site

- Visit `/handybook` or `/blog` to see published posts.
- Visit `/blog/<slug>` for the full post.

## Notes

- There is no `/admin` route in production.
- Blog write endpoints are protected by a shared secret. See [ADMIN_SETUP_GUIDE.md](ADMIN_SETUP_GUIDE.md) if you need API access.
