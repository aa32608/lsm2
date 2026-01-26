"use client";
import React from 'react';
import MyListingsTab from '../../components/MyListingsTab';
import ProtectedPage from '../../components/ProtectedPage';

export default function MyListingsPage() {
  return (
    <ProtectedPage>
      <MyListingsTab />
    </ProtectedPage>
  );
}
