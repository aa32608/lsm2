import React from 'react';
import LayoutWrapper from '../components/LayoutWrapper';
import './globals.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Tetovo LMS',
  description: 'Listing Management System',
};

async function getListings() {
  try {
    const res = await fetch('https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app/listings.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    if (!data) return [];
    
    return Object.keys(data).map(key => ({
      id: key,
      ...data[key]
    }));
  } catch (error) {
    console.error("Error fetching listings:", error);
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <LayoutWrapper initialListings={allListings} initialPublicListings={publicListings}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
