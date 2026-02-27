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

// Get all reviews (admin)
app.get("/reviews", async (c) => {
  try {
    const reviews = await kv.getByPrefix("review:");
    const sorted = reviews.sort((a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return c.json({ success: true, data: sorted });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get approved reviews (public)
app.get("/reviews/approved", async (c) => {
  try {
    const reviews = await kv.getByPrefix("review:");
    const approved = reviews
      .filter((r: any) => r.approved === true)
      .sort((a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    return c.json({ success: true, data: approved });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create a review (public submission)
app.post("/reviews", async (c) => {
  try {
    const body = await c.req.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newReview = {
      id,
      name: body.name,
      rating: body.rating,
      service: body.service || "General Service",
      comment: body.comment,
      date: new Date().toISOString(),
      approved: false,
    };
    await kv.set(`review:${id}`, newReview);
    return c.json({ success: true, data: newReview });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Approve a review (admin)
app.put("/reviews/:id/approve", async (c) => {
  try {
    const authError = requireAdmin(c);
    if (authError) return authError;
    const id = c.req.param("id");
    const review = await kv.get(`review:${id}`);
    if (!review) return c.json({ success: false, error: "Review not found" }, 404);
    const updated = { ...review, approved: true };
    await kv.set(`review:${id}`, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Decline a review (admin)
app.put("/reviews/:id/decline", async (c) => {
  try {
    const authError = requireAdmin(c);
    if (authError) return authError;
    const id = c.req.param("id");
    const review = await kv.get(`review:${id}`);
    if (!review) return c.json({ success: false, error: "Review not found" }, 404);
    const updated = { ...review, approved: false };
    await kv.set(`review:${id}`, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete a review (admin)
app.delete("/reviews/:id", async (c) => {
  try {
    const authError = requireAdmin(c);
    if (authError) return authError;
    const id = c.req.param("id");
    const review = await kv.get(`review:${id}`);
    if (!review) return c.json({ success: false, error: "Review not found" }, 404);
    await kv.del(`review:${id}`);
    return c.json({ success: true });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

export default app;
