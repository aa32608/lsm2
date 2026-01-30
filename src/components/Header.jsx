"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../context/AppContext";
import logo from "../assets/logo.png";

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
    setShowPostForm,
    setForm,
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

  const stagger = (i) => (sidebarOpen ? `${70 + i * 50}ms` : "0ms");

  return (
    <header className="app-header">
      {/* Top bar: always visible (hamburger, logo, desktop nav, actions) */}
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
          <select
            className="select"
            style={{ width: "auto", paddingRight: "2rem" }}
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="sq">🇦🇱 SQ</option>
            <option value="mk">🇲🇰 MK</option>
            <option value="en">🇬🇧 EN</option>
          </select>

          {authLoading || !firebaseReady ? (
            <div
              className="header-loading-placeholder"
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
            <button className="btn btn-ghost" onClick={onLogout} style={{ marginRight: "15%" }}>
              {t("logout")}
            </button>
          ) : (
            <button
              className="btn btn-primary"
              style={{ marginRight: "15%" }}
              onClick={() => {
                setAuthMode("login");
                setShowAuthModal(true);
              }}
            >
              {t("login")}
            </button>
          )}
        </div>
      </div>

      {/* Mobile only: expandable drawer (nav + CTA + footer) — sidebar is the header */}
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

            {user?.emailVerified ? (
              <button
                type="button"
                className="mobile-header-drawer-cta"
                style={{ transitionDelay: stagger(navItems.length) }}
                onClick={() => {
                  setShowPostForm(true);
                  setForm((f) => ({ ...f, step: 1 }));
                  onMenuToggle();
                }}
              >
                <span className="mobile-header-drawer-cta-icon">➕</span>
                {t("submitListing")}
              </button>
            ) : (
              <button
                type="button"
                className="mobile-header-drawer-cta mobile-header-drawer-cta--secondary"
                style={{ transitionDelay: stagger(navItems.length) }}
                onClick={() => {
                  setAuthMode("login");
                  setShowAuthModal(true);
                  onMenuToggle();
                }}
              >
                <span className="mobile-header-drawer-cta-icon">🔐</span>
                {t("login")} / {t("submitListing")}
              </button>
            )}
          </nav>

          {user && (
            <div
              className="mobile-header-drawer-footer"
              style={{ transitionDelay: stagger(navItems.length + 1) }}
            >
              <p className="mobile-header-drawer-email" title={user.email}>
                {user.email}
              </p>
              <button
                type="button"
                className="mobile-header-drawer-logout"
                onClick={() => {
                  onLogout?.();
                  onMenuToggle();
                }}
              >
                {t("logout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
