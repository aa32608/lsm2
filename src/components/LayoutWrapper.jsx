"use client";
import React, { lazy, Suspense } from "react";
import { AppProvider, useApp } from "../context/AppContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import NotificationToast from "./NotificationToast";
import CookieConsent from "./CookieConsent";
import FirebaseLoader from "./FirebaseLoader";
import { AnimatePresence } from "framer-motion";

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
  const { showTerms, setShowTerms, showPrivacy, setShowPrivacy, t, sidebarOpen, setSidebarOpen, showAuthModal, message, setMessage } = useApp();

  return (
    <div className="app-container">
      {/* Sidebar Overlay for Mobile */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? "visible" : ""}`} 
        onClick={() => setSidebarOpen(false)}
      />

      <Header onMenuOpen={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="main-content">
        <div className="main-content-wrapper">
          {children}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-links">
          <button className="btn-link" onClick={() => setShowTerms(true)}>{t("terms") || "Terms"}</button>
          <span className="separator">•</span>
          <button className="btn-link" onClick={() => setShowPrivacy(true)}>{t("privacy") || "Privacy"}</button>
        </div>
        <p>© {new Date().getFullYear()} {t("appName")} • {t("bizCall")}</p>
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
