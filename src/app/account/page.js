"use client";
import React from 'react';
import AccountTab from '../../components/AccountTab';
import ProtectedPage from '../../components/ProtectedPage';

// Note: This is a protected page, so it should not be indexed by search engines
// Metadata is handled via noindex in the layout or via robots.txt

export default function AccountPage() {
  return (
    <ProtectedPage>
      <AccountTab />
    </ProtectedPage>
  );
}
