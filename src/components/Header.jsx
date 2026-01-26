"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "../context/AppContext";
import logo from "../assets/logo.png";

const Header = ({ onMenuOpen }) => {
  const { t, lang, setLang, user, onLogout, onLogin, verifiedListings, myListingsRaw, authLoading, selectedTab, setSelectedTab } = useApp();
  const pathname = usePathname();
  const router = useRouter();

  // Helper to check active state
  const isActive = (id) => {
    if (pathname === "/" && selectedTab === id) return true;
    return false;
  };

  const navItems = [
    { id: "home", label: t("homepage"), icon: "🏠" },
    { id: "explore", label: t("explore"), icon: "🧭", badge: verifiedListings?.length || 0 },
    ...(user
      ? [
          { id: "myListings", label: t("myListings"), icon: "📂", badge: myListingsRaw?.length || 0 },
          { id: "account", label: t("account"), icon: "👤" },
        ]
      : []),
  ];

  const handleNav = (id) => {
    setSelectedTab(id);
    if (pathname !== "/") {
      router.push("/");
    }
  };

  return (
    <header className="header">
      <div className="header-inner">
        <button
          className="icon-btn mobile-menu-btn"
          onClick={onMenuOpen}
          aria-label={t("menu")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <button
          className="brand"
          onClick={() => handleNav('home')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
        >
          <div className="brand-mark">
            <div className="brand-logo-wrap">
              <img
                src={logo.src || logo} // Next.js img import might be object
                alt={t("bizcallLogo")}
                className="brand-logo"
                loading="lazy"
              />
            </div>
          </div>
          <div className="brand-text">
            <h1 className="brand-title">{t("bizCall")}</h1>
            <p className="brand-tagline">{t("communityTagline")}</p>
          </div>
        </button>

        <nav className="header-nav desktop-nav" aria-label={t("primaryNav")}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-chip ${isActive(item.id) ? "active" : ""}`}
              onClick={() => handleNav(item.id)}
              style={{ color: "#000" }} // Preserving inline style from original
            >
              <span className="nav-chip-label">{item.icon} {item.label}</span>
              {item.badge !== undefined && item.badge > 0 && <span className="nav-chip-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <select className="lang-select" value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="sq">🇦🇱 SQ</option>
            <option value="mk">🇲🇰 MK</option>
            <option value="en">🇬🇧 EN</option>
          </select>

          {authLoading ? (
             <div style={{ width: '80px', height: '36px' }}></div> // Skeleton placeholder
          ) : user ? (
            <button className="btn btn-ghost desktop-only" onClick={onLogout}>
              {t("logout")}
            </button>
          ) : (
            <button
              className="btn desktop-only"
              onClick={onLogin}
            >
              {t("login")}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
