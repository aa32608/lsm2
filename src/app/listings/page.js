import React from 'react';
import ListingsTab from '../../components/ListingsTab';

export const metadata = {
  title: 'BizCall MK - Explore Listings',
  description: 'Browse all verified listings in your area. Find services, professionals, and local businesses in North Macedonia.',
  openGraph: {
    title: 'Explore Listings | BizCall MK',
    description: 'Browse all verified listings in your area.',
    type: 'website',
    url: 'https://bizcall.mk/listings',
  },
};

export default function ListingsPage() {
  return <ListingsTab />;
}
