import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ReviewsProvider } from './context/ReviewsContext';

export default function App() {
  return (
    <ReviewsProvider>
      <RouterProvider router={router} />
    </ReviewsProvider>
  );
}