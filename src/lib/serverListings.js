// Server-side function to get listings from cache
// Cache is updated in real-time by background sync process
// This provides instant data to all clients without Firebase fetches per request

import { getCachedListings } from './serverListingsCache';

// Get listings from server cache (instant, no fetch)
// Cache is kept up-to-date by background sync process
export async function getServerListings() {
  try {
    // Get from cache (instant, no Firebase fetch)
    const cached = getCachedListings();
    
    return {
      publicListings: cached.publicListings,
      allListings: cached.allListings,
    };
  } catch (error) {
    console.error('Error getting cached listings:', error);
    // Return empty arrays on error - client will fetch as fallback
    return { publicListings: [], allListings: [] };
  }
}
