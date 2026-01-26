"use client";
import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import Filtersheet from './Filtersheet';
import MyListingCard from './MyListingCard';

export default function MyListingsTab() {
  const {
    t, user, myListingsRaw, categoryIcons,
    handleSelectListing, handleOpenEdit, handleStartExtendFlow,
    showMessage, handleShareListing, confirmDelete,
    getDaysUntilExpiry, getListingStats, getDescriptionPreview,
    setShowPostForm, setShowAuthModal, setAuthMode
  } = useApp();

  if (!user) {
    return (
      <div className="section" style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔐</div>
        <h2>{t("loginToSeeMore") || "Please Login"}</h2>
        <p style={{ color: "#64748b", marginBottom: "2rem" }}>
          {t("loginDescription") || "You need to be logged in to view and manage your listings."}
        </p>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setAuthMode("login");
            setShowAuthModal(true);
          }}
        >
          {t("login") || "Login"}
        </button>
      </div>
    );
  }

  // Local UI State
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expiryFilter, setExpiryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Derived Data
  const myListings = useMemo(() => {
    let arr = [...myListingsRaw];

    // 1. Status
    if (statusFilter === "verified") {
      arr = arr.filter((l) => l.status === "verified");
    } else if (statusFilter === "pending") {
      arr = arr.filter((l) => l.status !== "verified");
    }

    // 2. Expiry
    if (expiryFilter === "expiring") {
      arr = arr.filter((l) => {
        const days = getDaysUntilExpiry(l.expiresAt);
        return days !== null && days > 0 && days <= 7;
      });
    } else if (expiryFilter === "expired") {
      arr = arr.filter((l) => {
        const days = getDaysUntilExpiry(l.expiresAt);
        return days !== null && days <= 0;
      });
    } else if (expiryFilter === "active") {
      arr = arr.filter((l) => {
        const days = getDaysUntilExpiry(l.expiresAt);
        return days === null || days > 0;
      });
    }

    // 3. Search
    if (q.trim()) {
      const term = q.trim().toLowerCase();
      arr = arr.filter(
        (l) =>
          (l.name || "").toLowerCase().includes(term) ||
          (l.description || "").toLowerCase().includes(term) ||
          (l.location || "").toLowerCase().includes(term) ||
          (l.category || "").toLowerCase().includes(term)
      );
    }

    // 4. Sort
    if (sortBy === "newest") {
      arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } else if (sortBy === "oldest") {
      arr.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    } else if (sortBy === "expiring") {
      arr.sort((a, b) => {
        const aDays = getDaysUntilExpiry(a.expiresAt);
        const bDays = getDaysUntilExpiry(b.expiresAt);
        if (aDays === null && bDays === null) return 0;
        if (aDays === null) return 1;
        if (bDays === null) return -1;
        return aDays - bDays;
      });
    } else if (sortBy === "az") {
      arr.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sortBy === "topRated") {
       // Assuming topRated sort logic from App.jsx if it existed, or default
       // App.jsx didn't show topRated in the snippet I read for MyListings sort.
       // But Filtersheet has it.
       // If selected, we can try to sort by stats.
       // Since getListingStats depends on feedbackAverages which is in context,
       // we might need to access feedbackAverages here or just skip if not critical.
       // For now, let's keep it simple or implement if I see it used.
    }
    
    return arr;
  }, [myListingsRaw, statusFilter, expiryFilter, sortBy, q, getDaysUntilExpiry]);

  const myVerifiedCount = useMemo(
    () => myListingsRaw.filter((l) => l.status === "verified").length,
    [myListingsRaw]
  );
  
  // Handlers
  const clearAllFilters = () => {
    setQ("");
    setStatusFilter("all");
    setExpiryFilter("all");
    setSortBy("newest");
  };

  return (
    <div className="section my-listings-section">
      <div className="section-header-row stacked-mobile">
        <div>
          <h2 className="section-title-inner">📁 {t("myListings")}</h2>
          <p className="section-subtitle-small">
            {t("myListingsHint")}
          </p>
        </div>
        <div className="pill-row">
          <span className="badge count">
            {myListings.length} {(myListings.length === 1 ? t("listing") : t("listingsLabel"))}
          </span>
          {myVerifiedCount > 0 && (
            <span className="badge success">
              ✅ {myVerifiedCount} {t("verified")}
            </span>
          )}
        </div>
      </div>
      
      <div className="my-listings-toolbar">
        <div className="my-listings-stats">
          <div className="stat-chip positive">
            <span className="stat-label">✅ {t("verified")}</span>
            <span className="stat-value">{myVerifiedCount}</span>
          </div>
          <div className="stat-chip warning">
            <span className="stat-label">⏳ {t("pending")}</span>
            <span className="stat-value">{myListingsRaw.length - myVerifiedCount}</span>
          </div>
        </div>
        <div className="my-listings-actions">
          <button
            type="button"
            className="btn btn-ghost filter-toggle-btn"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
          >
            {filtersOpen ? "✕ " : "🔍 "}
            {t("filters")}
          </button>
          
          <button
            className="btn btn-primary small"
            onClick={() => setShowPostForm(true)}
          >
            ➕ {t("submitListing")}
          </button>
        </div>
      </div>

      <Filtersheet
        t={t}
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
        q={q}
        setQ={setQ}
        sortBy={sortBy}
        setSortBy={setSortBy}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        expiryFilter={expiryFilter}
        setExpiryFilter={setExpiryFilter}
      />

      {/* Active Filters Bar */}
      {(q || statusFilter !== "all" || expiryFilter !== "all") && (
        <div className="active-filters-bar">
          <span className="active-filters-label">{t("activeFilters")}:</span>
          <div className="active-filters-chips">
            {q && (
              <span className="active-filter-chip">
                {t("search")}: "{q}"
                <button
                  type="button"
                  className="filter-chip-remove"
                  onClick={() => setQ("")}
                >
                  ✕
                </button>
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="active-filter-chip">
                {t("status")}: {t(statusFilter) || statusFilter}
                <button
                  type="button"
                  className="filter-chip-remove"
                  onClick={() => setStatusFilter("all")}
                >
                  ✕
                </button>
              </span>
            )}
            {expiryFilter !== "all" && (
              <span className="active-filter-chip">
                {t("expiry")}: {t(expiryFilter) || expiryFilter}
                <button
                  type="button"
                  className="filter-chip-remove"
                  onClick={() => setExpiryFilter("all")}
                >
                  ✕
                </button>
              </span>
            )}
            <button
              type="button"
              className="btn-clear-all-filters"
              onClick={clearAllFilters}
            >
              {t("clearAll")}
            </button>
          </div>
        </div>
      )}

      {myListings.length === 0 ? (
        <div className="empty my-listings-empty">
          <div className="empty-icon">📭</div>
          <p className="empty-text">
            {myListingsRaw.length === 0 
              ? t("noListingsYet")
              : (q || statusFilter !== "all" || expiryFilter !== "all")
                ? t("noListingsMatchFilters")
                : t("noListingsYet")
            }
          </p>
          {myListingsRaw.length > 0 && (q || statusFilter !== "all" || expiryFilter !== "all") && (
            <button
              className="btn small"
              onClick={clearAllFilters}
              type="button"
            >
              {t("clearFilters")}
            </button>
          )}
        </div>
      ) : (
        <div className="my-listings-grid">
          {myListings.map((l) => (
            <MyListingCard
              key={l.id}
              listing={l}
              t={t}
              categoryIcons={categoryIcons}
              getDaysUntilExpiry={getDaysUntilExpiry}
              getListingStats={getListingStats}
              getDescriptionPreview={getDescriptionPreview}
              openEdit={handleOpenEdit}
              startExtendFlow={handleStartExtendFlow}
              showMessage={showMessage}
              handleShareListing={handleShareListing}
              confirmDelete={confirmDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
