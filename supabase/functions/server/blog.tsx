import { Hono } from "npm:hono";
import * as kv from "./kv_store.tsx";

const app = new Hono();
const adminSecret = Deno.env.get("BLOG_ADMIN_SECRET") ?? "";

const requireAdmin = (c: any) => {
  if (!adminSecret) {
    return c.json({ success: false, error: "Admin write access not configured" }, 503);
  }

  const header = c.req.header("x-admin-secret") ?? "";
  if (header !== adminSecret) {
    return c.json({ success: false, error: "Unauthorized" }, 401);
  }

  return null;
};

// Get all blog posts (for admin)
app.get("/posts", async (c) => {
  try {
    const posts = await kv.getByPrefix("blog_post:");
    
    // Sort by created_at descending
    const sortedPosts = posts.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    return c.json({ success: true, data: sortedPosts });
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get published posts (for public viewing)
app.get("/posts/published", async (c) => {
  try {
    const category = c.req.query("category");
    const posts = await kv.getByPrefix("blog_post:");
    
    // Filter for published posts
    let publishedPosts = posts.filter((post: any) => post.published);
    
    // Filter by category if specified
    if (category && category !== "All") {
      publishedPosts = publishedPosts.filter((post: any) => post.category === category);
    }
    
    // Sort by created_at descending
    publishedPosts.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    return c.json({ success: true, data: publishedPosts });
  } catch (error) {
    console.error("Error fetching published posts:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get a single post by slug
app.get("/posts/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    const post = await kv.get(`blog_post:${slug}`);
    
    if (!post) {
      return c.json({ success: false, error: "Post not found" }, 404);
    }
    
    return c.json({ success: true, data: post });
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create a new post
app.post("/posts", async (c) => {
  try {
    const authError = requireAdmin(c);
    if (authError) return authError;

    const postData = await c.req.json();
    
    const now = new Date().toISOString();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newPost = {
      id,
      ...postData,
      created_at: now,
      updated_at: now,
    };

    await kv.set(`blog_post:${postData.slug}`, newPost);
    return c.json({ success: true, data: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update an existing post
app.put("/posts/:id", async (c) => {
  try {
    const authError = requireAdmin(c);
    if (authError) return authError;

    const id = c.req.param("id");
    const updates = await c.req.json();
    
    // Find the post by ID
    const allPosts = await kv.getByPrefix("blog_post:");
    const existingPost = allPosts.find((post: any) => post.id === id);
    
    if (!existingPost) {
      return c.json({ success: false, error: "Post not found" }, 404);
    }

    // If slug is being updated, delete the old key
    if (updates.slug && updates.slug !== existingPost.slug) {
      await kv.del(`blog_post:${existingPost.slug}`);
    }

    const updatedPost = {
      ...existingPost,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const newSlug = updates.slug || existingPost.slug;
    await kv.set(`blog_post:${newSlug}`, updatedPost);
    
    return c.json({ success: true, data: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete a post
app.delete("/posts/:id", async (c) => {
  try {
    const authError = requireAdmin(c);
    if (authError) return authError;

    const id = c.req.param("id");
    
    // Find the post by ID to get its slug
    const allPosts = await kv.getByPrefix("blog_post:");
    const post = allPosts.find((p: any) => p.id === id);
    
    if (!post) {
      return c.json({ success: false, error: "Post not found" }, 404);
    }

    await kv.del(`blog_post:${post.slug}`);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

export default app;
