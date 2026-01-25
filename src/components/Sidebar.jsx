"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../context/AppContext";

const Sidebar = ({ onClose }) => {
  const { t, user, onLogout, onLogin, myListingsRaw } = useApp();
  const pathname = usePathname();

  const userStats = useMemo(() => {
    if (!user || !myListingsRaw) return null;
    const listingsCount = myListingsRaw.length;
    // Assuming views are stored on the listing object, otherwise default to 0
    const viewsCount = myListingsRaw.reduce((acc, curr) => acc + (curr.views || 0), 0);
    return { listingsCount, viewsCount };
  }, [user, myListingsRaw]);

  // Helper to check active state
  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname?.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { id: "main", label: t("homepage"), icon: "🏠", path: "/" },
    ...(user ? [
      { id: "myListings", label: t("myListings"), icon: "📂", path: "/mylistings" },
      { id: "account", label: t("account"), icon: "👤", path: "/account" },
    ] : []),
    { id: "allListings", label: t("explore"), icon: "🧭", path: "/listings" },
  ];

  return (
    <div className="sidebar-panel">
      <div className="sidebar-header">
        <div className="sidebar-header-top">
          <div className="sidebar-header-content">
            <h3 className="sidebar-title">{t("dashboard")}</h3>
            <p className="sidebar-subtitle">{t("manageListings")}</p>
          </div>
          <button className="sidebar-close-btn" onClick={onClose} aria-label={t("close")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ minWidth: "24px" }}>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={`sidebar-btn ${isActive(item.path) ? "active" : ""}`}
            onClick={onClose} // Close sidebar on navigation
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
            {isActive(item.path) && (
              <span className="sidebar-active-indicator">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Unique Content: User Stats or Platform Info */}
      <div className="sidebar-content-unique" style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: '#f8fafc' }}>
        {user ? (
          <div className="sidebar-stats">
            <h4 style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>{t("quickStats") || "Your Stats"}</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div className="stat-mini" style={{ background: 'white', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: '700', color: '#0f172a' }}>{userStats?.listingsCount || 0}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{t("activeListings") || "Listings"}</span>
              </div>
              <div className="stat-mini" style={{ background: 'white', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: '700', color: '#0f172a' }}>{userStats?.viewsCount || 0}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{t("totalViews") || "Views"}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="sidebar-promo">
            <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '4px' }}>{t("joinCommunity") || "Join our Community"}</h4>
            <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: '1.4' }}>{t("joinCommunityDesc") || "Post your services and reach thousands of locals."}</p>
          </div>
        )}
      </div>

      {/* Support Section */}
      <div className="sidebar-support" style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
        <h4 style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          {t("support") || "Support"}
        </h4>
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '12px', lineHeight: '1.4' }}>
          {t("supportDesc") || "Need help? We're here for you."}
        </p>
        <a 
          href="mailto:support@bizcall.mk" 
          className="btn btn-ghost small"
          style={{ width: '100%', justifyContent: 'center', border: '1px solid #e2e8f0' }}
        >
          {t("contactSupport") || "Contact Support"}
        </a>
      </div>

      <div className="sidebar-footer">
        {user ? (
          <button className="sidebar-logout" onClick={() => { onLogout(); onClose(); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>{t("logout")}</span>
          </button>
        ) : (
          <button className="sidebar-login" onClick={() => { onLogin(); onClose(); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2-2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            <span>{t("login")}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
