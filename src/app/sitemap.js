export default async function sitemap() {
  // Base routes only - dynamic listings are too large for build-time fetching
  // Individual listing pages are still accessible via direct URLs
  // For better SEO, consider generating sitemap dynamically via API route
  const routes = [
    {
      url: 'https://bizcall.mk',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://bizcall.mk/listings',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
  ];

  // Removed listings fetch - dataset too large (17MB) causes build failures
  // Listings are discoverable via the /listings page and search functionality
  // For full sitemap with all listings, consider:
  // 1. API route that generates sitemap on-demand
  // 2. Static generation with pagination
  // 3. Incremental static regeneration

  return routes;
}
