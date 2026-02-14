"use client";
import React, { lazy, Suspense, useEffect } from "react";
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

  // Expiring listing (≤5 days left) for banner
  const expiringListing = myListingsRaw?.find((l) => {
    if (l.status !== "verified" || !l.expiresAt) return false;
    const days = getDaysUntilExpiry(l.expiresAt);
    return days !== null && days > 0 && days <= 5;
  });

  // Load Dodo payments as soon as user enters the website (any tab/page)
  useEffect(() => {
    if (typeof window === "undefined") return;
    fetch(`${API_BASE}/api/payments-warmup`, { method: "GET", headers: { "Content-Type": "application/json" } }).catch(() => {});
  }, []);

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
      {user && expiringListing && (
        <div className="expiry-banner" role="alert" style={{ background: "var(--warning)", color: "#1f2937", padding: "0.75rem 1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <span>{t("listingExpiresInDays").replace("{{days}}", String(getDaysUntilExpiry(expiringListing.expiresAt)))}</span>
          <button type="button" className="btn btn-primary btn-sm" onClick={openRenewModal} aria-label={t("renewNow")}>
            {t("renewNow")}
          </button>
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
