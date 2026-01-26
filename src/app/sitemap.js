export default async function sitemap() {
  // Base routes
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

  // Fetch dynamic listing routes
  // Note: For build time, this fetches from the live DB. 
  // Ensure the fetch URL is correct or use an environment variable.
  try {
    const res = await fetch('https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app/listings.json');
    const data = await res.json();
    
    if (data) {
      const listingUrls = Object.keys(data)
        .filter(id => {
          const l = data[id];
          // Only index verified and non-expired listings
          return l.status === 'verified' && (!l.expiresAt || l.expiresAt > Date.now());
        })
        .map((id) => ({
          url: `https://bizcall.mk/listings/${id}`,
          lastModified: new Date(data[id].updatedAt || data[id].createdAt || Date.now()),
          changeFrequency: 'weekly',
          priority: 0.7,
        }));
      return [...routes, ...listingUrls];
    }
  } catch (e) {
    console.error('Sitemap generation error:', e);
  }

  return routes;
}
