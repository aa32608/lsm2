import React from 'react';
import LayoutWrapper from '../components/LayoutWrapper';
import '../App.css';
import './globals.css';

// Use ISR instead of force-dynamic for better performance
// Revalidate every 5 minutes, but allow caching
export const revalidate = 300; // 5 minutes

export const metadata = {
  title: 'BizCall MK',
  description: 'Listing Management System',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

async function getListings() {
  try {
    // OPTIMIZATION: Single fetch with aggressive timeout
    const now = Date.now();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);
    
    const res = await fetch('https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app/listings.json', { 
      next: { revalidate: 300 }, // Cache for 5 minutes
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
      keepalive: true,
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    if (!data) return [];
    
    // OPTIMIZATION: Filter verified and non-expired listings during processing
    const listings = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const listing = { id: key, ...data[key] };
        // Pre-filter: only include verified, non-expired listings
        if (listing.status === "verified" && (!listing.expiresAt || listing.expiresAt > now)) {
          listings.push(listing);
        }
      }
    }
    
    // Sort by date desc
    listings.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    
    return listings;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn("Listings fetch timeout, using empty array");
    } else {
      console.error("Error fetching listings:", error);
    }
    return [];
  }
}

export default async function RootLayout({ children }) {
  // Don't block page render - fetch listings in parallel or use streaming
  // For now, make it non-blocking by catching errors quickly
  let allListings = [];
  let publicListings = [];
  
  try {
    allListings = await getListings();
    const now = Date.now();
    publicListings = allListings.filter(l => 
      l.status === "verified" && 
      (!l.expiresAt || l.expiresAt > now)
    );
  } catch (error) {
    // If fetch fails, continue with empty arrays - client will fetch
    console.warn("Server-side listings fetch failed, using empty arrays:", error);
  }

  return (
    <html lang="sq">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app" />
        <link rel="preconnect" href="https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app" />
        <link rel="dns-prefetch" href="https://lsm-wozo.onrender.com" />
        <link rel="preconnect" href="https://lsm-wozo.onrender.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LayoutWrapper initialListings={allListings} initialPublicListings={publicListings}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
