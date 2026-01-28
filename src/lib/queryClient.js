// React Query configuration for optimal caching and performance
import { QueryClient } from '@tanstack/react-query';

// Load cached data from localStorage for instant page loads
const loadCacheFromStorage = () => {
  if (typeof window === 'undefined') return {};
  
  try {
    const cached = localStorage.getItem('react-query-cache');
    if (cached) {
      const parsed = JSON.parse(cached);
      const now = Date.now();
      // Only use cache if it's less than 10 minutes old
      if (parsed.timestamp && (now - parsed.timestamp) < 10 * 60 * 1000) {
        return parsed.data || {};
      }
    }
  } catch (e) {
    console.warn('Failed to load cache from storage:', e);
  }
  return {};
};

// Save cache to localStorage
const saveCacheToStorage = (cache) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('react-query-cache', JSON.stringify({
      data: cache,
      timestamp: Date.now(),
    }));
  } catch (e) {
    console.warn('Failed to save cache to storage:', e);
  }
};

// Initialize with cached data
const initialCache = loadCacheFromStorage();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 10 minutes - listings don't change that often
      staleTime: 10 * 60 * 1000, // 10 minutes
      // Keep unused data in cache for 30 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      // Retry failed requests 1 time
      retry: 1,
      // Don't refetch on window focus - use cached data immediately
      refetchOnWindowFocus: false,
      // Don't refetch on reconnect - use cached data
      refetchOnReconnect: false,
      // Don't refetch on mount if data exists - use cached data
      refetchOnMount: false,
      // Use cached data immediately while fetching in background
      placeholderData: (previousData) => previousData,
    },
    mutations: {
      // Retry mutations once
      retry: 1,
    },
  },
});

// Restore cache from localStorage
if (Object.keys(initialCache).length > 0) {
  Object.entries(initialCache).forEach(([key, value]) => {
    try {
      const queryKey = JSON.parse(key);
      queryClient.setQueryData(queryKey, value);
    } catch (e) {
      // Ignore invalid cache entries
    }
  });
}

// Save cache to localStorage whenever it changes
if (typeof window !== 'undefined') {
  const unsubscribe = queryClient.getQueryCache().subscribe(() => {
    const cache = queryClient.getQueryCache().getAll();
    const cacheData = {};
    cache.forEach((query) => {
      if (query.state.data) {
        cacheData[JSON.stringify(query.queryKey)] = query.state.data;
      }
    });
    saveCacheToStorage(cacheData);
  });
  
  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    unsubscribe();
  });
}
