// React Query hooks for Firebase listings - optimized for 20k+ listings
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ref as dbRef, get, query, orderByChild, equalTo, limitToLast } from 'firebase/database';
import { db } from '../firebase';
import { sortFeaturedFirst } from '../constants';

// Fetch verified listings with React Query caching
// Optimized for large datasets (20k+ listings)
// If initialData is provided (from server), uses it instantly - real-time listener syncs updates
export function usePublicListings(initialData = []) {
  return useQuery({
    queryKey: ['listings', 'public'],
    queryFn: async () => {
      // Fallback fetch if no initial data (shouldn't happen with server fetch)
      const verifiedQuery = query(
        dbRef(db, 'listings'),
        orderByChild('status'),
        equalTo('verified'),
        limitToLast(250)
      );
      
      const snapshot = await get(verifiedQuery);
      const val = snapshot.val() || {};
      const arr = Object.entries(val).map(([id, data]) => ({ id, ...data }));
      
      // Filter expired listings
      const now = Date.now();
      const filtered = arr.filter(l => !l.expiresAt || l.expiresAt > now);
      return sortFeaturedFirst(filtered);
    },
    // Use initial data for instant loading (from server fetch)
    // Only use initialData if it has items, otherwise let React Query fetch
    initialData: initialData.length > 0 ? initialData : undefined,
    // Use cached data immediately while fetching (fallback)
    placeholderData: (previousData) => previousData || (initialData.length > 0 ? initialData : undefined),
    // If no initial data, ensure React Query fetches
    enabled: true, // Always enabled - will use initialData if provided, otherwise fetch
    // Cache settings optimized for large datasets
    staleTime: 5 * 60 * 1000, // 5 minutes - listings don't change that often
    gcTime: 15 * 60 * 1000, // Keep in cache for 15 minutes
    // Don't refetch unnecessarily - server already provided data, real-time listener syncs updates
    // But if no initial data, we need to fetch on mount
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: initialData.length === 0, // Only refetch on mount if no initial data
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
            limitToLast(250)
          );
          const snapshot = await get(verifiedQuery);
          const val = snapshot.val() || {};
          const arr = Object.entries(val).map(([id, data]) => ({ id, ...data }));
          const now = Date.now();
          const filtered = arr.filter(l => !l.expiresAt || l.expiresAt > now);
          return sortFeaturedFirst(filtered);
        },
      });
    },
  };
}
