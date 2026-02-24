import { createContext, useContext, useState, ReactNode } from 'react';

interface Review {
  id: number;
  name: string;
  rating: number;
  message: string;
  date: string;
}

interface ReviewsContextType {
  reviews: Review[];
  addReview: (review: Review) => void;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  const addReview = (review: Review) => {
    setReviews([review, ...reviews]);
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
}