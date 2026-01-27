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
    // Optimize fetch with timeout for faster failure handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const res = await fetch('https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app/listings.json', { 
      next: { revalidate: 60 },
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    if (!data) return [];
    
    return Object.keys(data).map(key => ({
      id: key,
      ...data[key]
    }));
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
