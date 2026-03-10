"use client";
import React from "react";
import dynamic from 'next/dynamic';
import { usePathname } from "next/navigation";
import { useApp } from "../context/AppContext";
import logo from "../assets/logo.png";

import Link from 'next/link';

const Header = ({ sidebarOpen, onMenuToggle }) => {
  const {
    t,
    lang,
    setLang,
    user,
    onLogout,
    verifiedListings,
    myListingsRaw,
    authLoading,
    firebaseReady,
    setAuthMode,
    setShowAuthModal,
  } = useApp();
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { path: "/", label: t("homepage"), icon: "🏠" },
    { path: "/listings", label: t("explore"), icon: "🧭", badge: verifiedListings?.length || 0 },
    { path: "/contact", label: t("contactUs"), icon: "✉️" },
    ...(user
      ? [
          { path: "/mylistings", label: t("myListings"), icon: "📂", badge: myListingsRaw?.length || 0 },
          { path: "/account", label: t("account"), icon: "👤" },
        ]
      : []),
  ];

  const stagger = (i) => (sidebarOpen ? `${90 + i * 65}ms` : "0ms");

  return (
    <header className="app-header">
      {/* Mobile only: drawer content ABOVE the header bar — revealed when "drawer" (header bar) is pulled down */}
      <div
        className={`mobile-header-drawer ${sidebarOpen ? "is-open" : ""}`}
        aria-hidden={!sidebarOpen}
        id="mobile-header-drawer"
      >
        <div className="mobile-header-drawer-inner">
          <nav className="mobile-header-drawer-nav">
            {navItems.map((item, i) => (
              <Link
                key={item.path}
                href={item.path}
                className={`mobile-header-drawer-item ${isActive(item.path) ? "active" : ""}`}
                style={{ transitionDelay: stagger(i) }}
                onClick={onMenuToggle}
              >
                <span className="mobile-header-drawer-item-icon" aria-hidden>
                  {item.icon}
                </span>
                <span className="mobile-header-drawer-item-label">{item.label}</span>
              </Link>
            ))}
          </nav>
          {/* Login/Logout button in mobile drawer */}
          <div className="mobile-header-drawer-footer" style={{ transitionDelay: stagger(navItems.length) }}>
            {user ? (
              <button
                type="button"
                className="mobile-header-drawer-logout-btn"
                onClick={() => {
                  onLogout?.();
                  onMenuToggle();
                }}
              >
                <span className="mobile-header-drawer-logout-icon">🚪</span>
                {t("logout")}
              </button>
            ) : (
              <button
                type="button"
                className="mobile-header-drawer-login-btn"
                onClick={() => {
                  setAuthMode("login");
                  setShowAuthModal(true);
                  onMenuToggle();
                }}
              >
                <span className="mobile-header-drawer-login-icon">👤</span>
                {t("login")}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Header bar = front of drawer / handle — when pulled, it comes down and reveals content above */}
      <div className="header-bar">
        <div className="header-left">
          <button
            className={`hamburger-btn ${sidebarOpen ? "open" : ""}`}
            onClick={onMenuToggle}
            aria-label={sidebarOpen ? t("close") : t("menu")}
            aria-expanded={!!sidebarOpen}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>

          <Link href="/" className="header-logo">
            <div className="brand-mark">
              <img
                src={logo.src || logo}
                alt={t("bizcallLogo")}
                className="brand-logo"
                style={{ height: "32px", width: "auto" }}
                loading="lazy"
              />
            </div>
            <span>{t("bizCall")}</span>
          </Link>

          <nav className="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`desktop-nav-item ${isActive(item.path) ? "active" : ""}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span
                    className="badge-count"
                    style={{
                      background: "var(--primary)",
                      color: "white",
                      fontSize: "0.7rem",
                      padding: "2px 6px",
                      borderRadius: "10px",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="header-actions">
          {/* Desktop only: login/logout button */}
          {authLoading || !firebaseReady ? (
            <div
              className="header-loading-placeholder desktop-only"
              style={{
                width: "80px",
                height: "36px",
                background:
                  "linear-gradient(90deg, var(--border) 25%, var(--surface-hover) 50%, var(--border) 75%)",
                backgroundSize: "200% 100%",
                borderRadius: "var(--radius-md)",
                animation: "shimmer 1.5s infinite",
              }}
            />
          ) : user ? (
            <button className="btn btn-ghost desktop-only" onClick={onLogout}>
              {t("logout")}
            </button>
          ) : (
            <button
              className="btn btn-primary desktop-only"
              onClick={() => {
                setAuthMode("login");
                setShowAuthModal(true);
              }}
            >
              {t("login")}
            </button>
          )}

          {/* Language selector - visible on all devices */}
          <select
            className="select header-lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="sq">🇦🇱 SQ</option>
            <option value="mk">🇲🇰 MK</option>
            <option value="en">🇬🇧 EN</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
