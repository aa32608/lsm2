import React from 'react';
import HomeTab from '../components/HomeTab';

export const metadata = {
  title: 'BizCall MK - Home',
  description: 'Find and share trustworthy services across North Macedonia. From Skopje to Ohrid, discover locals who can help you today.',
  openGraph: {
    title: 'BizCall MK - Home',
    description: 'Find and share trustworthy services across North Macedonia.',
    type: 'website',
    url: 'https://bizcall.mk/',
    siteName: 'BizCall MK',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg', // Ensure this exists or use a placeholder
        width: 1200,
        height: 630,
        alt: 'BizCall MK Hero Image',
      },
    ],
  },
};

export default function HomePage() {
  return <HomeTab />;
}
