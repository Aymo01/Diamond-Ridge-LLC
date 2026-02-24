import { Hono } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js@2";

const storage = new Hono();

const BUCKET_NAME = "make-ab2b18df-blog-images";

// Initialize Supabase Storage bucket
async function ensureBucketExists() {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some((bucket) => bucket.name === BUCKET_NAME);

  if (!bucketExists) {
    await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    });
    console.log(`Created bucket: ${BUCKET_NAME}`);
  }
}

// Ensure bucket exists on startup
ensureBucketExists().catch(console.error);

// Upload image endpoint
storage.post("/upload", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const formData = await c.req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return c.json({ error: "No file provided" }, 400);
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return c.json({ error: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed." }, 400);
    }

    // Validate file size (5MB max)
    if (file.size > 5242880) {
      return c.json({ error: "File too large. Maximum size is 5MB." }, 400);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split(".").pop();
    const filename = `${timestamp}-${randomStr}.${extension}`;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return c.json({ error: `Upload failed: ${error.message}` }, 500);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filename);

    return c.json({
      success: true,
      url: urlData.publicUrl,
      filename: filename,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return c.json({ error: `Upload failed: ${error.message}` }, 500);
  }
});

// Delete image endpoint
storage.delete("/delete/:filename", async (c) => {
  try {
    const filename = c.req.param("filename");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filename]);

    if (error) {
      console.error("Delete error:", error);
      return c.json({ error: `Delete failed: ${error.message}` }, 500);
    }

    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting file:", error);
    return c.json({ error: `Delete failed: ${error.message}` }, 500);
  }
});

export default storage;
