// React Query hooks for Firebase listings with smart caching
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ref as dbRef, get, query, orderByChild, equalTo, limitToLast } from 'firebase/database';
import { db } from '../firebase';

// Fetch verified listings with React Query caching
export function usePublicListings() {
  return useQuery({
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
      
      // Filter expired listings
      const now = Date.now();
      return arr.filter(l => !l.expiresAt || l.expiresAt > now);
    },
    staleTime: 2 * 60 * 1000, // 2 minutes - listings update frequently
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    refetchOnWindowFocus: true, // Refresh when user returns to tab
    refetchOnReconnect: true, // Refresh when connection restored
  });
}

// Fetch user's listings
export function useUserListings(userId) {
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
      return Object.entries(val).map(([id, data]) => ({ id, ...data }));
    },
    enabled: !!userId, // Only run if userId exists
    staleTime: 1 * 60 * 1000, // 1 minute - user listings change less frequently
    gcTime: 5 * 60 * 1000,
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
