"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function FirebaseLoader({ children }) {
  const [firebaseReady, setFirebaseReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setFirebaseReady(true);
      return;
    }

    // CRITICAL: Block page render until Firebase is fully initialized
    let unsubscribe;
    let timeout;

    const checkAuthState = () => {
      try {
        // Access auth.currentUser synchronously - Firebase v9+ has this cached
        const currentUser = auth.currentUser;
        
        // If we already have a user, we're ready immediately
        if (currentUser !== null) {
          setFirebaseReady(true);
        }
        
        // Set up auth state listener
        unsubscribe = onAuthStateChanged(auth, () => {
          // Auth state has been determined
          setFirebaseReady(true);
        });

        // Safety timeout - don't block forever (max 300ms for faster loading)
        timeout = setTimeout(() => {
          setFirebaseReady(true);
          if (unsubscribe) unsubscribe();
        }, 300);
      } catch (e) {
        console.warn("Firebase auth check failed:", e);
        setFirebaseReady(true);
      }
    };

    const initFirebase = () => {
      try {
        // Check if Firebase is available
        if (!auth || !db) {
          // If Firebase isn't available, wait a bit and check again
          timeout = setTimeout(() => {
            if (auth && db) {
              checkAuthState();
            } else {
              // If still not available, proceed anyway to prevent infinite loading
              setFirebaseReady(true);
            }
          }, 30); // Reduced from 50ms
          return;
        }

        // Check auth state immediately (Firebase v9+ LOCAL persistence)
        checkAuthState();
      } catch (e) {
        console.warn("Firebase initialization error:", e);
        // Don't block forever - proceed after short delay
        timeout = setTimeout(() => {
          setFirebaseReady(true);
        }, 200); // Reduced from 300ms
      }
    };

    // Start immediately
    initFirebase();

    return () => {
      if (unsubscribe) unsubscribe();
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  // Don't block render - show content immediately, Firebase will hydrate in background
  // Only show loader if Firebase takes too long (after 200ms)
  const [showLoader, setShowLoader] = useState(false);
  
  useEffect(() => {
    if (!firebaseReady) {
      // Only show loader after 200ms delay to allow content to render first
      const timer = setTimeout(() => {
        if (!firebaseReady) {
          setShowLoader(true);
        }
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setShowLoader(false);
    }
  }, [firebaseReady]);

  return (
    <>
      {showLoader && !firebaseReady && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          flexDirection: 'column',
          gap: 'var(--spacing-lg)'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid var(--border)',
            borderTopColor: 'var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style jsx>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
      {children}
    </>
  );
}

