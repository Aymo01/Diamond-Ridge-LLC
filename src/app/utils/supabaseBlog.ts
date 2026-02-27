import { projectId, publicAnonKey } from '../../../utils/supabase/info';

// Export the BlogPost interface for use in components
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  cover_image: string | null;
  author: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// Base URL for blog API
const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ab2b18df/blog`;

// Storage API base
const STORAGE_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ab2b18df/storage`;

// Helper function to make authenticated requests
async function apiRequest(endpoint: string, options: RequestInit = {}, adminSecret?: string) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...(adminSecret ? { 'x-admin-secret': adminSecret } : {}),
      ...options.headers,
    },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  return response.json();
}

/**
 * Generate a URL-friendly slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Fetch all blog posts (admin - includes drafts)
 */
export async function getAllPosts(adminSecret: string): Promise<BlogPost[]> {
  try {
    const result = await apiRequest('/posts', {}, adminSecret);
    return result.data || [];
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

/**
 * Fetch all published blog posts, optionally filtered by category
 */
export async function getPublishedPosts(category?: string): Promise<BlogPost[]> {
  try {
    const queryParam = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    const result = await apiRequest(`/posts/published${queryParam}`);
    return result.data || [];
  } catch (error) {
    console.error('Error fetching published posts:', error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const result = await apiRequest(`/posts/${slug}`);
    return result.data || null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

/**
 * Create a new blog post (admin)
 */
export async function createPost(
  postData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>,
  adminSecret: string
): Promise<BlogPost | null> {
  try {
    const result = await apiRequest('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    }, adminSecret);
    return result.data || null;
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
}

/**
 * Update an existing blog post (admin)
 */
export async function updatePost(
  id: string,
  updates: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>,
  adminSecret: string
): Promise<BlogPost | null> {
  try {
    const result = await apiRequest(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }, adminSecret);
    return result.data || null;
  } catch (error) {
    console.error('Error updating post:', error);
    return null;
  }
}

/**
 * Delete a blog post (admin)
 */
export async function deletePost(id: string, adminSecret: string): Promise<boolean> {
  try {
    await apiRequest(`/posts/${id}`, {
      method: 'DELETE',
    }, adminSecret);
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
}

/**
 * Upload a cover image for a blog post
 */
export async function uploadBlogImage(file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${STORAGE_BASE}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(error.error || 'Upload failed');
    }
    const result = await response.json();
    return result.url || null;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}
