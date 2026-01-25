"use client";
import React from "react";
import { AppProvider, useApp } from "../context/AppContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AuthModal from "./AuthModal";
import PostListingDrawer from "./PostListingDrawer";
import ExtendListingModal from "./ExtendListingModal";
import EditListingModal from "./EditListingModal";
import ReportModal from "./ReportModal";
import Toast from "./Toast";
import { TermsModal, PrivacyModal } from "./LegalModals";
import CookieConsent from "./CookieConsent";
import { AnimatePresence } from "framer-motion";

// Helper component to consume context
const LayoutContent = ({ children }) => {
  const { showTerms, setShowTerms, showPrivacy, setShowPrivacy, t, sidebarOpen, setSidebarOpen, showAuthModal } = useApp();

  return (
    <div className={`app-container ${sidebarOpen ? "sidebar-open" : ""}`}>
      <Header onMenuOpen={() => setSidebarOpen(true)} />
      <Sidebar onClose={() => setSidebarOpen(false)} />
      
      <main className="main-content">
         {children}
      </main>

      <AnimatePresence>
        {showAuthModal && <AuthModal />}
      </AnimatePresence>
      <PostListingDrawer />
      <ExtendListingModal />
      <EditListingModal />
      <ReportModal />
      <Toast />
      
      {showTerms && <TermsModal onClose={() => setShowTerms(false)} t={t} />}
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} t={t} />}
      <CookieConsent t={t} />

      <footer className="footer">
        <p>© 2024 {t("appName")} • {t("bizCall")}</p>
      </footer>
      <div id="recaptcha-signup" style={{ display: "none" }} />
      <div id="recaptcha-container" style={{ display: "none" }} />
    </div>
  );
};

const LayoutWrapper = ({ children, initialListings = [], initialPublicListings = [] }) => {
  return (
    <AppProvider initialListings={initialListings} initialPublicListings={initialPublicListings}>
      <LayoutContent>{children}</LayoutContent>
    </AppProvider>
  );
};

export default LayoutWrapper;
