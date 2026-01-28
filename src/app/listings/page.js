'use client';

import React from 'react';
import ListingsTab from '../../components/ListingsTab';

// Client component to prevent SSR issues with large datasets
// Listings are fetched client-side with React Query for better performance
export default function ListingsPage() {
  return <ListingsTab />;
}
