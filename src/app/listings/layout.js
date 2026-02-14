// Layout for listings route - handles metadata for SEO
// Metadata must be in a server component, not a client component

export const metadata = {
  title: 'Explore Listings | BizCall MK',
  description: 'Discover thousands of services and listings across North Macedonia. Find trusted local businesses, services, and products in Skopje, Tetovo, Ohrid, and more.',
  keywords: 'listings, services, North Macedonia, Skopje, Tetovo, Ohrid, businesses, local services',
  openGraph: {
    title: 'Explore Listings | BizCall MK',
    description: 'Discover thousands of services and listings across North Macedonia.',
    type: 'website',
    url: 'https://bizcall.mk/listings',
    siteName: 'BizCall MK',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BizCall MK Listings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore Listings | BizCall MK',
    description: 'Discover thousands of services and listings across North Macedonia.',
  },
  alternates: {
    canonical: 'https://bizcall.mk/listings',
  },
};

export default function ListingsLayout({ children }) {
  return (
    <>
      {/* Structured Data for SEO - helps Google understand the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Explore Listings | BizCall MK',
            description: 'Discover thousands of services and listings across North Macedonia',
            url: 'https://bizcall.mk/listings',
            mainEntity: {
              '@type': 'ItemList',
              name: 'Service Listings',
              description: 'A collection of service listings and businesses',
            },
          }),
        }}
      />
      {/* Server-rendered content so crawlers get real content (fixes redirect/low-value and AdSense policy) */}
      <section className="listings-page-intro" aria-label="Explore listings">
        <h1 className="listings-page-intro-title">Explore Listings</h1>
        <p className="listings-page-intro-text">
          Discover thousands of services and listings across North Macedonia. Find trusted local businesses, services, and products in Skopje, Tetovo, Ohrid, and more.
        </p>
      </section>
      {children}
    </>
  );
}
