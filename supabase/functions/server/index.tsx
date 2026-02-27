import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import blogRoutes from "./blog.tsx";
import storageRoutes from "./storage.tsx";
import reviewRoutes from "./reviews.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Admin-Secret"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-ab2b18df/health", (c) => {
  return c.json({ status: "ok" });
});

// Mount blog routes
app.route("/make-server-ab2b18df/blog", blogRoutes);

// Mount storage routes
app.route("/make-server-ab2b18df/storage", storageRoutes);

// Mount review routes
app.route("/make-server-ab2b18df/reviews", reviewRoutes);

Deno.serve(app.fetch);
