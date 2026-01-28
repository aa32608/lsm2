'use client';

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import LayoutWrapper from '../components/LayoutWrapper';

export default function ClientLayout({ children, initialListings = [], initialPublicListings = [] }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutWrapper initialListings={initialListings} initialPublicListings={initialPublicListings}>
        {children}
      </LayoutWrapper>
    </QueryClientProvider>
  );
}
