import React from 'react';
import { notFound } from 'next/navigation';
import ListingDetailClient from '../../../components/ListingDetailClient';

// Disable static generation for this route to prevent build issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Helper to fetch listing data for metadata
async function getListing(id) {
  try {
    // Ensure ID is properly formatted
    const cleanId = id ? String(id).trim() : null;
    if (!cleanId) {
      return null;
    }

    const res = await fetch(`https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app/listings/${cleanId}.json`, {
      // No caching - force fresh fetch to avoid stale data
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!res.ok) {
      // If 404 or other error, return null
      if (res.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    
    // Firebase returns null for non-existent paths
    if (data === null) {
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching listing metadata:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  // In Next.js 15+, params might be a Promise
  const resolvedParams = await params;
  const listingId = resolvedParams?.id;
  
  if (!listingId) {
    return {
      title: 'Listing Not Found | BizCall MK',
    };
  }

  const listing = await getListing(listingId);

  if (!listing) {
    return {
      title: 'Listing Not Found | BizCall MK',
    };
  }

  const description = listing.description 
    ? listing.description.substring(0, 160).replace(/\s+/g, ' ').trim()
    : `Check out ${listing.name} on BizCall MK.`;
  
  const location = listing.location 
    ? `${listing.location.city || ''}${listing.location.city && listing.location.extra ? ' - ' : ''}${listing.location.extra || ''}`.trim()
    : 'North Macedonia';

  return {
    title: `${listing.name} - ${listing.category} | BizCall MK`,
    description,
    keywords: `${listing.name}, ${listing.category}, ${location}, North Macedonia, services, listings`,
    openGraph: {
      title: listing.name,
      description,
      type: 'website',
      url: `https://bizcall.mk/listings/${encodeURIComponent(listingId)}`,
      siteName: 'BizCall MK',
      images: listing.images && listing.images.length > 0 
        ? listing.images.slice(0, 4).map(img => ({
            url: img,
            width: 1200,
            height: 630,
            alt: listing.name,
          }))
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: listing.name,
      description,
      images: listing.images && listing.images.length > 0 ? [listing.images[0]] : [],
    },
    alternates: {
      canonical: `https://bizcall.mk/listings/${encodeURIComponent(listingId)}`,
    },
  };
}

export default async function ListingPage({ params }) {
  // In Next.js 15+, params might be a Promise, so await it
  const resolvedParams = await params;
  
  // Ensure params and params.id exist
  if (!resolvedParams || !resolvedParams.id) {
    console.error('ListingPage: Missing params or params.id', resolvedParams);
    return <ListingDetailClient id={null} initialListing={null} />;
  }

  // Decode the ID from URL params
  const listingId = decodeURIComponent(String(resolvedParams.id));
  
  if (!listingId || listingId === 'undefined' || listingId === 'null') {
    console.error('ListingPage: Invalid listing ID', resolvedParams.id);
    return <ListingDetailClient id={null} initialListing={null} />;
  }

  console.log('ListingPage: Fetching listing with ID:', listingId);
  const listing = await getListing(listingId);

  // Generate structured data for SEO (JSON-LD)
  const structuredData = listing ? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: listing.name,
    description: listing.description || '',
    image: listing.images && listing.images.length > 0 ? listing.images : undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: listing.location?.city || '',
      addressRegion: 'North Macedonia',
      addressCountry: 'MK',
    },
    ...(listing.location?.city && {
      areaServed: {
        '@type': 'City',
        name: listing.location.city,
      },
    }),
    ...(listing.category && {
      category: listing.category,
    }),
    ...(listing.phone && {
      telephone: listing.phone,
    }),
    ...(listing.email && {
      email: listing.email,
    }),
    url: `https://bizcall.mk/listings/${encodeURIComponent(listingId)}`,
    ...(listing.feedback && listing.feedback.length > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: (
          listing.feedback.reduce((sum, f) => sum + (f.rating || 0), 0) / listing.feedback.length
        ).toFixed(1),
        reviewCount: listing.feedback.length,
      },
    }),
  } : null;

  // If server fetch fails, we pass null to client component
  // to attempt client-side fetch or handle the error gracefully
  // instead of showing a hard 404 page immediately.
  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
      <ListingDetailClient id={listingId} initialListing={listing} />
    </>
  );
}
