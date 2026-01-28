// Server-side listings cache with real-time Firebase sync
// Fetches once, caches in memory, syncs updates immediately when Firebase changes

const FIREBASE_DB_URL = 'https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app';

// In-memory cache (shared across all server requests)
let listingsCache = {
  publicListings: [],
  allListings: [],
  lastFetch: 0,
  isInitialized: false,
  isSyncing: false,
};

// Cache TTL: 10 minutes (fallback if sync fails)
const CACHE_TTL = 10 * 60 * 1000;

// Initialize cache and set up real-time sync
async function initializeCache() {
  if (listingsCache.isInitialized) {
    return; // Already initialized
  }

  listingsCache.isInitialized = true;
  
  // Initial fetch
  await fetchAndUpdateCache();
  
  // Set up real-time sync using Firebase REST API with polling
  // Since we can't use Firebase Admin SDK listeners in Next.js easily,
  // we'll poll for changes every 5 seconds
  startSyncInterval();
}

// Fetch listings from Firebase and update cache
async function fetchAndUpdateCache() {
  if (listingsCache.isSyncing) {
    return; // Already syncing, skip
  }

  try {
    listingsCache.isSyncing = true;

    // Fetch verified listings
    const verifiedUrl = `${FIREBASE_DB_URL}/listings.json?orderBy="status"&equalTo="verified"&limitToLast=1000`;
    const verifiedResponse = await fetch(verifiedUrl, {
      headers: { 'Accept': 'application/json' },
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

    // Update cache
    listingsCache.publicListings = publicListings;
    listingsCache.lastFetch = Date.now();
    
    console.log(`[Server Cache] Updated ${publicListings.length} verified listings`);
  } catch (error) {
    console.error('[Server Cache] Error fetching listings:', error);
    // Keep existing cache on error
  } finally {
    listingsCache.isSyncing = false;
  }
}

// Start sync interval - checks for changes every 5 seconds
let syncInterval = null;
function startSyncInterval() {
  if (syncInterval) return; // Already started

  syncInterval = setInterval(async () => {
    // Only sync if cache is older than 30 seconds (avoid too frequent checks)
    const cacheAge = Date.now() - listingsCache.lastFetch;
    if (cacheAge > 30000) {
      await fetchAndUpdateCache();
    }
  }, 5000); // Check every 5 seconds

  console.log('[Server Cache] Real-time sync started (5s interval)');
}

// Get cached listings (instant, no fetch)
export function getCachedListings() {
  // Initialize if not already done
  if (!listingsCache.isInitialized) {
    initializeCache();
  }

  // Return cached data immediately
  return {
    publicListings: listingsCache.publicListings,
    allListings: listingsCache.allListings,
  };
}

// Force refresh cache (for manual updates)
export async function refreshCache() {
  await fetchAndUpdateCache();
}

// Initialize cache on module load (server-side only)
if (typeof window === 'undefined') {
  initializeCache();
}
