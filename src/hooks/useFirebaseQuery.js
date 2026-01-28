// Hybrid React Query + Firebase real-time listener hook
// Combines React Query caching with Firebase real-time updates
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ref as dbRef, get, onValue, query, orderByChild, equalTo, limitToLast } from 'firebase/database';
import { useEffect, useRef } from 'react';
import { db } from '../firebase';

/**
 * Hook that combines React Query caching with Firebase real-time listeners
 * - Uses React Query for smart caching and background refetching
 * - Uses Firebase onValue for real-time updates
 * - Shows cached data instantly while updating in background
 */
export function useFirebaseQuery(queryKey, firebaseQuery, options = {}) {
  const queryClient = useQueryClient();
  const unsubscribeRef = useRef(null);
  const isSubscribedRef = useRef(false);

  // React Query for initial fetch and caching
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const snapshot = await get(firebaseQuery);
      const val = snapshot.val() || {};
      
      if (Array.isArray(val)) {
        return val;
      }
      
      // Convert object to array
      return Object.entries(val).map(([id, data]) => ({ id, ...data }));
    },
    staleTime: options.staleTime || 2 * 60 * 1000, // 2 minutes default
    gcTime: options.gcTime || 10 * 60 * 1000, // 10 minutes default
    refetchOnWindowFocus: options.refetchOnWindowFocus !== false,
    refetchOnReconnect: options.refetchOnReconnect !== false,
    ...options,
  });

  // Firebase real-time listener for live updates
  useEffect(() => {
    if (isSubscribedRef.current) return; // Prevent duplicate subscriptions
    
    isSubscribedRef.current = true;
    
    // Set up real-time listener
    unsubscribeRef.current = onValue(
      firebaseQuery,
      (snapshot) => {
        const val = snapshot.val() || {};
        let data;
        
        if (Array.isArray(val)) {
          data = val;
        } else {
          data = Object.entries(val).map(([id, item]) => ({ id, ...item }));
        }
        
        // Update React Query cache silently (no refetch trigger)
        queryClient.setQueryData(queryKey, data);
      },
      (error) => {
        console.error(`[Firebase Query] Error for ${queryKey}:`, error);
      }
    );

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
        isSubscribedRef.current = false;
      }
    };
  }, [queryKey, queryClient]);

  return queryResult;
}
