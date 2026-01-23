const CACHE_NAME = 'bizcall-cache-v1';
const OFFLINE_URL = '/';
const ASSETS = [
  '/',
  '/manifest.json',
  '/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => (key !== CACHE_NAME ? caches.delete(key) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-HTTP/HTTPS requests (like chrome-extension://)
  if (!url.protocol.startsWith('http')) return;

  // Ignore Google Ads/Analytics/GTM to avoid issues with ad blockers or caching opaque responses
  if (
    url.hostname.includes('google') || 
    url.hostname.includes('doubleclick') || 
    url.hostname.includes('googlesyndication') ||
    url.hostname.includes('googletagmanager')
  ) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }
  if (request.method !== 'GET') return;
  
  // Skip caching for API requests, especially localhost/dev environment APIs
  if (url.pathname.startsWith('/api/') || url.hostname === 'localhost') return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => {
          // If network fails and no cache, just return undefined (browser handles it) or a custom offline response
          return cached || new Response(null, { status: 404, statusText: "Not Found" }); 
        });
    })
  );
});

