// React Query hooks for Firebase listings - optimized for 20k+ listings
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ref as dbRef, get, query, orderByChild, equalTo, limitToLast } from 'firebase/database';
import { db } from '../firebase';

// Fetch verified listings with React Query caching
// Optimized for large datasets (20k+ listings)
export function usePublicListings(initialData = []) {
  return useQuery({
    queryKey: ['listings', 'public'],
    queryFn: async () => {
      const verifiedQuery = query(
        dbRef(db, 'listings'),
        orderByChild('status'),
        equalTo('verified'),
        limitToLast(1000) // Increased limit for 20k listings
      );
      
      const snapshot = await get(verifiedQuery);
      const val = snapshot.val() || {};
      const arr = Object.entries(val).map(([id, data]) => ({ id, ...data }));
      
      // Filter expired listings
      const now = Date.now();
      const filtered = arr.filter(l => !l.expiresAt || l.expiresAt > now);
      
      // Sort by creation date (newest first)
      filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      
      return filtered;
    },
    // Use initial data for instant loading (from SSR or previous cache)
    initialData: initialData.length > 0 ? initialData : undefined,
    // Use cached data immediately while fetching
    placeholderData: (previousData) => previousData || initialData,
    // Cache settings optimized for large datasets
    staleTime: 5 * 60 * 1000, // 5 minutes - listings don't change that often
    gcTime: 15 * 60 * 1000, // Keep in cache for 15 minutes
    // Don't refetch unnecessarily
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}

// Fetch user's listings
export function useUserListings(userId, initialData = []) {
  return useQuery({
    queryKey: ['listings', 'user', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const userQuery = query(
        dbRef(db, 'listings'),
        orderByChild('userId'),
        equalTo(userId)
      );
      
      const snapshot = await get(userQuery);
      const val = snapshot.val() || {};
      const arr = Object.entries(val).map(([id, data]) => ({ id, ...data }));
      
      // Sort by creation date (newest first)
      arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      
      return arr;
    },
    enabled: !!userId, // Only run if userId exists
    // Use initial data for instant loading
    initialData: initialData.length > 0 ? initialData : undefined,
    placeholderData: (previousData) => previousData || initialData,
    // Cache settings
    staleTime: 3 * 60 * 1000, // 3 minutes - user listings change less frequently
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}

// Prefetch listings for instant navigation
export function usePrefetchListings() {
  const queryClient = useQueryClient();
  
  return {
    prefetchPublicListings: () => {
      queryClient.prefetchQuery({
        queryKey: ['listings', 'public'],
        queryFn: async () => {
          const verifiedQuery = query(
            dbRef(db, 'listings'),
            orderByChild('status'),
            equalTo('verified'),
            limitToLast(500)
          );
          const snapshot = await get(verifiedQuery);
          const val = snapshot.val() || {};
          const arr = Object.entries(val).map(([id, data]) => ({ id, ...data }));
          const now = Date.now();
          return arr.filter(l => !l.expiresAt || l.expiresAt > now);
        },
      });
    },
  };
}
