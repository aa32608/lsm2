import React from 'react';
import { notFound } from 'next/navigation';
import ListingDetailClient from '../../../components/ListingDetailClient';

// Helper to fetch listing data for metadata
async function getListing(id) {
  try {
    const res = await fetch(`https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app/listings/${id}.json`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching listing metadata:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const listing = await getListing(params.id);

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
  // Decode the ID from URL params
  const listingId = decodeURIComponent(params.id);
  const listing = await getListing(listingId);

  // If server fetch fails, we pass null to client component
  // to attempt client-side fetch or handle the error gracefully
  // instead of showing a hard 404 page immediately.
  return <ListingDetailClient id={listingId} initialListing={listing} />;
}
