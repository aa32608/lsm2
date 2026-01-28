// Server-side function to fetch listings from Firebase REST API
// Used in Next.js server components to provide initial data
// This reduces client-side Firebase downloads - only updates sync after initial fetch

const FIREBASE_DB_URL = 'https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app';

// Fetch verified listings from Firebase REST API (server-side)
// Uses Firebase REST API - no SDK needed, works in server components
export async function getServerListings() {
  try {
    // Fetch verified listings using Firebase REST API
    // Query: orderBy="status"&equalTo="verified"&limitToLast=1000
    const verifiedUrl = `${FIREBASE_DB_URL}/listings.json?orderBy="status"&equalTo="verified"&limitToLast=1000`;
    
    const verifiedResponse = await fetch(verifiedUrl, {
      next: { revalidate: 0 }, // Don't cache - fetch fresh on each request
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!verifiedResponse.ok) {
      throw new Error(`Firebase API error: ${verifiedResponse.status}`);
    }

    const verifiedData = await verifiedResponse.json() || {};
    
    // Convert to array and filter expired
    const now = Date.now();
    const publicListings = Object.entries(verifiedData)
      .map(([id, data]) => ({ id, ...data }))
      .filter(l => !l.expiresAt || l.expiresAt > now)
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    // For all listings, we can fetch a smaller subset or skip if not needed
    // Since we're using React Query, we can let client handle all listings merge
    // This reduces server load and avoids hitting size limits
    
    return {
      publicListings,
      allListings: [] // Let client fetch all listings if needed, or merge from publicListings
    };
  } catch (error) {
    console.error('Error fetching server listings:', error);
    // Return empty arrays on error - client will fetch as fallback
    return { publicListings: [], allListings: [] };
  }
}
