import React, { useState, useMemo } from 'react';
import { categoryIcons } from '../utils/constants';
import { getDescriptionPreview, getDaysUntilExpiry, buildLocationString } from '../utils/helpers';

const MyListingsPage = ({ 
  t, 
  user, 
  listings, 
  feedbackAverages, 
  favorites,
  onEdit,
  onDelete,
  onExtend,
  onView,
  showMessage,
  setSelectedTab 
}) => {
  const [myListingsStatusFilter, setMyListingsStatusFilter] = useState("all");
  const [myListingsExpiryFilter, setMyListingsExpiryFilter] = useState("all");
  const [myListingsSort, setMyListingsSort] = useState("newest");
  const [myListingsSearch, setMyListingsSearch] = useState("");

  const myListingsRaw = useMemo(
    () => listings.filter((l) => l.userId === user?.uid),
    [listings, user]
  );

  const getListingStats = (listing) => {
    const stats = feedbackAverages[listing.id] || {};
    const feedbackCount = listing.feedbackCount ?? stats.count ?? 0;
    const avgRating = listing.avgRating ?? stats.avg ?? 0;
    const engagement = feedbackCount + (favorites.includes(listing.id) ? 1 : 0);
    return { feedbackCount, avgRating, engagement };
  };

  const myListings = useMemo(() => {
    let filtered = [...myListingsRaw];

    // Status filter
    if (myListingsStatusFilter === "verified") {
      filtered = filtered.filter((l) => l.status === "verified");
    } else if (myListingsStatusFilter === "pending") {
      filtered = filtered.filter((l) => l.status !== "verified");
    }

    // Expiry filter
    if (myListingsExpiryFilter === "expiring") {
      filtered = filtered.filter((l) => {
        const days = getDaysUntilExpiry(l.expiresAt);
        return days !== null && days > 0 && days <= 7;
      });
    } else if (myListingsExpiryFilter === "expired") {
      filtered = filtered.filter((l) => {
        const days = getDaysUntilExpiry(l.expiresAt);
        return days !== null && days <= 0;
      });
    } else if (myListingsExpiryFilter === "active") {
      filtered = filtered.filter((l) => {
        const days = getDaysUntilExpiry(l.expiresAt);
        return days === null || days > 7;
      });
    }

    // Search filter
    if (myListingsSearch.trim()) {
      const term = myListingsSearch.trim().toLowerCase();
      filtered = filtered.filter(
        (l) =>
          (l.name || "").toLowerCase().includes(term) ||
          (l.description || "").toLowerCase().includes(term) ||
          (l.location || "").toLowerCase().includes(term) ||
          (l.category || "").toLowerCase().includes(term)
      );
    }

    // Sort
    if (myListingsSort === "newest") {
      filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } else if (myListingsSort === "oldest") {
      filtered.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    } else if (myListingsSort === "expiring") {
      filtered.sort((a, b) => {
        const aDays = getDaysUntilExpiry(a.expiresAt);
        const bDays = getDaysUntilExpiry(b.expiresAt);
        if (aDays === null && bDays === null) return 0;
        if (aDays === null) return 1;
        if (bDays === null) return -1;
        return aDays - bDays;
      });
    } else if (myListingsSort === "az") {
      filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    return filtered;
  }, [myListingsRaw, myListingsStatusFilter, myListingsExpiryFilter, myListingsSort, myListingsSearch]);

  const myVerifiedCount = useMemo(
    () => myListingsRaw.filter((l) => l.status === "verified").length,
    [myListingsRaw]
  );

  const myPendingCount = useMemo(
    () => myListingsRaw.filter((l) => l.status !== "verified").length,
    [myListingsRaw]
  );

  const expiringSoonCount = useMemo(() => {
    return myListingsRaw.filter(l => {
      const days = getDaysUntilExpiry(l.expiresAt);
      return days !== null && days > 0 && days <= 7;
    }).length;
  }, [myListingsRaw]);

  const totalReviews = useMemo(() => {
    return myListingsRaw.reduce((sum, l) => {
      const stats = getListingStats(l);
      return sum + (stats.feedbackCount || 0);
    }, 0);
  }, [myListingsRaw, feedbackAverages, favorites]);

  return (
    <div className="dashboard">
      <main className="dashboard-content">
        <div className="panel">
          <div className="dashboard-topbar">
            <div className="dashboard-meta">
              <p className="eyebrow subtle">{t("dashboard")}</p>
              <h2 className="dashboard-heading">{t("manageListings") || "Manage everything in one place"}</h2>
            </div>
            <div className="topbar-tabs">
              <span className="pill current-view">{t("myListings")}</span>
              <button
                className="btn btn-ghost small"
                type="button"
                onClick={() => setSelectedTab("allListings")}
              >
                🌍 {t("explore") || "Explore"}
              </button>
            </div>
          </div>

          <div className="tab-panel unified-panel">
            <div className="section my-listings-section">
              <div className="section-header-row stacked-mobile">
                <div>
                  <h2 className="section-title-inner">📁 {t("myListings")}</h2>
                  <p className="section-subtitle-small">
                    {t("myListingsHint") || "Review, edit and extend your listings in one place."}
                  </p>
                </div>
                <div className="pill-row">
                  <span className="badge count">
                    {myListings.length} {myListings.length === 1 ? t("listing") || "listing" : t("listingsLabel") || "listings"}
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
                  {myPendingCount > 0 && (
                    <div className="stat-chip subtle">
                      <span className="stat-label">⏳ {t("pending")}</span>
                      <span className="stat-value">{myPendingCount}</span>
                    </div>
                  )}
                  {expiringSoonCount > 0 && (
                    <div className="stat-chip warning">
                      <span className="stat-label">⚠️ {t("expiringSoon") || "Expiring soon"}</span>
                      <span className="stat-value">{expiringSoonCount}</span>
                    </div>
                  )}
                  {totalReviews > 0 && (
                    <div className="stat-chip info">
                      <span className="stat-label">💬 {t("reviews") || "Reviews"}</span>
                      <span className="stat-value">{totalReviews}</span>
                    </div>
                  )}
                </div>
                <div className="my-listings-actions">
                  <button
                    className="btn btn-ghost small"
                    onClick={() => setSelectedTab("allListings")}
                    type="button"
                  >
                    🔍 {t("explore") || "Browse listings"}
                  </button>
                  <button
                    className="btn small"
                    onClick={() => setSelectedTab("myListings")}
                    type="button"
                  >
                    ➕ {t("submitListing") || "Create listing"}
                  </button>
                </div>
              </div>

              {myListingsRaw.length > 0 && (
                <div className="my-listings-filters-bar">
                  <div className="my-listings-filters-left">
                    <input
                      type="search"
                      className="input my-listings-search-input"
                      placeholder={t("searchPlaceholder") || "Search your listings..."}
                      value={myListingsSearch}
                      onChange={(e) => setMyListingsSearch(e.target.value)}
                    />
                    <select
                      className="select my-listings-filter-select"
                      value={myListingsStatusFilter}
                      onChange={(e) => setMyListingsStatusFilter(e.target.value)}
                    >
                      <option value="all">{t("allStatuses") || "All statuses"}</option>
                      <option value="verified">{t("verified")}</option>
                      <option value="pending">{t("pending")}</option>
                    </select>
                    <select
                      className="select my-listings-filter-select"
                      value={myListingsExpiryFilter}
                      onChange={(e) => setMyListingsExpiryFilter(e.target.value)}
                    >
                      <option value="all">{t("allExpiry") || "All"}</option>
                      <option value="expiring">{t("expiringSoon") || "Expiring soon"}</option>
                      <option value="active">{t("active") || "Active"}</option>
                      <option value="expired">{t("expired") || "Expired"}</option>
                    </select>
                  </div>
                  <div className="my-listings-filters-right">
                    <select
                      className="select my-listings-sort-select"
                      value={myListingsSort}
                      onChange={(e) => setMyListingsSort(e.target.value)}
                    >
                      <option value="newest">{t("sortNewest")}</option>
                      <option value="oldest">{t("sortOldest") || "Oldest first"}</option>
                      <option value="expiring">{t("sortExpiring")}</option>
                      <option value="az">{t("sortAZ")}</option>
                    </select>
                    {(myListingsSearch || myListingsStatusFilter !== "all" || myListingsExpiryFilter !== "all") && (
                      <button
                        className="btn btn-ghost small"
                        onClick={() => {
                          setMyListingsSearch("");
                          setMyListingsStatusFilter("all");
                          setMyListingsExpiryFilter("all");
                        }}
                        type="button"
                      >
                        {t("clearAll") || "Clear all"}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {myListings.length === 0 ? (
                <div className="empty my-listings-empty">
                  <div className="empty-icon">📭</div>
                  <p className="empty-text">
                    {myListingsRaw.length === 0
                      ? t("noListingsYet")
                      : (myListingsSearch || myListingsStatusFilter !== "all" || myListingsExpiryFilter !== "all")
                      ? t("noListingsMatchFilters") || "No listings match your filters."
                      : t("noListingsYet")}
                  </p>
                </div>
              ) : (
                <div className="listing-grid my-listings-grid responsive-grid">
                  {myListings.map((l) => {
                    const stats = getListingStats(l);
                    const days = getDaysUntilExpiry(l.expiresAt);
                    const isExpiringSoon = days !== null && days > 0 && days <= 7;
                    const isExpired = days !== null && days <= 0;

                    return (
                      <article key={l.id} className="listing-card my-listing-card elevated">
                        <header className="listing-header my-listing-header rich-header">
                          <div className="listing-icon-bubble">{categoryIcons[l.category] || "🏷️"}</div>
                          <div className="listing-header-main">
                            <div className="listing-title-row spaced">
                              <h3 className="listing-title">{l.name}</h3>
                              <span className={`status-chip ${l.status === "verified" ? "status-chip-verified" : "status-chip-pending"}`}>
                                {l.status === "verified" ? `✅ ${t("verified")}` : `⏳ ${t("pending")}`}
                              </span>
                            </div>
                            <div className="listing-meta-row pill-row-tight">
                              <span className="pill pill-category">
                                {categoryIcons[l.category] || "🏷️"} {t(l.category) || l.category}
                              </span>
                              {l.location && (
                                <span className="pill pill-location">📍 {l.location}</span>
                              )}
                              {l.createdAt && (
                                <span className="pill pill-soft pill-date">
                                  📅 {new Date(l.createdAt).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            <div className={`listing-expiry-info ${isExpiringSoon ? "expiring-soon" : ""} ${isExpired ? "expired" : ""}`}>
                              {l.expiresAt ? (
                                <>
                                  <span className="expiry-label">{t("expires")}:</span>
                                  <span className="expiry-date">{new Date(l.expiresAt).toLocaleDateString()}</span>
                                  {days !== null && (
                                    <span className={`expiry-days ${isExpiringSoon ? "warning" : ""} ${isExpired ? "expired-text" : ""}`}>
                                      {isExpired
                                        ? ` ⚠️ ${t("expired") || "Expired"}`
                                        : isExpiringSoon
                                        ? ` ⏰ ${days} ${days === 1 ? t("day") || "day" : t("days") || "days"} ${t("remaining") || "left"}`
                                        : ` (${days} ${days === 1 ? t("day") || "day" : t("days") || "days"})`}
                                    </span>
                                  )}
                                </>
                              ) : (
                                <span className="expiry-date">{t("noExpiry") || "No expiration"}</span>
                              )}
                            </div>
                          </div>
                          <div className="listing-score-pill">
                            <span className="score-main">⭐ {Number(stats.avgRating || 0).toFixed(1)}</span>
                            <span className="score-sub">{stats.feedbackCount} {t("reviews") || "reviews"}</span>
                          </div>
                        </header>

                        <div className="listing-card-body-enhanced">
                          <p className="listing-description clamp-3 enhanced-copy">
                            {getDescriptionPreview(l.description, 120)}
                          </p>

                          <div className="listing-stats ribboned">
                            <span className="stat-chip rating">⭐ {Number(stats.avgRating || 0).toFixed(1)}</span>
                            <span className="stat-chip">💬 {stats.feedbackCount}</span>
                            <span className="stat-chip subtle">🔥 {stats.engagement}</span>
                            {l.offerprice && (
                              <span className="pill pill-price subtle-pill">💶 {l.offerprice}</span>
                            )}
                          </div>

                          {(l.tags || l.contact) && (
                            <div className="my-listing-highlights rich-highlights">
                              {l.tags && (
                                <span className="pill pill-tags">🏷️ {l.tags.split(",")[0]?.trim() || l.tags}</span>
                              )}
                              {l.contact && (
                                <span className="pill pill-contact">📞 {l.contact}</span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="my-listing-footer framed-footer">
                          <div className="listing-actions-primary">
                            <button className="btn btn-primary small" onClick={() => onView?.(l)}>
                              👁️ {t("view") || "View"}
                            </button>
                            <button className="btn small" onClick={() => onEdit?.(l)}>
                              ✏️ {t("edit")}
                            </button>
                            <button className="btn small btn-extend" onClick={() => onExtend?.(l)}>
                              ⏰ {t("extend")}
                            </button>
                          </div>
                          <div className="listing-actions-secondary">
                            <button
                              className="btn btn-ghost small icon-only"
                              onClick={() => window.open(`tel:${l.contact}`)}
                              title={t("call")}
                            >
                              📞
                            </button>
                            <button
                              className="btn btn-ghost small icon-only"
                              onClick={() =>
                                window.open(
                                  `mailto:${l.userEmail || ""}?subject=Regarding%20${encodeURIComponent(l.name || "")}`
                                )
                              }
                              title={t("emailAction")}
                            >
                              ✉️
                            </button>
                            <button
                              className="btn btn-ghost small icon-only"
                              onClick={() => {
                                navigator.clipboard?.writeText(l.contact || "");
                                showMessage(t("copied"), "success");
                              }}
                              title={t("copy")}
                            >
                              📋
                            </button>
                            <button
                              className="btn btn-ghost small icon-only btn-delete"
                              onClick={() => onDelete?.(l.id)}
                              title={t("del")}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyListingsPage;
