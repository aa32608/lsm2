import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'   // ✅ import Tailwind

const container = document.getElementById('root');
const initialData = window.__INITIAL_DATA__ || {};

if (container.hasChildNodes() && Object.keys(initialData).length > 0) {
  // Hydrate if we have pre-rendered content and data
  ReactDOM.hydrateRoot(
    container,
    <ErrorBoundary>
      <HelmetProvider>
        <App 
          initialListings={initialData.listings} 
          initialPublicListings={initialData.publicListings} 
        />
      </HelmetProvider>
    </ErrorBoundary>
  );
} else {
  // Fallback / Dev mode
  ReactDOM.createRoot(container).render(
    <ErrorBoundary>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ErrorBoundary>
  );
}
