"use client";
import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import Filtersheet from "./Filtersheet";
import { useApp } from "../context/AppContext";
import GoogleAd from "./GoogleAd";

export default function ListingsTab() {
  const {
    t,
    viewMode,
    setViewMode,
    q,
    setQ,
    catFilter,
    setCatFilter,
    locFilter,
    setLocFilter,
    sortBy,
    setSortBy,
    pagedFiltered,
    page,
    totalPages,
    setPage,
    pageSize,
    setPageSize,
    categoryIcons,
    feedbackAverages,
    filtersOpen,
    setFiltersOpen,
    categories,
    allLocations,
    getDescriptionPreview,
    getListingStats,
    handleShareListing,
    showMessage,
    toggleFav,
    favorites
  } = useApp();

  const hasActiveFilters = catFilter || locFilter || q;

  // Restore scroll position when component mounts
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('listingsScrollPosition');
    if (scrollPosition) {
      // Wait for page to render
      setTimeout(() => {
        window.scrollTo({ top: parseInt(scrollPosition, 10), behavior: 'instant' });
        sessionStorage.removeItem('listingsScrollPosition');
      }, 100);
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
                placeholder={t("searchPlaceholder") || "Search listings..."}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Search listings"
              />
            </div>
            
            <div className="toolbar-actions">
              <button 
                className="toolbar-btn"
                onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
                aria-label={viewMode === "list" ? t("switchToGrid") || "Switch to grid view" : t("switchToList") || "Switch to list view"}
                title={viewMode === "list" ? t("switchToGrid") || "Grid View" : t("switchToList") || "List View"}
              >
                <span aria-hidden="true">{viewMode === "list" ? "⊞" : "☰"}</span>
              </button>

              <button 
                className="toolbar-btn"
                onClick={() => setFiltersOpen(true)}
                aria-label={t("filters") || "Open filters"}
                title={t("filters") || "Filters"}
                aria-pressed={filtersOpen}
              >
                <span aria-hidden="true">🔍</span>
                {hasActiveFilters && <span className="filter-badge" aria-label="Active filters"></span>}
              </button>
            </div>
           </div>

           {/* Active Filters Chips */}
           {hasActiveFilters && (
             <div className="active-filters-bar">
               <span className="active-filters-label">{t("activeFilters") || "Active filters"}:</span>
               <div className="active-filters-chips" role="list">
                 {catFilter && (
                   <span className="active-filter-chip" role="listitem">
                     <span className="filter-chip-label">{t("category")}:</span>
                     <span className="filter-chip-value">{t(catFilter) || catFilter}</span>
                     <button 
                       className="filter-chip-remove" 
                      onClick={() => setCatFilter("")}
                      aria-label={`Remove ${t(catFilter) || catFilter} category filter`}
                    >
                      ✕
                    </button>
                   </span>
                 )}
                 {locFilter && (
                   <span className="active-filter-chip" role="listitem">
                     <span className="filter-chip-label">{t("location")}:</span>
                     <span className="filter-chip-value">{locFilter}</span>
                     <button 
                       className="filter-chip-remove" 
                      onClick={() => setLocFilter("")}
                      aria-label={`Remove ${locFilter} location filter`}
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
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                   </span>
                 )}
                 <button 
                   className="clear-all-filters-btn" 
                   onClick={() => { setCatFilter(""); setLocFilter(""); setQ(""); }}
                   aria-label="Clear all filters"
                 >
                   {t("clearAll") || "Clear All"}
                 </button>
               </div>
             </div>
           )}

           {/* LISTINGS GRID/LIST */}
           {pagedFiltered.length > 0 ? (
             <>
               <div className={`listings-container listings-${viewMode}`} role="list" aria-label="Listings">
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
                 <nav className="listings-pagination" aria-label="Pagination">
                   <button
                     className="pagination-btn"
                     disabled={page <= 1}
                     onClick={() => setPage(page - 1)}
                     aria-label="Previous page"
                   >
                     ← {t("previous") || "Previous"}
                   </button>
                   <span className="pagination-info" aria-current="page">
                     {t("page") || "Page"} {page} {t("of") || "of"} {totalPages}
                   </span>
                   <button
                     className="pagination-btn"
                     disabled={page >= totalPages}
                     onClick={() => setPage(page + 1)}
                     aria-label="Next page"
                   >
                     {t("next") || "Next"} →
                   </button>
                 </nav>
               )}
             </>
           ) : (
             <div className="listings-empty">
               <p className="listings-empty-icon" aria-hidden="true">🔍</p>
               <h3 className="listings-empty-title">{t("noListingsFound") || "No listings found"}</h3>
               <p className="listings-empty-text">
                 {hasActiveFilters 
                   ? t("tryAdjustingFilters") || "Try adjusting your filters to see more results."
                   : t("noListingsYet") || "No listings available yet."}
               </p>
               {hasActiveFilters && (
                 <button 
                   className="btn btn-primary"
                   onClick={() => { setCatFilter(""); setLocFilter(""); setQ(""); }}
                 >
                   {t("clearAllFilters") || "Clear All Filters"}
                 </button>
               )}
             </div>
           )}
        </main>

        {/* SIDEBAR */}
        <aside className="listings-sidebar" aria-label="Sidebar">
          <div className="sidebar-ad">
            <GoogleAd style={{ minHeight: '250px' }} />
          </div>
          <div className="sidebar-ad">
            <GoogleAd style={{ minHeight: '250px' }} />
          </div>
          <div className="sidebar-ad sticky-ad">
            <GoogleAd style={{ minHeight: '600px' }} />
          </div>
          <div className="sidebar-ad">
            <GoogleAd style={{ minHeight: '250px' }} />
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
      />
    </div>
  );
}
