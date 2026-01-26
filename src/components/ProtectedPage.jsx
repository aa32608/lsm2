"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="spinner"></div>
    <p style={{
      color: 'var(--text-secondary)',
      fontSize: '1rem',
      margin: 0
    }}>Loading...</p>
  </div>
);

export default function ProtectedPage({ children, redirectTo = "/" }) {
  const { user, firebaseReady, authLoading } = useApp();
  const router = useRouter();

  useEffect(() => {
    // Wait for Firebase to be ready
    if (!firebaseReady || authLoading) {
      return;
    }

    // If Firebase is ready and user is not logged in, redirect
    if (!user) {
      router.push(redirectTo);
    }
  }, [user, firebaseReady, authLoading, router, redirectTo]);

  // Show loading spinner while Firebase is initializing or auth is loading
  if (!firebaseReady || authLoading) {
    return <LoadingSpinner />;
  }

  // If user is not logged in, show loading while redirecting
  if (!user) {
    return <LoadingSpinner />;
  }

  // User is logged in and Firebase is ready, show content
  return <>{children}</>;
}

