import React from 'react';
import { notFound } from 'next/navigation';
import ListingDetailClient from '../../../components/ListingDetailClient';

// Helper to fetch listing data for metadata
async function getListing(id) {
  try {
    // Ensure ID is properly formatted
    const cleanId = id ? String(id).trim() : null;
    if (!cleanId) {
      return null;
    }

    const res = await fetch(`https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app/listings/${cleanId}.json`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
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

  return {
    title: `${listing.name} - ${listing.category} | BizCall MK`,
    description: listing.description ? listing.description.substring(0, 160) : `Check out ${listing.name} on BizCall MK.`,
    openGraph: {
      title: listing.name,
      description: listing.description ? listing.description.substring(0, 160) : `Check out ${listing.name} on BizCall MK.`,
      images: listing.images && listing.images.length > 0 ? [listing.images[0]] : [],
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

  // If server fetch fails, we pass null to client component
  // to attempt client-side fetch or handle the error gracefully
  // instead of showing a hard 404 page immediately.
  return <ListingDetailClient id={listingId} initialListing={listing} />;
}
