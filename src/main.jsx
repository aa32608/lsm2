import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'   // ✅ import Tailwind

const container = document.getElementById('root');
const initialData = window.__INITIAL_DATA__ || {};

// Pre-populate React Query cache with initial data for instant rendering
// This ensures pages load instantly with cached data
if (initialData.publicListings && initialData.publicListings.length > 0) {
  queryClient.setQueryData(['listings', 'public'], initialData.publicListings);
}
if (initialData.listings && initialData.listings.length > 0) {
  // Store all listings for merged view
  queryClient.setQueryData(['listings', 'all'], initialData.listings);
}

// Wake up backend on website visit to preload Dodo Payments and other services
// This ensures backend is ready before first requests come in
const API_BASE = (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ? "http://localhost:5000"
  : "https://lsm-wozo.onrender.com");

// Make a lightweight health check request to wake up backend
// This preloads Dodo Payments connections and other backend services
if (typeof window !== "undefined") {
  fetch(`${API_BASE}/api/health`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    // Don't wait for response - fire and forget
  }).catch(() => {
    // Silently fail - this is just a wake-up call
  });
}

if (container.hasChildNodes() && Object.keys(initialData).length > 0) {
  // Hydrate if we have pre-rendered content and data
  ReactDOM.hydrateRoot(
    container,
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <App 
            initialListings={initialData.listings} 
            initialPublicListings={initialData.publicListings} 
          />
        </HelmetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
} else {
  // Fallback / Dev mode
  ReactDOM.createRoot(container).render(
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
