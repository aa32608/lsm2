import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import logo from '../assets/logo.png';

const Header = ({ 
  t, 
  lang, 
  setLang, 
  user, 
  setShowAuthModal, 
  setSidebarOpen, 
  setSelectedTab,
  selectedTab,
  primaryNav,
  showMessage 
}) => (
  <header className="header">
    <div className="header-inner">
      <button
        className="icon-btn mobile-menu-btn"
        onClick={() => setSidebarOpen(true)}
        aria-label={t("menu") || "Menu"}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <button onClick={() => setSelectedTab("main")} className="brand">
        <div className="brand-mark">
          <div className="brand-logo-wrap">
            <img src={logo} alt="BizCall logo" className="brand-logo" />
          </div>
        </div>
        <div className="brand-text">
          <h1 className="brand-title">BizCall</h1>
          <p className="brand-tagline">{t("community") || "Trusted local services"}</p>
        </div>
      </button>

      <nav className="header-nav desktop-nav" aria-label="Primary navigation">
        {primaryNav.map((item) => (
          <button
            key={item.id}
            style={{color: "#000"}}
            className={`nav-chip ${selectedTab === item.id ? "active" : ""}`}
            onClick={() => setSelectedTab(item.id)}
          >
            <span className="nav-chip-label">{item.icon} {item.label}</span>
            {item.badge !== undefined && <span className="nav-chip-badge">{item.badge}</span>}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <select className="lang-select" value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="sq">🇦🇱 SQ</option>
          <option value="mk">🇲🇰 MK</option>
          <option value="en">🇬🇧 EN</option>
        </select>

        {user ? (
          <button 
            className="btn btn-ghost desktop-only" 
            onClick={async () => { 
              await signOut(auth); 
              showMessage(t("signedOut"), "success"); 
            }}
          >
            {t("logout")}
          </button>
        ) : (
          <button
            className="btn desktop-only"
            onClick={() => setShowAuthModal(true)}
          >
            {t("login")}
          </button>
        )}
      </div>
    </div>
  </header>
);

export default Header;
