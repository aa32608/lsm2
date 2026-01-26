import React from 'react';
import MyListingsTab from '../../components/MyListingsTab';

export const metadata = {
  title: 'My Listings | BizCall MK',
  description: 'Manage your active and expired listings on BizCall MK.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MyListingsPage() {
  return <MyListingsTab />;
}
