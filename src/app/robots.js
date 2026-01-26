export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/account/', '/mylistings/'],
    },
    sitemap: 'https://bizcall.mk/sitemap.xml',
  }
}
