"use client";
import React from 'react';
import MyListingsTab from '../../components/MyListingsTab';
import ProtectedPage from '../../components/ProtectedPage';

// Note: This is a protected page, so it should not be indexed by search engines
// Metadata is handled via noindex in the layout or via robots.txt

export default function MyListingsPage() {
  return (
    <ProtectedPage>
      <MyListingsTab />
    </ProtectedPage>
  );
}
