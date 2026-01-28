// Server-side listings cache with real-time Firebase sync
// Fetches once, caches in memory, syncs updates immediately when Firebase changes

import { db as adminDb } from './firebaseAdmin';

const FIREBASE_DB_URL = 'https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app';

// Check if Firebase Admin SDK is properly initialized (not mock)
function isAdminSDKAvailable() {
  return adminDb && 
         adminDb.ref && 
         typeof adminDb.ref === 'function' &&
         adminDb.ref('test').orderByChild !== undefined; // Check if real SDK methods exist
}

// In-memory cache (shared across all server requests)
let listingsCache = {
  publicListings: [],
  allListings: [],
  lastFetch: 0,
  isInitialized: false,
  isSyncing: false,
  listener: null, // Firebase Admin listener
};

// Initialize cache and set up real-time sync
async function initializeCache() {
  if (listingsCache.isInitialized) {
    return; // Already initialized
  }

  listingsCache.isInitialized = true;
  
  // Initial fetch
  await fetchAndUpdateCache();
  
  // Set up real-time sync
  startRealtimeSync();
}

// Fetch listings from Firebase and update cache
async function fetchAndUpdateCache() {
  if (listingsCache.isSyncing) {
    return; // Already syncing, skip
  }

  try {
    listingsCache.isSyncing = true;

    // Try Firebase Admin SDK first (faster, real-time)
    if (isAdminSDKAvailable()) {
      try {
        const verifiedRef = adminDb.ref('listings')
          .orderByChild('status')
          .equalTo('verified')
          .limitToLast(1000);
        
        const snapshot = await verifiedRef.once('value');
        const verifiedData = snapshot.val() || {};
        
        // Convert to array and filter expired
        const now = Date.now();
        const publicListings = Object.entries(verifiedData)
          .map(([id, data]) => ({ id, ...data }))
          .filter(l => !l.expiresAt || l.expiresAt > now)
          .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

        listingsCache.publicListings = publicListings;
        listingsCache.lastFetch = Date.now();
        
        console.log(`[Server Cache] Updated ${publicListings.length} verified listings (Admin SDK)`);
        return;
      } catch (adminError) {
        console.warn('[Server Cache] Admin SDK failed, falling back to REST API:', adminError.message);
      }
    }

    // Fallback: Use REST API
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
    
    console.log(`[Server Cache] Updated ${publicListings.length} verified listings (REST API)`);
  } catch (error) {
    console.error('[Server Cache] Error fetching listings:', error);
    // Keep existing cache on error
  } finally {
    listingsCache.isSyncing = false;
  }
}

// Set up real-time Firebase listener for immediate updates
function startRealtimeSync() {
  // Try Firebase Admin SDK listener first (real-time, immediate updates)
  if (isAdminSDKAvailable()) {
    try {
      const verifiedRef = adminDb.ref('listings')
        .orderByChild('status')
        .equalTo('verified')
        .limitToLast(1000);
      
      // Real-time listener - updates cache immediately when Firebase changes
      listingsCache.listener = verifiedRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
          const verifiedData = snapshot.val() || {};
          
          // Convert to array and filter expired
          const now = Date.now();
          const publicListings = Object.entries(verifiedData)
            .map(([id, data]) => ({ id, ...data }))
            .filter(l => !l.expiresAt || l.expiresAt > now)
            .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

          // Update cache immediately
          listingsCache.publicListings = publicListings;
          listingsCache.lastFetch = Date.now();
          
          console.log(`[Server Cache] Real-time sync: Updated ${publicListings.length} listings`);
        }
      }, (error) => {
        console.error('[Server Cache] Real-time listener error:', error);
        // Fallback to polling if listener fails
        startPollingSync();
      });
      
      console.log('[Server Cache] Real-time Firebase listener started (immediate updates)');
      return;
    } catch (error) {
      console.warn('[Server Cache] Failed to start Admin SDK listener, using polling:', error.message);
    }
  }
  
  // Fallback: Use polling if Admin SDK not available
  startPollingSync();
}

// Fallback: Efficient polling sync (checks every 2 seconds for changes)
let syncInterval = null;
function startPollingSync() {
  if (syncInterval) return; // Already started

  syncInterval = setInterval(async () => {
    // Sync updates every 2 seconds - catches changes ASAP
    await fetchAndUpdateCache();
  }, 2000); // Check every 2 seconds

  console.log('[Server Cache] Polling sync started (2s interval - updates sync ASAP)');
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
