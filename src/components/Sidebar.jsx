"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../context/AppContext";

/**
 * Mobile nav: bottom sheet (slides up). Completely separate design and behavior from any previous sidebar.
 * Desktop: not rendered (header has nav).
 */
const Sidebar = ({ onClose, isOpen }) => {
  const { t, user, onLogout, setShowPostForm, setShowAuthModal, setAuthMode, setForm } = useApp();
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname?.startsWith(path)) return true;
    return false;
  };

  const links = useMemo(() => [
    { path: "/", label: t("homepage"), icon: "🏠" },
    { path: "/listings", label: t("explore"), icon: "🔍" },
    { path: "/contact", label: t("contactUs"), icon: "✉️" },
    ...(user ? [
      { path: "/mylistings", label: t("myListings"), icon: "📋" },
      { path: "/account", label: t("account"), icon: "👤" },
    ] : []),
  ], [user, t]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="mobile-nav-backdrop"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={0}
        aria-label={t("close")}
      />
      <div
        className="mobile-nav-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={t("menu") || t("navigation")}
      >
        <div className="mobile-nav-sheet-header">
          <span className="mobile-nav-sheet-title">{t("appName")}</span>
          <button
            type="button"
            className="mobile-nav-sheet-close"
            onClick={onClose}
            aria-label={t("close")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="mobile-nav-sheet-nav">
          {links.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`mobile-nav-sheet-item ${isActive(item.path) ? "active" : ""}`}
              onClick={onClose}
            >
              <span className="mobile-nav-sheet-item-icon" aria-hidden>{item.icon}</span>
              <span className="mobile-nav-sheet-item-label">{item.label}</span>
            </Link>
          ))}

          {user?.emailVerified ? (
            <button
              type="button"
              className="mobile-nav-sheet-cta"
              onClick={() => {
                setShowPostForm(true);
                setForm((f) => ({ ...f, step: 1 }));
                onClose();
              }}
            >
              <span className="mobile-nav-sheet-cta-icon">➕</span>
              {t("submitListing")}
            </button>
          ) : (
            <button
              type="button"
              className="mobile-nav-sheet-cta mobile-nav-sheet-cta--secondary"
              onClick={() => {
                setAuthMode("login");
                setShowAuthModal(true);
                onClose();
              }}
            >
              <span className="mobile-nav-sheet-cta-icon">🔐</span>
              {t("login")} / {t("submitListing")}
            </button>
          )}
        </nav>

        <div className="mobile-nav-sheet-footer">
          {user ? (
            <>
              <p className="mobile-nav-sheet-email" title={user.email}>{user.email}</p>
              <button type="button" className="mobile-nav-sheet-logout" onClick={() => { onLogout?.(); onClose(); }}>
                {t("logout")}
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
