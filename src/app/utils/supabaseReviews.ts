import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export interface Review {
  id: string;
  name: string;
  rating: number;
  service: string;
  comment: string;
  date: string;
  approved: boolean;
}

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ab2b18df/reviews`;

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

/** Get all reviews (admin) */
export async function getAllReviews(adminSecret: string): Promise<Review[]> {
  try {
    const result = await apiRequest('/reviews', {
      headers: { 'x-admin-secret': adminSecret },
    });
    return result.data || [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

/** Get approved reviews (public) */
export async function getApprovedReviews(): Promise<Review[]> {
  try {
    const result = await apiRequest('/reviews/approved');
    return result.data || [];
  } catch (error) {
    console.error('Error fetching approved reviews:', error);
    return [];
  }
}

/** Submit a new review (public) */
export async function submitReview(
  data: Pick<Review, 'name' | 'rating' | 'service' | 'comment'>
): Promise<Review | null> {
  try {
    const result = await apiRequest('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return result.data || null;
  } catch (error) {
    console.error('Error submitting review:', error);
    return null;
  }
}

/** Approve a review (admin) */
export async function approveReview(id: string, adminSecret: string): Promise<boolean> {
  try {
    await apiRequest(`/reviews/${id}/approve`, {
      method: 'PUT',
      headers: { 'x-admin-secret': adminSecret },
    });
    return true;
  } catch (error) {
    console.error('Error approving review:', error);
    return false;
  }
}

/** Decline a review (admin) */
export async function declineReview(id: string, adminSecret: string): Promise<boolean> {
  try {
    await apiRequest(`/reviews/${id}/decline`, {
      method: 'PUT',
      headers: { 'x-admin-secret': adminSecret },
    });
    return true;
  } catch (error) {
    console.error('Error declining review:', error);
    return false;
  }
}

/** Delete a review (admin) */
export async function deleteReview(id: string, adminSecret: string): Promise<boolean> {
  try {
    await apiRequest(`/reviews/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-secret': adminSecret },
    });
    return true;
  } catch (error) {
    console.error('Error deleting review:', error);
    return false;
  }
}
