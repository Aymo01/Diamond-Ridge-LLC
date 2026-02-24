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

// Helper function to make authenticated requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
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
 * @param title - The blog post title
 * @returns A URL-friendly slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Fetch all blog posts (published and drafts)
 * @returns Array of all blog posts ordered by created_at desc
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const result = await apiRequest('/posts');
    return result.data || [];
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

/**
 * Fetch all published blog posts, optionally filtered by category
 * @param category - Optional category to filter by
 * @returns Array of published blog posts ordered by created_at desc
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
 * @param slug - The blog post slug
 * @returns The blog post or null if not found
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
 * Create a new blog post
 * @param postData - The blog post data (without id, created_at, updated_at)
 * @returns The created blog post or null if creation failed
 */
export async function createPost(
  postData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>
): Promise<BlogPost | null> {
  try {
    const result = await apiRequest('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
    return result.data || null;
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
}

/**
 * Update an existing blog post
 * @param id - The blog post ID
 * @param updates - The fields to update
 * @returns The updated blog post or null if update failed
 */
export async function updatePost(
  id: string,
  updates: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>
): Promise<BlogPost | null> {
  try {
    const result = await apiRequest(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return result.data || null;
  } catch (error) {
    console.error('Error updating post:', error);
    return null;
  }
}

/**
 * Delete a blog post
 * @param id - The blog post ID
 * @returns true if deletion was successful, false otherwise
 */
export async function deletePost(id: string): Promise<boolean> {
  try {
    await apiRequest(`/posts/${id}`, {
      method: 'DELETE',
    });
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
}