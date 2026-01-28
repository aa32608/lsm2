// Server-side function to get listings from cache
// Cache is updated in real-time by background sync process
// This provides instant data to all clients without Firebase fetches per request

// Get listings from server cache (instant, no fetch)
// Cache is kept up-to-date by background sync process
export async function getServerListings() {
  // Only run on server - return empty if on client (for AdSense preview, etc.)
  if (typeof window !== 'undefined') {
    return { publicListings: [], allListings: [] };
  }

  try {
    // Dynamically import server-only code
    const { getCachedListings } = await import('./serverListingsCache');
    
    // Get from cache (instant, no Firebase fetch)
    const cached = getCachedListings();
    
    return {
      publicListings: cached.publicListings || [],
      allListings: cached.allListings || [],
    };
  } catch (error) {
    console.error('Error getting cached listings:', error);
    // Return empty arrays on error - client will fetch as fallback
    return { publicListings: [], allListings: [] };
  }
}
