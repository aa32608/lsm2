// Dynamic sitemap for SEO - Next.js automatically serves this at /sitemap.xml
// Fetches listings on-demand to avoid build-time issues with large datasets
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Regenerate every hour

export default async function sitemap() {
  const baseUrl = 'https://bizcall.mk';
  
  // Base routes - always included
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/listings`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
  ];

  // Try to fetch listings for sitemap
  // If this fails during build, we still return base routes
  try {
    const response = await fetch(
      'https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app/listings.json?orderBy="$key"&limitToLast=10000',
      {
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
        },
        // Timeout after 10 seconds to avoid build hangs
        signal: AbortSignal.timeout(10000),
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data) {
        // Filter only verified, non-expired listings
        const now = Date.now();
        const listingIds = Object.entries(data)
          .filter(([_, listing]) => {
            if (!listing) return false;
            const isVerified = listing.verified === true;
            const isNotExpired = !listing.expiresAt || listing.expiresAt > now;
            return isVerified && isNotExpired;
          })
          .map(([id]) => id);

        // Add individual listing pages to sitemap
        const listingRoutes = listingIds.map((id) => ({
          url: `${baseUrl}/listings/${encodeURIComponent(id)}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        }));

        return [...routes, ...listingRoutes];
      }
    }
  } catch (error) {
    // If fetching fails (e.g., during build, network issues), 
    // return base routes only - this prevents build failures
    console.warn('Sitemap: Could not fetch listings, returning base routes only:', error.message);
  }

  // Return base routes if listing fetch fails
  return routes;
}
