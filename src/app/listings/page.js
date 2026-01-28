'use client';

import React, { Suspense } from 'react';
import ListingsTab from '../../components/ListingsTab';
import ErrorBoundary from '../../components/ErrorBoundary';

// Client component to prevent SSR issues with large datasets
// Listings are fetched client-side with React Query for better performance
export default function ListingsPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading listings...</div>}>
        <ListingsTab />
      </Suspense>
    </ErrorBoundary>
  );
}
