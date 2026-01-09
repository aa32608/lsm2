import React, { useState, useMemo } from 'react';
import { categories, categoryIcons } from '../utils/constants';
import { getDescriptionPreview } from '../utils/helpers';
import FilterSheet from '../components/FilterSheet';

const ExplorePage = ({ 
  t, 
  listings, 
  feedbackAverages,
  favorites,
  setFavorites,
  onSelectListing,
  showMessage 
}) => {
  const [q, setQ] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [locFilter, setLocFilter] = useState("");
  const [sortBy, setSortBy] = useState("topRated");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [viewMode, setViewMode] = useState("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allLocations = useMemo(
    () => Array.from(new Set(listings.map((l) => (l.location || "").trim()).filter(Boolean))),
    [listings]
  );

  const getListingStats = (listing) => {
    const stats = feedbackAverages[listing.id] || {};
    const feedbackCount = listing.feedbackCount ?? stats.count ?? 0;
    const avgRating = listing.avgRating ?? stats.avg ?? 0;
    const engagement = feedbackCount + (favorites.includes(listing.id) ? 1 : 0);
    return { feedbackCount, avgRating, engagement };
  };

  const filtered = useMemo(() => {
    let arr = [...listings];
    
    if (q.trim()) {
      const term = q.trim().toLowerCase();
      arr = arr.filter(
        (l) =>
          (l.name || "").toLowerCase().includes(term) ||
          (l.description || "").toLowerCase().includes(term)
      );
    }
    if (catFilter) arr = arr.filter((l) => (t(l.category) || l.category) === catFilter);
    if (locFilter) arr = arr.filter((l) => l.location === locFilter);
    
    if (sortBy === "topRated") {
      arr.sort((a, b) => {
        const aStats = feedbackAverages[a.id] || {};
        const bStats = feedbackAverages[b.id] || {};
        const bAvg = bStats.avg ?? -1;
        const aAvg = aStats.avg ?? -1;
        if (bAvg !== aAvg) return bAvg - aAvg;
        const bCount = bStats.count || 0;
        const aCount = aStats.count || 0;
        if (bCount !== aCount) return bCount - aCount;
        return (b.createdAt || 0) - (a.createdAt || 0);
      });
    }
    if (sortBy === "newest") arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    if (sortBy === "expiring") arr.sort((a, b) => (a.expiresAt || 0) - (b.expiresAt || 0));
    if (sortBy === "az") arr.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    
    return arr;
  }, [listings, q, catFilter, locFilter, sortBy, feedbackAverages, t]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / pageSize)),
    [filtered.length, pageSize]
  );

  const pagedFiltered = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const toggleFav = (id) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleShareListing = (listing) => {
    const url = `${window.location.origin}?listing=${encodeURIComponent(listing.id)}`;
    const text = `${listing.name || ""} • ${listing.location || ""} – ${t("shareText")}`;

    if (navigator.share) {
      navigator.share({ title: listing.name || t("appName"), text, url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showMessage(t("shareCopied") || "Link copied to clipboard ✅", "success");
    } else {
      showMessage(t("shareNotSupported") || "Share not supported on this device.", "error");
    }
  };

  return (
    <div className="dashboard">
      <main className="dashboard-content">
        <div className="panel">
          <div className="section explore-section-new">
            <div className="explore-top-bar">
              <div className="explore-header-content">
                <h2 className="explore-page-title">🔍 {t("explore")}</h2>
                <p className="explore-page-subtitle">
                  {filtered.length === 0
                    ? t("noListingsFound")
                    : `${filtered.length} ${filtered.length === 1 ? t("listing") : t("listingsLabel")} ${
                        t("resultsLabel") || "available"
                      } • Page ${page} of ${totalPages}`}
                </p>
              </div>
              <div className="explore-top-actions">
                <button
                  type="button"
                  className="btn btn-ghost view-toggle-btn"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  title={viewMode === "grid" ? t("switchToListView") : t("switchToGridView")}
                >
                  {viewMode === "grid" ? "☰" : "⊞"}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost filter-toggle-btn-desktop"
                  onClick={() => setFiltersOpen((v) => !v)}
                  aria-expanded={filtersOpen}
                >
                  {filtersOpen ? "✕ " : "🔍 "}
                  {t("filters")}
                </button>
              </div>
            </div>

            {(q || catFilter || locFilter) && (
              <div className="active-filters-bar">
                <span className="active-filters-label">{t("activeFilters")}:</span>
                <div className="active-filters-chips">
                  {q && (
                    <span className="active-filter-chip">
                      {t("search")}: "{q}"
                      <button type="button" className="filter-chip-remove" onClick={() => setQ("")}>
                        ✕
                      </button>
                    </span>
                  )}
                  {catFilter && (
                    <span className="active-filter-chip">
                      {t("category")}: {catFilter}
                      <button type="button" className="filter-chip-remove" onClick={() => setCatFilter("")}>
                        ✕
                      </button>
                    </span>
                  )}
                  {locFilter && (
                    <span className="active-filter-chip">
                      {t("location")}: {locFilter}
                      <button type="button" className="filter-chip-remove" onClick={() => setLocFilter("")}>
                        ✕
                      </button>
                    </span>
                  )}
                  <button
                    type="button"
                    className="btn-clear-all-filters"
                    onClick={() => {
                      setQ("");
                      setCatFilter("");
                      setLocFilter("");
                      setSortBy("topRated");
                    }}
                  >
                    {t("clearAll")}
                  </button>
                </div>
              </div>
            )}

            <div className="explore-mobile-toolbar">
              <button
                type="button"
                className="btn btn-ghost filter-toggle-btn"
                onClick={() => setFiltersOpen((v) => !v)}
                aria-expanded={filtersOpen}
              >
                {filtersOpen ? "✕ " : "🔍 "}
                {filtersOpen ? t("hideFilters") : t("showFilters")}
              </button>
              <select className="select sort-select-mobile" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="topRated">{t("sortTopRated")}</option>
                <option value="newest">{t("sortNewest")}</option>
                <option value="expiring">{t("sortExpiring")}</option>
                <option value="az">{t("sortAZ")}</option>
              </select>
              <button
                type="button"
                className="btn btn-ghost view-toggle-btn"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              >
                {viewMode === "grid" ? "☰" : "⊞"}
              </button>
            </div>

            <div className={`explore-body-new ${filtersOpen ? "filters-open" : "filters-collapsed"}`}>
              <FilterSheet
                isOpen={filtersOpen}
                onClose={() => setFiltersOpen(false)}
                catFilter={catFilter}
                setCatFilter={setCatFilter}
                locFilter={locFilter}
                setLocFilter={setLocFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                categories={categories}
                mkCities={allLocations}
                t={t}
                verifiedListings={listings}
                q={q}
              />

              <div className="explore-results-area">
                {filtered.length > 0 ? (
                  <div className="results-stack">
                    <div className={`listing-grid-${viewMode}`}>
                      {pagedFiltered.map((l) => {
                        const stats = getListingStats(l);
                        return (
                          <article
                            key={l.id}
                            className="listing-card explore-card-modern"
                            onClick={() => onSelectListing?.(l)}
                          >
                            <header className="listing-header listing-header-dense">
                              <div className="listing-title-wrap">
                                <div className="listing-title-row">
                                  <span className="listing-icon-bubble">{categoryIcons[l.category] || "🏷️"}</span>
                                  <div>
                                    <h3 className="listing-title">{l.name}</h3>
                                    <div className="listing-meta pill-row-tight">
                                      <span className="pill pill-category">{t(l.category) || l.category}</span>
                                      <span className="pill pill-location">📍 {l.location}</span>
                                      {l.expiresAt && (
                                        <span className="pill pill-ghost subtle-pill">
                                          ⏱️ {new Date(l.expiresAt).toLocaleDateString()}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="listing-badges dense-badges">
                                {l.offerprice && <span className="pill pill-price">{l.offerprice}</span>}
                                <span className="badge verified">✓ {t("verified")}</span>
                              </div>
                            </header>

                            <div className="listing-card-body">
                              <p className="listing-description listing-description-clamp listing-description-preview">
                                {getDescriptionPreview(l.description, 180)}
                              </p>

                              <div className="listing-stats spaced">
                                <span className="stat-chip rating">⭐ {Number(stats.avgRating || 0).toFixed(1)}</span>
                                <span className="stat-chip">💬 {stats.feedbackCount}</span>
                                <span className="stat-chip subtle">🔥 {stats.engagement}</span>
                                {l.tags && (
                                  <span className="pill pill-tags">
                                    {l.tags.split(",")[0]?.trim()}
                                    {l.tags.split(",").length > 1 ? " +" : ""}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="listing-footer-row" onClick={(e) => e.stopPropagation()}>
                              <div className="listing-footer-left">
                                {l.contact && <span className="pill pill-contact ghost-pill">📞 {l.contact}</span>}
                                {l.socialLink && <span className="pill pill-ghost subtle-pill">🔗 {t("websiteLabel")}</span>}
                              </div>

                              <div className="listing-actions compact">
                                <button className="icon-btn" type="button" onClick={() => window.open(`tel:${l.contact}`)}>
                                  📞
                                </button>
                                <button
                                  className="icon-btn"
                                  type="button"
                                  onClick={() =>
                                    window.open(`mailto:${l.userEmail || ""}?subject=Regarding%20${encodeURIComponent(l.name || "")}`)
                                  }
                                >
                                  ✉️
                                </button>
                                <button
                                  className="icon-btn"
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard?.writeText(l.contact || "");
                                    showMessage(t("copied"), "success");
                                  }}
                                >
                                  📋
                                </button>
                                <button className="icon-btn" type="button" onClick={() => handleShareListing(l)}>
                                  🔗
                                </button>
                                <button className="icon-btn" type="button" onClick={() => toggleFav(l.id)}>
                                  {favorites.includes(l.id) ? "★" : "☆"}
                                </button>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                    
                    <div className="pager">
                      <div className="pager-left">
                        <button className="btn btn-ghost small" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                          ←
                        </button>
                        <span className="small-muted">
                          Page {page} of {totalPages}
                        </span>
                        <button className="btn btn-ghost small" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                          →
                        </button>
                      </div>
                      <div className="pager-right">
                        <span className="small-muted">{t("resultsPerPage") || "Per page"}</span>
                        <div className="filter-select-wrapper">
                          <select className="filter-select-field" value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value, 10))}>
                            <option value="6">6</option>
                            <option value="12">12</option>
                            <option value="24">24</option>
                          </select>
                          <svg className="filter-select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="explore-empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <h3 className="empty-state-title">{t("noListingsFound")}</h3>
                    <p className="empty-state-text">
                      {q || catFilter || locFilter ? t("tryDifferentFilters") : t("noListingsAvailable")}
                    </p>
                    {(q || catFilter || locFilter) && (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setQ("");
                          setCatFilter("");
                          setLocFilter("");
                        }}
                      >
                        {t("clearFilters")}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;
