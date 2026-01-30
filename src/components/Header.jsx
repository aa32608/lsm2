"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../context/AppContext";
import logo from "../assets/logo.png";

const Header = ({ sidebarOpen, onMenuOpen }) => {
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
    setShowPostForm
  } = useApp();
  const pathname = usePathname();

  // Helper to check active state
  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  // Show nav items immediately based on user state (even if Firebase is still loading)
  // This prevents layout shifts when Firebase finishes loading
  const navItems = [
    { path: "/", label: t("homepage"), icon: "🏠" },
    { path: "/listings", label: t("explore"), icon: "🧭", badge: verifiedListings?.length || 0 },
    { path: "/contact", label: t("contactUs"), icon: "✉️" },
    // Show user nav items immediately if user exists (from cache or Firebase)
    // This prevents the buttons from appearing mid-page load
    ...(user
      ? [
          { path: "/mylistings", label: t("myListings"), icon: "📂", badge: myListingsRaw?.length || 0 },
          { path: "/account", label: t("account"), icon: "👤" },
        ]
      : []),
  ];

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className={`hamburger-btn ${sidebarOpen ? "open" : ""}`}
          onClick={onMenuOpen}
          aria-label={sidebarOpen ? t("close") : t("menu")}
          aria-expanded={!!sidebarOpen}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>

        <Link
          href="/"
          className="header-logo"
        >
          <div className="brand-mark">
            <img
              src={logo.src || logo} // Next.js img import might be object
              alt={t("bizcallLogo")}
              className="brand-logo"
              style={{ height: '32px', width: 'auto' }}
              loading="lazy"
            />
          </div>
          <span>{t("bizCall")}</span>
        </Link>

        {/* Desktop Nav */}
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
                <span className="badge-count" style={{ 
                  background: 'var(--primary)', 
                  color: 'white', 
                  fontSize: '0.7rem', 
                  padding: '2px 6px', 
                  borderRadius: '10px' 
                }}>{item.badge}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="header-actions">
        <select className="select" style={{ width: 'auto', paddingRight: '2rem' }} value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="sq">🇦🇱 SQ</option>
          <option value="mk">🇲🇰 MK</option>
          <option value="en">🇬🇧 EN</option>
        </select>

        {authLoading || !firebaseReady ? (
          <div className="header-loading-placeholder" style={{ 
            width: '80px', 
            height: '36px', 
            background: 'linear-gradient(90deg, var(--border) 25%, var(--surface-hover) 50%, var(--border) 75%)',
            backgroundSize: '200% 100%',
            borderRadius: 'var(--radius-md)',
            animation: 'shimmer 1.5s infinite'
          }}></div>
        ) : user ? (
          <button className="btn btn-ghost" onClick={onLogout} style={{ marginRight: '15%' }}>
            {t("logout")}
          </button>
        ) : (
          <button
            className="btn btn-primary"
            style={{ marginRight: '15%' }}
            onClick={() => {
              setAuthMode("login");
              setShowAuthModal(true);
            }}
          >
            {t("login")}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
