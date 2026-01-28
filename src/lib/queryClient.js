// React Query configuration optimized for 20k+ listings
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes - balance between freshness and performance
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Keep unused data in cache for 15 minutes (optimized for memory)
      gcTime: 15 * 60 * 1000, // 15 minutes
      // Retry failed requests once
      retry: 1,
      // Don't refetch on window focus - use cached data immediately
      refetchOnWindowFocus: false,
      // Don't refetch on reconnect - use cached data
      refetchOnReconnect: false,
      // Don't refetch on mount if data exists - use cached data
      refetchOnMount: false,
      // Use cached data immediately while fetching in background
      placeholderData: (previousData) => previousData,
      // Network mode: prefer cached data, fetch in background
      networkMode: 'offlineFirst',
    },
    mutations: {
      // Retry mutations once
      retry: 1,
    },
  },
});
