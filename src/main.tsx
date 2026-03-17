import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/index.css';
import { getPublishedPosts } from './app/utils/supabaseBlog';

// Warm up Supabase Edge Function on app load to eliminate cold start delay
getPublishedPosts().catch(() => {
  // Silent fail — this is just a warm-up ping
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
