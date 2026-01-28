import React from 'react';
import LayoutWrapper from '../components/LayoutWrapper';
import '../App.css';
import './globals.css';

// Force dynamic to prevent caching large datasets
// Client-side fetching is more efficient for 20k+ listings
export const dynamic = 'force-dynamic';
export const revalidate = 0; // No caching - client handles it

export const metadata = {
  title: 'BizCall MK',
  description: 'Listing Management System',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// Removed SSR listings fetch - data is too large (17MB) for Next.js cache
// Client-side fetching with React Query is faster and more efficient
// This prevents:
// - Next.js cache errors (2MB limit exceeded)
// - Build timeouts
// - SSR rendering errors
export default function RootLayout({ children }) {
  // Always use empty arrays - client will fetch with React Query
  // This ensures instant page loads and proper client-side caching
  const allListings = [];
  const publicListings = [];

  return (
    <html lang="sq">
      <head>
        <link rel="icon" href="/logo.png" />
        {/* DNS Prefetch and Preconnect for faster connections */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app" />
        <link rel="preconnect" href="https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app" />
        <link rel="dns-prefetch" href="https://lsm-wozo.onrender.com" />
        <link rel="preconnect" href="https://lsm-wozo.onrender.com" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {/* HTTP Caching Meta Tags */}
        <meta httpEquiv="Cache-Control" content="public, max-age=300" />
      </head>
      <body>
        <LayoutWrapper initialListings={allListings} initialPublicListings={publicListings}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
