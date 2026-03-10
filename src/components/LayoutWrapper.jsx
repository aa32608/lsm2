"use client";
import React, { lazy, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { AppProvider, useApp } from "../context/AppContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import NotificationToast from "./NotificationToast";
import CookieConsent from "./CookieConsent";
import FirebaseLoader from "./FirebaseLoader";
import { AnimatePresence } from "framer-motion";

const API_BASE = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ? "http://localhost:5000"
  : "https://lsm-wozo.onrender.com";

// Lazy load heavy modals for better performance
const AuthModal = lazy(() => import("./AuthModal"));
const PostListingDrawer = lazy(() => import("./PostListingDrawer"));
const ExtendListingModal = lazy(() => import("./ExtendListingModal"));
const EditListingModal = lazy(() => import("./EditListingModal"));
const ReportModal = lazy(() => import("./ReportModal"));
// LegalModals exports named exports - create a wrapper component for lazy loading
const LegalModalsLoader = ({ showTerms, showPrivacy, onCloseTerms, onClosePrivacy, t }) => {
  const [Modals, setModals] = React.useState(null);
  
  React.useEffect(() => {
    if ((showTerms || showPrivacy) && !Modals) {
      import("./LegalModals").then(m => setModals(m));
    }
  }, [showTerms, showPrivacy, Modals]);
  
  if (!Modals) return null;
  
  return (
    <>
      {showTerms && <Modals.TermsModal onClose={onCloseTerms} t={t} />}
      {showPrivacy && <Modals.PrivacyModal onClose={onClosePrivacy} t={t} />}
    </>
  );
};

// Helper component to consume context
const LayoutContent = ({ children }) => {
  const {
    showTerms, setShowTerms, showPrivacy, setShowPrivacy, t, sidebarOpen, setSidebarOpen,
    showAuthModal, message, setMessage, user, myListingsRaw, getDaysUntilExpiry,
    setExtendModalOpen, setExtendTarget, setSelectedExtendPlan
  } = useApp();

  const [expiryBannerDismissed, setExpiryBannerDismissed] = useState(false);

  const dismissExpiryBanner = () => {
    setExpiryBannerDismissed(true);
  };

  // Expiring listing (≤5 days left) for banner
  const expiringListing = myListingsRaw?.find((l) => {
    if (l.status !== "verified" || !l.expiresAt) return false;
    const days = getDaysUntilExpiry(l.expiresAt);
    return days <= 5 && days > 0;
  });

  const openRenewModal = () => {
    if (expiringListing) {
      setExtendTarget(expiringListing);
      setSelectedExtendPlan("1");
      setExtendModalOpen(true);
    }
  };

  return (
    <div className="app-container">
      <Header sidebarOpen={sidebarOpen} onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {user && expiringListing && !expiryBannerDismissed && (
        <div className="expiry-banner" role="alert" style={{ 
          position: "fixed", 
          top: "90px", 
          left: "50%", 
          transform: "translateX(-50%)", 
          background: "var(--warning)", 
          color: "#1f2937", 
          padding: "0.75rem 1rem", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          gap: "1rem", 
          flexWrap: "wrap",
          zIndex: 1000,
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          maxWidth: "90%",
          margin: "0 auto"
        }}>
          <span style={{ flex: 1, textAlign: "center" }}>
            {t("listingExpiresInDays").replace("{{days}}", String(getDaysUntilExpiry(expiringListing.expiresAt)))}
          </span>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <button type="button" className="btn btn-primary btn-sm" onClick={openRenewModal} aria-label={t("renewNow")}>
              {t("renewNow")}
            </button>
            <button 
              type="button" 
              className="btn btn-ghost btn-sm" 
              onClick={dismissExpiryBanner}
              aria-label={t("close")}
              style={{ 
                background: "rgba(0,0,0,0.1)", 
                color: "#1f2937", 
                border: "1px solid rgba(0,0,0,0.2)",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                fontSize: "0.875rem",
                minWidth: "auto"
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
      <main className="main-content">
        <div className="main-content-wrapper">
          {children}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-links">
          <Link href="/terms" className="btn-link">{t("terms")}</Link>
          <span className="separator">•</span>
          <Link href="/privacy" className="btn-link">{t("privacy")}</Link>
          <span className="separator">•</span>
          <Link href="/pricing" className="btn-link">{t("pricing")}</Link>
        </div>
        <p>© 2026 {t("appName")} • {t("bizCall")}</p>
      </footer>

      <Suspense fallback={null}>
        <AnimatePresence>
          {showAuthModal && <AuthModal />}
        </AnimatePresence>
        <PostListingDrawer />
        <ExtendListingModal />
        <EditListingModal />
        <ReportModal />
        <LegalModalsLoader 
          showTerms={showTerms}
          showPrivacy={showPrivacy}
          onCloseTerms={() => setShowTerms(false)}
          onClosePrivacy={() => setShowPrivacy(false)}
          t={t}
        />
      </Suspense>
      <NotificationToast 
        message={message?.text} 
        type={message?.type} 
        onClose={() => setMessage?.({ text: "", type: "info" })} 
      />
      <CookieConsent t={t} />
      
      <div id="recaptcha-signup" style={{ display: "none" }} />
      <div id="recaptcha-container" style={{ display: "none" }} />
    </div>
  );
};

const LayoutWrapper = ({ children, initialListings = [], initialPublicListings = [] }) => {
  return (
    <FirebaseLoader>
      <AppProvider initialListings={initialListings} initialPublicListings={initialPublicListings}>
        <LayoutContent>{children}</LayoutContent>
      </AppProvider>
    </FirebaseLoader>
  );
};

export default LayoutWrapper;
