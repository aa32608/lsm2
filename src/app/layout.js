import React from 'react';
import ClientLayout from './ClientLayout';
import { getServerListings } from '../lib/serverListings';
import '../App.css';
import './globals.css';

// Force dynamic to prevent caching large datasets in Next.js
// We fetch on each request but don't cache in Next.js - React Query handles caching
export const dynamic = 'force-dynamic';
export const revalidate = 0; // No Next.js caching - React Query handles it

export const metadata = {
  title: 'BizCall MK',
  description: 'Listing Management System',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// Server-side fetch: Get listings on server, pass to client as initial data
// Benefits:
// - Reduces client-side Firebase downloads
// - Instant loading with React Query cache
// - Only updates sync after initial fetch
// - No Next.js cache (avoids 2MB limit)
export default async function RootLayout({ children }) {
  // Fetch listings on server - this happens on each request (not cached by Next.js)
  // React Query will cache it client-side for instant subsequent loads
  const { publicListings, allListings } = await getServerListings();

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
        <ClientLayout initialListings={allListings} initialPublicListings={publicListings}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
