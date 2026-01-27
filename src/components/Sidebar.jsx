import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "../context/AppContext";

const Sidebar = ({ onClose, isOpen }) => {
  const { t, user, myListingsRaw, onLogout, setShowPostForm, setShowAuthModal, setAuthMode, setForm } = useApp();
  const pathname = usePathname();

  const userStats = useMemo(() => {
    if (!user || !myListingsRaw) return null;
    const listingsCount = myListingsRaw.length;
    const viewsCount = myListingsRaw.reduce((acc, curr) => acc + (curr.views || 0), 0);
    return { listingsCount, viewsCount };
  }, [user, myListingsRaw]);

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { path: "/", label: t("homepage"), icon: "🏠" },
    { path: "/listings", label: t("explore"), icon: "🧭" },
    ...(user ? [
      { path: "/mylistings", label: t("myListings"), icon: "📂" },
      { path: "/account", label: t("account"), icon: "👤" },
    ] : []),
  ];

  return (
    <aside className={`app-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="brand-text">
          <h3 className="brand-title">{t("bizCall")}</h3>
          <p className="brand-tagline">{t("communityTagline")}</p>
        </div>
        <button className="icon-btn md:hidden" onClick={onClose} aria-label={t("close")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`nav-item ${isActive(item.path) ? "active" : ""}`}
            onClick={onClose}
          >
            <span className="nav-item-icon">{item.icon}</span>
            <span className="nav-item-label">{item.label}</span>
          </Link>
        ))}
        
        {/* Submit Listing Button */}
        {user && user.emailVerified ? (
          <button
            className="nav-item nav-item-button"
            onClick={() => {
              setShowPostForm(true);
              setForm((f) => ({ ...f, step: 1 }));
              onClose();
            }}
            aria-label={t("submitListing")}
          >
            <span className="nav-item-icon">➕</span>
            <span className="nav-item-label">{t("submitListing")}</span>
          </button>
        ) : (
          <button
            className="nav-item nav-item-button"
            onClick={() => {
              setAuthMode("login");
              setShowAuthModal(true);
              onClose();
            }}
            aria-label={t("loginToSubmitListing")}
          >
            <span className="nav-item-icon">🔐</span>
            <span className="nav-item-label">{t("submitListing")}</span>
          </button>
        )}
      </nav>

      <div className="sidebar-footer">
        {user ? (
          <div className="user-profile-summary">
            <div className="user-info">
              <span className="user-email">{user.email}</span>
            </div>
            <button className="btn btn-ghost btn-sm w-full mt-2" onClick={onLogout}>
              {t("logout")}
            </button>
          </div>
        ) : (
          <div className="p-4">
             {/* Login button handled in Header usually, but can be here too */}
          </div>
        )}
        <div className="text-xs text-muted text-center mt-4">
          © {new Date().getFullYear()} BizCall
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
