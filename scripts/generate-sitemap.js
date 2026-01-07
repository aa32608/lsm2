import { writeFileSync } from 'fs';

const env = (globalThis.process && globalThis.process.env) || {};
const BASE_URL = env.BASE_URL || 'https://yourdomain.com';
const DB_URL = env.FIREBASE_DATABASE_URL || '';

async function fetchListings() {
  if (!DB_URL) return null;
  try {
    const res = await fetch(`${DB_URL}/listings.json`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  xml += `  <url>\n    <loc>${BASE_URL}/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

  const listings = await fetchListings();
  if (listings && typeof listings === 'object') {
    for (const [id, listing] of Object.entries(listings)) {
      if (listing && listing.status === 'verified') {
        const lastmod = listing.createdAt ? new Date(listing.createdAt).toISOString() : new Date().toISOString();
        xml += `  <url>\n    <loc>${BASE_URL}/?listing=${id}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
      }
    }
  }

  xml += `</urlset>\n`;
  writeFileSync('./public/sitemap.xml', xml);
  console.log('✅ Sitemap generated!');
}

generateSitemap().catch((err) => {
  console.error('❌ Error:', err);
  if (globalThis.process && typeof globalThis.process.exit === 'function') {
    globalThis.process.exit(1);
  }
});
