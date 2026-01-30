"use client";
import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import Filtersheet from "./Filtersheet";
import { useApp } from "../context/AppContext";
import GoogleAd from "./GoogleAd";
import ListingsSkeleton from "./ListingsSkeleton";

export default function ListingsTab(props = {}) {
  // Get all values from context if props not provided (Next.js route usage)
  let context;
  try {
    context = useApp();
  } catch (error) {
    // Context not available - return loading state
    console.warn('ListingsTab: AppContext not available, showing loading state');
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div className="spinner" style={{ margin: '0 auto' }}></div>
        <p>Loading listings...</p>
      </div>
    );
  }
  
  // Safety: Ensure t is always a function
  const safeT = (key) => {
    if (props.t && typeof props.t === 'function') return props.t(key);
    if (context?.t && typeof context.t === 'function') return context.t(key);
    return key; // Fallback to key if no translation function available
  };
  
  // Use props if provided, otherwise fall back to context with safe defaults
  const t = safeT;
  const viewMode = props.viewMode ?? context.viewMode ?? "list";
  const setViewMode = props.setViewMode || context.setViewMode || (() => {});
  const q = props.q ?? context.q ?? "";
  const setQ = props.setQ || context.setQ || (() => {});
  const catFilter = props.catFilter ?? context.catFilter ?? "";
  const setCatFilter = props.setCatFilter || context.setCatFilter || (() => {});
  const locFilter = props.locFilter ?? context.locFilter ?? "";
  const setLocFilter = props.setLocFilter || context.setLocFilter || (() => {});
  const sortBy = props.sortBy ?? context.sortBy ?? "topRated";
  const setSortBy = props.setSortBy || context.setSortBy || (() => {});
  const pagedFiltered = props.pagedFiltered ?? context.pagedFiltered ?? [];
  const page = props.page ?? context.page ?? 1;
  const totalPages = props.totalPages ?? context.totalPages ?? 1;
  const setPage = props.setPage || context.setPage || (() => {});
  const pageSize = props.pageSize ?? context.pageSize ?? 24;
  const setPageSize = props.setPageSize || context.setPageSize || (() => {});
  const categoryIcons = props.categoryIcons || context.categoryIcons || {};
  const feedbackAverages = props.feedbackAverages ?? context.feedbackAverages ?? {};
  const filtersOpen = props.filtersOpen ?? context.filtersOpen ?? false;
  const setFiltersOpen = props.setFiltersOpen || context.setFiltersOpen || (() => {});
  const categories = props.categories ?? context.categories ?? [];
  const allLocations = props.allLocations ?? context.allLocations ?? [];
  const getDescriptionPreview = props.getDescriptionPreview || context.getDescriptionPreview || ((desc) => desc);
  const getListingStats = props.getListingStats || context.getListingStats || (() => ({ avgRating: 0, feedbackCount: 0 }));
  const handleShareListing = props.handleShareListing || context.handleShareListing || (() => {});
  const showMessage = props.showMessage || context.showMessage || (() => {});
  const toggleFav = props.toggleFav || context.toggleFav || (() => {});
  const favorites = props.favorites ?? context.favorites ?? [];
  const listingsLoaded = props.listingsLoaded ?? context.listingsLoaded ?? true;
  const isRefreshing = props.isRefreshing ?? false;

  const hasActiveFilters = catFilter || locFilter || q;

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

  return (
    <div className="listings-page">
      <div className="listings-header">
        <div className="listings-header-content">
          <h1 className="listings-page-title">
            <span className="listings-page-icon" aria-hidden="true">🧭</span>
            {t("explore")}
          </h1>
          <p className="listings-page-subtitle">
            {t("exploreSubtitle")}
          </p>
        </div>
      </div>

      <div className="listings-layout">
        {/* MAIN LISTINGS CONTENT */}
        <main className="listings-main">
           {/* SEARCH AND FILTER BAR */}
          <div className="listings-toolbar">
            <div className="search-container">
              <input
                type="search"
                className="listings-search-input"
                placeholder={t("searchPlaceholder")}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label={t("searchListings")}
              />
            </div>
            
            <div className="toolbar-actions">
              <button 
                className="toolbar-btn"
                onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
                aria-label={viewMode === "list" ? t("switchToGrid") : t("switchToList")}
                title={viewMode === "list" ? t("gridView") : t("listView")}
              >
                <span aria-hidden="true">{viewMode === "list" ? "⊞" : "☰"}</span>
              </button>

              <button 
                className="toolbar-btn"
                onClick={() => setFiltersOpen(true)}
                aria-label={t("filters")}
                title={t("filters")}
                aria-pressed={filtersOpen}
              >
                <span aria-hidden="true">🔍</span>
                {hasActiveFilters && <span className="filter-badge" aria-label={t("activeFilters")}></span>}
              </button>
            </div>
           </div>

           {/* Active Filters Chips */}
           {hasActiveFilters && (
             <div className="active-filters-bar">
               <span className="active-filters-label">{t("activeFilters")}:</span>
               <div className="active-filters-chips" role="list">
                 {catFilter && (
                   <span className="active-filter-chip" role="listitem">
                     <span className="filter-chip-label">{t("category")}:</span>
                     <span className="filter-chip-value">{t(catFilter) || catFilter}</span>
                     <button 
                       className="filter-chip-remove" 
                      onClick={() => setCatFilter("")}
                      aria-label={`${t("removeCategoryFilter")}: ${t(catFilter) || catFilter}`}
                    >
                      ✕
                    </button>
                   </span>
                 )}
                 {locFilter && (
                   <span className="active-filter-chip" role="listitem">
                     <span className="filter-chip-label">{t("location")}:</span>
                     <span className="filter-chip-value">{t(locFilter) || locFilter}</span>
                     <button 
                       className="filter-chip-remove" 
                      onClick={() => setLocFilter("")}
                      aria-label={`${t("removeLocationFilter")}: ${locFilter}`}
                    >
                      ✕
                    </button>
                   </span>
                 )}
                 {q && (
                   <span className="active-filter-chip" role="listitem">
                     <span className="filter-chip-label">{t("search")}:</span>
                     <span className="filter-chip-value">{q}</span>
                     <button 
                       className="filter-chip-remove" 
                      onClick={() => setQ("")}
                      aria-label={t("clearSearch")}
                    >
                      ✕
                    </button>
                   </span>
                 )}
                 <button 
                   className="clear-all-filters-btn" 
                   onClick={() => { setCatFilter(""); setLocFilter(""); setQ(""); }}
                   aria-label={t("clearAllFilters")}
                 >
                   {t("clearAll")}
                 </button>
               </div>
             </div>
           )}

           {/* LISTINGS GRID/LIST */}
           {!listingsLoaded ? (
             <ListingsSkeleton count={pageSize} viewMode={viewMode} />
           ) : pagedFiltered.length > 0 ? (
             <>
               <div className={`listings-container listings-${viewMode}`} role="list" aria-label={t("listingsLabel") || t("listings")}>
                 {pagedFiltered.map((l) => (
                   <ListingCard
                    key={l.id}
                    listing={l}
                    t={t}
                    categoryIcons={categoryIcons}
                    getDescriptionPreview={getDescriptionPreview}
                    getListingStats={getListingStats}
                    onShare={() => handleShareListing(l)}
                    showMessage={showMessage}
                    toggleFav={toggleFav}
                    isFavorite={favorites.includes(l.id)}
                    className={viewMode === "list" ? "horizontal" : ""}
                  />
                 ))}
               </div>

               {/* PAGINATION */}
               {totalPages > 1 && (
                 <nav className="listings-pagination" aria-label={t("pagination")}>
                   <button
                     className="pagination-btn"
                     disabled={page <= 1}
                     onClick={() => {
                       setPage(page - 1);
                       // Use requestAnimationFrame to ensure scroll happens after state update
                       requestAnimationFrame(() => {
                         window.scrollTo({ top: 0, behavior: 'smooth' });
                       });
                       // Also try immediate scroll as fallback
                       window.scrollTo({ top: 0, behavior: 'instant' });
                     }}
                     aria-label={t("previousPage")}
                   >
                     ← {t("previous")}
                   </button>
                   <span className="pagination-info" aria-current="page">
                     {t("page")} {page} {t("of")} {totalPages}
                   </span>
                   <button
                     className="pagination-btn"
                     disabled={page >= totalPages}
                     onClick={() => {
                       setPage(page + 1);
                       // Use requestAnimationFrame to ensure scroll happens after state update
                       requestAnimationFrame(() => {
                         window.scrollTo({ top: 0, behavior: 'smooth' });
                       });
                       // Also try immediate scroll as fallback
                       window.scrollTo({ top: 0, behavior: 'instant' });
                     }}
                     aria-label={t("nextPage")}
                   >
                     {t("next")} →
                   </button>
                 </nav>
               )}
             </>
           ) : (
             <div className="listings-empty">
               <p className="listings-empty-icon" aria-hidden="true">🔍</p>
               <h3 className="listings-empty-title">{t("noListingsFound")}</h3>
               <p className="listings-empty-text">
                 {hasActiveFilters 
                   ? t("tryAdjustingFilters")
                   : t("noListingsYet")}
               </p>
               {hasActiveFilters && (
                 <button 
                   className="btn btn-primary"
                   onClick={() => { setCatFilter(""); setLocFilter(""); setQ(""); }}
                 >
                   {t("clearAllFilters")}
                 </button>
               )}
             </div>
           )}
        </main>

        {/* SIDEBAR */}
        <aside className="listings-sidebar" aria-label={t("sidebar")}>
          <div className="sidebar-ad">
            <GoogleAd slot="1802538697" style={{ minHeight: '250px' }} />
          </div>
          <div className="sidebar-ad">
            <GoogleAd slot="9192821398" style={{ minHeight: '250px' }} />
          </div>
          <div className="sidebar-ad sticky-ad">
            <GoogleAd slot="7424444157" style={{ minHeight: '600px' }} />
          </div>
          <div className="sidebar-ad">
            <GoogleAd slot="8095761529" style={{ minHeight: '250px' }} />
          </div>
        </aside>
      </div>

      <Filtersheet
        t={t}
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
        q={q}
        setQ={setQ}
        catFilter={catFilter}
        setCatFilter={setCatFilter}
        locFilter={locFilter}
        setLocFilter={setLocFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        categoryIcons={categoryIcons}
        allLocations={allLocations}
        setPage={setPage}
      />
    </div>
  );
}
