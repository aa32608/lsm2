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
if (initialData.listings && initialData.listings.length > 0) {
  queryClient.setQueryData(['listings', 'public'], initialData.publicListings || []);
  queryClient.setQueryData(['listings', 'all'], initialData.listings || []);
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
