/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '**',
      },
    ],
  },
  // HTTP Caching Headers for optimal performance
  async headers() {
    return [
      {
        // Cache static assets aggressively
        source: '/:path*(.js|.css|.png|.jpg|.jpeg|.gif|.svg|.ico|.woff|.woff2|.ttf|.eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache HTML with shorter duration (5 minutes)
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=300, stale-while-revalidate=60',
          },
        ],
      },
      {
        // Preconnect to Firebase for faster connections
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value: '<https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app>; rel=preconnect, <https://firebasestorage.googleapis.com>; rel=preconnect',
          },
        ],
      },
    ];
  },
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID,
  }
};

export default nextConfig;
