"use client";
import React, { useState, useEffect } from "react";

const Filtersheet = React.memo(({
  t,
  filtersOpen,
  setFiltersOpen,
  q,
  setQ,
  catFilter,
  setCatFilter,
  locFilter,
  setLocFilter,
  sortBy,
  setSortBy,
  categories,
  categoryGroups,
  categoryIcons,
  allLocations,
  setPage, // Add setPage to reset page when filters change
  // Optional filters for My Listings
  statusFilter,
  setStatusFilter,
  expiryFilter,
  setExpiryFilter,
  // Enhanced filters
  priceRange,
  setPriceRange,
  searchRadius,
  setSearchRadius,
  businessStatus,
  setBusinessStatus,
}) => {
  // Local states for debouncing
  const [localSearch, setLocalSearch] = useState(q);
  const [localCat, setLocalCat] = useState(catFilter);
  const [localLoc, setLocalLoc] = useState(locFilter);
  const [localSort, setLocalSort] = useState(sortBy);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange || { min: '', max: '' });
  const [localSearchRadius, setLocalSearchRadius] = useState(searchRadius || '');
  const [localBusinessStatus, setLocalBusinessStatus] = useState(businessStatus || 'all');

  // Sync local state when props change (e.g. from outside reset)
  useEffect(() => { setLocalSearch(q); }, [q]);
  useEffect(() => { setLocalCat(catFilter); }, [catFilter]);
  useEffect(() => { setLocalLoc(locFilter); }, [locFilter]);
  useEffect(() => { setLocalSort(sortBy); }, [sortBy]);
  useEffect(() => { setLocalPriceRange(priceRange || { min: '', max: '' }); }, [priceRange]);
  useEffect(() => { setLocalSearchRadius(searchRadius || ''); }, [searchRadius]);
  useEffect(() => { setLocalBusinessStatus(businessStatus || 'all'); }, [businessStatus]);

  // Debounce all filters and reset page to 1 when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      let filtersChanged = false;
      
      if (localSearch !== q) {
        setQ(localSearch);
        filtersChanged = true;
      }
      if (localCat !== catFilter) {
        setCatFilter(localCat);
        filtersChanged = true;
      }
      if (localLoc !== locFilter) {
        setLocFilter(localLoc);
        filtersChanged = true;
      }
      if (localSort !== sortBy) {
        setSortBy(localSort);
        filtersChanged = true;
      }
      if (JSON.stringify(localPriceRange) !== JSON.stringify(priceRange || { min: '', max: '' })) {
        setPriceRange && setPriceRange(localPriceRange);
        filtersChanged = true;
      }
      if (localSearchRadius !== (searchRadius || '')) {
        setSearchRadius && setSearchRadius(localSearchRadius);
        filtersChanged = true;
      }
      if (localBusinessStatus !== (businessStatus || 'all')) {
        setBusinessStatus && setBusinessStatus(localBusinessStatus);
        filtersChanged = true;
      }
      
      if (filtersChanged && setPage) {
        setPage(1);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [localSearch, localCat, localLoc, localSort, localPriceRange, localSearchRadius, localBusinessStatus, q, catFilter, locFilter, sortBy, priceRange, searchRadius, businessStatus, setQ, setCatFilter, setLocFilter, setSortBy, setPriceRange, setSearchRadius, setBusinessStatus, setPage]);

  if (!filtersOpen) return null;

  return (
    <>
      <div 
        className="filter-sheet-backdrop"
        onClick={() => setFiltersOpen(false)}
        aria-label={t("closeFilters")}
      />
      <div className="filter-sheet-wrapper">
        <div className="filter-sheet-handle" onClick={() => setFiltersOpen(false)}>
          <div className="filter-sheet-handle-bar"></div>
        </div>
        <div className="filter-sheet-content">
          <div className="filter-sheet-header">
            <div className="filter-sheet-header-left">
              <div className="filter-sheet-icon">🔍</div>
              <div>
                <h2 className="filter-sheet-title">{t("filters")}</h2>
                <p className="filter-sheet-subtitle">{t("filterSubtitle")}</p>
              </div>
            </div>
            <button
              type="button"
              className="filter-sheet-close"
              onClick={() => setFiltersOpen(false)}
              aria-label={t("closeFilters")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ minWidth: "24px" }}>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="filter-sheet-scroll">
            <div className="filter-group">
              <div className="filter-group-header">
                <span className="filter-group-icon">🔎</span>
                <span className="filter-group-title">{t("search")}</span>
              </div>
              <div className="filter-group-content">
                <div className="filter-search-box">
                  <svg className="filter-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ minWidth: "24px" }}>
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  <input
                    type="search"
                    className="filter-search-input"
                    placeholder={t("searchPlaceholder")}
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                  />
                  {localSearch && (
                    <button
                      type="button"
                      className="filter-search-clear"
                      onClick={() => {
                        setLocalSearch("");
                        setQ("");
                      }}
                      aria-label={t("clearSearch")}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ minWidth: "24px" }}>
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {setStatusFilter && (
              <div className="filter-group">
                <div className="filter-group-header">
                  <span className="filter-group-icon">⏳</span>
                  <span className="filter-group-title">{t("status")}</span>
                </div>
                <div className="filter-group-content">
                  <div className="filter-select-wrapper">
                    <select
                      className="filter-select-field"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">{t("allStatuses")}</option>
                      <option value="verified">{t("verified")}</option>
                      <option value="pending">{t("pending")}</option>
                    </select>
                    <svg className="filter-select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {setExpiryFilter && (
              <div className="filter-group">
                <div className="filter-group-header">
                  <span className="filter-group-icon">⏰</span>
                  <span className="filter-group-title">{t("expiry")}</span>
                </div>
                <div className="filter-group-content">
                  <div className="filter-select-wrapper">
                    <select
                      className="filter-select-field"
                      value={expiryFilter}
                      onChange={(e) => setExpiryFilter(e.target.value)}
                    >
                      <option value="all">{t("allExpiry")}</option>
                      <option value="expiring">{t("expiringSoon")}</option>
                      <option value="active">{t("active")}</option>
                      <option value="expired">{t("expired")}</option>
                    </select>
                    <svg className="filter-select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {categoryGroups && setCatFilter && (
              <div className="filter-group">
                <div className="filter-group-header">
                  <span className="filter-group-icon">📂</span>
                  <span className="filter-group-title">{t("category")}</span>
                </div>
                <div className="filter-group-content filter-category-dropdown-wrap">
                  <div className="filter-select-wrapper">
                    <select
                      className="filter-select-field filter-category-select"
                      value={localCat}
                      onChange={(e) => setLocalCat(e.target.value)}
                      aria-label={t("category")}
                    >
                      <option value="">{t("allCategories") || t("category")}</option>
                      {categoryGroups.map((group) => (
                        <optgroup key={group.id} label={t(group.labelKey)}>
                          {(group.categories || []).map((cat) => (
                            <option key={cat} value={cat}>
                              {(categoryIcons?.[cat] || "•")} {t(cat) || cat}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <svg className="filter-select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {allLocations && setLocFilter && (
              <div className="filter-group">
                <div className="filter-group-header">
                  <span className="filter-group-icon">📍</span>
                  <span className="filter-group-title">{t("location")}</span>
                </div>
                <div className="filter-group-content">
                  <div className="filter-select-wrapper">
                    <select
                      className="filter-select-field"
                      value={localLoc}
                      onChange={(e) => setLocalLoc(e.target.value)}
                    >
                      <option value="">{t("allLocations")}</option>
                      {allLocations.map((l) => (
                        <option key={l} value={l}>{t(l) || l}</option>
                      ))}
                    </select>
                    <svg className="filter-select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            <div className="filter-group">
              <div className="filter-group-header">
                <span className="filter-group-icon">🔄</span>
                <span className="filter-group-title">{t("sortBy")}</span>
              </div>
              <div className="filter-group-content">
                <div className="filter-select-wrapper">
                  <select
                    className="filter-select-field"
                    value={localSort}
                    onChange={(e) => setLocalSort(e.target.value)}
                  >
                    <option value="topRated">⭐ {t("sortTopRated")}</option>
                    <option value="newest">🆕 {t("sortNewest")}</option>
                    <option value="expiring">⏰ {t("sortExpiring")}</option>
                    <option value="az">🔤 {t("sortAZ")}</option>
                    {setExpiryFilter && <option value="oldest">📅 {t("sortOldest")}</option>}
                  </select>
                  <svg className="filter-select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {/* Enhanced Filters */}
            <div className="filter-group">
              <div className="filter-group-header">
                <span className="filter-group-icon">💰</span>
                <span className="filter-group-title">{t("priceRange")}</span>
              </div>
              <div className="filter-group-content">
                <div className="filter-price-range">
                  <input
                    type="number"
                    className="filter-price-input"
                    placeholder={t("minPrice")}
                    value={localPriceRange.min}
                    onChange={(e) => setLocalPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  />
                  <span className="filter-price-separator">-</span>
                  <input
                    type="number"
                    className="filter-price-input"
                    placeholder={t("maxPrice")}
                    value={localPriceRange.max}
                    onChange={(e) => setLocalPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-group-header">
                <span className="filter-group-icon">📍</span>
                <span className="filter-group-title">{t("searchRadius")}</span>
              </div>
              <div className="filter-group-content">
                <div className="filter-select-wrapper">
                  <select
                    className="filter-select-field"
                    value={localSearchRadius}
                    onChange={(e) => setLocalSearchRadius(e.target.value)}
                  >
                    <option value="">{t("anyDistance")}</option>
                    <option value="5">5 km</option>
                    <option value="10">10 km</option>
                    <option value="25">25 km</option>
                    <option value="50">50 km</option>
                  </select>
                  <svg className="filter-select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-group-header">
                <span className="filter-group-icon">✅</span>
                <span className="filter-group-title">{t("businessStatus")}</span>
              </div>
              <div className="filter-group-content">
                <div className="filter-select-wrapper">
                  <select
                    className="filter-select-field"
                    value={localBusinessStatus}
                    onChange={(e) => setLocalBusinessStatus(e.target.value)}
                  >
                    <option value="all">{t("allBusinesses")}</option>
                    <option value="verified">{t("verifiedOnly")}</option>
                    <option value="open">{t("openNow")}</option>
                  </select>
                  <svg className="filter-select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Filtersheet;
