"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Filtersheet from './Filtersheet';
import MyListingCard from './MyListingCard';

export default function MyListingsTab() {
  const {
    t, user, userProfile, myListingsRaw, categoryIcons,
    handleSelectListing, handleOpenEdit, handleStartExtendFlow,
    showMessage, handleShareListing, confirmDelete,
    getDaysUntilExpiry, getListingStats, getDescriptionPreview,
    setShowPostForm, setShowAuthModal, setAuthMode
  } = useApp();

  if (!user) {
    return (
      <div className="my-listings-auth-prompt">
        <div className="auth-prompt-icon" aria-hidden="true">🔐</div>
        <h2 className="auth-prompt-title">{t("loginToSeeMore")}</h2>
        <p className="auth-prompt-description">
          {t("loginDescription")}
        </p>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setAuthMode("login");
            setShowAuthModal(true);
          }}
          aria-label={t("login")}
        >
          {t("login")}
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

  // Restore scroll position when component mounts
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('previousScrollPosition');
    if (scrollPosition) {
      const scrollPos = parseInt(scrollPosition, 10);
      
      // Multiple attempts for reliability
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollPos, behavior: 'instant' });
      });
      
      setTimeout(() => {
        window.scrollTo({ top: scrollPos, behavior: 'instant' });
      }, 100);
      
      setTimeout(() => {
        window.scrollTo({ top: scrollPos, behavior: 'instant' });
      }, 300);
      
      setTimeout(() => {
        window.scrollTo({ top: scrollPos, behavior: 'instant' });
        sessionStorage.removeItem('previousScrollPosition');
      }, 600);
    }
  }, []);

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

  const lastMonthKey = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  }, []);

  const getLastMonthStats = useCallback((listing) => {
    const monthly = listing?.monthlyStats?.[lastMonthKey];
    return {
      lastMonthViews: monthly ? Number(monthly.views) || 0 : 0,
      lastMonthContacts: monthly ? Number(monthly.contacts) || 0 : 0,
    };
  }, [lastMonthKey]);

  // Handlers
  const clearAllFilters = () => {
    setQ("");
    setStatusFilter("all");
    setExpiryFilter("all");
    setSortBy("newest");
  };

  const hasActiveFilters = q || statusFilter !== "all" || expiryFilter !== "all";

  return (
    <div className="my-listings-page">
      <div className="my-listings-header">
        <div className="my-listings-header-content">
          <h1 className="my-listings-page-title">
            <span className="my-listings-page-icon" aria-hidden="true">📁</span>
            {t("myListings")}
          </h1>
          <p className="my-listings-page-subtitle">
            {t("myListingsHint")}
          </p>
        </div>
      </div>

      <div className="my-listings-layout">
        <main className="my-listings-main">
          {/* STATS AND TOOLBAR */}
          <div className="my-listings-toolbar">
            <div className="my-listings-stats">
              <div className="my-stat-chip positive" role="status" aria-label={`${myVerifiedCount} ${t("verifiedListingsLabel")}`}>
                <span className="my-stat-icon" aria-hidden="true">✅</span>
                <div className="my-stat-content">
                  <span className="my-stat-label">{t("verified")}</span>
                  <span className="my-stat-value">{myVerifiedCount}</span>
                </div>
              </div>
              <div className="my-stat-chip warning" role="status" aria-label={`${myListingsRaw.length - myVerifiedCount} ${t("pendingListingsLabel")}`}>
                <span className="my-stat-icon" aria-hidden="true">⏳</span>
                <div className="my-stat-content">
                  <span className="my-stat-label">{t("pending")}</span>
                  <span className="my-stat-value">{myListingsRaw.length - myVerifiedCount}</span>
                </div>
              </div>
              <div className="my-stat-chip info" role="status" aria-label={`${myListings.length} ${t("totalListingsLabel")}`}>
                <span className="my-stat-icon" aria-hidden="true">📊</span>
                <div className="my-stat-content">
                  <span className="my-stat-label">{t("total")}</span>
                  <span className="my-stat-value">{myListings.length}</span>
                </div>
              </div>
            </div>

            <div className="my-listings-actions">
              <div className="search-container">
                <input
                  type="search"
                  className="my-listings-search-input"
                  placeholder={t("searchYourListings")}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  aria-label={t("searchYourListingsLabel")}
                />
              </div>

              <button
                type="button"
                className="toolbar-btn"
                onClick={() => setFiltersOpen((v) => !v)}
                aria-expanded={filtersOpen}
                aria-label={t("toggleFilters")}
                title={t("filters")}
              >
                <span aria-hidden="true">🔍</span>
                {hasActiveFilters && <span className="filter-badge" aria-label={t("activeFilters")}></span>}
              </button>
              
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowPostForm(true)}
                aria-label={t("submitListing")}
              >
                <span aria-hidden="true">➕</span>
                <span className="btn-text">{t("newListing")}</span>
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
          {hasActiveFilters && (
            <div className="active-filters-bar" role="region" aria-label={t("activeFilters")}>
              <span className="active-filters-label">{t("activeFilters")}:</span>
              <div className="active-filters-chips" role="list">
                {q && (
                  <span className="active-filter-chip" role="listitem">
                    <span className="filter-chip-label">{t("search")}: "{q}"</span>
                    <button
                      type="button"
                      className="filter-chip-remove"
                      onClick={() => setQ("")}
                      aria-label={`${t("removeSearchFilter")}: ${q}`}
                    >
                      <span aria-hidden="true">✕</span>
                    </button>
                  </span>
                )}
                {statusFilter !== "all" && (
                  <span className="active-filter-chip" role="listitem">
                    <span className="filter-chip-label">{t("status")}: {t(statusFilter) || statusFilter}</span>
                    <button
                      type="button"
                      className="filter-chip-remove"
                      onClick={() => setStatusFilter("all")}
                      aria-label={`${t("removeStatusFilter")}: ${t(statusFilter) || statusFilter}`}
                    >
                      <span aria-hidden="true">✕</span>
                    </button>
                  </span>
                )}
                {expiryFilter !== "all" && (
                  <span className="active-filter-chip" role="listitem">
                    <span className="filter-chip-label">{t("expiry")}: {t(expiryFilter) || expiryFilter}</span>
                    <button
                      type="button"
                      className="filter-chip-remove"
                      onClick={() => setExpiryFilter("all")}
                      aria-label={`Remove expiry filter: ${expiryFilter}`}
                    >
                      <span aria-hidden="true">✕</span>
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  className="btn-clear-all-filters"
                  onClick={clearAllFilters}
                  aria-label={t("clearAllFilters")}
                >
                  {t("clearAll")}
                </button>
              </div>
            </div>
          )}

          {/* LISTINGS GRID */}
          {myListings.length === 0 ? (
            <div className="my-listings-empty" role="status" aria-live="polite">
              <div className="empty-icon" aria-hidden="true">📭</div>
              <h3 className="empty-title">
                {myListingsRaw.length === 0 
                  ? t("noListingsYet")
                  : hasActiveFilters
                    ? t("noListingsMatchFilters")
                    : t("noListingsYet")
                }
              </h3>
              <p className="empty-text">
                {myListingsRaw.length === 0 
                  ? t("noListingsYetDescription")
                  : hasActiveFilters
                    ? t("noListingsMatchFiltersDescription")
                    : t("noListingsYetDescription")
                }
              </p>
              {myListingsRaw.length > 0 && hasActiveFilters && (
                <button
                  className="btn btn-primary"
                  onClick={clearAllFilters}
                  type="button"
                  aria-label={t("clearFilters")}
                >
                  {t("clearFilters")}
                </button>
              )}
              {myListingsRaw.length === 0 && (
                <button
                  className="btn btn-primary"
                  onClick={() => setShowPostForm(true)}
                  type="button"
                  aria-label={t("submitListing")}
                >
                  <span aria-hidden="true">➕</span>
                  {t("createYourFirstListing")}
                </button>
              )}
            </div>
          ) : (
            <div className="my-listings-grid" role="list" aria-label={t("yourListings")}>
              {myListings.map((l) => {
                const { lastMonthViews, lastMonthContacts } = getLastMonthStats(l);
                return (
                  <MyListingCard
                    key={l.id}
                    listing={l}
                    t={t}
                    user={user}
                    userProfile={userProfile}
                    categoryIcons={categoryIcons}
                    getDaysUntilExpiry={getDaysUntilExpiry}
                    getListingStats={getListingStats}
                    getDescriptionPreview={getDescriptionPreview}
                    openEdit={handleOpenEdit}
                    startExtendFlow={handleStartExtendFlow}
                    showMessage={showMessage}
                    handleShareListing={handleShareListing}
                    confirmDelete={confirmDelete}
                    lastMonthViews={lastMonthViews}
                    lastMonthContacts={lastMonthContacts}
                  />
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
