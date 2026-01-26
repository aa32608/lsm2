"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../context/AppContext";
import logo from "../assets/logo.png";

const Header = ({ onMenuOpen }) => {
  const { 
    t, 
    lang, 
    setLang, 
    user, 
    onLogout, 
    verifiedListings, 
    myListingsRaw, 
    authLoading,
    setAuthMode,
    setShowAuthModal
  } = useApp();
  const pathname = usePathname();

  // Helper to check active state
  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { path: "/", label: t("homepage"), icon: "🏠" },
    { path: "/listings", label: t("explore"), icon: "🧭", badge: verifiedListings?.length || 0 },
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
          className="icon-btn hamburger-btn"
          onClick={onMenuOpen}
          aria-label={t("menu")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
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

        {authLoading ? (
           <div style={{ width: '80px', height: '36px', background: '#f1f5f9', borderRadius: '0.375rem' }}></div>
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
      </div>
    </header>
  );
};

export default Header;
