/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Often helps with drag-and-drop or strict mode double-invokes
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  env: {
    // We will ensure these are picked up from process.env if set there
  }
};

export default nextConfig;
