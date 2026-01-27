import React from 'react';
import LayoutWrapper from '../components/LayoutWrapper';
import '../App.css';
import './globals.css';

export const dynamic = 'force-dynamic';

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
    // Aggressive timeout for faster failure - 2 seconds max
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const res = await fetch('https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app/listings.json', { 
      next: { revalidate: 300 }, // Cache for 5 minutes
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
      // Use keepalive for faster connection reuse
      keepalive: true,
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    if (!data) return [];
    
    // Optimize data processing
    const listings = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        listings.push({ id: key, ...data[key] });
      }
    }
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
  const allListings = await getListings();
  
  const now = Date.now();
  const publicListings = allListings.filter(l => 
    l.status === "verified" && 
    (!l.expiresAt || l.expiresAt > now)
  );

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
