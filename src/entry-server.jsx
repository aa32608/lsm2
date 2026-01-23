import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'

export function render(url, context, initialData = {}) {
  const helmetContext = {}
  
  const html = ReactDOMServer.renderToString(
    <ErrorBoundary>
      <HelmetProvider context={helmetContext}>
        <App 
          initialListings={initialData.listings} 
          initialPublicListings={initialData.publicListings} 
        />
      </HelmetProvider>
    </ErrorBoundary>
  )

  const { helmet } = helmetContext
  return { html, helmet }
}
