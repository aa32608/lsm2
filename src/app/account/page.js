"use client";
import React from 'react';
import AccountTab from '../../components/AccountTab';
import ProtectedPage from '../../components/ProtectedPage';

export default function AccountPage() {
  return (
    <ProtectedPage>
      <AccountTab />
    </ProtectedPage>
  );
}
