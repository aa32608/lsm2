"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../context/AppContext";

/**
 * Mobile nav: left slide-in drawer, transparent/glass, synced with hamburger.
 * Always in DOM for smooth open/close transition; visibility via .is-open.
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

  return (
    <div className={`mobile-drawer ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
      <div
        className="mobile-drawer-backdrop"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={-1}
        aria-label={t("close")}
      />
      <aside
        className="mobile-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label={t("menu") || t("navigation")}
      >
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">{t("appName")}</span>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={onClose}
            aria-label={t("close")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="mobile-drawer-nav">
          {links.map((item, i) => (
            <Link
              key={item.path}
              href={item.path}
              className={`mobile-drawer-item ${isActive(item.path) ? "active" : ""}`}
              style={{ transitionDelay: isOpen ? `${55 + i * 42}ms` : "0ms" }}
              onClick={onClose}
            >
              <span className="mobile-drawer-item-icon" aria-hidden>{item.icon}</span>
              <span className="mobile-drawer-item-label">{item.label}</span>
            </Link>
          ))}

          {user?.emailVerified ? (
            <button
              type="button"
              className="mobile-drawer-cta"
              style={{ transitionDelay: isOpen ? `${55 + links.length * 42}ms` : "0ms" }}
              onClick={() => {
                setShowPostForm(true);
                setForm((f) => ({ ...f, step: 1 }));
                onClose();
              }}
            >
              <span className="mobile-drawer-cta-icon">➕</span>
              {t("submitListing")}
            </button>
          ) : (
            <button
              type="button"
              className="mobile-drawer-cta mobile-drawer-cta--secondary"
              style={{ transitionDelay: isOpen ? `${55 + links.length * 42}ms` : "0ms" }}
              onClick={() => {
                setAuthMode("login");
                setShowAuthModal(true);
                onClose();
              }}
            >
              <span className="mobile-drawer-cta-icon">🔐</span>
              {t("login")} / {t("submitListing")}
            </button>
          )}
        </nav>

        {user && (
          <div className="mobile-drawer-footer">
            <p className="mobile-drawer-email" title={user.email}>{user.email}</p>
            <button type="button" className="mobile-drawer-logout" onClick={() => { onLogout?.(); onClose(); }}>
              {t("logout")}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;
